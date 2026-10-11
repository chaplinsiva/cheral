// agent-notes: { ctx: "Seed public.gallery table with authentic gallery items", deps: [".env.local"], state: active, last: "antigravity@2026-10-11" }

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

const initialGallery = [
  {
    title: "Guided Nature & Biodiversity Exploration",
    category: "nature",
    category_label: "Nature & Biodiversity",
    image_url: "/images/nature_biodiversity_walk.jpg",
    location: "Madurai River Basin & Forests",
    description: "Connecting citizens and students with local flora, riparian habitats, and native ecosystems through immersive field exploration.",
    display_order: 1,
  },
  {
    title: "Citizen Science Bird Watching Expedition",
    category: "nature",
    category_label: "Nature & Biodiversity",
    image_url: "/images/bird_watching_event.jpg",
    location: "Wetlands of Southern Tamil Nadu",
    description: "Documenting avian richness and wetland biodiversity with young nature enthusiasts, students, and ornithology volunteers.",
    display_order: 2,
  },
  {
    title: "Indigenous Tree Plantation & Green Corridor",
    category: "plantation",
    category_label: "Tree Plantation",
    image_url: "/images/tree_plantation_event.jpg",
    location: "Madurai & Surrounding Villages",
    description: "Community afforestation drives planting native drought-resilient species like Marudham, Neem, and Vaagai to restore local microclimates.",
    display_order: 3,
  },
  {
    title: "Youth & Academic Institutional Partnerships",
    category: "collaborations",
    category_label: "Collaborations",
    image_url: "/images/college_collaboration.jpg",
    location: "University Campuses & Study Centers",
    description: "Collaborating with college students, NCC cadets, and youth leaders in ecological research and heritage protection drives.",
    display_order: 4,
  },
  {
    title: "Ancient Inscriptions & Rock Caves Exploration",
    category: "heritage",
    category_label: "Heritage & Epigraphy",
    image_url: "/images/pdf/cheral_pdf_image_7.jpg",
    location: "Samanarmalai & Ancient Hills, Madurai",
    description: "Guided on-site study of Tamil-Brahmi rock inscriptions and ancient heritage sites, instilling historical consciousness.",
    display_order: 5,
  },
  {
    title: "Student Eco-Literacy & Science Camps",
    category: "education",
    category_label: "Student Education",
    image_url: "/images/pdf/cheral_pdf_image_14.jpg",
    location: "Rural & Urban Schools in Tamil Nadu",
    description: "Hands-on workshops nurturing scientific curiosity, microscope observations, and nature journaling among schoolchildren.",
    display_order: 6,
  },
  {
    title: "Tinai: Literature, Arts & Ecology Dialogue",
    category: "heritage",
    category_label: "Heritage & Epigraphy",
    image_url: "/images/pdf/cheral_pdf_image_12.jpg",
    location: "Public Auditoriums, Madurai",
    description: "Linking ancient Sangam literature’s landscape philosophy with contemporary climate action and cultural arts.",
    display_order: 7,
  },
];

async function seedGallery() {
  console.log("Seeding public.gallery in Supabase...");
  const { data: existing } = await supabase.from("gallery").select("id").limit(1);
  if (!existing || existing.length === 0) {
    await supabase.from("gallery").insert(initialGallery);
    console.log("Gallery seeded successfully!");
  } else {
    console.log("Gallery already seeded.");
  }
}

seedGallery();
