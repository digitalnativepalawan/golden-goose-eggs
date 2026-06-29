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

// Load SANVIC first-visit experience and soft personalization as isolated modules.
// They wait for page readiness internally, so this keeps the main interface untouched.
(function loadSanvicExperienceModules(){
  const parentV = new URLSearchParams(window.location.search).get('v');
  const v = parentV || String(Date.now());
  ['entry-flow.js', 'entry-polish.js', 'personalize.js'].forEach((file) => {
    const script = document.createElement('script');
    script.src = file + '?v=' + encodeURIComponent(v);
    document.body.appendChild(script);
  });
})();
