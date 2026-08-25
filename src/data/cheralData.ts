/* agent-notes: { ctx: "Verbatim text extracted from official brochure Cheral (1).pdf with ZERO mock additions", deps: [public/images/pdf], state: active, last: "sato@2026-08-13" } */

export interface Initiative {
  id: string;
  title: { en: string; ta: string };
  category: { en: string; ta: string };
  description: { en: string; ta: string };
  image: string;
  badge: { en: string; ta: string };
}

export interface CoreValue {
  number: number;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
}

export interface BankCredentials {
  organizationName: string;
  accountName: string;
  accountNumber: string;
  customerId: string;
  ifsc: string;
  micr: string;
  bankName: string;
  upiId: string;
  address: string;
  cell: string;
  email: string;
  qrImage: string;
}

export const cheralBankDetails: BankCredentials = {
  organizationName: "CHERAL TRUST",
  accountName: "Cheral Trust",
  accountNumber: "0625073000000866",
  customerId: "A56788044",
  ifsc: "SIBL0000625",
  micr: "625059004",
  bankName: "South Indian Bank",
  upiId: "cheraltrust@sib",
  address: "Cheral Trust, 22, PKP Nagar, Uthangudi, Madurai, TamilNadu - 625207",
  cell: "95976 71962",
  email: "cheraltrust@gmail.com",
  qrImage: "/images/pdf/cheral_pdf_image_1.jpg",
};

export const cheralAboutText = {
  en: {
    organization: "CENTRE FOR HERITAGE AND ECOLOGICAL RESEARCH THROUGH ARTS AND LITERATURE",
    fullName: "CHERAL (Centre for Heritage and Ecological Research through Arts and Literature)",
    tagline: "Connecting People with Nature and Heritage",
    subTagline: "Nurturing a generation with ecological and historical consciousness.",
    summary:
      "CHERAL (Centre for Heritage and Ecological Research through Arts and Literature) is a non-profit organization committed to conserving natural ecosystems, biodiversity, and cultural heritage through research, education, documentation, advocacy, and community participation. The organization integrates sustainable conservation practices with climate action to safeguard ecological and cultural resources for present and future generations.",
    fullDescription:
      "CHERAL advances democratic values, social equality, rational thinking, scientific research, environmental stewardship, and public awareness through evidence-based initiatives that strengthen ecological responsibility and historical consciousness. By fostering collaboration among communities, educational institutions, researchers, and volunteers, CHERAL contributes to the protection, restoration, and sustainable management of nature and heritage.",
    ourWork:
      "Our work brings people closer to nature and history through immersive learning, scientific observation, and cultural exploration. We believe that protecting biodiversity and preserving heritage are shared responsibilities. By connecting communities, students, researchers, and volunteers, we create lasting impact through education, documentation, and conservation.",
    mission:
      "To protect nature and preserve heritage by inspiring communities to conserve our environment and cultural legacy for progressive future generations. Building Climate Resilience through Nature Conservation and Community Action.",
    vision:
      "A future where nature thrives, heritage is preserved, and communities actively protect the environment and cultural legacy for equal and progressive generations to come on a polution free environment.",
    guidedByQuote:
      "We are guided by integrity, sustainability, inclusiveness, historical consciousness, scientific excellence, and collaboration to conserve nature, protect cultural heritage, strengthen climate resilience, and empower communities for a pollution free sustainable future.",
  },
  ta: {
    organization: "கலை மற்றும் இலக்கியம் வழியாக இயற்கை மற்றும் வரலாற்று ஆராய்ச்சி மையம்",
    fullName: "சேரல் (கலை மற்றும் இலக்கியம் வழியாக இயற்கை மற்றும் வரலாற்று ஆராய்ச்சி மையம்)",
    tagline: "மக்களையும் இயற்கையையும் பாரம்பரியத்தையும் இணைத்தல்",
    subTagline: "சுற்றுச்சூழல் மற்றும் வரலாற்று விழிப்புணர்வுடன் கூடிய தலைமுறையை உருவாக்குதல்.",
    summary:
      "சேரல் அமைப்பு என்பது ஆராய்ச்சி, கல்வி, ஆவணப்படுத்தல் மற்றும் சமூக பங்கேற்பு மூலம் இயற்கை சுற்றுச்சூழல், பல்லுயிர்ப் பெருக்கம் மற்றும் பண்பாட்டு பாரம்பரியத்தைப் பாதுகாப்பதில் ஈடுபாடு கொண்ட ஓர் தொண்டு நிறுவனமாகும்.",
    fullDescription:
      "சேரல் ஜனநாயக மதிப்புகள், சமூக சமத்துவம், பகுத்தறிவுச் சிந்தனை, அறிவியல் ஆராய்ச்சி மற்றும் சுற்றுச்சூழல் பொறுப்புணர்வை வளர்க்கிறது.",
    ourWork:
      "இயற்கையையும் வரலாற்றையும் மக்களிடம் கொண்டு சேர்ப்பதே எங்களது பணியாகும்.",
    mission:
      "இயற்கையையும் பாரம்பரியத்தையும் பாதுகாத்து, வருங்கால தலைமுறையினருக்கு நிலையான சூழலை உருவாக்குவது எங்களது லட்சியமாகும்.",
    vision:
      "இயற்கையும் பாரம்பரியமும் செழித்து வளரும், மாசு இல்லாத ஒரு தூய்மையான எதிர்காலத்தை உருவாக்குவதே எங்களது நோக்கம்.",
    guidedByQuote:
      "நேர்மை, நிலைத்தன்மை, சுற்றுச்சூழல் நீதி மற்றும் வரலாற்று விழிப்புணர்வுடன் செயல்படுகிறோம்.",
  },
};

export const cheralObjectives = [
  {
    number: "1",
    title: { en: "Sustainable Future", ta: "நிலையான எதிர்காலம்" },
    description: {
      en: "To create a world where ecological balance and cultural heritage coexist in harmony, ensuring a sustainable future for all.",
      ta: "இயற்கை சமநிலையும் பண்பாட்டு பாரம்பரியமும் இணக்கமாக வாழும் நிலையான உலகை உருவாக்குதல்.",
    },
  },
  {
    number: "2",
    title: { en: "Community Centered Vision", ta: "சமூக மையக் தொலைநோக்கு" },
    description: {
      en: "To build environmentally responsible and culturally aware communities committed to conserving natural ecosystems and heritage sites.",
      ta: "இயற்கை மற்றும் வரலாற்று இடங்களைப் பாதுகாக்கும் சுற்றுச்சூழல் விழிப்புணர்வு கொண்ட சமூகங்களை உருவாக்குதல்.",
    },
  },
  {
    number: "3",
    title: { en: "Global Perspective", ta: "உலகளாவிய பார்வை" },
    description: {
      en: "To be a leading force in the conservation of nature and heritage, inspiring collective action for a resilient and sustainable planet.",
      ta: "இயற்கை மற்றும் பாரம்பரிய பாதுகாப்பில் முன்னணியில் நின்று உலகளாவிய கூட்டு நடவடிக்கையைத் தூண்டுதல்.",
    },
  },
];

export const cheralInitiatives: Initiative[] = [
  {
    id: "heritage-walks",
    title: { en: "Heritage & Cultural Walks", ta: "வரலாற்று & பாரம்பரிய நடைபயணம்" },
    category: { en: "Historical Exploration & Awareness", ta: "வரலாற்று ஆய்வு & விழிப்புணர்வு" },
    description: {
      en: "We organize guided heritage walks across ancient monuments, archaeological landmarks, and rock inscriptions, cultivating deep public awareness and historical consciousness through on-site learning.",
      ta: "பண்டைய வரலாற்றுச் சின்னங்கள், தொல்லியல் சான்றுகள் மற்றும் கல்வெட்டுகளை நேரில் பார்வையிட்டு, பொதுமக்களிடையே வரலாற்று விழிப்புணர்வையும் பண்பாட்டுப் பெருமிதத்தையும் ஏற்படுத்தும் கள நடைபயணங்கள்.",
    },
    image: "/images/pdf/cheral_pdf_image_7.jpg",
    badge: { en: "Guided Heritage Trails", ta: "பாரம்பரிய களப்பயணம்" },
  },
  {
    id: "education",
    title: { en: "Student Education Programs", ta: "மாணவர் கல்வித் திட்டங்கள்" },
    category: { en: "Youth & Scientific Curiosity", ta: "இளைஞர் & அறிவியல் கல்வி" },
    description: {
      en: "We empower students through interactive workshops, field visits, and hands-on learning experiences that nurture scientific curiosity, environmental responsibility, and appreciation for cultural heritage.",
      ta: "மாணவர்களுக்கு களப்பயணங்கள் மற்றும் செயல்முறைப் பயிற்சிகள் மூலம் அறிவியல் ஆர்வத்தையும் பாரம்பரிய உணர்வையும் வளர்த்தல்.",
    },
    image: "/images/pdf/cheral_pdf_image_14.jpg",
    badge: { en: "School & Field Workshops", ta: "பள்ளி பயிலரங்கம்" },
  },
  {
    id: "nature-walks",
    title: { en: "Nature & Biodiversity Walks", ta: "இயற்கை & பல்லுயிர் நடைபயணம்" },
    category: { en: "Ecological Observation", ta: "சுற்றுச்சூழல் கள ஆய்வு" },
    description: {
      en: "We organize guided nature trails that connect people with local ecosystems, birdlife, flora, and biodiversity, fostering environmental stewardship through immersive outdoor observation.",
      ta: "உள்ளூர் சுற்றுச்சூழல் வளம், பல்லுயிர்ப் பெருக்கம் மற்றும் பறவைகளை நேரடியாகக் கண்டு உணரும் வழிநடத்தப்பட்ட இயற்கை நடைபயணங்கள்.",
    },
    image: "/images/nature_biodiversity_walk.jpg",
    badge: { en: "Guided Nature Exploration", ta: "இயற்கை நடைபயணம்" },
  },
  {
    id: "plantation",
    title: { en: "Tree Plantation", ta: "மரங்கள் நடுதல்" },
    category: { en: "Ecological Restoration", ta: "சுற்றுச்சூழல் மீட்பு" },
    description: {
      en: "We promote native tree plantation initiatives to restore green cover, strengthen local ecosystems, and encourage community participation in environmental stewardship.",
      ta: "பழமையான நாட்டு மரக் கன்றுகளை நட்டு, பசுமைப் போர்வையை அதிகரித்து உள்ளூர் சுற்றுச்சூழல் அமைப்பை மீளமைத்தல்.",
    },
    image: "/images/tree_plantation_event.jpg",
    badge: { en: "Ecological Restoration", ta: "சுற்றுச்சூழல் மீட்பு" },
  },
  {
    id: "bird-watching",
    title: { en: "Bird Watching", ta: "பறவைகள் உற்றுநோக்கல்" },
    category: { en: "Citizen Science & Biodiversity", ta: "சமூக சூழலியல் ஆய்வு" },
    description: {
      en: "We conduct guided birdwatching walks with students, researchers, and nature enthusiasts to document avian richness and foster biodiversity awareness.",
      ta: "பறவைகளின் வாழ்விடங்களைப் பாதுகாக்கவும், பறவை இனங்களை ஆவணப்படுத்தவும் பொதுமக்களையும் மாணவர்களையும் இணைத்து பறவைகள் உற்றுநோக்கல் நிகழ்வுகளை நடத்துதல்.",
    },
    image: "/images/bird_watching_event.jpg",
    badge: { en: "Citizen Science & Birding", ta: "பறவைகள் நோக்குதல்" },
  },
  {
    id: "college-collaborations",
    title: { en: "College & Institutional Collaborations", ta: "கல்லூரி & கல்வி நிறுவனக் கூட்டாண்மை" },
    category: { en: "Academic & Youth Outreach", ta: "கல்வி & இளைஞர் கூட்டாண்மை" },
    description: {
      en: "We partner with colleges, universities, NCC cadets, and academic institutions to conduct joint field research, heritage expeditions, environmental camps, and youth leadership programs.",
      ta: "கல்லூரிகள், பல்கலைக்கழகங்கள் மற்றும் என்.சி.சி (NCC) மாணவர்களுடன் இணைந்து கள ஆய்வுகள், வரலாற்றுப் பயணங்கள், சுற்றுச்சூழல் முகாம்கள் மற்றும் விழிப்புணர்வுப் பணிகளை முன்னெடுத்தல்.",
    },
    image: "/images/college_collaboration.jpg",
    badge: { en: "Academic Collaboration", ta: "கல்லூரி கூட்டாண்மை" },
  },
];

export interface HeroSlide {
  image: string;
  title: { en: string; ta: string };
  subtitle: { en: string; ta: string };
  tag: { en: string; ta: string };
}

export const cheralHeroSlides: HeroSlide[] = cheralInitiatives.map((item) => ({
  image: item.image,
  title: item.title,
  subtitle: item.description,
  tag: item.badge,
}));

export const cheralCoreValues: CoreValue[] = [
  {
    number: 1,
    title: { en: "Integrity", ta: "நேர்மை" },
    description: {
      en: "Upholding honesty, transparency, and accountability in all our actions.",
      ta: "எங்களது அனைத்து செயல்பாடுகளிலும் நேர்மை மற்றும் வெளிப்படைத்தன்மையைப் பின்பற்றுதல்.",
    },
  },
  {
    number: 2,
    title: { en: "Ecological Justice", ta: "சுற்றுச்சூழல் நீதி" },
    description: {
      en: "We believe that every person and every living species has the right to a healthy, balanced environment, and we are committed to promoting the fair and equitable protection, restoration, and sustainable use of natural resources for present and future generations.",
      ta: "ஒவ்வொரு மனிதனுக்கும் மற்றும் ஒவ்வொரு உயிரினத்திற்கும் ஆரோக்கியமான, சீரான சூழலுக்கான உரிமை உண்டு என்று நாங்கள் நம்புகிறோம்.",
    },
  },
  {
    number: 3,
    title: { en: "Sustainability", ta: "நிலையான வளர்ச்சி" },
    description: {
      en: "Encouraging solutions that balance environmental, social, and economic well being.",
      ta: "சுற்றுச்சூழல் மற்றும் சமூக நல்வாழ்வை சமநிலைப்படுத்தும் தீர்வுகளை ஊக்குவித்தல்.",
    },
  },
  {
    number: 4,
    title: { en: "Historical Consciousness", ta: "வரலாற்று விழிப்புணர்வு" },
    description: {
      en: "We promote historical consciousness by encouraging society to understand, value, and preserve its shared heritage resource and learn from the past.",
      ta: "சமூகம் தனது பகிர்ந்தளிக்கப்பட்ட வரலாற்றுச் செல்வத்தைப் புரிந்துகொள்ளவும் பாதுகாக்கவும் ஊக்குவித்தல்.",
    },
  },
  {
    number: 5,
    title: { en: "Community Participation", ta: "சமூக பங்கேற்பு" },
    description: {
      en: "Empowering local communities as active partners in conservation and climate action.",
      ta: "உள்ளூர் மக்களை இயற்கை பாதுகாப்பில் முதன்மைப் பங்காளிகளாக மாற்றுதல்.",
    },
  },
  {
    number: 6,
    title: { en: "Climate Responsibility", ta: "காலநிலை பொறுப்புணர்வு" },
    description: {
      en: "Promoting climate resilience, carbon reduction, and nature-based solutions to address climate change.",
      ta: "காலநிலை மாற்றத்தைச் சமாளிக்க இயற்கை சார்ந்த தீர்வுகளையும் கார்பன் குறைப்பையும் ஊக்குவித்தல்.",
    },
  },
  {
    number: 7,
    title: { en: "Scientific Excellence", ta: "அறிவியல் சிறப்பம்சம்" },
    description: {
      en: "Basing our initiatives on research, innovation, and evidence-based conservation practices.",
      ta: "ஆராய்ச்சி மற்றும் அறிவியல் ஆதாரங்களின் அடிப்படையில் செயல்பாடுகளை அமைத்தல்.",
    },
  },
  {
    number: 8,
    title: { en: "Inclusiveness", ta: "அனைவரையும் உள்ளடக்குதல்" },
    description: {
      en: "Valuing diversity and ensuring equal opportunities for participation regardless of age, gender, or background.",
      ta: "வயது, பாலினம் அல்லது பின்னணி பாகுபாடின்றி அனைவரையும் பங்கேற்கச் செய்தல்.",
    },
  },
  {
    number: 9,
    title: { en: "Collaboration", ta: "கூட்டு முயற்சி" },
    description: {
      en: "Building strong partnerships with governments, academic institutions, civil society, and local communities.",
      ta: "அரசு, கல்வி நிறுவனங்கள் மற்றும் அமைப்புகளுடன் இணைந்து செயல்படுதல்.",
    },
  },
  {
    number: 10,
    title: { en: "Democratic Citizenship", ta: "ஜனநாயகக் குடியுரிமை" },
    description: {
      en: "We are committed to nurturing the next generation with democratic values, equality, rational thinking, scientific temper, and respect for human rights, empowering them to become informed, responsible, and compassionate citizens.",
      ta: "அடுத்த தலைமுறையை ஜனநாயக மதிப்புகள், பகுத்தறிவு மற்றும் மனித உரிமைகளுடன் கூடிய குடிமக்களாக உருவாக்குதல்.",
    },
  },
];

export interface ProgramEvent {
  id: string;
  title: { en: string; ta: string };
  category: { en: string; ta: string };
  tag: { en: string; ta: string };
  location: { en: string; ta: string };
  description: { en: string; ta: string };
  image: string;
  highlights: { en: string[]; ta: string[] };
}

export const cheralPrograms: ProgramEvent[] = [
  {
    id: "vaigai-heritage-walk",
    title: {
      en: "Vaigai Heritage & Biodiversity Trail",
      ta: "வைகை பாரம்பரியம் & பல்லுயிர் நடைபயணம்",
    },
    category: {
      en: "Field Exploration & Heritage Walk",
      ta: "கள ஆய்வு & பாரம்பரிய நடைபயணம்",
    },
    tag: { en: "Guided Field Walk", ta: "வழிகாட்டப்பட்ட நடைபயணம்" },
    location: { en: "Vaigai River Basin, Madurai", ta: "வைகை ஆற்றுப் படுகை, மதுரை" },
    description: {
      en: "Guided on-site walk connecting citizens with the riparian flora, wetland birdlife, and ancient Sangam civilizational monuments along the historic Vaigai river.",
      ta: "வரலாற்றுச் சிறப்புமிக்க வைகை ஆற்றின் கரையோர தாவரங்கள், நீர்ப்பறவைகள் மற்றும் சங்க கால பாரம்பரிய சின்னங்களை நேரில் கண்டு உணரும் கள நடைபயணம்.",
    },
    image: "/images/nature_biodiversity_walk.jpg",
    highlights: {
      en: [
        "Ecological observation of local birdlife & flora",
        "Historical consciousness of ancient water management",
        "Interactive Q&A with historians & ecologists",
      ],
      ta: [
        "உள்ளூர் பறவைகள் மற்றும் தாவரங்களின் நேரடி உற்றுநோக்கல்",
        "பண்டைய நீர் மேலாண்மை பற்றிய வரலாற்று விழிப்புணர்வு",
        "வரலாற்றாசிரியர்கள் மற்றும் சூழலியலாளர்களுடன் கலந்துரையாடல்",
      ],
    },
  },
  {
    id: "student-eco-workshops",
    title: {
      en: "Student Eco-Literacy & Field Science Camps",
      ta: "மாணவர் சூழலியல் & கள அறிவியல் பயிலரங்கம்",
    },
    category: {
      en: "Youth Education & Science",
      ta: "மாணவர் கல்வி & அறிவியல் விழிப்புணர்வு",
    },
    tag: { en: "Youth Workshop", ta: "இளைஞர் பயிலரங்கம்" },
    location: { en: "Schools & Field Study Centers, TN", ta: "பள்ளிகள் மற்றும் கள ஆய்வு மையங்கள்" },
    description: {
      en: "Hands-on workshops nurturing scientific curiosity, nature journaling, biodiversity mapping, and environmental stewardship among school and college students.",
      ta: "பள்ளி மற்றும் கல்லூரி மாணவர்களிடம் அறிவியல் ஆர்வம், இயற்கை ஆவணப்படுத்தல் மற்றும் சுற்றுச்சூழல் பொறுப்புணர்வை வளர்க்கும் செயல்முறைப் பயிலரங்குகள்.",
    },
    image: "/images/pdf/cheral_pdf_image_14.jpg",
    highlights: {
      en: [
        "Nature journaling & herbarium preparation",
        "Hands-on microscopic & field study tools",
        "Certificate of ecological citizenship",
      ],
      ta: [
        "இயற்கைக் குறிப்பேடு மற்றும் தாவர ஆவணப்படுத்தல்",
        "நேரடி கள உபகரணப் பயிற்சி",
        "சுற்றுச்சூழல் விழிப்புணர்வுச் சான்றிதழ்",
      ],
    },
  },
  {
    id: "native-tree-drives",
    title: {
      en: "Native Tree Afforestation & Green Corridors",
      ta: "நாட்டு மரங்கள் நடுதல் & பசுமைப் போர்வை மீட்பு",
    },
    category: {
      en: "Ecological Restoration",
      ta: "சுற்றுச்சூழல் மீளமைப்பு",
    },
    tag: { en: "Conservation Action", ta: "பாதுகாப்பு நடவடிக்கை" },
    location: { en: "Madurai & Surrounding Districts", ta: "மதுரை மற்றும் சுற்றியுள்ள பகுதிகள்" },
    description: {
      en: "Community-driven planting of drought-resilient indigenous trees (Marudham, Neem, Punnai, Vaagai) to restore local microclimates and enhance biodiversity.",
      ta: "வறட்சியைத் தாங்கும் பூர்வீக நாட்டு மரங்களை நட்டு வளர்த்து, உள்ளூர் தட்பவெப்ப நிலையை சமநிலைப்படுத்தி பல்லுயிர்ப் பெருக்கத்தை மீட்டெடுக்கும் திட்டம்.",
    },
    image: "/images/tree_plantation_event.jpg",
    highlights: {
      en: [
        "100% indigenous tree saplings",
        "Community & youth participation",
        "Post-plantation care & geo-tagging",
      ],
      ta: [
        "100% பூர்வீக நாட்டு மரக் கன்றுகள்",
        "பொதுமக்கள் மற்றும் இளைஞர்களின் பங்களிப்பு",
        "நடவுக்குப் பின் தொடர் பராமரிப்பு மற்றும் கண்காணிப்பு",
      ],
    },
  },
  {
    id: "heritage-epigraphy-expeditions",
    title: {
      en: "Jain Caves & Epigraphy Field Explorations",
      ta: "சமணர் படுகைகள் & கல்வெட்டு கள ஆய்வுகள்",
    },
    category: {
      en: "Heritage & Archaeological Awareness",
      ta: "வரலாற்று மற்றும் கல்வெட்டு ஆய்வு",
    },
    tag: { en: "Archaeological Walk", ta: "தொல்லியல் நடைபயணம்" },
    location: { en: "Samanarmalai & Arittapatti Heritage Sites", ta: "சமணர்மலை & அரிட்டாபட்டி பாரம்பரிய இடங்கள்" },
    description: {
      en: "Exploration of ancient rock-cut caves, Tamil-Brahmi inscriptions, and monument conservation ethics to preserve cultural roots without vandalism.",
      ta: "பண்டைய தமிழ்-பிராமி கல்வெட்டுகள், சமணர் படுகைகள் மற்றும் பாறைச் சிற்பங்களைச் சிதைக்காமல் பாதுகாப்பது குறித்த விழிப்புணர்வுக் கள ஆய்வு.",
    },
    image: "/images/pdf/cheral_pdf_image_7.jpg",
    highlights: {
      en: [
        "Deciphering ancient Tamil-Brahmi script basics",
        "Heritage site cleanliness & anti-defacement drives",
        "Interactive storytelling of ancient Tamil life",
      ],
      ta: [
        "தமிழ்-பிராமி எழுத்துக்கள் குறித்த எளிய அறிமுகம்",
        "வரலாற்றுச் சின்னங்கள் தூய்மைப் பாதுகாப்பு விழிப்புணர்வு",
        "பண்டைய தமிழர் வாழ்வியல் பற்றிய வரலாற்று விளக்கங்கள்",
      ],
    },
  },
  {
    id: "wetlands-water-conservation",
    title: {
      en: "Wetland Ecosystems & Tank Conservation",
      ta: "நீர்ப்பிடிப்பு பகுதிகள் & கண்மாய் பாதுகாப்பு",
    },
    category: {
      en: "Water Ecology & Climate Action",
      ta: "நீர்ச்சூழலியல் & பருவநிலை பாதுகாப்பு",
    },
    tag: { en: "Water Stewardship", ta: "நீர்நிலை விழிப்புணர்வு" },
    location: { en: "Wetlands & Lakes of Southern Tamil Nadu", ta: "தென் தமிழகத்தின் பாரம்பரிய நீர்நிலைகள்" },
    description: {
      en: "Documenting traditional waterbodies, supporting local lake health restoration, and training volunteers in water conservation ecology.",
      ta: "பாரம்பரிய கண்மாய்கள் மற்றும் நீர்நிலைகளை ஆவணப்படுத்தி, நீர் மேலாண்மை விழிப்புணர்வை மக்களிடையே விதைத்தல்.",
    },
    image: "/images/pdf/cheral_pdf_image_4.jpg",
    highlights: {
      en: [
        "Water quality observation & aquatic life surveys",
        "Revival of traditional sluice & canal heritage",
        "Community lake protection squads",
      ],
      ta: [
        "நீர் நிலைகளின் சூழலியல் ஆய்வு",
        "பாரம்பரிய மதகு மற்றும் கால்வாய் அமைப்புகள் பற்றிய விழிப்புணர்வு",
        "சமூக நீர்நிலை பாதுகாப்பு தன்னார்வக் குழுக்கள்",
      ],
    },
  },
  {
    id: "literature-arts-dialogue",
    title: {
      en: "Tinai: Literature, Arts & Ecology Dialogue",
      ta: "திணை: இலக்கியம், கலை & சூழலியல் கருத்தரங்கம்",
    },
    category: {
      en: "Cultural Discourse & Public Talks",
      ta: "கலாச்சார உரையாடல் & கருத்தரங்கம்",
    },
    tag: { en: "Arts & Discourse", ta: "கலை & இலக்கியம்" },
    location: { en: "Auditoriums & Public Spaces, Madurai", ta: "மதுரை மற்றும் தமிழ்நாடு" },
    description: {
      en: "Conferences and public talks linking Sangam literature's ecological philosophy (Tinai concepts) with modern climate action and cultural arts.",
      ta: "சங்க இலக்கியத்தின் திணை கோட்பாடுகளை நவீன பருவநிலை மாற்றத் தீர்வுகளுடனும் கலைகளுடனும் இணைத்துப் பேசும் பொதுக் கருத்தரங்குகள்.",
    },
    image: "/images/pdf/cheral_pdf_image_12.jpg",
    highlights: {
      en: [
        "Scholarly lectures and cultural discussions",
        "Folk arts, poetry, and nature exhibitions",
        "Open for students, researchers, and citizens",
      ],
      ta: [
        "ஆராய்ச்சியாளர்கள் மற்றும் அறிஞர்களின் உரைகள்",
        "நாட்டுப்புற கலைகள், கவிதைகள் மற்றும் புகைப்படக் கண்காட்சி",
        "மாணவர்கள் மற்றும் பொதுமக்கள் பங்கேற்பு",
      ],
    },
  },
];
