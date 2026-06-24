#!/usr/bin/env node
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.bridgehub") });

const tables = [
  "users",
  "sessions",
  "responses",
  "scores",
  "bookings",
  "magic_links",
  "safety_flags",
];

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("Missing Supabase env vars in .env.bridgehub");
    process.exit(1);
  }

  const admin = createClient(url, key);
  let ok = 0;

  for (const table of tables) {
    const { error } = await admin.from(table).select("*").limit(1);
    if (error) {
      console.log(`✗ ${table}: ${error.message}`);
    } else {
      console.log(`✓ ${table}`);
      ok += 1;
    }
  }

  const { data: buckets } = await admin.storage.listBuckets();
  const reports = buckets?.find((b) => b.id === "reports");
  console.log(reports ? "✓ storage bucket reports" : "✗ storage bucket reports missing");

  process.exit(ok === tables.length && reports ? 0 : 1);
}

main();
