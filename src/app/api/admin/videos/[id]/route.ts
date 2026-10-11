// agent-notes: { ctx: "API route for individual video item update and deletion", deps: ["src/lib/supabaseAdmin.ts"], state: active, last: "antigravity@2026-10-11" }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return match ? match[1] : null;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, video_url, thumbnail_url, category, download_url, display_order } = body;

    const youtubeId = video_url ? extractYouTubeId(video_url) : null;
    const resolvedThumbnail = thumbnail_url?.trim() 
      ? thumbnail_url.trim() 
      : youtubeId 
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` 
      : null;

    const { data: video, error } = await supabaseAdmin
      .from("videos")
      .update({
        title,
        description,
        video_url,
        youtube_id: youtubeId,
        thumbnail_url: resolvedThumbnail,
        category,
        download_url,
        display_order,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, video });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error } = await supabaseAdmin.from("videos").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Video deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
