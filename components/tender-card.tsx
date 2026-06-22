import Link from "next/link";
import { CalendarDays, Eye, Folder, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Tender } from "@/lib/types";
import { formatMoney } from "@/lib/supabase";
import { SaveTenderButton } from "@/components/save-tender-button";

export function TenderCard({ tender }: { tender: Tender }) {
  const daysRemaining = Math.max(
    0,
    Math.ceil((new Date(tender.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <article className="tender-card">
      <div className="portal-card-meta">
        <span>
          <MapPin size={18} />
          {tender.district || tender.province}
        </span>
        <b>|</b>
        <span>{tender.procurement_type === "Goods" ? "Tender/Quotation" : tender.procurement_type}</span>
        <b>|</b>
        <span>Source: <strong>{tender.source === "Private E-Bid" ? "BidPatra Nepal" : tender.source}</strong></span>
        <b>|</b>
        <span>Budget: <strong>{budgetLabel(tender.budget)}</strong></span>
        <span className="portal-card-icons">
          <span>TID :</span>
          <SaveTenderButton tenderId={tender.id} />
          <Folder size={23} />
        </span>
      </div>

      <h3>
        <Link href={`/tenders/${tender.slug}`}>{tender.title}</Link>
      </h3>
      <p className="portal-card-org">{tender.organization}, {tender.district}</p>

      <div className="portal-card-divider" />

      <div className="portal-card-footer">
        <span>
          <CalendarDays size={18} />
          Published Date: <strong>{format(new Date(tender.published_at), "MMM d, yyyy")}</strong>
        </span>
        <b>|</b>
        <span>Apply Before: <strong>{format(new Date(tender.deadline), "MMM d, yyyy")}</strong></span>
        <span className="days-left">{daysRemaining} Days Remaining</span>
        <Link className="view-button" href={`/tenders/${tender.slug}`}>
          <Eye size={18} />
          View
        </Link>
      </div>
    </article>
  );
}

function budgetLabel(value: number | null) {
  if (!value) {
    return "Not disclosed";
  }

  if (value <= 2000000) {
    return "Up to 20L";
  }

  if (value <= 10000000) {
    return "20L to 1Cr";
  }

  return formatMoney(value);
}
