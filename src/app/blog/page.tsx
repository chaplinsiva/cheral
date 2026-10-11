// agent-notes: { ctx: "Public internal blog listing page with magazine layout", deps: ["src/lib/supabase.ts", "src/components/Header.tsx", "src/components/Footer.tsx"], state: active, last: "antigravity@2026-10-11" }

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every minute

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  author: string;
  created_at: string;
}

const fallbackPosts: Post[] = [
  {
    id: "fb-1",
    title: "Preserving Madurai's Sacred Groves and Endemic Flora",
    slug: "preserving-madurais-sacred-groves",
    excerpt: "Exploring the historical significance and ecological biodiversity of temple groves and indigenous tree sanctuaries across Tamil Nadu.",
    cover_image: "/images/pdf/image-004.jpg",
    category: "Ecological Research",
    author: "Cheral Trust Research Team",
    created_at: new Date().toISOString(),
  },
  {
    id: "fb-2",
    title: "The Sangam River Basin: Bridging Heritage and Water Justice",
    slug: "sangam-river-basin-heritage-water-justice",
    excerpt: "How traditional tank irrigation and Vaigai water systems reflect historical consciousness and ecological justice.",
    cover_image: "/images/pdf/image-008.jpg",
    category: "Heritage & Literature",
    author: "Cheral Editorial Board",
    created_at: new Date().toISOString(),
  },
];

async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, cover_image, category, author, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackPosts;
    }
    return data;
  } catch {
    return fallbackPosts;
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EF]">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#E8D9CC] pb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8D9CC]/60 text-[#4A0E17] text-xs font-bold uppercase tracking-wider mb-4">
            <span>🌿</span>
            <span>Cheral Perspectives & Research</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#4A0E17] tracking-tight">
            Heritage & Ecological Journal
          </h1>
          <p className="text-sm sm:text-base text-[#6F6F6F] mt-4 leading-relaxed">
            Essays, field observations, botanical surveys, and cultural history documented by the Cheral Trust research team and community contributors.
          </p>
        </div>

        {/* Featured Story */}
        {featuredPost && (
          <div className="mb-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-white rounded-3xl overflow-hidden border border-[#E8D9CC] shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="relative h-72 sm:h-96 lg:h-auto lg:col-span-7 bg-[#2D0A0E] overflow-hidden">
                  <Image
                    src={featuredPost.cover_image || "/images/pdf/image-004.jpg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#4A0E17]/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#a62a14] uppercase tracking-widest block mb-3">
                      Featured Field Essay
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] group-hover:text-[#a62a14] transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm text-[#6F6F6F] mt-4 leading-relaxed line-clamp-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E8D9CC] flex items-center justify-between text-xs text-[#6F6F6F]">
                    <div>
                      <span className="font-semibold text-[#222222] block">{featuredPost.author}</span>
                      <span>
                        {new Date(featuredPost.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="font-bold text-[#4A0E17] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Full Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Article Grid */}
        {gridPosts.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#4A0E17] mb-8 pb-3 border-b border-[#E8D9CC]">
              Recent Publications & Observations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8D9CC] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 bg-[#2D0A0E] overflow-hidden">
                    <Image
                      src={post.cover_image || "/images/pdf/image-008.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#4A0E17]/85 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#4A0E17] group-hover:text-[#a62a14] transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-[#6F6F6F] mt-2.5 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-[#E8D9CC]/60 flex items-center justify-between text-[11px] text-[#6F6F6F]">
                      <span>{post.author}</span>
                      <span className="font-bold text-[#a62a14]">Read Article →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
