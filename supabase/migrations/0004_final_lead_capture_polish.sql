-- Phase 7: final lead capture polish

-- Allow consignment-specific lead records in the shared sell/trade submission table.
do $$
begin
  alter table public.sell_submissions drop constraint if exists sell_submissions_submission_type_check;
  alter table public.sell_submissions
    add constraint sell_submissions_submission_type_check
    check (submission_type in ('sell', 'trade', 'consignment'));
end $$;

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  source_page text not null default '/newsletter',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

create index if not exists newsletter_signups_status_idx on public.newsletter_signups (status);
create index if not exists newsletter_signups_created_at_idx on public.newsletter_signups (created_at desc);
