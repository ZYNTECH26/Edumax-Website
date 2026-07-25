import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// The dashboard (edumax-app) is a separate Supabase project with its own
// auth/roles. Its anon key is public by design (RLS is the real boundary
// there too) — safe to embed here for verifying dashboard sessions.
const DASHBOARD_URL = "https://nmijmdxruzdhxchmdxss.supabase.co";
const DASHBOARD_ANON_KEY = "sb_publishable_0ufzeSvaGfinp_DpaUUMww_NGo8F0WW";
const ADMIN_ROLES = ["headmaster", "it_admin"];

/**
 * Verifies the caller holds a valid session on the DASHBOARD project (a
 * different Supabase project) and has an admin role there. There's no
 * shared secret and no duplicate accounts — the dashboard's own JWT is
 * checked against the dashboard's own auth + user_roles table, which only
 * that token's owner can read (RLS: read_own_role).
 */
async function verifyDashboardAdmin(req: Request): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return { ok: false, status: 401, error: "Missing authorization" };
  const token = authHeader.replace(/^Bearer\s+/i, "");

  const userRes = await fetch(`${DASHBOARD_URL}/auth/v1/user`, {
    headers: { apikey: DASHBOARD_ANON_KEY, Authorization: `Bearer ${token}` },
  });
  if (!userRes.ok) return { ok: false, status: 401, error: "Invalid or expired dashboard session" };
  const user = await userRes.json();

  const roleRes = await fetch(
    `${DASHBOARD_URL}/rest/v1/user_roles?select=role&auth_user_id=eq.${user.id}`,
    { headers: { apikey: DASHBOARD_ANON_KEY, Authorization: `Bearer ${token}` } }
  );
  if (!roleRes.ok) return { ok: false, status: 401, error: "Could not verify dashboard role" };
  const roles = await roleRes.json();
  const role = roles?.[0]?.role;
  if (!role || !ADMIN_ROLES.includes(role)) {
    return { ok: false, status: 403, error: "Only headmaster or IT admin can manage the website" };
  }
  return { ok: true };
}

const app = new Hono();
app.use("*", logger(console.log));
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

// ── Health ────────────────────────────────────────────────────────────────────
app.get("/make-server-50ff6141/health", (c) => c.json({ status: "ok" }));

// ═══════════════════════════════════════════════════════════════════════════════
// APPLICATIONS — public can submit; only dashboard admins can view/decide
// ═══════════════════════════════════════════════════════════════════════════════

app.post("/make-server-50ff6141/applications", async (c) => {
  const body = await c.req.json();
  const required = ["first_name", "last_name", "dob", "gender", "form_level", "prev_school", "start_term", "guardian_name", "relationship", "guardian_phone", "address"];
  for (const f of required) if (!body[f]) return c.json({ error: `Missing: ${f}` }, 400);

  const { data, error } = await admin
    .from("applications")
    .insert({ ...body, status: "pending" })
    .select("id, created_at, status")
    .single();
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ success: true, application: data }, 201);
});

app.get("/make-server-50ff6141/applications", async (c) => {
  const auth = await verifyDashboardAdmin(c.req.raw);
  if (!auth.ok) return c.json({ error: auth.error }, auth.status);

  const { data, error } = await admin
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ applications: data ?? [] });
});

app.patch("/make-server-50ff6141/applications/:id/status", async (c) => {
  const auth = await verifyDashboardAdmin(c.req.raw);
  if (!auth.ok) return c.json({ error: auth.error }, auth.status);

  const id = c.req.param("id");
  const { status } = await c.req.json();
  if (!["pending", "reviewed", "accepted", "rejected"].includes(status)) return c.json({ error: "Invalid status" }, 400);

  const { data, error } = await admin
    .from("applications")
    .update({ status })
    .eq("id", id)
    .select("id, status")
    .single();
  if (error) return c.json({ error: error.message }, 400);
  if (!data) return c.json({ error: "Not found" }, 404);
  return c.json({ application: data });
});

// ═══════════════════════════════════════════════════════════════════════════════
// BLOG — public reads published posts; only dashboard admins write/read drafts
// ═══════════════════════════════════════════════════════════════════════════════

app.get("/make-server-50ff6141/blog", async (c) => {
  const publishedOnly = c.req.query("published") === "true";
  let query = admin.from("blog_posts").select("*").order("created_at", { ascending: false });
  if (publishedOnly) {
    query = query.eq("published", true);
  } else {
    const auth = await verifyDashboardAdmin(c.req.raw);
    if (!auth.ok) return c.json({ error: auth.error }, auth.status);
  }
  const { data, error } = await query;
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ posts: data ?? [] });
});

app.get("/make-server-50ff6141/blog/:id", async (c) => {
  const { data, error } = await admin.from("blog_posts").select("*").eq("id", c.req.param("id")).maybeSingle();
  if (error) return c.json({ error: error.message }, 400);
  if (!data) return c.json({ error: "Not found" }, 404);
  if (!data.published) {
    const auth = await verifyDashboardAdmin(c.req.raw);
    if (!auth.ok) return c.json({ error: auth.error }, auth.status);
  }
  return c.json({ post: data });
});

app.post("/make-server-50ff6141/blog", async (c) => {
  const auth = await verifyDashboardAdmin(c.req.raw);
  if (!auth.ok) return c.json({ error: auth.error }, auth.status);

  const body = await c.req.json();
  if (!body.title) return c.json({ error: "Title is required" }, 400);
  const { data, error } = await admin
    .from("blog_posts")
    .insert({ published: false, author: "Edumax Admin", ...body })
    .select("*")
    .single();
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ post: data }, 201);
});

app.patch("/make-server-50ff6141/blog/:id", async (c) => {
  const auth = await verifyDashboardAdmin(c.req.raw);
  if (!auth.ok) return c.json({ error: auth.error }, auth.status);

  const id = c.req.param("id");
  const updates = await c.req.json();
  const { data, error } = await admin
    .from("blog_posts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) return c.json({ error: error.message }, 400);
  if (!data) return c.json({ error: "Not found" }, 404);
  return c.json({ post: data });
});

app.delete("/make-server-50ff6141/blog/:id", async (c) => {
  const auth = await verifyDashboardAdmin(c.req.raw);
  if (!auth.ok) return c.json({ error: auth.error }, auth.status);

  const { error } = await admin.from("blog_posts").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ success: true });
});

// ═══════════════════════════════════════════════════════════════════════════════
// GALLERY — fully public to view; only dashboard admins write
// ═══════════════════════════════════════════════════════════════════════════════

app.get("/make-server-50ff6141/gallery", async (c) => {
  const { data, error } = await admin.from("gallery_items").select("*").order("created_at", { ascending: false });
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ items: data ?? [] });
});

app.post("/make-server-50ff6141/gallery", async (c) => {
  const auth = await verifyDashboardAdmin(c.req.raw);
  if (!auth.ok) return c.json({ error: auth.error }, auth.status);

  const body = await c.req.json();
  if (!body.url) return c.json({ error: "URL is required" }, 400);
  const { data, error } = await admin.from("gallery_items").insert(body).select("*").single();
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ item: data }, 201);
});

app.delete("/make-server-50ff6141/gallery/:id", async (c) => {
  const auth = await verifyDashboardAdmin(c.req.raw);
  if (!auth.ok) return c.json({ error: auth.error }, auth.status);

  const { error } = await admin.from("gallery_items").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ success: true });
});

Deno.serve(app.fetch);
