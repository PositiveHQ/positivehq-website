# Supabase Launch Checklist

Run this checklist before enabling production lead capture. Do not expose service role keys in browser code or public logs.

## Required Tables

### `sell_submissions`
- Purpose: sell and trade-in lead intake.
- Expected public insert fields: `submission_type`, `customer_name`, `email`, `phone`, `brand`, `model`, `reference_number`, `condition`, `year`, `box`, `papers`, `asking_price`, `notes`, `status`.
- Public users may insert rows only.
- Public users must not read, update, or delete rows.
- Admin read/update access must be restricted to trusted server-side code or authenticated admin roles.

### `watch_inquiries`
- Purpose: product-detail inquiries.
- Expected public insert fields: `watch_id`, `watch_slug`, `watch_reference`, `customer_name`, `email`, `phone`, `message`, `source_page`, `status`.
- Public users may insert rows only.
- Public users must not read, update, or delete rows.
- Admin read/update access must be restricted to trusted server-side code or authenticated admin roles.

### `newsletter_subscribers`
- Purpose: newsletter signup storage.
- Suggested columns: `id uuid primary key default gen_random_uuid()`, `created_at timestamptz default now()`, `email text not null`, `source_page text not null`, `status text not null default 'new'`.
- Add a unique index on normalized email if duplicate prevention is required.
- Public users may insert rows only.
- Public users must not read, update, or delete rows.
- Admin read/update access must be restricted to trusted server-side code or authenticated admin roles.

### `contact_submissions`
- Purpose: contact page lead intake.
- Suggested columns: `id uuid primary key default gen_random_uuid()`, `created_at timestamptz default now()`, `customer_name text not null`, `email text not null`, `phone text`, `subject text`, `message text not null`, `source_page text not null`, `status text not null default 'new'`.
- Public users may insert rows only.
- Public users must not read, update, or delete rows.
- Admin read/update access must be restricted to trusted server-side code or authenticated admin roles.

## RLS Policy Plan

Enable RLS on every lead table:

```sql
alter table public.sell_submissions enable row level security;
alter table public.watch_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_submissions enable row level security;
```

Public inserts should be the only anonymous public action:

```sql
create policy "Public can insert sell submissions"
on public.sell_submissions for insert
to anon
with check (true);

create policy "Public can insert watch inquiries"
on public.watch_inquiries for insert
to anon
with check (true);

create policy "Public can insert newsletter subscribers"
on public.newsletter_subscribers for insert
to anon
with check (true);

create policy "Public can insert contact submissions"
on public.contact_submissions for insert
to anon
with check (true);
```

Do not create anonymous `select`, `update`, or `delete` policies for lead tables.

Admin access options:
- Preferred: Supabase Auth with an `admin` role claim and policies limited to that role.
- Acceptable for the current server-action model: keep reads/writes behind server-only code using `SUPABASE_SERVICE_ROLE_KEY`, and never expose that key client-side.

## Operational Notes

- Confirm Vercel has `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
- Confirm `SUPABASE_SERVICE_ROLE_KEY` is server-only and never prefixed with `NEXT_PUBLIC_`.
- Test each public form in Vercel Preview before production.
- Review spam volume after launch; the app includes basic honeypot and in-memory rate limiting, but production may need Turnstile or edge-backed rate limiting.
