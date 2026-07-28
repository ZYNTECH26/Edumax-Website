import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../assets/egc-logo.png";

interface NavLink {
  label: string;
  href: string;
  type: "anchor" | "link" | "action";
}

interface NavItem {
  label: string;
  href?: string;
  type?: "anchor" | "link";
  children?: NavLink[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home", type: "anchor" },
  { label: "About", href: "#about", type: "anchor" },
  {
    label: "Academics",
    children: [
      { label: "Academic Streams", href: "#academics", type: "anchor" },
      { label: "Future Skills", href: "#skills", type: "anchor" },
      { label: "Languages", href: "#languages", type: "anchor" },
    ],
  },
  {
    label: "Admissions",
    children: [
      { label: "Tuition & Fees", href: "#admissions", type: "anchor" },
      { label: "Apply Now", href: "apply", type: "action" },
    ],
  },
  { label: "Blog", href: "/blog", type: "link" },
  { label: "Contact", href: "#contact", type: "anchor" },
];

export function Navbar({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (e.matches) setMenuOpen(false);
    };
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenDropdown(null); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const go = (link: NavLink) => {
    setMenuOpen(false);
    setOpenDropdown(null);
    if (link.type === "action") { onApply(); return; }
    if (link.type === "link") { window.location.href = link.href; return; }
    const el = document.querySelector(link.href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const textColor = "#ffffff";

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "calc(100% - 2rem)",
          maxWidth: 1180,
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          borderRadius: 9999,
          padding: "0.4rem 0.5rem 0.4rem 1rem",
          transition: "background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
          background: scrolled ? "#0E1E45" : "rgba(14,30,69,0.4)",
          backdropFilter: scrolled ? "none" : "blur(16px) saturate(1.5)",
          WebkitBackdropFilter: scrolled ? "none" : "blur(16px) saturate(1.5)",
          border: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.16)"}`,
          boxShadow: scrolled ? "0 14px 34px rgba(4,8,20,0.4)" : "0 8px 24px rgba(4,8,20,0.2)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => go({ label: "Home", href: "#home", type: "anchor" })}
          aria-label="Edumax Global College — home"
          style={{
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            padding: "0.25rem",
          }}
        >
          <img src={logo} alt="" style={{ width: 42, height: 42, objectFit: "contain" }} />
        </button>

        {/* Desktop nav — centered in the space between the logo and the CTAs */}
        {isDesktop && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.1rem", flex: 1 }}>
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} style={{ position: "relative" }}>
                <button
                  onClick={() => setOpenDropdown((cur) => (cur === item.label ? null : item.label))}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.55rem 0.8rem",
                    borderRadius: 9999,
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: textColor,
                    minHeight: 40,
                  }}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {openDropdown === item.label && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      left: 0,
                      minWidth: 210,
                      background: "#ffffff",
                      borderRadius: 14,
                      padding: "0.4rem",
                      boxShadow: "0 20px 50px rgba(8,15,36,0.25)",
                      animation: "navDropIn 0.18s cubic-bezier(0.23, 1, 0.32, 1) both",
                    }}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => go(child)}
                        className="press-btn"
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0.6rem 0.75rem",
                          borderRadius: 9,
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 600,
                          fontSize: "13.5px",
                          color: "#0E1E45",
                          transition: "background 0.15s, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(245,166,35,0.1)"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "none"}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.label}
                onClick={() => go({ label: item.label, href: item.href!, type: item.type! })}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.55rem 0.8rem",
                  borderRadius: 9999,
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: textColor,
                  minHeight: 40,
                }}
              >
                {item.label}
              </button>
            )
          )}
        </div>
        )}

        {/* CTAs — pinned to the right edge */}
        {isDesktop && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
          <button
            onClick={() => go({ label: "Contact", href: "#contact", type: "anchor" })}
            className="press-btn"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 9999,
              padding: "0.6rem 1.1rem",
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "#ffffff",
              cursor: "pointer",
              whiteSpace: "nowrap",
              minHeight: 40,
              transition: "background 0.2s ease, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
          >
            Enquire Now
          </button>
          <button
            onClick={onApply}
            className="press-btn"
            style={{
              background: "#F5A623",
              border: "none",
              borderRadius: 9999,
              padding: "0.6rem 1.25rem",
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              color: "#0E1E45",
              cursor: "pointer",
              whiteSpace: "nowrap",
              minHeight: 40,
              boxShadow: "0 4px 16px rgba(245,166,35,0.35)",
              transition: "box-shadow 0.2s ease, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            Apply for 2026
          </button>
        </div>
        )}

        {/* Hamburger — mobile only */}
        {!isDesktop && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="press-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            marginLeft: "auto",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            cursor: "pointer",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 42,
            minWidth: 42,
            transition: "background 0.2s, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        )}
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
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "6rem 1.5rem 3rem",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", maxWidth: 420, width: "100%", margin: "0 auto" }}>
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <button
                    onClick={() => setMobileGroupOpen((cur) => (cur === item.label ? null : item.label))}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: "#ffffff",
                      padding: "1rem 0.25rem",
                      minHeight: 56,
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={20}
                      style={{
                        transition: "transform 0.2s ease",
                        transform: mobileGroupOpen === item.label ? "rotate(180deg)" : "rotate(0deg)",
                        color: "#F5A623",
                      }}
                    />
                  </button>
                  {mobileGroupOpen === item.label && (
                    <div style={{ display: "flex", flexDirection: "column", paddingBottom: "0.75rem" }}>
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => go(child)}
                          style={{
                            textAlign: "left",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: "rgba(255,255,255,0.75)",
                            padding: "0.6rem 0.75rem",
                            minHeight: 44,
                          }}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => go({ label: item.label, href: item.href!, type: item.type! })}
                  style={{
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    color: "#ffffff",
                    padding: "1rem 0.25rem",
                    minHeight: 56,
                  }}
                >
                  {item.label}
                </button>
              )
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2rem" }}>
              <button
                onClick={() => go({ label: "Contact", href: "#contact", type: "anchor" })}
                className="press-btn"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 9999,
                  padding: "0.9rem",
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#ffffff",
                  cursor: "pointer",
                  minHeight: 52,
                }}
              >
                Enquire Now
              </button>
              <button
                onClick={() => { setMenuOpen(false); onApply(); }}
                className="press-btn"
                style={{
                  background: "#F5A623",
                  border: "none",
                  borderRadius: 9999,
                  padding: "0.9rem",
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#0E1E45",
                  cursor: "pointer",
                  minHeight: 52,
                }}
              >
                Apply for 2026
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes navDropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
