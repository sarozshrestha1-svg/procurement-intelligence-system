import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, CalendarClock, Download, Mail, MapPin, Phone } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { formatMoney, getTenderBySlug } from "@/lib/supabase";

export default async function TenderDetail({ params }: { params: { slug: string } }) {
  const tender = await getTenderBySlug(params.slug);

  if (!tender) {
    notFound();
  }

  return (
    <main className="shell">
      <AppHeader />
      <section className="container detail">
        <article className="detail-main">
          <Link className="ghost-button" href="/#tenders">
            <ArrowLeft size={16} />
            Back to notices
          </Link>
          <div className="meta-row" style={{ marginTop: 18 }}>
            <span className={tender.status === "closing_soon" ? "pill urgent" : "pill live"}>
              <CalendarClock size={13} />
              {tender.status === "closing_soon" ? "Closing soon" : tender.status}
            </span>
            <span className="pill">{tender.category}</span>
            <span className="pill">{tender.procurement_type}</span>
          </div>
          <h1>{tender.title}</h1>
          <p className="lead">{tender.organization}</p>
          <div className="info-grid">
            <Info label="Deadline" value={format(new Date(tender.deadline), "MMMM d, yyyy")} />
            <Info label="Published" value={format(new Date(tender.published_at), "MMMM d, yyyy")} />
            <Info label="Budget" value={formatMoney(tender.budget)} />
            <Info label="Bid fee" value={formatMoney(tender.bid_fee)} />
            <Info label="Location" value={`${tender.district ? `${tender.district}, ` : ""}${tender.province}`} />
            <Info label="Source" value={tender.source} />
          </div>
          <div className="prose">
            <h2>Notice summary</h2>
            <p>{tender.summary}</p>
            <h2>Details</h2>
            <p>{tender.description}</p>
          </div>
        </article>

        <aside className="side-panel">
          <div className="panel">
            <h3>Contact</h3>
            <ul className="panel-list">
              <li>
                <span>
                  <Mail size={14} /> Email
                </span>
                <strong>{tender.contact_email ?? "Not provided"}</strong>
              </li>
              <li>
                <span>
                  <Phone size={14} /> Phone
                </span>
                <strong>{tender.contact_phone ?? "Not provided"}</strong>
              </li>
              <li>
                <span>
                  <MapPin size={14} /> District
                </span>
                <strong>{tender.district || tender.province}</strong>
              </li>
            </ul>
          </div>
          <div className="panel">
            <h3>Documents</h3>
            {tender.document_url ? (
              <a className="primary-button" href={tender.document_url} target="_blank" rel="noreferrer">
                <Download size={16} />
                Open bid document
              </a>
            ) : (
              <p className="prose">Document link has not been attached by the publisher.</p>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-box">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
