"use client";

/* agent-notes: { ctx: "Interactive section displaying Cheral's 10 Core Values using secondary color #a62a14", deps: [src/data/cheralData.ts], state: active, last: "sato@2026-08-13" } */

import { cheralCoreValues } from "@/data/cheralData";

interface CoreValuesSectionProps {
  currentLang: "en" | "ta";
}

export default function CoreValuesSection({ currentLang }: CoreValuesSectionProps) {
  const titles = {
    en: {
      sectionBadge: "GUIDING ETHICAL PRINCIPLES",
      mainTitle: "10 Core Values",
      subtitle:
        "We are guided by integrity, sustainability, inclusiveness, historical consciousness, scientific excellence, and collaboration to conserve nature and protect cultural heritage.",
    },
    ta: {
      sectionBadge: "எங்களது கோட்பாடுகள்",
      mainTitle: "10 முக்கிய கொள்கைகள்",
      subtitle:
        "நேர்மை, நிலைத்தன்மை, அனைவரும் உள்ளடங்கிய நீதி மற்றும் வரலாற்று உணர்வுடன் செயல்படுதல்.",
    },
  };

  const t = titles[currentLang];

  return (
    <section id="core-values" className="py-24 bg-[#4A0E17] text-[#F7F3EF] relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <svg className="w-[800px] h-[800px] text-white" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 5 L60 35 L90 35 L65 55 L75 85 L50 65 L25 85 L35 55 L10 35 L40 35 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#a62a14]/30 text-white font-semibold text-xs tracking-wider uppercase mb-4 border border-[#a62a14]/50">
            {t.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">
            {t.mainTitle}
          </h2>
          <p className="text-lg text-[#E8D9CC]/90 leading-relaxed font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* 10 Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cheralCoreValues.map((val) => (
            <div
              key={val.number}
              className="bg-[#2D0A0E]/85 backdrop-blur-sm border border-[#a62a14]/30 rounded-xl p-6 hover:border-[#a62a14] hover:bg-[#3D0E14] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-serif font-bold text-white bg-[#a62a14] w-10 h-10 rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                    {val.number}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-[#E8D9CC]/60 tracking-wider">
                    VALUE #{val.number}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-[#E8D9CC] transition-colors">
                  {val.title[currentLang]}
                </h3>

                <p className="text-xs text-[#E8D9CC]/80 leading-relaxed font-sans">
                  {val.description[currentLang]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-[#a62a14] font-semibold">
                  CHERAL TRUST
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#a62a14] group-hover:bg-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
