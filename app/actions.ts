"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTender } from "@/lib/supabase";
import { TenderInput } from "@/lib/types";

export async function publishTender(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const organization = String(formData.get("organization") ?? "");
  const category = String(formData.get("category") ?? "");
  const procurement_type = String(formData.get("procurement_type") ?? "") as TenderInput["procurement_type"];
  const province = String(formData.get("province") ?? "");
  const district = String(formData.get("district") ?? "");
  const source = String(formData.get("source") ?? "") as TenderInput["source"];
  const deadline = String(formData.get("deadline") ?? "");
  const published_at = String(formData.get("published_at") ?? new Date().toISOString().slice(0, 10));
  const summary = String(formData.get("summary") ?? "");
  const description = String(formData.get("description") ?? "");
  const contact_email = nullableString(formData.get("contact_email"));
  const contact_phone = nullableString(formData.get("contact_phone"));
  const document_url = nullableString(formData.get("document_url"));
  const budget = nullableNumber(formData.get("budget"));
  const bid_fee = nullableNumber(formData.get("bid_fee"));

  if (!title || !organization || !category || !procurement_type || !province || !deadline || !summary) {
    throw new Error("Please fill the required tender fields.");
  }

  const tender = await createTender({
    title,
    organization,
    category,
    procurement_type,
    province,
    district,
    source,
    budget,
    bid_fee,
    published_at,
    deadline,
    summary,
    description,
    contact_email,
    contact_phone,
    document_url
  });

  revalidatePath("/");
  revalidatePath(`/tenders/${tender.slug}`);
  redirect(`/tenders/${tender.slug}`);
}

function nullableString(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length ? text : null;
}

function nullableNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length ? Number(text) : null;
}
