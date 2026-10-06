/* agent-notes: { ctx: "Unit tests for Gallery page data and navigation integration", deps: [src/data/cheralData.ts, src/app/gallery/page.tsx, src/components/Header.tsx, src/components/Footer.tsx], state: active, last: "tara@2026-08-30" } */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("cheralData.ts must export cheralGalleryItems and cheralGalleryCategories", () => {
  const dataPath = path.resolve("src/data/cheralData.ts");
  const content = fs.readFileSync(dataPath, "utf-8");

  assert.ok(content.includes("export const cheralGalleryCategories"), "cheralData must export cheralGalleryCategories");
  assert.ok(content.includes("export const cheralGalleryItems"), "cheralData must export cheralGalleryItems");
  assert.ok(content.includes("gallery-nature-walk"), "cheralData must include gallery items");
  assert.ok(content.includes("gallery-bird-watching"), "cheralData must include bird watching photo item");
});

test("src/app/gallery/page.tsx must exist and implement pure image collage & lightbox", () => {
  const pagePath = path.resolve("src/app/gallery/page.tsx");
  assert.ok(fs.existsSync(pagePath), "Gallery page file must exist at src/app/gallery/page.tsx");

  const content = fs.readFileSync(pagePath, "utf-8");
  assert.ok(content.includes("cheralGalleryItems"), "Gallery page must render cheralGalleryItems");
  assert.ok(content.includes("activeItem"), "Gallery page must support lightbox modal state");
  assert.ok(content.includes("handlePrev") && content.includes("handleNext"), "Gallery page must support lightbox navigation");
});

test("Header.tsx must contain /gallery link in desktop and mobile nav", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  assert.ok(content.includes('href="/gallery"'), "Header.tsx must link to /gallery");
  assert.ok(content.includes("Gallery") || content.includes("காட்சியகம்"), "Header.tsx must have Gallery label");
});

test("Footer.tsx must contain /gallery link", () => {
  const footerPath = path.resolve("src/components/Footer.tsx");
  const content = fs.readFileSync(footerPath, "utf-8");

  assert.ok(content.includes('href="/gallery"'), "Footer.tsx must link to /gallery");
});
