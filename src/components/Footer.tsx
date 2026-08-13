"use client";

/* agent-notes: { ctx: "Footer component with clean raw emblem logo before main bilingual logo", deps: [public/logos], state: active, last: "sato@2026-07-26" } */
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  currentLang: "en" | "ta";
  onOpenDonate: () => void;
}

export default function Footer({ currentLang, onOpenDonate }: FooterProps) {
  return (
    <footer className="bg-[#222222] text-[#F7F3EF] py-16 border-t border-[#D9D9D9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#6F6F6F]/40">
          
          {/* Brand Info with Clean Emblem + Main Logo */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              {/* Raw Emblem Logo (No round circle container) */}
              <div className="relative h-12 w-auto md:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logos/Final Cheral logo copy.png"
                  alt="Cheral Logo Emblem"
                  width={70}
                  height={70}
                  className="object-contain max-h-12 md:max-h-16 w-auto brightness-0 invert"
                />
              </div>

              {/* Main Logo */}
              {currentLang === "ta" ? (
                <Image
                  src="/logos/Final Cheral logo transparent.png"
                  alt="Cheral Tamil Logo"
                  width={200}
                  height={65}
                  className="object-contain max-h-14 md:max-h-16 w-auto brightness-0 invert"
                />
              ) : (
                <Image
                  src="/logos/Cheral eng logo copy.png"
                  alt="Cheral English Logo"
                  width={200}
                  height={65}
                  className="object-contain max-h-14 md:max-h-16 w-auto brightness-0 invert"
                />
              )}
            </Link>
            <p className="text-xs text-[#D9D9D9] max-w-sm leading-relaxed">
              {currentLang === "ta"
                ? "சேரல் வரலாற்று அறக்கட்டளை — பண்டைய தெற்காசிய வரலாற்று பொக்கிஷங்கள் மற்றும் தொல்பொருள் தகவல்களின் பிரீமியம் காப்பகம்."
                : "Cheral is a Traveling Historical Trust committed to authentic heritage documentation, epigraphy verification, and sustainable cultural tourism."}
            </p>
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F68B5F] hover:bg-[#E26E4D] text-white text-xs font-bold shadow transition-all"
            >
              <span>♥</span>
              <span>{currentLang === "ta" ? "அறக்கட்டளைக்கு நன்கொடை" : "Donate to Heritage Trust"}</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F68B5F]">
              {currentLang === "ta" ? "பகுதிகள்" : "Explore Eras"}
            </h4>
            <ul className="space-y-2 text-xs text-[#D9D9D9]">
              <li><a href="#destinations" className="hover:text-[#F68B5F] transition-colors">Chera Maritime Ports</a></li>
              <li><a href="#destinations" className="hover:text-[#F68B5F] transition-colors">Chola Temple Architecture</a></li>
              <li><a href="#destinations" className="hover:text-[#F68B5F] transition-colors">Pandya Sangam Sites</a></li>
              <li><a href="#destinations" className="hover:text-[#F68B5F] transition-colors">Coastal Sea Fortresses</a></li>
            </ul>
          </div>

          {/* Trust Principles */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F68B5F]">
              {currentLang === "ta" ? "அறக்கட்டளை கொள்கை" : "Trust Principles"}
            </h4>
            <p className="text-xs text-[#D9D9D9] leading-relaxed">
              {currentLang === "ta"
                ? "எங்கள் அமைப்பின் 100% பங்களிப்புகள் கல்வெட்டுகள் பாதுகாப்பு மற்றும் தொல்லியல் ஆராய்ச்சிக்கு பயன்படுத்தப்படுகின்றன."
                : "100% of our preservation funds directly support Tamil-Brahmi stone inscription documentation and monument restoration."}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#F8D7C6]">
              <span>🛡️ {currentLang === "ta" ? "சான்றளிக்கப்பட்ட பாதுகாப்பு" : "Certified Cultural Non-Profit"}</span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6F6F6F] gap-4">
          <p>© {new Date().getFullYear()} Cheral Traveling Historical Trust. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#F68B5F] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F68B5F] transition-colors">Trust Guidelines</a>
            <button onClick={onOpenDonate} className="text-[#F68B5F] hover:underline font-semibold">
              Donate
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
