"use client";

// agent-notes: { ctx: "Cheral Gallery Videos page with featured carousel, video cards grid, download links, and custom popup player", deps: ["src/components/Header.tsx", "src/components/Footer.tsx", "src/components/DonateModal.tsx", "src/lib/supabase.ts"], state: active, last: "antigravity@2026-10-11" }

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";
import { supabase } from "@/lib/supabase";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  video_url: string;
  youtube_id: string | null;
  thumbnail_url: string | null;
  category: string;
  download_url: string | null;
  display_order: number;
}

const fallbackVideos: VideoItem[] = [
  {
    id: "1",
    title: "Cheral Trust: Heritage & Ecological Restoration Documentary",
    description: "An overview of Cheral Trust uniting historical consciousness, biodiversity research, and community-led restoration across Tamil Nadu.",
    video_url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    youtube_id: "ScMzIvxBSi4",
    thumbnail_url: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
    category: "Docuseries",
    download_url: "https://pub-58e411ef35d44a21881a939d23facf08.r2.dev/videos/cheral_intro_720p.mp4",
    display_order: 1,
  },
  {
    id: "2",
    title: "Bird Watching & Wetland Ecosystems of Madurai",
    description: "Field documentation exploring native water birds, migratory flocks, and freshwater wetland balance along the Vaigai river basin.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtube_id: "dQw4w9WgXcQ",
    thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Nature & Biodiversity",
    download_url: "https://pub-58e411ef35d44a21881a939d23facf08.r2.dev/videos/wetland_birds_1080p.mp4",
    display_order: 2,
  },
  {
    id: "3",
    title: "Ancient Sacred Groves & Epigraphy Trail",
    description: "Rediscovering sacred banyan groves and centuries-old stone inscriptions with students and local village elders.",
    video_url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    youtube_id: "3JZ_D3ELwOQ",
    thumbnail_url: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg",
    category: "Heritage & History",
    download_url: "https://pub-58e411ef35d44a21881a939d23facf08.r2.dev/videos/heritage_walk_720p.mp4",
    display_order: 3,
  },
  {
    id: "4",
    title: "Native Tree Plantation & Seed Ball Dispersal Drive",
    description: "Community youth and volunteers establishing indigenous micro-forests and restoring local water catchment areas.",
    video_url: "https://www.youtube.com/watch?v=L_LUpnjgPso",
    youtube_id: "L_LUpnjgPso",
    thumbnail_url: "https://img.youtube.com/vi/L_LUpnjgPso/maxresdefault.jpg",
    category: "Plantation & Conservation",
    download_url: "https://pub-58e411ef35d44a21881a939d23facf08.r2.dev/videos/tree_plantation_1080p.mp4",
    display_order: 4,
  },
];

export default function GalleryVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>(fallbackVideos);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Load videos from Supabase database
  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("*")
          .order("display_order", { ascending: true });

        if (!error && data && data.length > 0) {
          setVideos(data);
        }
      } catch {
        // Keep fallback videos
      }
    }
    fetchVideos();
  }, []);

  // Filter videos by category
  const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];
  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  // Featured videos for top carousel (first 4)
  const carouselVideos = videos.slice(0, 5);

  const handleNextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % carouselVideos.length);
  }, [carouselVideos.length]);

  const handlePrevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + carouselVideos.length) % carouselVideos.length);
  }, [carouselVideos.length]);

  // Keyboard navigation for active video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleShare = (videoUrl: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(videoUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const currentSlide = carouselVideos[carouselIndex] || carouselVideos[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EF]">
      <Header onOpenDonate={() => setDonateModalOpen(true)} />

      <main className="flex-grow">
        {/* Intro Header & Sub-Nav */}
        <section className="bg-[#4A0E17] text-white py-12 sm:py-16 border-b border-[#2D0A0E]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E8D9CC]/80 uppercase tracking-widest mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Gallery
              </Link>
              <span>/</span>
              <span className="text-[#a62a14]">Videos</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                {/* Switcher Tabs */}
                <div className="flex items-center gap-2 mb-4">
                  <Link
                    href="/gallery"
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E8D9CC] text-xs font-bold tracking-wider uppercase transition border border-white/10"
                  >
                    📷 Photographs
                  </Link>
                  <span className="px-4 py-1.5 rounded-full bg-[#a62a14] text-white text-xs font-bold tracking-wider uppercase shadow-md border border-[#a62a14]">
                    🎬 Videos & Documentaries
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
                  Cheral Video Archive
                </h1>
                <p className="text-sm sm:text-base text-[#F7F3EF]/85 max-w-2xl mt-3 font-light leading-relaxed">
                  Immersive field documentations, ecological research visual logs, sacred grove walks, and native tree planting drives in motion.
                </p>
              </div>

              {/* Total Videos Counter */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md self-start md:self-end">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a62a14] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-[#E8D9CC]">
                  {videos.length} Documentaries
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 1. FEATURED VIDEOS CAROUSEL */}
        {carouselVideos.length > 0 && currentSlide && (
          <section className="py-8 sm:py-12 bg-white border-b border-[#E8D9CC]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold text-[#a62a14] uppercase tracking-wider">Spotlight</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">Featured Documentaries</h2>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="w-10 h-10 rounded-full border border-[#D9D9D9] hover:border-[#4A0E17] hover:bg-[#F7F3EF] flex items-center justify-center text-[#4A0E17] transition cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="w-10 h-10 rounded-full border border-[#D9D9D9] hover:border-[#4A0E17] hover:bg-[#F7F3EF] flex items-center justify-center text-[#4A0E17] transition cursor-pointer"
                    aria-label="Next Slide"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Featured Slide Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8D9CC] bg-[#2D0A0E] group h-[380px] sm:h-[480px] lg:h-[540px]">
                {/* Background Image / Thumbnail */}
                {currentSlide.thumbnail_url && (
                  <Image
                    src={currentSlide.thumbnail_url}
                    alt={currentSlide.title}
                    fill
                    priority
                    unoptimized
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-6 sm:p-10 lg:p-14">
                  {/* Category Pill */}
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#4A0E17]/80 text-[#E8D9CC] text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-[#a62a14]/40">
                      {currentSlide.category}
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      {carouselIndex + 1} / {carouselVideos.length}
                    </span>
                  </div>

                  {/* Center Play Button trigger */}
                  <div className="flex justify-center my-auto">
                    <button
                      onClick={() => setActiveVideo(currentSlide)}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 hover:bg-white text-[#4A0E17] flex items-center justify-center shadow-2xl transition transform hover:scale-110 cursor-pointer group/btn"
                      aria-label="Play Featured Video"
                    >
                      <svg className="w-10 h-10 ml-1.5 text-[#4A0E17] group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom Text & Actions */}
                  <div className="space-y-3 max-w-3xl">
                    <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                      {currentSlide.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#F7F3EF]/90 line-clamp-2 font-light">
                      {currentSlide.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveVideo(currentSlide)}
                        className="px-5 py-2.5 rounded-xl bg-[#a62a14] hover:bg-[#8e2411] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer transition"
                      >
                        <span>▶ Watch Now</span>
                      </button>

                      {currentSlide.download_url && (
                        <a
                          href={currentSlide.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition flex items-center gap-1.5"
                        >
                          <span>⬇ Download Video</span>
                        </a>
                      )}

                      <a
                        href={currentSlide.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#E8D9CC] text-xs sm:text-sm font-medium transition flex items-center gap-1.5"
                      >
                        <span>YouTube ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {carouselVideos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === carouselIndex ? "w-8 bg-[#4A0E17]" : "w-2 bg-[#D9D9D9]"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 2. ALL VIDEOS GRID & CATEGORY FILTER */}
        <section className="py-10 sm:py-16">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#4A0E17] text-white shadow-sm"
                      : "bg-white text-[#4A0E17] border border-[#E8D9CC] hover:bg-[#F7F3EF]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8D9CC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  {/* Thumbnail Container */}
                  <div
                    onClick={() => setActiveVideo(video)}
                    className="relative aspect-video w-full bg-[#2D0A0E] overflow-hidden cursor-pointer"
                  >
                    {video.thumbnail_url ? (
                      <Image
                        src={video.thumbnail_url}
                        alt={video.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-white/50 text-sm">
                        🎬 Cheral Video
                      </div>
                    )}

                    {/* Gradient Overlay & Play Button */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/95 text-[#4A0E17] shadow-xl flex items-center justify-center transform scale-90 group-hover:scale-105 transition-transform">
                        <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#4A0E17]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                      {video.category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => setActiveVideo(video)}
                        className="font-serif font-bold text-[#4A0E17] text-base leading-snug line-clamp-2 hover:text-[#a62a14] transition cursor-pointer"
                      >
                        {video.title}
                      </h4>
                      {video.description && (
                        <p className="text-xs text-[#6F6F6F] mt-2 line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 mt-4 border-t border-[#E8D9CC] flex items-center justify-between text-xs">
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="font-bold text-[#a62a14] hover:text-[#4A0E17] transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>▶ Play Video</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {video.download_url && (
                          <a
                            href={video.download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="p-1.5 rounded-lg bg-[#F7F3EF] hover:bg-[#E8D9CC] text-[#4A0E17] transition font-bold"
                            title="Download Video File"
                          >
                            <span>⬇</span>
                          </a>
                        )}

                        <a
                          href={video.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#F7F3EF] hover:bg-[#E8D9CC] text-[#4A0E17] transition font-bold"
                          title="Open YouTube link"
                        >
                          <span>↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 3. CUSTOM VIDEO POPUP LIGHTBOX PLAYER */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <div className="bg-[#2D0A0E] text-white rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full border border-white/10 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#4A0E17]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8D9CC]">
                  {activeVideo.category}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white line-clamp-1">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition cursor-pointer"
                aria-label="Close Player"
              >
                ✕
              </button>
            </div>

            {/* Video Player (Custom UI embedding YouTube or MP4) */}
            <div className="relative aspect-video w-full bg-black">
              {activeVideo.youtube_id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtube_id}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  src={activeVideo.video_url}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Modal Footer & Actions */}
            <div className="p-5 sm:p-6 bg-[#2D0A0E] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-[#F7F3EF]/80 max-w-xl leading-relaxed">
                {activeVideo.description || "Cheral Trust archival field documentary recording."}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {activeVideo.download_url && (
                  <a
                    href={activeVideo.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-4 py-2 rounded-xl bg-[#a62a14] hover:bg-[#8e2411] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                  >
                    <span>⬇ Download Video</span>
                  </a>
                )}

                <a
                  href={activeVideo.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#E8D9CC] text-xs font-semibold transition flex items-center gap-1"
                >
                  <span>Open on YouTube ↗</span>
                </a>

                <button
                  onClick={() => handleShare(activeVideo.video_url)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer"
                  title="Copy video link"
                >
                  {copiedLink ? "✓ Link Copied" : "Share"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer onOpenDonate={() => setDonateModalOpen(true)} />
      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        currentLang="en"
      />
    </div>
  );
}
