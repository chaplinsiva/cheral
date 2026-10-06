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
  const [joinDropdownOpen, setJoinDropdownOpen] = useState(false);

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

          {/* Join Cheral Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setJoinDropdownOpen(true)}
            onMouseLeave={() => setJoinDropdownOpen(false)}
          >
            <button
              onClick={() => setJoinDropdownOpen(!joinDropdownOpen)}
              className="hover:text-[#a62a14] transition-colors inline-flex items-center gap-1.5 py-2 cursor-pointer focus:outline-none"
              aria-expanded={joinDropdownOpen}
              aria-haspopup="true"
            >
              <span>Join Cheral</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  joinDropdownOpen ? "rotate-180 text-[#a62a14]" : "opacity-60"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Card */}
            {joinDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-68 bg-white rounded-2xl shadow-2xl border border-[#D9D9D9]/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <a
                  href="https://forms.gle/ktUF1JXeGNbfM2AAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setJoinDropdownOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-[#F7F3EF] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#4A0E17]/5 text-[#4A0E17] group-hover:bg-[#4A0E17] group-hover:text-white flex items-center justify-center shrink-0 transition-colors border border-[#4A0E17]/10">
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#222222] group-hover:text-[#4A0E17]">
                      Become a volunteer
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-[#6F6F6F] opacity-40 group-hover:opacity-100 group-hover:text-[#4A0E17] transition-all group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <div className="my-1 border-t border-[#D9D9D9]/50" />

                <Link
                  href="/fund-a-project"
                  onClick={() => setJoinDropdownOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-[#F7F3EF] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#a62a14]/5 text-[#a62a14] group-hover:bg-[#a62a14] group-hover:text-white flex items-center justify-center shrink-0 transition-colors border border-[#a62a14]/10">
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#222222] group-hover:text-[#a62a14]">
                      Fund a Project
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-[#6F6F6F] opacity-40 group-hover:opacity-100 group-hover:text-[#a62a14] transition-all group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

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
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs font-medium text-[#4A0E17] hover:text-[#a62a14] bg-white/80 hover:bg-[#E8D9CC]/60 border border-[#D9D9D9] transition-all duration-200 flex items-center gap-1 active:scale-95 cursor-pointer"
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
            className="lg:hidden p-2 text-[#222222] hover:text-[#a62a14] focus:outline-none cursor-pointer"
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

          {/* Mobile Join Cheral Section */}
          <div className="pt-1 pb-1 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6F6F6F]">
              Join Cheral
            </div>
            <div className="pl-3 space-y-2.5 border-l-2 border-[#a62a14]/40">
              <a
                href="https://forms.gle/ktUF1JXeGNbfM2AAA"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-[#222222] hover:text-[#a62a14] flex items-center justify-between"
              >
                <span>Become a volunteer</span>
                <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                href="/fund-a-project"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-[#222222] hover:text-[#a62a14]"
              >
                Fund a Project
              </Link>
            </div>
          </div>

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
