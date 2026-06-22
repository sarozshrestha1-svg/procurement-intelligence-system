export type TenderStatus = "open" | "closing_soon" | "closed" | "awarded";

export type Tender = {
  id: string;
  title: string;
  slug: string;
  organization: string;
  category: string;
  procurement_type: "Works" | "Goods" | "Consultancy" | "Services";
  province: string;
  district: string;
  source: "PPMO" | "National Newspaper" | "Local Newspaper" | "Private E-Bid";
  budget: number | null;
  bid_fee: number | null;
  published_at: string;
  deadline: string;
  status: TenderStatus;
  summary: string;
  description: string;
  contact_email: string | null;
  contact_phone: string | null;
  document_url: string | null;
  is_featured: boolean;
};

export type TenderInput = Omit<Tender, "id" | "slug" | "status" | "is_featured"> & {
  is_featured?: boolean;
};
