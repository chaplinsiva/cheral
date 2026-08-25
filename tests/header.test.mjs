/* agent-notes: { ctx: "Unit tests for Header component navigation links including Blogs", deps: [src/components/Header.tsx], state: active, last: "tara@2026-08-25" } */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Header component should contain blog link to https://cheraltrust.blogspot.com/", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  // Verify URL is present
  assert.match(
    content,
    /https:\/\/cheraltrust\.blogspot\.com\/?/,
    "Header.tsx must link to https://cheraltrust.blogspot.com/"
  );

  // Verify external link security attributes
  assert.match(
    content,
    /target="_blank"/,
    "Blog link must have target='_blank'"
  );
  assert.match(
    content,
    /rel="noopener noreferrer"/,
    "Blog link must have rel='noopener noreferrer'"
  );

  // Verify Blogs link text in desktop nav
  assert.match(
    content,
    /Blogs/,
    "Header must display Blogs text"
  );
});
