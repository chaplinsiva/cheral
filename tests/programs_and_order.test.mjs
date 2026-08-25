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

test("page.tsx must have correct order: InitiativesSection -> ObjectivesSection -> CoreValuesSection", () => {
  const pagePath = path.resolve("src/app/page.tsx");
  const content = fs.readFileSync(pagePath, "utf-8");

  const initiativesIdx = content.indexOf("<InitiativesSection");
  const objectivesIdx = content.indexOf("<ObjectivesSection");
  const coreValuesIdx = content.indexOf("<CoreValuesSection");

  assert.ok(initiativesIdx !== -1, "InitiativesSection must be imported and rendered");
  assert.ok(objectivesIdx !== -1, "ObjectivesSection must be imported and rendered");
  assert.ok(coreValuesIdx !== -1, "CoreValuesSection must be imported and rendered");

  assert.ok(initiativesIdx < objectivesIdx, "ObjectivesSection must be placed after InitiativesSection");
  assert.ok(objectivesIdx < coreValuesIdx, "CoreValuesSection must be placed after ObjectivesSection");
  assert.equal(content.includes("<ProgramsSection"), false, "ProgramsSection must be removed from page.tsx");
});

test("Header.tsx navigation should not contain #programs", () => {
  const headerPath = path.resolve("src/components/Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  assert.equal(content.includes('href="#programs"'), false, "Header should not have #programs link");
});
