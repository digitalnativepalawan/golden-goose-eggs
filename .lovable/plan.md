## Goal
Refactor the bottom dock labels + icons and rebuild the Pulse panel into a Tribes-first experience with four view tabs, a category ribbon, seeded content, wizard, and empty/auth states. Pure frontend — no DB changes. Guarantee no horizontal or vertical page scrollbars on mobile/tablet/desktop; the Pulse panel itself scrolls internally.

## Files touched
- `public/site/index.html` — dock labels/icons, Pulse markup rewrite, styles
- `public/site/app.js` — Pulse renderers, tab/category state, wizard, empty + auth states, dock wiring
- `public/site/personalize.js` — helper to read nickname / auth flag used by Pulse messages

No routes, no DB.

---

## 1. Bottom dock (index.html + app.js)

Rewrite the five `.dock-item` buttons in this exact order and icon language:

1. **TODAY** — sun-in-circle icon → `dockNav('map')`
2. **EXPLORE** — compass icon → `dockNav('discover')` (label change only from "Explorer")
3. **PULSE** — pulse waveform icon, center slot → `dockNav('pulse')`
4. **MY TRIP** — heart icon → `dockNav('saved')`
5. **THE HUNT** — crosshair/target icon → `dockNav('hunt')` (replaces the "Locate" locate-me button)

`dockNav('hunt')` opens the existing TALA hunt sheet (`openTalaSheet()`), removing the old `locateUser()` shortcut from the dock (locate stays reachable via the map controls). Labels rendered uppercase via CSS `text-transform`.

## 2. Pulse header rewrite (index.html)

Replace lines 1044–1094 with:
- Title row: `Pulse` + inline neon SVG pulse-wave glyph to the right.
- Subtitle: `Find your tribe today.`
- Body copy: `Join small groups, local happenings, and live plans around San Vicente.`
- Right-floating capsule badge (dark bg, 1px border, blur): `● Live now · 8 things happening` with pulsing emerald dot (reuses `svNeonPulse` keyframe).

Remove the legacy `.pulse-tabs` (Live Feed / Channels / Nearby / Rooms) and the old `.pulse-categories` row.

## 3. Four-column view tab grid

Directly under the header, add `.pulse-viewtabs` — 4 equal columns, each with an SVG icon + label + a teal underline marker on the active tab:
- `tribes` (multi-user) — default active
- `events` (calendar-badge)
- `lounge` (chat bubble)
- `form` (plus-in-circle)

State stored on `#pulsePanel[data-view]`; switching updates marker + re-renders body.

## 4. Horizontal category ribbon

Beneath the view tabs, `.pulse-catribbon` — horizontally scrollable pill row with hidden scrollbar and a subtle right-edge chevron indicator:
`[All] [Island Hopping] [Sunset] [Food & Drinks] [Transport] [Surf] [Nightlife] [Explore] [Local Life]`

Filters current view's data by a `tags` field. Hidden when view is `form` or `lounge`.

## 5. Four view renderers (app.js)

Renderers write into `#pulseBody`. Data lives in in-memory arrays inside `app.js` (no DB).

### VIEW 1 — Active Tribes (default)
- Header card: `👥 Active Tribes` + subline + right-aligned `View all >`.
- 5 seeded tribe cards (data array `PULSE_TRIBES`):
  1. Sunset Chasers 🌅 · Long Beach · Today, 5:30 PM · "Sunset, drinks, photos & good vibes." · 4 avatars + `+2 / 6 travelers`
  2. Island Hopping Tomorrow 🚣 · Port Barton · Tomorrow, 8:00 AM · "3 island stops, crystal water." · 4 avatars + `4 travelers • 2 spots left` (amber warn style)
  3. Sunset Drinks 🍸 · Poblacion · Today, 6:00 PM · "Let's catch the golden hour." · 4 avatars + `+3 / 5 travelers`
  4. Sunrise Surf Crew 🌊 · Alimanguan · Tomorrow, 6:00 AM · "Waves, coffee, go!" · 4 avatars + `+1 / 3 travelers`
  5. Shared Ride to Port Barton 🚐 · Poblacion · Tomorrow, 10:00 AM · "2 seats open. Let's split gas!" · 4 avatars + `2 travelers • 2 seats open` (deep-emerald accent)
- Each card: left rounded thumbnail (gradient placeholder tinted per category), title/meta/subtext middle, right hollow `Join Tribe` capsule button.
- Footer banner: `👥 Can't find what you're looking for? Start a tribe and see who joins!` + `+ Form Your Tribe` button → switches view to `form`.

### VIEW 2 — Events & Happenings
- Curated cards only (organizer-backed / commercial). Data array `PULSE_EVENTS`:
  * 🎉 Full Moon Party at Baybay — Tonight 9:00 PM — Baybay Beach — Free entry
  * 🍖 Lechon by the Beach — Sunset Resort — Today 6:00 PM — ₱650/plate
  * 🎸 Acoustic Night — The Deck, Poblacion — Tonight 7:30 PM — No cover
- Each card: title, organizer name + small logo dot, location, time, optional price chip, `I'm Interested` button. No data-dry alerts.

### VIEW 3 — Community Lounge
- Scrollable chat-style stream (`PULSE_LOUNGE` seeded messages) with an input row at the bottom.
- On submit, if text matches coordination regex (`/(anyone|who wants|looking for|split|share).*?(tomorrow|tonight|today|hopping|surf|dinner|ride)/i`) append the sent bubble AND an inline helper chip below it: `Want to turn this into a Tribe? [Form Your Tribe]` (button switches view).

### VIEW 4 — Form Your Tribe (wizard)
Sequential 5-step wizard in the same body space with progress dots. State object `formDraft`:
- Q1 Plan chips: Island Hopping · Sunset · Drinks · Surf · Dinner · Shared Ride · Explore
- Q2 When: `[Today] [Tomorrow] [Pick date/time]` (third opens native datetime input)
- Q3 Where: `[Choose Place]` (opens explore picker) · `[Use Current Map Location]` · `[Type Location]` text field
- Q4 Size: `[2–4] [5–10] [10+]`
- Q5 Short note: textarea (placeholder: "Looking for 2 more people to split a boat tomorrow morning.")
- Final CTA: `Create Tribe` → prepends new entry to `PULSE_TRIBES`, switches back to Tribes view, toast confirmation.
- Back/Next buttons; can't advance until required step answered.

## 6. Empty state & auth guard

Helpers in `app.js` + `personalize.js`:
- `pulseIsSignedIn()` in `personalize.js` reads existing Supabase session or `localStorage.sanvic_user`.
- Category filter that yields zero cards renders: `Quiet for now. Start the first tribe and see who joins!` + `Form Your Tribe` button.
- Any join / create / lounge-send from an unauthenticated user opens an inline overlay inside the Pulse panel: `Want to start something? Sign in to form a tribe, join plans, or talk in the Lounge.` with `Sign in / Continue` CTA calling the existing auth entry (`openAuthPanel()` or fallback to `alert` if not present).

## 7. No-scrollbar rule (all breakpoints)

Global CSS additions in the Pulse `<style>` block:
- `html, body { overflow: hidden; overscroll-behavior: none; }` — page never scrolls.
- Any scrolling happens inside dedicated containers (`#pulseBody`, `.pulse-catribbon`, `.pulse-lounge-scroll`) with `overflow:auto` + `scrollbar-width:none` + `::-webkit-scrollbar{display:none}`.
- `.pulse-panel` uses flex column with `min-height:0` on the body child so it fills without overflow.
- Verify no horizontal overflow at 360px, 768px, 1280px viewports.

## 8. Visual system

- Tokens re-used from existing Pulse styles; add `--pulse-emerald:#10b981`, `--pulse-amber:#f59e0b`.
- Cards: `rgba(255,255,255,.03)` bg, `rgba(255,255,255,.06)` border, `border-radius:20px`, `padding:14px`.
- `Join Tribe` button: hollow capsule, 1px teal border, `background:transparent`, hover fill teal/12.
- Avatar stack: 22px circles, -8px overlap, gradient placeholders.
- Active view tab: 2px teal underline + teal icon tint; inactive: `.55` white.

## 9. Verification

- Playwright at 390×844, 820×1180, 1280×800:
  * No horizontal or vertical page scrollbars.
  * Dock shows TODAY / EXPLORE / PULSE / MY TRIP / THE HUNT with correct icons.
  * Pulse opens on Tribes view; category ribbon filters cards; empty filter shows custom message.
  * Switch to Events → 3 seeded cards render.
  * Switch to Lounge → typing "anyone wants island hopping tomorrow?" appends helper chip.
  * Switch to Form → wizard advances through 5 steps and creates a new tribe visible in Tribes view.
  * Unauthenticated tap on `Join Tribe` shows sign-in overlay.
- Screenshots at each viewport.

Changes require **Publish → Update** to reach `sanvic.merqato.digital`.
