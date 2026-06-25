"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Phone, UserRound } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { phoneToAuthEmail } from "@/lib/auth";

type Mode = "login" | "signup";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      if (!supabase) {
        throw new Error("Authentication is not connected yet.");
      }

      let email = phoneToAuthEmail(phone);

      if (mode === "signup") {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, phone, password })
        });
        const result = (await response.json()) as { email?: string; error?: string };

        if (!response.ok || !result.email) {
          throw new Error(result.error || "Could not create account.");
        }

        email = result.email;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw new Error(error.message);
      }

      router.push("/account");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <div>
        <span className="auth-eyebrow">{mode === "signup" ? "Create account" : "Welcome back"}</span>
        <h1>{mode === "signup" ? "Sign up with your Nepali phone number." : "Log in with your phone number."}</h1>
        <p>Your phone number is used as your private account ID. No email address is needed.</p>
      </div>

      {mode === "signup" ? (
        <label className="auth-field">
          <span>Full name</span>
          <div>
            <UserRound size={18} />
            <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your name" required />
          </div>
        </label>
      ) : null}

      <label className="auth-field">
        <span>Nepali phone number</span>
        <div>
          <Phone size={18} />
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="98XXXXXXXX"
            inputMode="tel"
            required
          />
        </div>
      </label>

      <label className="auth-field">
        <span>Password</span>
        <div>
          <Lock size={18} />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            type="password"
            required
            minLength={8}
          />
        </div>
      </label>

      {message ? <div className="auth-message">{message}</div> : null}

      <button className="portal-search-button" type="submit" disabled={busy}>
        {busy ? "Please wait..." : mode === "signup" ? "Create account" : "Log in"}
      </button>

      <p className="auth-switch">
        {mode === "signup" ? "Already have an account?" : "Need an account?"}{" "}
        <Link href={mode === "signup" ? "/login" : "/signup"}>{mode === "signup" ? "Log in" : "Sign up"}</Link>
      </p>
    </form>
  );
}
