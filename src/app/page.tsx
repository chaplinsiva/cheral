"use client";

/* agent-notes: { ctx: "Main application page assembling Cheral Trust sections in English, with Bank Modal", deps: [src/components/Header.tsx, src/components/Hero.tsx, src/components/AboutSection.tsx, src/components/InitiativesSection.tsx, src/components/ObjectivesSection.tsx, src/components/Footer.tsx, src/components/DonateModal.tsx], state: active, last: "sato@2026-10-06" } */

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import InitiativesSection from "@/components/InitiativesSection";
import ObjectivesSection from "@/components/ObjectivesSection";

import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";

export default function Home() {
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);

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
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Full Screen Animated Hero Slideshow */}
        <Hero currentLang="en" onExploreClick={handleScrollToAbout} />

        {/* Verbatim About Us, Mission & Vision Section */}
        <AboutSection currentLang="en" />

        {/* Core Initiatives Section (What We Do) */}
        <InitiativesSection
          currentLang="en"
          onSelectInitiative={() => setDonateModalOpen(true)}
        />

        {/* Unified 3 Key Objectives & 10 Core Values Section */}
        <ObjectivesSection currentLang="en" />
      </main>

      {/* Footer */}
      <Footer
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Official Cheral Trust Bank & UPI Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        currentLang="en"
        onClose={() => setDonateModalOpen(false)}
      />
    </div>
  );
}
