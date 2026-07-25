import { Shield, Award, Star } from "lucide-react";

const accreditations = [
  {
    icon: <Shield size={28} strokeWidth={1.5} />,
    name: "Cambridge International",
    sub: "Examinations",
    color: "#8B1E2D",
  },
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    name: "ZIMSEC",
    sub: "Zimbabwe School Examinations Council",
    color: "#0E1E45",
  },
  {
    icon: <Star size={28} strokeWidth={1.5} />,
    name: "Est. 2024",
    sub: "Harare, Zimbabwe",
    color: "#F5A623",
  },
];

export function TrustBar() {
  return (
    <section style={{
      background: "#ffffff",
      borderBottom: "1px solid rgba(14,30,69,0.08)",
      padding: "2rem 2rem",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#5a6485",
        }}>
          Proudly Accredited & Aligned With
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}>
          {accreditations.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.25rem",
                borderRadius: 12,
                border: "1px solid rgba(14,30,69,0.1)",
                background: "#F7F8FB",
                transition: "filter 0.2s, box-shadow 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(14,30,69,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: `${item.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.color,
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#0E1E45",
                  lineHeight: 1.2,
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.75rem",
                  color: "#5a6485",
                  lineHeight: 1.3,
                }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
