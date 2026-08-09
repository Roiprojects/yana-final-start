-- Yana Travels — initial schema
-- Source of truth: docs/DATABASE_SCHEMA.md
-- STATUS: DRAFT — not yet applied to any project (awaiting real Supabase credentials).
-- Apply with the Supabase CLI / MCP once the client project exists.

-- ── Extensions ────────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";      -- gen_random_uuid()

-- ── Enums ─────────────────────────────────────────────────────────────────────
create type tour_scope         as enum ('domestic', 'international');
create type tour_type          as enum ('group', 'customized');
create type group_subtype      as enum ('standard', 'kitchen_staff');
create type content_status     as enum ('draft', 'published');
create type review_status      as enum ('pending', 'in_review', 'verified');
create type departure_status   as enum ('open', 'closed', 'soldout');
create type enquiry_type       as enum ('general', 'customized');
create type enquiry_status     as enum ('new', 'contacted', 'closed');
create type admin_role         as enum ('super_admin', 'editor');

-- ── Helper: updated_at trigger ────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ── Helper: is the current user an active admin? ─────────────────────────────
create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from admin_users
    where id = auth.uid() and is_active = true
  );
$$;

-- ── admin_users (profile + role over auth.users) ─────────────────────────────
create table admin_users (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        admin_role not null default 'editor',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ── categories ────────────────────────────────────────────────────────────────
create table categories (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  description   text,
  icon          text,
  hero_image_url text,
  sort_order    int not null default 0,
  is_active     boolean not null default true,
  status        content_status not null default 'draft',
  created_by    uuid references auth.users(id),
  updated_by    uuid references auth.users(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── destinations ─────────────────────────────────────────────────────────────
create table destinations (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  state         text,
  country       text,
  scope         tour_scope not null,
  hero_image_url text,
  description   text,
  sort_order    int not null default 0,
  is_active     boolean not null default true,
  status        content_status not null default 'draft',
  created_by    uuid references auth.users(id),
  updated_by    uuid references auth.users(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── services ──────────────────────────────────────────────────────────────────
create table services (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  description   text,
  icon          text,
  image_url     text,
  sort_order    int not null default 0,
  is_active     boolean not null default true,
  status        content_status not null default 'draft',
  created_by    uuid references auth.users(id),
  updated_by    uuid references auth.users(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── tour_packages (core) ──────────────────────────────────────────────────────
create table tour_packages (
  id                 uuid primary key default gen_random_uuid(),
  title              text not null,
  slug               text not null unique,
  category_id        uuid references categories(id) on delete set null,
  destination_id     uuid references destinations(id) on delete set null,
  scope              tour_scope not null,
  tour_type          tour_type not null,
  group_subtype      group_subtype,
  duration_days      int,
  duration_nights    int,
  overview           text,
  highlights         jsonb,               -- string[]
  accommodation      text,                -- hotel names: CONFIRMED ONLY
  meals_info         text,
  transport_info     text,
  inclusions         jsonb,               -- string[]
  exclusions         jsonb,               -- string[]
  price_amount       numeric,             -- CONFIRMED ONLY
  price_currency     text not null default 'INR',
  taxes_info         text,
  pickup_location    text,
  drop_location      text,
  documents_required jsonb,               -- string[]
  visa_info          text,
  cancellation_policy text,
  terms              text,
  hero_image_url     text,
  is_featured        boolean not null default false,
  source_pdf         text,                -- provenance
  source_pages       text,
  review_status      review_status not null default 'pending',
  status             content_status not null default 'draft',
  is_active          boolean not null default true,
  sort_order         int not null default 0,
  created_by         uuid references auth.users(id),
  updated_by         uuid references auth.users(id),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  -- A package may only go live once its content is verified. Prevents invented data publishing.
  constraint publish_requires_verified
    check (status <> 'published' or review_status = 'verified')
);

create table package_itinerary (
  id          uuid primary key default gen_random_uuid(),
  package_id  uuid not null references tour_packages(id) on delete cascade,
  day_number  int not null,
  title       text,
  description text,
  meals       text,
  stay        text,
  sort_order  int not null default 0
);

create table package_departures (
  id             uuid primary key default gen_random_uuid(),
  package_id     uuid not null references tour_packages(id) on delete cascade,
  depart_date    date not null,
  return_date    date,
  seats_total    int,
  seats_available int,
  price_override numeric,
  status         departure_status not null default 'open',
  is_active      boolean not null default true
);

create table package_media (
  id          uuid primary key default gen_random_uuid(),
  package_id  uuid not null references tour_packages(id) on delete cascade,
  url         text not null,
  type        text not null default 'image',  -- 'image' | 'pdf'
  caption     text,
  sort_order  int not null default 0,
  is_active   boolean not null default true
);

-- ── Marketing / site config ──────────────────────────────────────────────────
create table hero_banners (
  id          uuid primary key default gen_random_uuid(),
  title       text,
  subtitle    text,
  image_url   text,
  cta_label   text,
  cta_href    text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  status      content_status not null default 'draft',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table home_sections (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique,
  title       text,
  body        text,
  config      jsonb,
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

create table about_page (
  id             uuid primary key default gen_random_uuid(),
  body_richtext  text,   -- NEEDS CLIENT CONFIRMATION (from brochure)
  mission        text,
  vision         text,
  images         jsonb,
  status         content_status not null default 'draft',
  updated_by     uuid references auth.users(id),
  updated_at     timestamptz not null default now()
);

create table gallery_albums (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  cover_url   text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  status      content_status not null default 'draft'
);

create table gallery_images (
  id          uuid primary key default gen_random_uuid(),
  album_id    uuid references gallery_albums(id) on delete cascade,
  url         text not null,
  caption     text,
  alt_text    text,
  sort_order  int not null default 0,
  is_active   boolean not null default true
);

create table testimonials (
  id             uuid primary key default gen_random_uuid(),
  author_name    text not null,
  author_location text,
  rating         int check (rating between 1 and 5),
  body           text not null,          -- REAL testimonials only
  avatar_url     text,
  is_active      boolean not null default true,
  status         content_status not null default 'draft',
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

create table brochures (
  id          uuid primary key default gen_random_uuid(),
  title       text,
  pdf_url     text not null,
  version     text,
  is_active   boolean not null default true,
  uploaded_by uuid references auth.users(id),
  created_at  timestamptz not null default now()
);

create table enquiries (
  id                   uuid primary key default gen_random_uuid(),
  type                 enquiry_type not null,
  name                 text not null,
  phone                text not null,
  email                text,
  destination_interest text,
  package_id           uuid references tour_packages(id) on delete set null,
  travellers           int,
  travel_date          date,
  budget_range         text,
  hotel_category       text,
  scope                tour_scope,
  message              text,
  status               enquiry_status not null default 'new',
  source               text,
  created_at           timestamptz not null default now()
);

create table site_settings (
  id             uuid primary key default gen_random_uuid(),
  logo_url       text,
  whatsapp_number text,
  phone          text,
  email          text,
  socials        jsonb,
  analytics      jsonb,
  brand_colors   jsonb,
  feature_flags  jsonb,
  updated_by     uuid references auth.users(id),
  updated_at     timestamptz not null default now()
);

create table seo_meta (
  id            uuid primary key default gen_random_uuid(),
  path          text not null unique,
  title         text,
  description   text,
  og_image_url  text,
  canonical     text,
  robots        text,
  updated_by    uuid references auth.users(id),
  updated_at    timestamptz not null default now()
);

create table contact_info (
  id          uuid primary key default gen_random_uuid(),
  office_name text not null,
  address     text,
  city        text,
  pincode     text,
  phone       text,
  email       text,
  hours       text,
  map_embed   text,
  sort_order  int not null default 0,
  is_active   boolean not null default true
  -- NOTE: deliberately no bank-detail columns. Never store/display publicly.
);

create table audit_log (
  id          uuid primary key default gen_random_uuid(),
  admin_id    uuid references admin_users(id) on delete set null,
  action      text not null,
  entity      text,
  entity_id   uuid,
  diff        jsonb,
  created_at  timestamptz not null default now()
);

-- ── updated_at triggers ───────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array[
    'categories','destinations','services','tour_packages','hero_banners',
    'home_sections','about_page','site_settings','seo_meta'
  ]
  loop
    execute format(
      'create trigger trg_%1$s_updated_at before update on %1$s
       for each row execute function set_updated_at()', t);
  end loop;
end $$;

-- ── Indexes ───────────────────────────────────────────────────────────────────
create index idx_packages_category      on tour_packages(category_id);
create index idx_packages_destination   on tour_packages(destination_id);
create index idx_packages_scope_type    on tour_packages(scope, tour_type);
create index idx_packages_visibility     on tour_packages(status, is_active, review_status);
create index idx_packages_featured       on tour_packages(is_featured);
create index idx_itinerary_package       on package_itinerary(package_id, day_number);
create index idx_departures_package      on package_departures(package_id, depart_date);
create index idx_media_package           on package_media(package_id);
create index idx_gallery_images_album    on gallery_images(album_id);
create index idx_enquiries_status        on enquiries(status, created_at);
