// agent-notes: { ctx: "API route for videos listing and creation in admin CRM", deps: ["src/lib/supabaseAdmin.ts"], state: active, last: "antigravity@2026-10-11" }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return match ? match[1] : null;
}

export async function GET() {
  try {
    const { data: videos, error } = await supabaseAdmin
      .from("videos")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ videos });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, video_url, thumbnail_url, category, download_url, display_order } = body;

    if (!title || !video_url) {
      return NextResponse.json({ error: "Title and video URL are required" }, { status: 400 });
    }

    const youtubeId = extractYouTubeId(video_url);
    const resolvedThumbnail = thumbnail_url?.trim() 
      ? thumbnail_url.trim() 
      : youtubeId 
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` 
      : null;

    const { data: video, error } = await supabaseAdmin
      .from("videos")
      .insert({
        title,
        description: description || "",
        video_url,
        youtube_id: youtubeId,
        thumbnail_url: resolvedThumbnail,
        category: category || "Docuseries & Research",
        download_url: download_url || null,
        display_order: display_order || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, video }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
