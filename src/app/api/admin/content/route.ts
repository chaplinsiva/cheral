// agent-notes: { ctx: "API route for 10 core values and section initiatives management", deps: ["src/lib/supabaseAdmin.ts"], state: active, last: "antigravity@2026-10-11" }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const [valuesRes, initsRes] = await Promise.all([
      supabaseAdmin.from("core_values").select("*").order("display_order", { ascending: true }),
      supabaseAdmin.from("initiatives").select("*").order("display_order", { ascending: true }),
    ]);

    return NextResponse.json({
      values: valuesRes.data || [],
      initiatives: initsRes.data || [],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { type, id, title, description, subtitle, image_url, display_order } = body;

    if (type === "value") {
      const { data, error } = await supabaseAdmin
        .from("core_values")
        .update({ title, description, display_order })
        .eq("id", id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, item: data });
    }

    if (type === "initiative") {
      const { data, error } = await supabaseAdmin
        .from("initiatives")
        .update({ title, subtitle, description, image_url, display_order })
        .eq("id", id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, item: data });
    }

    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
