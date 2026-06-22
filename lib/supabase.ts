import { createClient } from "@supabase/supabase-js";
import { Tender, TenderInput } from "@/lib/types";
import { sampleTenders } from "@/lib/sample-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const adminClient =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false }
      })
    : null;

export async function getTenders() {
  if (!supabase) {
    return sampleTenders;
  }

  const { data, error } = await supabase
    .from("tenders")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("deadline", { ascending: true });

  if (error) {
    console.error(error);
    return sampleTenders;
  }

  return data as Tender[];
}

export async function getTenderBySlug(slug: string) {
  if (!supabase) {
    return sampleTenders.find((tender) => tender.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("tenders")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return sampleTenders.find((tender) => tender.slug === slug) ?? null;
  }

  return data as Tender;
}

export async function createTender(input: TenderInput) {
  if (!adminClient) {
    throw new Error("Supabase service role key is required to publish notices.");
  }

  const slug = slugify(input.title);
  const status = getStatus(input.deadline);

  const { data, error } = await adminClient
    .from("tenders")
    .insert({
      ...input,
      slug,
      status,
      is_featured: input.is_featured ?? false
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Tender;
}

export function getStatus(deadline: string) {
  const now = new Date();
  const close = new Date(deadline);
  const days = Math.ceil((close.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (Number.isNaN(days) || days < 0) {
    return "closed";
  }

  return days <= 7 ? "closing_soon" : "open";
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatMoney(value: number | null) {
  if (!value) {
    return "Not disclosed";
  }

  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0
  }).format(value);
}
