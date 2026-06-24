#!/usr/bin/env node
/**
 * Run supabase/migrations/001_initial_schema.sql against your Supabase database.
 *
 * Set DATABASE_URL in .env.bridgehub (Supabase → Settings → Database → URI).
 * Or set SUPABASE_DB_PASSWORD and we build a pooler URL from NEXT_PUBLIC_SUPABASE_URL.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.bridgehub") });

function getConnectionString() {
  if (process.env.DATABASE_URL?.trim()) {
    return process.env.DATABASE_URL.trim();
  }

  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");

  if (!password || !baseUrl) {
    return null;
  }

  const ref = new URL(baseUrl).hostname.split(".")[0];
  const region = process.env.SUPABASE_DB_REGION?.trim() || "eu-central-1";
  const encoded = encodeURIComponent(password);

  // Return first candidate; connectWithFallback tries aws-0 and aws-1 poolers.
  return { ref, encoded, region };
}

async function connectWithFallback(ref, encoded, region) {
  const hosts = [`aws-0-${region}`, `aws-1-${region}`];
  const ports = [5432, 6543];
  let lastError;

  for (const host of hosts) {
    for (const port of ports) {
      const connectionString = `postgresql://postgres.${ref}:${encoded}@${host}.pooler.supabase.com:${port}/postgres`;
      const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
      try {
        await client.connect();
        return client;
      } catch (err) {
        lastError = err;
        await client.end().catch(() => {});
        if (String(err.message).includes("not found")) break; // try next host
      }
    }
  }

  throw lastError;
}

async function main() {
  const config = getConnectionString();

  if (!config) {
    console.error(`
Could not connect to Postgres. Add one of these to .env.bridgehub:

  DATABASE_URL=postgresql://postgres.[ref]:[password]@...pooler.supabase.com:5432/postgres
  (from Supabase → Settings → Database → Connection string → URI, Session mode)

  — or —

  SUPABASE_DB_PASSWORD=your-database-password
  SUPABASE_DB_REGION=eu-north-1   (match your project's region in Supabase)

Or run the SQL manually: Supabase Dashboard → SQL Editor → paste
supabase/migrations/001_initial_schema.sql
`);
    process.exit(1);
  }

  const sqlPath = path.join(__dirname, "..", "supabase", "migrations", "001_initial_schema.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  let client;
  try {
    if (typeof config === "string") {
      client = new pg.Client({ connectionString: config, ssl: { rejectUnauthorized: false } });
      await client.connect();
    } else {
      client = await connectWithFallback(config.ref, config.encoded, config.region);
    }
    console.log("Connected. Running migration...");
    await client.query(sql);
    console.log("Migration complete.");
  } catch (err) {
    if (String(err.message).includes("password authentication failed")) {
      console.error(
        "Migration failed: database password rejected.\n" +
          "Reset it in Supabase → Project Settings → Database → Reset database password,\n" +
          "update SUPABASE_DB_PASSWORD in .env.bridgehub (or paste the full DATABASE_URL from the dashboard)."
      );
    } else {
      console.error("Migration failed:", err.message);
    }
    process.exit(1);
  } finally {
    if (client) await client.end();
  }
}

main();
