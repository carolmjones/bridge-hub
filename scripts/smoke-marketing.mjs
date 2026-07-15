#!/usr/bin/env node
/**
 * Marketing app smoke test — local dev or production preview.
 *
 * Local:  npm run dev:marketing  then  node scripts/smoke-marketing.mjs
 * Prod:   SMOKE_MARKETING_URL=https://www.carolinejones.co node scripts/smoke-marketing.mjs
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

const ROUTES = [
  "/",
  "/bridge-map",
  "/free-class",
  "/about",
  "/work-with-me/coaching",
  "/work-with-me/speaking",
  "/work-with-me/speaking/enquire",
  "/privacy",
  "/terms",
  "/urgent-support",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
];

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
    return res;
  }
  fail(`GET ${route}`, `expected ${expectStatus}, got ${res.status}`);
  return null;
}

async function main() {
  console.log(`\nBridge Hub marketing smoke test → ${BASE}\n`);

  for (const route of ROUTES) {
    await checkPage(route);
  }

  const bridgeMapRes = await fetch(`${BASE}/bridge-map`);
  const bridgeMapHtml = await bridgeMapRes.text();
  if (bridgeMapRes.ok && bridgeMapHtml.includes("/begin")) {
    ok("Bridge Map includes screening /begin CTA");
  } else {
    fail("Screening CTA", "expected /begin link on /bridge-map");
  }

  const aboutRes = await fetch(`${BASE}/about`);
  const aboutHtml = await aboutRes.text();
  if (aboutHtml.includes("Why I Do This Work")) {
    ok("About page includes My Why section");
  } else {
    fail("About My Why", 'expected "Why I Do This Work" in /about HTML');
  }

  if (!aboutHtml.includes("I know this as a therapist")) {
    ok("About page uses updated credential wording (no bare therapist)");
  } else {
    fail("About credentials", 'still contains "I know this as a therapist"');
  }

  const speakingRes = await fetch(`${BASE}/work-with-me/speaking`);
  const speakingHtml = await speakingRes.text();
  if (speakingHtml.includes("Formats") && speakingHtml.includes("Audiences")) {
    ok("Speaking page includes Formats & Audiences");
  } else {
    fail("Speaking page", "expected Formats & Audiences section");
  }

  const termsRes = await fetch(`${BASE}/terms`);
  const termsHtml = await termsRes.text();
  if (termsRes.ok && termsHtml.includes("About these terms")) {
    ok("Terms page has full policy copy");
  } else {
    fail("Terms page", `expected full terms (${termsRes.status})`);
  }

  const privacyRes = await fetch(`${BASE}/privacy`);
  const privacyHtml = await privacyRes.text();
  if (
    privacyRes.ok &&
    (privacyHtml.includes("Montero Labs") ||
      privacyHtml.includes("Information we collect"))
  ) {
    ok("Privacy page has full policy copy");
  } else {
    fail("Privacy page", `expected full privacy policy (${privacyRes.status})`);
  }

  console.log("\n--- Summary ---");
  console.log(`Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Marketing smoke test crashed:", err.message);
  process.exit(1);
});
