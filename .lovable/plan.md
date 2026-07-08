# Map Interface Structural Cleanup

Scope: `public/site/index.html` and `public/site/app.js`. Presentation only — no data / routing changes.

## 1. Dock backdrop hardening (`.bottom-dock`)

In `index.html` (line ~160), replace the current `background:var(--glass-bg-heavy)` on `.bottom-dock` with a defensive opaque glass:

- `background: rgba(10, 20, 32, 0.85)`
- `backdrop-filter: blur(16px) saturate(140%)` + `-webkit-backdrop-filter` twin (Tailwind-safe form)
- Keep existing border, radius, shadow, opacity/transform transitions

Result: white text or scroll content passing behind the dock never bleeds through.

## 2. `body.panel-open` state class

`app.js` currently opens/closes panels via `openTodaySheet`, `openExploreSheet`, `openPulsePanel`, `openMySanvicPanel`, `openHuntPanel`, `openDiscoverPanel`, `openDashboard`, `openAroundMePanel`, `openDestSheet`, `openTalaSheet`, and `closeAllPanels()`.

Introduce two tiny helpers at the top of the panel section:

```js
function setPanelOpen(on){ document.body.classList.toggle('panel-open', !!on); }
```

- Each `open*` function calls `setPanelOpen(true)` at the end.
- `closeAllPanels()` and every individual `close*` sibling call `setPanelOpen(false)` (guarded so closing one panel while another is still open re-checks: after close, if any known panel element still has an "open/peek/expanded/visible" class, keep the flag on — simple `document.querySelector('.today-sheet.peek, .today-sheet.expanded, .explore-sheet.open, #pulsePanel:not(.hidden), #mySanvicPanel:not(.hidden), #huntPanel:not(.hidden), #discoverPanel.open, #aroundMePanel.open, #destSheet.open, #talaSheet.open, #dashboard.open')` check).

CSS in `index.html` (new small block near the hero styles):

```css
.hero-overlay, #heroWeather, .today-peek .today-greet {
  transition: opacity .28s ease, transform .28s ease;
}
body.panel-open .hero-overlay,
body.panel-open #heroWeather,
body.panel-open .today-peek .today-greet {
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
}
```

This hides the "Good afternoon, {name}" greeting and the floating weather alert row whenever any drawer/panel is expanded, eliminating the observed text overlap.

## 3. Symmetrical header alignment

Currently `.hero-overlay` stacks brand → headline → subtitle → weather → search with default left-aligned spacing, which lets the greeting/weather drift out of column when the weather line wraps.

Adjust `.hero-overlay` block:

- Add `display:flex; flex-direction:column; align-items:center; text-align:center; padding-top: calc(env(safe-area-inset-top,0px) + 20px);`
- Give `#heroWeather` fixed `min-height:26px`, `margin-top:10px`, `justify-content:center` so the "Be aware • Drizzle" pill sits on a stable line directly below the greeting/headline regardless of severity variant.
- Give the greeting/headline row a fixed `min-height` (e.g. `min-height:64px`) so time-of-day switches don't shift the alert bar vertically.

No JS logic change — purely CSS tokens on existing elements.

## 4. Zero layout distortion pass

- Confirm the new `.bottom-dock` rule is inside the mobile-first block and the existing `@media(min-width:768px)` override (line ~554) still applies only spacing tweaks.
- Confirm `.hero-overlay` centering rules don't collide with existing `hero-brand`/`hero-search` widths — set `max-width:min(560px,92vw); width:100%; margin-inline:auto` on inner rows.
- Verify with Playwright at 390×844, 820×1180, 1280×800 that:
  - Dock is fully opaque against a light scroll behind it
  - Opening Today / Explore / Pulse / My Sanvic / Hunt hides greeting + weather
  - Closing all panels restores them
  - Header greeting stays centered above weather badge at all breakpoints
  - No horizontal scrollbars, no JS errors

## Files touched
- `public/site/index.html` — dock CSS, hero-overlay CSS, new `body.panel-open` rules
- `public/site/app.js` — `setPanelOpen` helper wired into every `open*`/`close*`/`closeAllPanels`
