// agent-notes: { ctx: "Public blog article reader page with inline media and video embeds", deps: ["src/lib/supabase.ts", "src/components/Header.tsx", "src/components/Footer.tsx"], state: active, last: "antigravity@2026-10-11" }

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  author: string;
  created_at: string;
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    return data;
  } catch {
    return null;
  }
}

function renderInlineText(text: string): React.ReactNode {
  // Regex to match markdown links [label](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const url = match[2];
    const isExternal = url.startsWith("http");

    parts.push(
      <a
        key={match.index}
        href={url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-[#a62a14] hover:text-[#4A0E17] underline decoration-1 underline-offset-2 font-semibold transition inline-flex items-center gap-0.5"
      >
        <span>{label}</span>
        {isExternal && <span className="text-[10px] no-underline">↗</span>}
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function renderMediaChunk(chunk: string, key: any) {
  // 1. Explicit Video Embed: ![video](url) or [video](url) or standalone video URL
  const videoMatch = chunk.match(/^!?\[video\]\((.*?)\)$/i);
  const rawUrl = videoMatch ? videoMatch[1].trim() : chunk.trim();

  // YouTube Embed
  const ytMatch = rawUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch) {
    const videoId = ytMatch[1];
    return (
      <div key={key} className="my-8 rounded-2xl overflow-hidden shadow-md border border-[#E8D9CC] aspect-video w-full bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="Cheral Video Documentary"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Vimeo Embed
  const vimeoMatch = rawUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+\/)?video\/|video\/|)(\d+)/i);
  if (vimeoMatch) {
    const vimeoId = vimeoMatch[1];
    return (
      <div key={key} className="my-8 rounded-2xl overflow-hidden shadow-md border border-[#E8D9CC] aspect-video w-full bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title="Cheral Vimeo Documentary"
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Direct HTML5 Video (.mp4 / .webm)
  if (/\.(mp4|webm|ogg)($|\?)/i.test(rawUrl)) {
    return (
      <div key={key} className="my-8 rounded-2xl overflow-hidden shadow-md border border-[#E8D9CC] w-full bg-black">
        <video controls className="w-full max-h-[520px]" src={rawUrl}>
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // 2. Inline Image: ![caption](url)
  const imgMatch = chunk.match(/^!\[(.*?)\]\((.*?)\)$/);
  if (imgMatch) {
    const caption = imgMatch[1];
    const imageUrl = imgMatch[2];
    return (
      <figure key={key} className="my-8 rounded-2xl overflow-hidden border border-[#E8D9CC] bg-[#F7F3EF]/60 shadow-xs">
        <div className="relative w-full h-72 sm:h-96 md:h-[460px]">
          <Image
            src={imageUrl}
            alt={caption || "Cheral Trust archive photo"}
            fill
            className="object-cover"
          />
        </div>
        {caption && (
          <figcaption className="p-3.5 text-center text-xs text-[#6F6F6F] italic border-t border-[#E8D9CC] bg-white">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Markdown chunk parser with rich inline media support
  const formattedSections = post.content.split("\n\n").map((chunk, idx) => {
    const trimmed = chunk.trim();
    if (!trimmed) return null;

    // Check media chunk first (inline images or video embeds)
    const mediaNode = renderMediaChunk(trimmed, idx);
    if (mediaNode) {
      return mediaNode;
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={idx} className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] mt-8 mb-4">
          {renderInlineText(trimmed.replace(/^## /, ""))}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-[#a62a14] mt-6 mb-3">
          {renderInlineText(trimmed.replace(/^### /, ""))}
        </h3>
      );
    }
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={idx} className="border-l-4 border-[#a62a14] pl-5 py-2.5 my-6 italic text-base sm:text-lg text-[#4A0E17] bg-[#E8D9CC]/25 rounded-r-2xl">
          {renderInlineText(trimmed.replace(/^>\s*/, ""))}
        </blockquote>
      );
    }
    if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map((line) => line.replace(/^(\d+\.|\-)\s+/, ""));
      return (
        <ul key={idx} className="list-disc pl-6 space-y-2 text-[#444444] leading-relaxed my-4 text-base sm:text-lg">
          {items.map((it, i) => (
            <li key={i}>{renderInlineText(it)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={idx} className="text-base sm:text-lg text-[#333333] leading-relaxed my-4">
        {renderInlineText(trimmed)}
      </p>
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EF]">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a62a14] hover:text-[#4A0E17] transition-colors"
          >
            <span>←</span>
            <span>Back to All Publications</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D9CC] text-[#4A0E17] text-xs font-bold uppercase tracking-wider mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#4A0E17] leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E8D9CC] text-xs text-[#6F6F6F]">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#222222]">{post.author}</span>
              <span>•</span>
              <span>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <span className="font-medium">CHERAL Research Archive</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative w-full h-72 sm:h-96 md:h-[460px] rounded-3xl overflow-hidden mb-12 shadow-lg border border-[#E8D9CC]">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-lg max-w-none bg-white p-8 sm:p-12 rounded-3xl border border-[#E8D9CC] shadow-xs leading-relaxed">
          {formattedSections}
        </article>

        {/* Return Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A0E17] hover:bg-[#2D0A0E] text-white font-semibold text-sm transition shadow-md"
          >
            <span>Explore More Cheral Articles</span>
            <span>→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
