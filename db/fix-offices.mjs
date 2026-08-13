// Idempotent fix: ensure all 3 offices exist and are active in production.
// Safe to re-run — checks by office_name before inserting.
// Run: node --env-file=.env db/fix-offices.mjs
import pg from "pg";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const offices = [
  { office_name: "Udupi",     address: "Corporate Office, Udupi",                                          city: "Udupi",     pincode: "576101", sort_order: 0  },
  { office_name: "Bengaluru", address: "#20, 3rd Floor, S L Plaza, 8th Cross Sampige Road, Malleshwaram", city: "Bengaluru", pincode: "560003", sort_order: 10 },
  { office_name: "Hubli",     address: "#45, 3rd Floor, Satellite Complex, Koppikar Road",                city: "Hubli",     pincode: "580020", sort_order: 20 },
];

for (const o of offices) {
  const { rows } = await client.query(
    `select id from contact_info where lower(office_name) = lower($1) limit 1`,
    [o.office_name],
  );
  if (rows.length > 0) {
    await client.query(
      `update contact_info set address=$1, city=$2, pincode=$3, sort_order=$4, is_active=true where id=$5`,
      [o.address, o.city, o.pincode, o.sort_order, rows[0].id],
    );
    console.log("updated:", o.office_name);
  } else {
    await client.query(
      `insert into contact_info (office_name, address, city, pincode, sort_order, is_active)
       values ($1, $2, $3, $4, $5, true)`,
      [o.office_name, o.address, o.city, o.pincode, o.sort_order],
    );
    console.log("inserted:", o.office_name);
  }
}

const { rows: all } = await client.query(
  `select office_name, city, is_active from contact_info order by sort_order`,
);
console.log("\nAll offices in DB:");
all.forEach((r) => console.log(` ${r.is_active ? "✓" : "✗"} ${r.office_name} (${r.city})`));
await client.end();
