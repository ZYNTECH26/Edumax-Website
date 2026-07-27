import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TrustBar } from "../components/TrustBar";
import { StatsStrip } from "../components/StatsStrip";
import { Academics } from "../components/Academics";
import { Languages } from "../components/Languages";
import { Facilities } from "../components/Facilities";
import { FutureSkills } from "../components/FutureSkills";
import { Admissions } from "../components/Admissions";
import { Gallery } from "../components/Gallery";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { ApplicationForm } from "../components/ApplicationForm";

export default function PublicSite() {
  const [showApplication, setShowApplication] = useState(false);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif" }}>
      <Navbar onApply={() => setShowApplication(true)} />
      <Hero onApply={() => setShowApplication(true)} />
      <TrustBar />
      <StatsStrip />
      <Academics />
      <Languages />
      <Facilities />
      <FutureSkills />
      <Admissions onApply={() => setShowApplication(true)} />
      <Gallery />
      <Contact />
      <Footer onApply={() => setShowApplication(true)} />

      {showApplication && (
        <ApplicationForm onClose={() => setShowApplication(false)} />
      )}

      <style>{`
        html { scroll-behavior: smooth; }
        html, body { overflow-x: hidden; max-width: 100%; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(14,30,69,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(14,30,69,0.4); }

        /* Shared press feedback — buttons feel like they're actually listening */
        .press-btn { transition: transform 120ms cubic-bezier(0.23, 1, 0.32, 1); }
        .press-btn:active { transform: scale(0.97); }

        @media (hover: none) and (pointer: coarse) {
          .press-btn:active { transform: scale(0.96); }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
