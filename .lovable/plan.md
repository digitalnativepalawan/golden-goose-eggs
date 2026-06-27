## Root causes

I traced "no one can post or chat in Pulse" to three independent issues, not just RLS:

1. **Missing GRANTs on Pulse tables.** RLS policies on `pulse_posts`, `pulse_comments`, `pulse_likes` are actually correct (`INSERT WITH CHECK (auth.uid() = user_id)`, public `SELECT`, owner `UPDATE/DELETE`). But `information_schema.role_table_grants` returns **zero rows** for all three tables — `authenticated`, `anon`, and `service_role` have no privileges at all. PostgREST denies the request before RLS even runs, so every read and insert fails with a permission error. This is the primary blocker.
2. **`pulse_likes.user_id` is nullable.** The `INSERT WITH CHECK (auth.uid() = user_id)` policy fails silently when the client omits `user_id`, because `null = uuid` evaluates to null/false. Needs `NOT NULL`.
3. **Pulse code never touches the database.** `submitPulsePost()` only pushes to an in-memory `PULSE_POSTS` array; `renderPulseFeed()` renders that same hardcoded array; `togglePulseLike()` only toggles a CSS class. Even with GRANTs fixed, nothing would persist or appear across sessions. And `openPulsePanel()` has no `requireAuth` gate, so a signed-out user can open Compose and hit a confusing failure.

Magic-link auth itself (`sb.auth.signInWithOtp` with `emailRedirectTo: window.location.href`) is wired correctly and `onAuthStateChange` already updates `currentUser` — that part works once the user clicks the link in the same browser.

## Fix

### 1. Migration — GRANTs + tighten likes

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pulse_posts    TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pulse_comments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pulse_likes    TO authenticated;
GRANT SELECT ON public.pulse_posts, public.pulse_comments, public.pulse_likes TO anon;
GRANT ALL ON public.pulse_posts, public.pulse_comments, public.pulse_likes TO service_role;

ALTER TABLE public.pulse_likes ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.pulse_likes ADD CONSTRAINT pulse_likes_unique UNIQUE (post_id, user_id);
```

(Identity columns and RLS policies are already correct — no schema changes needed there.)

### 2. `public/site/app.js` — wire Pulse to Supabase

- **`openPulsePanel()`** — wrap body in `requireAuth(...)` so signed-out users see the login modal first; after sign-in the panel opens automatically via the existing `pendingProtectedAction` flow.
- **`renderPulseFeed()`** — replace the hardcoded `PULSE_POSTS` filter with `await sb.from('pulse_posts').select('*, pulse_likes(count), pulse_comments(count)').order('created_at',{ascending:false})`, optionally filtered by `category`. Map rows into the existing `pulseCardHtml()` shape (name from `traveler_profiles` join or "Anonymous" when `is_anonymous`, `time` from `created_at` via a small relative-time helper, `likes`/`comments` from the count aggregates). Keep a short loading state and a clear error message instead of failing silently.
- **`submitPulsePost()`** — `await sb.from('pulse_posts').insert({ user_id: currentUser.id, category, text_content, image_url, location_text, is_anonymous }).select().single()`. On success, refresh the feed from the DB (don't push into the local array). On error, surface the message in the compose sheet. Image upload to the existing `destination-images` (or a new `pulse-images`) bucket is out of scope for this pass — store the data URL in `image_url` short-term, or skip image until storage is wired.
- **`togglePulseLike(btn, postId)`** — `requireAuth(...)`. Insert into `pulse_likes` on like, delete on unlike (`.delete().eq('post_id',id).eq('user_id', currentUser.id)`), then update the count in the DOM from the response.
- Keep the existing in-memory `PULSE_POSTS` only as a fallback for the "no data yet" empty state.

### 3. End-to-end test

After the migration runs and the JS is updated:
- Sign in via magic link in a real browser (Playwright), confirm `sb.auth.getSession()` returns a session.
- Open Pulse → confirm feed loads from DB (initially empty).
- Compose a post → confirm a row lands in `pulse_posts` with the correct `user_id` and that it appears at the top of the feed.
- Tap like → confirm a row in `pulse_likes` and the count increments; tap again → row removed, count decrements.
- Sign out → confirm Pulse panel re-prompts for login on next open.

## Out of scope

- Comments UI (still "coming soon" button) — only the table grants/RLS are touched.
- Image upload to Storage — covered in a follow-up once Pulse posting is verified.
- Google / Apple OAuth providers — magic link only, as today.
