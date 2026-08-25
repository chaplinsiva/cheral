"use client";

/* agent-notes: { ctx: "Section presenting the 3 main objectives of Cheral Trust using secondary color #a62a14", deps: [src/data/cheralData.ts], state: active, last: "sato@2026-08-13" } */

import { cheralObjectives } from "@/data/cheralData";

interface ObjectivesSectionProps {
  currentLang: "en" | "ta";
}

export default function ObjectivesSection({ currentLang }: ObjectivesSectionProps) {
  const titles = {
    en: {
      sectionBadge: "OUR THREE PILLARS",
      mainTitle: "Key Objectives",
      subtitle:
        "Building climate resilience, environmental stewardship, and historical consciousness through 3 core objectives.",
    },
    ta: {
      sectionBadge: "எங்களது மூன்று தூண்கள்",
      mainTitle: "முக்கிய நோக்கங்கள்",
      subtitle:
        "இயற்கை பாதுகாப்பு மற்றும் வரலாற்று விழிப்புணர்வை ஏற்படுத்தும் 3 முக்கிய நோக்கங்கள்.",
    },
  };

  const t = titles[currentLang];

  return (
    <section id="objectives" className="py-20 bg-[#F7F3EF] border-t border-[#D9D9D9]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8D9CC] text-[#4A0E17] font-semibold text-xs tracking-wider uppercase mb-4">
            {t.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#222222] font-bold mb-6">
            {t.mainTitle}
          </h2>
          <p className="text-lg text-[#6F6F6F] leading-relaxed font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Objectives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cheralObjectives.map((obj) => (
            <div
              key={obj.number}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[#D9D9D9]/60 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#a62a14] text-white flex items-center justify-center font-serif text-xl font-bold mb-6 group-hover:bg-[#4A0E17] transition-colors">
                  {obj.number}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#222222] mb-3">
                  {obj.title[currentLang]}
                </h3>
                <p className="text-sm text-[#6F6F6F] leading-relaxed font-sans">
                  {obj.description[currentLang]}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D9D9D9]/40 flex items-center text-xs text-[#a62a14] font-semibold">
                <span>CHERAL OBJECTIVE #{obj.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
