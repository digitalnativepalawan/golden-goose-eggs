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

(function loadSanvicExperienceModules(){
  // MODULE_DEPLOY_VERSION must be bumped whenever module files change so
  // browsers always fetch the latest version, ignoring stale URL ?v= params.
  const MODULE_DEPLOY_VERSION = '1782860000000';
  ['entry-flow.js', 'personalize.js', 'pulse-demo-content.js', 'map-pin-boost.js', 'barangay-marker-polish.js'].forEach((file) => {
    const script = document.createElement('script');
    script.src = file + '?v=' + MODULE_DEPLOY_VERSION;
    document.body.appendChild(script);
  });
})();
