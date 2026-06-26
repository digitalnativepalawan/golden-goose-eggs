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

function destRowToObj(row){
  return {
    id: row.id, name: row.name, lat: row.lat, lng: row.lng, category: row.category,
    image: row.image, description: row.description, tip: row.tip, color: row.color || '#0ea5e9',
    videoUrl: row.video_url || '', videoType: row.video_type || '',
    stats: { rating: row.rating, travel: row.travel, temp: row.temp, season: row.season }
  };
}

async function loadDataFromSupabase(){
  try {
    const [destRes, talaRes, settingsRes] = await Promise.all([
      sb.from('destinations').select('*').order('sort_order', { ascending: true }),
      sb.from('tala_responses').select('*').order('sort_order', { ascending: true }),
      sb.from('tala_settings').select('*').eq('key', 'default_response').maybeSingle(),
    ]);

    if (destRes.error) throw destRes.error;
    if (talaRes.error) throw talaRes.error;

    destinations = (destRes.data && destRes.data.length) ? destRes.data.map(destRowToObj) : DEFAULT_DESTINATIONS;
    aiData = (talaRes.data && talaRes.data.length) ? talaRes.data.map(r=>({ id:r.id, kw:r.keywords, r:r.response })) : DEFAULT_TALA_DATA;
    defaultR = (settingsRes.data && settingsRes.data.value) ? settingsRes.data.value : DEFAULT_FALLBACK_RESPONSE;
  } catch(err) {
    console.warn('[SANVIC] Supabase load failed, using built-in defaults:', err);
    destinations = DEFAULT_DESTINATIONS;
    aiData = DEFAULT_TALA_DATA;
    defaultR = DEFAULT_FALLBACK_RESPONSE;
  }
  dataReady = true;
}

const catStyle = {
  beaches:{label:"Beaches",color:"#0ea5e9",bg:"rgba(14,165,233,.12)"},
  islands:{label:"Islands",color:"#8b5cf6",bg:"rgba(139,92,246,.12)"},
  nature:{label:"Nature",color:"#22c55e",bg:"rgba(34,197,94,.12)"},
  adventure:{label:"Adventure",color:"#ef4444",bg:"rgba(239,68,68,.12)"},
  culture:{label:"Culture",color:"#f59e0b",bg:"rgba(245,158,11,.12)"}
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

function rebuildMarkers(){
  if(!map) return;
  allMarkers.forEach(m=>map.removeLayer(m));
  allMarkers=[];
  for(const k in markersByCat) delete markersByCat[k];
  destinations.forEach(d=>{
    if(!markersByCat[d.category]) markersByCat[d.category]=[];
    const m = L.marker([d.lat,d.lng],{icon:L.divIcon({className:'',html:`<div class="mk-wrap" style="animation-delay:${Math.random()*2}s"><div class="mk-glow" style="color:${d.color}"></div><div class="mk-ring" style="border-color:${d.color}"></div><div class="mk-dot" style="background:${d.color};box-shadow:0 0 12px ${d.color}"></div></div>`,iconSize:[32,32],iconAnchor:[16,16]})}).addTo(map);
    m._d=d; m.on('click',()=>openDest(d));
    markersByCat[d.category].push(m); allMarkers.push(m);
  });
  renderDiscoverList(document.querySelector('.discover-cat.active')?.dataset.cat || 'all');
}

async function initMap() {
  if (mapReady) return;
  mapReady = true;

  if(!dataReady) await loadDataFromSupabase();

  map = L.map('map',{center:[10.50,119.22],zoom:11,zoomControl:false,attributionControl:true,fadeAnimation:true,zoomAnimation:true});

  const street = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OSM &copy; CARTO',maxZoom:19,subdomains:'abcd'});
  const sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'&copy; Esri',maxZoom:19});

  street.addTo(map);
  window._mS=street; window._mSat=sat; window._mView='street';

  L.control.zoom({position:'bottomright'}).addTo(map);
  document.getElementById('mapLayerToggle').classList.add('visible');
  document.getElementById('mapRecenter').classList.add('visible');

  rebuildMarkers();
}

function switchMapLayer(type,btn){
  if(!mapReady) return;
  document.querySelectorAll('.mlt-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(type==='satellite'&&window._mView!=='satellite'){map.removeLayer(window._mS);window._mSat.addTo(map);window._mView='satellite';}
  else if(type==='street'&&window._mView!=='street'){map.removeLayer(window._mSat);window._mS.addTo(map);window._mView='street';}
  map.invalidateSize({animate:false});
}

// ─── SINGLE-ACTIVE-LAYER SYSTEM ───
// At any moment, at most ONE of: destSheet, talaSheet, search-focus is active.
// When one opens, others close automatically.

function closeAllPanels() {
  closeDestSheet(false);
  closeTalaSheet(false);
}

// ─── DESTINATION SHEET ───
let currentDest = null;

function getYoutubeId(url){
  if(!url) return '';
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : '';
}

function openDest(d) {
  currentDest = d;
  const cat = catStyle[d.category];

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
  if(map) map.flyTo([10.50,119.22],11,{duration:1});
  document.querySelectorAll('.dock-item').forEach(d=>d.classList.remove('active'));
  const mapBtn=document.querySelector('.dock-item[data-tab="map"]');
  if(mapBtn) mapBtn.classList.add('active');
}

function renderDiscoverList(cat='all'){
  const list=document.getElementById('discoverList');
  if(!list) return;
  const items=cat==='all'?destinations:destinations.filter(d=>d.category===cat);
  list.innerHTML=items.map(d=>`
    <button class="discover-card" onclick="openDestinationById(${d.id})">
      <img src="${d.image}" alt="${d.name}">
      <div class="discover-card-body">
        <div class="discover-card-name">${d.name}</div>
        <div class="discover-card-meta"><span>${catStyle[d.category].label}</span><span>•</span><span>${d.stats.travel}</span></div>
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
const placeholders=["Ask tala about beaches...","Best time to visit Palawan?","How to get to El Nido?","Hidden gems in Coron...","Budget travel tips...","Underground River details...","What to eat in Palawan..."];
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
    case 'map': closeAllPanels(); closeDiscoverPanel(); document.getElementById('heroOverlay').classList.remove('hidden'); document.getElementById('heroFade').classList.remove('hidden'); if(map) map.flyTo([10.50,119.22],11,{duration:1}); break;
    case 'discover': openDiscoverPanel(); if(map){filterCategory('all');} break;
    case 'tala': closeDiscoverPanel(); closeDestSheet(false); openTalaSheet(); break;
    case 'saved': closeDiscoverPanel(); closeDestSheet(false); openTalaSheet(); addMsg('bot','Your saved San Vicente places will appear here. Tap markers like Long Beach, Port Barton, or Boayan Island, then ask tala to help plan the route.'); break;
  }
}

function filterCategory(cat){
  if(!mapReady) return;
  if(cat==='all'){allMarkers.forEach(m=>m.addTo(map));map.flyTo([10.50,119.22],11,{duration:1});}
  else{allMarkers.forEach(m=>map.removeLayer(m));const ms=markersByCat[cat]||[];ms.forEach(m=>m.addTo(map));if(ms.length) map.flyToBounds(L.featureGroup(ms).getBounds().pad(.25),{duration:1});}
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
            <strong>${escapeHtml(d.name)}</strong>${d.videoUrl ? ' 🎬' : ''}<br>
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
  const d = isNew ? {name:'',lat:'',lng:'',category:'beaches',image:'',description:'',tip:'',color:'#0ea5e9',videoUrl:'',videoType:'',stats:{rating:'',travel:'',temp:'',season:''}} : destinations.find(x=>x.id===adminEditingDestId);
  if(!d) return '';
  const vType = d.videoType || 'none';
  return `
    <div class="admin-edit-box">
      <div class="admin-field"><label>Name</label><input id="adfName" value="${escapeHtml(d.name)}"></div>
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
      <div class="admin-field"><label>Image path / URL</label><input id="adfImage" value="${escapeHtml(d.image)}"></div>
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

function renderAdminTala(){
  const body = document.getElementById('adminBody');
  let html = `
    <div class="admin-field">
      <label>Fallback response (used when nothing matches)</label>
      <textarea id="adfDefaultR" rows="3" onblur="adminSaveDefaultResponse()">${escapeHtml(defaultR)}</textarea>
    </div>
    <button class="admin-add-btn" onclick="adminNewTala()">+ Add response</button>`;

  if(adminEditingTalaId !== null){
    html += adminTalaFormHtml();
  }

  if(!aiData.length){
    html += `<div class="admin-empty">No responses yet.</div>`;
  } else {
    html += aiData.map(item=>`
      <div class="admin-list-item">
        <div class="admin-list-item-head">
          <div onclick="adminEditTala(${item.id})" style="flex:1;cursor:pointer;">
            <strong>${escapeHtml(item.kw.join(', '))}</strong>
          </div>
          <div class="admin-row-actions">
            <button class="admin-mini-btn" onclick="adminEditTala(${item.id})">Edit</button>
            <button class="admin-mini-btn danger" onclick="adminDeleteTala(${item.id})">Delete</button>
          </div>
        </div>
      </div>`).join('');
  }
  body.innerHTML = html;
}

function adminTalaFormHtml(){
  const isNew = adminEditingTalaId === 'new';
  const item = isNew ? {kw:[],r:''} : aiData.find(x=>x.id===adminEditingTalaId);
  if(!item) return '';
  return `
    <div class="admin-edit-box">
      <div class="admin-field"><label>Keywords (comma-separated)</label><input id="atfKw" value="${escapeHtml(item.kw.join(', '))}"></div>
      <div class="admin-field"><label>Response (HTML allowed, e.g. &lt;strong&gt;, &lt;br&gt;)</label><textarea id="atfResp" rows="5">${escapeHtml(item.r)}</textarea></div>
      <div class="admin-edit-actions">
        <button class="admin-save-btn" onclick="adminSaveTala()">${isNew?'Create':'Save changes'}</button>
        <button class="admin-cancel-btn" onclick="adminEditingTalaId=null;renderAdminTala();">Cancel</button>
      </div>
    </div>`;
}

function adminNewTala(){ adminEditingTalaId='new'; renderAdminTala(); }
function adminEditTala(id){ adminEditingTalaId=id; renderAdminTala(); }

async function adminSaveTala(){
  const kw = document.getElementById('atfKw').value.split(',').map(s=>s.trim()).filter(Boolean);
  const r = document.getElementById('atfResp').value.trim();
  if(!kw.length || !r){
    alert('At least one keyword and a response are required.');
    return;
  }
  try {
    if(adminEditingTalaId === 'new'){
      const { error } = await sb.from('tala_responses').insert({ keywords: kw, response: r, sort_order: aiData.length });
      if(error) throw error;
    } else {
      const { error } = await sb.from('tala_responses').update({ keywords: kw, response: r }).eq('id', adminEditingTalaId);
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
