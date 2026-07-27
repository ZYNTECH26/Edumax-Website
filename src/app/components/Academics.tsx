import { useEffect, useRef, useState } from "react";
import { Globe, FlaskConical, TrendingUp } from "lucide-react";

const programs = [
  {
    icon: <Globe size={26} strokeWidth={1.5} />,
    title: "Humanities",
    description:
      "Geography, History, English Literature and more — building critical thinking, communication, and a global perspective.",
    color: "#8B1E2D",
    subjects: ["Geography", "History", "English Literature", "Divinity"],
  },
  {
    icon: <FlaskConical size={26} strokeWidth={1.5} />,
    title: "Pure Sciences",
    description:
      "Biology, Chemistry, Physics and Mathematics taught with full laboratory practicals and hands-on experimentation.",
    color: "#2BD4C4",
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
  },
  {
    icon: <TrendingUp size={26} strokeWidth={1.5} />,
    title: "Business Sciences",
    description:
      "Accounting, Business Studies and Economics for future entrepreneurs, professionals, and financial leaders.",
    color: "#F5A623",
    subjects: ["Accounting", "Business Studies", "Economics", "Management"],
  },
];

export function Academics() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="academics"
      style={{
        background: "#F7F8FB",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "2.5rem",
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
          className="academics-header"
        >
          <div>
            <div style={{
              display: "inline-block",
              background: "rgba(245,166,35,0.12)",
              border: "1px solid rgba(245,166,35,0.3)",
              borderRadius: 9999,
              padding: "0.35rem 1rem",
              marginBottom: "1rem",
            }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#e08e10",
              }}>
                Academic Streams
              </span>
            </div>
            <h2 style={{ color: "#0E1E45", margin: 0 }}>
              A Well-Rounded Curriculum
            </h2>
          </div>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1.05rem",
            color: "#5a6485",
            maxWidth: 380,
            margin: 0,
            lineHeight: 1.6,
            flexShrink: 0,
          }}>
            Designed for university readiness — every stream combines rigorous academics
            with practical skills for the modern world.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.75rem",
        }}
          className="academics-grid"
        >
          {programs.map((prog, i) => (
            <div
              key={prog.title}
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(14,30,69,0.06)",
                border: "1px solid rgba(14,30,69,0.07)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.15}s, transform 0.6s ease ${0.1 + i * 0.15}s, box-shadow 0.25s ease`,
                cursor: "default",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 16px 40px rgba(14,30,69,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 20px rgba(14,30,69,0.06)";
              }}
            >
              {/* Icon badge */}
              <div style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: `${prog.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: prog.color,
                marginBottom: "1.25rem",
              }}>
                {prog.icon}
              </div>

              <h3 style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#0E1E45",
                marginBottom: "0.75rem",
              }}>
                {prog.title}
              </h3>

              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.9rem",
                color: "#5a6485",
                lineHeight: 1.65,
                marginBottom: "1.25rem",
              }}>
                {prog.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {prog.subjects.map((sub) => (
                  <span key={sub} style={{
                    background: `${prog.color}10`,
                    border: `1px solid ${prog.color}25`,
                    color: prog.color,
                    borderRadius: 9999,
                    padding: "0.2rem 0.65rem",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .academics-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .academics-header { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
