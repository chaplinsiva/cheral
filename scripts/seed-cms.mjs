// agent-notes: { ctx: "Seed initial blog posts, hero slides, 10 core values, and initiatives", deps: [".env.local"], state: active, last: "antigravity@2026-10-11" }

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

async function seed() {
  console.log("--- SEEDING CMS DATA ---");

  // 1. Initial Blog Posts
  const initialPosts = [
    {
      title: "Preserving Madurai's Sacred Groves and Endemic Flora",
      slug: "preserving-madurais-sacred-groves",
      excerpt: "Exploring the historical significance and ecological biodiversity of temple groves and indigenous tree sanctuaries across Tamil Nadu.",
      content: `## The Ecological Heritage of Madurai

Madurai is not only one of the oldest continuously inhabited cities in the world, renowned for its Dravidian architecture and literary Sangam tradition; it is also home to a delicate micro-ecosystem of sacred groves and ancient riparian reserves along the Vaigai river basin.

Sacred groves (Kovil Kaadugal) have served as traditional community-conserved reservoirs of biodiversity for millennia. Within these undisturbed patches of indigenous woodland, native species such as *Azadirachta indica* (Neem), *Ficus benghalensis* (Banyan), *Pongamia pinnata*, and indigenous medicinal herbs flourish without anthropogenic disturbance.

### Why Sacred Groves Matter
1. **Soil & Ground Water Retention**: The thick canopy and dense root system prevent topsoil erosion and facilitate aquifer recharge.
2. **Sanctuary for Avian and Pollinator Species**: Vital refuge for local bird populations, nocturnal owls, and native pollinators.
3. **Living Botanical Archives**: Invaluable genetic reserves of indigenous medicinal flora documented in ancient Sangam Tamil poetry.

CHERAL Trust actively coordinates student nature walks and scientific biodiversity surveys across these sites to catalog flora, safeguard natural water bodies, and inspire young generations toward active ecological stewardship.`,
      cover_image: "/images/pdf/image-004.jpg",
      category: "Ecological Research",
      author: "Cheral Trust Research Team",
      published: true,
    },
    {
      title: "The Sangam River Basin: Bridging Heritage and Water Justice",
      slug: "sangam-river-basin-heritage-water-justice",
      excerpt: "How traditional tank irrigation and Vaigai water systems reflect historical consciousness and ecological justice.",
      content: `## Water Systems in Early Tamil Civilization

In ancient Tamil society, water management was considered the highest civic duty. Literary works from the Sangam era, such as *Purananuru* and *Paripadal*, venerate the seasonal flow of the Vaigai river and the ingenious cascade tank systems (Eri systems) engineered to catch every drop of monsoon rainfall.

### Ecological Justice and Community Participation
Modern climate challenges necessitate returning to community-centric water stewardship. CHERAL Trust combines historical awareness with grassroots participatory programs to:
- Monitor and document local freshwater wetlands and bird nesting habitats.
- Conduct public awareness forums on river restoration and anti-plastic watershed protection.
- Mobilize youth volunteers in clearing non-native invasive species like *Prosopis juliflora* and replanting native riparian trees.

Join us on our regular nature and heritage walks to experience these centuries-old channels firsthand.`,
      cover_image: "/images/pdf/image-008.jpg",
      category: "Heritage & Literature",
      author: "Cheral Editorial Board",
      published: true,
    },
  ];

  const { data: existingPosts } = await supabase.from("posts").select("id").limit(1);
  if (!existingPosts || existingPosts.length === 0) {
    console.log("Seeding blog posts...");
    await supabase.from("posts").insert(initialPosts);
  }

  // 2. Initial Hero Slides
  const initialHeroSlides = [
    {
      title: "Discover the Sacred Forests & Living Heritage of Tamil Nadu",
      subtitle: "Centre for Heritage and Ecological Research through Arts and Literature",
      image_url: "/images/pdf/image-004.jpg",
      display_order: 1,
      active: true,
    },
    {
      title: "Conserving Natural Ecosystems Through Community Action",
      subtitle: "Bridging scientific excellence with democratic citizenship and youth education",
      image_url: "/images/pdf/image-008.jpg",
      display_order: 2,
      active: true,
    },
    {
      title: "Reconnecting Communities with Indigenous Nature & Heritage Walks",
      subtitle: "Authentic biodiversity research, native tree plantations, and cultural preservation",
      image_url: "/images/pdf/image-012.jpg",
      display_order: 3,
      active: true,
    },
  ];

  const { data: existingSlides } = await supabase.from("hero_slides").select("id").limit(1);
  if (!existingSlides || existingSlides.length === 0) {
    console.log("Seeding hero slides...");
    await supabase.from("hero_slides").insert(initialHeroSlides);
  }

  // 3. 10 Core Values
  const initialValues = [
    { title: "Integrity", description: "Uncompromising ethical standards and transparency in all ecological research and trust initiatives.", display_order: 1 },
    { title: "Ecological Justice", description: "Advocating equitable access to clean natural resources and environmental protection for all communities.", display_order: 2 },
    { title: "Sustainability", description: "Promoting conservation models that endure across generations without depleting natural ecosystems.", display_order: 3 },
    { title: "Historical Consciousness", description: "Honoring ancient cultural heritage, indigenous wisdom, and archaeological literary traditions.", display_order: 4 },
    { title: "Community Participation", description: "Empowering local citizens, students, and elders to co-lead conservation drives.", display_order: 5 },
    { title: "Climate Responsibility", description: "Proactive mitigation through native afforestation, carbon awareness, and bio-diversity defense.", display_order: 6 },
    { title: "Scientific Excellence", description: "Rigorous scientific taxonomy, biodiversity mapping, and empirical ecological documentation.", display_order: 7 },
    { title: "Inclusiveness", description: "Ensuring every voice from marginalized rural and urban sectors participates in environmental decision-making.", display_order: 8 },
    { title: "Collaboration", description: "Partnering with educational institutions, grassroots researchers, and conservation trusts.", display_order: 9 },
    { title: "Democratic Citizenship", description: "Fostering civic engagement through environmental literacy and responsible community leadership.", display_order: 10 },
  ];

  const { data: existingValues } = await supabase.from("core_values").select("id").limit(1);
  if (!existingValues || existingValues.length === 0) {
    console.log("Seeding 10 core values...");
    await supabase.from("core_values").insert(initialValues);
  }

  // 4. 4 Core Initiatives
  const initialInitiatives = [
    {
      title: "Public Awareness Programs",
      subtitle: "Community Outreach & Environmental Literacy",
      description: "Organizing seminars, eco-literature festivals, documentary screenings, and interactive community forums to spark widespread environmental and cultural consciousness.",
      image_url: "/images/pdf/image-004.jpg",
      display_order: 1,
    },
    {
      title: "Student Education & Nature Clubs",
      subtitle: "Empowering Next-Generation Guardians",
      description: "Equipping schools and colleges with hands-on biodiversity field training, birdwatching workshops, and eco-art competitions that nurture curious, compassionate minds.",
      image_url: "/images/pdf/image-008.jpg",
      display_order: 2,
    },
    {
      title: "Nature & Heritage Walks",
      subtitle: "Guided Ecological & Historical Expeditions",
      description: "Curated walking trails exploring historical monuments, sacred groves, ancient caves, and riverbanks with expert naturalists and historians.",
      image_url: "/images/pdf/image-012.jpg",
      display_order: 3,
    },
    {
      title: "Native Tree Plantation & Afforestation",
      subtitle: "Restoring Endemic Flora & Urban Sanctuaries",
      description: "Planting endemic, climate-resilient native saplings in degraded landscapes and community campuses, supported by scientific post-planting care.",
      image_url: "/images/pdf/image-016.jpg",
      display_order: 4,
    },
  ];

  const { data: existingInits } = await supabase.from("initiatives").select("id").limit(1);
  if (!existingInits || existingInits.length === 0) {
    console.log("Seeding 4 core initiatives...");
    await supabase.from("initiatives").insert(initialInitiatives);
  }

  console.log("CMS Seeding Completed Successfully!");
}

seed();
