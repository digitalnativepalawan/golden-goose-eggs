## Goal
Add a premium 3-snap bottom drawer `#exploreSheet` for the EXPLORE tab, replacing the current flat `#discoverPanel` behavior. Map-first DNA preserved. Time-sensitive content stays in the TODAY drawer; EXPLORE only holds permanent places, areas, and directories.

## Files touched
- `public/site/index.html` — add `#exploreSheet` markup + CSS
- `public/site/app.js` — snap logic, renderers, personalization, dock wiring

No route, DB, or backend changes.

---

## 1. Drawer shell (index.html)

Insert `#exploreSheet` above the dock nav, below the map. Structure:

```text
.explore-sheet
├── .es-handle (drag bar, 40×4)
├── .es-peek           (Level 1 — always visible)
│   ├── .es-search   ("Search or ask TALA…" input, ⌕ icon left)
│   └── .es-foryou-ribbon (horizontal chip scroller)
└── .es-body           (scrollable, revealed at L2/L3)
    └── #exploreContent (renderExploreContent() target)
```

Styling parity with `#todaySheet`:
- Background: `linear-gradient(180deg, rgba(4,10,26,0.96), rgba(2,6,18,0.99))`
- `backdrop-filter: blur(28px) saturate(140%)`
- 1px top white border, soft top shadow, `border-radius: 24px 24px 0 0`
- Positioned `bottom: calc(72px + var(--safe-bottom,0px))`, z-index above map / below dock
- Transition: `height .32s cubic-bezier(.2,.8,.2,1)`

Snap heights (CSS custom prop `--es-h`):
- `L1`: `120px` (peek — search + For You ribbon only, body hidden)
- `L2`: `45dvh`
- `L3`: `min(92dvh, 760px)`

---

## 2. Snap + gesture logic (app.js)

Add `openExploreSheet()`, `closeExploreSheet()`, `setExploreSnap(level)`.
- Handle bar click cycles L1 → L2 → L3 → L1.
- Pointer/touch drag on `.es-handle` and `.es-peek`: track deltaY, on release snap to nearest level; downward drag past L1 stays at L1 (never fully off-screen while EXPLORE tab is active).
- Focus on `.es-search` input auto-snaps to L2.
- Add `closeExploreSheet()` to `closeAllPanels()`.

## 3. Dock wiring

Rename the visible dock label from "Discover" to "Explore" (data-tab stays `discover` for backward compat). Update `dockNav('discover')`:
```js
case 'discover':
  closeAllPanels();
  closeDiscoverPanel(); // retire the old flat panel
  openExploreSheet();
  break;
```
Other tabs call `closeExploreSheet()` via `closeAllPanels()`. Opening TODAY/TALA/Pulse/Saved collapses Explore.

## 4. Content renderer `renderExploreContent()`

Reads `localStorage.sanvic_entry_v1` + nickname. Renders 7 vertical sections, each a card block with uppercase kicker + human title + body. All copy uses resident-voice tone; no corporate travel phrasing.

**Layer 1 — FOR YOU** (also seeds the peek ribbon)
- Title: `For {Name} — Places worth leaving your hammock for` (fallback: `Places worth leaving your hammock for`)
- Match onboarding choices → floated place cards:
  - `wild_beach` → Long Beach (quiet stretch), Alimanguan, New Agutaya
  - `perfect_photo` → Sunset viewpoints, Boayan bend, golden-hour boats
  - `chardonnay` / `private_boat` → Private island hopping, beachfront dining
  - `local_market` → Poblacion market, food stops, barangay routes
  - `massage` / `brunch` → Wellness slots, slow cafés, brunch spots
- Peek ribbon = same seed reduced to chip labels.

**Layer 2 — NEARBY** (geo-offset action matrix)
Static contextual nodes (no live data): 🍽️ Lunch within 10 min · 🌅 Sunset spot nearby · 🛵 Scooter route close · ☕ Coffee nearby. Each opens a filtered map view via existing `filterCategory` / `focusMarker` helpers.

**Layer 3 — BY MOOD** (5 emotional buckets, each expandable)
- "I want something quiet" · "I want to eat well" · "I want adventure" · "I want beauty" · "I want local life"
- Each bucket lists 3–5 curated place chips.

**Layer 4 — TALA COLLECTIONS**
Editorial tiles: "Places most tourists miss", "Best places before sunset", "Where to go when Port Barton feels too busy", "Scooter routes worth getting dusty for".

**Layer 5 — AREAS / BARANGAYS**
Grid of 9 area cards with resident-voice one-liners: Poblacion, Port Barton, Long Beach, Alimanguan, New Agutaya, San Isidro, Kemdeng, Binga, Caruray. Tapping flies map to that area.

**Layer 6 — CATEGORIES**
Icon grid: Beaches, Islands, Waterfalls, Food & Drink, Nature, Culture, Activities, Wellness, Surf, Transport, Viewpoints. Each triggers `filterCategory(...)`.

**Layer 7 — ALL PLACES**
Scrollable list of all permanent markers + filter toggle row: Open Now · Good for Sunset · Good when Raining · Hard to Reach · Easy to Reach · Social Travelers · Free · Bookable. Toggles are visual + apply predicate on the seeded place list.

## 5. Card rule enforcement
Every place card renders `emoji + one-line "why care" + "Good for: …"`, seeded per the examples (Boayan Island, Long Beach, Alimanguan, Poblacion Market, etc.). Helper `placeCard({emoji,name,why,goodFor})` used across layers for consistency.

## 6. Ecosystem separation
- EXPLORE = permanent places, areas, categories (this drawer).
- Time-sensitive / seasonal / today-only content stays in `#todaySheet`.
- No live "happening now" or event feed inside `#exploreSheet`. Add code comment stating this rule at the top of `renderExploreContent()`.

## 7. Verification
- Playwright iPhone 390×844: tap Explore dock → drawer opens at L1 (map visible). Drag up → L2 → L3. Drag down → collapses back to L1. Search focus jumps to L2. Switching to TODAY collapses Explore.
- Confirm greeting name + For You personalization when `sanvic_entry_v1` present.
- Confirm no event/time-of-day content leaks into Explore.
- Screenshots at L1, L2, L3.

Changes require **Publish → Update** to reflect on `sanvic.merqato.digital`.
