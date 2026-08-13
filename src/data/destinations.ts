/* agent-notes: { ctx: "Historical destination data and trust metrics for Cheral", deps: [], state: active, last: "sato@2026-07-26" } */

export interface Destination {
  id: string;
  title: string;
  tamilTitle: string;
  era: "chera" | "chola" | "pandya" | "coastal";
  eraName: string;
  location: string;
  age: string;
  trustScore: number;
  image: string;
  summary: string;
  fullHistory: string;
  highlights: string[];
  itinerary: { day: string; title: string; detail: string }[];
  verifiedGuide: { name: string; title: string; rating: number };
}

export const DESTINATIONS: Destination[] = [
  {
    id: "kodungallur-fort",
    title: "Muziris & Kodungallur Heritage Trail",
    tamilTitle: "முசிறி & கொடுங்கலூர் பாரம்பரிய பாதை",
    era: "chera",
    eraName: "Chera Dynasty",
    location: "Thrissur, Kerala",
    age: "2,200+ Years",
    trustScore: 99.8,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop",
    summary: "Ancient maritime port of the Chera kingdom where Roman, Greek, and Arab trade ships anchored.",
    fullHistory: "Muziris was the crown jewel of ancient maritime spice commerce under the Chera emperors. Roman coins, amphorae, and Tamil-Brahmi inscriptions document over two millennia of cosmopolitan cultural exchange.",
    highlights: ["Ancient Spice Wharf Ruins", "Cheraman Perumal Heritage Site", "Kottappuram Fort Ruins", "Maritime Trust Museum"],
    itinerary: [
      { day: "Day 1", title: "Arrival at Ancient Muziris Wharf", detail: "Guided walk through the excavation trenches and ancient spice storage cellars." },
      { day: "Day 2", title: "Chera Dynasty Palace Ruins", detail: "Examine preserved stone pillar inscriptions and 1st-century Roman coin hoards." },
      { day: "Day 3", title: "Coastal Lagoon Boat Exploration", detail: "Sailing along the Periyar river mouth tracking ancient sea lanes." }
    ],
    verifiedGuide: { name: "Dr. K. Ramanathan", title: "Chera Epigraphy Specialist", rating: 4.98 }
  },
  {
    id: "thanjavur-great-temple",
    title: "Brihadisvara Great Living Chola Temple",
    tamilTitle: "தஞ்சாவூர் பெருவுடையார் கோவில்",
    era: "chola",
    eraName: "Chola Dynasty",
    location: "Thanjavur, Tamil Nadu",
    age: "1,016 Years",
    trustScore: 99.9,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop",
    summary: "Architectural masterpiece built by Emperor Raja Raja Chola I with a single 80-tonne granite capstone.",
    fullHistory: "Completed in 1010 CE, Brihadisvara stands as a monument to engineering genius. Built entirely of interlocking granite without mortar, its 216-foot vimana tower dominates the Cauvery river valley.",
    highlights: ["216ft Interlocking Granite Tower", "Ancient Bronze Casting Galleries", "Fresco Paintings Corridor", "Chola Royal Inscriptions"],
    itinerary: [
      { day: "Day 1", title: "Sunrise at the Great Vimana", detail: "Architectural walkthrough detailing shadowless tower geometry and acoustics." },
      { day: "Day 2", title: "Chola Bronzes & Royal Vaults", detail: "Exclusive access to authentic 11th-century lost-wax bronze sculptures." },
      { day: "Day 3", title: "Cauvery Delta Irrigation Tour", detail: "Visit the Grand Anicut (Kallanai), the world's oldest functional water-regulator." }
    ],
    verifiedGuide: { name: "Meenakshi Sundaram", title: "UNESCO Heritage Fellow", rating: 4.99 }
  },
  {
    id: "madurai-nayakar-palace",
    title: "Madurai Royal Heritage & Thirumalai Palace",
    tamilTitle: "மதுரை திருமலை நாயக்கர் அரண்மனை",
    era: "pandya",
    eraName: "Pandya Kingdom",
    location: "Madurai, Tamil Nadu",
    age: "2,500+ Years",
    trustScore: 99.4,
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&auto=format&fit=crop",
    summary: "The heart of Sangam Tamil literature, ancient courtly halls, and soaring gopuram architecture.",
    fullHistory: "Madurai is one of the world's oldest continuously inhabited cities. Famed for hosting the Third Tamil Sangam, it served as the political seat of the Pandya kings whose pearl trade reached imperial Rome.",
    highlights: ["Giant Stucco Pillars Court", "Sangam Tamil Academy Memorial", "Celestial Pavilion Courtyard", "Vigorous Night Ceremony"],
    itinerary: [
      { day: "Day 1", title: "Sangam Literary Heritage Walk", detail: "Explore ancient stone inscriptions along the Vaigai riverbank." },
      { day: "Day 2", title: "Thirumalai Palace Architectural Tour", detail: "Inspect Italian-influenced stucco arches and royal sound chambers." }
    ],
    verifiedGuide: { name: "Anand Raj Pandian", title: "Pandya Dynasty Historian", rating: 4.96 }
  },
  {
    id: "bekal-coastal-fortress",
    title: "Bekal Coastal Sea Citadel",
    tamilTitle: "பேக்கல் கடற்கரை கோட்டை",
    era: "coastal",
    eraName: "Coastal Forts & Ports",
    location: "Kasaragod, Kerala",
    age: "375 Years",
    trustScore: 99.1,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop",
    summary: "Majestic keyhole-shaped sea fort rising above Arabian sea waves with observation towers.",
    fullHistory: "Built by Shivappa Nayaka of Keladi in 1650 CE, Bekal Fort guarded the spice routes of northern Malabar. Its seaside bastions feature brass cannon ports overlooking 360-degree ocean views.",
    highlights: ["Keyhole Ocean Bastion", "Underground Ammunition Tunnels", "Observation Citadel Tower", "Sunset Arabian Sea Wall"],
    itinerary: [
      { day: "Day 1", title: "Sea Fortress Defense Exploration", detail: "Walk the outer sea ramparts and explore gunpowder storage vaults." },
      { day: "Day 2", title: "Malabar Spice Route Maritime Study", detail: "Examine maritime navigational maps and coastal watchposts." }
    ],
    verifiedGuide: { name: "Captain V. Suresh", title: "Maritime Defense Specialist", rating: 4.95 }
  },
  {
    id: "gangaikonda-cholapuram",
    title: "Gangaikonda Cholapuram Royal Capital",
    tamilTitle: "கங்கை கொண்ட சோழபுரம்",
    era: "chola",
    eraName: "Chola Dynasty",
    location: "Ariyalur, Tamil Nadu",
    age: "990 Years",
    trustScore: 99.7,
    image: "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?w=800&auto=format&fit=crop",
    summary: "The grand capital founded by Emperor Rajendra Chola I after his victorious march to the Ganges.",
    fullHistory: "Established in 1025 CE by Rajendra Chola I to commemorate his Northern military campaign, this sanctuary features graceful stone carvers' art and the vast Cholagangam artificial sea lake.",
    highlights: ["Swaying Curves Granite Vimana", "Dancing Nataraja Relief Sculptures", "Cholagangam Imperial Reservoir", "Royal Victory Inscriptions"],
    itinerary: [
      { day: "Day 1", title: "The Imperial Victory March Trail", detail: "Trace Rajendra Chola's northern expedition inscriptions and royal edicts." },
      { day: "Day 2", title: "Stone Carving & Architectural Vault", detail: "Study fine-detailed sandstone reliefs and royal lion wells." }
    ],
    verifiedGuide: { name: "S. Janaki Devi", title: "Chola Royal Epigrapher", rating: 4.97 }
  },
  {
    id: "padmanabhapuram-palace",
    title: "Padmanabhapuram Wooden Royal Palace",
    tamilTitle: "பத்மநாபபுரம் மர அரண்மனை",
    era: "chera",
    eraName: "Chera Dynasty",
    location: "Kanyakumari / Travancore",
    age: "420 Years",
    trustScore: 99.6,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&auto=format&fit=crop",
    summary: "Asia's largest wooden palace featuring mica windows, polished black egg-white floors, and secret escape tunnels.",
    fullHistory: "Constructed around 1601 CE by the Venad Chera rulers of Travancore, Padmanabhapuram showcases breathtaking wooden joinery without nails, rosewood ceilings, and herbal mural frescoes.",
    highlights: ["Polished Black Egg-white Floor", "Rosewood Carved Ceilings", "Herbal Mural Painting Gallery", "Secret King's Escape Tunnel"],
    itinerary: [
      { day: "Day 1", title: "Wooden Craftsmanship & Architecture", detail: "Examine 400-year-old mahogany carvings and air-cooling window lattices." },
      { day: "Day 2", title: "The Royal Council & Treasure Chamber", detail: "Private tour of the council hall and underground escape passages." }
    ],
    verifiedGuide: { name: "T. Venkitaraman", title: "Travancore Heritage Curator", rating: 4.99 }
  }
];
