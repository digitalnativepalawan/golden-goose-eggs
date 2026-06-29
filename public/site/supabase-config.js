// ═══════════════════════════════════════════════════════
// Supabase connection for the static SANVIC.PH site.
// Public anon/publishable key — safe to expose client-side,
// access is governed by Row Level Security policies on the
// destinations / tala_responses / tala_settings tables.
// ═══════════════════════════════════════════════════════
const SUPABASE_URL = "https://qkbqvdwplgakjdhxdbiz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZvdKuIsiZIsW2-w1bHts2w_HHBj6r4-";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: { headers: { apikey: SUPABASE_ANON_KEY } },
});

(function loadSanvicExperienceModulesAfterApp(){
  const files = ['entry-flow.js', 'personalize.js', 'pulse-demo-content.js'];
  const parentV = new URLSearchParams(window.location.search).get('v');
  const v = parentV || String(Date.now());
  let loaded = false;

  function appLooksReady(){
    return typeof window.openPulsePanel === 'function' ||
           typeof window.openDiscoverPanel === 'function' ||
           document.getElementById('bottomDock');
  }

  function load(){
    if(loaded) return;
    loaded = true;
    files.forEach((file) => {
      if(document.querySelector('script[src^="' + file + '"]')) return;
      const script = document.createElement('script');
      script.src = file + '?v=' + encodeURIComponent(v);
      document.body.appendChild(script);
    });
  }

  function waitForApp(startedAt){
    if(appLooksReady() || Date.now() - startedAt > 6000){ load(); return; }
    setTimeout(() => waitForApp(startedAt), 80);
  }

  if(document.readyState === 'complete') waitForApp(Date.now());
  else window.addEventListener('load', () => waitForApp(Date.now()), { once:true });
})();
