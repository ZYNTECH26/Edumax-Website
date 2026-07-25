import { useEffect, useRef, useState } from "react";
import { fetchGalleryItems } from "../../lib/api";
import campus01 from "../../assets/gallery/campus-01.jpg";
import campus02 from "../../assets/gallery/campus-02.jpg";
import campus03 from "../../assets/gallery/campus-03.jpg";
import campus04 from "../../assets/gallery/campus-04.jpg";
import campus05 from "../../assets/gallery/campus-05.jpg";
import campus06 from "../../assets/gallery/campus-06.jpg";
import campus07 from "../../assets/gallery/campus-07.jpg";
import campus08 from "../../assets/gallery/campus-08.jpg";
import campus09 from "../../assets/gallery/campus-09.jpg";
import campus10 from "../../assets/gallery/campus-10.jpg";
import campus11 from "../../assets/gallery/campus-11.jpg";

interface Photo {
  url: string;
  alt: string;
  caption: string;
}

// Shown until the dashboard's Gallery tab has real uploaded photos (or as a
// permanent baseline) — actual Edumax Global College students, not stock photos.
const FALLBACK_PHOTOS: Photo[] = [
  { url: campus11, alt: "Students in full uniform on the school grounds", caption: "Form Group Photo" },
  { url: campus01, alt: "Students celebrating at Sports Day", caption: "Sports Day 2026" },
  { url: campus03, alt: "Netball team in match kit", caption: "Netball Team" },
  { url: campus04, alt: "Students at Sports Day", caption: "Sports Day 2026" },
  { url: campus08, alt: "Students in uniform on the school grounds", caption: "Student Life" },
  { url: campus10, alt: "Netball team in match kit", caption: "Netball Team" },
  { url: campus06, alt: "Students at Sports Day", caption: "Sports Day 2026" },
  { url: campus02, alt: "Students on the school grounds", caption: "Student Life" },
  { url: campus05, alt: "Students on the school grounds", caption: "Student Life" },
  { url: campus07, alt: "Students on the school grounds", caption: "Student Life" },
  { url: campus09, alt: "Students on the school grounds", caption: "Student Life" },
];

// Editorial masonry spans, cycled to fit however many photos are shown.
const SPAN_PATTERNS = [
  { col: "span 5", row: "span 9" },
  { col: "span 7", row: "span 6" },
  { col: "span 4", row: "span 8" },
  { col: "span 8", row: "span 6" },
  { col: "span 5", row: "span 9" },
  { col: "span 7", row: "span 7" },
];

export function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>(FALLBACK_PHOTOS);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchGalleryItems()
      .then((items) => {
        if (items.length > 0) {
          setPhotos(items.map((it) => ({ url: it.url, alt: it.alt, caption: it.caption })));
        }
      })
      .catch(() => {
        // Backend unreachable — the real local photos above are already showing.
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="gallery"
      style={{ background: "#080f24", padding: "8rem 0 0", overflow: "hidden" }}
    >
      {/* Header */}
      <div style={{
        padding: "0 3rem",
        maxWidth: 1400,
        margin: "0 auto",
        marginBottom: "4rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          paddingBottom: "2.5rem",
        }}>
          <div>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#F5A623",
              marginBottom: "0.75rem",
            }}>
              Campus Life — 2026
            </p>
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}>
              Life at<br />
              <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)", color: "transparent" }}>
                Edumax
              </span>
            </h2>
          </div>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.4)",
            maxWidth: 320,
            lineHeight: 1.7,
            margin: 0,
          }}>
            Moments of discovery, achievement, and growth — the everyday extraordinary
            happening inside our campus.
          </p>
        </div>
      </div>

      {/* Editorial grid */}
      <div style={{ padding: "0 3rem", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "60px",
          gap: "8px",
        }} className="gallery-grid">
          {photos.map((photo, i) => {
            const span = SPAN_PATTERNS[i % SPAN_PATTERNS.length];
            return (
              <div
                key={photo.url}
                style={{
                  gridColumn: span.col,
                  gridRow: span.row,
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  background: "#16295C",
                  cursor: "pointer",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.8s ease ${i * 0.1}s, transform 0.8s ease ${i * 0.1}s`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease",
                    transform: hovered === i ? "scale(1.07)" : "scale(1)",
                    filter: hovered === i ? "brightness(0.55)" : "brightness(0.45) saturate(0.8)",
                  }}
                />
                {/* Index */}
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.18)",
                  letterSpacing: "0.05em",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* Hover panel */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  padding: "3rem 1.5rem 1.5rem",
                  background: "linear-gradient(to top, rgba(8,15,36,0.95) 0%, transparent 100%)",
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}>
                  <h3 style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#ffffff",
                    margin: 0,
                  }}>
                    {photo.caption}
                  </h3>
                  <div style={{
                    width: 28,
                    height: 2,
                    background: "#F5A623",
                    borderRadius: 2,
                    marginTop: "0.5rem",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        marginTop: "5rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        padding: "1.5rem 0",
      }}>
        <div style={{
          display: "flex",
          gap: "0",
          animation: "marquee 22s linear infinite",
          whiteSpace: "nowrap",
        }}>
          {Array.from({ length: 4 }).flatMap((_, gi) =>
            ["Sports Day", "Netball", "Future Skills", "Languages", "Academic Excellence", "Student Life"].map((t, ti) => (
              <span key={`${gi}-${ti}`} style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.1)",
                padding: "0 2rem",
              }}>
                {t} <span style={{ color: "#F5A623" }}>·</span>
              </span>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 200px !important;
          }
          .gallery-grid > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
        @media (max-width: 600px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}
