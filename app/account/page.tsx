import Link from "next/link";
import { AppHeader } from "@/components/app-header";

export default function AccountPage() {
  return (
    <main className="shell portal-shell">
      <AppHeader />
      <section className="portal-detail-hero">
        <div className="container">
          <div className="portal-detail-kicker">
            <span>BidPatra account</span>
          </div>
          <h1>Your procurement workspace is ready.</h1>
          <p>Saved bids, PDF summaries, alerts, and rental requests will live here as we add those features.</p>
        </div>
      </section>
      <section className="container portal-detail">
        <article className="portal-detail-main">
          <div className="portal-prose">
            <h2>Next account features</h2>
            <p>
              We now have phone-number login working. Next we can connect saved tenders, machine rental requests, and the AI PDF question-answer tool to this account area.
            </p>
            <Link className="portal-document-button" href="/">Browse tenders</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
