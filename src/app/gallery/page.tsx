"use client";

/* agent-notes: { ctx: "Photo collage mosaic with Videos tab switcher, Supabase DB loading and immersive lightbox", deps: [src/components/Header.tsx, src/components/Footer.tsx, src/components/DonateModal.tsx, src/data/cheralData.ts, src/lib/supabase.ts], state: active, last: "antigravity@2026-10-11" } */

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";
import { cheralGalleryItems, GalleryItem } from "@/data/cheralData";
import { supabase } from "@/lib/supabase";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(cheralGalleryItems);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadDynamicGallery() {
      try {
        const { data } = await supabase
          .from("gallery")
          .select("*")
          .order("display_order", { ascending: true });

        if (data && data.length > 0) {
          const mapped: GalleryItem[] = data.map((d: any) => ({
            id: d.id,
            title: { en: d.title, ta: d.title },
            category: d.category || "nature",
            categoryLabel: { en: d.category_label || "Nature", ta: d.category_label || "Nature" },
            image: d.image_url,
            location: { en: d.location || "Madurai", ta: d.location || "Madurai" },
            description: { en: d.description || "", ta: d.description || "" },
          }));
          setGalleryItems(mapped);
        }
      } catch {
        // Fallback to static items
      }
    }
    loadDynamicGallery();
  }, []);

  // Lightbox Navigation Handlers
  const handlePrev = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = galleryItems.findIndex((item) => item.id === activeItem.id);
    if (currentIndex > 0) {
      setActiveItem(galleryItems[currentIndex - 1]);
    } else {
      setActiveItem(galleryItems[galleryItems.length - 1]);
    }
  }, [activeItem, galleryItems]);

  const handleNext = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = galleryItems.findIndex((item) => item.id === activeItem.id);
    if (currentIndex < galleryItems.length - 1) {
      setActiveItem(galleryItems[currentIndex + 1]);
    } else {
      setActiveItem(galleryItems[0]);
    }
  }, [activeItem, galleryItems]);

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
    breadcrumbHome: "Home",
    breadcrumbGallery: "Gallery",
    badge: "GALLERY",
    mainTitle: "Gallery",
    photoCount: `${galleryItems.length} Photographs`,
  };

  // Dynamic mosaic pattern spans for large, dramatic collage layout
  const getCollageSpanClass = (index: number) => {
    const pattern = index % 8;
    switch (pattern) {
      case 0:
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 h-[340px] sm:h-[460px] lg:h-[580px]";
      case 1:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 h-[220px] sm:h-[270px] lg:h-[280px]";
      case 2:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 h-[220px] sm:h-[270px] lg:h-[280px]";
      case 3:
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 h-[220px] sm:h-[270px] lg:h-[280px]";
      case 4:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-2 h-[340px] sm:h-[460px] lg:h-[580px]";
      case 5:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 h-[220px] sm:h-[270px] lg:h-[280px]";
      case 6:
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 h-[220px] sm:h-[270px] lg:h-[280px]";
      case 7:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 h-[220px] sm:h-[270px] lg:h-[280px]";
      default:
        return "col-span-1 row-span-1 h-[240px] sm:h-[280px]";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EF]">
      {/* Header */}
      <Header
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      <main className="flex-grow">
        {/* Gallery Intro Bar */}
        <section className="bg-[#4A0E17] text-white py-12 sm:py-16 border-b border-[#2D0A0E]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E8D9CC]/80 uppercase tracking-widest mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                {t.breadcrumbHome}
              </Link>
              <span>/</span>
              <span className="text-[#a62a14]">{t.breadcrumbGallery}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                {/* Switcher Tabs */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-4 py-1.5 rounded-full bg-[#a62a14] text-white text-xs font-bold tracking-wider uppercase shadow-md border border-[#a62a14]">
                    📷 Photographs
                  </span>
                  <Link
                    href="/gallery/videos"
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E8D9CC] text-xs font-bold tracking-wider uppercase transition border border-white/10 flex items-center gap-1.5"
                  >
                    <span>🎬 Videos & Documentaries</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] text-white">New</span>
                  </Link>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
                  {t.mainTitle}
                </h1>
                <p className="text-sm sm:text-base text-[#F7F3EF]/85 max-w-2xl mt-3 font-light leading-relaxed">
                  Moments from our biodiversity walks, heritage explorations, student camps, and community conservation actions.
                </p>
              </div>

              {/* Photo Count Pill */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md self-start md:self-end">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a62a14] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-[#E8D9CC]">
                  {t.photoCount}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Expansive Collage Mosaic Layout */}
        <section className="py-10 sm:py-16">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-auto grid-flow-dense">
              {galleryItems.map((item, idx) => {
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

            {/* Video Exploration Callout Banner */}
            <div className="mt-16 bg-gradient-to-r from-[#4A0E17] to-[#2D0A0E] rounded-3xl p-8 sm:p-12 text-white border border-[#E8D9CC] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E8D9CC]">
                  Visual Field Notes in Motion
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Discover the Cheral Video & Documentary Archive
                </h3>
                <p className="text-sm text-[#F7F3EF]/85 max-w-xl">
                  Watch guided field explorations, sacred grove expeditions, bird watching wetlands, and student tree plantation drives.
                </p>
              </div>

              <Link
                href="/gallery/videos"
                className="px-6 py-3.5 rounded-2xl bg-[#a62a14] hover:bg-[#8e2411] text-white font-bold text-sm transition shadow-md shrink-0 flex items-center gap-2"
              >
                <span>🎬 Watch Documentaries</span>
                <span>→</span>
              </Link>
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
                {galleryItems.findIndex((i) => i.id === activeItem.id) + 1} / {galleryItems.length}
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
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#a62a14] text-white flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer border border-white/20 active:scale-95"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#a62a14] text-white flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer border border-white/20 active:scale-95"
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Donate Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        currentLang="en"
        onClose={() => setDonateModalOpen(false)}
      />
    </div>
  );
}
