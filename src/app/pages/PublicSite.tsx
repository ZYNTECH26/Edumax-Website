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
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(14,30,69,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(14,30,69,0.4); }
      `}</style>
    </div>
  );
}
