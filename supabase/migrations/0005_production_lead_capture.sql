-- Phase 8: production lead capture fields and locked-down RLS

-- Server actions write with the service-role key. Public anon clients should not be
-- able to read lead records, and direct public inserts are intentionally not used.

alter table public.watch_inquiries
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists desired_brand text,
  add column if not exists desired_model_reference text,
  add column if not exists budget_range text,
  add column if not exists timeline text,
  add column if not exists form_name text not null default 'Request a Watch',
  add column if not exists lead_payload jsonb not null default '{}'::jsonb;

alter table public.sell_submissions
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists box_papers_status text,
  add column if not exists desired_outcome text,
  add column if not exists source_page text,
  add column if not exists form_name text not null default 'Watch Review',
  add column if not exists lead_payload jsonb not null default '{}'::jsonb;

create index if not exists watch_inquiries_form_name_idx on public.watch_inquiries (form_name);
create index if not exists sell_submissions_form_name_idx on public.sell_submissions (form_name);
create index if not exists sell_submissions_desired_outcome_idx on public.sell_submissions (desired_outcome);

alter table public.watch_inquiries enable row level security;
alter table public.sell_submissions enable row level security;
alter table public.newsletter_signups enable row level security;

-- No anon read/update/delete policies are created. Server-side writes use the
-- Supabase service role, which bypasses RLS and is never exposed to the browser.
