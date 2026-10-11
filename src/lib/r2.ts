// agent-notes: { ctx: "Cloudflare R2 client helper using S3 SDK", deps: [".env.local"], state: active, last: "antigravity@2026-10-11" }

import { S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID || "";
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "";

/**
 * Cloudflare R2 S3-Compatible Client (Server-side use)
 */
export const r2Client = new S3Client({
  region: "auto",
  endpoint: accountId
    ? `https://${accountId}.r2.cloudflarestorage.com`
    : undefined,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || "cheral-assets";

/**
 * Generates the full public URL for an asset stored in Cloudflare R2
 */
export function getR2PublicUrl(key: string): string {
  const publicBaseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!publicBaseUrl) {
    return `/${key.replace(/^\//, "")}`;
  }
  return `${publicBaseUrl}/${key.replace(/^\//, "")}`;
}
