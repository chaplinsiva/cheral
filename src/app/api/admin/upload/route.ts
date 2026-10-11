// agent-notes: { ctx: "Cloudflare R2 direct image upload API for admin CRM", deps: ["src/lib/r2.ts"], state: active, last: "antigravity@2026-10-11" }

import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET_NAME, getR2PublicUrl } from "@/lib/r2";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique key
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `uploads/${Date.now()}-${cleanName}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type || "image/jpeg",
    });

    await r2Client.send(uploadCommand);

    const publicUrl = getR2PublicUrl(key);

    return NextResponse.json({
      success: true,
      key,
      url: publicUrl,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload to Cloudflare R2 failed";
    console.error("R2 Upload Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
