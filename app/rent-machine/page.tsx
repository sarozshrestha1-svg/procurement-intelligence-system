import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Search, ShieldCheck, Truck } from "lucide-react";
import { AppHeader } from "@/components/app-header";

const equipment = [
  {
    name: "Excavator 220",
    type: "Earthmoving",
    location: "Kathmandu",
    rate: "NPR 8,500 / hour",
    owner: "Himalayan Heavy Equipment"
  },
  {
    name: "Road Roller 10T",
    type: "Road Works",
    location: "Lalitpur",
    rate: "NPR 42,000 / day",
    owner: "Valley Infra Rentals"
  },
  {
    name: "Concrete Mixer",
    type: "Construction",
    location: "Pokhara",
    rate: "NPR 6,000 / day",
    owner: "Gandaki Build Support"
  },
  {
    name: "Tipper Truck",
    type: "Transport",
    location: "Jumla",
    rate: "NPR 18,000 / trip",
    owner: "Karnali Logistics"
  }
];

export default function RentMachinePage() {
  return (
    <main className="shell portal-shell">
      <AppHeader />
      <section className="market-hero">
        <div className="container market-hero-inner">
          <div>
            <span className="market-eyebrow">
              <Truck size={18} />
              Equipment rental marketplace
            </span>
            <h1>Rent construction machines for tender projects.</h1>
            <p>
              Find excavators, rollers, trucks, mixers, and other project equipment from verified owners near your work site.
            </p>
          </div>
          <div className="market-search-panel">
            <div className="portal-search-input">
              <Search size={26} />
              <input placeholder="Search excavator, roller, mixer..." />
            </div>
            <div className="market-filter-row">
              <select aria-label="Select location">
                <option>Select Location</option>
                <option>Kathmandu</option>
                <option>Lalitpur</option>
                <option>Pokhara</option>
                <option>Jumla</option>
              </select>
              <select aria-label="Select equipment type">
                <option>Select Equipment Type</option>
                <option>Earthmoving</option>
                <option>Road Works</option>
                <option>Construction</option>
                <option>Transport</option>
              </select>
            </div>
            <button className="portal-search-button" type="button">SEARCH MACHINE</button>
          </div>
        </div>
      </section>

      <section className="container market-section">
        <div className="market-section-head">
          <div>
            <h2>Available machines</h2>
            <p>Marketplace preview for contractors who need equipment after winning or preparing bids.</p>
          </div>
          <Link className="get-started-button" href="/publish">List equipment</Link>
        </div>
        <div className="machine-grid">
          {equipment.map((item) => (
            <article className="machine-card" key={item.name}>
              <div className="machine-icon"><Truck size={30} /></div>
              <h3>{item.name}</h3>
              <p>{item.owner}</p>
              <div className="machine-meta">
                <span><MapPin size={16} /> {item.location}</span>
                <span><ShieldCheck size={16} /> {item.type}</span>
                <span><CalendarDays size={16} /> Available now</span>
              </div>
              <div className="machine-footer">
                <strong>{item.rate}</strong>
                <button type="button">
                  Request
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
