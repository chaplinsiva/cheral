"use client";

/* agent-notes: { ctx: "Trust metrics and community rating verification section", deps: [], state: active, last: "sato@2026-07-26" } */

interface TrustMetricsProps {
  currentLang: "en" | "ta";
}

export default function TrustMetrics({ currentLang }: TrustMetricsProps) {
  const metrics = [
    {
      number: "140+",
      label: currentLang === "ta" ? "சரிபார்க்கப்பட்ட இடங்கள்" : "Authenticated Sites",
      detail: currentLang === "ta" ? "கல்வெட்டு ஆய்வாளர்களால் சான்றளிக்கப்பட்டவை" : "Inspected by certified epigraphers",
    },
    {
      number: "100%",
      label: currentLang === "ta" ? "லாப நோக்கமற்ற அறக்கட்டளை" : "Non-Profit Trust Guarantee",
      detail: currentLang === "ta" ? "பாரம்பரிய தொல்லியலுக்கு முழு ஆதரவு" : "100% funds support heritage restoration",
    },
    {
      number: "45,000+",
      label: currentLang === "ta" ? "பயண ஆர்வலர்கள்" : "Heritage Explorers",
      detail: currentLang === "ta" ? "உலகளவில் இணைந்த வரலாற்று பிரியர்கள்" : "Global community of heritage travelers",
    },
    {
      number: "12",
      label: currentLang === "ta" ? "மீட்பு நிதியுதவிகள்" : "Preservation Grants",
      detail: currentLang === "ta" ? "பண்டைய கல்வெட்டுகள் பாதுகாப்பு" : "Actively restoring ancient inscriptions",
    },
  ];

  const testimonials = [
    {
      quote:
        currentLang === "ta"
          ? "சேர மற்றும் சோழ வரலாற்று இடங்களின் உண்மையான தரவுகள் மற்றும் நேர்த்தியான வழிகாட்டல் அற்புதமாக இருந்தது."
          : "Cheral provided unparalleled access to verified Chola bronze foundries and ancient port ruins. The editorial experience felt like a living history museum.",
      author: "Dr. Elizabeth Vance",
      title: "Comparative History Professor, Oxford",
      rating: "5.0 ★★★★★",
    },
    {
      quote:
        currentLang === "ta"
          ? "தமிழ் மற்றும் ஆங்கிலத்தில் வழங்கப்பட்ட வரலாற்று விவரங்கள் மற்றும் வரைபடங்கள் எங்களின் பயணத்தை மறக்கமுடியாததாக ஆக்கியது."
          : "The bilingual guide and epigrapher credentials gave our research expedition complete confidence. Every site was thoroughly verified.",
      author: "K. Muralidharan",
      title: "Senior Archaeological Fellow",
      rating: "5.0 ★★★★★",
    },
  ];

  return (
    <section id="trust-metrics" className="py-20 bg-[#F7F3EF] border-t border-[#D9D9D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D9D9D9] text-xs font-bold text-[#F68B5F]">
            {currentLang === "ta" ? "அறக்கட்டளை தரநிலைகள்" : "Cultural Trust & Integrity Standards"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-outfit text-[#222222] mt-4">
            {currentLang === "ta"
              ? "ஏன் சேரல் வரலாற்று அறக்கட்டளை?"
              : "Why Heritage Explorers Choose Cheral"}
          </h2>
          <p className="text-sm text-[#6F6F6F] mt-3 leading-relaxed">
            {currentLang === "ta"
              ? "வரலாற்று உண்மைகள், கல்வெட்டு ஆதாரங்கள் மற்றும் தொல்பொருள் பாதுகாப்பு ஆகியவற்றிற்கு முன்னுரிமை அளிக்கும் தளம்."
              : "Every monument and itinerary listed in Cheral undergoes rigorous documentation by epigraphers, architectural historians, and preservation funds."}
          </p>
        </div>

        {/* 4-Grid Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D9D9D9] shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-3xl font-extrabold font-outfit text-[#F68B5F]">{m.number}</p>
              <h4 className="text-base font-bold text-[#222222] mt-2">{m.label}</h4>
              <p className="text-xs text-[#6F6F6F] mt-1">{m.detail}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div id="itineraries" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#E8D9CC]/40 border border-[#D9D9D9] relative flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-[#F68B5F] mb-3">{t.rating}</div>
              <p className="text-sm italic text-[#222222] leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div>
                <p className="text-xs font-bold text-[#222222]">{t.author}</p>
                <p className="text-[11px] text-[#6F6F6F]">{t.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
