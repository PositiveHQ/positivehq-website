# Positive Watch Co. Website

Phase 1 foundation for a Next.js 14 luxury watch dealer website.

## Current stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase client scaffolding (no live database queries yet)

## What this phase sets up
- Typed domain models for inventory, images, blog posts, and lead submissions
- Supabase browser/server utility clients under `lib/supabase/`
- Mock-first repository layer under `lib/repositories/` so data can move from local arrays to Supabase without rewriting page components
- Environment variable template in `.env.example`

## Quick setup
1. Copy environment template:
   - `cp .env.example .env.local`
2. Fill in Supabase values from your Supabase project dashboard.
3. Install dependencies:
   - `npm install`
4. Run locally:
   - `npm run dev`

## Dependency install troubleshooting (403 errors)
If `npm install` returns `403 Forbidden`, run these checks on your machine:

1. Verify npm registry:
   - `npm config get registry`
   - Expected: `https://registry.npmjs.org/`
2. Reset registry explicitly:
   - `npm config set registry https://registry.npmjs.org/`
3. Check proxy settings:
   - `npm config list -l | grep -E "proxy|registry"`
   - `env | grep -i proxy`
4. If your company/VPN proxy blocks npm, ask IT to allow:
   - `https://registry.npmjs.org/`
   - `https://registry.npmjs.org/@supabase/supabase-js`

In Codex/sandbox environments, `403` can come from platform-level outbound policy even when your project config is correct.

## Vercel install/deploy setup
1. Import this repo into Vercel.
2. Build command: `npm run build`
3. Install command: `npm install` (default)
4. Framework preset: `Next.js`
5. Add environment variables in Vercel Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Redeploy after env vars are saved.

## Notes for operators (non-technical)
- You do **not** need to edit code yet to keep the site online in this phase.
- Real inventory/blog management is not enabled yet; the site still uses mock data.
- The new structure is ready for the next phase where inventory and blog entries move into Supabase tables.

## Planned next phase
- Create Supabase tables + migrations for watches, watch_images, blog_posts, inquiries, and sell_submissions
- Replace repository mock returns with live Supabase reads/writes
- Add basic protected admin workflows for inventory updates

## Supabase inventory manual setup (Phase 2)
Before live inventory reads can work, run the SQL migration:

1. Open Supabase project dashboard.
2. Go to **SQL Editor**.
3. Run `supabase/migrations/0001_watch_inventory.sql`.
4. Insert at least one row into `watches` and related rows into `watch_images`.
5. Ensure each watch intended for storefront has:
   - `visibility = 'public'`
   - valid `slug`
   - at most one `watch_images.is_primary = true`

The app will automatically fall back to local mock data when:
- Supabase environment keys are missing, or
- live query fails, or
- live query returns zero rows.

## Admin portal (Phase 3)
Internal routes:
- `/admin/login`
- `/admin/watches`
- `/admin/watches/new`
- `/admin/watches/[id]/edit`

What operators can do:
- list watches
- create watch
- edit watch
- delete watch
- update status / featured / visibility

### Manual setup required
1. Set `ADMIN_PORTAL_PASSWORD` in your environment.
2. Ensure Supabase keys are configured (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
3. Ensure Phase 2 migration has been run (`supabase/migrations/0001_watch_inventory.sql`).

### Current protection model (temporary)
- Admin access is protected by password + signed, expiring HTTP-only cookie sessions.
- This is intentionally minimal for internal operations.
- Phase 5 should harden auth further with proper user identities/roles (e.g., Supabase Auth/SSO) and audit logging.

## Admin image uploads + hardening (Phase 4)
### What changed
- Admin watch edit now supports:
  - uploading gallery images
  - setting primary image
  - removing image records
- Upload flow stores files in Supabase Storage and writes rows to `watch_images`.
- Session cookies are now signed and expiring (12-hour TTL) using `ADMIN_SESSION_SECRET`.

### Manual Supabase setup required
1. Create a storage bucket named `watch-images` (or set `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` to your bucket name).
2. Mark bucket as public if you want direct public image URLs.
3. Run migration `supabase/migrations/0002_watch_images_storage.sql`.
4. Ensure service role key is available server-side for admin write operations.

### Environment variables required for Phase 4
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`
- `ADMIN_PORTAL_PASSWORD`
- `ADMIN_SESSION_SECRET`

### Constraints / limits
- Admin upload currently stores one file per request.
- Upload accepts only `image/*` files.
- Gallery order is append-by-upload (simple `sort_order` increment).

### Deferred to Phase 5
- Full Supabase Auth/SSO user model and role policies.
- Audit trail for admin actions.
- Bulk uploads, drag-and-drop ordering, and richer media tooling.

## Blog CMS with Sanity (Phase 5)
### What this phase adds
- Replaces mock-first blog fetch path with Sanity-first fetch + mock fallback.
- Adds Sanity schemas for:
  - `post` (blog post)
  - `author` (optional)
- Adds Studio route at `/studio` for content editing.

### Sanity content fields in `post`
- title
- slug
- excerpt
- cover image
- publish date
- SEO title
- SEO description
- rich content body (Portable Text)
- optional author reference

### Manual setup steps
1. Create a Sanity project and dataset.
2. Set environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - optional `SANITY_API_READ_TOKEN`
3. Ensure schemas in `sanity/schemaTypes/` are deployed with your Sanity Studio setup.
4. Create/publish posts in Studio (`/studio`) or your connected Sanity Studio environment.
5. Published posts will appear on `/blog`; unpublished drafts are not shown in public pages.

### Non-technical operator publishing flow
1. Open `/studio`.
2. Create a new **Blog Post** document.
3. Fill title, slug, excerpt, cover image, publish date, SEO fields, and body content.
4. (Optional) link an author.
5. Publish the post.
6. Confirm it appears on `/blog` and opens correctly at `/blog/[slug]`.

### Deferred to Phase 6
- Blog category/tag taxonomy.
- Editorial workflow states (review/approval).
- Scheduled publishing and preview workflow.

## Conversion Engine (Phase 6)
### What this phase adds
- Real Supabase-backed submission storage for:
  - watch inquiries
  - sell submissions
  - trade submissions
- Public form wiring moved from mock-only behavior to server actions + repository writes.
- User-friendly form validation and success/error feedback states.

### New Supabase tables
Run migration:
- `supabase/migrations/0003_conversion_submissions.sql`

Tables created:
- `watch_inquiries`
- `sell_submissions`

### Where operators find leads
In Supabase dashboard:
1. Open **Table Editor**
2. Review:
   - `public.watch_inquiries`
   - `public.sell_submissions`
3. Filter by `status = 'new'` for fresh inbound leads.

### Public forms now storing data
- Watch detail inquiry form on `/watches/[slug]`
- Sell form on `/sell`
- Trade form on `/trade-in`

### Deferred to Phase 7
- CRM sync/webhooks
- Email automations/notifications
- Lead assignment workflows

## SEO + Trust + Production Polish (Phase 7)
### What this phase adds
- Improved metadata coverage across key public pages.
- Dynamic metadata for watch detail and blog article pages.
- Open Graph improvements and canonical URLs.
- Structured data (JSON-LD) for:
  - Organization (home)
  - Product (watch detail)
  - Article (blog detail)
- Added `robots` and dynamic `sitemap`.
- Added trust/credibility support page at `/about` and improved confidence copy.

### Manual production steps
1. Set `NEXT_PUBLIC_SITE_URL` to your real production domain (required for canonical URLs, sitemap, and structured data URLs).
2. Verify `https://your-domain.com/robots.txt` and `https://your-domain.com/sitemap.xml` after deploy.
3. Submit sitemap URL to Google Search Console.
4. Validate structured data with Google Rich Results Test for:
   - home
   - a watch detail page
   - a blog article page

### Deferred to Phase 8
- Advanced technical SEO audits (Core Web Vitals tuning, deep schema expansion).
- Multi-locale SEO if international rollout is needed.
- Automated monitoring/alerting for SEO regressions.
- Test commit to trigger Vercel deployment
