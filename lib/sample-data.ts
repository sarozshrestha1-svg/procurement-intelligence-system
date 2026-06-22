import { Tender } from "@/lib/types";

export const categories = [
  "Roads & Bridges",
  "Hydropower",
  "Health",
  "Education",
  "Water Supply",
  "IT & Digital",
  "Construction",
  "Agriculture"
];

export const provinces = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim"
];

export const districtsByProvince: Record<string, string[]> = {
  Koshi: ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Morang", "Sankhuwasabha", "Sunsari"],
  Madhesh: ["Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", "Saptari", "Sarlahi", "Siraha"],
  Bagmati: ["Bhaktapur", "Chitwan", "Kathmandu", "Kavrepalanchok", "Lalitpur", "Makwanpur", "Nuwakot"],
  Gandaki: ["Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Syangja", "Tanahun"],
  Lumbini: ["Banke", "Bardiya", "Dang", "Gulmi", "Palpa", "Rupandehi"],
  Karnali: ["Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", "Kalikot", "Mugu", "Surkhet"],
  Sudurpashchim: ["Achham", "Baitadi", "Dadeldhura", "Darchula", "Doti", "Kailali", "Kanchanpur"]
};

export const districts = Object.values(districtsByProvince)
  .flat()
  .sort((a, b) => a.localeCompare(b));

export const tenderTypes = ["Works", "Goods", "Consultancy", "Services"] as const;

export const sources = [
  "PPMO",
  "National Newspaper",
  "Local Newspaper",
  "Private E-Bid"
] as const;

export const sampleTenders: Tender[] = [
  {
    id: "1",
    title: "Upgrading of Rural Road and Drainage Works",
    slug: "upgrading-rural-road-drainage-works",
    organization: "Infrastructure Development Office, Lalitpur",
    category: "Roads & Bridges",
    procurement_type: "Works",
    province: "Bagmati",
    district: "Lalitpur",
    source: "PPMO",
    budget: 42000000,
    bid_fee: 5000,
    published_at: "2026-06-18",
    deadline: "2026-07-09",
    status: "open",
    summary:
      "Road surface improvement, side drains, retaining walls, and associated civil works for a rural corridor.",
    description:
      "Eligible contractors are invited to submit electronic bids for road surface improvement, side drain construction, retaining wall protection, and related civil works. Bidders must meet experience, equipment, and financial capacity requirements stated in the bidding document.",
    contact_email: "procurement@idolalitpur.gov.np",
    contact_phone: "01-5550123",
    document_url: "https://bolpatra.gov.np",
    is_featured: true
  },
  {
    id: "2",
    title: "Supply and Delivery of Essential Medicines",
    slug: "supply-delivery-essential-medicines",
    organization: "Provincial Health Logistics Management Center",
    category: "Health",
    procurement_type: "Goods",
    province: "Lumbini",
    district: "Rupandehi",
    source: "National Newspaper",
    budget: 18500000,
    bid_fee: 3000,
    published_at: "2026-06-17",
    deadline: "2026-06-29",
    status: "closing_soon",
    summary:
      "Framework procurement for essential medicines and distribution to district health facilities.",
    description:
      "The purchaser invites sealed bids from eligible suppliers for the supply, packaging, and delivery of essential medicines. Products must comply with national quality standards and include batch documentation.",
    contact_email: "tender@phlmc.gov.np",
    contact_phone: "071-420018",
    document_url: null,
    is_featured: true
  },
  {
    id: "3",
    title: "Consulting Services for Hydropower Feasibility Study",
    slug: "hydropower-feasibility-study-consulting-services",
    organization: "Energy Development Company Pvt. Ltd.",
    category: "Hydropower",
    procurement_type: "Consultancy",
    province: "Gandaki",
    district: "Kaski",
    source: "Private E-Bid",
    budget: 9500000,
    bid_fee: null,
    published_at: "2026-06-16",
    deadline: "2026-07-15",
    status: "open",
    summary:
      "Technical, environmental, and financial feasibility study for a mid-sized hydropower project.",
    description:
      "Qualified consulting firms may submit expressions of interest for feasibility, hydrology, geology, environmental screening, cost estimation, and project finance assessment.",
    contact_email: "projects@energydev.com.np",
    contact_phone: "061-540222",
    document_url: null,
    is_featured: false
  },
  {
    id: "4",
    title: "Smart Classroom Equipment for Community Schools",
    slug: "smart-classroom-equipment-community-schools",
    organization: "Municipal Education Section, Biratnagar",
    category: "Education",
    procurement_type: "Goods",
    province: "Koshi",
    district: "Morang",
    source: "Local Newspaper",
    budget: 7600000,
    bid_fee: 2000,
    published_at: "2026-06-15",
    deadline: "2026-07-03",
    status: "open",
    summary:
      "Interactive displays, projectors, networking hardware, and training support for public schools.",
    description:
      "The municipality invites suppliers to provide classroom technology packages including installation, commissioning, warranty, and teacher orientation.",
    contact_email: "education@biratnagarmun.gov.np",
    contact_phone: "021-460000",
    document_url: null,
    is_featured: false
  },
  {
    id: "5",
    title: "Design and Build of Solar Lift Water Supply Scheme",
    slug: "solar-lift-water-supply-scheme",
    organization: "Water Supply and Sanitation Division Office",
    category: "Water Supply",
    procurement_type: "Works",
    province: "Karnali",
    district: "Dailekh",
    source: "PPMO",
    budget: 31200000,
    bid_fee: 5000,
    published_at: "2026-06-13",
    deadline: "2026-07-11",
    status: "open",
    summary:
      "Solar pumping, storage tanks, distribution network, and household connections in rural wards.",
    description:
      "The work includes survey validation, solar pumping station installation, tank construction, pipe laying, testing, commissioning, and community handover.",
    contact_email: "wsdo.dailekh@dwssm.gov.np",
    contact_phone: "089-420090",
    document_url: "https://bolpatra.gov.np",
    is_featured: true
  },
  {
    id: "6",
    title: "Construction of Stone Masonry Trail and Drainage in Jumla",
    slug: "stone-masonry-trail-drainage-jumla",
    organization: "Chandannath Municipality",
    category: "Construction",
    procurement_type: "Works",
    province: "Karnali",
    district: "Jumla",
    source: "Local Newspaper",
    budget: 12800000,
    bid_fee: 3000,
    published_at: "2026-06-19",
    deadline: "2026-07-06",
    status: "open",
    summary:
      "Trail improvement, stone masonry, drainage, and small retaining structures across selected wards.",
    description:
      "Eligible contractors are invited to submit bids for community trail upgrading, drainage channels, stone masonry structures, and site restoration in Chandannath Municipality.",
    contact_email: "procurement@chandannathmun.gov.np",
    contact_phone: "087-520111",
    document_url: null,
    is_featured: false
  },
  {
    id: "7",
    title: "Supply of Apple Processing Equipment for Jumla Cooperative",
    slug: "apple-processing-equipment-jumla-cooperative",
    organization: "Agriculture Knowledge Center, Jumla",
    category: "Agriculture",
    procurement_type: "Goods",
    province: "Karnali",
    district: "Jumla",
    source: "PPMO",
    budget: 6400000,
    bid_fee: null,
    published_at: "2026-06-20",
    deadline: "2026-06-28",
    status: "closing_soon",
    summary:
      "Procurement of grading, washing, drying, and packaging equipment for local apple value-chain support.",
    description:
      "Suppliers may bid for apple processing and packaging equipment, installation, testing, and operator orientation for a Jumla-based cooperative facility.",
    contact_email: "akc.jumla@moald.gov.np",
    contact_phone: "087-520220",
    document_url: "https://bolpatra.gov.np",
    is_featured: true
  }
];
