// agent-notes: { ctx: "Script to set and verify CORS rules on Cloudflare R2 bucket for localhost and cheral.org", deps: [".env.local"], state: active, last: "antigravity@2026-10-11" }

import { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as path from "path";

// Load .env.local
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

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "cheral-assets";

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error("Missing R2 credentials in .env.local");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const corsRules = [
  {
    AllowedOrigins: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://localhost:3000",
      "https://localhost:3001",
      "http://127.0.0.1:3000",
      "https://cheral.org",
      "https://www.cheral.org",
      "https://*.cheral.org",
    ],
    AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
    AllowedHeaders: ["*"],
    ExposeHeaders: ["ETag", "Content-Type", "Content-Length"],
    MaxAgeSeconds: 86400,
  },
];

async function applyCors() {
  console.log(`Setting CORS for R2 bucket: ${bucketName}...`);
  try {
    const command = new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: {
        CORSRules: corsRules,
      },
    });

    await s3.send(command);
    console.log("✓ Successfully applied CORS configuration to Cloudflare R2 bucket!");

    // Verify
    const getCommand = new GetBucketCorsCommand({ Bucket: bucketName });
    const res = await s3.send(getCommand);
    console.log("\nVerified Current CORS Rules:");
    console.log(JSON.stringify(res.CORSRules, null, 2));
  } catch (err) {
    console.error("Error setting CORS:", err.message);
  }
}

applyCors();
