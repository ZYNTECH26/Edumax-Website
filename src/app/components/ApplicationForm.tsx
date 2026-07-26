import { useState, useEffect, cloneElement, isValidElement } from "react";
import { X, ChevronRight, ChevronLeft, Check, User, BookOpen, Users, FileText, CheckCircle, Loader } from "lucide-react";
import { submitApplication } from "../../lib/api";

interface Props {
  onClose: () => void;
}

const STEPS = [
  { id: 1, label: "Student Info", icon: <User size={16} /> },
  { id: 2, label: "Academic", icon: <BookOpen size={16} /> },
  { id: 3, label: "Guardian", icon: <Users size={16} /> },
  { id: 4, label: "Review", icon: <FileText size={16} /> },
];

const INPUT_STYLE: React.CSSProperties = {
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
  appearance: "none",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "'Manrope', sans-serif",
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "#0E1E45",
  marginBottom: "0.4rem",
  letterSpacing: "0.02em",
};

const toFieldId = (label: string) =>
  `app-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  const id = toFieldId(label);
  return (
    <div>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label} {required && <span style={{ color: "#F5A623" }}>*</span>}
      </label>
      {isValidElement(children) ? cloneElement(children, { id } as any) : children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", name, id }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; name?: string; id?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...INPUT_STYLE, borderColor: focused ? "#F5A623" : "rgba(14,30,69,0.15)" }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function Select({ value, onChange, options, placeholder, id }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string; id?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...INPUT_STYLE,
        borderColor: focused ? "#F5A623" : "rgba(14,30,69,0.15)",
        color: value ? "#0E1E45" : "#8a93a8",
        cursor: "pointer",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <option value="" disabled>{placeholder || "Select…"}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Grid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: "1.25rem",
    }} className="form-grid">
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "1rem",
      padding: "0.75rem 0",
      borderBottom: "1px solid rgba(14,30,69,0.07)",
    }}>
      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "#5a6485", flexShrink: 0 }}>
        {label}
      </span>
      <span style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "#0E1E45",
        textAlign: "right",
      }}>
        {value || <span style={{ color: "#ccc", fontWeight: 400 }}>—</span>}
      </span>
    </div>
  );
}

export function ApplicationForm({ onClose }: Props) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Step 1 — Student
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [idNumber, setIdNumber] = useState("");

  // Step 2 — Academic
  const [formLevel, setFormLevel] = useState("");
  const [stream, setStream] = useState("");
  const [prevSchool, setPrevSchool] = useState("");
  const [prevGrade, setPrevGrade] = useState("");
  const [startTerm, setStartTerm] = useState("");
  const [additionalNeeds, setAdditionalNeeds] = useState("");

  // Step 3 — Guardian
  const [guardianName, setGuardianName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [guardianAlt, setGuardianAlt] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [address, setAddress] = useState("");

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const canNext = () => {
    if (step === 1) return firstName && lastName && dob && gender;
    if (step === 2) return formLevel && prevSchool && startTerm;
    if (step === 3) return guardianName && relationship && guardianPhone && address;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitApplication({
        first_name: firstName,
        last_name: lastName,
        dob,
        gender,
        nationality,
        id_number: idNumber,
        form_level: formLevel,
        stream,
        prev_school: prevSchool,
        prev_grade: prevGrade,
        start_term: startTerm,
        additional_needs: additionalNeeds,
        guardian_name: guardianName,
        relationship,
        guardian_phone: guardianPhone,
        guardian_alt: guardianAlt,
        guardian_email: guardianEmail,
        address,
      });
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(8,15,36,0.92)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 760,
          background: "#ffffff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "95vh",
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #0E1E45, #16295C)",
          padding: "1.75rem 2rem",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          flexShrink: 0,
        }}>
          <div>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#F5A623",
              marginBottom: "0.35rem",
            }}>
              Edumax Global College
            </p>
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.2,
            }}>
              2026 Admission Application
            </h2>
          </div>
          <button
            onClick={onClose}
            className="press-btn"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%",
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.6)",
              flexShrink: 0,
              transition: "background 0.2s, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"}
          >
            <X size={17} />
          </button>
        </div>

        {/* Step indicators */}
        {!submitted && (
          <div style={{
            display: "flex",
            alignItems: "center",
            padding: "1.25rem 2rem",
            borderBottom: "1px solid rgba(14,30,69,0.08)",
            background: "#F7F8FB",
            flexShrink: 0,
            gap: 0,
          }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: step > s.id ? "#F5A623" : step === s.id ? "#0E1E45" : "rgba(14,30,69,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: step >= s.id ? "#ffffff" : "#5a6485",
                    transition: "background 0.3s",
                    flexShrink: 0,
                  }}>
                    {step > s.id ? <Check size={14} strokeWidth={2.5} /> : s.icon}
                  </div>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: step === s.id ? 700 : 500,
                    color: step === s.id ? "#0E1E45" : "#8a93a8",
                    whiteSpace: "nowrap",
                  }} className="step-label">
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: 1.5,
                    background: step > s.id ? "#F5A623" : "rgba(14,30,69,0.12)",
                    margin: "0 0.75rem",
                    transition: "background 0.3s",
                  }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div style={{
          padding: "2rem",
          overflowY: "auto",
          flex: 1,
        }}>
          {submitted ? (
            /* Success */
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "3rem 1rem",
              gap: "1.25rem",
            }}>
              <div style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F5A623, #e08e10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 30px rgba(245,166,35,0.3)",
              }}>
                <CheckCircle size={36} color="#0E1E45" strokeWidth={2} />
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "#0E1E45",
                  marginBottom: "0.5rem",
                }}>
                  Application Submitted!
                </h3>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.95rem",
                  color: "#5a6485",
                  lineHeight: 1.65,
                  maxWidth: 400,
                  margin: "0 auto",
                }}>
                  Thank you, <strong style={{ color: "#0E1E45" }}>{firstName} {lastName}</strong>. We've received your application
                  for <strong style={{ color: "#0E1E45" }}>{formLevel}</strong> at Edumax Global College.
                </p>
              </div>
              <div style={{
                background: "#F7F8FB",
                borderRadius: 12,
                padding: "1rem 1.5rem",
                maxWidth: 400,
                width: "100%",
              }}>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.825rem",
                  color: "#5a6485",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  Our admissions team will contact <strong>{guardianName}</strong> at{" "}
                  <strong>{guardianPhone}</strong> within 2–3 business days to confirm next steps.
                </p>
              </div>
              <button
                onClick={onClose}
                className="press-btn"
                style={{
                  background: "#F5A623",
                  border: "none",
                  borderRadius: 12,
                  padding: "0.75rem 2rem",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#0E1E45",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <div
              key={step}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                animation: `${direction === 1 ? "stepInRight" : "stepInLeft"} 0.35s cubic-bezier(0.23, 1, 0.32, 1) both`,
              }}
            >

              {/* Step 1 — Student Info */}
              {step === 1 && (
                <>
                  <div style={{ marginBottom: "0.25rem" }}>
                    <h3 style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#0E1E45",
                      marginBottom: "0.25rem",
                    }}>
                      Student Information
                    </h3>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.825rem", color: "#8a93a8" }}>
                      Tell us about the student applying for admission.
                    </p>
                  </div>
                  <Grid>
                    <Field label="First Name" required>
                      <Input value={firstName} onChange={setFirstName} placeholder="e.g. Chiedza" />
                    </Field>
                    <Field label="Last Name" required>
                      <Input value={lastName} onChange={setLastName} placeholder="e.g. Moyo" />
                    </Field>
                  </Grid>
                  <Grid>
                    <Field label="Date of Birth" required>
                      <Input type="date" value={dob} onChange={setDob} />
                    </Field>
                    <Field label="Gender" required>
                      <Select value={gender} onChange={setGender} options={["Female", "Male", "Prefer not to say"]} placeholder="Select gender" />
                    </Field>
                  </Grid>
                  <Grid>
                    <Field label="Nationality">
                      <Input value={nationality} onChange={setNationality} placeholder="e.g. Zimbabwean" />
                    </Field>
                    <Field label="National ID / Birth Certificate No.">
                      <Input value={idNumber} onChange={setIdNumber} placeholder="e.g. 63-123456A78" />
                    </Field>
                  </Grid>
                </>
              )}

              {/* Step 2 — Academic */}
              {step === 2 && (
                <>
                  <div style={{ marginBottom: "0.25rem" }}>
                    <h3 style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#0E1E45",
                      marginBottom: "0.25rem",
                    }}>
                      Academic Details
                    </h3>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.825rem", color: "#8a93a8" }}>
                      Let us know which level and stream the student is applying for.
                    </p>
                  </div>
                  <Grid>
                    <Field label="Form Level Applying For" required>
                      <Select
                        value={formLevel}
                        onChange={setFormLevel}
                        options={["Form 1", "Form 2", "Form 3", "Form 4", "Form 5 (Lower 6th)", "Form 6 (Upper 6th)"]}
                        placeholder="Select form"
                      />
                    </Field>
                    <Field label="Academic Stream">
                      <Select
                        value={stream}
                        onChange={setStream}
                        options={["Humanities", "Pure Sciences", "Business Sciences", "Undecided"]}
                        placeholder="Select stream"
                      />
                    </Field>
                  </Grid>
                  <Grid>
                    <Field label="Previous School" required>
                      <Input value={prevSchool} onChange={setPrevSchool} placeholder="Name of previous school" />
                    </Field>
                    <Field label="Last Grade / Form Completed">
                      <Input value={prevGrade} onChange={setPrevGrade} placeholder="e.g. Grade 7 / Form 4" />
                    </Field>
                  </Grid>
                  <Grid>
                    <Field label="Preferred Start Term" required>
                      <Select
                        value={startTerm}
                        onChange={setStartTerm}
                        options={["Term 1 — January 2026", "Term 2 — May 2026", "Term 3 — September 2026"]}
                        placeholder="Select term"
                      />
                    </Field>
                  </Grid>
                  <Field label="Special Educational Needs or Requirements">
                    <textarea
                      value={additionalNeeds}
                      onChange={(e) => setAdditionalNeeds(e.target.value)}
                      rows={3}
                      placeholder="Describe any learning support needs, medical conditions, or accessibility requirements (optional)…"
                      style={{
                        ...INPUT_STYLE,
                        resize: "vertical",
                        minHeight: 90,
                      }}
                    />
                  </Field>
                </>
              )}

              {/* Step 3 — Guardian */}
              {step === 3 && (
                <>
                  <div style={{ marginBottom: "0.25rem" }}>
                    <h3 style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#0E1E45",
                      marginBottom: "0.25rem",
                    }}>
                      Parent / Guardian Details
                    </h3>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.825rem", color: "#8a93a8" }}>
                      We'll use these details to contact you throughout the admissions process.
                    </p>
                  </div>
                  <Grid>
                    <Field label="Full Name" required>
                      <Input value={guardianName} onChange={setGuardianName} placeholder="Parent / guardian full name" />
                    </Field>
                    <Field label="Relationship to Student" required>
                      <Select
                        value={relationship}
                        onChange={setRelationship}
                        options={["Mother", "Father", "Legal Guardian", "Grandparent", "Other"]}
                        placeholder="Select relationship"
                      />
                    </Field>
                  </Grid>
                  <Grid>
                    <Field label="Primary Phone / WhatsApp" required>
                      <Input type="tel" value={guardianPhone} onChange={setGuardianPhone} placeholder="e.g. 0771 503 198" />
                    </Field>
                    <Field label="Alternative Phone">
                      <Input type="tel" value={guardianAlt} onChange={setGuardianAlt} placeholder="e.g. 0774 880 751" />
                    </Field>
                  </Grid>
                  <Field label="Email Address">
                    <Input type="email" value={guardianEmail} onChange={setGuardianEmail} placeholder="e.g. parent@email.com" />
                  </Field>
                  <Field label="Home Address" required>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      placeholder="Full home address including suburb and city…"
                      style={{ ...INPUT_STYLE, resize: "vertical", minHeight: 80 }}
                    />
                  </Field>
                </>
              )}

              {/* Step 4 — Review */}
              {step === 4 && (
                <>
                  <div style={{ marginBottom: "0.25rem" }}>
                    <h3 style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#0E1E45",
                      marginBottom: "0.25rem",
                    }}>
                      Review & Submit
                    </h3>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.825rem", color: "#8a93a8" }}>
                      Please review the details below before submitting your application.
                    </p>
                  </div>

                  {[
                    {
                      title: "Student Information",
                      rows: [
                        ["Full Name", `${firstName} ${lastName}`],
                        ["Date of Birth", dob],
                        ["Gender", gender],
                        ["Nationality", nationality],
                        ["ID / Birth Cert No.", idNumber],
                      ],
                    },
                    {
                      title: "Academic Details",
                      rows: [
                        ["Form Level", formLevel],
                        ["Stream", stream],
                        ["Previous School", prevSchool],
                        ["Last Grade", prevGrade],
                        ["Start Term", startTerm],
                        ["Special Needs", additionalNeeds || "None specified"],
                      ],
                    },
                    {
                      title: "Parent / Guardian",
                      rows: [
                        ["Name", guardianName],
                        ["Relationship", relationship],
                        ["Primary Phone", guardianPhone],
                        ["Alt Phone", guardianAlt || "—"],
                        ["Email", guardianEmail || "—"],
                        ["Address", address],
                      ],
                    },
                  ].map((group) => (
                    <div key={group.title} style={{
                      background: "#F7F8FB",
                      borderRadius: 12,
                      padding: "1.25rem 1.5rem",
                      border: "1px solid rgba(14,30,69,0.07)",
                    }}>
                      <h4 style={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        color: "#0E1E45",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        marginBottom: "0.75rem",
                      }}>
                        {group.title}
                      </h4>
                      {group.rows.map(([label, value]) => (
                        <ReviewRow key={label} label={label} value={value} />
                      ))}
                    </div>
                  ))}

                  <div style={{
                    background: "rgba(245,166,35,0.08)",
                    border: "1px solid rgba(245,166,35,0.25)",
                    borderRadius: 10,
                    padding: "0.875rem 1.1rem",
                    display: "flex",
                    gap: "0.65rem",
                    alignItems: "flex-start",
                  }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>ℹ️</span>
                    <p style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.78rem",
                      color: "#6b5500",
                      lineHeight: 1.55,
                      margin: 0,
                    }}>
                      By submitting this form you confirm that all information provided is accurate.
                      Our admissions team will contact you within 2–3 business days.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer nav */}
        {!submitted && (
          <div style={{
            padding: "1.25rem 2rem",
            borderTop: "1px solid rgba(14,30,69,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#ffffff",
            flexShrink: 0,
          }}>
            <button
              onClick={() => { setDirection(-1); setStep((s) => s - 1); }}
              disabled={step === 1}
              className="press-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "none",
                border: "1.5px solid rgba(14,30,69,0.15)",
                borderRadius: 10,
                padding: "0.65rem 1.25rem",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: step === 1 ? "#ccc" : "#0E1E45",
                cursor: step === 1 ? "not-allowed" : "pointer",
                transition: "border-color 0.2s, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <ChevronLeft size={16} /> Back
            </button>

            <div style={{ display: "flex", gap: "0.4rem" }}>
              {STEPS.map((s) => (
                <div key={s.id} style={{
                  width: step === s.id ? 20 : 6,
                  height: 6,
                  borderRadius: 9999,
                  background: step > s.id ? "#F5A623" : step === s.id ? "#0E1E45" : "rgba(14,30,69,0.15)",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>

            {step < 4 ? (
              <button
                onClick={() => { if (canNext()) { setDirection(1); setStep((s) => s + 1); } }}
                className="press-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: canNext() ? "#0E1E45" : "rgba(14,30,69,0.2)",
                  border: "none",
                  borderRadius: 10,
                  padding: "0.65rem 1.25rem",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: canNext() ? "#ffffff" : "#aaa",
                  cursor: canNext() ? "pointer" : "not-allowed",
                  transition: "background 0.2s, transform 120ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                {submitError && (
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.78rem",
                    color: "#8B1E2D",
                    background: "rgba(139,30,45,0.08)",
                    border: "1px solid rgba(139,30,45,0.2)",
                    borderRadius: 8,
                    padding: "0.4rem 0.75rem",
                  }}>
                    ⚠ {submitError}
                  </span>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="press-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: submitting ? "rgba(245,166,35,0.6)" : "#F5A623",
                    border: "none",
                    borderRadius: 10,
                    padding: "0.65rem 1.5rem",
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: "#0E1E45",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
                    transition: "transform 120ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader size={15} style={{ animation: "spin 0.8s linear infinite" }} />
                      Submitting…
                    </>
                  ) : (
                    <>Submit Application <Check size={16} strokeWidth={2.5} /></>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .step-label { display: none; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes stepInRight {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes stepInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
