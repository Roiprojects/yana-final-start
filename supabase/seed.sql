-- Yana Travels — seed (CONFIRMED data only)
-- STATUS: DRAFT — not yet applied. Only facts verified from the live-site audit are here.
-- No prices, dates, hotels, or itineraries — those await the trip-package PDFs.
-- Rows are inserted as 'draft' so an admin reviews before anything goes live.

-- ── Services (11, confirmed list; copy still to be supplied) ──────────────────
insert into services (name, slug, sort_order, status, is_active) values
  ('Bike Trips',            'bike-trips',            10, 'draft', true),
  ('Honeymoon Packages',    'honeymoon-packages',    20, 'draft', true),
  ('Historic Destinations', 'historic-destinations', 30, 'draft', true),
  ('Pilgrimage Packages',   'pilgrimage-packages',   40, 'draft', true),
  ('MICE',                  'mice',                  50, 'draft', true),
  ('Cruises',               'cruises',               60, 'draft', true),
  ('Children''s Programme', 'childrens-programme',   70, 'draft', true),
  ('Flight Booking',        'flight-booking',        80, 'draft', true),
  ('Visa',                  'visa',                  90, 'draft', true),
  ('Forex',                 'forex',                100, 'draft', true),
  ('Hotel Booking',         'hotel-booking',        110, 'draft', true)
on conflict (slug) do nothing;

-- ── Offices (confirmed; NO bank details) ─────────────────────────────────────
insert into contact_info (office_name, address, city, pincode, is_active, sort_order) values
  ('Bengaluru',
   '#20, 3rd Floor, 8th Cross, Sampige Road, Malleshwaram (near Asha Sweet Center)',
   'Bengaluru', '560003', true, 10),
  ('Udupi',
   '#4-153, Ramnath Building, Near Upavana Nursery, Hayagreeva Nagar, Kunjibettu Post',
   'Udupi', '576102', true, 20);

-- Destinations, categories, and packages are intentionally NOT seeded here —
-- they are created from validated trip-package PDFs (see docs/PDF_EXTRACTION_REPORT.md).
