## Diagnosis

I reproduced the mobile issue on `sanvic.merqato.digital` in an iPhone-sized browser and found the root cause: **the dock is being disabled by leftover CSS from the entry flow**, not by anything broken in the dock itself.

Specifically, in `public/site/entry-flow.js` line 57 there is this global rule:

```
body.sanvic-entry-lock #bottomDock.visible,
body.sanvic-entry-lock #talaOrbWrap
{ opacity:0 !important; pointer-events:none !important }
```

And `public/site/index.html` renders the body pre-locked:

```html
<body class="sanvic-entry-lock sanvic-overview">
```

The `sanvic-entry-lock` class is only removed inside `complete()` → `unlock()`, which only runs when the user finishes the nickname/vibe/welcome flow. For any **returning visitor** (has `localStorage['sanvic_entry_v1']` from a previous visit), `entry-flow.js` takes the fast path:

```js
if(!shouldShow()){ setTimeout(applyProfile,0); return; }   // never unlocks
```

Result: `sanvic-entry-lock` stays on `<body>` forever, which forces the dock to `pointer-events:none`. Taps on Today / Explorer / Pulse / Hunt / MyTrip do nothing.

Why it looks fine on desktop: you completed the entry flow at least once in that browser session, so `unlock()` ran and stripped the class. On your phone you're a "returning visitor" (localStorage from a previous test) — the fast path skips the unlock, and the dock becomes dead.

I also confirmed the site JS, cache-busting, `dockNav`, `sb` client, and the `.visible` class on `#bottomDock` are all correct — the only thing wrong is that lingering `sanvic-entry-lock` body class.

## Fix (small, surgical, no behavior change for first-time users)

Edit **only** `public/site/entry-flow.js`:

1. In the returning-visitor branch, unlock the dock immediately:
   ```js
   if(!shouldShow()){
     document.body.classList.remove('sanvic-entry-lock');
     const b=document.getElementById('bottomDock'); if(b) b.classList.add('visible');
     const t=document.getElementById('talaOrbWrap'); if(t) t.classList.remove('hidden');
     setTimeout(applyProfile,0);
     return;
   }
   ```
2. As a belt-and-suspenders safeguard, when `complete()` runs, also ensure the class is stripped even if the DOM node is already gone (already handled, keep as is).
3. Add a one-time safety net at the top of the IIFE: if `localStorage['sanvic_entry_v1']` exists on load, remove `sanvic-entry-lock` synchronously before any paint, so previously-stuck users are auto-recovered on their next visit without needing `?resetEntry=1`.

## Verify before reporting done

- Playwright iPhone-390 emulation against the live domain: seed `localStorage['sanvic_entry_v1']`, reload, confirm dock is visible AND tapping Pulse opens the Pulse panel.
- Also verify the first-time flow (no localStorage) still shows the nickname → vibe → welcome sequence and completes correctly.
- No changes to `index.html`, `app.js`, dock markup, or any other file.

## After merging

Frontend change → you need to click **Publish → Update** so `sanvic.merqato.digital` picks it up. I won't publish for you unless you ask.
