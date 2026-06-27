## Objective
Add a **Light Street** map option to the existing Map/Satellite toggle without breaking the current interface or code. Boundary lines, labels, tooltips, and floating UI must remain readable and visually uniform regardless of which base tile layer is active.

## Current State
- **Street mode**: CartoDB `dark_all` tiles (dark background)
- **Satellite mode**: Esri imagery + Esri label overlay (dark background)
- **Barangay boundaries**: light sand (`#e8dcc8`) dashed lines at 55% opacity
- **Tooltips/attribution**: dark glass (`var(--glass-bg-heavy)`) with light text
- **Markers**: highly saturated colored dots with glow/shadow — readable on both light and dark
- **Floating UI** (sheets, dock, hero, bottom nav): self-contained dark-glass panels that do not depend on tile color for contrast

## Proposed Implementation

### 1. Third Tile Layer
Add CartoDB `light_all` as the "Light" base layer:
```js
const light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', ...)
```
This is the exact same provider as the current dark street layer, so attribution, maxZoom, and reliability are identical.

### 2. Three-Button Toggle
Change the layer toggle from a 2-button Map/Satellite switch to a 3-pill group:
- **Light** (new)
- **Dark** (renamed from "Map"; same existing `dark_all` tiles)
- **Satellite** (existing)

The `.map-layer-toggle` container already uses a pill layout with `gap:4px` and `border-radius:9999px`, so a third button fits without layout changes.

### 3. Dynamic Overlay Styling via Scoped CSS Class
When the user selects **Light**, apply a `.map-light` class to the `#map` container (or `<body>`). All map-native overlay styles then have scoped alternates:

| Element | Dark Mode (default) | Light Mode (`.map-light` scoped) |
|---------|----------------------|-----------------------------------|
| Barangay boundary stroke | `#e8dcc8`, opacity 0.55 | `var(--charcoal)`, opacity 0.45 |
| Barangay boundary fill | `#e8dcc8`, opacity 0.04 | `var(--charcoal)`, opacity 0.03 |
| Barangay tooltip | dark glass, light text | dark glass, light text **+ stronger shadow** (no text inversion needed; dark tooltips pop fine on light tiles) |
| Leaflet attribution | dark glass, light text | light tinted background (`rgba(255,255,255,0.85)`), dark text (`var(--charcoal)`), dark link color |
| Marker glow / ring | unchanged — saturated colors with radial glow work on any background | unchanged |

**Why not a full app light theme?**
The floating UI (bottom sheets, dock, hero search, Pulse panels) are all dark-glass overlays. Their readability is driven by their own opaque/blurred backgrounds, not the map tiles beneath them. Changing them to light would require rewriting ~80% of the CSS and break the established brand identity. We only adjust elements that sit *directly on the map tiles* (boundaries, attribution, tooltips).

### 4. Barangay Boundary Line Update
The boundary layer is created once in `initBarangayLayer()` with a static `L.geoJSON` style object. To make it reactive to map mode changes, convert the style to a **function** that reads a CSS custom property or a global JS flag:

```js
style: (feature) => ({
  color: isLightMode() ? '#06122a' : '#e8dcc8',
  weight: 1.5,
  opacity: isLightMode() ? 0.45 : 0.55,
  fillColor: isLightMode() ? '#06122a' : '#e8dcc8',
  fillOpacity: isLightMode() ? 0.03 : 0.04,
  dashArray: '4,4'
})
```

Then call `barangayLayer.setStyle(...)` inside `switchMapLayer()` whenever the mode changes. This is a standard Leaflet API call and is non-breaking.

### 5. Non-Breaking Code Changes
- `switchMapLayer(type, btn)` gains a third branch for `light` that adds/removes the `light` tile layer and sets `window._mView = 'light'`.
- `initMap()` initializes the `light` tile layer alongside `street` and `sat`, but does not add it to the map.
- No changes to marker rendering, Pulse, Tala, dashboard, auth, or data loading.
- No database migrations.

## Acceptance Criteria
1. Tapping the new **Light** button switches the base tiles to a light street map.
2. Tapping **Dark** returns to the current dark CartoDB street map.
3. Tapping **Satellite** works exactly as before.
4. Barangay boundary lines remain visible and readable on all three modes.
5. Barangay tooltips remain readable on all three modes.
6. Leaflet attribution text is readable on all three modes.
7. All existing UI (sheets, dock, markers, Pulse, search) continues to function identically.
8. No layout shifts, no broken event handlers, no console errors.