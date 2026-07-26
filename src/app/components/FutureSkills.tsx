import { useEffect, useRef, useState } from "react";
import { DollarSign, Code, Bot, Palette, Wrench, Car } from "lucide-react";

const skills = [
  {
    icon: <DollarSign size={24} strokeWidth={1.5} />,
    name: "Financial Literacy",
    desc: "Practical money management and budgeting skills for life",
    color: "#2BD4C4",
  },
  {
    icon: <Code size={24} strokeWidth={1.5} />,
    name: "Coding & Web Design",
    desc: "Building websites and writing code from an early age",
    color: "#F5A623",
  },
  {
    icon: <Bot size={24} strokeWidth={1.5} />,
    name: "AI Skills",
    desc: "Understanding and applying artificial intelligence tools",
    color: "#2BD4C4",
  },
  {
    icon: <Palette size={24} strokeWidth={1.5} />,
    name: "Graphic Designing",
    desc: "Creative digital design using modern professional tools",
    color: "#F5A623",
  },
  {
    icon: <Wrench size={24} strokeWidth={1.5} />,
    name: "Welding & Carpentry",
    desc: "Hands-on technical and vocational training",
    color: "#2BD4C4",
  },
  {
    icon: <Car size={24} strokeWidth={1.5} />,
    name: "Driving Lessons",
    desc: "Practical road skills as part of life-readiness education",
    color: "#F5A623",
  },
];

export function FutureSkills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
      style={{
        background: "#FFE7B3",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background blob */}
      <div style={{
        position: "absolute",
        top: "-20%",
        right: "-10%",
        width: "40vw",
        height: "40vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          {/* "Unique to Edumax" ribbon */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#0E1E45",
            borderRadius: 9999,
            padding: "0.35rem 1rem",
            marginBottom: "1rem",
          }}>
            <span style={{ fontSize: "0.9rem" }}>⭐</span>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F5A623",
            }}>
              Unique to Edumax
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            color: "#0E1E45",
            marginBottom: "1rem",
          }}>
            Future-Ready Skills
          </h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1.05rem",
            color: "#4a5270",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.65,
          }}>
            Beyond the classroom — preparing students with practical, real-world abilities
            for the modern economy and the careers of tomorrow.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }}
          className="skills-grid"
        >
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "1.75rem",
                boxShadow: "0 4px 20px rgba(14,30,69,0.07)",
                border: "1px solid rgba(14,30,69,0.07)",
                transition: `opacity 0.6s ease ${0.05 + i * 0.08}s, transform 0.6s ease ${0.05 + i * 0.08}s, box-shadow 0.25s ease`,
                cursor: "default",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
                el.style.transform = "translateY(-5px) scale(1.01)";
                el.style.boxShadow = "0 14px 35px rgba(14,30,69,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow = "0 4px 20px rgba(14,30,69,0.07)";
              }}
            >
              <div style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: `${skill.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: skill.color,
                marginBottom: "1rem",
              }}>
                {skill.icon}
              </div>
              <h3 style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#0E1E45",
                marginBottom: "0.4rem",
              }}>
                {skill.name}
              </h3>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.875rem",
                color: "#5a6485",
                lineHeight: 1.55,
                margin: 0,
              }}>
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
