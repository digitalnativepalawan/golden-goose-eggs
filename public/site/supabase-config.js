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

// ═══════════════════════════════════════════════════════
// SANVIC first-entry vibe flow.
// This is intentionally injected from this already-loaded config file
// so the existing interface stays untouched and reversible.
// ═══════════════════════════════════════════════════════
(function initSanvicEntryVibeFlow(){
  const ENTRY_KEY = 'sanvic_entry_v1';
  const MAX_VIBES = 4;
  const VIBES = [
    { label:'🍹 Mojito by the beach', tags:['beach','drink','social'] },
    { label:'🍔 Smashed burger after swimming', tags:['food','beach'] },
    { label:'👋 Meeting someone new', tags:['social','pulse'] },
    { label:'📖 Reading in a hammock', tags:['quiet','slow'] },
    { label:'🌿 Trekking into the jungle', tags:['explore','nature'] },
    { label:'❤️ Beach bed with my love', tags:['quiet','couples','private'] },
    { label:'🐢 Watching turtle hatchlings', tags:['nature','wildlife'] },
    { label:'🛵 Lost somewhere on a scooter', tags:['explore','routes'] },
    { label:'🏄 Surfing badly but proudly', tags:['surf','adventure'] },
    { label:'🐟 Eating fish caught this morning', tags:['food','local'] },
    { label:'🧊 Trying to kill the hangover', tags:['food','recovery'] },
    { label:'🌅 Chasing sunset', tags:['sunset','photo'] },
    { label:'🎒 Finding the place nobody told me about', tags:['hidden','explore'] },
    { label:'🎤 Singing videoke with friendly locals', tags:['social','local','pulse'] },
    { label:'🛶 Joining island hopping with new friends', tags:['island','social','pulse'] },
    { label:'🏝 Finding a wild beach with almost nobody around', tags:['quiet','hidden','beach'] },
    { label:'📸 Hunting for the perfect photo', tags:['photo','viewpoints','sunset'] },
    { label:'🥂 Cold Chardonnay on a private boat', tags:['private','curated','boat'] },
    { label:'🧘 Massage, brunch, and pretending emails don’t exist', tags:['slow','wellness','food'] },
    { label:'🧺 Wandering through the local market', tags:['food','local','market'] }
  ];

  const state = { step: 1, nickname: '', vibes: [] };

  const esc = (value) => String(value || '').replace(/[&<>'"]/g, (char) => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;'
  }[char]));

  const getProfile = () => {
    try { return JSON.parse(localStorage.getItem(ENTRY_KEY) || 'null'); }
    catch(err){ return null; }
  };

  const shouldShowEntry = () => {
    const url = new URL(window.location.href);
    if(url.searchParams.get('resetEntry') === '1'){
      localStorage.removeItem(ENTRY_KEY);
      return true;
    }
    return !getProfile();
  };

  const selectedTags = () => {
    const selected = VIBES.filter(v => state.vibes.includes(v.label));
    return [...new Set(selected.flatMap(v => v.tags))];
  };

  function injectEntryStyles(){
    if(document.getElementById('sanvicEntryStyles')) return;
    const style = document.createElement('style');
    style.id = 'sanvicEntryStyles';
    style.textContent = `
      body.sanvic-entry-lock #bottomDock.visible{opacity:0!important;pointer-events:none!important;transform:translateX(-50%) translateY(20px)!important}
      body.sanvic-entry-lock #talaOrbWrap{opacity:0!important;pointer-events:none!important;transform:translateY(20px)!important}
      .sanvic-entry-flow{position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;padding:calc(var(--safe-top,24px) + 18px) 18px calc(var(--safe-bottom,0px) + 18px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .7s cubic-bezier(.16,1,.3,1),visibility .7s;background:radial-gradient(circle at 50% 15%,rgba(20,184,166,.16),transparent 32%),linear-gradient(180deg,rgba(2,14,38,.38),rgba(2,14,38,.78))}
      .sanvic-entry-flow.active{opacity:1;visibility:visible;pointer-events:auto}
      .sanvic-entry-flow.closing{opacity:0;pointer-events:none}
      .sanvic-entry-backdrop{position:absolute;inset:0;background:rgba(2,14,38,.36);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
      .sanvic-entry-card{position:relative;width:min(100%,430px);max-height:min(86vh,720px);overflow:hidden;border-radius:var(--radius-xl,32px);background:linear-gradient(180deg,rgba(8,18,38,.78),rgba(4,12,30,.9));border:1px solid rgba(255,255,255,.08);box-shadow:0 28px 90px rgba(0,0,0,.42),0 0 0 1px rgba(196,168,130,.04) inset;backdrop-filter:blur(36px);-webkit-backdrop-filter:blur(36px);transform:translateY(18px) scale(.98);transition:transform .75s cubic-bezier(.16,1,.3,1)}
      .sanvic-entry-flow.active .sanvic-entry-card{transform:translateY(0) scale(1)}
      .sanvic-entry-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(224,122,95,.08),transparent 35%,rgba(20,184,166,.08));pointer-events:none}
      .sanvic-entry-inner{position:relative;padding:30px 24px 24px;display:flex;flex-direction:column;gap:20px}
      .sanvic-entry-kicker{font-size:.58rem;font-weight:400;letter-spacing:.34em;text-transform:uppercase;color:var(--limestone,#c4a882);opacity:.82}
      .sanvic-entry-title{font-family:var(--font-display,Georgia,serif);font-size:clamp(2rem,9vw,2.8rem);font-weight:300;line-height:1.04;letter-spacing:-.02em;color:var(--white-soft,rgba(255,255,255,.9))}
      .sanvic-entry-sub{font-size:.9rem;font-weight:300;line-height:1.6;color:var(--white-muted,rgba(255,255,255,.5));max-width:330px}
      .sanvic-entry-input{width:100%;height:54px;border-radius:var(--radius-md,20px);border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:var(--white-soft,rgba(255,255,255,.9));font-family:var(--font-body,-apple-system,sans-serif);font-size:1rem;font-weight:300;padding:0 16px;outline:none;user-select:text;-webkit-user-select:text;transition:border-color .25s,background .25s,box-shadow .25s}
      .sanvic-entry-input:focus{border-color:rgba(196,168,130,.38);background:rgba(255,255,255,.08);box-shadow:0 0 0 4px rgba(196,168,130,.07)}
      .sanvic-entry-input::placeholder{color:var(--white-dim,rgba(255,255,255,.25))}
      .sanvic-entry-actions{display:flex;flex-direction:column;gap:10px;margin-top:2px}
      .sanvic-entry-primary,.sanvic-entry-secondary{height:50px;border-radius:9999px;font-family:var(--font-body,-apple-system,sans-serif);font-size:.86rem;font-weight:500;letter-spacing:.04em;cursor:pointer;transition:transform .25s cubic-bezier(.34,1.56,.64,1),opacity .25s,background .25s;border:none;-webkit-tap-highlight-color:transparent}
      .sanvic-entry-primary{background:linear-gradient(135deg,var(--sand,#e8dcc8),var(--limestone,#c4a882));color:var(--charcoal-deep,#020e26);box-shadow:0 8px 28px rgba(196,168,130,.18)}
      .sanvic-entry-primary:active,.sanvic-entry-secondary:active{transform:scale(.97)}
      .sanvic-entry-secondary{background:transparent;color:var(--white-muted,rgba(255,255,255,.5));height:42px}
      .sanvic-entry-count{font-size:.68rem;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:var(--white-dim,rgba(255,255,255,.25));margin-top:-6px}
      .sanvic-vibe-grid{display:grid;grid-template-columns:1fr;gap:9px;max-height:min(46vh,360px);overflow-y:auto;padding:2px 2px 4px;margin:0 -2px;overscroll-behavior:contain}
      .sanvic-vibe-grid::-webkit-scrollbar{width:2px}.sanvic-vibe-grid::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:4px}
      .sanvic-vibe-option{width:100%;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(255,255,255,.045);color:var(--white-soft,rgba(255,255,255,.9));font-family:var(--font-body,-apple-system,sans-serif);font-size:.88rem;font-weight:300;line-height:1.25;text-align:left;padding:13px 14px;cursor:pointer;transition:all .24s cubic-bezier(.16,1,.3,1);display:flex;align-items:center;gap:9px;-webkit-tap-highlight-color:transparent}
      .sanvic-vibe-option:active{transform:scale(.985)}
      .sanvic-vibe-option.selected{border-color:rgba(224,122,95,.52);background:rgba(224,122,95,.13);box-shadow:0 0 0 1px rgba(224,122,95,.08) inset,0 8px 24px rgba(224,122,95,.08)}
      .sanvic-vibe-option.disabled{opacity:.38}
      .sanvic-entry-smile{font-family:var(--font-display,Georgia,serif);font-size:4rem;line-height:1;color:var(--limestone,#c4a882);opacity:.75;margin-bottom:-10px}
      .sanvic-entry-note{font-size:.72rem;font-weight:300;line-height:1.5;color:var(--white-dim,rgba(255,255,255,.25))}
      @media (min-width:700px){.sanvic-vibe-grid{grid-template-columns:1fr 1fr}.sanvic-entry-card{width:min(92%,620px)}.sanvic-entry-title{font-size:3rem}.sanvic-entry-sub{max-width:420px}}
    `;
    document.head.appendChild(style);
  }

  function injectEntryMarkup(){
    if(document.getElementById('sanvicEntryFlow')) return;
    const overlay = document.createElement('div');
    overlay.className = 'sanvic-entry-flow';
    overlay.id = 'sanvicEntryFlow';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML = `
      <div class="sanvic-entry-backdrop"></div>
      <section class="sanvic-entry-card" role="dialog" aria-modal="true" aria-labelledby="sanvicEntryTitle">
        <div class="sanvic-entry-inner" id="sanvicEntryContent"></div>
      </section>`;
    document.body.appendChild(overlay);
  }

  function render(){
    const wrap = document.getElementById('sanvicEntryContent');
    if(!wrap) return;

    if(state.step === 1){
      wrap.innerHTML = `
        <div class="sanvic-entry-kicker">SANVIC</div>
        <h1 class="sanvic-entry-title" id="sanvicEntryTitle">How should we call you?</h1>
        <p class="sanvic-entry-sub">Just a nickname.<br>No account. No email. No drama.</p>
        <input id="sanvicEntryNickname" class="sanvic-entry-input" maxlength="32" autocomplete="off" placeholder="Marco" value="${esc(state.nickname)}">
        <div class="sanvic-entry-actions">
          <button class="sanvic-entry-primary" id="sanvicEntryContinue">Continue</button>
          <button class="sanvic-entry-secondary" id="sanvicEntrySkip">Skip</button>
        </div>`;
      const input = document.getElementById('sanvicEntryNickname');
      input.addEventListener('input', () => { state.nickname = input.value; });
      input.addEventListener('keydown', (event) => { if(event.key === 'Enter') next(); });
      document.getElementById('sanvicEntryContinue').addEventListener('click', next);
      document.getElementById('sanvicEntrySkip').addEventListener('click', () => { state.nickname = ''; state.step = 2; render(); });
      setTimeout(() => input.focus({ preventScroll:true }), 60);
      return;
    }

    if(state.step === 2){
      const count = state.vibes.length;
      wrap.innerHTML = `
        <div class="sanvic-entry-kicker">Your San Vicente mood</div>
        <h1 class="sanvic-entry-title" id="sanvicEntryTitle">Tomorrow at 3 PM, where do you see yourself?</h1>
        <p class="sanvic-entry-sub">Choose up to 4.</p>
        <div class="sanvic-entry-count">${count}/${MAX_VIBES} chosen</div>
        <div class="sanvic-vibe-grid">
          ${VIBES.map((v, index) => {
            const selected = state.vibes.includes(v.label);
            const disabled = !selected && count >= MAX_VIBES;
            return `<button type="button" class="sanvic-vibe-option ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}" data-index="${index}">${v.label}</button>`;
          }).join('')}
        </div>
        <div class="sanvic-entry-actions">
          <button class="sanvic-entry-primary" id="sanvicEntryContinue">Continue</button>
        </div>`;
      document.querySelectorAll('.sanvic-vibe-option').forEach((button) => {
        button.addEventListener('click', () => toggleVibe(Number(button.dataset.index)));
      });
      document.getElementById('sanvicEntryContinue').addEventListener('click', next);
      return;
    }

    const nickname = state.nickname.trim() || 'Traveler';
    wrap.innerHTML = `
      <div class="sanvic-entry-kicker">The map is open</div>
      <div class="sanvic-entry-smile">:)</div>
      <h1 class="sanvic-entry-title" id="sanvicEntryTitle">${esc(nickname)}, welcome to San Vicente :)</h1>
      <p class="sanvic-entry-sub">The map is open.<br>The day is still unwritten.</p>
      <p class="sanvic-entry-note">A few things are already happening today.</p>
      <div class="sanvic-entry-actions">
        <button class="sanvic-entry-primary" id="sanvicEntryEnter">Enter San Vicente</button>
      </div>`;
    document.getElementById('sanvicEntryEnter').addEventListener('click', complete);
  }

  function next(){
    if(state.step === 1){
      const input = document.getElementById('sanvicEntryNickname');
      state.nickname = (input ? input.value : '').trim();
      state.step = 2;
    } else if(state.step === 2){
      state.step = 3;
    }
    render();
  }

  function toggleVibe(index){
    const vibe = VIBES[index];
    if(!vibe) return;
    const currentIndex = state.vibes.indexOf(vibe.label);
    if(currentIndex >= 0){
      state.vibes.splice(currentIndex, 1);
    } else if(state.vibes.length < MAX_VIBES){
      state.vibes.push(vibe.label);
    }
    render();
  }

  function applyProfileToInterface(profile){
    if(!profile) profile = getProfile();
    if(!profile) return;
    document.body.dataset.sanvicVibes = (profile.vibeTags || []).join(' ');
    const nameInput = document.getElementById('pulseComposeName');
    if(nameInput && profile.nickname && !nameInput.value) nameInput.value = profile.nickname;
  }

  function unlockMainInterface(){
    document.body.classList.remove('sanvic-entry-lock');
    document.getElementById('bottomDock')?.classList.add('visible');
    document.getElementById('talaOrbWrap')?.classList.remove('hidden');
    applyProfileToInterface();
  }

  function complete(){
    const profile = {
      nickname: state.nickname.trim(),
      vibes: state.vibes.slice(),
      vibeTags: selectedTags(),
      enteredAt: new Date().toISOString()
    };
    localStorage.setItem(ENTRY_KEY, JSON.stringify(profile));
    applyProfileToInterface(profile);

    const overlay = document.getElementById('sanvicEntryFlow');
    if(!overlay){ unlockMainInterface(); return; }
    overlay.classList.add('closing');
    overlay.setAttribute('aria-hidden','true');
    setTimeout(() => {
      overlay.classList.remove('active','closing');
      unlockMainInterface();
    }, 520);
  }

  injectEntryStyles();

  if(shouldShowEntry()){
    document.body.classList.add('sanvic-entry-lock');
  } else {
    setTimeout(() => applyProfileToInterface(), 0);
    return;
  }

  injectEntryMarkup();

  window.addEventListener('load', () => {
    setTimeout(() => {
      render();
      const overlay = document.getElementById('sanvicEntryFlow');
      if(overlay){
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden','false');
      }
    }, 2600);
  });
})();
