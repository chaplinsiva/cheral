"use client";

/* agent-notes: { ctx: "Main application page assembling Cheral components, language state, and Donate modal", deps: [src/components/Header.tsx, src/components/Hero.tsx, src/components/DestinationExplorer.tsx, src/components/ItineraryModal.tsx, src/components/TrustMetrics.tsx, src/components/Footer.tsx, src/components/DonateModal.tsx], state: active, last: "sato@2026-07-26" } */
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DestinationExplorer from "@/components/DestinationExplorer";
import ItineraryModal from "@/components/ItineraryModal";
import TrustMetrics from "@/components/TrustMetrics";
import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";
import { Destination } from "@/data/destinations";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<"en" | "ta">("en");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);

  const handleToggleLang = (lang: "en" | "ta") => {
    setCurrentLang(lang);
  };

  const handleScrollToDestinations = () => {
    const el = document.getElementById("destinations");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EF]">
      {/* Header with Larger Bilingual Logo & Donate CTA */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-grow">
        <Hero currentLang={currentLang} onExploreClick={handleScrollToDestinations} />

        {/* Destination Explorer & Trust Scores */}
        <DestinationExplorer
          currentLang={currentLang}
          onSelectDestination={(dest) => setSelectedDestination(dest)}
        />

        {/* Trust Metrics & Ratings */}
        <TrustMetrics currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Interactive Heritage Itinerary Modal */}
      <ItineraryModal
        destination={selectedDestination}
        currentLang={currentLang}
        onClose={() => setSelectedDestination(null)}
      />

      {/* Cultural Heritage Preservation Donate Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        currentLang={currentLang}
        onClose={() => setDonateModalOpen(false)}
      />
    </div>
  );
}
