"use client";

/* agent-notes: { ctx: "Main application page assembling Cheral Trust sections (Hero, About, Initiatives with Bird Watching, Objectives, CoreValues, Bank Modal)", deps: [src/components/Header.tsx, src/components/Hero.tsx, src/components/AboutSection.tsx, src/components/InitiativesSection.tsx, src/components/ObjectivesSection.tsx, src/components/CoreValuesSection.tsx, src/components/Footer.tsx, src/components/DonateModal.tsx], state: active, last: "sato@2026-08-25" } */

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import InitiativesSection from "@/components/InitiativesSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import CoreValuesSection from "@/components/CoreValuesSection";

import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<"en" | "ta">("en");
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);

  const handleToggleLang = (lang: "en" | "ta") => {
    setCurrentLang(lang);
  };

  const handleScrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EF]">
      {/* Header */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Full Screen Animated Hero Slideshow */}
        <Hero currentLang={currentLang} onExploreClick={handleScrollToAbout} />

        {/* Verbatim About Us, Mission & Vision Section */}
        <AboutSection currentLang={currentLang} />

        {/* Core Initiatives Section (What We Do) */}
        <InitiativesSection
          currentLang={currentLang}
          onSelectInitiative={() => setDonateModalOpen(true)}
        />

        {/* 3 Key Objectives Section */}
        <ObjectivesSection currentLang={currentLang} />

        {/* 10 Core Values Section (placed after Objectives) */}
        <CoreValuesSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Official Cheral Trust Bank & UPI Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        currentLang={currentLang}
        onClose={() => setDonateModalOpen(false)}
      />
    </div>
  );
}
