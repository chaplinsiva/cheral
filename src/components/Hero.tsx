"use client";

/* agent-notes: { ctx: "Magazine-style editorial hero section with warm travel design tokens", deps: [], state: active, last: "sato@2026-07-26" } */
import Image from "next/image";

interface HeroProps {
  currentLang: "en" | "ta";
  onExploreClick: () => void;
}

export default function Hero({ currentLang, onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-[#F7F3EF]">
      {/* Decorative Warm Peach Soft Shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F8D7C6]/60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#E8D9CC]/70 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Editorial Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D9D9D9] shadow-sm text-xs font-semibold text-[#6F6F6F]">
              <span className="w-2 h-2 rounded-full bg-[#F68B5F] animate-pulse" />
              {currentLang === "ta"
                ? "சரிபார்க்கப்பட்ட வரலாற்று பாரம்பரியம்"
                : "Verified Heritage & Cultural Trust"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#222222] font-outfit leading-[1.15]">
              {currentLang === "ta" ? (
                <>
                  பண்டைய <span className="text-[#F68B5F] underline decoration-[#F8D7C6] underline-offset-8">வரலாற்று</span> உலகை நம்பிக்கையோடு கண்டறியுங்கள்.
                </>
              ) : (
                <>
                  Uncover <span className="text-[#F68B5F] underline decoration-[#F8D7C6] underline-offset-8">Hidden</span> Ancient Kingdoms & Cultural Trust.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed max-w-2xl">
              {currentLang === "ta"
                ? "சேர, சோழ, பாண்டிய பேரரசுகளின் பண்டைய துறைமுகங்கள், இடைவெளியில்லா பாறை அரண்மனைகள் மற்றும் தொன்மையான கலாச்சார புனித பாதைகளை கண்டறியும் பிரீமியம் பயண தளம்."
                : "Cheral is a curated Traveling Historical Trust connecting explorers with authenticated ancient monuments, stone fortresses, and maritime heritage trails across Southern Asia."}
            </p>

            {/* CTA Buttons & Trust Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full bg-[#F68B5F] text-white text-sm font-bold shadow-md hover:bg-[#E26E4D] hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                {currentLang === "ta" ? "பாரம்பரிய பாதைகளை காண்க" : "Explore Verified Heritage"}
              </button>
              <a
                href="#trust-metrics"
                className="px-7 py-3.5 rounded-full bg-[#FFFFFF] border border-[#D9D9D9] text-[#222222] text-sm font-semibold hover:border-[#F68B5F] hover:text-[#F68B5F] transition-all duration-200"
              >
                {currentLang === "ta" ? "நம்பிக்கை அறிக்கை" : "Trust Verification"}
              </a>
            </div>

            {/* Quick Stats Banner */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#D9D9D9]/80 max-w-lg">
              <div>
                <p className="text-2xl font-bold text-[#222222] font-outfit">140+</p>
                <p className="text-xs text-[#6F6F6F]">
                  {currentLang === "ta" ? "சரிபார்க்கப்பட்ட இடங்கள்" : "Verified Sites"}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#222222] font-outfit">2,500 Yrs</p>
                <p className="text-xs text-[#6F6F6F]">
                  {currentLang === "ta" ? "வரலாற்று பாரம்பரியம்" : "Living Heritage"}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F68B5F] font-outfit">99.8%</p>
                <p className="text-xs text-[#6F6F6F]">
                  {currentLang === "ta" ? "நம்பிக்கை மதிப்பீடு" : "Trust Guarantee"}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Photography Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFFFF] bg-white group">
              <Image
                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80"
                alt="Brihadisvara Great Temple"
                width={700}
                height={850}
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/80 via-[#222222]/20 to-transparent" />

              {/* Floating Trust Verification Overlay Badge */}
              <div className="absolute top-4 right-4 bg-[#FFFFFF]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#D9D9D9] shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-[#222222]">
                  {currentLang === "ta" ? "UNESCO சான்றளிப்பு" : "UNESCO Trust Verified"}
                </span>
              </div>

              {/* Card Footer Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 bg-[#F68B5F] text-[10px] font-bold tracking-wider uppercase rounded-full mb-2">
                  Chola Dynasty • 1010 CE
                </span>
                <h3 className="text-xl font-bold font-outfit text-white">
                  Brihadisvara Great Temple
                </h3>
                <p className="text-xs text-[#E8D9CC] mt-1">
                  Thanjavur, Tamil Nadu — Built with a single 80-tonne granite capstone
                </p>
              </div>
            </div>

            {/* Secondary Floating Accent Card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-[#FFFFFF] p-4 rounded-2xl border border-[#D9D9D9] shadow-xl items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-[#F8D7C6] flex items-center justify-center text-[#F68B5F]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[#222222]">
                  {currentLang === "ta" ? "அறக்கட்டளை உறுதி" : "Authenticity Guarantee"}
                </p>
                <p className="text-[11px] text-[#6F6F6F]">
                  {currentLang === "ta" ? "தொல்லியல் வல்லுநர்களால் சான்றளிக்கப்பட்டது" : "Inspected by certified epigraphers"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
