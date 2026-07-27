import { useEffect, useRef, useState } from "react";
import { FlaskConical, Monitor } from "lucide-react";
import LAB_SCIENCE from "../../assets/gallery/chemistry-lab.jpg";

const LAB_COMPUTER = "https://images.unsplash.com/photo-1719159381981-1327b22aff9b?w=900&h=700&fit=crop&auto=format";

export function Facilities() {
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

  const panels = [
    {
      img: LAB_SCIENCE,
      alt: "Edumax Global College students in lab coats and safety goggles conducting a chemistry experiment",
      icon: <FlaskConical size={22} strokeWidth={1.5} />,
      title: "Chemistry Laboratory",
      desc: "Hands-on practicals in Biology, Chemistry and Physics with fully-equipped lab stations and modern apparatus.",
      delay: 0,
    },
    {
      img: LAB_COMPUTER,
      alt: "Students working on computers in the Edumax computer laboratory",
      icon: <Monitor size={22} strokeWidth={1.5} />,
      title: "Computer Laboratory",
      desc: "Modern computing facilities supporting our Coding, AI and Digital Skills programs with the latest hardware.",
      delay: 0.15,
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#F7F8FB",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "3.5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}>
          <div style={{
            display: "inline-block",
            background: "rgba(14,30,69,0.07)",
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
              color: "#0E1E45",
            }}>
              World-Class Facilities
            </span>
          </div>
          <h2 style={{ color: "#0E1E45" }}>Learn in Equipped Spaces</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          borderRadius: 24,
          overflow: "hidden",
        }}
          className="facilities-grid"
        >
          {panels.map((panel) => (
            <div
              key={panel.title}
              style={{
                position: "relative",
                minHeight: 420,
                borderRadius: 20,
                overflow: "hidden",
                background: "#16295C",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(25px)",
                transition: `opacity 0.7s ease ${panel.delay}s, transform 0.7s ease ${panel.delay}s`,
              }}
            >
              <img
                src={panel.img}
                alt={panel.alt}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
              />

              {/* Gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(14,30,69,0.9) 0%, rgba(14,30,69,0.3) 50%, transparent 100%)",
              }} />

              {/* Content */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2rem",
              }}>
                {/* Gold accent line */}
                <div style={{
                  width: 40,
                  height: 3,
                  background: "#F5A623",
                  borderRadius: 2,
                  marginBottom: "0.75rem",
                }} />
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  color: "#F5A623",
                }}>
                  {panel.icon}
                  <h3 style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#ffffff",
                    margin: 0,
                  }}>
                    {panel.title}
                  </h3>
                </div>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {panel.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .facilities-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
