"use client";

/* agent-notes: { ctx: "Interactive section displaying Cheral's 4 core initiatives using extracted PDF images and secondary color #a62a14", deps: [src/data/cheralData.ts, public/images/pdf], state: active, last: "sato@2026-08-13" } */

import { cheralInitiatives, Initiative } from "@/data/cheralData";

interface InitiativesSectionProps {
  currentLang: "en" | "ta";
  onSelectInitiative?: (initiative: Initiative) => void;
}

export default function InitiativesSection({
  currentLang,
  onSelectInitiative,
}: InitiativesSectionProps) {
  const titles = {
    en: {
      sectionBadge: "OUR CORE PROGRAMMATIC PILLARS",
      mainTitle: "What We Do",
      subtitle:
        "Our work brings people closer to nature and history through immersive learning, scientific observation, and cultural exploration.",
      viewDetails: "Learn More & Participate",
    },
    ta: {
      sectionBadge: "எங்களது முதன்மைத் திட்டங்கள்",
      mainTitle: "எங்களது செயல்பாடுகள்",
      subtitle:
        "இயற்கை, பல்லுயிர்ப் பெருக்கம் மற்றும் வரலாற்றுச் சின்னங்களை பாதுகாக்கும் எங்களது 4 முக்கிய திட்டங்கள்.",
      viewDetails: "மேலும் அறிய & பங்கேற்க",
    },
  };

  const t = titles[currentLang];

  return (
    <section id="what-we-do" className="py-20 bg-[#F7F3EF]">
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

        {/* 4 Core Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cheralInitiatives.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D9D9D9]/50 flex flex-col"
            >
              {/* Image Banner using Extracted PDF Image */}
              <div className="relative h-64 overflow-hidden bg-[#2D0A0E]">
                <img
                  src={item.image}
                  alt={item.title[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Badge Overlay with #a62a14 */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#a62a14] text-[#F7F3EF] px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                    {item.badge[currentLang]}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase tracking-widest text-[#E8D9CC] font-semibold block mb-1">
                    {item.category[currentLang]}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {item.title[currentLang]}
                  </h3>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <p className="text-[#222222]/80 leading-relaxed text-base mb-6 font-sans">
                  {item.description[currentLang]}
                </p>

                <div className="pt-4 border-t border-[#D9D9D9]/40 flex items-center justify-between">
                  <span className="text-xs text-[#6F6F6F] font-mono">
                    CHERAL TRUST INITIATIVE
                  </span>

                  <button
                    onClick={() => onSelectInitiative && onSelectInitiative(item)}
                    className="inline-flex items-center text-sm font-semibold text-[#a62a14] hover:text-[#4A0E17] transition-colors group-hover:translate-x-1 duration-200"
                  >
                    {t.viewDetails}
                    <svg
                      className="w-4 h-4 ml-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
