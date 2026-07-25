import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "Form 1–6", label: "Full Secondary Pathway", icon: "🎓" },
  { value: "2", label: "Fully Equipped Laboratories", icon: "🔬" },
  { value: "2", label: "Compulsory Global Languages", icon: "🌍" },
  { value: "6+", label: "Future Skills Programs", icon: "⚡" },
];

export function StatsStrip() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      style={{
        background: "linear-gradient(135deg, #0E1E45 0%, #16295C 100%)",
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle gold blob */}
      <div style={{
        position: "absolute",
        right: "-5%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "30vw",
        height: "30vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2rem",
        position: "relative",
      }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              textAlign: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              padding: "1.5rem",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <div style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#F5A623",
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.4,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
