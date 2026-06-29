#!/usr/bin/env node
/**
 * Marketing app smoke test — run against dev:marketing (:3000).
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.bridgehub") });

const BASE = process.env.SMOKE_MARKETING_URL || "http://localhost:3000";
const SCREENING =
  process.env.NEXT_PUBLIC_SCREENING_URL?.replace(/\/$/, "") ||
  "http://localhost:3001";

let passed = 0;
let failed = 0;

function ok(label) {
  console.log(`✓ ${label}`);
  passed += 1;
}

function fail(label, detail) {
  console.log(`✗ ${label}${detail ? `: ${detail}` : ""}`);
  failed += 1;
}

async function checkPage(route, expectStatus = 200) {
  const res = await fetch(`${BASE}${route}`);
  if (res.status === expectStatus) {
    ok(`GET ${route} → ${expectStatus}`);
    return true;
  }
  fail(`GET ${route}`, `expected ${expectStatus}, got ${res.status}`);
  return false;
}

async function main() {
  console.log(`\nBridge Hub marketing smoke test → ${BASE}\n`);

  await checkPage("/");
  await checkPage("/bridge-map");

  const res = await fetch(`${BASE}/`);
  const html = await res.text();
  if (html.includes(`${SCREENING}/begin`)) {
    ok("Landing links screening CTA to screening deploy /begin");
  } else {
    fail("Screening CTA URL", `expected link to ${SCREENING}/begin`);
  }

  console.log("\n--- Summary ---");
  console.log(`Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Marketing smoke test crashed:", err.message);
  process.exit(1);
});
