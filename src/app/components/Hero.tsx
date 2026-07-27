import { useEffect, useRef, useState } from "react";
import { ChevronDown, BookOpen, Globe } from "lucide-react";
import HERO_IMAGE from "../../assets/gallery/campus-12.jpg";

export function Hero({ onApply }: { onApply: () => void }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0E1E45 0%, #16295C 60%, #0a1530 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background gold blob */}
      <div style={{
        position: "absolute",
        top: "-15%",
        right: "-10%",
        width: "55vw",
        height: "55vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-20%",
        left: "-5%",
        width: "35vw",
        height: "35vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(43,212,196,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Signature outlined watermark */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Sora', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(8rem, 24vw, 22rem)",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        color: "transparent",
        WebkitTextStroke: "1.5px rgba(255,255,255,0.05)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
      }}>
        2026
      </div>

      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "100px 2rem 4rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}
        className="hero-grid"
      >
        {/* Text content */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          {/* Eyebrow badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(245,166,35,0.15)",
            border: "1px solid rgba(245,166,35,0.4)",
            borderRadius: 9999,
            padding: "0.4rem 1rem",
            marginBottom: "1.5rem",
          }}>
            <span style={{ fontSize: "1rem" }}>🎓</span>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#FFE7B3",
              letterSpacing: "0.04em",
            }}>
              2026 Enrolment Now Open · Form 1–6
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 5.2vw, 4.25rem)",
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
          }}>
            Igniting Innovation<br />
            <span style={{ color: "#F5A623" }}>in Every Student</span>
          </h1>

          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: 500,
          }}>
            Edumax Global College blends Cambridge-aligned academics, ZIMSEC accreditation,
            and future-ready skills — preparing students for university and beyond.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={onApply}
              style={{
                background: "#F5A623",
                border: "none",
                borderRadius: 9999,
                padding: "0.875rem 2rem",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#0E1E45",
                cursor: "pointer",
                boxShadow: "0 6px 25px rgba(245,166,35,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(245,166,35,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 25px rgba(245,166,35,0.4)";
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
            >
              Apply Now
            </button>
            <button
              onClick={() => handleScroll("#academics")}
              className="press-btn"
              style={{
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.5)",
                borderRadius: 9999,
                padding: "0.875rem 2rem",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#ffffff",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#ffffff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Explore Programs
            </button>
          </div>
        </div>

        {/* Hero image */}
        <div style={{
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
        }}>
          <div style={{
            borderRadius: 24,
            overflow: "hidden",
            aspectRatio: "4/3",
            background: "#16295C",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}>
            <img
              src={HERO_IMAGE}
              alt="Edumax Global College students in uniform on the school grounds"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Floating stat card */}
          <div style={{
            position: "absolute",
            bottom: -20,
            left: -20,
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: "1rem 1.25rem",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <BookOpen size={16} color="#F5A623" />
              <span style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#ffffff",
              }}>
                Form 1–6
              </span>
            </div>
            <div style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.7)",
            }}>
              Cambridge & ZIMSEC Aligned
            </div>
          </div>

          {/* Gold accent circle */}
          <div style={{
            position: "absolute",
            top: -15,
            right: -15,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F5A623, #e08e10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(245,166,35,0.5)",
          }}>
            <Globe size={28} color="#0E1E45" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.25rem",
        opacity: 0.6,
        animation: "scrollFloat 2s infinite",
      }}>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.75rem", color: "#ffffff" }}>
          Scroll to explore
        </span>
        <ChevronDown size={20} color="#ffffff" />
      </div>

      <style>{`
        @keyframes scrollFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
