import { useEffect, useState } from "react";
import { fetchPosts, type BlogPost } from "../../lib/api";
import { GraduationCap, ArrowLeft, Calendar, Tag, Clock } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function readTime(content: string) {
  return Math.max(1, Math.ceil(content.split(" ").length / 200));
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchPosts(true).then(setPosts).finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];
  const filtered = filter === "All" ? posts : posts.filter(p => p.category === filter);

  if (selected) return <PostDetail post={selected} onBack={() => setSelected(null)} />;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FB", fontFamily: "'Manrope', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0E1E45, #16295C)", padding: "5rem 2rem 4rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button onClick={() => window.location.href = "/"} style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 9999, padding: "0.4rem 1rem", cursor: "pointer",
            fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)",
            marginBottom: "2rem",
          }}>
            <ArrowLeft size={14} /> Back to Site
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#F5A623,#e08e10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={20} color="#0E1E45" />
            </div>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F5A623" }}>
              Edumax Global College
            </span>
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", lineHeight: 1.1, marginBottom: "1rem" }}>
            News & Announcements
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.65, maxWidth: 520 }}>
            Updates, stories, and announcements from Edumax Global College.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Category filters */}
        {categories.length > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                background: filter === cat ? "#0E1E45" : "transparent",
                border: `1.5px solid ${filter === cat ? "#0E1E45" : "rgba(14,30,69,0.2)"}`,
                borderRadius: 9999, padding: "0.4rem 1rem",
                fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: "0.8rem",
                color: filter === cat ? "#fff" : "#5a6485", cursor: "pointer", transition: "all 0.2s",
              }}>{cat}</button>
            ))}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#8a93a8" }}>Loading posts…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📰</div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", color: "#0E1E45", marginBottom: "0.5rem" }}>No posts yet</h3>
            <p style={{ color: "#8a93a8" }}>Check back soon for news and announcements from Edumax.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: "1.5rem" }}>
            {filtered.map((post, i) => (
              <article key={post.id} onClick={() => setSelected(post)} style={{
                background: "#fff", borderRadius: 16, overflow: "hidden",
                boxShadow: "0 4px 20px rgba(14,30,69,0.06)", border: "1px solid rgba(14,30,69,0.07)",
                cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 35px rgba(14,30,69,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(14,30,69,0.06)"; }}
              >
                {post.image_url && (
                  <div style={{ height: 200, overflow: "hidden", background: "#16295C" }}>
                    <img src={post.image_url} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} />
                  </div>
                )}
                {!post.image_url && (
                  <div style={{ height: 8, background: i % 2 === 0 ? "#F5A623" : "#0E1E45" }} />
                )}
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    {post.category && (
                      <span style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", color: "#c47e0a", borderRadius: 9999, padding: "0.15rem 0.6rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {post.category}
                      </span>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.72rem", color: "#8a93a8" }}>
                      <Calendar size={11} />{formatDate(post.created_at)}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0E1E45", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.875rem", color: "#5a6485", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(14,30,69,0.07)" }}>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#0E1E45" }}>{post.author}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.72rem", color: "#8a93a8", marginLeft: "auto" }}>
                      <Clock size={11} />{readTime(post.content)} min read
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PostDetail({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FB", fontFamily: "'Manrope', sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #0E1E45, #16295C)", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, padding: "0.4rem 1rem", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
            <ArrowLeft size={14} /> All Posts
          </button>
          {post.category && (
            <span style={{ display: "inline-block", background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)", color: "#F5A623", borderRadius: 9999, padding: "0.2rem 0.75rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {post.category}
            </span>
          )}
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem,3.5vw,2.5rem)", color: "#fff", lineHeight: 1.15, marginBottom: "1rem" }}>{post.title}</h1>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: "0.3rem" }}><Calendar size={13} />{formatDate(post.created_at)}</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: "0.3rem" }}><Clock size={13} />{readTime(post.content)} min read</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>By {post.author}</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 2rem" }}>
        {post.image_url && (
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: "2.5rem", boxShadow: "0 8px 30px rgba(14,30,69,0.12)" }}>
            <img src={post.image_url} alt={post.title} style={{ width: "100%", maxHeight: 420, objectFit: "cover" }} />
          </div>
        )}
        <div style={{ background: "#fff", borderRadius: 16, padding: "2.5rem", boxShadow: "0 4px 20px rgba(14,30,69,0.06)", border: "1px solid rgba(14,30,69,0.07)" }}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.05rem", color: "#3a4060", lineHeight: 1.7, fontWeight: 600, marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(14,30,69,0.08)" }}>
            {post.excerpt}
          </p>
          <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1rem", color: "#3a4060", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
}
