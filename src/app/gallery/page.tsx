"use client";

/* agent-notes: { ctx: "Dynamic magazine-style large photo collage mosaic with responsive tile spans and immersive lightbox", deps: [src/components/Header.tsx, src/components/Footer.tsx, src/components/DonateModal.tsx, src/data/cheralData.ts], state: active, last: "sato@2026-08-30" } */

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";
import { cheralGalleryItems, GalleryItem } from "@/data/cheralData";

export default function GalleryPage() {
  const [currentLang, setCurrentLang] = useState<"en" | "ta">("en");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);

  const handleToggleLang = (lang: "en" | "ta") => {
    setCurrentLang(lang);
  };

  // Lightbox Navigation Handlers
  const handlePrev = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = cheralGalleryItems.findIndex((item) => item.id === activeItem.id);
    if (currentIndex > 0) {
      setActiveItem(cheralGalleryItems[currentIndex - 1]);
    } else {
      setActiveItem(cheralGalleryItems[cheralGalleryItems.length - 1]);
    }
  }, [activeItem]);

  const handleNext = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = cheralGalleryItems.findIndex((item) => item.id === activeItem.id);
    if (currentIndex < cheralGalleryItems.length - 1) {
      setActiveItem(cheralGalleryItems[currentIndex + 1]);
    } else {
      setActiveItem(cheralGalleryItems[0]);
    }
  }, [activeItem]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, handlePrev, handleNext]);

  const t = {
    en: {
      breadcrumbHome: "Home",
      breadcrumbGallery: "Gallery",
      badge: "VISUAL ARCHIVES",
      mainTitle: "Cheral Photo Collage",
      photoCount: `${cheralGalleryItems.length} Photographs`,
    },
    ta: {
      breadcrumbHome: "முகப்பு",
      breadcrumbGallery: "காட்சியகம்",
      badge: "களப் புகைப்படங்கள்",
      mainTitle: "சேரல் புகைப்படத் தொகுப்பு",
      photoCount: `${cheralGalleryItems.length} படங்கள்`,
    },
  }[currentLang];

  // Dynamic mosaic pattern spans for large, dramatic collage layout
  const getCollageSpanClass = (index: number) => {
    const pattern = index % 8;
    switch (pattern) {
      case 0:
        // Large prominent hero tile (2 cols, 2 rows on desktop)
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 sm:row-span-2 min-h-[300px] sm:min-h-[460px] lg:min-h-[520px]";
      case 1:
        // Standard medium tile
        return "col-span-1 sm:col-span-1 lg:col-span-1 min-h-[220px] sm:min-h-[260px]";
      case 2:
        // Standard medium tile
        return "col-span-1 sm:col-span-1 lg:col-span-1 min-h-[220px] sm:min-h-[260px]";
      case 3:
        // Wide panoramic tile (spans 2 cols)
        return "col-span-1 sm:col-span-2 lg:col-span-2 min-h-[260px] sm:min-h-[320px]";
      case 4:
        // Tall portrait style tile
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 sm:row-span-2 min-h-[300px] sm:min-h-[480px]";
      case 5:
        // Featured square tile
        return "col-span-1 sm:col-span-1 lg:col-span-1 min-h-[220px] sm:min-h-[260px]";
      case 6:
        // Extra large landscape tile
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 sm:row-span-2 min-h-[300px] sm:min-h-[480px]";
      case 7:
        // Balanced medium tile
        return "col-span-1 sm:col-span-1 lg:col-span-1 min-h-[220px] sm:min-h-[260px]";
      default:
        return "col-span-1 min-h-[240px]";
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

      {/* Main Collage Content */}
      <main className="flex-grow">
        {/* Minimal Hero Header */}
        <section className="bg-[#4A0E17] text-[#F7F3EF] py-12 sm:py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#a62a14]/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#2D0A0E] blur-3xl pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#E8D9CC]/70 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                {t.breadcrumbHome}
              </Link>
              <span>/</span>
              <span className="text-[#a62a14] bg-[#a62a14]/20 px-2.5 py-0.5 rounded-full">
                {t.breadcrumbGallery}
              </span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#a62a14]/40 text-white font-semibold text-[11px] tracking-wider uppercase mb-2 border border-[#a62a14]/60">
                  {t.badge}
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
                  {t.mainTitle}
                </h1>
              </div>

              {/* Photo count indicator */}
              <div className="text-xs font-mono font-bold text-[#E8D9CC] bg-white/10 backdrop-blur-xs px-4 py-2 rounded-full border border-white/20 self-start sm:self-auto">
                {t.photoCount}
              </div>
            </div>
          </div>
        </section>

        {/* Expansive Collage Mosaic Layout */}
        <section className="py-10 sm:py-16">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-auto grid-flow-dense">
              {cheralGalleryItems.map((item, idx) => {
                const spanClass = getCollageSpanClass(idx);

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`${spanClass} group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-[#D9D9D9]/80 cursor-pointer bg-[#2D0A0E]/10 hover:-translate-y-1`}
                  >
                    {/* Full Size Image */}
                    <Image
                      src={item.image}
                      alt="Cheral field photo"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      unoptimized
                      priority={idx < 4}
                    />

                    {/* Gradient & Hover Zoom Icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 text-[#4A0E17] shadow-2xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal (Larger Full Screen View) */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-7xl w-full flex flex-col items-center justify-center max-h-[96vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Minimal Bar */}
            <div className="w-full flex items-center justify-between pb-3 px-2 text-white">
              <span className="text-xs font-mono bg-white/10 px-3.5 py-1.5 rounded-full text-white/90">
                {cheralGalleryItems.findIndex((i) => i.id === activeItem.id) + 1} / {cheralGalleryItems.length}
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="p-2.5 rounded-full bg-white/15 hover:bg-[#a62a14] text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Container with Prev/Next buttons */}
            <div className="relative w-full h-[70vh] sm:h-[84vh] rounded-3xl overflow-hidden bg-black/70 border border-white/15 shadow-2xl flex items-center justify-center">
              <Image
                src={activeItem.image}
                alt="Cheral full size photo preview"
                fill
                sizes="100vw"
                className="object-contain"
                priority
                unoptimized
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-[#a62a14] text-white flex items-center justify-center transition-all border border-white/20 shadow-2xl cursor-pointer"
                aria-label="Previous image"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-[#a62a14] text-white flex items-center justify-center transition-all border border-white/20 shadow-2xl cursor-pointer"
                aria-label="Next image"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Donate Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        currentLang={currentLang}
        onClose={() => setDonateModalOpen(false)}
      />
    </div>
  );
}
