
## Goal
Build a full-featured `#huntPanel` view mirroring the "My Sanvic" pattern I just shipped — premium glassmorphic dark UI, single-stream fluid mobile-first layout that scales identically from 390 → 1280+, absolutely no page scrollbars. Frontend only. State via `sanvic_hunt_unlocked`, `sanvic_hunt_points`, `sanvic_hunt_progress` localStorage keys plus seeded arrays.

## Files touched
- `public/site/index.html` — dock label sync + `#huntPanel` markup and scoped `.hunt-*` CSS
- `public/site/app.js` — rewire `dockNav('hunt')` from Tala fallback → `openHuntPanel()`, add renderers, seed data, mock proximity check, `closeAllPanels` hook

No new packages, no new assets (uses inline SVG + CSS gradient placeholders, same convention as My Sanvic).

---

## 1. Dock sync
- Ensure Tab 5 stays labeled `THE HUNT` with crosshair/target SVG. Add `.dock-item.active` state color = `--pulse-teal` (verify existing CSS; add if missing).
- `dockNav('hunt')` → `closeAllPanels(); openHuntPanel();` (drop existing Tala fallback).

## 2. Panel shell
- `#huntPanel` positioned like `#mySanvicPanel` (fixed inset:0, z-index 80, translateY animation, flex column, overflow hidden). Body scrolls internally with `scrollbar-width:none` + webkit-scrollbar hidden.
- Global CSS enforcement at panel scope: any `.hunt-hscroll` uses `scrollbar-width:none !important; -ms-overflow-style:none !important` and `::-webkit-scrollbar{display:none !important;height:0 !important;width:0 !important}`.

## 3. Header
- Title: **The Hunt** + inline teal crosshair SVG (concentric circles + cross).
- Subtitle: `Discover. Unlock. Earn.`
- Body copy: `Find hidden spots, unlock stories, collect badges, and earn rewards across San Vicente.`
- Right-aligned floating glass status pill (single-line, gold trophy + `7 discoveries / 2 rewards ready ›`). On click: smooth-scroll `#huntSplit` into view.

## 4. Sub-nav filter slider (`.hunt-viewtabs`)
Horizontal, scroll-hidden, 6 buttons with SVG icon + label. Default active = `today`. Active state = teal icon + 2px teal underline. Buttons filter which section is highlighted/scrolled to (each section keeps a stable `id` so clicking a tab scrolls it into view — content stays on one continuous scroll, matching the "single-stream" rule):
1. Today's Hunt (target)
2. Nearby Discoveries (map pin)
3. Trails (winding path)
4. Collections (book)
5. Rewards (gift)
6. My Progress (clock/history)

## 5. Featured Today's Hunt card (`#huntToday`)
Full-width premium card:
- `TODAY` solid teal capsule top-left.
- Left dark gradient bg with title `Sunset Hunter 🌅` + description "Find the hidden marker near Long Beach before the sun goes down."
- Meta pill row: `📍 Long Beach`, `📶 Easy`, `🕒 Before 6:30 PM`.
- Reward strip (emerald-tinted band): `REWARD: 100 pts • Sunset Badge 🏅`.
- Right: overlapping avatar stack (+12) + solid teal `Start Hunt` CTA → `huntStart('sunset-hunter')`.
- Uses `aspect-ratio` container so the hero bg image doesn't distort at any width.

## 6. Section 1 — Nearby Discoveries (`#huntNearby`)
Horizontal carousel of 160×200 cards (aspect-preserved via fixed w/h, `object-fit:cover` on bg). Each seeded from `HUNT_NEARBY`:
1. Wild Beach Marker · locked · Easy · 50 pts · 0.4 km
2. Market Morning Clue · Easy · 40 pts · 1.2 km
3. Waterfall Entrance · locked · Medium · 60 pts · 3.8 km
4. Secret Viewpoint · Medium · 60 pts · 2.1 km

Top-left distance chip (`↖ X.X km`), top-right lock badge when `locked:true`. Bottom info block: title + description + `🟢 Easy • 50 pts`. On tap:
- If `exploreLink` set → card also renders inline helper link `Open in Explore` → `dockNav('discover')`.
- Otherwise → toast/log `Marker locked — get closer to unlock`.

## 7. Section 2 — Trails (`#huntTrails`)
Horizontal carousel of wide status cards with circular thumb (gradient), title, description, and horizontal progress bar (teal fill) + count + circular right-chevron button. Seeded `HUNT_TRAILS`:
1. Long Beach Explorer · 4/10 · "Discover the hidden gems along 14km of paradise."
2. Local Life Trail · 3/8 · "Experience Poblacion like a local."
3. Island Hopper Trail · 2/7 · "Unlock the best of our pristine islands."

## 8. Section 3 — Split Grid (`#huntSplit`) — Rewards × My Progress
Two columns via `grid-template-columns: repeat(2, minmax(0, 1fr))` at ≥768px, stacked below.
- **Left "🎁 Rewards"**: single visible card + bottom carousel dots. Card: bg image gradient, `NEW` amber badge, title `Free Sunset Drink`, subtext "Complete 3 Long Beach discoveries. Valid for 7 days.", hollow glass `Redeem` capsule.
- **Right "📊 My Progress"**: SVG donut (42%) left; right stacked bullets: `🎯 7 discoveries unlocked`, `🗺️ 2 trails in progress`, `🏆 3 badges earned`, `🎁 2 rewards ready`.

## 9. Section 4 — Rare Finds banner (`#huntRare`)
Horizontal glass banner: treasure-chest inline SVG (left) · title `Rare Finds` + sub `Only a few travelers have found these.` · right: avatar cluster (+7) + hollow `View all` capsule.

## 10. State & Interactions (app.js)
- `HUNT_STATE = { unlocked:[], points:0, progress:{} }` loaded/persisted via the three localStorage keys.
- `huntStart(id)` runs mock proximity check: `navigator.geolocation.getCurrentPosition` → compare against seeded target coord (Long Beach ~10.79/119.32). If unavailable or delta > 100 m, show overlay banner inside panel: `Marker out of range. Head to the location in San Vicente to unlock this story layer.` (dismissible). If within range, increment `points`, push to `unlocked`, persist, re-render.
- `huntSelectTab(tab)` sets active underline + `scrollIntoView({behavior:'smooth', block:'start'})` on the matching section.
- `huntRedeem(id)` / `huntOpenTrail(id)` / `huntOpenCard(id)` — client-only handlers wired to placeholders/log for now.
- `openHuntPanel()` / `closeHuntPanel()` — pattern-identical to My Sanvic. Add to `closeAllPanels`.

## 11. Global compliance rules
- No mobile/tablet/desktop preview branches — single markup path, fluid CSS. (Nothing to remove — never existed.)
- `html, body { overflow:hidden }` already enforced by earlier Pulse work; hunt panel body is the only scroller.
- All `.hunt-hscroll`, sub-nav, category rows carry the strict scrollbar-erase CSS block above.
- Split grid uses `grid-template-columns: repeat(2, minmax(0, 1fr))` at ≥768px with `min-width:0` on children to prevent text clipping.
- All bg images use `aspect-ratio` (fixed W/H containers) + `object-fit:cover` (via CSS `background-size:cover`).
- Identical spacing/radius/typography tokens across breakpoints (reuse `--ocean-teal-light`, `--pulse-teal`, radius 16–20).

## Verification
Playwright at 390×844, 820×1180, 1280×800:
- Dock tab 5 shows THE HUNT with target icon; active state teal.
- Panel opens; header + status pill + 6-tab sub-nav render.
- Featured Today card, Nearby carousel (4), Trails carousel (3), Split grid (stacked <768, side-by-side ≥768), Rare Finds banner all present.
- Zero page-level horizontal or vertical scrollbars at all three widths.
- Clicking the status pill scrolls to Split section; clicking `Start Hunt` with denied geolocation shows the out-of-range overlay.
- Screenshots at each viewport confirm identical spacing and no clipping.

Publish → Update required to push to the live domain.
