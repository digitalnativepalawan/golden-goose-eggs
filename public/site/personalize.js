// SANVIC Soft Personalization
// Reads the entry vibe and quietly adapts language + first map nudges.
(function(){
  const KEY = 'sanvic_entry_v1';

  function getEntry(){ try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch(e){ return null; } }
  function esc(v){ return String(v||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function has(tags, group){ return Array.isArray(tags) && tags.some(t => group.includes(t)); }
  function greeting(){ const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; }

  function mood(tags){
    if(has(tags, ['social','pulse','local','island'])) return { line:'A few people are already moving around today.', search:'Island hopping, videoke, people nearby...', nudge:'Pulse is warm today.', layer:'pulse', pulse:'island' };
    if(has(tags, ['quiet','private','slow','wellness'])) return { line:'Quiet beaches and slower corners are close by.', search:'Quiet beaches, hammocks, slow mornings...', nudge:'Look for calm spots.', layer:'discover', discover:'beaches' };
    if(has(tags, ['food','market','recovery'])) return { line:'Fresh plates, market stops, and beach snacks are close by.', search:'Seafood, burgers, markets, coffee...', nudge:'Food is a good first stop.', layer:'discover', discover:'culture' };
    if(has(tags, ['explore','hidden','routes','surf','adventure'])) return { line:'Scooter roads, hidden places, and wild edges are calling.', search:'Waterfalls, scooter routes, hidden beaches...', nudge:'Explore is open.', layer:'discover', discover:'nature' };
    if(has(tags, ['photo','viewpoints','sunset'])) return { line:'The light should be worth chasing today.', search:'Viewpoints, sunsets, photo spots...', nudge:'Watch the light.', layer:'discover', discover:'nature' };
    if(has(tags, ['boat','curated'])) return { line:'Private boats and quiet water are worth checking today.', search:'Private boats, islands, quiet water...', nudge:'Start by the water.', layer:'discover', discover:'islands' };
    return { line:'The map is open. The day is still unwritten.', search:'Ask TALA or search San Vicente...', nudge:'Start anywhere.', layer:'discover', discover:'all' };
  }

  function talaLine(entry, m){
    const name = entry && entry.nickname ? String(entry.nickname).trim() : '';
    const prefix = name ? greeting() + ' ' + esc(name) + '.' : greeting() + '.';
    return prefix + ' ' + m.line;
  }

  function setHero(entry, m){
    const name = entry.nickname ? String(entry.nickname).trim() : '';
    const title = document.getElementById('heroHeadline');
    const sub = document.getElementById('heroSubtitle');
    if(title && name){ title.innerHTML = greeting() + ', ' + esc(name) + '.'; }
    if(sub){ sub.textContent = m.line; }
  }

  function setSearch(m){
    ['heroInput','talaInput','searchInput'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.placeholder = m.search;
    });
    document.querySelectorAll('input[type="search"], .search-input').forEach(el => {
      if(el) el.placeholder = m.search;
    });
  }

  function setTala(entry, m){
    const first = document.querySelector('#talaChat .tala-msg.bot:first-child, #talaMessages .tala-msg.bot:first-child, .tala-message.bot:first-child');
    if(first && !first.dataset.vibeTouched){
      first.innerHTML = talaLine(entry, m);
      first.dataset.vibeTouched = 'true';
    }
  }

  function cardScore(card, tags){
    const name = (card.querySelector('.discover-card-name')?.textContent || '').toLowerCase();
    const meta = (card.querySelector('.discover-card-meta')?.textContent || '').toLowerCase();
    const text = name + ' ' + meta;
    let score = 0;
    if(has(tags, ['social','pulse','local','island'])){
      if(/port barton|island|poblacion|german|inaladelan/.test(text)) score += 30;
      if(/beach|culture/.test(text)) score += 8;
    }
    if(has(tags, ['quiet','private','slow','wellness'])){
      if(/boayan|inaladelan|long beach|pamuayan|german/.test(text)) score += 28;
      if(/island|beach|nature/.test(text)) score += 10;
      if(/poblacion/.test(text)) score -= 12;
    }
    if(has(tags, ['food','market','recovery'])){
      if(/poblacion|port barton/.test(text)) score += 26;
      if(/culture|beach/.test(text)) score += 8;
    }
    if(has(tags, ['explore','hidden','routes','surf','adventure'])){
      if(/pamuayan|bato|boayan|alimanguan|port barton/.test(text)) score += 30;
      if(/nature|island/.test(text)) score += 10;
    }
    if(has(tags, ['photo','viewpoints','sunset'])){
      if(/bato|long beach|boayan|inaladelan/.test(text)) score += 32;
      if(/beach|nature|island/.test(text)) score += 8;
    }
    if(has(tags, ['boat','curated'])){
      if(/boayan|inaladelan|german|port barton/.test(text)) score += 32;
      if(/island|beach/.test(text)) score += 8;
    }
    return score;
  }

  function orderDiscover(tags){
    const list = document.getElementById('discoverList');
    if(!list || !Array.isArray(tags) || !tags.length) return;
    const cards = Array.from(list.querySelectorAll('.discover-card'));
    if(cards.length < 2) return;
    cards
      .map((card, index) => ({ card, index, score: cardScore(card, tags) }))
      .sort((a,b) => (b.score - a.score) || (a.index - b.index))
      .forEach(item => list.appendChild(item.card));
  }

  function setActiveDock(tabName){
    document.querySelectorAll('.dock-item').forEach(d => d.classList.toggle('active', d.dataset.tab === tabName));
  }

  function openFirstLayer(m, tags){
    if(sessionStorage.getItem('sanvic_entry_first_layer_opened') === '1') return;
    sessionStorage.setItem('sanvic_entry_first_layer_opened', '1');

    setTimeout(() => {
      try{
        if(m.layer === 'pulse' && typeof window.openPulsePanel === 'function'){
          window.closeAllPanels && window.closeAllPanels();
          window.openPulsePanel();
          setActiveDock('pulse');
          if(m.pulse && typeof window.selectPulseCategory === 'function') window.selectPulseCategory(m.pulse);
          return;
        }

        if(typeof window.openDiscoverPanel === 'function'){
          window.closeAllPanels && window.closeAllPanels();
          window.openDiscoverPanel();
          setActiveDock('discover');
          if(m.discover && typeof window.selectDiscoverCategory === 'function') window.selectDiscoverCategory(m.discover);
          setTimeout(() => orderDiscover(tags), 120);
        }
      } catch(err){
        console.warn('[SANVIC] Entry first-layer nudge skipped:', err);
      }
    }, 650);
  }

  function setTabHint(tags, m){
    document.body.dataset.sanvicEntryNudge = m.nudge;
    const discover = document.querySelector('.dock-item[data-tab="discover"]');
    const pulse = document.querySelector('.dock-item[data-tab="pulse"]');
    if(discover) discover.title = m.nudge;
    if(pulse && has(tags, ['social','pulse','local','island'])) pulse.title = 'See what is happening now.';
  }

  function injectStyles(){
    if(document.getElementById('sanvicPersonalizeStyles')) return;
    const s = document.createElement('style');
    s.id = 'sanvicPersonalizeStyles';
    s.textContent = '.dock-item.vibe-ready{box-shadow:0 0 0 1px rgba(196,168,130,.35),0 0 28px rgba(196,168,130,.16)!important}.dock-item.vibe-ready .dock-icon{transform:translateY(-1px) scale(1.04)}';
    document.head.appendChild(s);
  }

  function apply(options){
    const entry = getEntry();
    if(!entry) return;
    const tags = Array.isArray(entry.vibeTags) ? entry.vibeTags : [];
    const m = mood(tags);
    document.body.dataset.sanvicVibes = tags.join(' ');
    if(entry.nickname) document.body.dataset.sanvicNickname = entry.nickname;
    injectStyles();
    setHero(entry, m);
    setSearch(m);
    setTala(entry, m);
    orderDiscover(tags);
    setTabHint(tags, m);
    if(options && options.openLayer) openFirstLayer(m, tags);
  }

  function schedule(){ setTimeout(() => apply({openLayer:true}), 80); setTimeout(() => apply({openLayer:true}), 600); setTimeout(() => apply({openLayer:false}), 1600); }
  window.addEventListener('load', () => { setTimeout(() => apply({openLayer:false}), 3200); setTimeout(() => apply({openLayer:false}), 5200); });
  window.addEventListener('sanvic:entry-complete', schedule);
  document.addEventListener('click', () => apply({openLayer:false}));
  window.addEventListener('storage', () => apply({openLayer:false}));
})();
