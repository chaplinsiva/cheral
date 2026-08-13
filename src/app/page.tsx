"use client";

/* agent-notes: { ctx: "Main application page assembling 100% verbatim Cheral Trust sections extracted from brochure (Hero, AboutSection, 4 Initiatives, 10 Core Values, 3 Objectives, GallerySection, Bank/UPI Modal)", deps: [src/components/Header.tsx, src/components/Hero.tsx, src/components/AboutSection.tsx, src/components/InitiativesSection.tsx, src/components/CoreValuesSection.tsx, src/components/ObjectivesSection.tsx, src/components/GallerySection.tsx, src/components/Footer.tsx, src/components/DonateModal.tsx], state: active, last: "sato@2026-08-13" } */

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import InitiativesSection from "@/components/InitiativesSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import ObjectivesSection from "@/components/ObjectivesSection";

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

        {/* 4 Core Initiatives Section (What We Do) */}
        <InitiativesSection
          currentLang={currentLang}
          onSelectInitiative={() => setDonateModalOpen(true)}
        />

        {/* 10 Core Values Section */}
        <CoreValuesSection currentLang={currentLang} />

        {/* 3 Key Objectives Section */}
        <ObjectivesSection currentLang={currentLang} />


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
