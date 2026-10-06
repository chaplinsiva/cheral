"use client";

/* agent-notes: { ctx: "Unified section presenting Cheral Trust's 3 Key Objectives and 10 Guiding Core Values", deps: [src/data/cheralData.ts], state: active, last: "sato@2026-08-30" } */

import { cheralObjectives, cheralCoreValues } from "@/data/cheralData";

interface ObjectivesSectionProps {
  currentLang: "en" | "ta";
}

export default function ObjectivesSection({ currentLang }: ObjectivesSectionProps) {
  const content = {
    en: {
      sectionBadge: "STRATEGIC VISION & ETHICAL FOUNDATION",
      mainTitle: "Objectives & Core Values",
      subtitle:
        "Building climate resilience, environmental stewardship, and historical consciousness through 3 strategic pillars and 10 guiding ethical values.",
      objectivesBadge: "OUR THREE PILLARS",
      objectivesTitle: "Strategic Objectives",
      valuesBadge: "GUIDING ETHICAL PRINCIPLES",
      valuesTitle: "10 Core Values",
      valuesSubtitle:
        "We are guided by integrity, sustainability, inclusiveness, historical consciousness, scientific excellence, and collaboration to conserve nature, protect heritage, and empower communities.",
    },
    ta: {
      sectionBadge: "தொலைநோக்கு & கொள்கை அடித்தளம்",
      mainTitle: "நோக்கங்கள் & வழிகாட்டும் கொள்கைகள்",
      subtitle:
        "இயற்கை பாதுகாப்பு மற்றும் வரலாற்று விழிப்புணர்வை ஏற்படுத்தும் 3 முக்கிய தூண்கள் மற்றும் 10 வழிகாட்டும் கொள்கைகள்.",
      objectivesBadge: "எங்களது மூன்று தூண்கள்",
      objectivesTitle: "முக்கிய நோக்கங்கள்",
      valuesBadge: "எங்களது கோட்பாடுகள்",
      valuesTitle: "10 முக்கிய கொள்கைகள்",
      valuesSubtitle:
        "நேர்மை, நிலைத்தன்மை, அனைவரும் உள்ளடங்கிய நீதி மற்றும் வரலாற்று உணர்வுடன் செயல்பட்டு இயற்கையையும் பாரம்பரியத்தையும் பாதுகாக்கிறோம்.",
    },
  };

  const t = content[currentLang];

  return (
    <section id="objectives" className="py-24 bg-[#F7F3EF] border-t border-[#D9D9D9]/70 relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#E8D9CC]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-[#a62a14]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8D9CC] text-[#4A0E17] font-semibold text-xs tracking-wider uppercase mb-4 border border-[#4A0E17]/10">
            {t.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#222222] font-bold mb-6 tracking-tight">
            {t.mainTitle}
          </h2>
          <p className="text-lg text-[#6F6F6F] leading-relaxed font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PART 1: 3 Strategic Pillars (Key Objectives) */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#D9D9D9]/80">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a62a14]" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#222222]">
                {t.objectivesTitle}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#a62a14] bg-[#a62a14]/10 px-3 py-1 rounded-full">
              {t.objectivesBadge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cheralObjectives.map((obj) => (
              <div
                key={obj.number}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D9D9D9]/80 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Accent Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A0E17] via-[#a62a14] to-[#E8D9CC] opacity-80 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#4A0E17] text-white flex items-center justify-center font-serif text-xl font-bold group-hover:bg-[#a62a14] group-hover:scale-105 transition-all shadow-sm">
                      0{obj.number}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#a62a14] uppercase tracking-wider bg-[#F7F3EF] px-2.5 py-1 rounded-lg border border-[#D9D9D9]/60">
                      Pillar #{obj.number}
                    </span>
                  </div>

                  <h4 className="text-2xl font-serif font-bold text-[#222222] mb-3 group-hover:text-[#4A0E17] transition-colors">
                    {obj.title[currentLang]}
                  </h4>

                  <p className="text-sm text-[#555555] leading-relaxed font-sans">
                    {obj.description[currentLang]}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D9D9D9]/50 flex items-center justify-between text-xs text-[#a62a14] font-semibold">
                  <span>CHERAL OBJECTIVE #{obj.number}</span>
                  <span className="w-2 h-2 rounded-full bg-[#a62a14] group-hover:scale-125 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PART 2: 10 Guiding Core Values */}
        {/* ------------------------------------------------------------- */}
        <div id="core-values" className="pt-4 scroll-mt-24">
          <div className="bg-[#4A0E17] text-[#F7F3EF] rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-[#a62a14]/40">
            {/* Subtle background watermark pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
              <svg className="w-[800px] h-[800px] text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 5 L60 35 L90 35 L65 55 L75 85 L50 65 L25 85 L35 55 L10 35 L40 35 Z" />
              </svg>
            </div>

            {/* Core Values Sub-header */}
            <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#a62a14]/40 text-white font-semibold text-xs tracking-wider uppercase mb-3 border border-[#a62a14]/60">
                {t.valuesBadge}
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {t.valuesTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#E8D9CC]/90 leading-relaxed font-sans">
                {t.valuesSubtitle}
              </p>
            </div>

            {/* 10 Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative z-10">
              {cheralCoreValues.map((val) => (
                <div
                  key={val.number}
                  className="bg-[#2D0A0E]/90 backdrop-blur-sm border border-[#a62a14]/30 rounded-2xl p-5 hover:border-[#a62a14] hover:bg-[#3D0E14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-sm font-serif font-bold text-white bg-[#a62a14] w-8 h-8 rounded-xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        {val.number}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#E8D9CC]/70 tracking-wider">
                        VALUE #{val.number}
                      </span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-white mb-2 group-hover:text-[#E8D9CC] transition-colors leading-snug">
                      {val.title[currentLang]}
                    </h4>

                    <p className="text-xs text-[#E8D9CC]/85 leading-relaxed font-sans line-clamp-6 group-hover:line-clamp-none transition-all">
                      {val.description[currentLang]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-[#E8D9CC]/60 font-semibold tracking-wider uppercase">
                      CHERAL ETHIC
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a62a14] group-hover:bg-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
