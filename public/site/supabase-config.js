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
