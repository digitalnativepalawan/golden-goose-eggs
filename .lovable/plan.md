## Goal
Make the Pulse compose sheet visually clean (no white native dropdown shadowing the form), make the Location button actually work, and persist the chosen location with the post so it shows in the feed.

## What I'll change

### 1. Replace the native `<select>` channel picker with a custom dropdown
The white overlay in your screenshot is the browser's native `<select>` menu — it ignores our dark theme. I'll swap it for a styled button + popover list (same options: General, Hidden Spots, Island Hopping, Food & Nightlife, Surf Report, Events Tonight) using existing `--charcoal-surface` / `--glass-border` tokens so it matches the rest of Pulse.

### 2. Real Location picker (Location button)
Replace the `alert(...)` stub with a small bottom-sheet picker that offers:
- **Use my current location** — calls `navigator.geolocation`, reverse-matches to the nearest San Vicente destination (haversine against existing `destinations` array) and tags that name. Falls back to "Near San Vicente" if outside ~30km.
- **Pick from list** — scrollable list of San Vicente locations sourced from the existing `destinations` array (Long Beach, Port Barton, Boayan Island, Alimanguan, Bigaho Falls, Poblacion, etc.) plus a "Clear" option.

Chosen value renders as a small chip under the textarea ("📍 Long Beach ✕") so the user sees what's attached and can clear it.

### 3. Persist location with the post
`submitPulsePost()` already inserts into `pulse_posts`. I'll add `location_text: chosenLocation || null` to the insert payload (column already exists and is already read back in `renderPulseFeed`), so newly posted items show the location pin in the feed immediately.

### 4. Small compose polish
- Reset chosen location, image, name, and category back to defaults on close/submit.
- Keep the existing 30s rate-limit and "open to everyone" copy.
- Ensure `pulse-compose-sheet` z-index sits above the blurred Pulse panel (it already does at z=99; verify the new custom-dropdown popover uses z=100 so it doesn't hide behind anything).

## Scope / non-goals
- No DB migration needed — `location_text` column exists.
- No changes to map, auth, posts schema, or feed rendering logic beyond passing `location_text` on insert.
- Photo upload already works and stays untouched.

## Files touched
- `public/site/index.html` — replace `<select>` with custom dropdown markup, add location picker sheet + chip, add minimal CSS for both.
- `public/site/app.js` — custom dropdown open/close + state, location picker functions (`openPulseLocPicker`, `useCurrentLocation`, `pickPulseLocation`, `clearPulseLocation`), include `location_text` in the insert, reset state on close.
