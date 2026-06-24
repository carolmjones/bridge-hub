-- The Bridge Hub — initial schema (Phase 1)
-- Run in Supabase Dashboard → SQL Editor (EU project)

-- ─── Tables ────────────────────────────────────────────────────────────────

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  first_name text not null,
  created_at timestamptz not null default now(),
  opted_in boolean not null default false
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'completed', 'expired')),
  current_section int not null default 1 check (current_section between 1 and 5),
  current_item int not null default 1 check (current_item >= 1),
  time_started timestamptz
);

create table public.responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  instrument text not null
    check (instrument in ('PSS10', 'PHQ8', 'MAIA2', 'PCL5', 'PID5SF')),
  item_number int not null check (item_number >= 1),
  response_value int not null,
  reverse_scored boolean not null default false,
  section_start timestamptz,
  section_end timestamptz,
  created_at timestamptz not null default now(),
  unique (session_id, instrument, item_number)
);

create table public.scores (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  instrument text not null
    check (instrument in ('PSS10', 'PHQ8', 'MAIA2', 'PCL5', 'PID5SF')),
  total_score numeric(5, 2),
  band text,
  normative_percentile numeric(5, 2),
  clinical_percentile numeric(5, 2),
  subscale_scores jsonb,
  subscale_bands jsonb,
  subscale_percentiles jsonb,
  helplessness_score numeric(5, 2),
  efficacy_score numeric(5, 2),
  dsm5_algorithm_met boolean,
  cluster_scores jsonb,
  flags_fired jsonb,
  dimensional_framework jsonb,
  pattern_matches jsonb,
  write_in_text text,
  time_taken_seconds int,
  created_at timestamptz not null default now(),
  unique (session_id, instrument)
);

-- No RLS — service role access only
create table public.safety_flags (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  item_code text not null,
  item_text text not null,
  response_value int not null,
  response_label text not null,
  instrument text not null,
  created_at timestamptz not null default now(),
  reviewed boolean not null default false
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  phone_number text,
  phone_prefix text,
  cal_booking_id text,
  cal_booking_uid text,
  booked_at timestamptz,
  call_at timestamptz,
  status text not null default 'confirmed'
    check (status in ('confirmed', 'rescheduled', 'cancelled')),
  pdf_generated boolean not null default false,
  pdf_url text,
  created_at timestamptz not null default now()
);

-- RLS enabled, no policies — server-only via service role
create table public.magic_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  token text unique not null,
  expires_at timestamptz not null,
  used boolean not null default false,
  created_at timestamptz not null default now()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

create index sessions_user_id_idx on public.sessions (user_id);
create index sessions_status_idx on public.sessions (status);
create index responses_session_id_idx on public.responses (session_id);
create index scores_session_id_idx on public.scores (session_id);
create index magic_links_token_idx on public.magic_links (token);
create index magic_links_user_id_idx on public.magic_links (user_id);

-- ─── updated_at trigger ────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger sessions_updated_at
  before update on public.sessions
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ────────────────────────────────────────────────────

alter table public.users enable row level security;
alter table public.sessions enable row level security;
alter table public.responses enable row level security;
alter table public.scores enable row level security;
alter table public.bookings enable row level security;
alter table public.magic_links enable row level security;
-- safety_flags: intentionally no RLS policies — service role only

create policy "users_own_row" on public.users
  for all using (auth.uid() = id);

create policy "sessions_own" on public.sessions
  for all using (auth.uid() = user_id);

create policy "responses_own" on public.responses
  for all using (auth.uid() = user_id);

create policy "scores_own" on public.scores
  for all using (auth.uid() = user_id);

create policy "bookings_own" on public.bookings
  for all using (auth.uid() = user_id);

-- magic_links: no policies — blocks anon/authenticated; service role bypasses RLS

-- ─── Storage (PDF reports, Phase 5) ────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('reports', 'reports', false)
on conflict (id) do nothing;

-- ─── Auth sync trigger ─────────────────────────────────────────────────────
-- Keeps public.users in sync when auth users are created via admin API

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, first_name, opted_in)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce((new.raw_user_meta_data->>'opted_in')::boolean, false)
  )
  on conflict (id) do update set
    email = excluded.email,
    first_name = coalesce(nullif(excluded.first_name, ''), public.users.first_name),
    opted_in = excluded.opted_in;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();
