## Scope
Front-end only polish to `public/site/index.html` and `public/site/app.js`. No DB/API changes, no ID changes.

## 1. "FOR YOU" subtitle — rotating vibe line
- In `app.js`, find the code that renders the "FOR YOU" header subtitle (currently prefixed with `For {Name} —`).
- Remove the `For [Name] —` concatenation entirely.
- Add a module-scope const:
  ```js
  const FOR_YOU_VIBES = [
    "San Vicente's shades",
    "Salty hair, slow hours",
    "Where the map fades",
    "Off the grid, on the pulse",
    "Low-tide secrets",
    "Raw and unwritten",
  ];
  ```
- On app init (same place that currently writes the subtitle), pick one at random and inject as the subtitle text. Pick once per session so it doesn't flicker on re-render.

## 2. "AREAS & BARANGAYS" subtitle — static editorial line
- In `index.html` (Explore panel, Areas & Barangays block), replace the subtitle currently reading `How the map actually reads` with the static string: `San Vicente's shades`.
- If `app.js` ever overwrites that node, guard it so this static value is not replaced.

## 3. Three-position sheet snapping + glass standard
- Refactor the sheet gesture/state logic used by Explore and Today drawers into three snap positions:
  - `peek` → height 168px (safe above dock)
  - `mid`  → 50vh
  - `full` → 100vh (or `100dvh` where supported) with internal scroll
- Wire drag/swipe end + programmatic open to snap to the nearest of the three; keep existing open/close entry points working.
- Ensure content containers inside `full` become the scroll owner (overflow-y:auto) so the sheet itself doesn't jitter.

## 4. Global glassmorphic drawer standard
Add one CSS rule targeting every drawer/panel container (Explore sheet, Today sheet, My Sanvic, Pulse sheet, The Hunt sheet, TALA sheet, detail sheets):

```css
.sheet, .drawer, .panel-sheet, #explorePanel, #todayPanel,
#mySanvicPanel, #pulsePanel, #huntPanel, #talaSheet, .detail-sheet {
  background: rgba(10, 16, 26, 0.75) !important;
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
}
```
(Exact selector list finalized after reading current class names — no ID renames.) This guarantees the neon dots/contours remain faintly visible through every open panel.

## 5. Guardrails
- No changes to Supabase tables, endpoints, or existing DOM IDs.
- No new dock items, no layout branch duplication.
- Verify via Playwright at 390×844 that: FOR YOU shows a rotating vibe (no "For X —"), Areas & Barangays reads "San Vicente's shades", sheets snap to 168px / 50vh / 100vh, and map dots remain visible behind open panels.
