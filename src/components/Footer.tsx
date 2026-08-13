"use client";

/* agent-notes: { ctx: "Footer component displaying clean original logo colors without white invert filter, Madurai contact, and secondary color #a62a14", deps: [public/logos, src/data/cheralData.ts], state: active, last: "sato@2026-08-13" } */

import Image from "next/image";
import Link from "next/link";
import { cheralBankDetails } from "@/data/cheralData";

interface FooterProps {
  currentLang: "en" | "ta";
  onOpenDonate: () => void;
}

export default function Footer({ currentLang, onOpenDonate }: FooterProps) {
  return (
    <footer className="bg-[#2D0A0E] text-[#F7F3EF] py-16 border-t border-[#a62a14]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info with Clean Original Logo Colors */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-1.5 sm:gap-2 group bg-[#F7F3EF] p-2.5 rounded-2xl border border-white/20">
              {/* Emblem Logo in Clean Original Color */}
              <div className="relative h-10 w-auto md:h-12 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logos/Final Cheral logo copy.png"
                  alt="Cheral Logo Emblem"
                  width={60}
                  height={60}
                  className="object-contain max-h-10 md:max-h-12 w-auto"
                />
              </div>

              {/* Main Brand Logo in Clean Original Color */}
              {currentLang === "ta" ? (
                <Image
                  src="/logos/Final Cheral logo transparent.png"
                  alt="Cheral Tamil Logo"
                  width={180}
                  height={55}
                  className="object-contain max-h-11 md:max-h-14 w-auto"
                />
              ) : (
                <Image
                  src="/logos/Cheral eng logo copy.png"
                  alt="Cheral English Logo"
                  width={180}
                  height={55}
                  className="object-contain max-h-11 md:max-h-14 w-auto"
                />
              )}
            </Link>

            <p className="text-xs text-[#E8D9CC]/90 max-w-sm leading-relaxed font-sans">
              {currentLang === "ta"
                ? "சேரல் அமைப்பு (CHERAL) என்பது ஆராய்ச்சி, கல்வி, ஆவணப்படுத்தல் மற்றும் சமூக பங்கேற்பு மூலம் இயற்கை சுற்றுச்சூழல், பல்லுயிர்ப் பெருக்கம் மற்றும் பண்பாட்டு பாரம்பரியத்தைப் பாதுகாக்கும் தொண்டு நிறுவனமாகும்."
                : "CHERAL (Centre for Heritage and Ecological Research through Arts and Literature) is a non-profit organization committed to conserving natural ecosystems, biodiversity, and cultural heritage."}
            </p>

            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#a62a14] hover:bg-white hover:text-[#4A0E17] text-white text-xs font-bold shadow-md transition-all"
            >
              <span>♥</span>
              <span>{currentLang === "ta" ? "அறக்கட்டளைக்கு நன்கொடை" : "Donate to Cheral Trust"}</span>
            </button>
          </div>

          {/* Core Initiatives Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a62a14]">
              {currentLang === "ta" ? "செயல்பாடுகள்" : "What We Do"}
            </h4>
            <ul className="space-y-2 text-xs text-[#E8D9CC]/80">
              <li><a href="#what-we-do" className="hover:text-white transition-colors">Public Awareness Campaigns</a></li>
              <li><a href="#what-we-do" className="hover:text-white transition-colors">Student Education Programs</a></li>
              <li><a href="#what-we-do" className="hover:text-white transition-colors">Nature & Heritage Walks</a></li>
              <li><a href="#what-we-do" className="hover:text-white transition-colors">Native Tree Plantation</a></li>
              <li><a href="#core-values" className="hover:text-white transition-colors">10 Core Values</a></li>
            </ul>
          </div>

          {/* Official Contact Info & Address */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a62a14]">
              {currentLang === "ta" ? "தொடர்பு விவரங்கள்" : "Official Contact Info"}
            </h4>
            <div className="text-xs text-[#E8D9CC]/90 leading-relaxed space-y-2 font-sans">
              <p className="font-bold text-white">{cheralBankDetails.organizationName}</p>
              <p>{cheralBankDetails.address}</p>
              <p><span className="text-[#a62a14]">Cell: </span>{cheralBankDetails.cell}</p>
              <p><span className="text-[#a62a14]">Mail: </span>{cheralBankDetails.email}</p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#E8D9CC]">
              <span>🛡️ Registered Non-Profit Cultural & Ecological Trust</span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D9CC]/60 gap-4">
          <p>© {new Date().getFullYear()} Cheral Trust (Centre for Heritage and Ecological Research). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#core-values" className="hover:text-white transition-colors">Core Values</a>
            <button onClick={onOpenDonate} className="text-[#a62a14] hover:underline font-semibold">
              Donate (Bank / UPI)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
