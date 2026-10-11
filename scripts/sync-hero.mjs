// agent-notes: { ctx: "Sync hero_slides table in Supabase with exact authentic images from cheralData", deps: [".env.local"], state: active, last: "antigravity@2026-10-11" }

import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";
import * as fs from "fs";
import * as path from "path";

globalThis.WebSocket = WebSocket;

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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const authenticHeroSlides = [
  {
    title: "Nature & Biodiversity Walks",
    subtitle: "Guided nature trails connecting people with local ecosystems, birdlife, and flora",
    image_url: "/images/nature_biodiversity_walk.jpg",
    display_order: 1,
    active: true,
  },
  {
    title: "Bird Watching",
    subtitle: "Guided birdwatching walks documenting avian richness and fostering biodiversity awareness",
    image_url: "/images/bird_watching_event.jpg",
    display_order: 2,
    active: true,
  },
  {
    title: "Student Education Programs",
    subtitle: "Interactive workshops, field visits, and hands-on learning experiences for students",
    image_url: "/images/pdf/cheral_pdf_image_14.jpg",
    display_order: 3,
    active: true,
  },
  {
    title: "College & Institutional Collaborations",
    subtitle: "Joint field research, heritage expeditions, environmental camps with colleges and NCC",
    image_url: "/images/college_collaboration.jpg",
    display_order: 4,
    active: true,
  },
  {
    title: "Tree Plantation",
    subtitle: "Native tree plantation initiatives to restore green cover and strengthen local ecosystems",
    image_url: "/images/tree_plantation_event.jpg",
    display_order: 5,
    active: true,
  },
  {
    title: "Heritage & Cultural Walks",
    subtitle: "Guided heritage walks across ancient monuments, archaeological landmarks, and rock inscriptions",
    image_url: "/images/pdf/cheral_pdf_image_7.jpg",
    display_order: 6,
    active: true,
  },
];

async function syncHero() {
  console.log("Replacing hero_slides in Supabase with authentic images...");
  await supabase.from("hero_slides").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("hero_slides").insert(authenticHeroSlides);
  console.log("hero_slides updated successfully!");
}

syncHero();
