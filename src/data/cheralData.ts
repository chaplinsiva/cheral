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

export const cheralHeroSlides = [
  {
    image: "/images/pdf/cheral_pdf_image_2.jpg",
    title: { en: "Mission & Vision", ta: "லட்சியம் & தொலைநோக்கு" },
    subtitle: {
      en: "Building Climate Resilience through Nature Conservation and Community Action.",
      ta: "இயற்கை பாதுகாப்பு மற்றும் சமூக பங்கேற்பு மூலம் காலநிலை மீள்தன்மையை உருவாக்குதல்.",
    },
    tag: "CHERAL TRUST",
  },
  {
    image: "/images/pdf/cheral_pdf_image_15.jpg",
    title: { en: "Public Awareness", ta: "பொதுமக்கள் விழிப்புணர்வு" },
    subtitle: {
      en: "Through campaigns, talks, exhibitions, and outreach programs, we inspire individuals and communities.",
      ta: "பிரச்சாரங்கள் மற்றும் விழிப்புணர்வு நிகழ்ச்சிகள் மூலம் இயற்கை பாதுகாப்பு.",
    },
    tag: "WHAT WE DO",
  },
  {
    image: "/images/pdf/cheral_pdf_image_7.jpg",
    title: { en: "Core Values", ta: "முக்கிய கொள்கைகள்" },
    subtitle: {
      en: "Guided by integrity, ecological justice, historical consciousness, and scientific excellence.",
      ta: "நேர்மை மற்றும் அறிவியல் விழிப்புணர்வுடன் செயல்படுதல்.",
    },
    tag: "ETHICAL PRINCIPLES",
  },
  {
    image: "/images/pdf/cheral_pdf_image_3.jpg",
    title: { en: "Sustainable Future", ta: "நிலையான எதிர்காலம்" },
    subtitle: {
      en: "Creating a world where ecological balance and cultural heritage coexist in harmony.",
      ta: "இயற்கை சமநிலையும் பாரம்பரியமும் இணக்கமாக வாழும் உலகம்.",
    },
    tag: "OBJECTIVES",
  },
];

export const cheralInitiatives: Initiative[] = [
  {
    id: "awareness",
    title: { en: "Public Awareness", ta: "பொதுமக்கள் விழிப்புணர்வு" },
    category: { en: "Outreach & Campaigns", ta: "பிரச்சாரம் & விழிப்புணர்வு" },
    description: {
      en: "Through campaigns, talks, exhibitions, and outreach programs, we inspire individuals and communities to protect nature, preserve heritage, and adopt sustainable practices.",
      ta: "பிரச்சாரங்கள், உரையாடல்கள் மற்றும் கண்காட்சிகள் மூலம் இயற்கை மற்றும் பாரம்பரிய பாதுகாப்பை மக்களிடம் கொண்டு சேர்த்தல்.",
    },
    image: "/images/pdf/cheral_pdf_image_15.jpg",
    badge: { en: "Outreach & Campaigns", ta: "பிரச்சாரம் & விழிப்புணர்வு" },
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
    id: "walks",
    title: { en: "Nature & Heritage Walks", ta: "இயற்கை & வரலாற்று நடைபயணம்" },
    category: { en: "Immersive Field Exploration", ta: "கள ஆய்வு நடைபயணம்" },
    description: {
      en: "We organize guided walks that connect people with the richness of nature, biodiversity, and cultural heritage, fostering awareness through immersive, on-site learning experiences.",
      ta: "இயற்கை வளம், பல்லுயிர்ப் பெருக்கம் மற்றும் வரலாற்றுச் சின்னங்களை நேரடியாகக் கண்டு உணரும் வழிநடத்தப்பட்ட நடைபயணங்கள்.",
    },
    image: "/images/pdf/cheral_pdf_image_5.jpg",
    badge: { en: "Guided Outdoor Exploration", ta: "கள நடைபயணம்" },
  },
  {
    id: "plantation",
    title: { en: "Tree Plantation", ta: "நாட்டு மரங்கள் நடுதல்" },
    category: { en: "Ecological Restoration", ta: "சுற்றுச்சூழல் மீட்பு" },
    description: {
      en: "We promote native tree plantation initiatives to restore green cover, strengthen local ecosystems, and encourage community participation in environmental stewardship.",
      ta: "பழமையான நாட்டு மரக் கன்றுகளை நட்டு, பசுமைப் போர்வையை அதிகரித்து உள்ளூர் சுற்றுச்சூழல் அமைப்பை மீளமைத்தல்.",
    },
    image: "/images/pdf/cheral_pdf_image_8.jpg",
    badge: { en: "Ecological Restoration", ta: "சுற்றுச்சூழல் மீட்பு" },
  },
];

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
