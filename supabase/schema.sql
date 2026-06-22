create extension if not exists "pgcrypto";

create table if not exists public.tenders (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  organization text not null,
  category text not null,
  procurement_type text not null check (procurement_type in ('Works', 'Goods', 'Consultancy', 'Services')),
  province text not null,
  district text,
  source text not null check (source in ('PPMO', 'National Newspaper', 'Local Newspaper', 'Private E-Bid')),
  budget numeric,
  bid_fee numeric,
  published_at date not null default current_date,
  deadline date not null,
  status text not null default 'open' check (status in ('open', 'closing_soon', 'closed', 'awarded')),
  summary text not null,
  description text not null default '',
  contact_email text,
  contact_phone text,
  document_url text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tenders enable row level security;

drop policy if exists "Anyone can read tender notices" on public.tenders;
create policy "Anyone can read tender notices"
  on public.tenders for select
  using (true);

create index if not exists tenders_deadline_idx on public.tenders (deadline);
create index if not exists tenders_category_idx on public.tenders (category);
create index if not exists tenders_province_idx on public.tenders (province);
create index if not exists tenders_district_idx on public.tenders (district);
create index if not exists tenders_source_idx on public.tenders (source);

insert into public.tenders (
  title,
  slug,
  organization,
  category,
  procurement_type,
  province,
  district,
  source,
  budget,
  bid_fee,
  published_at,
  deadline,
  status,
  summary,
  description,
  contact_email,
  contact_phone,
  document_url,
  is_featured
) values
(
  'Upgrading of Rural Road and Drainage Works',
  'upgrading-rural-road-drainage-works',
  'Infrastructure Development Office, Lalitpur',
  'Roads & Bridges',
  'Works',
  'Bagmati',
  'Lalitpur',
  'PPMO',
  42000000,
  5000,
  '2026-06-18',
  '2026-07-09',
  'open',
  'Road surface improvement, side drains, retaining walls, and associated civil works for a rural corridor.',
  'Eligible contractors are invited to submit electronic bids for road surface improvement, side drain construction, retaining wall protection, and related civil works.',
  'procurement@idolalitpur.gov.np',
  '01-5550123',
  'https://bolpatra.gov.np',
  true
) on conflict (slug) do nothing;
