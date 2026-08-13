"use client";

/* agent-notes: { ctx: "Header component with clean raw favicon logo emblem before main logo", deps: [public/logos], state: active, last: "sato@2026-07-26" } */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  currentLang: "en" | "ta";
  onToggleLang: (lang: "en" | "ta") => void;
  onOpenDonate: () => void;
}

export default function Header({ currentLang, onToggleLang, onOpenDonate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EF]/95 backdrop-blur-md border-b border-[#D9D9D9]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 md:h-28 flex items-center justify-between">
        
        {/* Brand Container: Clean Logo Emblem + Main Bilingual Logo */}
        <Link href="/" className="flex items-center gap-3 md:gap-4 group">
          
          {/* Raw Emblem Logo (No round container/border) */}
          <div className="relative h-12 w-auto md:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logos/Final Cheral logo copy.png"
              alt="Cheral Logo Emblem"
              width={70}
              height={70}
              className="object-contain max-h-12 md:max-h-16 w-auto"
              priority
            />
          </div>

          {/* Main Brand Logo (English / Tamil) */}
          <div className="relative h-14 md:h-18 w-auto min-w-[160px] md:min-w-[210px] flex items-center justify-start transition-transform duration-300 group-hover:scale-105">
            {currentLang === "ta" ? (
              <Image
                src="/logos/Final Cheral logo transparent.png"
                alt="Cheral Tamil Logo"
                width={210}
                height={70}
                className="object-contain max-h-14 md:max-h-18 w-auto"
                priority
              />
            ) : (
              <Image
                src="/logos/Cheral eng logo copy.png"
                alt="Cheral English Logo"
                width={210}
                height={70}
                className="object-contain max-h-14 md:max-h-18 w-auto"
                priority
              />
            )}
          </div>

          <span className="hidden xl:inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-[#F8D7C6] text-[#222222] border border-[#F68B5F]/40 shadow-xs">
            {currentLang === "ta" ? "வரலாற்று அறக்கட்டளை" : "Historical Trust"}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-[#222222]">
          <a href="#destinations" className="hover:text-[#F68B5F] transition-colors">
            {currentLang === "ta" ? "இடங்கள்" : "Destinations"}
          </a>
          <a href="#eras" className="hover:text-[#F68B5F] transition-colors">
            {currentLang === "ta" ? "வரலாற்று காலங்கள்" : "Historical Eras"}
          </a>
          <a href="#trust-metrics" className="hover:text-[#F68B5F] transition-colors">
            {currentLang === "ta" ? "அறக்கட்டளை சான்று" : "Trust Verification"}
          </a>
          <a href="#itineraries" className="hover:text-[#F68B5F] transition-colors">
            {currentLang === "ta" ? "பயணத் திட்டங்கள்" : "Itineraries"}
          </a>
        </nav>

        {/* Language Switcher, Donate CTA & Explore Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Language Switcher Pill */}
          <div className="bg-[#E8D9CC] p-1 rounded-full flex items-center text-xs font-semibold border border-[#D9D9D9]">
            <button
              onClick={() => onToggleLang("en")}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                currentLang === "en"
                  ? "bg-[#FFFFFF] text-[#222222] shadow-sm font-bold"
                  : "text-[#6F6F6F] hover:text-[#222222]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => onToggleLang("ta")}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                currentLang === "ta"
                  ? "bg-[#FFFFFF] text-[#222222] shadow-sm font-bold"
                  : "text-[#6F6F6F] hover:text-[#222222]"
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Donate Button */}
          <button
            onClick={onOpenDonate}
            className="px-4 py-2.5 rounded-full text-xs font-bold text-[#222222] bg-[#F8D7C6] hover:bg-[#F68B5F] hover:text-white border border-[#F68B5F]/40 shadow-sm transition-all duration-200 flex items-center gap-1.5 active:scale-95"
          >
            <span>♥</span>
            <span>{currentLang === "ta" ? "நன்கொடை" : "Donate"}</span>
          </button>

          {/* Explore Button */}
          <a
            href="#destinations"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#F68B5F] hover:bg-[#E26E4D] shadow-sm hover:shadow transition-all duration-200 active:scale-95"
          >
            {currentLang === "ta" ? "பயணம்" : "Explore"}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#222222] hover:text-[#F68B5F] focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#D9D9D9] px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <a
            href="#destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#222222] hover:text-[#F68B5F]"
          >
            {currentLang === "ta" ? "இடங்கள்" : "Destinations"}
          </a>
          <a
            href="#eras"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#222222] hover:text-[#F68B5F]"
          >
            {currentLang === "ta" ? "வரலாற்று காலங்கள்" : "Historical Eras"}
          </a>
          <a
            href="#trust-metrics"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#222222] hover:text-[#F68B5F]"
          >
            {currentLang === "ta" ? "அறக்கட்டளை சான்று" : "Trust Verification"}
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDonate();
            }}
            className="w-full text-left py-2 px-4 rounded-xl bg-[#F8D7C6] text-[#222222] font-bold text-xs flex items-center justify-between"
          >
            <span>{currentLang === "ta" ? "பாரம்பரிய பாதுகாப்பு நன்கொடை" : "Donate to Heritage Preservation"}</span>
            <span>♥</span>
          </button>
        </div>
      )}
    </header>
  );
}
