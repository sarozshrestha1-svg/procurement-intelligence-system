# TenderWatch Nepal

A Vercel + Supabase tender notice listing platform inspired by Nepal tender portals. It includes searchable listings, category/province/source filters, tender detail pages, and a publisher form.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a free Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The public app reads tenders with the anon key. The publish form uses a server action with the service role key, so keep that key server-side only.

## Vercel deployment

1. Push this project to GitHub.
2. Import it in Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Deploy.

## Next features to add

- User accounts and saved tenders
- Email/SMS tender alerts
- Publisher review queue
- CSV import for newspaper notices
- Supabase storage for notice PDFs and scanned images
