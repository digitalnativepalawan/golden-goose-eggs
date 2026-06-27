# Security hardening — real findings only

The scanner found 31 items. After triage against how your app actually uses the database, **6 are real "anyone on the internet can vandalize your app" bugs**. The rest are either by-design (open Pulse) or stylistic warnings. This plan fixes only the real ones, with zero app-behavior changes for normal users.

## What gets fixed

### 1. `destinations` table — anyone can wipe or rewrite the map
Currently any anonymous visitor can DELETE every San Vicente location or change names/coords. **Fix:** keep public read, restrict INSERT/UPDATE/DELETE to admin role only (via existing `has_role`-style check). Your site only reads this table from `app.js`, so nothing breaks.

### 2. `tala_responses`, `tala_settings`, `tala_suggestions` — anyone can poison the chatbot
Same pattern: public can rewrite Tala's answers and prompts. **Fix:** public read stays, writes locked to admin.

### 3. `pulse_categories` — anyone can delete/rename channels
Channels (Tips, Sightings, etc.) can be wiped by any visitor. **Fix:** public read, admin-only writes.

### 4. Storage buckets `destination-images` + `destination-videos` — anyone can upload or delete files
Right now a script can fill your storage quota or replace destination photos with anything. **Fix:** keep public READ (so images still load on the map), restrict INSERT/UPDATE/DELETE to admin.

### 5. `traveler_profiles.moderation_note` is publicly readable
Internal staff notes (ban/mute reasons) leak to anyone who queries the table. **Fix:** create a public-safe view `traveler_profiles_public` that excludes `moderation_note` and `is_banned`/`is_muted` flags; restrict the base table's SELECT to the owner + admins. Update `app.js` reads of profiles to use the view.

### 6. Admin role infrastructure (prerequisite for 1–5)
Add the standard `app_role` enum + `user_roles` table + `has_role()` SECURITY DEFINER function (per Lovable's user-roles pattern). Without this there's no way to express "admin only" in policies. No UI for granting admin yet — first admin gets seeded by user_id via a one-off migration statement you approve.

## What I'm deliberately NOT changing

- **Pulse open-write policies** (posts/comments/likes "anyone can insert") — you explicitly chose this design after the magic-link spam fiasco. The scanner flags them as warns; they stay.
- **`anyone can delete any like`** — same Pulse design tradeoff; revisit only if you want device-id enforcement later.
- **SECURITY DEFINER function warnings** — these are your `admin_*` RPCs. They're guarded by being admin-only callable after step 6 (we'll REVOKE EXECUTE from anon/authenticated and GRANT only to admins).
- **`.env` "leak"** — already explained: that's the publishable key, designed to be public.
- **localStorage / token validation / rate limiting** — non-issues or platform-level, not changing.

## Technical details

One migration containing, in order:
1. `CREATE TYPE app_role AS ENUM ('admin','moderator','user')`
2. `CREATE TABLE user_roles (user_id, role)` + GRANTs + RLS + `has_role()` SECURITY DEFINER
3. DROP + recreate write policies on `destinations`, `tala_responses`, `tala_settings`, `tala_suggestions`, `pulse_categories` → `USING (has_role(auth.uid(),'admin'))`
4. DROP + recreate `storage.objects` policies for the two buckets, same admin gate on write
5. `CREATE VIEW traveler_profiles_public` excluding moderation columns; tighten base-table SELECT
6. REVOKE EXECUTE on `admin_*` functions from anon/authenticated; GRANT to a custom admin role
7. Optional seed line (commented, you fill in your user_id) to make yourself the first admin

After migration, single small edit in `public/site/app.js` to swap any direct `traveler_profiles` reads to `traveler_profiles_public`.

No frontend behavior changes for end users. Admin actions (which currently have no UI anyway) will require being logged in as an admin — we can build that UI later if you want.
