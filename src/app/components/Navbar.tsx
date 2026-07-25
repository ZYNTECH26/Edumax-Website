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
          height: 72,
          display: "flex",
          alignItems: "center",
          padding: "0 2rem",
          transition: "background 0.25s ease, border-color 0.25s ease",
          background: scrolled ? "rgba(255,255,255,0.98)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(14,30,69,0.1)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("#home", "anchor")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img src={logo} alt="" style={{ width: 38, height: 38, objectFit: "contain", flexShrink: 0 }} />
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "1.2rem",
            letterSpacing: "-0.01em",
            color: scrolled ? "#0E1E45" : "#ffffff",
            lineHeight: 1,
            transition: "color 0.25s",
          }}>
            Edumax
          </span>
          <span style={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: scrolled ? "#6b6560" : "rgba(255,255,255,0.55)",
            transition: "color 0.25s",
          }}>
            Global College
          </span>
        </button>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.1rem", marginLeft: "auto", marginRight: "1.5rem" }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href, link.type)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem 0.75rem",
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: scrolled ? "#14161A" : "rgba(255,255,255,0.85)",
                transition: "color 0.2s",
                minHeight: 44,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA — hard-edged, no rounded pill, no box-shadow */}
        <button
          onClick={onApply}
          className="hidden md:block"
          style={{
            background: "#F5A623",
            border: "none",
            padding: "0.55rem 1.35rem",
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: "#0E1E45",
            cursor: "pointer",
            whiteSpace: "nowrap",
            minHeight: 44,
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

      {/* Mobile overlay — flat navy, no blur */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "#0E1E45",
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
