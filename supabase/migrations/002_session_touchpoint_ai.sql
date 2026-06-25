-- Phase 4 — cache Touchpoint 1 AI content on session (generate once)

alter table public.sessions
  add column if not exists touchpoint_ai jsonb;

comment on column public.sessions.touchpoint_ai is
  'Cached S6 AI: { synthesis, row_observations, generated_at }';
