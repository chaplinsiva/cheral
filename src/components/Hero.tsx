"use client";

/* agent-notes: { ctx: "Full-screen hero slideshow with smooth 6s transitions, minimalist loading progress bar, background overlay, and secondary color #a62a14", deps: [src/data/cheralData.ts, public/images/pdf], state: active, last: "sato@2026-08-13" } */
import { useState, useEffect } from "react";
import Image from "next/image";
import { cheralHeroSlides } from "@/data/cheralData";

interface HeroProps {
  currentLang: "en" | "ta";
  onExploreClick: () => void;
}

export default function Hero({ currentLang, onExploreClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6000;

  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);

    const slideTimer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % cheralHeroSlides.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [currentSlide]);

  const activeSlideData = cheralHeroSlides[currentSlide];

  return (
    <section className="relative w-full min-h-[88vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#2D0A0E] text-white">
      
      {/* Full Screen Animated Background Slideshow */}
      {cheralHeroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title[currentLang]}
            fill
            priority={idx === 0}
            className="object-cover object-center scale-105 animate-pulse transition-transform duration-10000 ease-linear"
          />
          {/* Deep Cinematic Overlay Filter */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A0E] via-[#2D0A0E]/70 to-[#2D0A0E]/40" />
        </div>
      ))}

      {/* Hero Overlay Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col justify-between min-h-[88vh] lg:min-h-screen">
        
        {/* Top Pill Badge */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFFFFF]/15 border border-white/25 backdrop-blur-md text-xs font-semibold text-[#F7F3EF] shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a62a14] animate-pulse" />
            {currentLang === "ta"
              ? "சேரல் அறக்கட்டளை - மதசார்பற்ற தொண்டு நிறுவனம்"
              : "Cheral Trust • Centre for Heritage & Ecological Research"}
          </div>
        </div>

        {/* Center Main Headline & Narrative */}
        <div className="max-w-4xl space-y-6 my-auto">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#a62a14] text-white text-xs font-mono font-bold tracking-widest uppercase shadow-md">
            {activeSlideData.tag}
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.12] drop-shadow-md">
            {activeSlideData.title[currentLang]}
          </h1>

          <p className="text-base sm:text-xl text-[#E8D9CC]/95 font-sans leading-relaxed max-w-2xl drop-shadow-sm">
            {activeSlideData.subtitle[currentLang]}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full bg-[#a62a14] text-white text-xs sm:text-sm font-bold shadow-xl hover:bg-white hover:text-[#4A0E17] transition-all duration-300 active:scale-95 flex items-center gap-2"
            >
              <span>{currentLang === "ta" ? "செயல்பாடுகளைக் காண்க" : "Explore What We Do"}</span>
              <span className="text-lg">↓</span>
            </button>
            <a
              href="#objectives"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white text-xs sm:text-sm font-semibold hover:bg-white hover:text-[#222222] backdrop-blur-md transition-all duration-300"
            >
              {currentLang === "ta" ? "நோக்கங்கள்" : "Key Objectives"}
            </a>
          </div>
        </div>

        {/* Bottom Bar: Quick Metrics, Slide Dots, and Progress Bar */}
        <div className="pb-6 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          
          {/* Quick Metrics */}
          <div className="sm:col-span-8 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <p className="text-2xl font-serif font-bold text-white">4</p>
              <p className="text-[11px] text-[#E8D9CC]/80">
                {currentLang === "ta" ? "முதன்மைத் திட்டங்கள்" : "Core Initiatives"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-white">10</p>
              <p className="text-[11px] text-[#E8D9CC]/80">
                {currentLang === "ta" ? "கொள்கைகள்" : "Core Values"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-[#a62a14]">100%</p>
              <p className="text-[11px] text-[#E8D9CC]/80">
                {currentLang === "ta" ? "தொண்டு நிறுவனம்" : "Non-Profit Trust"}
              </p>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="sm:col-span-4 flex items-center justify-start sm:justify-end gap-3">
            {cheralHeroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-8 bg-[#a62a14]"
                    : "w-2.5 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Minimalist Animated Loading Progress Bar at Very Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60 z-30">
        <div
          className="h-full bg-[#a62a14] transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        />
      </div>

    </section>
  );
}
