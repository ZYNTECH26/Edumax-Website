import { useEffect, useRef, useState } from "react";

export function Languages() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="languages"
      style={{
        background: "linear-gradient(135deg, #0E1E45 0%, #16295C 100%)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* World map texture (decorative lines) */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }}
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx={600} cy={250} rx={80 + i * 60} ry={40 + i * 30}
            fill="none" stroke="#F5A623" strokeWidth={0.8} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={150 * i} y1={0} x2={150 * i} y2={500}
            stroke="#F5A623" strokeWidth={0.5} />
        ))}
      </svg>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "3.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            color: "#ffffff",
            marginBottom: "1rem",
          }}>
            Global Languages,{" "}
            <span style={{ color: "#F5A623" }}>Global Opportunities</span>
          </h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.7)",
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.65,
          }}>
            All students from Form 1 to Form 6 study both German and French as compulsory
            subjects — opening doors to international study and exchange programs.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
          className="lang-grid"
        >
          {[
            {
              lang: "German",
              flag: "🇩🇪",
              stripeColor: "#000000",
              stripeColor2: "#DD0000",
              stripeColor3: "#FFCE00",
              description: "Build precision thinking and global business fluency with the language of engineering and philosophy.",
              delay: 0,
            },
            {
              lang: "French",
              flag: "🇫🇷",
              stripeColor: "#002395",
              stripeColor2: "#EDEDED",
              stripeColor3: "#ED2939",
              description: "Connect with 300 million speakers across Africa and Europe through la langue of culture and diplomacy.",
              delay: 0.15,
            },
          ].map((item) => (
            <div
              key={item.lang}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${item.delay}s, transform 0.7s ease ${item.delay}s`,
              }}
            >
              {/* Flag accent stripe */}
              <div style={{ display: "flex", height: 6 }}>
                <div style={{ flex: 1, background: item.stripeColor }} />
                <div style={{ flex: 1, background: item.stripeColor2 }} />
                <div style={{ flex: 1, background: item.stripeColor3 }} />
              </div>

              <div style={{ padding: "2rem 2.5rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{item.flag}</div>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "2.25rem",
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                }}>
                  {item.lang}
                </div>
                <div style={{
                  display: "inline-block",
                  background: "rgba(245,166,35,0.2)",
                  border: "1px solid rgba(245,166,35,0.4)",
                  borderRadius: 9999,
                  padding: "0.25rem 0.75rem",
                  marginBottom: "1rem",
                }}>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#F5A623",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    Compulsory · Form 1–6
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.6,
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lang-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
