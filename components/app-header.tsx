import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

export function AppHeader() {
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
          <Link className="login-button" href="/login">Log in</Link>
          <Link className="get-started-button" href="/signup">Sign up</Link>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/signup">Sign up</Link>
        </nav>
      </div>
    </header>
  );
}
