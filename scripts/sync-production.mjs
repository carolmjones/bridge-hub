#!/usr/bin/env node
/**
 * Sync production config: Vercel env vars + Supabase Auth redirect URLs.
 *
 * Requires optional tokens in .env.bridgehub:
 *   VERCEL_TOKEN          — Vercel → Settings → Tokens
 *   VERCEL_PROJECT_ID     — Vercel → Project → Settings → General
 *   SUPABASE_ACCESS_TOKEN — Supabase → Account → Access Tokens
 *
 * Usage:
 *   PRODUCTION_APP_URL=https://your-project.vercel.app node scripts/sync-production.mjs
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.bridgehub") });

const PRODUCTION_URL = (
  process.env.PRODUCTION_APP_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  ""
).replace(/\/$/, "");

const VERCEL_ENV_KEYS = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
];

function supabaseProjectRef() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) return null;
  const match = url.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match?.[1] ?? null;
}

async function syncVercelEnv(productionUrl) {
  const token = process.env.VERCEL_TOKEN?.trim();
  const projectId = process.env.VERCEL_PROJECT_ID?.trim();
  if (!token || !projectId) {
    console.log("\n⏭  Vercel env sync skipped (set VERCEL_TOKEN + VERCEL_PROJECT_ID in .env.bridgehub)");
    console.log("   Manual: Vercel → bridge-hub → Settings → Environment Variables");
    for (const key of VERCEL_ENV_KEYS) {
      const value = key === "NEXT_PUBLIC_APP_URL" ? productionUrl : process.env[key];
      console.log(`   • ${key}=${value ? "(set)" : "MISSING locally"}`);
    }
    return false;
  }

  const teamId = process.env.VERCEL_TEAM_ID?.trim();
  const qs = teamId ? `?teamId=${teamId}` : "";

  for (const key of VERCEL_ENV_KEYS) {
    const value = key === "NEXT_PUBLIC_APP_URL" ? productionUrl : process.env[key];
    if (!value?.trim()) {
      console.warn(`⚠  Skipping ${key} — not set locally`);
      continue;
    }

    const res = await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/env${qs}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          value: value.trim(),
          type: key.includes("SERVICE") || key === "RESEND_API_KEY" ? "encrypted" : "plain",
          target: ["production", "preview", "development"],
        }),
      }
    );

    if (res.ok) {
      console.log(`✓ Vercel env: ${key}`);
    } else {
      const body = await res.text();
      console.warn(`✗ Vercel env ${key}: ${res.status} ${body.slice(0, 120)}`);
    }
  }
  return true;
}

async function syncSupabaseAuth(productionUrl) {
  const accessToken = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  const ref = supabaseProjectRef();
  if (!accessToken || !ref) {
    console.log("\n⏭  Supabase Auth sync skipped (set SUPABASE_ACCESS_TOKEN in .env.bridgehub)");
    console.log("   Manual: Supabase → Authentication → URL Configuration");
    console.log(`   • Site URL: ${productionUrl}`);
    console.log(`   • Redirect URLs: ${productionUrl}/api/auth/verify`);
    console.log(`                     ${productionUrl}/**`);
    return false;
  }

  const redirectUrls = [
    `${productionUrl}/api/auth/verify`,
    `${productionUrl}/**`,
    "http://localhost:3000/api/auth/verify",
    "http://localhost:3000/**",
  ].join(",");

  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/config/auth`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_url: productionUrl,
      uri_allow_list: redirectUrls,
    }),
  });

  if (res.ok) {
    console.log(`✓ Supabase Auth: site_url + redirect URLs → ${productionUrl}`);
    return true;
  }

  const body = await res.text();
  console.warn(`✗ Supabase Auth update failed: ${res.status} ${body.slice(0, 200)}`);
  return false;
}

async function main() {
  console.log("\nBridge Hub — production config sync\n");

  if (!PRODUCTION_URL || PRODUCTION_URL.includes("localhost")) {
    console.error(
      "Set PRODUCTION_APP_URL to your Vercel deployment URL, e.g.\n" +
        "  PRODUCTION_APP_URL=https://bridge-hub-xxxx.vercel.app node scripts/sync-production.mjs\n\n" +
        "Find it in Vercel → Deployments → Production → Visit.\n" +
        "Note: bridge-hub.vercel.app is NOT this project (subdomain taken by another app)."
    );
    process.exit(1);
  }

  console.log(`Production URL: ${PRODUCTION_URL}`);
  await syncVercelEnv(PRODUCTION_URL);
  await syncSupabaseAuth(PRODUCTION_URL);

  console.log("\nAfter env vars are set, redeploy in Vercel (Deployments → ⋯ → Redeploy).");
  console.log(`Then open ${PRODUCTION_URL}/ — expect “Something in you has been asking to be understood.”\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
