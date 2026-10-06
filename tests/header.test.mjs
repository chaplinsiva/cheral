/* agent-notes: { ctx: "Unit tests for Header navigation, volunteering form link, contact us, and donate button", deps: [src/components/Header.tsx], state: active, last: "tara@2026-10-06" } */
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

test("Header component should contain volunteering form link", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  assert.ok(
    content.includes("https://forms.gle/ktUF1JXeGNbfM2AAA"),
    "Header.tsx must link to Google forms volunteering link"
  );
  assert.ok(
    content.includes("Volunteering"),
    "Header.tsx must display Volunteering"
  );
});

test("Header component should hide What We Do and Objectives & Values from nav", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  assert.equal(
    content.includes('href="/#what-we-do"'),
    false,
    "Header.tsx should not include /#what-we-do"
  );
  assert.equal(
    content.includes('href="/#objectives"'),
    false,
    "Header.tsx should not include /#objectives"
  );
});

test("Header component should have Contact Us primary CTA and small Donate button", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  assert.ok(
    content.includes('href="/#contact"'),
    "Header.tsx must link to #contact"
  );
  assert.ok(
    content.includes("Contact Us"),
    "Header.tsx must display Contact Us CTA"
  );
  assert.ok(
    content.includes("onOpenDonate"),
    "Header.tsx must have Donate button triggering onOpenDonate"
  );
});

test("Header component should be English-only without language toggle buttons or Tamil logo", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  // Verify EN and தமிழ் toggle buttons are removed
  assert.equal(
    content.includes(">தமிழ்<"),
    false,
    "Header.tsx should not contain Tamil toggle button"
  );
  assert.equal(
    content.includes(">EN<"),
    false,
    "Header.tsx should not contain EN toggle button"
  );
  assert.equal(
    content.includes("Final Cheral logo transparent.png"),
    false,
    "Header.tsx should not contain Tamil logo"
  );
});


