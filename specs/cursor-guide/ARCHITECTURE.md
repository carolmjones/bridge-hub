# The Bridge Hub — Architecture
## Technical Blueprint for Cursor Build

> Source of truth for data model, API routes, scoring engine integration,
> PDF generation flow, and email triggers.
> Last updated: June 2026

---

## Supabase schema

### users
```sql
id              uuid primary key default gen_random_uuid()
email           text unique not null
first_name      text not null
created_at      timestamptz default now()
opted_in        boolean default false
```

### sessions
```sql
id              uuid primary key default gen_random_uuid()
user_id         uuid references users(id)
created_at      timestamptz default now()
updated_at      timestamptz default now()
completed_at    timestamptz
status          text default 'in_progress'
                -- values: in_progress | completed | expired
current_section int default 1   -- 1-5
current_item    int default 1
time_started    timestamptz
```

### responses
```sql
id              uuid primary key default gen_random_uuid()
session_id      uuid references sessions(id)
user_id         uuid references users(id)
instrument      text not null
                -- values: PSS10 | PHQ8 | MAIA2 | PCL5 | PID5SF
item_number     int not null
response_value  int not null
reverse_scored  boolean default false
section_start   timestamptz
section_end     timestamptz
created_at      timestamptz default now()
```

### scores
```sql
id                      uuid primary key default gen_random_uuid()
session_id              uuid references sessions(id)
user_id                 uuid references users(id)
instrument              text not null
total_score             numeric(5,2)
band                    text
normative_percentile    numeric(5,2)
clinical_percentile     numeric(5,2)  -- PCL-5 only
subscale_scores         jsonb         -- MAIA-2 and PID-5-SF
subscale_bands          jsonb
subscale_percentiles    jsonb
helplessness_score      numeric(5,2)  -- PSS-10 only
efficacy_score          numeric(5,2)  -- PSS-10 only
dsm5_algorithm_met      boolean       -- PCL-5 only
cluster_scores          jsonb         -- PCL-5 only
flags_fired             jsonb         -- array of flag codes
dimensional_framework   jsonb         -- Q1-Q8 answers
pattern_matches         jsonb         -- array of pattern codes
write_in_text           text          -- PCL-5 section write-in
time_taken_seconds      int
created_at              timestamptz default now()
```

### bookings
```sql
id              uuid primary key default gen_random_uuid()
session_id      uuid references sessions(id)
user_id         uuid references users(id)
phone_number    text
phone_prefix    text
cal_booking_id  text
cal_booking_uid text
booked_at       timestamptz
call_at         timestamptz
status          text default 'confirmed'
                -- values: confirmed | rescheduled | cancelled
pdf_generated   boolean default false
pdf_url         text
created_at      timestamptz default now()
```

### magic_links
```sql
id              uuid primary key default gen_random_uuid()
user_id         uuid references users(id)
token           text unique not null
expires_at      timestamptz not null
used            boolean default false
created_at      timestamptz default now()
```

---

## Row Level Security (RLS) — critical

Enable RLS on all tables.

```sql
-- users: own row only
alter table users enable row level security;
create policy "users_own_row" on users
  for all using (auth.uid() = id);

-- sessions: own sessions only
alter table sessions enable row level security;
create policy "sessions_own" on sessions
  for all using (auth.uid() = user_id);

-- responses: own responses only
alter table responses enable row level security;
create policy "responses_own" on responses
  for all using (auth.uid() = user_id);

-- scores: own scores only
alter table scores enable row level security;
create policy "scores_own" on scores
  for all using (auth.uid() = user_id);

-- bookings: own bookings only
alter table bookings enable row level security;
create policy "bookings_own" on bookings
  for all using (auth.uid() = user_id);
```

---

## API routes

All routes are Next.js App Router route handlers.
Server-side only. Never expose Supabase service key client-side.

### Authentication

```
POST /api/auth/request-magic-link
  Body: { email, first_name }
  - Creates or retrieves user
  - Generates magic link token (uuid, 30-day expiry)
  - Sends magic link via Resend
  - Opts user into Kit if opted_in = true
  Returns: { success: true }

GET /api/auth/verify?token=[token]
  - Validates token, checks expiry, marks used
  - Creates Supabase session (magic link auth)
  - Redirects to /assessment or /results depending on session status
  Returns: redirect
```

### Session management

```
POST /api/session/create
  Auth: required
  Body: { user_id }
  - Creates new session record
  - Sets status = in_progress
  Returns: { session_id }

POST /api/session/save-response
  Auth: required
  Body: {
    session_id, instrument, item_number,
    response_value, reverse_scored,
    section_start, section_end
  }
  - Upserts response record
  - Updates session updated_at
  Returns: { success: true }

POST /api/session/complete-section
  Auth: required
  Body: { session_id, instrument, section_end_time }
  - Triggers scoring for that instrument
  - Stores score record
  Returns: { score } or { scores } on final section

GET /api/session/resume
  Auth: required
  - Returns current session state
  - Returns all saved responses
  Returns: { session, responses, current_section, current_item }
```

### Scoring

```
POST /api/score/calculate
  Auth: required (server-side only)
  Body: { session_id, instrument, responses[] }
  - Runs scoring engine for instrument
  - Calculates total, subscales, bands, percentiles
  - Checks for instrument flags (not safety items)
  - Stores to scores table
  Returns: { score_record }

Implementation: import scoring functions from
/lib/scoring/[instrument].ts
See chat-03-scoring-engine-pseudocode-v2.md for all logic.
```

### Results

```
GET /api/results/[session_id]
  Auth: required
  - Returns all score records for session
  - Returns dimensional framework output
  - Returns pattern match flags
  - Returns top_endorsed_items (10 highest across all instruments)
  - Returns write_in_text if present
  Returns: { scores, framework, patterns, top_items, write_in }

POST /api/results/generate-ai-content
  Auth: required
  Body: { session_id, generation_target }
  - generation_target: synthesis_paragraph | row_[1-5]
  - Builds JSON payload from scores and top_items
  - Calls OpenRouter with system prompt from document
  - Returns generated text
  Returns: { content }
```

### Booking

```
POST /api/booking/save-phone
  Auth: required
  Body: { session_id, phone_number, phone_prefix }
  - Stores phone number to bookings table
  Returns: { success: true }

POST /api/booking/cal-webhook
  Auth: Cal.com webhook secret header validation
  Body: Cal.com booking event payload
  - Validates webhook signature
  - Updates booking record with cal_booking_id
  - Triggers PDF generation
  - Triggers confirmation email via Resend
  - Triggers SMS if phone number present (manual at launch)
  - Adds to Kit nurture sequence if opted_in = true
  Returns: { success: true }
```

### PDF

```
POST /api/pdf/generate
  Auth: server-side only (called from webhook handler)
  Body: { session_id, booking_id }
  - Fetches all scores, responses, AI content for session
  - Renders React PDF component
  - Stores PDF to Supabase Storage
  - Updates bookings.pdf_generated = true, bookings.pdf_url
  - Sends PDF delivery email via Resend
  Returns: { pdf_url }
```

---

## Scoring engine integration

All scoring logic lives in /lib/scoring/

```
/lib/scoring/
  pss10.ts       -- PSS-10 scoring function
  phq8.ts        -- PHQ-8 scoring function
  maia2.ts       -- MAIA-2 scoring function
  pcl5.ts        -- PCL-5 scoring function
  pid5sf.ts      -- PID-5-SF scoring function
  normative.ts   -- All lookup tables and percentile functions
  flags.ts       -- Flag detection logic
  framework.ts   -- Dimensional framework Q1-Q8 inference
  patterns.ts    -- Pattern library matching logic
  index.ts       -- Exports all scoring functions
```

Source of truth for all scoring logic:
chat-03-scoring-engine-pseudocode-v2.md

Source of truth for all normative data:
chat-03-phase2-normative-data-v2.md

Implement percentile lookups as continuous normal distribution
functions, not lookup tables. The normative doc provides the
mean and SD for each instrument and subscale.

```ts
// Normal distribution CDF approximation
function normCDF(x: number, mean: number, sd: number): number {
  const z = (x - mean) / sd
  // Use error function approximation
  return 0.5 * (1 + erf(z / Math.sqrt(2)))
}
```

---

## Layer 2 content retrieval

Layer 2 blocks are pre-written text stored as constants in the codebase.
Not in the database. Not AI-generated.

```
/lib/content/
  layer2-client.ts    -- User-facing blocks (from chat-05-layer2-user-facing-v1.md)
  layer2-therapist.ts -- Clinical blocks (from chat-03-layer2-content-library-v2.md)
```

Retrieval function:
```ts
function getLayer2Block(
  instrument: string,
  band: string,
  facet?: string,
  subscale?: string
): string {
  // Returns the correct pre-written block
  // Keys: instrument + band (+ facet for PID-5-SF)
  // (+ subscale for MAIA-2)
}
```

---

## PDF generation architecture

PDF generates ONLY on booking confirmation. Never before.

Stack: @react-pdf/renderer

```
/components/pdf/
  NervousSystemMap.tsx     -- Root PDF document component
  CoverPage.tsx            -- Cover with embedded base64 background
  OpeningSection.tsx       -- "This is your map" intro
  InstrumentSection.tsx    -- Shared section wrapper
  PSS10Section.tsx         -- The Load
  PHQ8Section.tsx          -- The Fog
  MAIA2Section.tsx         -- The Body Room
  PCL5Section.tsx          -- The Weight You Carry
  PID5SFSection.tsx        -- The Weather Inside
  SynthesisSection.tsx     -- Cross-instrument synthesis
  AddendumSection.tsx      -- Full response tables
```

PDF fonts: embed Cormorant Garamond and Inter as base64 TTF.
Do not use Google Fonts CDN — it will not resolve in PDF renderer.

Cover background image: embed as base64 PNG.
See DESIGN_SYSTEM.md cover page section for encoding instruction.

PDF generation is triggered server-side only from the Cal.com
webhook handler. Never triggered from client-side code.

---

## Email triggers

All email sent via Resend. Plain text preferred.

| Trigger | Email | Owner |
|---|---|---|
| S3 submit (new user) | Magic link | Resend |
| R1 submit (returning) | Magic link | Resend |
| S8 booking confirmed | Confirmation + SMS | Resend + manual SMS |
| S8 booking confirmed + delay | PDF delivery | Resend |
| Abandoned session (24h) | Re-entry prompt | Kit |
| Completed not booked (48h) | Follow-up | Kit |

Email copy source: chat-05-phase3-copy-v3.md
Kit sequences: Chat 08 scope — not built here

---

## OpenRouter AI calls

**S6 Touchpoint 1 (results screen):** `google/gemini-2.5-flash` via `TOUCHPOINT_OPENROUTER_MODEL` in `lib/ai/touchpoint-ai.ts`. Gemini 2.5 Pro exhausts the token budget on internal reasoning, producing truncated fragments at current max_tokens.

**Report / PDF / therapist AI (future):** `OPENROUTER_MODEL` env var (default `google/gemini-2.5-pro`).

All calls server-side only. Never expose API key client-side.

```ts
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: process.env.OPENROUTER_MODEL ?? 'google/gemini-2.5-pro',
    max_tokens: 500,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: JSON.stringify(payload) }
    ]
  })
})
```

AI generation targets and their prompts:
- Synthesis paragraph (Slot 5a): chat-05-phase3-copy-v3.md
- Collapsible rows ×5 (Slot 5b): chat-05-phase3-copy-v3.md
- Results overview paragraph (Slot 5c): chat-05-phase3-copy-v3.md
- Clinical language rule: injected in `lib/ai/touchpoint-ai.ts` on all S6 prompts (`prompt_version: 4`)
- Layer 1 per instrument: chat-05-report-pseudocode-v4.md
- Call Preparation Brief: chat-05-therapist-briefing-v1.md

Strip internal notes from all AI output before storing or displaying:
```ts
function stripInternalNotes(text: string): string {
  return text.replace(/\[.*?\]/gs, '').trim()
}
```

---

## Cal.com integration

Free plan at launch. Webhook on booking confirmation.

```
Event type: Clarity Call
Duration: 45 minutes
Location: Video (Zoom or Google Meet)
Embed: /book route, inline embed not popup

Webhook endpoint: /api/booking/cal-webhook
Webhook events to subscribe: BOOKING_CREATED

Validate Cal.com webhook with:
process.env.CAL_WEBHOOK_SECRET
```

Phone number is collected at S7 (Bridge Hub screen) BEFORE
the Cal.com embed. Phone stored to Supabase. Never passed to Cal.com.

---

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # server-side only, never expose
RESEND_API_KEY=
OPENROUTER_API_KEY=
OPENROUTER_MODEL=google/gemini-2.5-pro
CAL_WEBHOOK_SECRET=
KIT_API_KEY=
NEXT_PUBLIC_APP_URL=
```

---

## Key architectural constraints

1. Supabase EU region only. Set in project creation, not changeable.
2. Service role key never in client-side code or .env.local commits.
3. PDF triggered server-side from webhook only.
4. All AI calls server-side only.
5. No health data stored before S3 consent moment.
6. Auto-save on every response — network failure must not lose answers.
7. LocalStorage as instant restore only — Supabase is source of truth.

---

*Source of truth for scoring: chat-03-scoring-engine-pseudocode-v2.md*
*Source of truth for normative data: chat-03-phase2-normative-data-v2.md*
*Source of truth for copy: COPY_REFERENCE.md*
*If anything conflicts with the master brief, the master brief wins.*
