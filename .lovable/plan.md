
## Goal
Rebuild the existing "My Trip" / Saved panel into "My Sanvic" — a private, calm, personalized pocket with 5 sections + split grid, matching the uploaded reference. Frontend only. Uses `localStorage` arrays for saved/joined state. No backend changes.

## Files touched
- `public/site/index.html` — rewrite `#savedPanel` markup + scoped CSS
- `public/site/app.js` — new renderers, seed data, empty-state handler, dock label sync
- Dock label "MY TRIP" (from previous refactor) stays; internal panel is now "My Sanvic"

---

## 1. Header
- Title: **My Sanvic** + inline teal outline heart SVG (1.5px stroke, `--pulse-teal`).
- Subtext: "Your saved places, joined tribes, plans, and discoveries."
- Tagline row (muted, italic-optional): "Your San Vicente, quietly collected."
- No promotional badges, no counters.

## 2. Cloud Sync Banner (`.mysv-sync`)
Glass card directly below header:
- Left: cloud-with-up-arrow SVG in circular tinted well.
- Middle: "Keep your Sanvic in sync" + "Sign in to access your Sanvic anywhere, on any device."
- Right: solid teal pill `Sign in` → `openAuthPanel()` (fallback: existing sign-in entry). Below it: text link `Continue anonymously` → dismisses banner for session (`sessionStorage.mysv_sync_dismissed`).
- Auto-hidden when `pulseIsSignedIn()` returns true.
- No forced redirects anywhere.

## 3. Section 1 — 📅 Upcoming (horizontal carousel)
Header row: title + subtitle + right `View all ›`.
Cards seeded in `MYSV_UPCOMING` (uses/mirrors PULSE data where overlap exists):
1. Sunset Chasers 🌅 · 5:30 PM • Long Beach · badge `Today` (teal solid) · avatars +3 · `Open Tribe Chat`
2. Lechon by the Beach 🍖 · 6:00 PM • Sunset Resort · `Today` · `View Details`
3. Island Hopping Tribe 🚣 · 8:00 AM • Port Barton · `Tomorrow` · avatars +2 · `Open Tribe Chat`
4. Acoustic Night 🎸 · 7:30 PM • Poblacion · `May 18` · `I'm Interested`

Card: 240px wide, background image with dark bottom gradient, badge top-left, avatars overlapping (−8px), capsule action.

## 4. Section 2 — 🧳 Saved Places (horizontal image grid)
Header + `View all ›`. Data `MYSV_SAVED` (5 cards): Long Beach, Boayan Island, Pamuayan Falls, Poblacion Market, Alimanguan Beach — with category · barangay and km chip.
Each panel: 160×200, full-bleed background image, filled white heart top-right (toggles saved state → removes from list), bottom info block (`title`, `category • area`, row: `📍 Xkm` pill + `⋯` action menu placeholder).

## 5. Section 3 — 👥 Joined Tribes (vertical rows)
Header + `View all ›`. `MYSV_TRIBES` seeded with 3 rows: Sunset Chasers, Island Hopping Tomorrow, Shared Ride to Port Barton.
Each row: 44px circular thumbnail · title/meta stacked · avatar cluster (+N) · `Open Chat` capsule (right-aligned).

## 6. Section 4 — Split Grid (Events × Hunt Progress)
Two columns on ≥768px (`grid-template-columns: 1fr 1fr`), stacked on mobile.
- **Left `📅 Events I'm Interested In`**: 2 vertical cards (Full Moon Party, Acoustic Night) with thumbnail, meta, avatar cluster, `View Details`.
- **Right `🎯 Hunt Progress`**:
  - Circular SVG progress ring locked at 40% (teal stroke, dark track), center label `40%`.
  - Right of ring: `Long Beach Explorer` · `4 / 10 discoveries` · `Next reward: 2 more` · small outline gift SVG.
  - Nested sub-card at base: thumbnail + "Recent reward" label · "Hidden Beach Access" title · right button `View Reward`.

## 7. Section 5 — 🕒 Recently Viewed (pill row)
Header + `View all ›`. Wrap-friendly pill row (horizontal scroll on overflow, hidden scrollbar). Pills: `Port Barton Village`, `Private Boat Experience`, `Wild Beach North`, `Sunset Drinks Tribe` — each with 20px circular thumb inside the pill.

## 8. Empty State
Rendered when every seeded/local array is empty (checked via localStorage keys `mysv_saved`, `mysv_tribes`, `mysv_events`, `mysv_recent`):
- Copy: "Your trip is still empty. Save places, join tribes, follow events, or unlock discoveries. They'll appear here."
- Three shortcut buttons: `Explore San Vicente` → `dockNav('discover')`, `Open Pulse` → `dockNav('pulse')`, `See Today` → `dockNav('map')`.
- Sync banner still visible above it.

## Technical Notes
- All new markup lives inside existing `#savedPanel` (keeps dock wiring untouched).
- Scoped styles under `.mysv-*` prefix; reuse existing tokens (`--pulse-teal`, `--pulse-emerald`, glass surfaces).
- New renderer `renderMySanvic()` called on `openSavedPanel()` (or equivalent existing opener). Reads seed arrays merged with `localStorage`.
- Interaction handlers: `mysvOpenChat(id)`, `mysvViewDetails(id)`, `mysvInterested(id)`, `mysvToggleSaved(id)`, `mysvViewReward()` — all client-only, log + optimistic UI.
- No page-level scrollbars: each carousel/pill row uses `overflow-x:auto; scrollbar-width:none; ::-webkit-scrollbar{display:none}`. Panel body scrolls internally as with other sheets.
- Responsive: mobile-first single column; split grid stacks <768px; carousels remain horizontal at all sizes.
- Placeholder images use existing barangay/discover thumbnails already referenced in `app.js` seed data; fallback to gradient tints if missing.

## Verification
Playwright at 390×844, 820×1180, 1280×800:
- Header shows "My Sanvic ♡", subtitle, and tagline.
- Sync banner visible when signed out, hidden when signed in.
- All 5 sections render with correct cards/rows/pills.
- Split grid: side-by-side on tablet/desktop, stacked on mobile.
- Clearing localStorage → empty state with 3 shortcut buttons shows.
- No page-level scrollbars at any breakpoint; internal carousels scroll.
Publish → Update required to push to `sanvic.merqato.digital`.
