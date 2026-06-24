#!/usr/bin/env node
/**
 * Phase 1–2 smoke test against local dev server.
 * Usage: npm run dev (separate terminal), then node scripts/smoke-test.mjs
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.bridgehub") });

const BASE = process.env.SMOKE_TEST_URL || "http://localhost:3000";
const TEST_EMAIL = `smoke-${Date.now()}@bridgehub-test.local`;

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

function parseSetCookie(headers) {
  const raw = headers.getSetCookie?.() ?? [];
  return raw.map((c) => c.split(";")[0]).join("; ");
}

async function main() {
  console.log(`\nBridge Hub smoke test → ${BASE}\n`);

  await checkPage("/");
  await checkPage("/begin");
  await checkPage("/save");
  await checkPage("/resume");
  await checkPage("/expired");
  {
    const res = await fetch(`${BASE}/assessment`, { redirect: "manual" });
    if (res.status === 307 || res.status === 302) {
      ok("GET /assessment → redirect when unauthenticated");
    } else {
      fail("GET /assessment", `expected redirect, got ${res.status}`);
    }
  }

  // Session create (S3 flow)
  const createRes = await fetch(`${BASE}/api/session/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: TEST_EMAIL,
      first_name: "Smoke",
      opted_in: false,
    }),
  });

  const createBody = await createRes.json();
  const cookies = parseSetCookie(createRes.headers);

  if (!createRes.ok || !createBody.session_id) {
    fail("POST /api/session/create", createBody.error || createRes.status);
    console.log("\n--- Summary ---");
    console.log(`Passed: ${passed}, Failed: ${failed}`);
    process.exit(1);
  }

  ok(`POST /api/session/create → session ${createBody.session_id.slice(0, 8)}…`);

  if (!cookies) {
    fail("Auth cookies set after session create");
  } else {
    ok("Auth cookies returned");
  }

  // Resume with session
  const resumeRes = await fetch(`${BASE}/api/session/resume`, {
    headers: { Cookie: cookies },
  });
  const resumeBody = await resumeRes.json();

  if (resumeRes.ok && resumeBody.session?.id === createBody.session_id) {
    ok("GET /api/session/resume → active session");
  } else {
    fail("GET /api/session/resume", resumeBody.error || resumeRes.status);
  }

  // Save response
  const saveRes = await fetch(`${BASE}/api/session/save-response`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookies },
    body: JSON.stringify({
      session_id: createBody.session_id,
      instrument: "PSS10",
      item_number: 1,
      response_value: 2,
      reverse_scored: false,
      current_section: 1,
      current_item: 2,
    }),
  });

  if (saveRes.ok) {
    ok("POST /api/session/save-response");
  } else {
    const saveBody = await saveRes.json();
    fail("POST /api/session/save-response", saveBody.error || saveRes.status);
  }

  // Verify persistence
  const resume2 = await fetch(`${BASE}/api/session/resume`, {
    headers: { Cookie: cookies },
  });
  const resume2Body = await resume2.json();
  const saved = resume2Body.responses?.find(
    (r) => r.instrument === "PSS10" && r.item_number === 1
  );

  if (saved?.response_value === 2) {
    ok("Response persisted in Supabase");
  } else {
    fail("Response persistence", "PSS10 item 1 not found or wrong value");
  }

  if (resume2Body.current_item === 2) {
    ok("Session progress updated (current_item = 2)");
  } else {
    fail("Session progress", `current_item = ${resume2Body.current_item}`);
  }

  // Magic link flow (token via admin, skip email)
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await admin.from("magic_links").insert({
    user_id: createBody.user_id,
    token,
    expires_at: expiresAt,
  });

  const verifyRes = await fetch(
    `${BASE}/api/auth/verify?token=${encodeURIComponent(token)}`,
    { redirect: "manual" }
  );

  if (verifyRes.status === 307 || verifyRes.status === 302) {
    const location = verifyRes.headers.get("location") || "";
    if (location.includes("/assessment")) {
      ok("GET /api/auth/verify → redirect to /assessment");
    } else {
      fail("Magic link verify redirect", location);
    }
    const verifyCookies = parseSetCookie(verifyRes.headers);
    if (verifyCookies) {
      ok("Auth cookies set after magic link verify");
    } else {
      fail("Auth cookies after magic link verify");
    }
  } else {
    fail("GET /api/auth/verify", `status ${verifyRes.status}`);
  }

  // Request magic link — non-existent email always succeeds (anti-enumeration)
  const mlRes = await fetch(`${BASE}/api/auth/request-magic-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "nobody@example.com" }),
  });

  if (mlRes.ok) {
    ok("POST /api/auth/request-magic-link (unknown email)");
  } else {
    const mlBody = await mlRes.json();
    fail("POST /api/auth/request-magic-link", mlBody.error || mlRes.status);
  }

  // Resend sandbox only delivers to account owner — skip live send in smoke test
  console.log("  ↳ Resend live delivery skipped (verify domain for production)");

  // DB cleanup
  await admin.from("responses").delete().eq("session_id", createBody.session_id);
  await admin.from("sessions").delete().eq("id", createBody.session_id);
  await admin.from("magic_links").delete().eq("user_id", createBody.user_id);
  await admin.from("users").delete().eq("id", createBody.user_id);
  await admin.auth.admin.deleteUser(createBody.user_id);

  console.log("\n--- Summary ---");
  console.log(`Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Smoke test crashed:", err.message);
  process.exit(1);
});
