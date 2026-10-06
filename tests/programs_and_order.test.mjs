/* agent-notes: { ctx: "Unit test verifying Bird Watching card in initiatives and page section order", deps: [src/app/page.tsx, src/data/cheralData.ts, src/components/Header.tsx], state: active, last: "tara@2026-08-25" } */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("cheralData.ts should contain bird watching initiative", () => {
  const dataPath = path.resolve("src/data/cheralData.ts");
  const content = fs.readFileSync(dataPath, "utf-8");

  assert.match(content, /id:\s*"bird-watching"/, "cheralData must have bird-watching initiative");
  assert.match(content, /bird_watching_event\.jpg/, "bird-watching initiative must reference bird_watching_event.jpg");
});

test("page.tsx must have correct order: InitiativesSection -> ObjectivesSection (unified with Core Values)", () => {
  const pagePath = path.resolve("src/app/page.tsx");
  const pageContent = fs.readFileSync(pagePath, "utf-8");

  const initiativesIdx = pageContent.indexOf("<InitiativesSection");
  const objectivesIdx = pageContent.indexOf("<ObjectivesSection");

  assert.ok(initiativesIdx !== -1, "InitiativesSection must be imported and rendered");
  assert.ok(objectivesIdx !== -1, "ObjectivesSection must be imported and rendered");
  assert.ok(initiativesIdx < objectivesIdx, "ObjectivesSection must be placed after InitiativesSection");

  // Verify that ObjectivesSection contains both cheralObjectives and cheralCoreValues
  const objPath = path.resolve("src/components/ObjectivesSection.tsx");
  const objContent = fs.readFileSync(objPath, "utf-8");
  assert.ok(objContent.includes("cheralObjectives"), "ObjectivesSection must import and render cheralObjectives");
  assert.ok(objContent.includes("cheralCoreValues"), "ObjectivesSection must import and render cheralCoreValues");
  assert.equal(pageContent.includes("<ProgramsSection"), false, "ProgramsSection must be removed from page.tsx");
});

test("Header.tsx navigation should not contain #programs", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  assert.equal(content.includes('href="#programs"'), false, "Header should not have #programs link");
});
