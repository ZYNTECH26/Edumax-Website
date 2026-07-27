import { useEffect, useRef, useState } from "react";
import { Check, ExternalLink } from "lucide-react";

const plans = [
  {
    level: "Form 1–4",
    price: "$150",
    period: "per term",
    detail: "Payable in 3 equal instalments",
    features: [
      "Full ZIMSEC curriculum",
      "Science & Computer Lab access",
      "German & French languages",
      "Future Skills programme",
      "Extra-curricular activities",
    ],
    featured: false,
  },
  {
    level: "A Level — Pure Sciences",
    price: "$240",
    period: "per year",
    detail: "Payable in 2 equal instalments",
    features: [
      "Cambridge International syllabus",
      "Advanced laboratory practicals",
      "Mathematics & Sciences focus",
      "University application support",
      "Future Skills programme",
    ],
    featured: true,
  },
  {
    level: "A Level — Business & Humanities",
    price: "$200",
    period: "per year",
    detail: "Payable in 2 equal instalments",
    features: [
      "Cambridge International syllabus",
      "Economics & Business focus",
      "Language options: German, French",
      "University application support",
      "Future Skills programme",
    ],
    featured: false,
  },
];

export function Admissions({ onApply }: { onApply: () => void }) {
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
      id="admissions"
      style={{
        background: "#F7F8FB",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div style={{
            display: "inline-block",
            background: "rgba(245,166,35,0.12)",
            border: "1px solid rgba(245,166,35,0.3)",
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
              color: "#e08e10",
            }}>
              2026 Enrolment
            </span>
          </div>
          <h2 style={{ color: "#0E1E45", marginBottom: "0.75rem" }}>
            Transparent Tuition Fees
          </h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1.05rem",
            color: "#5a6485",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.65,
          }}>
            Flexible payment plans for every level — invest in your child's future today.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          alignItems: "start",
        }}
          className="admissions-grid"
        >
          {plans.map((plan, i) => {
            const restingScale = plan.featured ? 1.03 : 1;
            const offsetX = i === 0 ? -28 : i === 2 ? 28 : 0;
            const enterScale = plan.featured ? 0.94 : 0.98;
            return (
            <div
              key={plan.level}
              style={{
                background: plan.featured ? "#0E1E45" : "#ffffff",
                borderRadius: 20,
                padding: "2rem",
                border: plan.featured ? "none" : "1px solid rgba(14,30,69,0.08)",
                borderTop: plan.featured ? "none" : "4px solid #F5A623",
                boxShadow: plan.featured
                  ? "0 20px 60px rgba(14,30,69,0.25)"
                  : "0 4px 20px rgba(14,30,69,0.06)",
                transform: visible
                  ? `translateX(0) scale(${restingScale})`
                  : `translateX(${offsetX}px) scale(${enterScale})`,
                position: "relative",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.12}s, box-shadow 0.25s ease`,
              }}
              onMouseEnter={(e) => {
                if (!plan.featured) {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(14,30,69,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.featured) {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(14,30,69,0.06)";
                }
              }}
            >
              {plan.featured && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #F5A623, #e08e10)",
                  borderRadius: "20px 20px 0 0",
                }} />
              )}

              {plan.featured && (
                <div style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#F5A623",
                  borderRadius: 9999,
                  padding: "0.2rem 0.875rem",
                }}>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#0E1E45",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: plan.featured ? "rgba(255,255,255,0.6)" : "#5a6485",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
              }}>
                {plan.level}
              </div>

              <div style={{ marginBottom: "0.25rem" }}>
                <span style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "2.5rem",
                  color: plan.featured ? "#F5A623" : "#0E1E45",
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.9rem",
                  color: plan.featured ? "rgba(255,255,255,0.5)" : "#5a6485",
                  marginLeft: "0.35rem",
                }}>
                  {plan.period}
                </span>
              </div>

              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.8rem",
                color: plan.featured ? "rgba(255,255,255,0.55)" : "#5a6485",
                marginBottom: "1.5rem",
                padding: "0.5rem 0",
                borderBottom: `1px solid ${plan.featured ? "rgba(255,255,255,0.12)" : "rgba(14,30,69,0.08)"}`,
              }}>
                {plan.detail}
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem" }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.6rem",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.875rem",
                    color: plan.featured ? "rgba(255,255,255,0.8)" : "#3a4060",
                  }}>
                    <Check size={14} color="#F5A623" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                className="press-btn"
                style={{
                  width: "100%",
                  border: plan.featured ? "2px solid #F5A623" : "2px solid #0E1E45",
                  borderRadius: 12,
                  padding: "0.75rem",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: plan.featured ? "#F5A623" : "#0E1E45",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                }}
                onClick={onApply}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (plan.featured) {
                    el.style.background = "#F5A623";
                    el.style.color = "#0E1E45";
                  } else {
                    el.style.background = "#0E1E45";
                    el.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = plan.featured ? "#F5A623" : "#0E1E45";
                }}
              >
                Apply Now <ExternalLink size={14} />
              </button>
            </div>
          );})}
        </div>

        <p style={{
          textAlign: "center",
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.8rem",
          color: "#8a93a8",
          marginTop: "2rem",
          lineHeight: 1.5,
        }}>
          Fees are subject to review. Contact the school office for full payment terms and conditions.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admissions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
