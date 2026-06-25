# Supabase migrations

Run migrations in **Supabase Dashboard → SQL Editor** for your EU project.

## Phase 1

1. Open [supabase/migrations/001_initial_schema.sql](./migrations/001_initial_schema.sql)
2. Copy the full file and run it in the SQL Editor
3. Confirm tables appear under **Table Editor**: `users`, `sessions`, `responses`, `scores`, `bookings`, `magic_links`, `safety_flags`
4. Confirm **Storage** bucket `reports` exists (private)

## Phase 4

1. Open [supabase/migrations/002_session_touchpoint_ai.sql](./migrations/002_session_touchpoint_ai.sql)
2. Run in SQL Editor (adds `sessions.touchpoint_ai` for cached S6 AI content)

## Notes

- `users.id` matches `auth.users.id` (synced via trigger on auth user creation)
- `safety_flags` and `magic_links` have no user-facing RLS policies
- Re-running the migration on an existing project will fail on duplicate objects — run once only
