-- Phase 2: Watch inventory foundation
-- Run this in Supabase SQL editor (or via migration tooling) before enabling live inventory reads.

create extension if not exists pgcrypto;

create table if not exists public.watches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  brand text not null,
  model text not null,
  reference_number text not null,
  price numeric(12,2) not null check (price >= 0),
  status text not null check (status in ('in_stock', 'reserved', 'sold')),
  condition text not null check (condition in ('Unworn', 'Excellent', 'Very Good', 'Good')),
  year integer not null check (year >= 1900 and year <= 2100),
  "box" boolean not null default false,
  papers boolean not null default false,
  description text not null,
  slug text not null,
  featured boolean not null default false,
  movement text not null,
  case_size text not null,
  material text not null,
  dial_color text not null,
  bracelet_strap text not null,
  sku text not null,
  visibility text not null default 'public' check (visibility in ('public', 'private'))
);

create unique index if not exists watches_slug_key on public.watches (slug);
create unique index if not exists watches_sku_key on public.watches (sku);
create index if not exists watches_visibility_status_idx on public.watches (visibility, status);
create index if not exists watches_featured_visibility_idx on public.watches (featured, visibility);
create index if not exists watches_brand_idx on public.watches (brand);

create table if not exists public.watch_images (
  id uuid primary key default gen_random_uuid(),
  watch_id uuid not null references public.watches(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists watch_images_watch_id_idx on public.watch_images (watch_id);
create index if not exists watch_images_sort_order_idx on public.watch_images (watch_id, sort_order);
create unique index if not exists watch_images_primary_per_watch_idx
  on public.watch_images (watch_id)
  where is_primary = true;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists watches_set_updated_at on public.watches;
create trigger watches_set_updated_at
before update on public.watches
for each row
execute procedure public.set_updated_at();
