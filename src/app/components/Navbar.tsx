import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/egc-logo.png";

const navLinks = [
  { label: "Home", href: "#home", type: "anchor" },
  { label: "About", href: "#about", type: "anchor" },
  { label: "Academics", href: "#academics", type: "anchor" },
  { label: "Future Skills", href: "#skills", type: "anchor" },
  { label: "Admissions", href: "#admissions", type: "anchor" },
  { label: "Blog", href: "/blog", type: "link" },
  { label: "Contact", href: "#contact", type: "anchor" },
];

export function Navbar({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string, type: string) => {
    setMenuOpen(false);
    if (type === "link") {
      window.location.href = href;
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 80,
          display: "flex",
          alignItems: "center",
          padding: "0 2rem",
          transition: "background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
          background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.6)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(14,30,69,0.08)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("#home", "anchor")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img src={logo} alt="Edumax Global College" style={{ width: 52, height: 52, objectFit: "contain", flexShrink: 0 }} />
          <span style={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: scrolled ? "#0E1E45" : "#ffffff",
            transition: "color 0.3s",
          }}>
            Global College
          </span>
        </button>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.15rem", marginLeft: "auto", marginRight: "1.75rem" }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href, link.type)}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem 0.85rem",
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: scrolled ? "#14161A" : "rgba(255,255,255,0.9)",
                transition: "color 0.2s",
                minHeight: 44,
              }}
            >
              {link.label}
              <span style={{
                position: "absolute",
                left: "0.85rem",
                right: "0.85rem",
                bottom: 4,
                height: 2,
                borderRadius: 2,
                background: "#F5A623",
                transform: hoveredLink === link.label ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "center",
                transition: "transform 0.25s ease",
              }} />
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onApply}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          className="hidden md:block"
          style={{
            background: "#F5A623",
            border: "none",
            borderRadius: 9999,
            padding: "0.65rem 1.5rem",
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: "#0E1E45",
            cursor: "pointer",
            whiteSpace: "nowrap",
            minHeight: 44,
            boxShadow: ctaHovered ? "0 6px 20px rgba(245,166,35,0.45)" : "0 2px 10px rgba(245,166,35,0.25)",
            transform: ctaHovered ? "translateY(-1px)" : "translateY(0)",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
          }}
        >
          Apply for 2026
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: scrolled ? "#0E1E45" : "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 44,
            minWidth: 44,
          }}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(8,15,36,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
        }}>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href, link.type)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: "1.75rem",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                minHeight: 56,
                letterSpacing: "-0.01em",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onApply(); }}
            style={{
              marginTop: "2rem",
              background: "#F5A623",
              border: "none",
              borderRadius: 9999,
              padding: "0.875rem 2.5rem",
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              color: "#0E1E45",
              cursor: "pointer",
              minHeight: 52,
            }}
          >
            Apply for 2026
          </button>
        </div>
      )}
    </>
  );
}
