"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, SlidersHorizontal, Search } from "lucide-react";
import { categories, districts, sources, tenderTypes } from "@/lib/sample-data";
import { Tender } from "@/lib/types";
import { TenderCard } from "@/components/tender-card";

type TenderTab = "all" | "ebids" | "enotice" | "ppmo" | "newspaper";

const budgetOptions = [
  { label: "Select Budget", value: "All" },
  { label: "Up to 20L", value: "2000000" },
  { label: "20L to 1Cr", value: "10000000" },
  { label: "Above 1Cr", value: "10000001" }
];

export function TenderFilters({ tenders }: { tenders: Tender[] }) {
  const [query, setQuery] = useState("");
  const [organizationCategory, setOrganizationCategory] = useState("All");
  const [district, setDistrict] = useState("All");
  const [projectType, setProjectType] = useState("All");
  const [noticeSource, setNoticeSource] = useState("All");
  const [procurementType, setProcurementType] = useState("All");
  const [budget, setBudget] = useState("All");
  const [tab, setTab] = useState<TenderTab>("all");
  const [view, setView] = useState("List");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return tenders
      .filter((tender) => {
        const matchesSearch =
          !search ||
          [
            tender.title,
            tender.organization,
            tender.category,
            tender.procurement_type,
            tender.source,
            tender.district,
            tender.summary
          ]
            .join(" ")
            .toLowerCase()
            .includes(search);

        const matchesTab =
          tab === "all" ||
          (tab === "ebids" && tender.source === "Private E-Bid") ||
          (tab === "enotice" && tender.source !== "PPMO") ||
          (tab === "ppmo" && tender.source === "PPMO") ||
          (tab === "newspaper" && tender.source.includes("Newspaper"));

        const matchesBudget =
          budget === "All" ||
          (budget === "2000000" && (tender.budget ?? 0) <= 2000000) ||
          (budget === "10000000" && (tender.budget ?? 0) > 2000000 && (tender.budget ?? 0) <= 10000000) ||
          (budget === "10000001" && (tender.budget ?? 0) > 10000000);

        return (
          matchesSearch &&
          matchesTab &&
          (organizationCategory === "All" || tender.category === organizationCategory) &&
          (district === "All" || tender.district === district) &&
          (projectType === "All" || tender.category === projectType) &&
          (noticeSource === "All" || tender.source === noticeSource) &&
          (procurementType === "All" || tender.procurement_type === procurementType) &&
          matchesBudget
        );
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [budget, district, noticeSource, organizationCategory, procurementType, projectType, query, tab, tenders]);

  const ebids = tenders.filter((tender) => tender.source === "Private E-Bid" || tender.is_featured).slice(0, 5);

  return (
    <section className="portal-content" id="tenders">
      <div className="container">
        <div className="portal-search-panel">
          <div className="portal-search-row">
            <div className="portal-search-input">
              <Search size={28} />
              <input
                aria-label="Search tender notices"
                placeholder="Enter Keyword I.E Road Construction"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <PortalSelect
              ariaLabel="Select organization category"
              value={organizationCategory}
              onChange={setOrganizationCategory}
              options={["All", ...categories]}
              placeholder="Select Organization Category"
            />
            <button className="portal-search-button" type="button">
              SEARCH
            </button>
          </div>

          <div className="portal-filter-title">
            <SlidersHorizontal size={22} />
            <span>Filters</span>
          </div>

          <div className="portal-filter-row">
            <PortalSelect
              ariaLabel="Select district"
              value={district}
              onChange={setDistrict}
              options={["All", ...districts]}
              placeholder="Select Location"
            />
            <PortalSelect
              ariaLabel="Select project type"
              value={projectType}
              onChange={setProjectType}
              options={["All", ...categories]}
              placeholder="Select Project Type"
            />
            <PortalSelect
              ariaLabel="Select notice"
              value={noticeSource}
              onChange={setNoticeSource}
              options={["All", ...sources]}
              placeholder="Select Notice"
            />
            <PortalSelect
              ariaLabel="Select procurement type"
              value={procurementType}
              onChange={setProcurementType}
              options={["All", ...tenderTypes]}
              placeholder="Select Procurement Type"
            />
            <PortalSelect
              ariaLabel="Select budget"
              value={budget}
              onChange={setBudget}
              options={budgetOptions}
              placeholder="Select Budget"
            />
          </div>
        </div>

        <div className="portal-listing-head">
          <div className="portal-tabs" role="tablist" aria-label="Tender categories">
            <PortalTab label="All Bids" value="all" active={tab} onChange={setTab} />
            <PortalTab label="E-Bids" value="ebids" active={tab} onChange={setTab} />
            <PortalTab label="E-Notice" value="enotice" active={tab} onChange={setTab} />
            <PortalTab label="PPMO" value="ppmo" active={tab} onChange={setTab} />
            <PortalTab label="Newspaper" value="newspaper" active={tab} onChange={setTab} />
          </div>

          <div className="portal-list-controls">
            <button className="date-range-button" type="button">
              Publish From - Publish To
              <CalendarDays size={17} />
            </button>
            <PortalSelect
              ariaLabel="Select listing view"
              value={view}
              onChange={setView}
              options={["List", "Grid"]}
              placeholder="List"
              compact
            />
          </div>
        </div>

        <div className="portal-results-layout">
          <div className="portal-feed">
            <div className="portal-date-label">Yesterday</div>
            <div className={view === "Grid" ? "portal-grid-feed" : "portal-list-feed"}>
              {filtered.length ? (
                filtered.map((tender) => <TenderCard key={tender.id} tender={tender} />)
              ) : (
                <div className="empty">No tender notices match these filters yet.</div>
              )}
            </div>
          </div>

          <aside className="ebids-panel">
            <div className="ebids-head">
              <h2>E-Bids</h2>
              <button type="button">View All</button>
            </div>
            <div className="ebids-list">
              {ebids.map((tender) => (
                <a className="ebid-item" key={tender.id} href={`/tenders/${tender.slug}`}>
                  <span className="ebid-logo">{tender.organization.slice(0, 2).toUpperCase()}</span>
                  <span>
                    <strong>{tender.title}</strong>
                    <small>{tender.organization}, {tender.district}</small>
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function PortalSelect({
  ariaLabel,
  value,
  onChange,
  options,
  placeholder,
  compact
}: {
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly (string | { label: string; value: string })[];
  placeholder: string;
  compact?: boolean;
}) {
  return (
    <label className={compact ? "portal-select compact" : "portal-select"}>
      <select aria-label={ariaLabel} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => {
          const optionValue = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;
          return (
            <option key={optionValue} value={optionValue}>
              {optionValue === "All" ? placeholder : optionLabel}
            </option>
          );
        })}
      </select>
      <span className="portal-select-divider" />
      <ChevronDown size={22} />
    </label>
  );
}

function PortalTab({
  label,
  value,
  active,
  onChange
}: {
  label: string;
  value: TenderTab;
  active: TenderTab;
  onChange: (value: TenderTab) => void;
}) {
  return (
    <button className={active === value ? "portal-tab active" : "portal-tab"} type="button" onClick={() => onChange(value)}>
      {label}
    </button>
  );
}
