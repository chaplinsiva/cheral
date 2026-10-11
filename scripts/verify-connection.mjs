// agent-notes: { ctx: "Connectivity diagnostic script for Supabase and Cloudflare R2", deps: [".env.local"], state: active, last: "antigravity@2026-10-11" }

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as path from "path";

// Load .env.local variables
const envPath = path.resolve(".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    }
  }
}

async function verifySupabase() {
  console.log("\n=================================");
  console.log(" 1. VERIFYING SUPABASE CONNECTION");
  console.log("=================================");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey) {
    console.error("  [FAIL] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return;
  }

  // 1. Anon Key Check
  try {
    const res = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: anonKey },
    });
    if (res.ok) {
      console.log("  [PASS] Supabase Public/Anon API: Connected (Auth service active)");
    } else {
      console.log(`  [FAIL] Supabase Public/Anon API error: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error("  [FAIL] Supabase connection error:", err);
  }

  // 2. Service Role Admin Key Check
  if (serviceKey) {
    try {
      const res = await fetch(`${url}/auth/v1/admin/users`, {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`  [PASS] Supabase Service Role: Admin authorized (Registered users: ${data.users?.length ?? 0})`);
      } else {
        console.log(`  [FAIL] Supabase Service Role error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      console.error("  [FAIL] Supabase admin error:", err);
    }
  }
}

async function verifyCloudflareR2() {
  console.log("\n=================================");
  console.log(" 2. VERIFYING CLOUDFLARE R2");
  console.log("=================================");

  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  const publicUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    console.error("  [FAIL] Missing Cloudflare R2 credentials in .env.local");
    return;
  }

  try {
    const s3 = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 10,
    });

    const res = await s3.send(command);
    console.log(`  [PASS] R2 Bucket [${bucketName}]: Connected & Authenticated!`);
    console.log(`         Objects count: ${res.KeyCount ?? 0}`);
    if (res.Contents && res.Contents.length > 0) {
      res.Contents.forEach((c) => console.log(`          - ${c.Key} (${c.Size} bytes)`));
    } else {
      console.log("         (Bucket is ready for uploads)");
    }

    if (publicUrl) {
      console.log(`  [PASS] Public Asset Domain: ${publicUrl}`);
    }
  } catch (err) {
    console.error("  [FAIL] Cloudflare R2 connection failed:", err.message || err);
  }
}

async function main() {
  await verifySupabase();
  await verifyCloudflareR2();
  console.log("\n=================================\n");
}

main();
