-- Phase 6: conversion engine tables

create table if not exists public.watch_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  watch_id uuid references public.watches(id) on delete set null,
  watch_slug text,
  watch_reference text,
  customer_name text not null,
  email text not null,
  phone text,
  message text,
  source_page text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

create index if not exists watch_inquiries_status_idx on public.watch_inquiries (status);
create index if not exists watch_inquiries_created_at_idx on public.watch_inquiries (created_at desc);
create index if not exists watch_inquiries_email_idx on public.watch_inquiries (email);

create table if not exists public.sell_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submission_type text not null check (submission_type in ('sell', 'trade')),
  customer_name text not null,
  email text not null,
  phone text,
  brand text not null,
  model text not null,
  reference_number text,
  condition text not null check (condition in ('Unworn', 'Excellent', 'Very Good', 'Good')),
  year integer,
  box boolean not null default false,
  papers boolean not null default false,
  asking_price numeric(12,2),
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

create index if not exists sell_submissions_status_idx on public.sell_submissions (status);
create index if not exists sell_submissions_type_idx on public.sell_submissions (submission_type);
create index if not exists sell_submissions_created_at_idx on public.sell_submissions (created_at desc);
create index if not exists sell_submissions_email_idx on public.sell_submissions (email);
