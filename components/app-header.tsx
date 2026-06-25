"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, UserCircle2 } from "lucide-react";
import { createClient, User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getProfileLabel(user: User) {
  const phone = user.user_metadata?.phone;
  const fullName = user.user_metadata?.full_name;

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

  if (typeof phone === "string" && phone.trim()) {
    return phone.trim();
  }

  return "My profile";
}

export function AppHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, []);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  const profileLabel = user ? getProfileLabel(user) : "";

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <BriefcaseBusiness size={22} />
          </span>
          <span>
            <strong>BidPatra</strong> Nepal
          </span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link className="active" href="/">Home</Link>
          <Link href="/rent-machine">Rent machine</Link>
          <Link href="/#pricing">Pricing</Link>
        </nav>
        <div className="header-actions">
          {user ? (
            <>
              <Link className="profile-button" href="/account" title="Open profile">
                <UserCircle2 size={20} />
                <span>{profileLabel}</span>
              </Link>
              <button className="login-button" type="button" onClick={handleSignOut}>Log out</button>
            </>
          ) : (
            <>
              <Link className="login-button" href="/login">Log in</Link>
              <Link className="get-started-button" href="/signup">Sign up</Link>
            </>
          )}
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {user ? <Link href="/account">Profile</Link> : <Link href="/signup">Sign up</Link>}
        </nav>
      </div>
    </header>
  );
}
