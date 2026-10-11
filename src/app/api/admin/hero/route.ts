// agent-notes: { ctx: "API route for Home Screen Hero Slideshow management", deps: ["src/lib/supabaseAdmin.ts"], state: active, last: "antigravity@2026-10-11" }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data: slides, error } = await supabaseAdmin
      .from("hero_slides")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ slides });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, image_url, display_order } = body;

    if (!title || !image_url) {
      return NextResponse.json({ error: "Title and image URL are required" }, { status: 400 });
    }

    const { data: slide, error } = await supabaseAdmin
      .from("hero_slides")
      .insert({
        title,
        subtitle: subtitle || "",
        image_url,
        display_order: display_order || 0,
        active: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, slide }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, subtitle, image_url, display_order, active } = body;

    if (!id) {
      return NextResponse.json({ error: "Slide ID required" }, { status: 400 });
    }

    const { data: slide, error } = await supabaseAdmin
      .from("hero_slides")
      .update({
        title,
        subtitle,
        image_url,
        display_order,
        active,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, slide });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Slide ID required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("hero_slides").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
