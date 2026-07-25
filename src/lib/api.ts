const SERVER_URL = "https://fifpiiyksrumbkqilcqw.supabase.co/functions/v1/make-server-50ff6141";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ApplicationPayload {
  first_name: string; last_name: string; dob: string; gender: string;
  nationality?: string; id_number?: string;
  form_level: string; stream?: string; prev_school: string; prev_grade?: string;
  start_term: string; additional_needs?: string;
  guardian_name: string; relationship: string; guardian_phone: string;
  guardian_alt?: string; guardian_email?: string; address: string;
}
export interface Application extends ApplicationPayload {
  id: string; created_at: string; status: "pending" | "reviewed" | "accepted" | "rejected";
}

export interface BlogPost {
  id: string; created_at: string; updated_at: string;
  title: string; excerpt: string; content: string;
  category: string; author: string; image_url?: string;
  published: boolean;
}

export interface GalleryItem {
  id: string; created_at: string;
  url: string; alt: string; caption: string;
}

// ── Applications ──────────────────────────────────────────────────────────────

export async function submitApplication(payload: ApplicationPayload) {
  const res = await fetch(`${SERVER_URL}/applications`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Submission failed");
  return data.application as { id: string; created_at: string; status: string };
}

export async function fetchApplications(): Promise<Application[]> {
  const res = await fetch(`${SERVER_URL}/applications`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Fetch failed");
  return data.applications ?? [];
}

export async function updateApplicationStatus(id: string, status: Application["status"]) {
  const res = await fetch(`${SERVER_URL}/applications/${id}/status`, {
    method: "PATCH", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Update failed");
  return data.application;
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export async function fetchPosts(publishedOnly = false): Promise<BlogPost[]> {
  const url = publishedOnly ? `${SERVER_URL}/blog?published=true` : `${SERVER_URL}/blog`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Fetch failed");
  return data.posts ?? [];
}

export async function fetchPost(id: string): Promise<BlogPost> {
  const res = await fetch(`${SERVER_URL}/blog/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Fetch failed");
  return data.post;
}

export async function createPost(payload: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> {
  const res = await fetch(`${SERVER_URL}/blog`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Create failed");
  return data.post;
}

export async function updatePost(id: string, payload: Partial<BlogPost>): Promise<BlogPost> {
  const res = await fetch(`${SERVER_URL}/blog/${id}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Update failed");
  return data.post;
}

export async function deletePost(id: string) {
  const res = await fetch(`${SERVER_URL}/blog/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const res = await fetch(`${SERVER_URL}/gallery`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Fetch failed");
  return data.items ?? [];
}

export async function addGalleryItem(payload: Omit<GalleryItem, "id" | "created_at">): Promise<GalleryItem> {
  const res = await fetch(`${SERVER_URL}/gallery`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Add failed");
  return data.item;
}

export async function deleteGalleryItem(id: string) {
  const res = await fetch(`${SERVER_URL}/gallery/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
}
