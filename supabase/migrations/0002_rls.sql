-- Yana Travels — Row Level Security
-- STATUS: DRAFT — not yet applied. See docs/DATABASE_SCHEMA.md §4.
-- Model: anon may read only published+active public content (packages also require verified);
--        anon may INSERT enquiries only; all other writes require an active admin.

-- Enable RLS everywhere.
do $$
declare t text;
begin
  foreach t in array array[
    'admin_users','categories','destinations','services','tour_packages',
    'package_itinerary','package_departures','package_media','hero_banners',
    'home_sections','about_page','gallery_albums','gallery_images','testimonials',
    'brochures','enquiries','site_settings','seo_meta','contact_info','audit_log'
  ]
  loop
    execute format('alter table %I enable row level security', t);
  end loop;
end $$;

-- ── Public read policies (published + active) ────────────────────────────────
create policy "public read published categories" on categories
  for select using (status = 'published' and is_active);
create policy "public read published destinations" on destinations
  for select using (status = 'published' and is_active);
create policy "public read published services" on services
  for select using (status = 'published' and is_active);

-- Packages additionally require verified content before they are visible.
create policy "public read verified packages" on tour_packages
  for select using (status = 'published' and is_active and review_status = 'verified');

-- Child rows visible only when their parent package is publicly visible.
create policy "public read itinerary of visible packages" on package_itinerary
  for select using (exists (
    select 1 from tour_packages p where p.id = package_id
      and p.status = 'published' and p.is_active and p.review_status = 'verified'));
create policy "public read departures of visible packages" on package_departures
  for select using (is_active and exists (
    select 1 from tour_packages p where p.id = package_id
      and p.status = 'published' and p.is_active and p.review_status = 'verified'));
create policy "public read media of visible packages" on package_media
  for select using (is_active and exists (
    select 1 from tour_packages p where p.id = package_id
      and p.status = 'published' and p.is_active and p.review_status = 'verified'));

create policy "public read hero" on hero_banners
  for select using (status = 'published' and is_active);
create policy "public read home sections" on home_sections
  for select using (is_active);
create policy "public read about" on about_page
  for select using (status = 'published');
create policy "public read albums" on gallery_albums
  for select using (status = 'published' and is_active);
create policy "public read images" on gallery_images
  for select using (is_active and exists (
    select 1 from gallery_albums a where a.id = album_id
      and a.status = 'published' and a.is_active));
create policy "public read testimonials" on testimonials
  for select using (status = 'published' and is_active);
create policy "public read brochures" on brochures
  for select using (is_active);
create policy "public read settings" on site_settings for select using (true);
create policy "public read seo" on seo_meta for select using (true);
create policy "public read contact" on contact_info
  for select using (is_active);

-- ── Enquiries: anon may INSERT only; admins read/update ──────────────────────
create policy "anyone can submit enquiry" on enquiries
  for insert with check (true);
create policy "admins read enquiries" on enquiries
  for select using (is_admin());
create policy "admins update enquiries" on enquiries
  for update using (is_admin()) with check (is_admin());

-- ── Admin full-access policies (all content tables) ──────────────────────────
do $$
declare t text;
begin
  foreach t in array array[
    'categories','destinations','services','tour_packages','package_itinerary',
    'package_departures','package_media','hero_banners','home_sections','about_page',
    'gallery_albums','gallery_images','testimonials','brochures','site_settings',
    'seo_meta','contact_info'
  ]
  loop
    execute format($f$
      create policy "admins manage %1$s" on %1$s
        for all using (is_admin()) with check (is_admin())
    $f$, t);
  end loop;
end $$;

-- ── admin_users & audit_log ──────────────────────────────────────────────────
-- Admins can read the admin roster; only super_admins manage it.
create policy "admins read roster" on admin_users
  for select using (is_admin());
create policy "super_admins manage roster" on admin_users
  for all using (exists (
    select 1 from admin_users me where me.id = auth.uid()
      and me.is_active and me.role = 'super_admin'))
  with check (exists (
    select 1 from admin_users me where me.id = auth.uid()
      and me.is_active and me.role = 'super_admin'));

create policy "admins read audit" on audit_log
  for select using (is_admin());

-- NOTE: rate-limiting of anon enquiry inserts is enforced at the app/edge layer,
-- not in RLS.
