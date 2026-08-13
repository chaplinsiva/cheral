"use client";

/* agent-notes: { ctx: "Interactive destination cards grid with era filter and trust badges", deps: [src/data/destinations.ts], state: active, last: "sato@2026-07-26" } */
import { useState } from "react";
import Image from "next/image";
import { DESTINATIONS, Destination } from "@/data/destinations";

interface DestinationExplorerProps {
  currentLang: "en" | "ta";
  onSelectDestination: (destination: Destination) => void;
}

export default function DestinationExplorer({
  currentLang,
  onSelectDestination,
}: DestinationExplorerProps) {
  const [selectedEra, setSelectedEra] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const eras = [
    { id: "all", label: currentLang === "ta" ? "அனைத்து இடங்கள்" : "All Destinations" },
    { id: "chera", label: currentLang === "ta" ? "சேர ராஜவம்சம்" : "Chera Dynasty" },
    { id: "chola", label: currentLang === "ta" ? "சோழ ராஜவம்சம்" : "Chola Dynasty" },
    { id: "pandya", label: currentLang === "ta" ? "பாண்டிய ராஜவம்சம்" : "Pandya Kingdom" },
    { id: "coastal", label: currentLang === "ta" ? "கடற்கரை கோட்டைகள்" : "Coastal Forts" },
  ];

  const filteredDestinations = DESTINATIONS.filter((item) => {
    const matchesEra = selectedEra === "all" || item.era === selectedEra;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.eraName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesSearch;
  });

  return (
    <section id="destinations" className="py-20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#F68B5F] uppercase">
              {currentLang === "ta" ? "வரலாற்று இடங்கள் உலாவல்" : "Curated Heritage Registry"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-[#222222] mt-2">
              {currentLang === "ta" ? "பண்டைய பாரம்பரிய இடங்கள்" : "Explore Verified Historical Sites"}
            </h2>
            <p className="text-sm text-[#6F6F6F] mt-2 max-w-xl">
              {currentLang === "ta"
                ? "தொல்லியல் சான்றளிப்புடன் கூடிய பண்டைய துறைமுகங்கள், அரண்மனைகள் மற்றும் வழிபாட்டு தலங்களை கண்டறியுங்கள்."
                : "Inspected and authenticated by epigraphers, historians, and cultural preservation trusts."}
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder={currentLang === "ta" ? "இடம் அல்லது காலத்தை தேடுக..." : "Search site or region..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F7F3EF] border border-[#D9D9D9] text-xs text-[#222222] focus:outline-none focus:border-[#F68B5F] transition-colors"
            />
            <svg className="w-4 h-4 text-[#6F6F6F] absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Era Category Pills */}
        <div id="eras" className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedEra === era.id
                  ? "bg-[#222222] text-[#FFFFFF] shadow"
                  : "bg-[#F7F3EF] text-[#6F6F6F] hover:bg-[#E8D9CC] hover:text-[#222222]"
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-[#F7F3EF] rounded-2xl border border-[#D9D9D9]">
            <p className="text-sm font-semibold text-[#6F6F6F]">
              {currentLang === "ta" ? "தேடலுக்குரிய இடங்கள் ஏதும் கிடைக்கவில்லை." : "No matching historical destinations found."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FFFFFF] rounded-2xl border border-[#D9D9D9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image with Trust Score Overlay */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/70 via-transparent to-transparent" />
                    
                    {/* Era Tag */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#F8D7C6] text-[#222222] text-[11px] font-bold rounded-full shadow-sm">
                      {item.eraName}
                    </span>

                    {/* Trust Score Badge */}
                    <div className="absolute top-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#222222] border border-[#D9D9D9] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F68B5F]" />
                      {item.trustScore}% Trust
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-[11px] font-medium text-[#F8D7C6]">
                        {item.location} • {item.age}
                      </p>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-outfit text-[#222222] group-hover:text-[#F68B5F] transition-colors">
                      {currentLang === "ta" ? item.tamilTitle : item.title}
                    </h3>
                    <p className="text-xs text-[#6F6F6F] mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Highlights List */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.highlights.slice(0, 3).map((hl, idx) => (
                        <span key={idx} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-[#F7F3EF] text-[#222222] border border-[#D9D9D9]/60">
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-[#D9D9D9]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#6F6F6F]">
                    <span className="font-semibold text-[#222222]">{item.verifiedGuide.name}</span>
                  </div>
                  <button
                    onClick={() => onSelectDestination(item)}
                    className="px-4 py-2 rounded-full bg-[#F7F3EF] hover:bg-[#F68B5F] text-[#222222] hover:text-white text-xs font-bold transition-all duration-200 flex items-center gap-1 group-hover:bg-[#F68B5F] group-hover:text-white"
                  >
                    {currentLang === "ta" ? "விவரங்கள்" : "View Itinerary"}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
