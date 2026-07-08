## Scope

Four surgical fixes across `public/site/entry-flow.js`, `public/site/app.js`, `public/site/map-pin-boost.js`, and `public/site/barangay-marker-polish.js`. No DB / route / component changes.

---

### 1. Landing splash — enforce 5s minimum before onboarding

The intro splash currently fades at 2200ms (`app.js:2079`) and the entry-flow onboarding modal appears `DELAY = 2600ms` after `window.load` (`entry-flow.js:6, 154`). On a warm cache the two collapse into ~2.5s total.

- Bump the entry-flow `DELAY` constant from `2600` to `5200` so the nickname / vibe / welcome modal never opens before ~5s.
- Push the splash-hide timer in `app.js` from `2200` to `5000` so the "SANVIC — The San Vicente tourist hub" splash itself stays visible the full 5 seconds.
- Also delay the "show dock & orb" cue that fires right after the splash by the same amount so the dock doesn't reveal early behind the splash.
- Keep the returning-visitor fast-path in `entry-flow.js` (dock unlock) unchanged — it already works.

### 2. Neon-dot markers (destinations)

Replace the current triple-layer `.mk-wrap` / `.mk-glow` / `.mk-ring` / `.mk-dot` markup in `rebuildMarkers()` (`app.js:648`) with a single tiny glowing dot: ~7px core, colored `box-shadow` for a soft radial halo, one subtle CSS keyframe pulse (opacity + halo radius only, no scale jitter). Shrink the divIcon to `iconSize:[14,14], iconAnchor:[7,7]`.

Add a colour resolver `neonColorForCategory(category)` used by `rebuildMarkers()`:

| Category key(s)                                        | Colour               |
| ------------------------------------------------------ | -------------------- |
| `stays` (Accommodations)                               | Amber `#facc15`      |
| `food` / any category labelled Food / F&B              | Neon Red `#ff3b47`   |
| `beaches`, `nature` (viewpoints/waterfalls), `islands` | Matrix Green `#39ff88` |
| `transport`, `airport` (public transport / airports)   | Cyber Purple `#a855f7` |
| everything else / fallback                             | keeps `catStyle.color` so admin-defined categories still work |

Barangay centre dots (rendered in `map-pin-boost.js`) get the Electric Blue `#00b3ff` treatment via the same tiny-dot styling.

Override the old `.mk-*` CSS in `map-pin-boost.js` (already the central style sheet for markers) so any leftover ring/border markup is invisible — belt-and-braces in case admin data still references the old classes.

Admin category editor keeps working as-is: the colour picker still writes `catStyle[key].color`; the neon resolver only overrides for the five reserved functional categories above. All existing custom admin categories continue to render with their chosen colour, just in the new tiny-dot style. No admin UI changes required for this pass.

### 3. Zoom-based barangay labels

Today `barangay-marker-polish.js` explicitly *forces* labels visible in overview view:

```css
body.sanvic-overview .sv-brgy-pin.label-hidden .sv-brgy-label{display:inline-flex!important;}
```

That single rule is what causes the stack-up.

- Remove that override.
- In `layoutLabels()` treat the overview / low-zoom case as "hide all labels" instead of "show all". Concretely: when `map.getZoom() <= 11`, add `.label-hidden` to every `.sv-brgy-pin` (dots stay, labels gone). At zoom `>= 12` run the existing overlap-culling pass so labels appear as the user zooms in and de-cluster naturally.
- Keep the mobile media queries; just let the dot-only state be the default at overview zoom on every viewport.

### 4. Rename "Poblacion" → "San Vicente - Poblacion" on the map

Only the on-map label needs to change; historical copy inside AI answers, Pulse posts, and admin help text stays as-is (those aren't map labels).

- In `map-pin-boost.js` `ensureBarangayMarkers()`, when the feature name is `"Poblacion"`, render the label as `"San Vicente - Poblacion"` (dot stays the same, positioning unchanged).
- In the seed destination list (`app.js:41`) the entry `name:"San Vicente Poblacion"` becomes `name:"San Vicente - Poblacion"` so the destination card matches.
- Leave `barangays.geojson.js` untouched — the underlying feature property stays `"Poblacion"` so any `barangay` lookups (nearby-places grouping, admin datalist) keep working.

---

## Verification

Playwright, iPhone-390 viewport, against `http://localhost:8080`:

1. Fresh visit (no localStorage): splash "SANVIC — The San Vicente tourist hub" stays fully visible ≥5s, then the nickname modal appears.
2. Returning visitor (seed `sanvic_entry_v1`): splash still stays ≥5s, dock unlocks after, Pulse tap opens the panel.
3. Zoomed out (default view): screenshot shows dots only, no stacked white labels.
4. Zoom in to a barangay: labels reappear, no overlap.
5. Poblacion label reads "San Vicente - Poblacion".
6. Destination pins render as tiny glowing dots in the correct functional colour per category (spot-check beaches/green, stays/amber, culture-or-food/red, etc.).

## After merging

Frontend-only changes → the user must click **Publish → Update** in Lovable for `sanvic.merqato.digital` to pick them up. No DB migration, no edge function redeploy.
