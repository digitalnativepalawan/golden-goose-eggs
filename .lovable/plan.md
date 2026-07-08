## Scope

Build a dedicated **Today drawer** as the destination of the "Today" dock button (currently it only resets the map — there is no Today panel today). Edits stay in `public/site/index.html`, `public/site/app.js`, and `public/site/personalize.js`. No DB / route changes. The bottom dock, TALA orb, destSheet, discoverPanel are untouched.

---

### Part 1 — Bottom drawer shell & greeting peek fix

A new `#todaySheet` bottom drawer, structurally modelled on `.dest-sheet` (same slide-up transition, same handle affordance) but with its own class so styling is independent and can't break destination cards.

- Container `.today-sheet` fixed to bottom, z-index above the map, below dock. Peek/collapsed state shows a **72px** header row (handle + one-line greeting + right-side "Today" chip). Expanded state fills up to `min(90dvh, 720px)` for the 7 cards.
- Fully opaque backdrop:
  - `background: linear-gradient(180deg, rgba(4,10,26,0.96), rgba(2,6,18,0.99))`
  - plus `backdrop-filter: blur(28px) saturate(140%)` (standard property only — no `-webkit-` twin, per the modern stack rule that Lightning CSS drops the un-prefixed version).
  - top border `1px solid rgba(255,255,255,0.06)`; soft `box-shadow: 0 -20px 60px rgba(0,0,0,0.5)` so it visually detaches from map.
- Handle bar kept exactly as-is (same 40×4 pill, `rgba(255,255,255,.18)` background, centred, 8px top margin) — this is the requested "sleek top scroll bar handle".
- Peek row layout follows the responsive-layout rule from useful-context (grid on mobile, promote to flex at `sm:` — done with matching CSS since this file is vanilla, not Tailwind): `grid-template-columns: minmax(0,1fr) auto`, `min-width:0` on the greeting so it truncates cleanly, `flex-shrink:0` on the chip. Fixes the "greeting clipping" issue.
- Greeting text set from `personalize.js`:
  - `greeting()` already returns "Good morning" / "Good afternoon" / "Good evening" based on `new Date().getHours()`.
  - Read nickname from `sanvic_entry_v1` localStorage → render `"Good morning, {Name}"` (no trailing period in the peek; kept short so it never clips on 375px viewports). If no nickname, render `"Good morning"` only.
  - Refresh whenever the drawer opens (so 11:59am → 12:00pm switches without a page reload).

### Part 2 — Wire it to the "Today" dock tap

- In `dockNav('map')`, before doing the existing map reset, call `openTodaySheet()`. Tapping the handle or the greeting row toggles peek ↔ expanded (`onclick` on the handle + on the peek row, matching `destSheet` behaviour). A `×` close button in the expanded header collapses back to peek (never fully off-screen — the greeting stays as the always-available Today entry).
- On any other tab (`discover`, `tala`, `pulse`, `saved`), call `closeTodaySheet()` (fully off-screen) via `closeAllPanels()`.
- Opening `destSheet` or `discoverPanel` also auto-collapses the Today drawer to peek so nothing stacks.

### Part 3 — The 7 editorial cards ("San Vicente Daily")

Rendered inside `.today-scroll` (scrollable body of the expanded drawer). All copy is written to feel human and local — first-person, dry humour where appropriate — never bureaucratic. Data source: static demo content in `app.js` for now, structured so admin/DB wiring can slot in later (each card is rendered by its own render function reading from a plain JS object so a follow-up pass can swap the object for a Supabase fetch).

Card order and content shape:

1. **Daily Snapshot** — six inline chips (weather icon + temp, sea condition word, sunset time HH:MM, moon phase glyph, "X tribes forming", "Y things today"). Grid of 3×2 on mobile, 6×1 from `sm:`.
2. **TALA's Pick of the Day** — one line intro ("Go north today. The sea looks calmer near Alimanguan."), then a three-node whisper path rendered as horizontal pills with `→` separators: **Late lunch → Wild beach → Sunset drink**. Each pill has a subtle time hint below.
3. **Happening Today** — vertical list of event rows. Each row: title, place · time, distance chip, vibe chip, three actions (Join / Save / Directions) as icon-buttons. Demo seed of 3-4 items covering Party / Acoustic / Surf meetup / Fiesta.
4. **Joinable Today** — real-time-feeling connection cards: "3 seats left on island-hop from Port Barton, 8am tomorrow", "2 travelers looking for dinner in Poblacion tonight", "Van from Puerto Princesa, 1 seat open". Each has a single primary action ("Ask to join") and a small avatar cluster.
5. **Sea & Weather (Decision Weather)** — three plain-language verdict rows: 🏝️ Island hopping · 🏄 Surf · 🌧️ Rain risk · 🌊 Tide. Each is a one-sentence recommendation, not raw numbers ("Good morning for island hopping. Wind may get annoying after 2 PM.").
6. **Fresh From Locals** — small feed: business avatar, one-line update, business name · barangay · time posted. Seed 3 items ("Fresh tuna arrived at Long Beach Grill", "2-for-1 sunset drinks at Nauti Beach", "Fresh pandesal from 6am, Aling Rosa"). No promo shouting, no ALL CAPS.
7. **Small Notices** — muted, low-emphasis list with a caution glyph per row: "BPI ATM Poblacion — cash available", "Gas station in Alimanguan out of unleaded until Thu", "Weak signal past Bato ni Ningning", "Muddy road to Pamuayan after last night's rain — 4x4 or scooter only".

Each card uses the same visual grammar: `border-radius:20px`, `background: rgba(255,255,255,.03)`, `border: 1px solid rgba(255,255,255,.06)`, `padding:16px`, uppercase kicker + title + body. No hero images (keeps drawer light and scannable). Copy is intentionally short and human.

### Part 4 — Publishing

Frontend-only. After merging the user must click **Publish → Update** in Lovable for `sanvic.merqato.digital` to pick up the change.

---

## Verification

Playwright, iPhone-390 viewport, against `http://localhost:8080`:

1. Tap **Today** in the dock → drawer slides up to peek; greeting reads "Good morning, {Name}" (or greeting only, no name) and is not clipped on 375px.
2. Drag / tap handle → drawer expands, all 7 cards visible and scrollable.
3. Screenshot the peek collapsed against a bright map area → no text or map lines bleed through the drawer background.
4. Switch to Explorer / Pulse / MyTrip → Today drawer closes cleanly, dock still functional.
5. Return to Today → drawer reopens at peek, greeting still correct for the current hour.
6. Desktop 1280 viewport → same behaviour, drawer is a right-side sheet if `destSheet`'s desktop treatment applies, otherwise centred bottom sheet capped at 520px width (match existing patterns).

## Open question (non-blocking)

Card 3 (Happening Today) and Card 4 (Joinable Today) are demo-seeded in this pass because there are no `events` / `join_requests` tables yet. A later pass can wire them to Supabase once those tables exist — no schema is being added here. Confirm this is acceptable, otherwise I'll add the tables in a follow-up plan.
