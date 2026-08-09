// One-off: apply schema.sql and seed the client's Postgres.
// Run: node --env-file=.env.local db/setup.mjs
import pg from "pg";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

// 1. Schema
await client.query(fs.readFileSync(path.join(dir, "schema.sql"), "utf8"));
console.log("schema applied");

// 2. Packages (from the PDF-extracted catalogue)
const pkgs = JSON.parse(
  fs.readFileSync(path.join(dir, "../src/lib/data/packages.generated.json"), "utf8"),
);
let n = 0;
for (const [i, p] of pkgs.entries()) {
  await client.query(
    `insert into tour_packages
      (title, slug, scope, tour_type, group_subtype, category_name, destination_name, country,
       duration_days, duration_nights, overview, highlights, itinerary, inclusions, exclusions,
       price_amount, price_currency, taxes_info, hero_image_url, is_featured, source_pdf, source_pages,
       review_status, status, is_active, sort_order)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13::jsonb,$14::jsonb,$15::jsonb,
       $16,$17,$18,$19,$20,$21,$22,'verified','published',true,$23)
     on conflict (slug) do update set
       title=excluded.title, scope=excluded.scope, tour_type=excluded.tour_type,
       group_subtype=excluded.group_subtype, category_name=excluded.category_name,
       destination_name=excluded.destination_name, country=excluded.country,
       duration_days=excluded.duration_days, duration_nights=excluded.duration_nights,
       overview=excluded.overview, highlights=excluded.highlights, itinerary=excluded.itinerary,
       inclusions=excluded.inclusions, exclusions=excluded.exclusions, price_amount=excluded.price_amount,
       taxes_info=excluded.taxes_info, hero_image_url=excluded.hero_image_url,
       is_featured=excluded.is_featured, source_pdf=excluded.source_pdf, source_pages=excluded.source_pages,
       sort_order=excluded.sort_order, updated_at=now()`,
    [
      p.package_title, p.slug, p.scope, p.tour_type, p.group_subtype, p.category_name,
      p.destination_name, p.country, p.duration_days, p.duration_nights, p.overview,
      JSON.stringify(p.highlights ?? []), JSON.stringify(p.itinerary ?? []),
      JSON.stringify(p.inclusions ?? []), JSON.stringify(p.exclusions ?? []),
      p.price_amount, p.price_currency ?? "INR", p.taxes_info, p.hero_image_url,
      !!p.is_featured, p.source_pdf, p.source_pages, i * 10,
    ],
  );
  n++;
}
console.log("packages seeded:", n);

// 3. Services (confirmed list)
const services = [
  "Bike Trips", "Honeymoon Packages", "Historic Destinations", "Pilgrimage Packages",
  "MICE", "Cruises", "Children's Programme", "Flight Booking", "Visa", "Forex", "Hotel Booking",
];
for (const [i, name] of services.entries()) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  await client.query(
    `insert into services (name, slug, sort_order) values ($1,$2,$3)
     on conflict (slug) do update set name=excluded.name, sort_order=excluded.sort_order`,
    [name, slug, i * 10],
  );
}
console.log("services seeded:", services.length);

// 4. Offices (updated list)
await client.query("delete from contact_info");
const offices = [
  ["Udupi", "Corporate Office, Udupi", "Udupi", "576101"],
  ["Bengaluru", "#20, 3rd Floor, S L Plaza, 8th Cross Sampige Road, Malleshwaram", "Bengaluru", "560003"],
  ["Hubli", "#45, 3rd Floor, Satellite Complex, Koppikar Road", "Hubli", "580020"],
];
for (const [i, o] of offices.entries()) {
  await client.query(
    `insert into contact_info (office_name, address, city, pincode, sort_order) values ($1,$2,$3,$4,$5)`,
    [o[0], o[1], o[2], o[3], i * 10],
  );
}
console.log("offices seeded:", offices.length);

// 5. Destinations
const destinations = [
  ["Europe", "europe", "international", "Multiple", "Multicountry European holiday packages", "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1280", true],
  ["Bali", "bali", "international", "Indonesia", "Tropical beach and cultural paradise", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1280", true],
  ["Uttarakhand", "uttarakhand", "domestic", "India", "Himalayan pilgrimages and mountain escapes", "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1280", true],
  ["South Africa", "south-africa", "international", "South Africa", "Wildlife safaris and scenic coastlines", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1280", true],
  ["Australia", "australia", "international", "Australia", "Iconic cities, nature and coastal adventures", "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1280", true],
  ["Vietnam", "vietnam", "international", "Vietnam", "Halong Bay cruises and rich heritage", "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1280", true],
  ["Singapore & Malaysia", "singapore-malaysia", "international", "Singapore", "Modern wonders and island leisure", "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1280", true],
  ["Andaman", "andaman", "domestic", "India", "Pristine beaches and crystal blue waters", "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1280", true],
];
for (const [i, d] of destinations.entries()) {
  await client.query(
    `insert into destinations (name, slug, scope, country, description, image_url, is_featured, sort_order)
     values ($1,$2,$3,$4,$5,$6,$7,$8)
     on conflict (slug) do update set name=excluded.name, description=excluded.description, image_url=excluded.image_url`,
    [d[0], d[1], d[2], d[3], d[4], d[5], d[6], i * 10],
  );
}
console.log("destinations seeded:", destinations.length);

// 6. Testimonials
await client.query("delete from testimonials");
const testimonials = [
  ["Rajesh Kumar", "Bengaluru", 5, "Our European family holiday planned by Yana Travels was unforgettable. Every stay and transfer was seamless!"],
  ["Priya Sharma", "Mumbai", 5, "The customized Bali honeymoon package exceeded all our expectations. Personal assistance 24/7!"],
  ["Ananya Verma", "Delhi", 5, "Chardham Yatra by helicopter was arranged effortlessly. Caring staff and top-tier hospitality."],
];
for (const [i, t] of testimonials.entries()) {
  await client.query(
    `insert into testimonials (customer_name, location, rating, review, sort_order)
     values ($1,$2,$3,$4,$5)`,
    [t[0], t[1], t[2], t[3], i * 10],
  );
}
console.log("testimonials seeded:", testimonials.length);

// 7. FAQs
await client.query("delete from faqs");
const faqs = [
  ["How do I book a trip with Yana Travels?", "Send us an enquiry via the website form or message us on WhatsApp with your destination preferences, dates, and budget. Our travel advisors will reach out immediately."],
  ["Do you offer customized itineraries?", "Yes! Alongside our popular group departures, we specialize in tailor-made private tours crafted around your specific dates, interests, and hotel choices."],
  ["Which destinations do you cover?", "We cover both domestic travel across India (Himalayas, Kerala, Goa, Andaman, etc.) and international destinations (Europe, Bali, Thailand, Vietnam, Australia, South Africa, and more)."],
  ["Can you handle flights, visa, and hotel bookings?", "Yes. We manage flight tickets, visa documentation and processing, forex, and hotel bookings end to end."],
];
for (const [i, f] of faqs.entries()) {
  await client.query(
    `insert into faqs (question, answer, sort_order) values ($1,$2,$3)`,
    [f[0], f[1], i * 10],
  );
}
console.log("faqs seeded:", faqs.length);

const counts = await client.query(
  `select (select count(*) from tour_packages) packages,
          (select count(*) from services) services,
          (select count(*) from contact_info) offices,
          (select count(*) from destinations) destinations,
          (select count(*) from testimonials) testimonials,
          (select count(*) from faqs) faqs`,
);
console.log("DB counts:", counts.rows[0]);
await client.end();

