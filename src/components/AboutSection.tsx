"use client";

/* agent-notes: { ctx: "About section presenting exact verbatim About Us text, Mission, Vision, and Guiding Philosophy Quote from Cheral brochure", deps: [src/data/cheralData.ts], state: active, last: "sato@2026-08-13" } */

import { cheralAboutText } from "@/data/cheralData";

interface AboutSectionProps {
  currentLang: "en" | "ta";
}

export default function AboutSection({ currentLang }: AboutSectionProps) {
  const ab = cheralAboutText[currentLang];

  return (
    <section id="about" className="py-20 bg-white border-b border-[#D9D9D9]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Us Header & Main Summary */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8D9CC] text-[#4A0E17] font-semibold text-xs tracking-wider uppercase">
            ABOUT US
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#222222] font-bold leading-tight">
            {ab.fullName}
          </h2>
          <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed font-sans">
            {ab.summary}
          </p>
        </div>

        {/* Full Description & Our Work Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#F7F3EF] p-8 rounded-2xl border border-[#D9D9D9]/70 space-y-4">
            <span className="text-xs font-mono font-bold text-[#a62a14] uppercase tracking-wider block">
              OUR COMMITMENT
            </span>
            <p className="text-sm text-[#222222]/90 leading-relaxed font-sans">
              {ab.fullDescription}
            </p>
          </div>

          <div className="bg-[#F7F3EF] p-8 rounded-2xl border border-[#D9D9D9]/70 space-y-4">
            <span className="text-xs font-mono font-bold text-[#a62a14] uppercase tracking-wider block">
              OUR WORK
            </span>
            <p className="text-sm text-[#222222]/90 leading-relaxed font-sans">
              {ab.ourWork}
            </p>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission Box */}
          <div className="bg-[#4A0E17] text-white p-8 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#a62a14] text-xs font-mono font-bold uppercase">
                MISSION
              </span>
              <p className="text-lg sm:text-xl font-serif leading-relaxed text-[#F7F3EF]">
                "{ab.mission}"
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-[#E8D9CC]/70 font-mono">
              CHERAL TRUST MISSION
            </div>
          </div>

          {/* Vision Box */}
          <div className="bg-[#2D0A0E] text-white p-8 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#a62a14] text-xs font-mono font-bold uppercase">
                VISION
              </span>
              <p className="text-lg sm:text-xl font-serif leading-relaxed text-[#F7F3EF]">
                "{ab.vision}"
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-[#E8D9CC]/70 font-mono">
              CHERAL TRUST VISION
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
