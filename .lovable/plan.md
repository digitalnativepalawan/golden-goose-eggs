## Goal
Make the preview always show the latest `public/site/*` after a rebuild — never a stale cached `app.js`, `index.html`, or iframe view.

## Changes

### 1. Generate a build-time version token
Add `src/lib/buildVersion.ts` exporting `BUILD_VERSION` derived from `import.meta.env.VITE_BUILD_ID` with a fallback to `Date.now()` at module load. Vite inlines this at build, so every rebuild gets a new value.

### 2. Cache-bust the iframe in `src/routes/index.tsx`
- Append `?v=${BUILD_VERSION}` to the `/site/index.html` URL used in both `window.location.replace` and the `<iframe src>`.
- This guarantees the wrapper route requests a fresh HTML on every new build.

### 3. Cache-bust `app.js` inside `public/site/index.html`
- Replace `<script src="app.js"></script>` with a tiny inline loader that injects `<script src="app.js?v=<token>">` where `<token>` = `Date.now()` (or a `?v=` value read from the parent URL's query string when present).
- Result: every load of `site/index.html` pulls a fresh `app.js`.

### 4. Send no-cache headers for `/site/*`
Add a server route `src/routes/api/site-asset.ts` is overkill — instead, set `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">` plus `Pragma: no-cache` and `Expires: 0` in `public/site/index.html` `<head>`. This stops the browser from serving a stale copy when the URL is revisited.

### 5. Force iframe reload on route mount
In `Index()`, add a `key={BUILD_VERSION}` on the `<iframe>` and call `iframeRef.current?.contentWindow?.location.reload()` once on mount so even a soft client-side nav re-fetches.

## Out of scope
- No changes to `app.js` logic, map behavior, or styling.
- No changes to backend or Supabase.

## Technical notes
- `BUILD_VERSION` uses `Date.now()` at module evaluation as a safe fallback so dev (HMR) and production both get a fresh token per build.
- Query-string cache-busting is sufficient; we don't need to rename files or touch the Vite build config.
