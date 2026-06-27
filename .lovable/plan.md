## Goal
Make Pulse feel like a real community feed: people can reply to each other, the name they type actually shows on their post, and tapping a photo opens it full-size.

## What I'll change

### 1. Display name fix
Right now even when a user types a name in "Your name (optional)", the post still renders as "Anonymous traveler". Cause: `submitPulsePost()` is sending the typed name into the wrong field (or `is_anonymous` is being set to true whenever there's no logged-in user, which overrides the name in `renderPulseFeed`).

Fix in `public/site/app.js`:
- Read the name input value, trim it.
- Insert `display_name: name || null` and `is_anonymous: !name` into `pulse_posts`.
- In `renderPulseFeed`, show `post.display_name` when present, else "Anonymous traveler".
- Same logic for comments (below).

### 2. Replies / comments (real conversation)
Today users can only like — no way to reply. The `pulse_comments` table already exists with `post_id`, `text_content`, `display_name`, `user_id` and open RLS (anon insert/select allowed from the earlier migration).

Add to each feed card in `public/site/index.html` + `app.js`:
- A "💬 Reply" button next to the heart, showing the comment count.
- Tapping it expands an inline thread under the post: list of existing comments (name + relative time + text) and a small composer (name optional + text + Send).
- `loadPulseComments(postId)` → `select * from pulse_comments where post_id = ... order by created_at asc`.
- `submitPulseComment(postId)` → insert `{ post_id, text_content, display_name, is_anonymous }`, then re-render that thread and bump the count.
- Same 30s per-device rate-limit as posts, reusing `pulseDeviceId()`.
- Realtime: subscribe once to `pulse_comments` inserts and append to the open thread so two browsers actually see each other live. (Posts feed already polls/refetches; I'll add a realtime subscription to `pulse_posts` too so new posts appear without reopening Pulse.)

### 3. Image lightbox
Tapping a post photo currently does nothing. Add a simple full-screen viewer:
- New `#pulseLightbox` overlay in `index.html` (dark backdrop, centered `<img>`, close on tap / Esc).
- In `renderPulseFeed`, wire `onclick="openPulseLightbox('<url>')"` on `<img>` thumbnails.
- `openPulseLightbox(url)` / `closePulseLightbox()` in `app.js`.

### 4. Small polish
- Reset the name input on successful post submit so the next post doesn't accidentally inherit it.
- Show comment count on each card even when the thread is collapsed (`{count} replies`).
- Ensure the comment composer doesn't trigger the post composer's rate-limit (separate timestamp key).

## Scope / non-goals
- No schema changes needed — `pulse_comments` already has the columns and open policies from the earlier migration.
- No auth changes — Pulse stays fully open; name is optional.
- No edit/delete on comments (out of scope for this pass).
- Map, destinations, Tala, header, splash — untouched.

## Files touched
- `public/site/app.js` — fix display_name on insert + render, add `loadPulseComments`, `submitPulseComment`, lightbox handlers, realtime subscriptions.
- `public/site/index.html` — reply button + inline thread template, lightbox overlay, minimal CSS using existing dark tokens.