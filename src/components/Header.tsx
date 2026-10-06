"use client";

/* agent-notes: { ctx: "English-only Header with logo, volunteering form link, Contact Us CTA, and small Donate button", deps: [public/logos], state: active, last: "sato@2026-10-06" } */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  currentLang?: "en" | "ta";
  onToggleLang?: (lang: "en" | "ta") => void;
  onOpenDonate: () => void;
}

export default function Header({ onOpenDonate }: HeaderProps) {
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
            <Image
              src="/logos/Cheral eng logo copy.png"
              alt="Cheral English Logo"
              width={857}
              height={397}
              className="object-contain max-h-12 md:max-h-16 w-auto"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs sm:text-sm font-bold text-[#222222]">
          <Link href="/#about" className="hover:text-[#a62a14] transition-colors">
            About Us
          </Link>
          <a
            href="https://forms.gle/ktUF1JXeGNbfM2AAA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a62a14] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Volunteering</span>
            <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <Link href="/gallery" className="hover:text-[#a62a14] transition-colors">
            Gallery
          </Link>
          <a
            href="https://cheraltrust.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a62a14] transition-colors inline-flex items-center gap-1"
          >
            <span>Blogs</span>
            <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </nav>

        {/* Right Actions: Small Subtle Donate & Contact Us CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Small, subtle Donate button - not highlighted */}
          <button
            onClick={onOpenDonate}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs font-medium text-[#4A0E17] hover:text-[#a62a14] bg-white/80 hover:bg-[#E8D9CC]/60 border border-[#D9D9D9] transition-all duration-200 flex items-center gap-1 active:scale-95"
            title="Donate"
          >
            <span className="text-xs text-[#a62a14]">♥</span>
            <span className="inline">Donate</span>
          </button>

          {/* Primary CTA: Contact Us button */}
          <Link
            href="/#contact"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold text-white bg-[#a62a14] hover:bg-[#4A0E17] shadow-xs hover:shadow transition-all duration-200 flex items-center gap-1.5 active:scale-95"
          >
            <span>Contact Us</span>
          </Link>

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
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14]"
          >
            About Us
          </Link>
          <a
            href="https://forms.gle/ktUF1JXeGNbfM2AAA"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14] flex items-center justify-between"
          >
            <span>Volunteering</span>
            <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <Link
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14]"
          >
            Gallery
          </Link>
          <a
            href="https://cheraltrust.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#222222] hover:text-[#a62a14] flex items-center justify-between"
          >
            <span>Blogs</span>
            <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded-xl bg-[#a62a14] hover:bg-[#4A0E17] text-white font-bold text-xs shadow-sm transition-colors block"
            >
              Contact Us
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full text-center py-2 px-3 rounded-xl border border-[#D9D9D9] text-[#4A0E17] hover:bg-[#E8D9CC]/40 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="text-[#a62a14] text-xs">♥</span>
              <span>Donate</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
