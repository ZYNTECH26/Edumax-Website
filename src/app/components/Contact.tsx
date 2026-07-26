import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, MessageCircle, Send, ChevronDown } from "lucide-react";

const WHATSAPP_NUMBER = "263771503198";

export function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    form_level: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Hello, I'd like to enquire about Edumax Global College admissions.`,
      `Name: ${form.name}`,
      `Contact: ${form.phone}`,
      `Form applying for: ${form.form_level}`,
      form.message ? `Message: ${form.message}` : null,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Edumax%20Global%20College%20admissions.`;

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        background: "linear-gradient(135deg, #0E1E45 0%, #16295C 100%)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold blob */}
      <div style={{
        position: "absolute",
        bottom: "-20%",
        right: "-10%",
        width: "45vw",
        height: "45vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)",
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
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            color: "#ffffff",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}>
            Enrolment for 2026 is Open —{" "}
            <span style={{ color: "#F5A623" }}>Secure Your Child's Place Today</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(25px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}
          className="contact-grid"
        >
          {/* Left: Contact info */}
          <div>
            <h3 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#ffffff",
              marginBottom: "2rem",
            }}>
              Get in Touch
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {[
                {
                  icon: <MapPin size={20} strokeWidth={1.5} />,
                  label: "Address",
                  value: "Budiriro Cabs Stand No. 21899, near Big Save Supermarket, Harare",
                },
                {
                  icon: <Phone size={20} strokeWidth={1.5} />,
                  label: "Phone",
                  value: "0771 503 198 | 0774 880 751",
                },
                {
                  icon: <MessageCircle size={20} strokeWidth={1.5} />,
                  label: "WhatsApp",
                  value: "0771 503 198",
                },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(245,166,35,0.15)",
                    border: "1px solid rgba(245,166,35,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F5A623",
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.2rem",
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.95rem",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.5,
                    }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "#25D366",
                borderRadius: 12,
                padding: "0.875rem 1.5rem",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#ffffff",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(37,211,102,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.3)";
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(0.97)"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            >
              <MessageCircle size={20} />
              Chat with us on WhatsApp
            </a>

            {/* Map placeholder */}
            <div style={{
              marginTop: "2rem",
              borderRadius: 16,
              overflow: "hidden",
              height: 200,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.5rem",
            }}>
              <MapPin size={28} color="#F5A623" />
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
              }}>
                Budiriro, Harare, Zimbabwe
              </span>
            </div>
          </div>

          {/* Right: Enquiry form */}
          <div style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: "2.5rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  color: "#0E1E45",
                  marginBottom: "0.75rem",
                }}>
                  Almost there!
                </h3>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  color: "#5a6485",
                  lineHeight: 1.6,
                }}>
                  We've opened WhatsApp with your enquiry pre-filled — just hit send
                  and we'll get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#0E1E45",
                  marginBottom: "1.75rem",
                }}>
                  Submit an Enquiry
                </h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "e.g. Tatenda Moyo" },
                    { name: "phone", label: "Parent / Guardian Contact Number", type: "tel", placeholder: "e.g. 0771 503 198" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label style={{
                        display: "block",
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#0E1E45",
                        marginBottom: "0.4rem",
                      }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={(form as any)[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        style={{
                          width: "100%",
                          border: "1.5px solid rgba(14,30,69,0.15)",
                          borderRadius: 10,
                          padding: "0.75rem 1rem",
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "0.9rem",
                          color: "#0E1E45",
                          background: "#F7F8FB",
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#F5A623")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14,30,69,0.15)")}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#0E1E45",
                      marginBottom: "0.4rem",
                    }}>
                      Form Applying For
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="form_level"
                        value={form.form_level}
                        onChange={handleChange}
                        required
                        style={{
                          width: "100%",
                          border: "1.5px solid rgba(14,30,69,0.15)",
                          borderRadius: 10,
                          padding: "0.75rem 2.5rem 0.75rem 1rem",
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "0.9rem",
                          color: form.form_level ? "#0E1E45" : "#8a93a8",
                          background: "#F7F8FB",
                          outline: "none",
                          appearance: "none",
                          boxSizing: "border-box",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" disabled>Select form level</option>
                        {["Form 1", "Form 2", "Form 3", "Form 4", "Form 5 (A Level)", "Form 6 (A Level)"].map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} color="#5a6485" style={{
                        position: "absolute",
                        right: "0.75rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }} />
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#0E1E45",
                      marginBottom: "0.4rem",
                    }}>
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any specific questions or requirements..."
                      style={{
                        width: "100%",
                        border: "1.5px solid rgba(14,30,69,0.15)",
                        borderRadius: 10,
                        padding: "0.75rem 1rem",
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "0.9rem",
                        color: "#0E1E45",
                        background: "#F7F8FB",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#F5A623")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14,30,69,0.15)")}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#F5A623",
                      border: "none",
                      borderRadius: 12,
                      padding: "0.875rem",
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#0E1E45",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(245,166,35,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(245,166,35,0.35)";
                    }}
                    onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(0.97)"; }}
                    onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  >
                    Submit Enquiry <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
