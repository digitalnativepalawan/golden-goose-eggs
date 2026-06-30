## Goal

Replace the current flat colored dots on the map with clean, category-aware glyph pins that scale gracefully with zoom, and give admins a Lucide icon picker per category so the map stays visually consistent across all destinations.

## Design direction

Keep the dark, editorial SANVIC aesthetic — no cartoonish 3D pins. Two parts to the marker:

1. **Soft halo** — a low-opacity colored glow (category color) so pins read at a glance without shouting.
2. **Glyph chip** — a small rounded square (~26px) with a 1px border in the category color, dark translucent fill, and a white Lucide glyph centered inside. Featured destinations get a thin accent ring + slightly larger chip.

```text
   ╭──────╮
   │  ⛰   │   ← 26px chip, category-tinted border
   ╰──────╯
      ·         ← 4px tail dot anchored on coordinate
```

Selected/hovered marker lifts to ~32px and gains a brighter ring. This matches the reference screenshot's quiet-but-precise feel while staying legible on satellite, dark, and the new light tiles.

## Zoom behavior (anti-eyesore on mobile)

- z ≤ 11 (regional): show halo only, no chip — pins become quiet dots, no overlap clutter.
- z 12–14 (district): chip appears at 22px, no label.
- z ≥ 15 (street): chip 26px, name label fades in below.
- Featured pins always render one tier earlier than non-featured so the map has a clear visual hierarchy when zoomed out.

Implemented via a single Leaflet `zoomend` handler that toggles classes on a marker layer — no re-creation of markers, so panning stays smooth on phones.

## Icons come from the category, not the destination

Each row in `destination_categories` gets a new `icon` column storing a Lucide icon name (e.g. `mountain`, `waves`, `utensils`, `bed-double`). Every destination inherits its category's icon, so the map is automatically consistent and admins only manage icons in one place.

Admin "Manage categories" panel gains an **Icon picker**:
- Search box + scrollable grid of ~80 curated travel-relevant Lucide icons (beaches, food, lodging, activities, viewpoints, transport, culture, nature, services).
- Click to select; preview chip on the right shows exactly how the pin will look on the map using the category color.
- Stored as a string key; rendered client-side from a single `LUCIDE_ICONS` map so there's no runtime fetch.

## Technical details

- **DB**: add `icon TEXT NOT NULL DEFAULT 'map-pin'` to `public.destination_categories`. Backfill sensible defaults per existing category key (beach→waves, food→utensils, etc.). No changes to `destinations`.
- **Rendering**: replace the current `L.circleMarker` / colored dot path in `public/site/app.js` with `L.divIcon` whose HTML is `<div class="sv-pin sv-pin--{key}"><span class="sv-pin__glyph">{svg}</span></div>`. Lucide SVG strings come from a small inline registry (only icons we actually expose in the picker are bundled — keeps payload small).
- **CSS**: add `.sv-pin`, `.sv-pin__chip`, `.sv-pin__halo`, size tiers `.is-zoom-low/mid/high`, and `.is-featured` / `.is-active` modifiers to `public/site/index.html`. Tinting uses the existing `--cat-color` CSS var already set per category.
- **Zoom controller**: one `map.on('zoomend', ...)` that sets `low|mid|high` on the marker pane root; CSS handles the rest. No per-marker JS work on zoom.
- **Admin UI**: extend the existing category form in `app.js` with an icon picker modal; save writes `icon` alongside `key/label/color`.
- **Light/Dark/Satellite parity**: chip uses translucent dark fill + category-tinted border in dark/satellite; switches to translucent white fill + darker glyph in light mode via the existing tile-mode class on `<body>`. Boundary lines and labels are untouched.

## Out of scope

- No changes to Pulse, Tala, Discover, or nearby_places.
- No new dependencies — Lucide SVGs are inlined as strings for the curated set; we do not pull in `lucide` as an npm package for the static site.
- No marker clustering in this pass (can be a follow-up if density grows).

## Acceptance

- Every destination on the map renders with its category's Lucide glyph in a tinted chip.
- Zooming out on mobile collapses pins to quiet halos; zooming in reveals chips then labels — no overlap soup.
- Admin can change a category's icon and color and see all its destinations update on the map after save.
- Light, Dark, and Satellite modes all keep pins legible without restyling boundaries or fonts.
