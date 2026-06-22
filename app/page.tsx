import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { TenderFilters } from "@/components/tender-filters";
import { getTenders } from "@/lib/supabase";

export default async function Home() {
  const tenders = await getTenders();

  return (
    <main className="shell portal-shell">
      <AppHeader />
      <section className="portal-hero">
        <div className="portal-hero-overlay" />
        <h1>One Procurement Portal<br />Covering All Bidding Eco-system</h1>
      </section>

      <TenderFilters tenders={tenders} />
      <Link className="whatsapp-float" href="/#contact" aria-label="Contact support">
        <MessageCircle size={34} />
      </Link>
    </main>
  );
}
