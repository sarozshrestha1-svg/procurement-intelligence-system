import Link from "next/link";
import { ArrowLeft, FilePlus2 } from "lucide-react";
import { publishTender } from "@/app/actions";
import { AppHeader } from "@/components/app-header";
import { categories, districts, provinces, sources, tenderTypes } from "@/lib/sample-data";
import { hasSupabaseConfig } from "@/lib/supabase";

export default function PublishPage() {
  return (
    <main className="shell">
      <AppHeader />
      <section className="container section">
        <div className="section-head">
          <div>
            <Link className="ghost-button" href="/">
              <ArrowLeft size={16} />
              Back home
            </Link>
            <h2>Publish a tender notice</h2>
            <p>
              Add structured notice details for suppliers. Publishing requires Supabase server credentials in production.
            </p>
          </div>
        </div>

        {!hasSupabaseConfig ? (
          <div className="empty setup-warning" style={{ marginBottom: 16 }}>
            Database is not connected yet. You can review the form design, but publishing will work after Supabase keys are added in <strong>.env.local</strong>.
          </div>
        ) : null}

        <div className="publish-panel">
          <form className="publish-form" action={publishTender}>
            <div className="form-grid">
              <Field name="title" label="Notice title" placeholder="Supply and delivery of..." required />
              <Field name="organization" label="Issuing organization" placeholder="Municipality / Office / Company" required />
              <Select name="category" label="Category" options={categories} />
              <Select name="procurement_type" label="Procurement type" options={tenderTypes} />
              <Select name="province" label="Province" options={provinces} />
              <Select name="district" label="District" options={districts} />
              <Select name="source" label="Source" options={sources} />
              <Field name="published_at" label="Published date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
              <Field name="deadline" label="Submission deadline" type="date" required />
              <Field name="budget" label="Estimated budget" type="number" placeholder="25000000" />
              <Field name="bid_fee" label="Bid document fee" type="number" placeholder="3000" />
              <Field name="document_url" label="Document URL" placeholder="https://..." />
              <Field name="contact_email" label="Contact email" type="email" placeholder="procurement@example.com" />
              <Field name="contact_phone" label="Contact phone" placeholder="+977..." />
            </div>
            <Field name="summary" label="Short summary" placeholder="One or two lines suppliers can scan quickly" required />
            <div className="field">
              <label htmlFor="description">Detailed notice</label>
              <textarea id="description" name="description" placeholder="Eligibility, scope, submission method, and document details" />
            </div>
            <button className="primary-button" type="submit" disabled={!hasSupabaseConfig}>
              <FilePlus2 size={17} />
              {hasSupabaseConfig ? "Publish notice" : "Connect database to publish"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
