/* agent-notes: { ctx: "TDD test suite for WordPress-style CMS CRM, Blog CRUD, R2 upload, and dynamic DB content", deps: ["src/app/admin/page.tsx", "src/app/blog/page.tsx", "src/components/Header.tsx"], state: active, last: "tara@2026-10-11" } */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Header component should link to internal /blog instead of external blogspot", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  // Should have internal link to /blog
  assert.match(
    content,
    /href="\/blog"/,
    "Header.tsx must link internally to /blog"
  );
  // Should NOT link to external blogspot
  assert.doesNotMatch(
    content,
    /https:\/\/cheraltrust\.blogspot\.com/,
    "Header.tsx must not use external blogspot link"
  );
});

test("Blog listing and detail page routes must exist", () => {
  const blogListingPath = path.resolve("src/app/blog/page.tsx");
  const blogDetailPath = path.resolve("src/app/blog/[slug]/page.tsx");

  assert.ok(fs.existsSync(blogListingPath), "src/app/blog/page.tsx must exist");
  assert.ok(fs.existsSync(blogDetailPath), "src/app/blog/[slug]/page.tsx must exist");
});

test("Cloudflare R2 Upload API route must exist and handle file uploads", () => {
  const uploadApiPath = path.resolve("src/app/api/admin/upload/route.ts");
  assert.ok(fs.existsSync(uploadApiPath), "src/app/api/admin/upload/route.ts must exist");
  const content = fs.readFileSync(uploadApiPath, "utf-8");
  assert.match(content, /r2Client/, "Upload route must use Cloudflare R2 client");
  assert.match(content, /PutObjectCommand/, "Upload route must use PutObjectCommand");
});

test("Admin posts CRUD API route must exist", () => {
  const postsApiPath = path.resolve("src/app/api/admin/posts/route.ts");
  const postDetailApiPath = path.resolve("src/app/api/admin/posts/[id]/route.ts");

  assert.ok(fs.existsSync(postsApiPath), "src/app/api/admin/posts/route.ts must exist");
  assert.ok(fs.existsSync(postDetailApiPath), "src/app/api/admin/posts/[id]/route.ts must exist");
});

test("Admin gallery CRUD API routes must exist", () => {
  const galleryApiPath = path.resolve("src/app/api/admin/gallery/route.ts");
  const galleryDetailApiPath = path.resolve("src/app/api/admin/gallery/[id]/route.ts");

  assert.ok(fs.existsSync(galleryApiPath), "src/app/api/admin/gallery/route.ts must exist");
  assert.ok(fs.existsSync(galleryDetailApiPath), "src/app/api/admin/gallery/[id]/route.ts must exist");
});

test("Admin panel in src/app/admin/page.tsx must provide WordPress-style CRM features and Gallery Studio", () => {
  const adminPagePath = path.resolve("src/app/admin/page.tsx");
  const content = fs.readFileSync(adminPagePath, "utf-8");

  assert.match(content, /Blog|Posts/i, "Admin page must include Blog/Posts CRM section");
  assert.match(content, /Hero|Home Screen Images/i, "Admin page must include Home Screen Images editor");
  assert.match(content, /Gallery|Gallery Studio/i, "Admin page must include Gallery Studio section");
  assert.match(content, /Values|Core Values/i, "Admin page must include 10 Core Values editor");
  assert.match(content, /upload|Cloudflare R2/i, "Admin page must include Cloudflare R2 uploader");
});

test("Blog creation and post editor must support inserting inline images, videos, and links", () => {
  const adminPagePath = path.resolve("src/app/admin/page.tsx");
  const adminContent = fs.readFileSync(adminPagePath, "utf-8");

  assert.match(adminContent, /Inline Image|Add Image|insertImage/i, "Admin editor must offer inline image insertion");
  assert.match(adminContent, /Inline Video|Add Video|insertVideo/i, "Admin editor must offer inline video URL insertion");
  assert.match(adminContent, /Inline Link|Add Link|insertLink/i, "Admin editor must offer inline link insertion");

  const blogPostPath = path.resolve("src/app/blog/[slug]/page.tsx");
  const blogPostContent = fs.readFileSync(blogPostPath, "utf-8");

  assert.match(blogPostContent, /iframe|youtube|vimeo|video/i, "Blog reader must parse and render embedded video players");
  assert.match(blogPostContent, /!\[.*?\]|img|Image/i, "Blog reader must parse and render inline images");
});


