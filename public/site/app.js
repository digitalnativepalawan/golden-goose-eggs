// ═══════════════════════════════════════════════════════
// SANVIC.PH × TALA — Clean Interaction Model
// One active layer at a time. Map is the product.
// Data lives in Supabase (destinations, tala_responses, tala_settings).
// Hardcoded arrays below are only the fallback used if the
// Supabase fetch fails (offline, RLS issue, etc).
// ═══════════════════════════════════════════════════════

// ─── DEFAULT/FALLBACK DATA ───
const DEFAULT_DESTINATIONS = [
  { id:1, name:"Long Beach", lat:10.4962, lng:119.2607, category:"beaches",
    image:"assets/san-vicente-long-beach.jpg",
    description:"San Vicente's signature coastline: a long, open sweep of golden sand with gentle water, coconut edges, and quiet sections that still feel undeveloped compared with busier Palawan towns.",
    tip:"Best for sunset, long walks, and easy swimming. Start near Poblacion, then move north or south for quieter stretches.",
    stats:{rating:"4.9",travel:"10m from Poblacion",temp:"29°C",season:"Nov–May"}, color:"#0ea5e9" },
  { id:2, name:"Port Barton", lat:10.4102, lng:119.1771, category:"beaches",
    image:"assets/san-vicente-port-barton.jpg",
    description:"A relaxed fishing village inside San Vicente with calm bay views, island-hopping boats, simple beachfront stays, and a slower local rhythm made for unhurried travelers.",
    tip:"Use Port Barton as the base for island hopping. Bring cash, book boats early, and expect a quieter night scene.",
    stats:{rating:"4.8",travel:"1h 20m from Poblacion",temp:"29°C",season:"Dec–May"}, color:"#0ea5e9" },
  { id:3, name:"Boayan Island", lat:10.5500, lng:119.0900, category:"islands",
    image:"assets/san-vicente-boayan.jpg",
    description:"A remote island off San Vicente with clear water, forested hills, small coves, and a frontier feeling for travelers who want a quieter island escape.",
    tip:"Go with a local boat operator and check sea conditions. Pack water, snacks, dry bag, and reef-safe sunscreen.",
    stats:{rating:"4.7",travel:"Boat from San Vicente",temp:"30°C",season:"Mar–May"}, color:"#8b5cf6" },
  { id:4, name:"German Island", lat:10.4586, lng:119.0705, category:"islands",
    image:"assets/san-vicente-boayan.jpg",
    description:"A small island stop often paired with Port Barton tours, known for clear shallows, snorkeling areas, and peaceful beach time between boat rides.",
    tip:"Ask your boatman about turtle-friendly viewing rules. Keep distance from wildlife and avoid stepping on coral.",
    stats:{rating:"4.6",travel:"30–45m by boat",temp:"30°C",season:"Dec–May"}, color:"#8b5cf6" },
  { id:5, name:"Pamuayan Falls", lat:10.3908, lng:119.2083, category:"nature",
    image:"assets/san-vicente-waterfalls.jpg",
    description:"A freshwater waterfall near Port Barton reached by a short inland ride and forest walk, ideal when you want a break from saltwater and beach heat.",
    tip:"Wear sandals with grip. Go after light rain for stronger flow, but avoid trails during heavy rain.",
    stats:{rating:"4.5",travel:"25m from Port Barton",temp:"27°C",season:"Year-round"}, color:"#22c55e" },
  { id:6, name:"Bato ni Ningning", lat:10.5634, lng:119.3092, category:"nature",
    image:"assets/san-vicente-long-beach.jpg",
    description:"A scenic viewpoint above San Vicente where the coast, green hills, and Long Beach reveal the scale of the municipality from above.",
    tip:"Go late afternoon for softer light. Use a motorbike or tricycle and allow extra time for the uphill route.",
    stats:{rating:"4.6",travel:"35m from Poblacion",temp:"28°C",season:"Nov–May"}, color:"#22c55e" },
  { id:7, name:"San Vicente Poblacion", lat:10.5318, lng:119.2822, category:"culture",
    image:"assets/san-vicente-long-beach.jpg",
    description:"The practical center of San Vicente, with access to Long Beach, transport, small eateries, municipal services, and local life away from the island-hopping crowds.",
    tip:"Use Poblacion for arrivals, supplies, and Long Beach access. Confirm van and boat schedules one day ahead.",
    stats:{rating:"4.4",travel:"Town center",temp:"29°C",season:"Year-round"}, color:"#f59e0b" },
  { id:8, name:"Inaladelan Island", lat:10.4643, lng:119.0447, category:"islands",
    image:"assets/san-vicente-boayan.jpg",
    description:"A polished island stop from Port Barton with bright sand, clear water, hammocks, and an easy picnic atmosphere for day trips.",
    tip:"Often included in Port Barton island-hopping. Bring a small dry bag and ask if environmental fees are included.",
    stats:{rating:"4.7",travel:"Boat from Port Barton",temp:"30°C",season:"Dec–May"}, color:"#8b5cf6" }
];

const DEFAULT_TALA_DATA = [
  {kw:["beach","beaches","sandy","shore","long beach"],
    r:`<strong>San Vicente Beaches</strong><br><br>1. <strong>Long Beach</strong> — the main 14km coastal highlight<br>2. <strong>Port Barton</strong> — calm bay, boats, relaxed village life<br>3. <strong>Inaladelan Island</strong> — bright sand and easy day-trip water<br><br>Best light: sunrise for quiet, sunset for color.`},
  {kw:["san vicente","sanvicente","sanvic"],
    r:`<strong>San Vicente, Palawan</strong><br><br>Focus on Long Beach, Port Barton, Boayan Island, Inaladelan Island, Pamuayan Falls, Bato ni Ningning, and Poblacion. It is quieter than El Nido or Coron, so navigation, cash, and local transport planning matter.`},
  {kw:["port barton","barton"],
    r:`<strong>Port Barton</strong><br><br>A calm San Vicente village for island hopping, beachfront stays, snorkeling, and slow travel. Bring cash, book boats early, and keep plans flexible for weather.`},
  {kw:["island","islands","island hop","island-hopping"],
    r:`<strong>Island Hopping from San Vicente</strong><br><br>Use Port Barton for German Island, Inaladelan Island, turtle-viewing areas, and reef stops. For a more remote feel, ask local operators about Boayan Island and check sea conditions first.`},
  {kw:["time","visit","weather","season","month"],
    r:`<strong>Best Time for San Vicente</strong><br><br>Nov–May is the easiest window for Long Beach and Port Barton island hopping. Mar–May has calmer seas and hotter days. Jun–Oct can still work, but boat trips are more weather-dependent.`},
  {kw:["get","transport","flight","bus","ferry","travel"],
    r:`<strong>Getting Around San Vicente</strong><br><br>Puerto Princesa → San Vicente: van or bus, usually 3–4.5 hours.<br>Poblacion → Port Barton: around 1–1.5 hours by road.<br><br>Local movement: tricycle, motorbike rental, hired van, and boat transfers for islands. Confirm schedules one day ahead.`},
  {kw:["budget","cost","money","price","cheap"],
    r:`<strong>San Vicente Budget Guide</strong><br><br>Budget: 1,800–3,500₱/day<br>Mid-range: 4,000–8,000₱/day<br>Boat tours vary by route and group size.<br><br>Bring cash, especially for Port Barton, island stops, and small eateries.`},
  {kw:["food","eat","restaurant","dish","cuisine"],
    r:`<strong>Food Around San Vicente</strong><br><br>Look for grilled fish, kinilaw, simple beachfront carinderias, fresh fruit, and local seafood in Port Barton or Poblacion. Many small places are cash-only.`},
  {kw:["diving","snorkel","dive","coral","wreck"],
    r:`<strong>Snorkeling</strong><br><br>Port Barton island-hopping is the easiest snorkeling base in San Vicente. Ask for reef stops, turtle-friendly viewing, German Island, and Inaladelan Island. Never touch coral or chase wildlife.`},
  {kw:["packing","bring","prepare","gear"],
    r:`<strong>Packing</strong><br><br>Swimsuit, quick-dry towel, waterproof case<br>Reef-safe sunscreen (mandatory in El Nido)<br>Snorkel mask, water shoes, repellent<br><br>ID, printed tickets, cash — lots of cash.`},
  {kw:["tour","tours","island hop","lagoon"],
    r:`<strong>San Vicente Island-Hopping</strong><br><br>Base yourself in Port Barton for boat routes to German Island, Inaladelan Island, reef stops, and turtle-viewing areas. For Boayan, arrange a local boat and check weather before committing.`},
  {kw:["hello","hi","hey","morning","evening"],
    r:`Mabuhay — welcome. I'm <strong>tala</strong>, your Palawan concierge. Ask about destinations, timing, routes, or hidden gems.`},
  {kw:["thank","thanks","salamat"],
    r:`My pleasure. Palawan will not disappoint. If you need anything else, I'm here.`},
  {kw:["safe","safety","danger"],
    r:`Palawan is one of the safest provinces in the Philippines. Watch for strong currents, use reef-safe sunscreen, and stick with registered tour operators. Emergency: 911.`},
  {kw:["waterfall","falls","pamuayan"],
    r:`<strong>Pamuayan Falls</strong><br><br>A freshwater stop near Port Barton with a forest path and natural pool. Go with grippy footwear, avoid heavy rain, and bring drinking water.`}
];

const DEFAULT_FALLBACK_RESPONSE = `I'm not sure about that, but I can help with:<br><br>Long Beach · Port Barton · Boayan Island · Pamuayan Falls<br>Transport · Budget · Food · Island hopping<br><br>Or tap any San Vicente marker on the map.`;

// ─── LIVE DATA (populated from Supabase, falls back to defaults) ───
let destinations = [];
let aiData = [];
let defaultR = DEFAULT_FALLBACK_RESPONSE;
let dataReady = false;

// ═══════════════════════════════════════════════════════
// AUTHENTICATION — Supabase Auth, Email Magic Link only for
// now. Google/Apple need real OAuth app registrations on
// Anthropic/David's end before they can be wired up; the login
// modal already has buttons for them so adding the providers
// later is just a few lines, not a redesign.
// ═══════════════════════════════════════════════════════
let currentUser = null;       // Supabase auth user object, or null if signed out
let currentProfile = null;    // row from traveler_profiles, or null
let pendingProtectedAction = null; // a function to re-run automatically after successful login

async function initAuth(){
  const { data: { session } } = await sb.auth.getSession();
  if(session){
    currentUser = session.user;
    await loadTravelerProfile();
  }

  sb.auth.onAuthStateChange(async (event, session) => {
    if(event === 'SIGNED_IN' && session){
      currentUser = session.user;
      await loadTravelerProfile();
      closeLoginModal();
      updateAuthUI();
      if(pendingProtectedAction){
        const fn = pendingProtectedAction;
        pendingProtectedAction = null;
        fn();
      }
    } else if(event === 'SIGNED_OUT'){
      currentUser = null;
      currentProfile = null;
      updateAuthUI();
    }
  });

  updateAuthUI();
}

async function loadTravelerProfile(){
  if(!currentUser) return;
  try {
    const { data, error } = await sb.from('traveler_profiles').select('*').eq('id', currentUser.id).maybeSingle();
    if(error) throw error;
    currentProfile = data;
    // Touch last_seen, best-effort, don't block on it
    sb.from('traveler_profiles').update({ last_seen: new Date().toISOString() }).eq('id', currentUser.id);
  } catch(err){
    console.warn('[SANVIC] Failed to load traveler profile:', err);
  }
}

function isLoggedIn(){
  return !!currentUser;
}

// Call this to gate any action that requires login. If logged in,
// runs `action` immediately. If not, opens the login modal and
// queues `action` to run automatically right after sign-in.
function requireAuth(action){
  if(isLoggedIn()){
    action();
  } else {
    pendingProtectedAction = action;
    openLoginModal();
  }
}

function openLoginModal(){
  document.getElementById('loginModalOverlay').classList.add('active');
  document.getElementById('loginModalSheet').classList.add('open');
  document.getElementById('loginEmailStatus').textContent = '';
  document.getElementById('loginEmailInput').value = '';
}

function closeLoginModal(){
  document.getElementById('loginModalOverlay').classList.remove('active');
  document.getElementById('loginModalSheet').classList.remove('open');
  pendingProtectedAction = null; // closing without logging in cancels the queued action
}

async function sendMagicLink(){
  const email = document.getElementById('loginEmailInput').value.trim();
  const statusEl = document.getElementById('loginEmailStatus');
  if(!email || !email.includes('@')){
    statusEl.textContent = 'Please enter a valid email address.';
    statusEl.style.color = '#ef4444';
    return;
  }
  statusEl.textContent = 'Sending link...';
  statusEl.style.color = 'var(--white-dim)';
  try {
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href }
    });
    if(error) throw error;
    statusEl.textContent = `Check your email — we sent a link to ${email}.`;
    statusEl.style.color = '#5eead4';
  } catch(err){
    statusEl.textContent = 'Could not send link: ' + (err.message || err);
    statusEl.style.color = '#ef4444';
  }
}

async function signOutUser(){
  await sb.auth.signOut();
  closeDashboard();
}

function updateAuthUI(){
  // Bell/notification icon and avatar swap in the hero or dock area
  // could go here later; for now this drives the dashboard's own
  // header state and the dock "Saved" tab behavior.
  const dashAvatarWrap = document.getElementById('dashUserAvatarWrap');
  if(dashAvatarWrap){
    if(isLoggedIn() && currentProfile){
      dashAvatarWrap.style.display = '';
    }
  }
}

// ═══════════════════════════════════════════════════════
// TRAVELER DASHBOARD
// ═══════════════════════════════════════════════════════
let dashSection = 'overview';

function openDashboard(){
  requireAuth(()=>{
    closeAllPanels();
    document.getElementById('dashboardPanel').classList.add('open');
    renderDashProfileCard();
    selectDashSection('overview');
  });
}

function closeDashboard(){
  document.getElementById('dashboardPanel').classList.remove('open');
}

function renderDashProfileCard(){
  const nameEl = document.getElementById('dashUserName');
  const initialEl = document.getElementById('dashUserInitial');
  const avatarWrap = document.getElementById('dashUserAvatarWrap');
  if(!currentUser) return;

  const displayName = (currentProfile && currentProfile.display_name) || currentUser.email.split('@')[0];
  nameEl.textContent = `Hello, ${displayName}`;

  if(currentProfile && currentProfile.avatar_url){
    avatarWrap.innerHTML = `<img src="${currentProfile.avatar_url}" alt="">`;
  } else {
    initialEl.textContent = displayName.slice(0,1).toUpperCase();
  }
}

function selectDashSection(section){
  dashSection = section;
  document.querySelectorAll('.dash-nav-item').forEach(b=>b.classList.toggle('active', b.dataset.section===section));
  const body = document.getElementById('dashSectionBody');
  body.innerHTML = `<div class="dash-empty-state">Loading...</div>`;

  switch(section){
    case 'overview': renderDashOverview(); break;
    case 'saved': renderDashSaved(); break;
    case 'bookings': body.innerHTML = `<div class="dash-section-title">Bookings</div><div class="dash-empty-state">Booking management is coming in a future update.</div>`; break;
    case 'trips': body.innerHTML = `<div class="dash-section-title">My Trips</div><div class="dash-empty-state">Trip planning is coming in a future update.</div>`; break;
    case 'activity': renderDashActivity(); break;
    case 'messages': body.innerHTML = `<div class="dash-section-title">Messages</div><div class="dash-empty-state">Direct messages between travelers are coming soon.</div>`; break;
    case 'settings': renderDashSettings(); break;
  }
}

async function renderDashOverview(){
  const body = document.getElementById('dashSectionBody');
  try {
    const { data: saved } = await sb.from('saved_places').select('id').eq('user_id', currentUser.id);
    const { data: posts } = await sb.from('pulse_posts').select('id').eq('user_id', currentUser.id);
    body.innerHTML = `
      <div class="dash-section-title">Overview</div>
      <div class="admin-grid-2" style="margin-bottom:14px;">
        <div class="dash-empty-state" style="padding:18px;">
          <div style="font-size:1.4rem;color:var(--ocean-teal-light);font-weight:600;">${(saved||[]).length}</div>
          <div style="font-size:.7rem;margin-top:4px;">Saved places</div>
        </div>
        <div class="dash-empty-state" style="padding:18px;">
          <div style="font-size:1.4rem;color:var(--ocean-teal-light);font-weight:600;">${(posts||[]).length}</div>
          <div style="font-size:.7rem;margin-top:4px;">Pulse posts</div>
        </div>
      </div>
      <div class="dash-empty-state">Trip planning and richer activity history are coming in a future update.</div>`;
  } catch(err){
    body.innerHTML = `<div class="dash-empty-state">Couldn't load your overview right now.</div>`;
  }
}

async function renderDashSaved(){
  const body = document.getElementById('dashSectionBody');
  try {
    const { data, error } = await sb.from('saved_places')
      .select('id, destination_id, destinations(name, image, category)')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });
    if(error) throw error;

    if(!data || !data.length){
      body.innerHTML = `<div class="dash-section-title">Saved Places</div><div class="dash-empty-state">You haven't saved any places yet. Tap the bookmark on a destination to save it here.</div>`;
      return;
    }

    body.innerHTML = `<div class="dash-section-title">Saved Places</div>` + data.map(row=>{
      const d = row.destinations;
      if(!d) return '';
      return `
      <div class="around-card" style="margin-bottom:10px;cursor:pointer;" onclick="closeDashboard();openDestinationById(${row.destination_id})">
        <img src="${d.image}" alt="" style="width:50px;height:50px;border-radius:10px;object-fit:cover;flex-shrink:0;" onerror="this.style.display='none'">
        <div class="around-card-body">
          <div class="around-card-name">${escapeHtml(d.name)}</div>
          <div class="around-card-meta">${escapeHtml(catStyle[d.category]?.label||d.category)}</div>
        </div>
      </div>`;
    }).join('');
  } catch(err){
    body.innerHTML = `<div class="dash-empty-state">Couldn't load saved places right now.</div>`;
  }
}

async function renderDashActivity(){
  const body = document.getElementById('dashSectionBody');
  try {
    const { data, error } = await sb.from('pulse_posts')
      .select('id, text_content, category, created_at')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(20);
    if(error) throw error;

    if(!data || !data.length){
      body.innerHTML = `<div class="dash-section-title">Activity</div><div class="dash-empty-state">Your Pulse posts and saves will show up here.</div>`;
      return;
    }

    body.innerHTML = `<div class="dash-section-title">Activity</div>` + data.map(p=>`
      <div class="around-card" style="margin-bottom:10px;">
        <div class="around-card-icon">📍</div>
        <div class="around-card-body">
          <div class="around-card-name">${escapeHtml((p.text_content||'').slice(0,60))}${(p.text_content||'').length>60?'…':''}</div>
          <div class="around-card-meta">${new Date(p.created_at).toLocaleDateString()}</div>
        </div>
      </div>`).join('');
  } catch(err){
    body.innerHTML = `<div class="dash-empty-state">Couldn't load activity right now.</div>`;
  }
}

async function renderDashSettings(){
  const body = document.getElementById('dashSectionBody');
  body.innerHTML = `
    <div class="dash-section-title">Settings</div>
    <div class="admin-field"><label>Display name</label><input id="dashSettingsName" value="${escapeHtml((currentProfile&&currentProfile.display_name)||'')}"></div>
    <div class="admin-field"><label>Bio</label><textarea id="dashSettingsBio" rows="3">${escapeHtml((currentProfile&&currentProfile.bio)||'')}</textarea></div>
    <button class="admin-save-btn" onclick="saveDashSettings()">Save changes</button>`;
}

async function saveDashSettings(){
  const display_name = document.getElementById('dashSettingsName').value.trim();
  const bio = document.getElementById('dashSettingsBio').value.trim();
  try {
    const { error } = await sb.from('traveler_profiles').update({ display_name, bio, updated_at: new Date().toISOString() }).eq('id', currentUser.id);
    if(error) throw error;
    currentProfile = { ...currentProfile, display_name, bio };
    renderDashProfileCard();
    alert('Saved.');
  } catch(err){
    alert('Save failed: ' + (err.message || err));
  }
}

// ─── Save / unsave a destination (requires login) ───
async function toggleSavePlace(destinationId, btnEl){
  requireAuth(async ()=>{
    try {
      const { data: existing } = await sb.from('saved_places').select('id').eq('user_id', currentUser.id).eq('destination_id', destinationId).maybeSingle();
      if(existing){
        await sb.from('saved_places').delete().eq('id', existing.id);
        if(btnEl) btnEl.classList.remove('saved');
      } else {
        await sb.from('saved_places').insert({ user_id: currentUser.id, destination_id: destinationId });
        if(btnEl) btnEl.classList.add('saved');
      }
    } catch(err){
      alert('Could not update saved places: ' + (err.message || err));
    }
  });
}

function handleDestSaveClick(){
  if(!currentDest) return;
  toggleSavePlace(currentDest.id, document.getElementById('deSaveBtn'));
}

async function refreshDestSaveButton(destinationId){
  const btn = document.getElementById('deSaveBtn');
  if(!btn) return;
  btn.classList.remove('saved');
  if(!isLoggedIn()) return; // anonymous visitors always see the un-saved state
  try {
    const { data } = await sb.from('saved_places').select('id').eq('user_id', currentUser.id).eq('destination_id', destinationId).maybeSingle();
    if(data) btn.classList.add('saved');
  } catch(err){
    // fail silently — save state is a nice-to-have, not critical path
  }
}

function destRowToObj(row){
  return {
    id: row.id, name: row.name, lat: row.lat, lng: row.lng, category: row.category,
    image: row.image, description: row.description, tip: row.tip, color: row.color || '#0ea5e9',
    videoUrl: row.video_url || '', videoType: row.video_type || '', featured: !!row.featured,
    stats: { rating: row.rating, travel: row.travel, temp: row.temp, season: row.season }
  };
}

const DEFAULT_SUGGESTIONS = [
  { id:1, text:"Best beaches in San Vicente" },
  { id:2, text:"Where should I stay?" },
  { id:3, text:"Best time to visit" },
  { id:4, text:"Budget guide" },
  { id:5, text:"Local hidden gems" }
];

let talaSuggestions = [];

// True if today's month/day falls within [fromM/fromD, toM/toD], inclusive,
// handling ranges that wrap across the new year (e.g. Nov 1 -> Mar 31).
// A suggestion with no range set is always active.
function isSuggestionActiveToday(s){
  if(s.active_from_month==null || s.active_to_month==null) return true;
  const now = new Date();
  const todayKey = (now.getMonth()+1)*100 + now.getDate();
  const fromKey = s.active_from_month*100 + (s.active_from_day||1);
  const toKey = s.active_to_month*100 + (s.active_to_day||28);
  if(fromKey <= toKey){
    return todayKey >= fromKey && todayKey <= toKey;
  } else {
    // wraps across new year, e.g. Nov 1 -> Mar 31
    return todayKey >= fromKey || todayKey <= toKey;
  }
}

async function loadDataFromSupabase(){
  try {
    const [destRes, talaRes, settingsRes, sugRes] = await Promise.all([
      sb.from('destinations').select('*').order('sort_order', { ascending: true }),
      sb.from('tala_responses').select('*').order('sort_order', { ascending: true }),
      sb.from('tala_settings').select('*').eq('key', 'default_response').maybeSingle(),
      sb.from('tala_suggestions').select('*').order('sort_order', { ascending: true }),
    ]);

    if (destRes.error) throw destRes.error;
    if (talaRes.error) throw talaRes.error;

    destinations = (destRes.data && destRes.data.length) ? destRes.data.map(destRowToObj) : DEFAULT_DESTINATIONS;
    aiData = (talaRes.data && talaRes.data.length) ? talaRes.data.map(r=>({ id:r.id, kw:r.keywords, r:r.response, cat:r.category||'knowledge' })) : DEFAULT_TALA_DATA;
    defaultR = (settingsRes.data && settingsRes.data.value) ? settingsRes.data.value : DEFAULT_FALLBACK_RESPONSE;
    talaSuggestions = (sugRes && sugRes.data && sugRes.data.length) ? sugRes.data : DEFAULT_SUGGESTIONS;
  } catch(err) {
    console.warn('[SANVIC] Supabase load failed, using built-in defaults:', err);
    destinations = DEFAULT_DESTINATIONS;
    aiData = DEFAULT_TALA_DATA;
    defaultR = DEFAULT_FALLBACK_RESPONSE;
    talaSuggestions = DEFAULT_SUGGESTIONS;
  }
  dataReady = true;
}

const catStyle = {
  beaches:{label:"Beaches",color:"#0ea5e9",bg:"rgba(14,165,233,.12)"},
  islands:{label:"Islands",color:"#8b5cf6",bg:"rgba(139,92,246,.12)"},
  nature:{label:"Nature",color:"#22c55e",bg:"rgba(34,197,94,.12)"},
  adventure:{label:"Adventure",color:"#ef4444",bg:"rgba(239,68,68,.12)"},
  culture:{label:"Culture",color:"#f59e0b",bg:"rgba(245,158,11,.12)"},
  stays:{label:"Stays",color:"#ec4899",bg:"rgba(236,72,153,.12)"}
};

// ─── AI ───
function getAI(input) {
  const l = input.toLowerCase().replace(/[?.!,]/g,'').trim();
  for (const d of destinations) {
    if (l.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(l))
      return `<strong>${d.name}</strong><br><br>${d.description}<br><br>${d.tip}`;
  }
  let best=null, bestS=0;
  for (const item of aiData) for (const k of item.kw)
    if (l.includes(k) && k.length>bestS) { bestS=k.length; best=item.r; }
  return best||defaultR;
}

// ─── MAP ───
let map, mapReady=false;
const markersByCat={};
let allMarkers=[];
const PIN_VISIBLE_ZOOM = 12; // pins hidden below this zoom on the default/idle map view
let pinsCurrentlyVisible = true;
let activeMarkerSet = []; // tracks whichever markers are "supposed" to be on the map right now (all, or a filtered category)
let pinVisibilityOverride = false; // true once the user explicitly picks a category — keeps pins on regardless of zoom until they go back to 'All'/Map tab

function rebuildMarkers(){
  if(!map) return;
  allMarkers.forEach(m=>map.removeLayer(m));
  allMarkers=[];
  for(const k in markersByCat) delete markersByCat[k];
  destinations.forEach(d=>{
    if(!markersByCat[d.category]) markersByCat[d.category]=[];
    const m = L.marker([d.lat,d.lng],{icon:L.divIcon({className:'',html:`<div class="mk-wrap" style="animation-delay:${Math.random()*2}s"><div class="mk-glow" style="color:${d.color}"></div><div class="mk-ring" style="border-color:${d.color}"></div><div class="mk-dot" style="background:${d.color};box-shadow:0 0 12px ${d.color}"></div></div>`,iconSize:[32,32],iconAnchor:[16,16]})});
    m._d=d; m.on('click',()=>openDest(d));
    markersByCat[d.category].push(m); allMarkers.push(m);
  });
  activeMarkerSet = allMarkers;
  applyPinVisibility();
  renderDiscoverList(document.querySelector('.discover-cat.active')?.dataset.cat || 'all');
}

// Adds/removes activeMarkerSet from the map based on current zoom,
// without touching which markers are "selected" by a category filter.
// Skipped while pinVisibilityOverride is set (explicit category pick).
function applyPinVisibility(){
  if(!map) return;
  const shouldShow = pinVisibilityOverride || map.getZoom() >= PIN_VISIBLE_ZOOM;
  if(shouldShow === pinsCurrentlyVisible) {
    // still sync membership in case activeMarkerSet changed (e.g. category filter)
    if(shouldShow) activeMarkerSet.forEach(m=>{ if(!map.hasLayer(m)) m.addTo(map); });
    return;
  }
  pinsCurrentlyVisible = shouldShow;
  if(shouldShow){
    activeMarkerSet.forEach(m=>m.addTo(map));
  } else {
    allMarkers.forEach(m=>{ if(map.hasLayer(m)) map.removeLayer(m); });
  }
}

async function initMap() {
  if (mapReady) return;
  mapReady = true;

  if(!dataReady) await loadDataFromSupabase();

  map = L.map('map',{center:[10.50,119.22],zoom:11,zoomControl:false,attributionControl:true,fadeAnimation:true,zoomAnimation:true});

  const street = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OSM &copy; CARTO',maxZoom:19,subdomains:'abcd'});
  const sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'&copy; Esri',maxZoom:19});
  // Place-name labels (countries/provinces/municipalities/cities) drawn on top
  // of the satellite imagery, since raw aerial photography has no text on it.
  // Falls back gracefully (just stays empty) if this tile service is ever
  // unavailable — it's a cosmetic overlay, never blocks the base imagery.
  const satLabels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,errorTileUrl:''});

  street.addTo(map);
  window._mS=street; window._mSat=sat; window._mSatLabels=satLabels; window._mView='street';

  L.control.zoom({position:'bottomright'}).addTo(map);
  document.getElementById('mapLayerToggle').classList.add('visible');
  document.getElementById('mapRecenter').classList.add('visible');
  document.getElementById('barangayToggle').classList.add('visible');

  initBarangayLayer();
  rebuildMarkers();

  map.on('zoomend', applyPinVisibility);
}

// ─── BARANGAY BOUNDARIES ───
// Static overlay, sourced once from official PSA/PSGC data (see
// barangays.geojson.js). Boundaries don't change, so this is baked
// in rather than admin-editable.
let barangayLayer = null;
let barangayVisible = false;

function initBarangayLayer(){
  if(typeof SAN_VICENTE_BARANGAYS === 'undefined') return;
  barangayLayer = L.geoJSON(SAN_VICENTE_BARANGAYS, {
    style: {
      color: '#e8dcc8',
      weight: 1.5,
      opacity: 0.55,
      fillColor: '#e8dcc8',
      fillOpacity: 0.04,
      dashArray: '4,4'
    },
    onEachFeature: (feature, layer) => {
      if(feature.properties && feature.properties.name){
        layer.bindTooltip(feature.properties.name, {
          sticky: true,
          className: 'barangay-tooltip',
          opacity: 0.95
        });
      }
    }
  });
  // Not added to the map yet — starts hidden until toggled on.
}

function toggleBarangayLayer(){
  if(!barangayLayer || !map) return;
  const btn = document.getElementById('barangayToggle');
  barangayVisible = !barangayVisible;
  if(barangayVisible){
    barangayLayer.addTo(map);
    btn.classList.add('active');
  } else {
    map.removeLayer(barangayLayer);
    btn.classList.remove('active');
  }
}

function switchMapLayer(type,btn){
  if(!mapReady) return;
  document.querySelectorAll('.mlt-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(type==='satellite'&&window._mView!=='satellite'){
    map.removeLayer(window._mS);
    window._mSat.addTo(map);
    window._mSatLabels.addTo(map);
    window._mView='satellite';
  }
  else if(type==='street'&&window._mView!=='street'){
    map.removeLayer(window._mSat);
    map.removeLayer(window._mSatLabels);
    window._mS.addTo(map);
    window._mView='street';
  }
  map.invalidateSize({animate:false});
}

// ─── SINGLE-ACTIVE-LAYER SYSTEM ───
// At any moment, at most ONE of: destSheet, talaSheet, search-focus is active.
// When one opens, others close automatically.

function closeAllPanels() {
  closeDestSheet(false);
  closeTalaSheet(false);
  closeAroundMePanel();
  closePulsePanel();
  closeDashboard();
}

// ─── DESTINATION SHEET ───
let currentDest = null;

// ─── AROUND ME (mock data — will move to admin/Supabase later) ───
// Maps each destination to its real barangay, then looks up mock
// nearby places for that barangay. Categories: food, stay, shop, service.
const DEST_BARANGAY = {
  "Long Beach": "Poblacion",
  "Port Barton": "Port Barton",
  "Boayan Island": "Alimanguan",
  "German Island": "Port Barton",
  "Pamuayan Falls": "Port Barton",
  "Bato ni Ningning": "Poblacion",
  "San Vicente Poblacion": "Poblacion",
  "Inaladelan Island": "Port Barton"
};

const AROUND_ME_MOCK = {
  "Poblacion": [
    { name:"Tienda ni Aling Rosa", cat:"shop", desc:"Sari-sari store, snacks & drinks", dist:"3 min walk", icon:"🛒" },
    { name:"Long Beach Grill", cat:"food", desc:"Grilled seafood, beachfront seating", dist:"5 min walk", icon:"🍽️" },
    { name:"San Vicente Inn", cat:"stay", desc:"Budget rooms, fan & aircon", dist:"8 min walk", icon:"🛏️" },
    { name:"Motorbike Rental Hub", cat:"service", desc:"Daily & weekly rentals", dist:"4 min walk", icon:"🛵" },
    { name:"Poblacion Public Market", cat:"shop", desc:"Fresh produce, fish, dry goods", dist:"6 min walk", icon:"🧺" },
    { name:"Municipal Health Center", cat:"service", desc:"Basic medical care, open weekdays", dist:"10 min walk", icon:"⚕️" }
  ],
  "Port Barton": [
    { name:"Jambalaya Cajun Café", cat:"food", desc:"Cajun-Filipino fusion, fast wifi", dist:"2 min walk", icon:"🍽️" },
    { name:"Greenviews Resort", cat:"stay", desc:"Beachfront cottages, island-hopping desk", dist:"5 min walk", icon:"🛏️" },
    { name:"Easy Dive Port Barton", cat:"service", desc:"PADI courses, fun dives", dist:"7 min walk", icon:"🤿" },
    { name:"Ballesteros General Store", cat:"shop", desc:"Supplies, snacks, sunscreen", dist:"3 min walk", icon:"🛒" },
    { name:"Summer Homes", cat:"stay", desc:"Simple beachfront rooms", dist:"6 min walk", icon:"🛏️" },
    { name:"NFH Port Barton Dive Club", cat:"service", desc:"PADI training & equipment", dist:"8 min walk", icon:"🤿" }
  ],
  "Alimanguan": [
    { name:"Alimanguan Boat Co-op", cat:"service", desc:"Island-hopping boat hire", dist:"At the dock", icon:"🛶" },
    { name:"Beachside Carinderia", cat:"food", desc:"Home-style Filipino meals", dist:"4 min walk", icon:"🍽️" },
    { name:"Alimanguan Sari-Sari", cat:"shop", desc:"Basic supplies, cold drinks", dist:"2 min walk", icon:"🛒" }
  ]
};

let currentAroundBarangay = null;
let currentAroundCat = 'all';

function getAroundMeData(barangay){
  return AROUND_ME_MOCK[barangay] || [];
}

function openAroundMePanel(){
  if(!currentDest) return;
  currentAroundBarangay = DEST_BARANGAY[currentDest.name] || null;
  currentAroundCat = 'all';
  document.querySelectorAll('.around-cat').forEach(b=>b.classList.toggle('active', b.dataset.cat==='all'));

  const titleEl = document.getElementById('aroundTitle');
  const subEl = document.getElementById('aroundSubtitle');
  if(currentAroundBarangay){
    titleEl.textContent = `Around ${currentDest.name}`;
    subEl.textContent = `Brgy. ${currentAroundBarangay} · ${getAroundMeData(currentAroundBarangay).length} places`;
  } else {
    titleEl.textContent = `Around ${currentDest.name}`;
    subEl.textContent = `Nearby places`;
  }

  renderAroundList();
  document.getElementById('aroundSheet').classList.add('open');
  document.getElementById('aroundOverlay').classList.add('active');
}

function closeAroundMePanel(){
  document.getElementById('aroundSheet').classList.remove('open');
  document.getElementById('aroundOverlay').classList.remove('active');
}

function selectAroundCategory(cat){
  currentAroundCat = cat;
  document.querySelectorAll('.around-cat').forEach(b=>b.classList.toggle('active', b.dataset.cat===cat));
  renderAroundList();
}

function renderAroundList(){
  const list = document.getElementById('aroundList');
  const places = getAroundMeData(currentAroundBarangay);
  const filtered = currentAroundCat==='all' ? places : places.filter(p=>p.cat===currentAroundCat);

  if(!filtered.length){
    list.innerHTML = `<div class="around-empty">No ${currentAroundCat==='all'?'':currentAroundCat+' '}places listed yet for this area.</div>`;
    return;
  }

  list.innerHTML = filtered.map(p => `
    <div class="around-card">
      <div class="around-card-icon">${p.icon}</div>
      <div class="around-card-body">
        <div class="around-card-name">${escapeHtml(p.name)}</div>
        <div class="around-card-meta">${escapeHtml(p.desc)}</div>
      </div>
      <div class="around-card-dist">${escapeHtml(p.dist)}</div>
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════
// PULSE — live community layer (UI/mock-data phase).
// Posts below are realistic placeholder content matching the
// approved design mockups. No real posting/accounts yet — that's
// a deliberate follow-up phase once user identity exists. The
// "Create Post" button and category/tab structure are wired up
// so the real data layer can slot in later without changing the
// UI shell.
// ═══════════════════════════════════════════════════════

const PULSE_CATEGORIES = {
  all:    { label: 'Pulse',          subtitle: 'Live community in San Vicente' },
  hidden: { label: 'Hidden Spots',   subtitle: 'Secret places, shared by locals.' },
  island: { label: 'Island Hopping', subtitle: 'Plan. Connect. Explore together.' },
  food:   { label: 'Food & Nightlife', subtitle: 'Where to eat, drink, and dance tonight.' },
  surf:   { label: 'Surf Report',    subtitle: 'Conditions, sessions, and swells.' },
  events: { label: 'Events Tonight', subtitle: "What's happening around San Vicente." }
};

const PULSE_POSTS = [
  { id:1, cat:'food', name:'Alex', avatar:'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&q=70', time:'3m ago', text:'Fresh tuna arrived at the market!', location:'Poblacion Public Market', image:'assets/pulse/street-food-skewers.jpg', likes:12, comments:5 },
  { id:2, cat:'hidden', name:'Sophie', avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=70', time:'8m ago', text:'Crystal clear water today at Bigaho Falls 💧', location:'Bigaho Falls', image:'assets/pulse/kayak-lagoon.jpg', likes:18, comments:7 },
  { id:3, cat:'island', name:'Jon', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=70', time:'12m ago', text:'Looking for 2 more people to share a private boat tomorrow.', tag:'Island Hopping', avatars:3, likes:6, comments:3 },
  { id:4, cat:'all', name:'Local Guide – Jun', time:'15m ago', admin:true, text:'If you\'re heading to Port Barton, bring cash. ATM offline.', location:'Port Barton', likes:9, comments:2 },
  { id:5, cat:'all', name:'Maya', avatar:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=70', time:'18m ago', text:'Best sunset right now at Long Beach 🌅 Come and join!', location:'Long Beach', image:'assets/pulse/island-boats-beach.jpg', likes:24, comments:11 },
  { id:6, cat:'surf', name:'Diego', avatar:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=70', time:'24m ago', text:'Clean 2-3ft sets at Alimanguan this morning, light offshore wind. Good for beginners right now.', location:'Alimanguan Beach', likes:15, comments:4 },
  { id:7, cat:'events', name:'Beach Bar Co.', time:'35m ago', admin:true, text:'Live acoustic set tonight from 7pm, free entry. Come early for sunset seats.', location:'Long Beach', likes:21, comments:6 },
  { id:8, cat:'food', name:'Pia', avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=70', time:'41m ago', text:'Night market has the best halo-halo right now, ube version is back 🍧', location:'Poblacion Night Market', image:'assets/pulse/bulalo-boodle.jpg', likes:14, comments:3 },
  { id:9, cat:'hidden', name:'Marco', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=70', time:'52m ago', text:'Found a quiet tide pool past the rocks at Bato ni Ningning, perfect for sunset photos and almost nobody there.', location:'Bato ni Ningning', likes:19, comments:8 },
  { id:10, cat:'island', name:'Tara', avatar:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=70', time:'1h ago', text:'Anyone heading to Port Barton this weekend? Let\'s share a ride and explore together!', location:'Port Barton', image:'assets/pulse/island-boats-aerial.jpg', likes:8, comments:6 },
  { id:11, cat:'all', name:'Carlos', avatar:'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&q=70', time:'1h ago', text:'Lost a small black drone near Long Beach this afternoon. If found please message — happy to reward!', location:'Long Beach', likes:5, comments:9 },
  { id:12, cat:'surf', name:'Diego', avatar:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=70', time:'2h ago', text:'Tide is dropping fast, current picking up past the point. Be careful past 5pm today.', location:'Alimanguan Beach', likes:11, comments:1 },
  { id:13, cat:'food', name:'Reyna', avatar:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=70', time:'3h ago', text:'Boodle fight with the whole barangay tonight! Bring your appetite, everyone\'s welcome 🐟', location:'Poblacion', image:'assets/pulse/boodle-fight-fish.jpg', likes:27, comments:9 }
];

let pulseCategory = 'all';
let pulseTab = 'feed';

function openPulsePanel(){
  requireAuth(()=>{
    document.getElementById('pulsePanel').classList.add('open');
    renderPulseFeed();
  });
}

function closePulsePanel(){
  const panel = document.getElementById('pulsePanel');
  if(panel) panel.classList.remove('open');
  closePulseCompose();
}

function selectPulseCategory(cat){
  pulseCategory = cat;
  document.querySelectorAll('.pulse-cat').forEach(b=>b.classList.toggle('active', b.dataset.cat===cat));
  const meta = PULSE_CATEGORIES[cat] || PULSE_CATEGORIES.all;
  document.getElementById('pulseTitle').innerHTML = `${meta.label} <span class="live-dot"></span>`;
  document.getElementById('pulseSubtitle').textContent = meta.subtitle;
  renderPulseFeed();
}

function selectPulseTab(tab){
  pulseTab = tab;
  document.querySelectorAll('.pulse-tab').forEach(b=>{
    if(!b.classList.contains('disabled')) b.classList.toggle('active', b.dataset.tab===tab);
  });
  renderPulseFeed();
}

function pulseCardHtml(post){
  let avatarHtml;
  if(post.admin){
    avatarHtml = `<div class="pulse-avatar-icon">Local<br>Guide</div>`;
  } else if(post.avatar){
    avatarHtml = `<div class="pulse-avatar-wrap"><img class="pulse-avatar" src="${post.avatar}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;pulse-avatar-icon&quot; style=&quot;background:rgba(255,255,255,.08);color:var(--white-muted);&quot;>${escapeHtml(post.name.slice(0,2).toUpperCase())}</div>'"><span class="online-dot"></span></div>`;
  } else {
    avatarHtml = `<div class="pulse-avatar-wrap"><div class="pulse-avatar-icon" style="background:rgba(255,255,255,.08);color:var(--white-muted);">${escapeHtml(post.name.slice(0,2).toUpperCase())}</div><span class="online-dot"></span></div>`;
  }

  return `
    <div class="pulse-card">
      <div class="pulse-card-top">
        ${avatarHtml}
        <div class="pulse-card-meta">
          <div class="pulse-card-name-row">
            <span class="pulse-card-name">${escapeHtml(post.name)}</span>
            <span class="pulse-card-time">${escapeHtml(post.time)}</span>
            ${post.admin ? '<span class="pulse-admin-badge">Admin</span>' : ''}
          </div>
          <div class="pulse-card-text">${escapeHtml(post.text)}</div>
          ${post.tag ? `<span class="pulse-card-tag">${escapeHtml(post.tag)}</span>` : ''}
          ${post.location ? `<div class="pulse-card-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${escapeHtml(post.location)}</div>` : ''}
          ${post.image ? `<img class="pulse-card-image" src="${post.image}" alt="" loading="lazy" onerror="this.style.display='none'">` : ''}
          ${post.avatars ? `<div class="pulse-card-avatars">${Array.from({length:Math.min(post.avatars,3)}).map((_,i)=>`<div class="pulse-avatar-more">+</div>`).join('')}${post.avatars>3?`<div class="pulse-avatar-more">+${post.avatars-3}</div>`:''}</div>` : ''}
          <div class="pulse-card-actions">
            <button class="pulse-action" onclick="togglePulseLike(this, ${post.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span>${post.likes}</span>
            </button>
            <button class="pulse-action" onclick="alert('Comments coming soon.')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>${post.comments}</span>
            </button>
            <button class="pulse-more-btn" onclick="alert('Report / hide options coming soon.')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

// Set of post IDs the current user has liked — refreshed on each feed load
let pulseLikedSet = new Set();
// Cache of latest feed rows by id so togglePulseLike can update counts
let pulseFeedById = new Map();

function relTime(iso){
  if(!iso) return '';
  const d = new Date(iso);
  const s = Math.max(1, Math.floor((Date.now() - d.getTime())/1000));
  if(s < 60) return s+'s ago';
  const m = Math.floor(s/60); if(m < 60) return m+'m ago';
  const h = Math.floor(m/60); if(h < 24) return h+'h ago';
  const days = Math.floor(h/24); if(days < 7) return days+'d ago';
  return d.toLocaleDateString();
}

async function togglePulseLike(btn, postId){
  requireAuth(async ()=>{
    const liked = pulseLikedSet.has(postId);
    const span = btn.querySelector('span');
    const cur = parseInt(span.textContent, 10) || 0;
    // Optimistic UI
    if(liked){
      pulseLikedSet.delete(postId);
      btn.classList.remove('liked');
      span.textContent = Math.max(0, cur - 1);
      const { error } = await sb.from('pulse_likes').delete().eq('post_id', postId).eq('user_id', currentUser.id);
      if(error){ pulseLikedSet.add(postId); btn.classList.add('liked'); span.textContent = cur; alert('Could not unlike: '+error.message); }
    } else {
      pulseLikedSet.add(postId);
      btn.classList.add('liked');
      span.textContent = cur + 1;
      const { error } = await sb.from('pulse_likes').insert({ post_id: postId, user_id: currentUser.id });
      if(error && error.code !== '23505'){ // ignore unique-violation
        pulseLikedSet.delete(postId); btn.classList.remove('liked'); span.textContent = cur;
        alert('Could not like: '+error.message);
      }
    }
  });
}

async function renderPulseFeed(){
  const body = document.getElementById('pulseBody');
  if(!body) return;

  if(pulseTab !== 'feed'){
    body.innerHTML = `<div class="pulse-empty">This view is coming soon.</div>`;
    return;
  }

  body.innerHTML = `<div class="pulse-empty">Loading…</div>`;

  let query = sb.from('pulse_posts')
    .select('id, user_id, category, text_content, image_url, location_text, tag, is_anonymous, admin_post, created_at, pulse_likes(count), pulse_comments(count), traveler_profiles:user_id(display_name, avatar_url)')
    .order('created_at', { ascending: false })
    .limit(100);
  if(pulseCategory !== 'all') query = query.eq('category', pulseCategory);

  const { data: rows, error } = await query;
  if(error){
    body.innerHTML = `<div class="pulse-empty">Could not load Pulse: ${escapeHtml(error.message)}</div>`;
    return;
  }

  // Load the current user's likes so the heart state is correct
  pulseLikedSet = new Set();
  if(currentUser && rows && rows.length){
    const ids = rows.map(r=>r.id);
    const { data: likes } = await sb.from('pulse_likes').select('post_id').eq('user_id', currentUser.id).in('post_id', ids);
    if(likes) likes.forEach(l => pulseLikedSet.add(l.post_id));
  }

  pulseFeedById = new Map();
  const posts = (rows || []).map(r => {
    const prof = r.traveler_profiles;
    const name = r.is_anonymous ? 'Anonymous' : ((prof && prof.display_name) || 'Traveler');
    const avatar = (!r.is_anonymous && prof && prof.avatar_url) || null;
    const mapped = {
      id: r.id,
      cat: r.category,
      name,
      avatar,
      admin: !!r.admin_post,
      time: relTime(r.created_at),
      text: r.text_content || '',
      image: r.image_url || null,
      location: r.location_text || null,
      tag: r.tag || null,
      likes: (r.pulse_likes && r.pulse_likes[0] && r.pulse_likes[0].count) || 0,
      comments: (r.pulse_comments && r.pulse_comments[0] && r.pulse_comments[0].count) || 0,
    };
    pulseFeedById.set(r.id, mapped);
    return mapped;
  });

  if(!posts.length){
    body.innerHTML = `<div class="pulse-empty">No posts yet in this category. Be the first to share something!</div>`;
    return;
  }
  body.innerHTML = posts.map(pulseCardHtml).join('');
  // Mark hearts that the current user has already liked
  body.querySelectorAll('.pulse-action').forEach(btn => {
    const m = btn.getAttribute('onclick') && btn.getAttribute('onclick').match(/togglePulseLike\(this,\s*(\d+)\)/);
    if(m && pulseLikedSet.has(parseInt(m[1],10))) btn.classList.add('liked');
  });
}

let pulseComposeImageDataUrl = null;
let pulseNextPostId = 1000; // mock IDs for session-local posts, won't collide with seeded 1-12

function openPulseCompose(){
  requireAuth(()=>{
    document.getElementById('pulseComposeText').value = '';
    document.getElementById('pulseComposeCategory').value = pulseCategory !== 'all' ? pulseCategory : 'all';
    document.getElementById('pulseComposeAnon').checked = false;
    removePulseComposeImage();
    updatePulseComposeState();
    document.getElementById('pulseComposeOverlay').classList.add('active');
    document.getElementById('pulseComposeSheet').classList.add('open');
  });
}

function closePulseCompose(){
  document.getElementById('pulseComposeOverlay').classList.remove('active');
  document.getElementById('pulseComposeSheet').classList.remove('open');
}

function handlePulseComposeImage(event){
  const file = event.target.files[0];
  if(!file) return;
  if(!file.type.startsWith('image/')){
    alert('Please choose an image file.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e)=>{
    pulseComposeImageDataUrl = e.target.result;
    document.getElementById('pulseComposeImagePreview').src = pulseComposeImageDataUrl;
    document.getElementById('pulseComposeImagePreviewWrap').style.display = '';
    updatePulseComposeState();
  };
  reader.readAsDataURL(file);
}

function removePulseComposeImage(){
  pulseComposeImageDataUrl = null;
  document.getElementById('pulseComposeImagePreview').src = '';
  document.getElementById('pulseComposeImagePreviewWrap').style.display = 'none';
  document.getElementById('pulseComposeFileInput').value = '';
  updatePulseComposeState();
}

function updatePulseComposeState(){
  const text = document.getElementById('pulseComposeText').value.trim();
  const postBtn = document.getElementById('pulseComposePostBtn');
  postBtn.disabled = !text && !pulseComposeImageDataUrl;
}

function submitPulsePost(){
  const text = document.getElementById('pulseComposeText').value.trim();
  if(!text && !pulseComposeImageDataUrl) return;

  const cat = document.getElementById('pulseComposeCategory').value;
  const anon = document.getElementById('pulseComposeAnon').checked;

  const newPost = {
    id: pulseNextPostId++,
    cat: cat,
    name: anon ? 'Anonymous' : 'You',
    avatar: anon ? null : null, // no device-camera selfie yet; falls back to initials
    time: 'Just now',
    text: text || '',
    image: pulseComposeImageDataUrl || null,
    likes: 0,
    comments: 0
  };

  PULSE_POSTS.unshift(newPost);
  closePulseCompose();

  // Jump to a view where the new post is actually visible: All category, Live Feed tab.
  pulseCategory = 'all';
  pulseTab = 'feed';
  document.querySelectorAll('.pulse-cat').forEach(b=>b.classList.toggle('active', b.dataset.cat==='all'));
  document.querySelectorAll('.pulse-tab').forEach(b=>{ if(!b.classList.contains('disabled')) b.classList.toggle('active', b.dataset.tab==='feed'); });
  document.getElementById('pulseTitle').innerHTML = `${PULSE_CATEGORIES.all.label} <span class="live-dot"></span>`;
  document.getElementById('pulseSubtitle').textContent = PULSE_CATEGORIES.all.subtitle;

  renderPulseFeed();
  document.getElementById('pulseBody').scrollTo({top:0, behavior:'smooth'});
}

function getYoutubeId(url){
  if(!url) return '';
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : '';
}

// Extracts {lat, lng, name} from a (non-shortened) Google Maps URL.
// Handles the common patterns Google Maps produces:
//   .../@10.538951,119.27753,15z              (viewport center)
//   ...!3d10.538951!4d119.27753...            (exact pin, preferred)
//   .../place/Boayan+Island/data=...!8m2!3d10.5!4d119.2 (place page, has a name)
//   ?q=10.538951,119.27753  or  ?ll=10.5,119.2
// Returns null if it's a shortened maps.app.goo.gl link (those need
// to be opened once so the browser can follow the redirect) or if
// no coordinate pattern is found. `name` is null when the URL has
// no /place/ segment (e.g. a bare @lat,lng viewport link).
function parseGoogleMapsUrl(url){
  if(!url) return null;
  url = url.trim();
  if(/maps\.app\.goo\.gl|goo\.gl\/maps/i.test(url)) return null; // shortened — can't resolve client-side

  let lat=null, lng=null;

  // Prefer the exact-pin pair (!3d...!4d...) over the viewport-center pair (@lat,lng)
  let m = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if(m){ lat=parseFloat(m[1]); lng=parseFloat(m[2]); }

  if(lat===null){
    m = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if(m){ lat=parseFloat(m[1]); lng=parseFloat(m[2]); }
  }

  if(lat===null){
    m = url.match(/[?&](?:q|ll)=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if(m){ lat=parseFloat(m[1]); lng=parseFloat(m[2]); }
  }

  if(lat===null) return null;

  let name = null;
  const nameMatch = url.match(/\/maps\/place\/([^/@]+)/);
  if(nameMatch){
    name = decodeURIComponent(nameMatch[1].replace(/\+/g,' '));
  }

  return { lat, lng, name };
}

function openDest(d) {
  currentDest = d;
  const cat = catStyle[d.category];
  refreshDestSaveButton(d.id);

  // Compact
  document.getElementById('dcImg').src = d.image;
  document.getElementById('dcName').textContent = d.name;
  document.getElementById('dcRating').innerHTML = `<span class="ds"></span>${d.stats.rating}`;
  document.getElementById('dcTravel').innerHTML = `<span class="ds"></span>${d.stats.travel}`;

  // Expanded — video replaces photo when present, autoplays muted
  // (browsers block unmuted autoplay; the player's own controls let
  // the visitor unmute with one tap).
  const mediaEl = document.getElementById('deMedia');
  if(d.videoUrl && d.videoType === 'youtube'){
    const yid = getYoutubeId(d.videoUrl);
    mediaEl.innerHTML = yid
      ? `<iframe src="https://www.youtube.com/embed/${yid}?autoplay=1&mute=1&playsinline=1&rel=0" title="${d.name} video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
      : `<img src="${d.image}" alt="${d.name}">`;
  } else if(d.videoUrl && d.videoType === 'upload'){
    mediaEl.innerHTML = `<video src="${d.videoUrl}" autoplay muted loop controls playsinline preload="auto" poster="${d.image||''}"></video>`;
    const vEl = mediaEl.querySelector('video');
    if(vEl) vEl.play().catch(()=>{ /* autoplay blocked — controls still let them tap play */ });
  } else {
    mediaEl.innerHTML = `<img src="${d.image}" alt="${d.name}">`;
  }
  document.getElementById('dePhoto').style.background = '';
  document.getElementById('deTitle').textContent = d.name;
  const catPill = document.getElementById('deCat');
  catPill.textContent = cat.label; catPill.style.background=cat.bg; catPill.style.color=cat.color;

  document.getElementById('deStats').innerHTML = `
    <div class="dest-exp-stat"><span class="dot"></span>${d.stats.rating} rating</div>
    <div class="dest-exp-stat"><span class="dot"></span>${d.stats.travel}</div>
    <div class="dest-exp-stat"><span class="dot"></span>${d.stats.temp}</div>
    <div class="dest-exp-stat"><span class="dot"></span>${d.stats.season}</div>`;

  const descEl = document.getElementById('deDesc');
  descEl.textContent = d.description;
  descEl.classList.add('collapsed');
  document.getElementById('deReadMore').style.display = '';
  document.getElementById('deTip').textContent = d.tip;

  document.getElementById('deDirections').onclick = ()=>{
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.lat + ',' + d.lng)}&travelmode=driving`;
    window.open(url,'_blank','noopener');
  };

  document.getElementById('deAskTala').onclick = ()=>{
    closeDestSheet(true);
    setTimeout(()=>{
      openTalaSheet();
      addMsg('user',`Tell me about ${d.name}`);
      setTimeout(()=>{addMsg('bot',getAI(d.name));speak(getAI(d.name));},400);
    },350);
  };

  // Close everything else
  closeTalaSheet(false);

  // Show compact sheet
  const sheet = document.getElementById('destSheet');
  sheet.style.transform = '';
  sheet.className = 'dest-sheet closed';
  document.getElementById('destOverlay').classList.add('active');
  closeDiscoverPanel();
  // Hide hero so map is interactive
  document.getElementById('heroOverlay').classList.add('hidden');
  document.getElementById('heroFade').classList.add('hidden');
  if(map) map.flyTo([d.lat,d.lng],13,{duration:1});
}

function toggleDestSheet() {
  const sheet = document.getElementById('destSheet');
  sheet.style.transform = '';
  if(sheet.classList.contains('closed')){
    sheet.className = 'dest-sheet expanded';
  } else {
    sheet.className = 'dest-sheet closed';
  }
}

function closeDestSheet(animate) {
  const sheet = document.getElementById('destSheet');
  sheet.style.transform = '';
  sheet.className = 'dest-sheet';
  document.getElementById('destOverlay').classList.remove('active');
  closeAroundMePanel();
  currentDest = null;
  // Show tala orb again
  if(!talaOpen) document.getElementById('talaOrbWrap').classList.remove('hidden');
  // Restore hero
  document.getElementById('heroOverlay').classList.remove('hidden');
  document.getElementById('heroFade').classList.remove('hidden');
}

// ─── DISCOVER + NAVIGATION ───
function focusSanVicente(){
  closeAllPanels();
  closeDiscoverPanel();
  if(map){
    pinVisibilityOverride = false;
    activeMarkerSet = allMarkers;
    map.flyTo([10.50,119.22],11,{duration:1});
    applyPinVisibility();
  }
  document.querySelectorAll('.dock-item').forEach(d=>d.classList.remove('active'));
  const mapBtn=document.querySelector('.dock-item[data-tab="map"]');
  if(mapBtn) mapBtn.classList.add('active');
}

function renderDiscoverList(cat='all'){
  const list=document.getElementById('discoverList');
  if(!list) return;
  let items;
  if(cat==='all'){
    items = destinations.filter(d=>d.featured);
    if(!items.length) items = destinations; // fallback so Discover is never empty before anything is marked featured
  } else {
    items = destinations.filter(d=>d.category===cat);
  }
  if(!items.length){
    list.innerHTML = `<div style="padding:20px;color:var(--white-dim);font-size:.78rem;">No spots yet.</div>`;
    return;
  }
  list.innerHTML=items.map(d=>`
    <button class="discover-card" onclick="openDestinationById(${d.id})">
      <img src="${d.image}" alt="${d.name}" onerror="this.style.opacity=0">
      <div class="discover-card-body">
        <div class="discover-card-name">${d.name}</div>
        <div class="discover-card-meta"><span>${catStyle[d.category]?.label||d.category}</span><span>•</span><span>${d.stats.travel||''}</span></div>
      </div>
    </button>`).join('');
}

function openDiscoverPanel(){
  closeDestSheet(false);
  closeTalaSheet(false);
  document.getElementById('discoverPanel').classList.add('open');
  document.getElementById('heroOverlay').classList.add('hidden');
  document.getElementById('heroFade').classList.add('hidden');
  renderDiscoverList(document.querySelector('.discover-cat.active')?.dataset.cat || 'all');
}

function closeDiscoverPanel(){
  const panel=document.getElementById('discoverPanel');
  if(panel) panel.classList.remove('open');
}

function selectDiscoverCategory(cat){
  document.querySelectorAll('.discover-cat').forEach(b=>b.classList.toggle('active',b.dataset.cat===cat));
  filterCategory(cat);
  renderDiscoverList(cat);
}

function openDestinationById(id){
  const d=destinations.find(item=>item.id===id);
  if(d) openDest(d);
}

function toggleReadMore() {
  const el = document.getElementById('deDesc');
  const btn = document.getElementById('deReadMore');
  if(el.classList.contains('collapsed')){
    el.classList.remove('collapsed');
    btn.textContent = 'Show less';
  } else {
    el.classList.add('collapsed');
    btn.textContent = 'Read more';
  }
}

// ─── TALA ───
let talaOpen = false;
let voiceOn = true;
let isListening = false;
let recognition = null;
let synth = window.speechSynthesis;
let voices = [];

// ─── UNIFIED VOICE STATE (defined first, used by everything) ───
function setListeningUI(on) {
  const orb = document.getElementById('talaOrb');
  const micBtn = document.getElementById('talaMicBtn');
  const status = document.getElementById('tshStatus');
  if (on) { orb.classList.add('listening'); micBtn.classList.add('listening'); status.textContent = 'Listening...'; }
  else { orb.classList.remove('listening'); micBtn.classList.remove('listening'); if (talaOpen) status.textContent = 'Your Palawan concierge'; }
}
function stopVoice() { if (recognition && isListening) recognition.stop(); isListening = false; setListeningUI(false); }
function startVoice() {
  if (!recognition) return;
  if (!talaOpen) openTalaSheet();
  isListening = true; setListeningUI(true);
  recognition.start();
}

if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.continuous=false; recognition.interimResults=true; recognition.lang='en-US';
  recognition.onresult = e=>{
    let t=''; for(let i=e.resultIndex;i<e.results.length;i++) t+=e.results[i][0].transcript;
    document.getElementById('talaInput').value=t;
    if(e.results[e.results.length-1].isFinal) processTala(t);
  };
  recognition.onend = ()=>{ isListening=false; setListeningUI(false); };
  recognition.onerror = e=>{ isListening=false; setListeningUI(false);
    if(e.error==='not-allowed') addMsg('bot','Microphone access needed. Please allow permissions or type instead.');
  };
}

function loadVoices(){voices=synth.getVoices();}
loadVoices();
if(synth.onvoiceschanged) synth.onvoiceschanged=loadVoices;

function openTalaSheet() {
  talaOpen=true;
  document.getElementById('talaSheet').classList.add('open');
  document.getElementById('talaOverlay').classList.add('active');
  document.getElementById('talaOrbWrap').classList.add('hidden');
  closeDestSheet(false);
  renderTalaSuggestions();
}

function renderTalaSuggestions(){
  const container = document.getElementById('talaSugs');
  if(!container) return;
  const list = (talaSuggestions && talaSuggestions.length) ? talaSuggestions : DEFAULT_SUGGESTIONS;
  const active = list.filter(isSuggestionActiveToday);
  const shown = active.length ? active : list; // never show an empty bar
  container.innerHTML = shown.map(s=>
    `<button class="tala-sug" onclick="askTala(this)">${escapeHtml(s.text)}</button>`
  ).join('');
}

function closeTalaSheet(anim) {
  talaOpen=false;
  document.getElementById('talaSheet').classList.remove('open');
  document.getElementById('talaOverlay').classList.remove('active');
  if(!currentDest) document.getElementById('talaOrbWrap').classList.remove('hidden');
}

// Orb: tap opens sheet, long-press starts listening
let orbTimer=null, orbLong=false;
function orbTouchStart(){orbLong=false;orbTimer=setTimeout(()=>{orbLong=true;startVoice();},500);}
function orbTouchEnd(){clearTimeout(orbTimer);if(!orbLong) openTalaSheet();}
function orbMouseDown(){orbLong=false;orbTimer=setTimeout(()=>{orbLong=true;startVoice();},500);}
function orbMouseUp(){clearTimeout(orbTimer);if(!orbLong) openTalaSheet();}

function toggleMic(){
  if(!recognition){addMsg('bot','Voice not supported. Type your question.');return;}
  if(isListening){stopVoice();}
  else{startVoice();}
}

function sendTala(){
  const inp=document.getElementById('talaInput');
  const t=inp.value.trim(); if(!t)return;
  processTala(t); inp.value='';
}

function processTala(t){
  addMsg('user',t);
  const r=getAI(t);
  setTimeout(()=>{addMsg('bot',r);speak(r);},400+Math.random()*200);
}

function askTala(btn){processTala(btn.textContent);}

function addMsg(type,text){
  const chat=document.getElementById('talaChat');
  const d=document.createElement('div'); d.className=`tala-msg ${type}`; d.innerHTML=text;
  chat.appendChild(d); chat.scrollTop=chat.scrollHeight;
}

function speak(text){
  if(!synth||!voiceOn) return;
  synth.cancel();
  const c=text.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  const u=new SpeechSynthesisUtterance(c);
  u.rate=1;u.pitch=1;u.volume=.85;
  const v=voices.find(v=>v.lang.startsWith('en')&&v.name.toLowerCase().includes('female'))||voices.find(v=>v.lang.startsWith('en-US'))||voices.find(v=>v.lang.startsWith('en'));
  if(v) u.voice=v;
  u.onstart=()=>{document.getElementById('tshAvatar').classList.add('speaking');document.getElementById('tshStatus').textContent='tala is speaking...';};
  u.onend=()=>{document.getElementById('tshAvatar').classList.remove('speaking');document.getElementById('tshStatus').textContent='Your Palawan concierge';};
  synth.speak(u);
}

function toggleMute(){
  voiceOn=!voiceOn;
  const b=document.getElementById('tshMute');
  if(voiceOn){b.textContent='🔊';b.classList.remove('muted');document.getElementById('tshStatus').textContent='Your Palawan concierge';}
  else{b.textContent='🔇';b.classList.add('muted');document.getElementById('tshStatus').textContent='Voice muted';synth.cancel();document.getElementById('tshAvatar').classList.remove('speaking');}
}

// ─── SEARCH ───
const placeholders=["Ask tala about beaches...","Best time to visit San Vicente?","How to get to San Vicente?","Hidden gems locals love...","Budget travel tips...","Best surf spots in Alimanguan...","What to eat in San Vicente..."];
let phIdx=0,phChar=0,phDir=1;
const heroInput=document.getElementById('heroInput');

function animPlaceholder(){
  const cur=placeholders[phIdx];
  if(phDir===1){heroInput.setAttribute('placeholder',cur.substring(0,phChar+1));phChar++;if(phChar===cur.length){setTimeout(()=>{phDir=-1;animPlaceholder();},2200);return;}}
  else{heroInput.setAttribute('placeholder',cur.substring(0,phChar-1));phChar--;if(phChar===0){phDir=1;phIdx=(phIdx+1)%placeholders.length;}}
  setTimeout(animPlaceholder,phDir===1?55:28);
}

function heroAsk(){
  const t=heroInput.value.trim(); if(!t)return;
  closeDestSheet(false);
  openTalaSheet();
  addMsg('user',t);
  setTimeout(()=>{addMsg('bot',getAI(t));speak(getAI(t));},400);
}

function heroMic(){
  if(isListening){stopVoice();return;}
  if(!recognition){openTalaSheet();addMsg('bot','Voice requires Chrome, Edge, or Safari. Type instead.');return;}
  // Show orb listening immediately for visual feedback
  setListeningUI(true);
  // Open tala sheet if not already open, then start recognition
  if(!talaOpen) openTalaSheet();
  setTimeout(()=>{
    if(recognition && !isListening){
      recognition.start();
      isListening=true;
      setListeningUI(true);
      document.getElementById('tshStatus').textContent='Listening...';
    }
  },200);
}

// ─── BOTTOM NAV ───
function dockNav(tab){
  document.querySelectorAll('.dock-item').forEach(d=>d.classList.remove('active'));
  document.querySelector(`.dock-item[data-tab="${tab}"]`).classList.add('active');

  switch(tab){
    case 'map': closeAllPanels(); closeDiscoverPanel(); document.getElementById('heroOverlay').classList.remove('hidden'); document.getElementById('heroFade').classList.remove('hidden'); if(map){ pinVisibilityOverride=false; activeMarkerSet=allMarkers; map.flyTo([10.50,119.22],11,{duration:1}); applyPinVisibility(); } break;
    case 'discover': closeAllPanels(); openDiscoverPanel(); if(map){filterCategory('all');} break;
    case 'tala': closeAllPanels(); closeDiscoverPanel(); openTalaSheet(); break;
    case 'pulse': closeAllPanels(); closeDiscoverPanel(); openPulsePanel(); break;
    case 'saved': closeAllPanels(); closeDiscoverPanel(); openDashboard(); break;
  }
}

function filterCategory(cat){
  if(!mapReady) return;
  allMarkers.forEach(m=>{ if(map.hasLayer(m)) map.removeLayer(m); });
  if(cat==='all'){
    activeMarkerSet = allMarkers;
    pinVisibilityOverride = false; // back to zoom-based behavior on the default view
    map.flyTo([10.50,119.22],11,{duration:1});
  } else {
    const ms=markersByCat[cat]||[];
    activeMarkerSet = ms;
    pinVisibilityOverride = true; // user explicitly asked for this category — always show it
    if(ms.length) map.flyToBounds(L.featureGroup(ms).getBounds().pad(.25),{duration:1,maxZoom:15});
  }
  applyPinVisibility();
}

// ─── MAP LAZY LOAD ───
const mapObs = new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !mapReady) { initMap(); mapObs.disconnect(); }
},{rootMargin:'200px'});
// Map is fullscreen so always observing
setTimeout(()=>{ if(!mapReady) initMap(); },100);

// ─── SCROLL → HIDE HERO ───
const shell = document.getElementById('appShell')||document.body;
let scrollY=0;
window.addEventListener('scroll',()=>{
  scrollY=window.scrollY;
  const hero=document.getElementById('heroOverlay');
  const fade=document.getElementById('heroFade');
  if(scrollY>100){hero.classList.add('hidden');fade.classList.add('hidden');}
  else{hero.classList.remove('hidden');fade.classList.remove('hidden');}
},{passive:true});

// ─── INIT ───
window.addEventListener('load',()=>{
  setTimeout(()=>{document.getElementById('splash').classList.add('hidden');},2200);
  setTimeout(animPlaceholder,2800);
  setTimeout(loadVoices,800);
  initAuth();

  // Show dock & orb after splash
  setTimeout(()=>{
    document.getElementById('bottomDock').classList.add('visible');
    document.getElementById('talaOrbWrap').classList.remove('hidden');
  },2600);
});

// ═══════════════════════════════════════════════════════
// ADMIN PANEL — triple-click "SANVIC.PH" brand label, PIN 5309.
// Edits write directly to Supabase (destinations, tala_responses,
// tala_settings) so changes show up for every visitor, synced
// through the same Lovable Cloud database the React app uses.
// ═══════════════════════════════════════════════════════
const ADMIN_PIN = "5309";
let brandClickCount = 0, brandClickTimer = null;
let adminUnlocked = false;
let adminTab = 'dest';
let adminEditingDestId = null;   // null = not editing, 'new' = creating, else id
let adminEditingTalaId = null;

function adminBrandClick(){
  brandClickCount++;
  clearTimeout(brandClickTimer);
  brandClickTimer = setTimeout(()=>{ brandClickCount = 0; }, 700);
  if(brandClickCount >= 3){
    brandClickCount = 0;
    openAdminPin();
  }
}

function openAdminPin(){
  document.getElementById('adminPinInput').value = '';
  document.getElementById('adminPinErr').textContent = '';
  document.getElementById('adminPinOverlay').classList.add('active');
  setTimeout(()=>document.getElementById('adminPinInput').focus(), 100);
}

function closeAdminPin(){
  document.getElementById('adminPinOverlay').classList.remove('active');
}

function checkAdminPin(){
  const val = document.getElementById('adminPinInput').value.trim();
  if(val === ADMIN_PIN){
    adminUnlocked = true;
    closeAdminPin();
    openAdminPanel();
  } else {
    document.getElementById('adminPinErr').textContent = 'Incorrect PIN';
    document.getElementById('adminPinInput').value = '';
  }
}

async function openAdminPanel(){
  if(!dataReady) await loadDataFromSupabase();
  document.getElementById('adminPanelOverlay').classList.add('active');
  switchAdminTab(adminTab);
}

function closeAdminPanel(){
  document.getElementById('adminPanelOverlay').classList.remove('active');
  adminEditingDestId = null;
  adminEditingTalaId = null;
}

function switchAdminTab(tab){
  adminTab = tab;
  document.getElementById('adminTabDest').classList.toggle('active', tab==='dest');
  document.getElementById('adminTabTala').classList.toggle('active', tab==='tala');
  adminEditingDestId = null;
  adminEditingTalaId = null;
  if(tab==='dest') renderAdminDest();
  else renderAdminTala();
}

function escapeHtml(s){
  return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ───────────── DESTINATIONS ADMIN ─────────────

function renderAdminDest(){
  const body = document.getElementById('adminBody');
  let html = `<button class="admin-add-btn" onclick="adminNewDest()">+ Add destination</button>`;

  if(adminEditingDestId !== null){
    html += adminDestFormHtml();
  }

  if(!destinations.length){
    html += `<div class="admin-empty">No destinations yet.</div>`;
  } else {
    html += destinations.map(d=>`
      <div class="admin-list-item">
        <div class="admin-list-item-head">
          <div onclick="adminEditDest(${d.id})" style="flex:1;cursor:pointer;">
            <strong>${escapeHtml(d.name)}</strong>${d.featured ? ' ⭐' : ''}${d.videoUrl ? ' 🎬' : ''}<br>
            <span>${escapeHtml(catStyle[d.category]?.label||d.category)} · ${escapeHtml(d.stats.travel||'')}</span>
          </div>
          <div class="admin-row-actions">
            <button class="admin-mini-btn" onclick="adminEditDest(${d.id})">Edit</button>
            <button class="admin-mini-btn danger" onclick="adminDeleteDest(${d.id})">Delete</button>
          </div>
        </div>
      </div>`).join('');
  }
  body.innerHTML = html;
}

function adminDestFormHtml(){
  const isNew = adminEditingDestId === 'new';
  const d = isNew ? {name:'',lat:'',lng:'',category:'beaches',image:'',description:'',tip:'',color:'#0ea5e9',videoUrl:'',videoType:'',featured:false,stats:{rating:'',travel:'',temp:'',season:''}} : destinations.find(x=>x.id===adminEditingDestId);
  if(!d) return '';
  const vType = d.videoType || 'none';
  return `
    <div class="admin-edit-box">
      <div class="admin-toggle-row">
        <label for="adfFeatured">Featured (shows on the Discover "All" tab)</label>
        <input type="checkbox" id="adfFeatured" ${d.featured?'checked':''}>
      </div>

      <div class="admin-field"><label>Name</label><input id="adfName" value="${escapeHtml(d.name)}"></div>

      <div class="admin-field">
        <label>Paste Google Maps link (fills name + lat/lng below)</label>
        <input id="adfMapsLink" placeholder="https://www.google.com/maps/place/..." oninput="adminParseMapsLink()">
        <div id="adfMapsLinkStatus" style="font-size:.68rem;color:var(--white-dim);margin-top:6px;">
          Works with full google.com/maps/... links. Shortened maps.app.goo.gl links need to be opened once first — then copy the expanded URL from the address bar.
        </div>
      </div>

      <div class="admin-grid-2">
        <div class="admin-field"><label>Latitude</label><input id="adfLat" value="${d.lat}"></div>
        <div class="admin-field"><label>Longitude</label><input id="adfLng" value="${d.lng}"></div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>Category</label>
          <select id="adfCat">
            ${Object.keys(catStyle).map(c=>`<option value="${c}" ${c===d.category?'selected':''}>${catStyle[c].label}</option>`).join('')}
          </select>
        </div>
        <div class="admin-field"><label>Marker color</label><input id="adfColor" value="${escapeHtml(d.color)}"></div>
      </div>

      <div class="admin-field">
        <label>Photo</label>
        <input id="adfImage" value="${escapeHtml(d.image)}" placeholder="Image URL, or upload below" oninput="adminPreviewImage()">
        <input type="file" id="adfImageFile" accept="image/jpeg,image/png,image/webp,image/gif" style="margin-top:8px;" onchange="adminUploadImageNow()">
        <div id="adfImageUploadStatus" style="font-size:.68rem;color:var(--white-dim);margin-top:6px;"></div>
        <img id="adfImagePreview" class="admin-img-preview" src="${escapeHtml(d.image)}" style="display:${d.image?'':'none'}" onerror="this.style.display='none'">
      </div>

      <div class="admin-field"><label>Description</label><textarea id="adfDesc" rows="3">${escapeHtml(d.description)}</textarea></div>
      <div class="admin-field"><label>Tip</label><textarea id="adfTip" rows="2">${escapeHtml(d.tip)}</textarea></div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>Rating</label><input id="adfRating" value="${escapeHtml(d.stats.rating)}"></div>
        <div class="admin-field"><label>Travel time</label><input id="adfTravel" value="${escapeHtml(d.stats.travel)}"></div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>Temp</label><input id="adfTemp" value="${escapeHtml(d.stats.temp)}"></div>
        <div class="admin-field"><label>Season</label><input id="adfSeason" value="${escapeHtml(d.stats.season)}"></div>
      </div>

      <div class="admin-field">
        <label>Video (shown instead of the photo when set)</label>
        <select id="adfVideoType" onchange="adminToggleVideoFields()">
          <option value="none" ${vType==='none'?'selected':''}>No video</option>
          <option value="youtube" ${vType==='youtube'?'selected':''}>YouTube URL</option>
          <option value="upload" ${vType==='upload'?'selected':''}>Upload from device</option>
        </select>
      </div>
      <div class="admin-field" id="adfVideoYoutubeWrap" style="display:${vType==='youtube'?'':'none'}">
        <label>YouTube URL</label>
        <input id="adfVideoYoutube" value="${vType==='youtube'?escapeHtml(d.videoUrl):''}" placeholder="https://youtube.com/watch?v=...">
      </div>
      <div class="admin-field" id="adfVideoUploadWrap" style="display:${vType==='upload'?'':'none'}">
        <label>Video file (mp4/webm/mov, up to 100MB)</label>
        <input type="file" id="adfVideoFile" accept="video/mp4,video/webm,video/quicktime,video/x-m4v">
        <div id="adfVideoUploadStatus" style="font-size:.7rem;color:var(--white-dim);margin-top:6px;">
          ${vType==='upload' && d.videoUrl ? 'Current: <a href="'+d.videoUrl+'" target="_blank" style="color:var(--ocean-teal-light)">existing video</a>' : ''}
        </div>
        <input type="hidden" id="adfVideoUploadedUrl" value="${vType==='upload'?escapeHtml(d.videoUrl):''}">
      </div>

      <div class="admin-edit-actions">
        <button class="admin-save-btn" id="adfSaveBtn" onclick="adminSaveDest()">${isNew?'Create':'Save changes'}</button>
        <button class="admin-cancel-btn" onclick="adminEditingDestId=null;renderAdminDest();">Cancel</button>
      </div>
    </div>`;
}

function adminToggleVideoFields(){
  const type = document.getElementById('adfVideoType').value;
  document.getElementById('adfVideoYoutubeWrap').style.display = type==='youtube' ? '' : 'none';
  document.getElementById('adfVideoUploadWrap').style.display = type==='upload' ? '' : 'none';
}

function adminPreviewImage(){
  const url = document.getElementById('adfImage').value.trim();
  const img = document.getElementById('adfImagePreview');
  if(url){ img.src = url; img.style.display = ''; }
  else { img.style.display = 'none'; }
}

async function adminUploadImageNow(){
  const fileInput = document.getElementById('adfImageFile');
  const file = fileInput.files[0];
  const status = document.getElementById('adfImageUploadStatus');
  if(!file) return;

  status.textContent = 'Uploading...';
  status.style.color = 'var(--white-dim)';
  try {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `dest_${Date.now()}_${Math.random().toString(36).slice(2,8)}.${ext}`;
    const { error } = await sb.storage.from('destination-images').upload(path, file, {
      cacheControl: '3600', upsert: false, contentType: file.type || 'image/jpeg'
    });
    if(error) throw error;

    const { data } = sb.storage.from('destination-images').getPublicUrl(path);
    document.getElementById('adfImage').value = data.publicUrl;
    adminPreviewImage();
    status.textContent = 'Uploaded.';
    status.style.color = '#22c55e';
  } catch(err){
    status.textContent = 'Upload failed: ' + (err.message || err);
    status.style.color = '#ef4444';
  }
}

function adminParseMapsLink(){
  const input = document.getElementById('adfMapsLink');
  const status = document.getElementById('adfMapsLinkStatus');
  const url = input.value.trim();
  if(!url){
    status.textContent = 'Tip: works with full google.com/maps/... links. Shortened maps.app.goo.gl links need to be opened once first — then copy the expanded URL from the address bar.';
    status.style.color = 'var(--white-dim)';
    return;
  }
  if(/maps\.app\.goo\.gl|goo\.gl\/maps/i.test(url)){
    status.textContent = 'That\'s a shortened link — open it in a browser tab first, then paste the expanded google.com/maps/... URL here. (Or just paste the short link in chat and ask to have it resolved.)';
    status.style.color = '#f59e0b';
    return;
  }
  const result = parseGoogleMapsUrl(url);
  if(result){
    document.getElementById('adfLat').value = result.lat;
    document.getElementById('adfLng').value = result.lng;
    const nameField = document.getElementById('adfName');
    if(result.name && !nameField.value.trim()) nameField.value = result.name;
    status.textContent = `Found: ${result.lat}, ${result.lng}${result.name ? ' — "'+result.name+'"' : ''}. Filled in below.`;
    status.style.color = '#22c55e';
  } else {
    status.textContent = 'Could not find coordinates in that link. Try copying the link again from the address bar after opening the place on Google Maps.';
    status.style.color = '#ef4444';
  }
}

function adminNewDest(){ adminEditingDestId='new'; renderAdminDest(); }
function adminEditDest(id){ adminEditingDestId=id; renderAdminDest(); }

async function adminUploadVideoIfNeeded(){
  const type = document.getElementById('adfVideoType').value;
  if(type !== 'upload') return null;

  const fileInput = document.getElementById('adfVideoFile');
  const file = fileInput.files[0];
  const statusEl = document.getElementById('adfVideoUploadStatus');
  const existingUrl = document.getElementById('adfVideoUploadedUrl').value;

  if(!file) return existingUrl || null; // keep existing video if no new file chosen

  const ext = (file.name.split('.').pop() || 'mp4').toLowerCase();
  const path = `dest_${Date.now()}_${Math.random().toString(36).slice(2,8)}.${ext}`;

  statusEl.textContent = 'Uploading...';
  const { error } = await sb.storage.from('destination-videos').upload(path, file, {
    cacheControl: '3600', upsert: false, contentType: file.type || 'video/mp4'
  });
  if(error){ statusEl.textContent = 'Upload failed: ' + error.message; throw error; }

  const { data } = sb.storage.from('destination-videos').getPublicUrl(path);
  statusEl.textContent = 'Uploaded.';
  return data.publicUrl;
}

async function adminSaveDest(){
  const saveBtn = document.getElementById('adfSaveBtn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  try {
    const videoType = document.getElementById('adfVideoType').value;
    let videoUrl = '';
    if(videoType === 'youtube'){
      videoUrl = document.getElementById('adfVideoYoutube').value.trim();
    } else if(videoType === 'upload'){
      videoUrl = await adminUploadVideoIfNeeded() || '';
    }

    const payload = {
      name: document.getElementById('adfName').value.trim(),
      lat: parseFloat(document.getElementById('adfLat').value),
      lng: parseFloat(document.getElementById('adfLng').value),
      category: document.getElementById('adfCat').value,
      color: document.getElementById('adfColor').value.trim() || '#0ea5e9',
      image: document.getElementById('adfImage').value.trim(),
      description: document.getElementById('adfDesc').value.trim(),
      tip: document.getElementById('adfTip').value.trim(),
      rating: document.getElementById('adfRating').value.trim(),
      travel: document.getElementById('adfTravel').value.trim(),
      temp: document.getElementById('adfTemp').value.trim(),
      season: document.getElementById('adfSeason').value.trim(),
      video_url: videoType === 'none' ? null : (videoUrl || null),
      video_type: videoType === 'none' ? null : videoType,
      featured: document.getElementById('adfFeatured').checked,
    };
    if(!payload.name || isNaN(payload.lat) || isNaN(payload.lng)){
      alert('Name, latitude, and longitude are required.');
      return;
    }

    if(adminEditingDestId === 'new'){
      payload.sort_order = destinations.length;
      const { error } = await sb.from('destinations').insert(payload);
      if(error) throw error;
    } else {
      const { error } = await sb.from('destinations').update(payload).eq('id', adminEditingDestId);
      if(error) throw error;
    }
    await loadDataFromSupabase();
    adminEditingDestId = null;
    renderAdminDest();
    rebuildMarkers();
  } catch(err){
    alert('Save failed: ' + (err.message || err));
    saveBtn.disabled = false;
    saveBtn.textContent = adminEditingDestId === 'new' ? 'Create' : 'Save changes';
  }
}

async function adminDeleteDest(id){
  if(!confirm('Delete this destination?')) return;
  try {
    const { error } = await sb.from('destinations').delete().eq('id', id);
    if(error) throw error;
    await loadDataFromSupabase();
    renderAdminDest();
    rebuildMarkers();
  } catch(err){
    alert('Delete failed: ' + (err.message || err));
  }
}

// ───────────── TALA ADMIN ─────────────

let talaFilterCat = 'all';
let talaSearchQuery = '';
let talaSuggestionsOpen = false;
let editingSuggestionId = null;
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function talaContentLength(text){
  const len = (text||'').length;
  if(len < 150) return {label:'Short', cls:'short'};
  if(len < 500) return {label:'Medium', cls:'medium'};
  return {label:'Long', cls:'long'};
}

function adminToggleSuggestionsPanel(){
  talaSuggestionsOpen = !talaSuggestionsOpen;
  renderAdminTala();
}

function adminSuggestionsPanelHtml(){
  let html = `
    <div class="admin-field" style="font-size:.7rem;color:var(--white-dim);margin-bottom:10px;">
      These are the tappable suggestion chips shown when Tala opens. Set a date range to make one seasonal (e.g. surf season Nov 1\u2013Mar 31) \u2014 leave it blank to always show.
    </div>
    <button class="admin-add-btn" onclick="adminNewSuggestion()">+ Add suggestion</button>`;

  if(editingSuggestionId !== null){
    html += adminSuggestionFormHtml();
  }

  if(!talaSuggestions.length){
    html += `<div class="admin-empty">No suggestions yet.</div>`;
  } else {
    html += talaSuggestions.map(s=>{
      const active = isSuggestionActiveToday(s);
      const rangeLabel = (s.active_from_month && s.active_to_month)
        ? `${MONTH_NAMES[s.active_from_month-1]} ${s.active_from_day||1} \u2013 ${MONTH_NAMES[s.active_to_month-1]} ${s.active_to_day||28}`
        : 'Always shown';
      return `
      <div class="admin-list-item">
        <div class="admin-list-item-head">
          <div onclick="adminEditSuggestion(${s.id})" style="flex:1;cursor:pointer;">
            <div class="admin-tala-badges">
              <span class="admin-len-pill" style="${active?'color:#5eead4;background:rgba(20,184,166,.14)':''}">${active ? 'Active now' : 'Not active now'}</span>
              <span class="admin-len-pill">${rangeLabel}</span>
            </div>
            <strong>${escapeHtml(s.text)}</strong>
          </div>
          <div class="admin-row-actions">
            <button class="admin-mini-btn" onclick="adminEditSuggestion(${s.id})">Edit</button>
            <button class="admin-mini-btn danger" onclick="adminDeleteSuggestion(${s.id})">Delete</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  return html;
}

function adminSuggestionFormHtml(){
  const isNew = editingSuggestionId === 'new';
  const s = isNew ? {text:'',active_from_month:'',active_from_day:'',active_to_month:'',active_to_day:''} : talaSuggestions.find(x=>x.id===editingSuggestionId);
  if(!s) return '';
  const monthOptions = (selected)=> `<option value="">\u2014</option>` + MONTH_NAMES.map((m,i)=>`<option value="${i+1}" ${selected==i+1?'selected':''}>${m}</option>`).join('');
  return `
    <div class="admin-edit-box">
      <div class="admin-field"><label>Suggestion text</label><input id="asfText" value="${escapeHtml(s.text)}" placeholder="e.g. Best beaches in San Vicente"></div>
      <div class="admin-field" style="font-size:.68rem;color:var(--white-dim);">Optional seasonal range (leave all on \u2014 for always-on)</div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>From month</label><select id="asfFromM">${monthOptions(s.active_from_month)}</select></div>
        <div class="admin-field"><label>From day</label><input id="asfFromD" type="number" min="1" max="31" value="${s.active_from_day||''}"></div>
      </div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>To month</label><select id="asfToM">${monthOptions(s.active_to_month)}</select></div>
        <div class="admin-field"><label>To day</label><input id="asfToD" type="number" min="1" max="31" value="${s.active_to_day||''}"></div>
      </div>
      <div class="admin-edit-actions">
        <button class="admin-save-btn" onclick="adminSaveSuggestion()">${isNew?'Create':'Save changes'}</button>
        <button class="admin-cancel-btn" onclick="editingSuggestionId=null;renderAdminTala();">Cancel</button>
      </div>
    </div>`;
}

function adminNewSuggestion(){ editingSuggestionId='new'; renderAdminTala(); }
function adminEditSuggestion(id){ editingSuggestionId=id; renderAdminTala(); }

async function adminSaveSuggestion(){
  const text = document.getElementById('asfText').value.trim();
  if(!text){ alert('Suggestion text is required.'); return; }

  const fromM = document.getElementById('asfFromM').value;
  const fromD = document.getElementById('asfFromD').value;
  const toM = document.getElementById('asfToM').value;
  const toD = document.getElementById('asfToD').value;

  const payload = {
    text,
    active_from_month: fromM ? parseInt(fromM) : null,
    active_from_day: fromD ? parseInt(fromD) : null,
    active_to_month: toM ? parseInt(toM) : null,
    active_to_day: toD ? parseInt(toD) : null,
  };

  try {
    if(editingSuggestionId === 'new'){
      payload.sort_order = talaSuggestions.length;
      const { error } = await sb.from('tala_suggestions').insert(payload);
      if(error) throw error;
    } else {
      const { error } = await sb.from('tala_suggestions').update(payload).eq('id', editingSuggestionId);
      if(error) throw error;
    }
    await loadDataFromSupabase();
    editingSuggestionId = null;
    renderAdminTala();
  } catch(err){
    alert('Save failed: ' + (err.message || err));
  }
}

async function adminDeleteSuggestion(id){
  if(!confirm('Delete this suggestion?')) return;
  try {
    const { error } = await sb.from('tala_suggestions').delete().eq('id', id);
    if(error) throw error;
    await loadDataFromSupabase();
    renderAdminTala();
  } catch(err){
    alert('Delete failed: ' + (err.message || err));
  }
}

function renderAdminTala(){
  const body = document.getElementById('adminBody');
  let html = `
    <div class="admin-section-toggle" onclick="adminToggleSuggestionsPanel()">
      <span>⚡ Quick suggestion chips ${talaSuggestionsOpen?'▾':'▸'}</span>
      <span class="admin-section-count">${talaSuggestions.length}</span>
    </div>
    <div id="adfSuggestionsPanel" style="display:${talaSuggestionsOpen?'':'none'}">
      ${adminSuggestionsPanelHtml()}
    </div>

    <div class="admin-field" style="margin-top:16px;">
      <label>Fallback response (used when nothing matches)</label>
      <textarea id="adfDefaultR" rows="3" onblur="adminSaveDefaultResponse()">${escapeHtml(defaultR)}</textarea>
    </div>
    <div class="admin-grid-2" style="margin-bottom:14px;">
      <button class="admin-add-btn" style="margin-bottom:0;" onclick="adminNewTala()">+ Add response</button>
      <button class="admin-add-btn" style="margin-bottom:0;" onclick="document.getElementById('adfBulkFile').click()">⇧ Upload .txt files</button>
    </div>
    <input type="file" id="adfBulkFile" accept=".txt,text/plain" multiple style="display:none" onchange="adminHandleBulkFiles(event)">
    <div id="adfBulkQueue"></div>`;

  if(adminEditingTalaId !== null){
    html += adminTalaFormHtml();
  }

  // Filter tabs + search
  const counts = { all: aiData.length, personality: aiData.filter(i=>(i.cat||'knowledge')==='personality').length, knowledge: aiData.filter(i=>(i.cat||'knowledge')==='knowledge').length };
  html += `
    <div class="admin-tala-filters">
      <button class="admin-cat-tab ${talaFilterCat==='all'?'active':''}" onclick="adminSetTalaFilter('all')">All <span>${counts.all}</span></button>
      <button class="admin-cat-tab personality ${talaFilterCat==='personality'?'active':''}" onclick="adminSetTalaFilter('personality')">Personality <span>${counts.personality}</span></button>
      <button class="admin-cat-tab knowledge ${talaFilterCat==='knowledge'?'active':''}" onclick="adminSetTalaFilter('knowledge')">Knowledge <span>${counts.knowledge}</span></button>
    </div>
    <input class="admin-tala-search" placeholder="Search keywords or content..." value="${escapeHtml(talaSearchQuery)}" oninput="adminSetTalaSearch(this.value)">`;

  // Apply filter + search
  let items = aiData;
  if(talaFilterCat !== 'all') items = items.filter(i=>(i.cat||'knowledge')===talaFilterCat);
  if(talaSearchQuery.trim()){
    const q = talaSearchQuery.trim().toLowerCase();
    items = items.filter(i=>
      i.kw.join(' ').toLowerCase().includes(q) ||
      (i.r||'').toLowerCase().includes(q)
    );
  }

  if(!items.length){
    html += `<div class="admin-empty">${aiData.length ? 'No matches for this filter/search.' : 'No responses yet.'}</div>`;
  } else {
    html += items.map(item=>{
      const cat = item.cat || 'knowledge';
      const len = talaContentLength(item.r);
      return `
      <div class="admin-list-item">
        <div class="admin-list-item-head">
          <div onclick="adminEditTala(${item.id})" style="flex:1;cursor:pointer;">
            <div class="admin-tala-badges">
              <span class="admin-cat-pill ${cat}">${cat==='personality'?'Personality':'Knowledge'}</span>
              <span class="admin-len-pill ${len.cls}">${len.label}</span>
            </div>
            <strong>${escapeHtml(item.kw.join(', '))}</strong>
          </div>
          <div class="admin-row-actions">
            <button class="admin-mini-btn" onclick="adminEditTala(${item.id})">Edit</button>
            <button class="admin-mini-btn danger" onclick="adminDeleteTala(${item.id})">Delete</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  body.innerHTML = html;
}

function adminSetTalaFilter(cat){
  talaFilterCat = cat;
  renderAdminTala();
}

function adminSetTalaSearch(val){
  talaSearchQuery = val;
  // Re-render just the list portion would be ideal, but re-running the
  // full render is simple and fast enough at this data size. Preserve
  // focus by not fully replacing the search input itself on every key.
  const body = document.getElementById('adminBody');
  const scrollPos = body.scrollTop;
  renderAdminTala();
  body.scrollTop = scrollPos;
  const input = document.querySelector('.admin-tala-search');
  if(input){ input.focus(); input.setSelectionRange(val.length, val.length); }
}

function adminTalaFormHtml(){
  const isNew = adminEditingTalaId === 'new';
  const item = isNew ? {kw:[],r:'',cat:'knowledge'} : aiData.find(x=>x.id===adminEditingTalaId);
  if(!item) return '';
  const cat = item.cat || 'knowledge';
  return `
    <div class="admin-edit-box">
      <div class="admin-field">
        <label>Category</label>
        <select id="atfCat">
          <option value="knowledge" ${cat==='knowledge'?'selected':''}>Knowledge (facts about San Vicente)</option>
          <option value="personality" ${cat==='personality'?'selected':''}>Personality (how Tala talks/acts)</option>
        </select>
      </div>
      <div class="admin-field"><label>Keywords (comma-separated)</label><input id="atfKw" value="${escapeHtml(item.kw.join(', '))}"></div>
      <div class="admin-field"><label>Response (HTML allowed, e.g. &lt;strong&gt;, &lt;br&gt;)</label><textarea id="atfResp" rows="5">${escapeHtml(item.r)}</textarea></div>
      <div class="admin-edit-actions">
        <button class="admin-save-btn" onclick="adminSaveTala()">${isNew?'Create':'Save changes'}</button>
        <button class="admin-cancel-btn" onclick="adminEditingTalaId=null;renderAdminTala();">Cancel</button>
      </div>
    </div>`;
}

function adminNewTala(){ adminEditingTalaId='new'; renderAdminTala(); }

// ───────────── BULK .TXT UPLOAD ─────────────
// Reads each selected .txt file, shows it in a queue with an editable
// keyword field (pre-filled from the filename), and lets the admin
// save them all into tala_responses in one batch. Each file becomes
// one response entry — the full file content is the response, and the
// keywords typed in are what triggers it. No auto-parsing of arbitrary
// prose into multiple entries, since that's not reliable; this keeps
// the one unavoidable manual step (deciding trigger words) but removes
// everything else.
let bulkQueue = []; // { id, filename, content, keywords }
let bulkIdCounter = 0;

function guessKeywordsFromFilename(filename){
  return filename
    .replace(/\.txt$/i,'')
    .replace(/^\d+[_\-\s]*/,'')   // strip leading numbers like "01_"
    .replace(/[_\-]+/g,' ')
    .trim();
}

function adminHandleBulkFiles(event){
  const files = Array.from(event.target.files || []);
  if(!files.length) return;

  let pending = files.length;
  files.forEach(file=>{
    const reader = new FileReader();
    reader.onload = (e)=>{
      bulkQueue.push({
        id: ++bulkIdCounter,
        filename: file.name,
        content: e.target.result,
        keywords: guessKeywordsFromFilename(file.name)
      });
      pending--;
      if(pending === 0) renderBulkQueue();
    };
    reader.onerror = ()=>{
      pending--;
      if(pending === 0) renderBulkQueue();
    };
    reader.readAsText(file);
  });

  event.target.value = ''; // allow re-selecting the same file later
}

function renderBulkQueue(){
  const container = document.getElementById('adfBulkQueue');
  if(!container) return;
  if(!bulkQueue.length){ container.innerHTML = ''; return; }

  container.innerHTML = `
    <div class="admin-edit-box">
      <div class="admin-field" style="margin-bottom:8px;">
        <label>${bulkQueue.length} file${bulkQueue.length>1?'s':''} ready — set category + trigger keywords for each, then save</label>
      </div>
      ${bulkQueue.map(item=>`
        <div class="admin-list-item" style="margin-bottom:10px;">
          <div style="font-size:.8rem;color:var(--white-soft);font-weight:500;margin-bottom:6px;">
            📄 ${escapeHtml(item.filename)} <span style="color:var(--white-dim);font-size:.68rem;">(${item.content.length.toLocaleString()} chars)</span>
          </div>
          <div class="admin-field" style="margin-bottom:6px;">
            <label>Category</label>
            <select onchange="bulkQueue.find(x=>x.id===${item.id}).category=this.value">
              <option value="knowledge" ${item.category!=='personality'?'selected':''}>Knowledge (facts about San Vicente)</option>
              <option value="personality" ${item.category==='personality'?'selected':''}>Personality (how Tala talks/acts)</option>
            </select>
          </div>
          <div class="admin-field" style="margin-bottom:6px;">
            <label>Trigger keywords (comma-separated — words a visitor might type that should bring up this content)</label>
            <input value="${escapeHtml(item.keywords)}" oninput="bulkQueue.find(x=>x.id===${item.id}).keywords=this.value">
          </div>
          <button class="admin-mini-btn danger" onclick="bulkQueue=bulkQueue.filter(x=>x.id!==${item.id});renderBulkQueue();">Remove from queue</button>
        </div>`).join('')}
      <div class="admin-edit-actions">
        <button class="admin-save-btn" id="adfBulkSaveBtn" onclick="adminSaveBulkQueue()">Save all ${bulkQueue.length} to Tala</button>
        <button class="admin-cancel-btn" onclick="bulkQueue=[];renderBulkQueue();">Cancel</button>
      </div>
    </div>`;
}

async function adminSaveBulkQueue(){
  const saveBtn = document.getElementById('adfBulkSaveBtn');
  const invalid = bulkQueue.filter(item=>!item.keywords.trim());
  if(invalid.length){
    alert(`Please add at least one keyword for: ${invalid.map(i=>i.filename).join(', ')}`);
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';
  try {
    const rows = bulkQueue.map((item, i)=>({
      keywords: item.keywords.split(',').map(s=>s.trim()).filter(Boolean),
      response: escapeHtml(item.content).replace(/\n/g,'<br>'),
      category: item.category || 'knowledge',
      sort_order: aiData.length + i
    }));
    const { error } = await sb.from('tala_responses').insert(rows);
    if(error) throw error;

    bulkQueue = [];
    await loadDataFromSupabase();
    renderAdminTala();
  } catch(err){
    alert('Bulk save failed: ' + (err.message || err));
    saveBtn.disabled = false;
    saveBtn.textContent = `Save all ${bulkQueue.length} to Tala`;
  }
}
function adminEditTala(id){ adminEditingTalaId=id; renderAdminTala(); }

async function adminSaveTala(){
  const kw = document.getElementById('atfKw').value.split(',').map(s=>s.trim()).filter(Boolean);
  const r = document.getElementById('atfResp').value.trim();
  const cat = document.getElementById('atfCat').value;
  if(!kw.length || !r){
    alert('At least one keyword and a response are required.');
    return;
  }
  try {
    if(adminEditingTalaId === 'new'){
      const { error } = await sb.from('tala_responses').insert({ keywords: kw, response: r, category: cat, sort_order: aiData.length });
      if(error) throw error;
    } else {
      const { error } = await sb.from('tala_responses').update({ keywords: kw, response: r, category: cat }).eq('id', adminEditingTalaId);
      if(error) throw error;
    }
    await loadDataFromSupabase();
    adminEditingTalaId = null;
    renderAdminTala();
  } catch(err){
    alert('Save failed: ' + (err.message || err));
  }
}

async function adminDeleteTala(id){
  if(!confirm('Delete this response?')) return;
  try {
    const { error } = await sb.from('tala_responses').delete().eq('id', id);
    if(error) throw error;
    await loadDataFromSupabase();
    renderAdminTala();
  } catch(err){
    alert('Delete failed: ' + (err.message || err));
  }
}

async function adminSaveDefaultResponse(){
  const val = document.getElementById('adfDefaultR').value.trim();
  if(!val || val === defaultR) return;
  try {
    const { error } = await sb.from('tala_settings').upsert({ key: 'default_response', value: val });
    if(error) throw error;
    defaultR = val;
  } catch(err){
    alert('Save failed: ' + (err.message || err));
  }
}

// ───────────── RESET TO DEFAULTS ─────────────

async function adminResetDefaults(){
  if(!confirm('This will erase ALL destinations and tala responses in Supabase and replace them with the original built-in defaults. Continue?')) return;
  try {
    await sb.from('destinations').delete().neq('id', -1);
    await sb.from('tala_responses').delete().neq('id', -1);

    const destRows = DEFAULT_DESTINATIONS.map((d,i)=>({
      name:d.name, lat:d.lat, lng:d.lng, category:d.category, image:d.image,
      description:d.description, tip:d.tip, color:d.color, sort_order:i,
      rating:d.stats.rating, travel:d.stats.travel, temp:d.stats.temp, season:d.stats.season
    }));
    const talaRows = DEFAULT_TALA_DATA.map((t,i)=>({ keywords:t.kw, response:t.r, sort_order:i }));

    await sb.from('destinations').insert(destRows);
    await sb.from('tala_responses').insert(talaRows);
    await sb.from('tala_settings').upsert({ key:'default_response', value: DEFAULT_FALLBACK_RESPONSE });

    await loadDataFromSupabase();
    rebuildMarkers();
    if(adminTab==='dest') renderAdminDest(); else renderAdminTala();
    alert('Reset complete.');
  } catch(err){
    alert('Reset failed: ' + (err.message || err));
  }
}
