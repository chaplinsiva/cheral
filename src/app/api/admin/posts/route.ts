// agent-notes: { ctx: "API route for blog posts listing and creation in admin CRM", deps: ["src/lib/supabaseAdmin.ts"], state: active, last: "antigravity@2026-10-11" }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data: posts, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, cover_image, category, author, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // Auto-generate slug if missing
    const generatedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const { data: post, error } = await supabaseAdmin
      .from("posts")
      .insert({
        title,
        slug: generatedSlug,
        excerpt: excerpt || "",
        content,
        cover_image: cover_image || null,
        category: category || "Ecology & Heritage",
        author: author || "Cheral Trust",
        published: published !== undefined ? published : true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
