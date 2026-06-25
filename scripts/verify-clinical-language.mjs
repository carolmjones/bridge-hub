#!/usr/bin/env node
/**
 * Fresh assessment + all 7 AI calls. Prints raw output and forbidden-word check.
 * Usage: npm run dev, then node scripts/verify-clinical-language.mjs
 */
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.bridgehub") });

const BASE = process.env.SMOKE_TEST_URL || "http://localhost:3000";
const TEST_EMAIL = "clinical-lang-" + Date.now() + "@bridgehub-test.local";

const FORBIDDEN = [
  "trauma",
  "distressing",
  "memories",
  "flashbacks",
  "triggered",
  "symptoms",
  "clinical",
  "disorder",
  "diagnosis",
  "dysregulation",
];

const MAIA2_ITEMS = Array.from({ length: 27 }, (_, i) => i + 5);
const PSS10_ITEMS = Array.from({ length: 10 }, (_, i) => i + 1);
const PHQ8_ITEMS = Array.from({ length: 8 }, (_, i) => i + 1);
const PCL5_ITEMS = Array.from({ length: 20 }, (_, i) => i + 1);
const PID5SF_ITEMS = [
  41, 53, 71, 81, 24, 36, 48, 78, 17, 45, 58, 79, 27, 52, 57, 84, 9, 11, 43,
  65, 29, 40, 56, 93, 2, 5, 6, 8, 47, 64, 68, 76, 39, 49, 55, 91, 60, 70, 74,
];

const AI_TARGETS = [
  "synthesis_paragraph",
  "row_1",
  "row_2",
  "row_3",
  "row_4",
  "row_5",
  "results_overview_paragraph",
];

const ROW_NAMES = [
  "The Body Room",
  "The Load",
  "The Fog",
  "The Weight You Carry",
  "The Weather Inside",
];

function parseSetCookie(headers) {
  const raw = headers.getSetCookie?.() ?? [];
  return raw.map((c) => c.split(";")[0]).join("; ");
}

function findForbidden(text) {
  const lower = text.toLowerCase();
  return FORBIDDEN.filter((word) => lower.includes(word));
}

async function saveAllResponses(sessionId, cookies) {
  const batches = [
    { instrument: "MAIA2", items: MAIA2_ITEMS, section: 1, reverse: [5, 6, 7, 8, 9, 10, 11, 12, 15] },
    { instrument: "PSS10", items: PSS10_ITEMS, section: 2, reverse: [4, 5, 7, 8] },
    { instrument: "PHQ8", items: PHQ8_ITEMS, section: 3, reverse: [] },
    { instrument: "PCL5", items: PCL5_ITEMS, section: 4, reverse: [] },
    { instrument: "PID5SF", items: PID5SF_ITEMS, section: 5, reverse: [] },
  ];

  for (const batch of batches) {
    for (let i = 0; i < batch.items.length; i += 1) {
      const item = batch.items[i];
      const res = await fetch(`${BASE}/api/session/save-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Cookie: cookies },
        body: JSON.stringify({
          session_id: sessionId,
          instrument: batch.instrument,
          item_number: item,
          response_value: 4,
          reverse_scored: batch.reverse.includes(item),
          current_section: batch.section,
          current_item: i === batch.items.length - 1 ? 1 : i + 2,
          section_start: i === 0 ? new Date().toISOString() : undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(`save-response ${batch.instrument} item ${item}: ${body.error}`);
      }
    }
  }
}

async function main() {
  const createRes = await fetch(`${BASE}/api/session/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: TEST_EMAIL,
      first_name: "Clinical",
      opted_in: false,
    }),
  });
  const createBody = await createRes.json();
  const cookies = parseSetCookie(createRes.headers);

  if (!createRes.ok || !createBody.session_id) {
    throw new Error(`Session create failed: ${createBody.error || createRes.status}`);
  }

  const sessionId = createBody.session_id;
  await saveAllResponses(sessionId, cookies);

  const completeRes = await fetch(`${BASE}/api/session/complete-section`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookies },
    body: JSON.stringify({
      session_id: sessionId,
      instrument: "PID5SF",
      section_end_time: new Date().toISOString(),
      write_in_text: "Car accident last year",
      complete_assessment: true,
    }),
  });
  if (!completeRes.ok) {
    const body = await completeRes.json();
    throw new Error(`complete-section failed: ${body.error}`);
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  await admin.from("sessions").update({ touchpoint_ai: null }).eq("id", sessionId);

  let synthesis = null;
  let overview = null;
  const rows = {};

  console.log("\n========== RAW AI OUTPUT (all 7 calls) ==========\n");

  for (const generation_target of AI_TARGETS) {
    const res = await fetch(`${BASE}/api/results/generate-ai-content`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookies },
      body: JSON.stringify({ session_id: sessionId, generation_target }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(`${generation_target} failed: ${body.error}`);

    if (body.synthesis) synthesis = body.synthesis;
    if (body.overview_paragraph) overview = body.overview_paragraph;
    if (body.row_observations) Object.assign(rows, body.row_observations);
  }

  console.log("--- 1. synthesis_paragraph ---");
  console.log(synthesis);
  console.log(`Forbidden found: ${findForbidden(synthesis).join(", ") || "none"}\n`);

  ROW_NAMES.forEach((name, i) => {
    console.log(`--- ${i + 2}. row_${i + 1} (${name}) ---`);
    console.log(rows[name]);
    console.log(`Forbidden found: ${findForbidden(rows[name] ?? "").join(", ") || "none"}\n`);
  });

  console.log("--- 7. results_overview_paragraph ---");
  console.log(overview);
  console.log(`Forbidden found: ${findForbidden(overview).join(", ") || "none"}\n`);

  console.log("========== END ==========\n");

  await admin.from("scores").delete().eq("session_id", sessionId);
  await admin.from("responses").delete().eq("session_id", sessionId);
  await admin.from("sessions").delete().eq("id", sessionId);
  await admin.from("users").delete().eq("id", createBody.user_id);
  await admin.auth.admin.deleteUser(createBody.user_id);
}

main().catch((err) => {
  console.error("Verify failed:", err.message);
  process.exit(1);
});
