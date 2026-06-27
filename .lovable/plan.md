## Goal
Make Pulse fully open — anyone can read, post, like, and comment without signing in. Remove every auth gate around Pulse.

## Why this is simple
Pulse is a public community feed for San Vicente travelers. Forcing magic-link/Google/Apple just to drop a comment kills participation. We'll let anyone post anonymously; identity is optional.

## Why the Google Client ID prompt appeared (FYI)
In Backend → Users → Auth Settings → Google, you toggled **"Your own credentials"**, which requires you to register an app in Google Cloud Console and paste a Client ID + Secret. The **"Managed by Lovable"** option right above it needs zero setup — Lovable provides the credentials. After this plan, you won't need either, because we're removing sign-in from Pulse entirely.

## Changes

### 1. Frontend (`public/site/app.js` + `public/site/index.html`)
- Remove the `requireAuth(...)` wrapper from `openPulsePanel()` — anyone can open it.
- Remove `requireAuth(...)` from `togglePulseLike()` and `submitPulsePost()`.
- Make every post anonymous by default: drop the "Post anonymously" toggle, always insert with `is_anonymous: true` and `user_id: null`.
- Display name = whatever the user types in a simple "Your name (optional)" field, stored in a new `display_name` column. Falls back to "Anonymous traveler".
- Likes: store one like per browser using a `localStorage` device id (no auth). Prevent double-likes client-side; server uniqueness keyed on `(post_id, device_id)`.
- Remove the login modal trigger from the Pulse flow. Login modal stays available only for things that genuinely need an account later (none right now).

### 2. Database migration
- `pulse_posts`: make `user_id` nullable, add `display_name text`.
- `pulse_likes`: make `user_id` nullable, add `device_id text not null`, replace unique constraint with `(post_id, device_id)`.
- `pulse_comments`: make `user_id` nullable, add `display_name text`.
- RLS: allow `anon` to `SELECT` and `INSERT` on all three tables. Keep `UPDATE`/`DELETE` restricted (no edit/delete from anon — prevents drive-by vandalism). Grants updated to include `anon` INSERT.

### 3. Auth providers (optional cleanup)
- You can ignore the Google Client ID screen entirely — close it without saving.
- Optionally: hide the Google/Apple/Email buttons since nothing in the app requires sign-in anymore. (Say the word and I'll remove them; otherwise I'll leave the login modal dormant in case you re-enable accounts later.)

## Spam/abuse note
Fully open posting attracts spam eventually. For now we rely on: device-id rate limiting (1 post / 30s client-side), max length on text, and the ability for you (as owner) to delete rows from the backend. If spam shows up later, we add a lightweight captcha or re-introduce optional sign-in for posting only.

## Out of scope
- Comments UI (still a "coming soon" stub).
- Image uploads to Storage.
- Moderation dashboard.
