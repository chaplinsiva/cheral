/* agent-notes: { ctx: "TDD test suite for Gallery Videos feature, video player popup, and admin videos CRUD", deps: ["src/app/gallery/page.tsx", "src/app/gallery/videos/page.tsx", "src/app/admin/page.tsx", "src/app/api/admin/videos/route.ts"], state: active, last: "antigravity@2026-10-11" } */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Videos API routes must exist for CRUD operations", () => {
  const videosApiPath = path.resolve("src/app/api/admin/videos/route.ts");
  const videoDetailApiPath = path.resolve("src/app/api/admin/videos/[id]/route.ts");

  assert.ok(fs.existsSync(videosApiPath), "src/app/api/admin/videos/route.ts must exist");
  assert.ok(fs.existsSync(videoDetailApiPath), "src/app/api/admin/videos/[id]/route.ts must exist");

  const routeContent = fs.readFileSync(videosApiPath, "utf-8");
  assert.match(routeContent, /supabaseAdmin/, "Videos route must use supabaseAdmin");
  assert.match(routeContent, /videos/, "Videos route must target public.videos table");
});

test("Gallery main page must include link or tab to Videos section", () => {
  const galleryPath = path.resolve("src/app/gallery/page.tsx");
  const content = fs.readFileSync(galleryPath, "utf-8");

  assert.match(content, /Videos|videos/i, "Gallery page must include Videos navigation tab or link");
});

test("Gallery Videos page must exist with carousel, video cards, and custom popup player", () => {
  const videosPagePath = path.resolve("src/app/gallery/videos/page.tsx");
  assert.ok(fs.existsSync(videosPagePath), "src/app/gallery/videos/page.tsx must exist");

  const content = fs.readFileSync(videosPagePath, "utf-8");
  assert.match(content, /carousel|slide/i, "Videos page must implement a featured videos carousel");
  assert.match(content, /thumbnail/i, "Videos page must render custom thumbnail UI");
  assert.match(content, /popup|modal|dialog|activeVideo/i, "Videos page must include video popup player modal");
  assert.match(content, /download|download_url/i, "Videos page must include video download / source link option");
  assert.match(content, /youtube/i, "Videos page must handle YouTube links and embeds");
});

test("Admin panel must include Videos Studio with add/edit/delete video capabilities", () => {
  const adminPagePath = path.resolve("src/app/admin/page.tsx");
  const content = fs.readFileSync(adminPagePath, "utf-8");

  assert.match(content, /videos|Video Studio/i, "Admin page must include Videos section in CRM");
  assert.match(content, /handleSaveVideo|videoModal/i, "Admin page must include video save and modal handler");
});
