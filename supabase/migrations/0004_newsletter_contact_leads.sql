-- Launch lead capture tables

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  source_page text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'unsubscribed'))
);

create index if not exists newsletter_subscribers_status_idx on public.newsletter_subscribers (status);
create index if not exists newsletter_subscribers_created_at_idx on public.newsletter_subscribers (created_at desc);
create unique index if not exists newsletter_subscribers_email_unique_idx on public.newsletter_subscribers (lower(email));

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  source_page text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

create index if not exists contact_submissions_status_idx on public.contact_submissions (status);
create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);
create index if not exists contact_submissions_email_idx on public.contact_submissions (email);
