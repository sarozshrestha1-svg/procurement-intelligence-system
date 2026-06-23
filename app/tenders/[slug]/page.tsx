import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, CalendarClock, Download, Mail, MapPin, Phone, Tag } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { formatMoney, getTenderBySlug } from "@/lib/supabase";

export default async function TenderDetail({ params }: { params: { slug: string } }) {
  const tender = await getTenderBySlug(params.slug);

  if (!tender) {
    notFound();
  }

  return (
    <main className="shell portal-shell">
      <AppHeader />
      <section className="portal-detail-hero">
        <div className="container">
          <Link className="portal-back-link" href="/#tenders">
            <ArrowLeft size={16} />
            Back to notices
          </Link>
          <div className="portal-detail-kicker">
            <span>
              <CalendarClock size={13} />
              {tender.status === "closing_soon" ? "Closing soon" : tender.status}
            </span>
            <span>{tender.category}</span>
            <span>{tender.procurement_type}</span>
          </div>
          <h1>{tender.title}</h1>
          <p>{tender.organization}</p>
        </div>
      </section>

      <section className="container portal-detail">
        <article className="portal-detail-main">
          <div className="info-grid">
            <Info label="Deadline" value={format(new Date(tender.deadline), "MMMM d, yyyy")} />
            <Info label="Published" value={format(new Date(tender.published_at), "MMMM d, yyyy")} />
            <Info label="Budget" value={formatMoney(tender.budget)} />
            <Info label="Bid fee" value={formatMoney(tender.bid_fee)} />
            <Info label="Location" value={`${tender.district ? `${tender.district}, ` : ""}${tender.province}`} />
            <Info label="Source" value={tender.source} />
          </div>
          <div className="portal-prose">
            <h2>Notice summary</h2>
            <p>{tender.summary}</p>
            <h2>Details</h2>
            <p>{tender.description}</p>
          </div>
        </article>

        <aside className="portal-detail-side">
          <div className="portal-side-panel">
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
          <div className="portal-side-panel document-panel">
            <h3>Documents</h3>
            {tender.document_url ? (
              <a className="portal-document-button" href={tender.document_url} target="_blank" rel="noreferrer">
                <Download size={16} />
                View bid document
              </a>
            ) : (
              <p className="portal-prose">Document link has not been attached by the publisher.</p>
            )}
          </div>
          <div className="portal-side-panel">
            <h3>Opportunity tags</h3>
            <div className="detail-tags">
              <span><Tag size={14} /> {tender.category}</span>
              <span><Tag size={14} /> {tender.procurement_type}</span>
              <span><Tag size={14} /> {tender.district || tender.province}</span>
            </div>
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
