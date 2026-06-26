// ═══════════════════════════════════════════════════════
// SANVIC.PH × TALA — Clean Interaction Model
// One active layer at a time. Map is the product.
// ═══════════════════════════════════════════════════════

// ─── DATA ───
const destinations = [
  { id:1, name:"El Nido", lat:11.1767, lng:119.4107, category:"beaches",
    image:"https://images.pexels.com/photos/31533426/pexels-photo-31533426.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"The crown jewel of Palawan — limestone karsts rising from sapphire waters, hidden lagoons accessible only by boat, and world-class island-hopping that redefines tropical beauty.",
    tip:"Book island-hopping Tour A early morning. Visit November through May. Eco-fee: 200 pesos/day.",
    stats:{rating:"4.9",travel:"2h from Manila",temp:"28°C",season:"Nov–May"}, color:"#0ea5e9" },
  { id:2, name:"Coron", lat:12.0053, lng:120.1994, category:"islands",
    image:"https://images.pexels.com/photos/35652152/pexels-photo-35652152.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"A diver's paradise with crystal-clear lagoons, WWII shipwrecks beneath turquoise depths, and natural hot springs among dramatic limestone formations.",
    tip:"Best diving March–June. Book island-hopping covering Kayangan Lake, Barracuda Lake, and shipwrecks.",
    stats:{rating:"4.8",travel:"1.5h from Manila",temp:"30°C",season:"Mar–Jun"}, color:"#8b5cf6" },
  { id:3, name:"Subterranean River", lat:9.6780, lng:118.8070, category:"nature",
    image:"https://images.pexels.com/photos/35650900/pexels-photo-35650900.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"A UNESCO World Heritage Site. An 8-kilometer underground river flowing through ancient limestone directly into the sea.",
    tip:"Book 2–3 days ahead. Tours every 45 minutes. No photography inside the caves.",
    stats:{rating:"4.7",travel:"2h from PPS",temp:"29°C",season:"Year-round"}, color:"#22c55e" },
  { id:4, name:"Seven Commandos Cave", lat:12.0083, lng:120.2083, category:"adventure",
    image:"https://images.pexels.com/photos/35649530/pexels-photo-35649530.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"A 150-meter coral cave where seven US Navy SEALs hid before the Battle of Coron. Entrance opens to a pristine turquoise pool.",
    tip:"Included in Coron Tour B. Bring a flashlight. Exceptional snorkeling outside.",
    stats:{rating:"4.6",travel:"30m from Coron",temp:"30°C",season:"Mar–Jun"}, color:"#ef4444" },
  { id:5, name:"Snake Island", lat:12.1583, lng:120.1583, category:"islands",
    image:"https://images.pexels.com/photos/31533417/pexels-photo-31533417.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"A tiny crescent-shaped sandbar floating on aquamarine waters. The sand shifts with the current, ever-changing.",
    tip:"Part of Coron Tour A. Visit early morning. No two photos look the same.",
    stats:{rating:"4.8",travel:"1h from Coron",temp:"31°C",season:"Jan–May"}, color:"#8b5cf6" },
  { id:6, name:"Balabac Island", lat:9.3833, lng:118.0, category:"beaches",
    image:"https://images.pexels.com/photos/31533423/pexels-photo-31533423.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"Palawan's best-kept secret — Caribbean-like waters and the legendary Twin Lagoon. The Maldives of the Philippines.",
    tip:"6hr ferry + 1hr boat from Puerto Princesa. April–October best. Bring all cash — no ATMs.",
    stats:{rating:"4.9",travel:"7h from PPS",temp:"30°C",season:"Apr–Oct"}, color:"#0ea5e9" },
  { id:7, name:"Kayangan Lake", lat:12.0167, lng:120.1833, category:"nature",
    image:"https://images.pexels.com/photos/31533421/pexels-photo-31533421.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"Voted the cleanest lake in the Philippines. Elevated freshwater surrounded by towering limestone cliffs.",
    tip:"Part of Tour A in Coron. Swim across to the deeper side. Bring a snorkel mask.",
    stats:{rating:"4.9",travel:"20m from Coron",temp:"28°C",season:"Year-round"}, color:"#22c55e" },
  { id:8, name:"Port Barton", lat:10.6556, lng:118.3833, category:"beaches",
    image:"https://images.pexels.com/photos/31533418/pexels-photo-31533418.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"A laid-back fishing village, untouched by mass tourism. Authentic island-hopping and genuine local experience.",
    tip:"8hr van from Puerto Princesa. January–May best. No ATMs — bring cash.",
    stats:{rating:"4.5",travel:"8h from PPS",temp:"29°C",season:"Jan–May"}, color:"#0ea5e9" },
  { id:9, name:"Malcapuya Lagoon", lat:11.0833, lng:119.4167, category:"islands",
    image:"https://images.pexels.com/photos/36724824/pexels-photo-36724824.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"A stunning private sandbar surrounded by crystal-clear turquoise lagoon waters. One of El Nido's most iconic spots.",
    tip:"Part of El Nido Tour A. Arrive early. Only accessible during high tide.",
    stats:{rating:"4.8",travel:"45m from El Nido",temp:"29°C",season:"Nov–May"}, color:"#8b5cf6" },
  { id:10, name:"Nacpan Beach", lat:11.1333, lng:119.4333, category:"beaches",
    image:"https://images.pexels.com/photos/31533424/pexels-photo-31533424.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"A four-kilometer stretch of untouched golden sand, voted among the world's best beaches. Quiet, serene.",
    tip:"Moto taxi from El Nido town. Or walk free. Best at sunset. Bring food and water.",
    stats:{rating:"4.7",travel:"30m from El Nido",temp:"28°C",season:"Nov–May"}, color:"#0ea5e9" },
  { id:11, name:"Puerto Princesa City", lat:9.7392, lng:118.7353, category:"culture",
    image:"https://images.pexels.com/photos/35650900/pexels-photo-35650900.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"The capital of Palawan — gateway to the west. Crocodile farm, floating bamboo rafts, vibrant night market.",
    tip:"Try the floating breakfast on bamboo rafts. Jeepneys just 10 pesos.",
    stats:{rating:"4.3",travel:"1.5h flight",temp:"31°C",season:"Year-round"}, color:"#f59e0b" },
  { id:12, name:"Barracuda Lake", lat:12.02, lng:120.17, category:"adventure",
    image:"https://images.pexels.com/photos/35652152/pexels-photo-35652152.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
    description:"A thermocline lake — warm surface water gives way to near-freezing deep water. Feel the invisible boundary yourself.",
    tip:"Part of Coron Tour A. Thermocline at 5–10m depth. Great for freediving.",
    stats:{rating:"4.5",travel:"15m from Coron",temp:"26°C deep",season:"Year-round"}, color:"#ef4444" }
];

const catStyle = {
  beaches:{label:"Beaches",color:"#0ea5e9",bg:"rgba(14,165,233,.12)"},
  islands:{label:"Islands",color:"#8b5cf6",bg:"rgba(139,92,246,.12)"},
  nature:{label:"Nature",color:"#22c55e",bg:"rgba(34,197,94,.12)"},
  adventure:{label:"Adventure",color:"#ef4444",bg:"rgba(239,68,68,.12)"},
  culture:{label:"Culture",color:"#f59e0b",bg:"rgba(245,158,11,.12)"}
};

// ─── AI ───
const aiData = [
  {kw:["beach","beaches","sandy","shore"],
    r:`<strong>Top Beaches</strong><br><br>1. <strong>Nacpan</strong> — 4km golden sand<br>2. <strong>El Nido</strong> — white sand, limestone cliffs<br>3. <strong>Balabac</strong> — Caribbean clarity<br>4. <strong>Port Barton</strong> — quiet, authentic<br>5. <strong>Malcapuya</strong> — floating sandbar`},
  {kw:["el nido","elnido"],
    r:`<strong>El Nido</strong><br><br>Dramatic karsts, hidden lagoons, world-class island-hopping. Tours A–D cover Big/Small Lagoon, Secret Beach, Shimizu Island.<br><br>2hr flight from Manila. Best: Nov–May. Budget: 2,000–5,000 pesos/day.`},
  {kw:["coron"],
    r:`<strong>Coron</strong><br><br>Kayangan Lake, Barracuda Lake, Snake Island, Seven Commandos Cave, 20 WWII shipwrecks.<br><br>1.5hr flight from Manila. Best diving: Mar–Jun. Tours: 1,800 pesos/day.`},
  {kw:["underground","subterranean"],
    r:`<strong>Subterranean River — UNESCO Heritage</strong><br><br>8.2km underground river through ancient limestone to the sea. 22 bat species, 75 birds.<br><br>Book 2–3 days ahead. ~1,750 pesos. No photography inside.`},
  {kw:["time","visit","weather","season","month"],
    r:`<strong>Best Time to Visit</strong><br><br>Nov–Dec: Pleasant, fewer crowds, great diving<br>Jan–Feb: Coolest, ideal island hopping<br>Mar–May: Peak — calmest seas, most crowded<br><br>Jun–Oct: Cheaper, fewer crowds, short rain bursts<br><br>Best window: Jan–Mar`},
  {kw:["get","transport","flight","bus","ferry","travel"],
    r:`<strong>Getting Around</strong><br><br>Manila → Puerto Princesa: 1h20 flight (2,500–6,000₱)<br>Manila → El Nido: 2hr flight (4,000–8,000₱)<br>Manila → Coron: 1h30 flight (3,000–7,000₱)<br><br>Local: Jeepneys 10–20₱, motorbikes 500–800₱/day`},
  {kw:["budget","cost","money","price","cheap"],
    r:`<strong>Budget Guide</strong><br><br>Budget: 2,000–3,500₱/day<br>Mid-range: 5,000–10,000₱/day<br>Luxury: 15,000+₱/day<br><br>Bring cash — ATMs limited outside Puerto Princesa.`},
  {kw:["food","eat","restaurant","dish","cuisine"],
    r:`<strong>Must-Try</strong><br><br><strong>Kinilay</strong> — raw fish in vinegar & calamansi<br><strong>Inaruboy</strong> — fresh prawns, citrus sauce<br><strong>Crocodile meat</strong> — local delicacy<br><br>Most places cash-only. Try floating bamboo breakfast in PPS.`},
  {kw:["diving","snorkel","dive","coral","wreck"],
    r:`<strong>Diving & Snorkeling</strong><br><br><strong>Coron:</strong> 20+ WWII wrecks, 18–42m depth<br><strong>El Nido:</strong> Coral gardens, beginner-friendly<br><br>2-tank dive: 3,500–5,000₱. Best: Mar–Jun, visibility to 30m`},
  {kw:["packing","bring","prepare","gear"],
    r:`<strong>Packing</strong><br><br>Swimsuit, quick-dry towel, waterproof case<br>Reef-safe sunscreen (mandatory in El Nido)<br>Snorkel mask, water shoes, repellent<br><br>ID, printed tickets, cash — lots of cash.`},
  {kw:["tour","tours","island hop","lagoon"],
    r:`<strong>Island-Hopping</strong><br><br><strong>El Nido</strong> 1,500₱: Tour A (Lagoons, Secret Beach), Tour B (Taraw, Snake Island)<br><strong>Coron</strong> 1,800₱: Tour A (Kayangan, Barracuda, Snake), Tour B (Shipwrecks)<br><br>Includes boat, guide, lunch, snorkel gear.`},
  {kw:["hello","hi","hey","morning","evening"],
    r:`Mabuhay — welcome. I'm <strong>tala</strong>, your Palawan concierge. Ask about destinations, timing, routes, or hidden gems.`},
  {kw:["thank","thanks","salamat"],
    r:`My pleasure. Palawan will not disappoint. If you need anything else, I'm here.`},
  {kw:["safe","safety","danger"],
    r:`Palawan is one of the safest provinces in the Philippines. Watch for strong currents, use reef-safe sunscreen, and stick with registered tour operators. Emergency: 911.`},
  {kw:["balabac","tajong","twin lagoon"],
    r:`<strong>Balabac — The Maldives of Palawan</strong><br><br>Tajong Bay mirror-like waters. Twin Lagoon — freshwater and saltwater separated by sandbar.<br><br>6hr bus + 1hr boat from PPS. Apr–Oct best. All cash.`}
];

const defaultR = `I'm not sure about that, but I can help with:<br><br>Best beaches · El Nido · Coron · Underground River<br>Transport · Budget · Food · Diving<br><br>Or tap any marker on the map.`;

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

function initMap() {
  if (mapReady) return;
  mapReady = true;

  map = L.map('map',{center:[10.5,119],zoom:8,zoomControl:false,attributionControl:true,fadeAnimation:true,zoomAnimation:true});

  const street = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OSM &copy; CARTO',maxZoom:19,subdomains:'abcd'});
  const sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'&copy; Esri',maxZoom:19});

  street.addTo(map);
  window._mS=street; window._mSat=sat; window._mView='street';

  L.control.zoom({position:'bottomright'}).addTo(map);
  document.getElementById('mapLayerToggle').classList.add('visible');

  destinations.forEach(d=>{
    if(!markersByCat[d.category]) markersByCat[d.category]=[];
    const m = L.marker([d.lat,d.lng],{icon:L.divIcon({className:'',html:`<div class="mk-wrap" style="animation-delay:${Math.random()*2}s"><div class="mk-glow" style="color:${d.color}"></div><div class="mk-ring" style="border-color:${d.color}"></div><div class="mk-dot" style="background:${d.color};box-shadow:0 0 12px ${d.color}"></div></div>`,iconSize:[32,32],iconAnchor:[16,16]})}).addTo(map);
    m._d=d; m.on('click',()=>openDest(d));
    markersByCat[d.category].push(m); allMarkers.push(m);
  });
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

function openDest(d) {
  currentDest = d;
  const cat = catStyle[d.category];

  // Compact
  document.getElementById('dcImg').src = d.image;
  document.getElementById('dcName').textContent = d.name;
  document.getElementById('dcRating').innerHTML = `<span class="ds"></span>${d.stats.rating}`;
  document.getElementById('dcTravel').innerHTML = `<span class="ds"></span>${d.stats.travel}`;

  // Expanded
  document.getElementById('deImg').src = d.image;
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
  // Hide hero so map is interactive
  document.getElementById('heroOverlay').classList.add('hidden');
  document.getElementById('heroFade').classList.add('hidden');
  if(map) map.flyTo([d.lat,d.lng],11,{duration:1});
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
  document.getElementById('talaOrbWrap').classList.remove('hidden');
  // Restore hero
  document.getElementById('heroOverlay').classList.remove('hidden');
  document.getElementById('heroFade').classList.remove('hidden');
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
    case 'map': closeAllPanels(); document.getElementById('heroOverlay').classList.remove('hidden'); document.getElementById('heroFade').classList.remove('hidden'); break;
    case 'discover': closeAllPanels(); if(map){filterCategory('all');} break;
    case 'tala': closeDestSheet(false); openTalaSheet(); break;
    case 'saved': closeDestSheet(false); openTalaSheet(); addMsg('bot','Your saved places will appear here. Tap markers to explore, then ask tala to help you plan.'); break;
  }
}

function filterCategory(cat){
  if(!mapReady) return;
  if(cat==='all'){allMarkers.forEach(m=>m.addTo(map));map.flyTo([10.5,119],8,{duration:1});}
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
