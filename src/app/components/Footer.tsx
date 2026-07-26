import { MapPin, Phone, MessageCircle } from "lucide-react";
import logo from "../../assets/egc-logo.png";

const WHATSAPP_NUMBER = "263771503198";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

const programs = [
  "Humanities",
  "Pure Sciences",
  "Business Sciences",
  "Future Skills",
  "German Language",
  "French Language",
];

export function Footer({ onApply }: { onApply: () => void }) {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{
      background: "#080f24",
      padding: "5rem 2rem 0",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <img src={logo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  letterSpacing: "0.12em",
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}>
                  EDUMAX
                </div>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#F5A623",
                  lineHeight: 1,
                }}>
                  Global College
                </div>
              </div>
            </div>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: 280,
              marginBottom: "1.5rem",
            }}>
              A co-educational secondary school in Harare, Zimbabwe, igniting innovation
              in every student through Cambridge-aligned academics and future-ready skills.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Edumax Global College on WhatsApp"
                className="press-btn"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
                  color: "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(245,166,35,0.2)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"}
              >
                <MessageCircle size={16} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "0.05em",
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.5)",
                      padding: 0,
                      transition: "color 0.2s",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#F5A623"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "0.05em",
            }}>
              Programs
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {programs.map((prog) => (
                <li key={prog} style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.5)",
                }}>
                  {prog}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "0.05em",
            }}>
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  icon: <MapPin size={15} strokeWidth={1.5} />,
                  text: "Budiriro Cabs Stand No. 21899, near Big Save Supermarket, Harare",
                },
                {
                  icon: <Phone size={15} strokeWidth={1.5} />,
                  text: "0771 503 198",
                },
                {
                  icon: <Phone size={15} strokeWidth={1.5} />,
                  text: "0774 880 751",
                },
                {
                  icon: <MessageCircle size={15} strokeWidth={1.5} />,
                  text: "WhatsApp: 0771 503 198",
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#F5A623", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.825rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.5,
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem 0",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}>
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.3)",
          }}>
            © 2026 Edumax Global College. All rights reserved.
          </span>
          <span style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#F5A623",
            opacity: 0.7,
          }}>
            Igniting Innovation
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
