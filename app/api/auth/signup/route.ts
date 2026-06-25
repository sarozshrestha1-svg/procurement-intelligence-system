import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { displayNepaliPhone, phoneToAuthEmail } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Database is not connected yet." }, { status: 500 });
  }

  const body = (await request.json()) as {
    fullName?: string;
    phone?: string;
    password?: string;
  };

  const fullName = body.fullName?.trim() || "";
  const phone = body.phone?.trim() || "";
  const password = body.password || "";

  if (!fullName) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  let email: string;
  let displayPhone: string;

  try {
    email = phoneToAuthEmail(phone);
    displayPhone = displayNepaliPhone(phone);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid phone number." }, { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false }
  });

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      phone: displayPhone
    }
  });

  if (error) {
    const message = error.message.toLowerCase().includes("already")
      ? "This phone number already has an account. Please log in."
      : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  return NextResponse.json({ email });
}
