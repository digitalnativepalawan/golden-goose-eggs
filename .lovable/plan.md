## Problem
Reply thread fails with `column pulse_comments.is_anonymous does not exist`. The feed query (`app.js:895`) selects `is_anonymous` from `pulse_comments`, but that column only exists on `pulse_posts`. So the thread never loads, and replies between users/devices appear broken.

## Fix

1. **DB migration** — add the missing column so comments match posts:
   ```sql
   ALTER TABLE public.pulse_comments
     ADD COLUMN IF NOT EXISTS is_anonymous boolean NOT NULL DEFAULT false;
   ```
   (RLS/grants already open for anon insert/select from prior migration — no policy changes.)

2. **`public/site/app.js` — `submitPulseComment`** (line 927): also send `is_anonymous: !name` so a typed name shows as that name and an empty name shows as "Anonymous traveler", matching post behavior.

3. **`renderPulseThread`** (line 891): keep the select as-is (it already requests `is_anonymous`, `display_name`); after the migration the query succeeds and each comment renders with the correct author label.

## Out of scope
No changes to posts, likes, lightbox, auth, map, or UI styling.
