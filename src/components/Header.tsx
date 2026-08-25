"use client";

/* agent-notes: { ctx: "Clean Header with logo emblem and text logo, simple Donate button, and no non-profit badge", deps: [public/logos], state: active, last: "sato@2026-08-25" } */

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
    <header className="sticky top-0 z-50 bg-[#F7F3EF]/90 backdrop-blur-lg border-b border-[#D9D9D9]/70 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">

        {/* Brand Container: Logos closely aligned */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
          <div className="relative h-11 w-auto md:h-14 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logos/Final Cheral logo copy.png"
              alt="Cheral Logo Emblem"
              width={511}
              height={589}
              className="object-contain max-h-11 md:max-h-14 w-auto"
              priority
              unoptimized
            />
          </div>

          <div className="relative h-12 md:h-16 w-auto min-w-[140px] md:min-w-[190px] flex items-center justify-start transition-transform duration-300 group-hover:scale-105">
            {currentLang === "ta" ? (
              <Image
                src="/logos/Final Cheral logo transparent.png"
                alt="Cheral Tamil Logo"
                width={779}
                height={512}
                className="object-contain max-h-12 md:max-h-16 w-auto"
                priority
                unoptimized
              />
            ) : (
              <Image
                src="/logos/Cheral eng logo copy.png"
                alt="Cheral English Logo"
                width={857}
                height={397}
                className="object-contain max-h-12 md:max-h-16 w-auto"
                priority
                unoptimized
              />
            )}
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs sm:text-sm font-bold text-[#222222]">
          <a href="#about" className="hover:text-[#a62a14] transition-colors">
            {currentLang === "ta" ? "எங்களைப் பற்றி" : "About Us"}
          </a>
          <a href="#what-we-do" className="hover:text-[#a62a14] transition-colors">
            {currentLang === "ta" ? "செயல்பாடுகள்" : "What We Do"}
          </a>
          <a href="#objectives" className="hover:text-[#a62a14] transition-colors">
            {currentLang === "ta" ? "நோக்கங்கள்" : "Objectives"}
          </a>
          <a href="#core-values" className="hover:text-[#a62a14] transition-colors">
            {currentLang === "ta" ? "10 கொள்கைகள்" : "10 Core Values"}
          </a>
          <a
            href="https://cheraltrust.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a62a14] transition-colors inline-flex items-center gap-1"
          >
            <span>{currentLang === "ta" ? "வலைப்பதிவு" : "Blogs"}</span>
            <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </nav>

        {/* Right Actions: Language Switcher & Simple Donate CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="bg-[#E8D9CC]/80 p-0.5 rounded-full flex items-center text-[11px] font-bold border border-[#D9D9D9]">
            <button
              onClick={() => onToggleLang("en")}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                currentLang === "en"
                  ? "bg-[#4A0E17] text-white shadow-sm"
                  : "text-[#6F6F6F] hover:text-[#222222]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onToggleLang("ta")}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                currentLang === "ta"
                  ? "bg-[#4A0E17] text-white shadow-sm"
                  : "text-[#6F6F6F] hover:text-[#222222]"
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Simple Donate Button */}
          <button
            onClick={onOpenDonate}
            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs font-bold text-white bg-[#a62a14] hover:bg-[#4A0E17] shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 active:scale-95"
          >
            <span>♥</span>
            <span>{currentLang === "ta" ? "நன்கொடை" : "Donate"}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#222222] hover:text-[#a62a14] focus:outline-none"
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
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14]"
          >
            {currentLang === "ta" ? "எங்களைப் பற்றி" : "About Us"}
          </a>
          <a
            href="#what-we-do"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14]"
          >
            {currentLang === "ta" ? "செயல்பாடுகள்" : "What We Do"}
          </a>
          <a
            href="#objectives"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14]"
          >
            {currentLang === "ta" ? "நோக்கங்கள்" : "Objectives"}
          </a>
          <a
            href="#core-values"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14]"
          >
            {currentLang === "ta" ? "10 கொள்கைகள்" : "10 Core Values"}
          </a>
          <a
            href="https://cheraltrust.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14] flex items-center justify-between"
          >
            <span>{currentLang === "ta" ? "வலைப்பதிவு (Blogs)" : "Blogs"}</span>
            <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDonate();
            }}
            className="w-full text-left py-2.5 px-4 rounded-xl bg-[#a62a14] text-white font-bold text-xs flex items-center justify-between shadow-sm"
          >
            <span>{currentLang === "ta" ? "நன்கொடை" : "Donate"}</span>
            <span>♥</span>
          </button>
        </div>
      )}
    </header>
  );
}
