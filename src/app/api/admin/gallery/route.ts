// agent-notes: { ctx: "API route for gallery items listing and creation in admin CRM", deps: ["src/lib/supabaseAdmin.ts"], state: active, last: "antigravity@2026-10-11" }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data: items, error } = await supabaseAdmin
      .from("gallery")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, category_label, image_url, location, description, display_order } = body;

    if (!title || !image_url) {
      return NextResponse.json({ error: "Title and image URL are required" }, { status: 400 });
    }

    const { data: item, error } = await supabaseAdmin
      .from("gallery")
      .insert({
        title,
        category: category || "nature",
        category_label: category_label || "Nature & Biodiversity",
        image_url,
        location: location || "Madurai, Tamil Nadu",
        description: description || "",
        display_order: display_order || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
