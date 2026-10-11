"use client";

/* agent-notes: { ctx: "Full-screen hero slideshow with smooth 6s transitions, displaying original hardcoded brochure images", deps: [src/data/cheralData.ts, public/images], state: active, last: "antigravity@2026-10-11" } */
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
            className="object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
          />
          {/* Deep Cinematic Overlay Filter */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A0E] via-[#2D0A0E]/70 to-[#2D0A0E]/40" />
        </div>
      ))}

      {/* Hero Overlay Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 pb-12 flex flex-col justify-between min-h-[75vh]">
        
        {/* Top Spacer */}
        <div />

        {/* Central Headlines & Dynamic Initiative Badge */}
        <div className="max-w-3xl space-y-6">
          
          {/* Active Initiative Category Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs uppercase tracking-widest text-[#E8D9CC] font-semibold animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#a62a14] animate-pulse" />
            <span>{activeSlideData.tag[currentLang]}</span>
          </div>

          {/* Main Title with Serif Editorial Dignity */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.15] drop-shadow-sm transition-all duration-700">
            {activeSlideData.title[currentLang]}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-base sm:text-lg lg:text-xl text-[#F7F3EF]/90 font-sans leading-relaxed line-clamp-3 max-w-2xl font-light">
            {activeSlideData.subtitle[currentLang]}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-full bg-[#a62a14] hover:bg-[#4A0E17] text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group active:scale-95 cursor-pointer"
            >
              <span>
                {currentLang === "ta" ? "எங்களை பற்றி அறிய" : "Explore Initiatives"}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <a
              href="#about"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-[#F7F3EF] font-medium text-sm transition-all duration-300 active:scale-95"
            >
              {currentLang === "ta" ? "நோக்கங்கள்" : "Our Mission"}
            </a>
          </div>
        </div>

        {/* Bottom Bar: Slide Dots and Subtitle */}
        <div className="pb-6 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#E8D9CC]/80 font-sans tracking-wide">
            {currentLang === "ta"
              ? "இயற்கை பாதுகாப்பு • வரலாற்று ஆவணப்படுத்தல் • சமூக களப்பணிகள்"
              : "Ecological Research • Heritage Conservation • Community Action"}
          </p>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2.5">
            {cheralHeroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
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
