-- Phase 4: storage metadata support for watch_images

alter table if exists public.watch_images
  add column if not exists storage_path text;

update public.watch_images
set storage_path = ''
where storage_path is null;

alter table if exists public.watch_images
  alter column storage_path set default '',
  alter column storage_path set not null;
