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

test("Header component should contain Join Cheral dropdown with volunteer form and fund a project links", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  assert.ok(
    content.includes("Join Cheral"),
    "Header.tsx must contain Join Cheral"
  );
  assert.ok(
    content.includes("Become a volunteer"),
    "Header.tsx must contain Become a volunteer option"
  );
  assert.ok(
    content.includes("https://forms.gle/ktUF1JXeGNbfM2AAA"),
    "Header.tsx must link to Google forms volunteering link"
  );
  assert.ok(
    content.includes('href="/fund-a-project"'),
    "Header.tsx must link to /fund-a-project"
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

test("fund-a-project page should exist and include all requested support and contact details", () => {
  const fundPath = path.resolve("src/app/fund-a-project/page.tsx");
  assert.ok(fs.existsSync(fundPath), "Fund a project page must exist");
  const content = fs.readFileSync(fundPath, "utf-8");

  assert.ok(
    content.includes("CHERAL needs your support"),
    "Page must include 'CHERAL needs your support'"
  );
  assert.ok(
    content.includes("Your support helps CHERAL carry out its work in heritage conservation"),
    "Page must include work description"
  );
  assert.ok(
    content.includes("organise heritage and nature walks"),
    "Page must include contributions description"
  );
  assert.ok(
    content.includes("contribute to a specific project, or collaborate with us"),
    "Page must include contact callout"
  );
  assert.ok(
    content.includes("cheralBankDetails.email") || content.includes("cheraltrust@gmail.com"),
    "Page must include official contact email"
  );
  assert.ok(
    content.includes("cheralBankDetails.cell") || content.includes("95976 71962"),
    "Page must include official contact phone"
  );
  assert.ok(
    content.includes("cheraltrust.blogspot.com"),
    "Page must include website/blog link"
  );
});



