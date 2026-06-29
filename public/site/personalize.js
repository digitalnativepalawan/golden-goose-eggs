// ═══════════════════════════════════════════════════════
// SANVIC Soft Personalization
// Reads the first-entry vibe context and quietly adapts language + ordering.
// No AI wording. No recommendation wording. No profile language.
// ═══════════════════════════════════════════════════════
(function initSanvicSoftPersonalization(){
  const ENTRY_KEY = 'sanvic_entry_v1';

  function getEntry(){
    try { return JSON.parse(localStorage.getItem(ENTRY_KEY) || 'null'); }
    catch(err){ return null; }
  }

  function escapeHtml(value){
    return String(value || '').replace(/[&<>'"]/g, function(char){
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char];
    });
  }

  function greeting(){
    const hour = new Date().getHours();
    if(hour < 12) return 'Good morning';
    if(hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  function has(tags, group){
    return Array.isArray(tags) && tags.some(function(tag){ return group.includes(tag); });
  }

  function moodLine(tags){
    if(has(tags, ['social','pulse','local','island'])) return 'A few people are already moving around today.';
    if(has(tags, ['quiet','private','slow','wellness'])) return 'There are still quiet corners out there.';
    if(has(tags, ['food','market','recovery'])) return 'Fresh plates, market stops, and beach snacks are close by.';
    if(has(tags, ['explore','hidden','routes','surf','adventure'])) return 'Scooter roads, hidden places, and wild edges are calling.';
    if(has(tags, ['photo','viewpoints','sunset'])) return 'The light should be worth chasing today.';
    return 'The map is open. The day is still unwritten.';
  }

  function searchPlaceholder(tags){
    if(has(tags, ['social','pulse','local','island'])) return 'Search island hopping, videoke, people nearby...';
    if(has(tags, ['quiet','private','slow','wellness'])) return 'Search quiet beaches, hammocks, slow mornings...';
    if(has(tags, ['food','market','recovery'])) return 'Search seafood, burgers, markets, coffee...';
    if(has(tags, ['explore','hidden','routes','surf','adventure'])) return 'Search waterfalls, scooter routes, hidden beaches...';
    if(has(tags, ['photo','viewpoints','sunset'])) return 'Search viewpoints, sunsets, photo spots...';
    return 'Ask TALA or search San Vicente...';
  }

  function talaOpener(entry){
    const name = entry && entry.nickname ? String(entry.nickname).trim() : '';
    const tags = entry && entry.vibeTags ? entry.vibeTags : [];
    const prefix = name ? greeting() + ' ' + escapeHtml(name) + '.' : greeting() + '.';

    if(has(tags, ['social','pulse','local','island'])) return prefix + ' Looks like today has people in it.';
    if(has(tags, ['quiet','private','slow','wellness'])) return prefix + ' I know a few quiet corners.';
    if(has(tags, ['food','market','recovery'])) return prefix + ' Let’s find something good to eat.';
    if(has(tags, ['explore','hidden','routes','surf','adventure'])) return prefix + ' The road might be the plan today.';
    if(has(tags, ['photo','viewpoints','sunset'])) return prefix + ' The light is part of the map.';
    return prefix + ' Let’s see what San Vicente has for you today.';
  }

  function scoreDestination(destination, tags){
    if(!destination || !Array.isArray(tags)) return 0;
    const category = String(destination.category || '').toLowerCase();
    const name = String(destination.name || '').toLowerCase();
    const text = [destination.name, destination.description, destination.tip].filter(Boolean).join(' ').toLowerCase();
    let score = destination.featured ? 4 : 0;

    if(has(tags, ['food','market','recovery'])){
      if(category === 'culture') score += 7;
      if(/market|poblacion|food|fish|seafood|grill|eat|restaurant|carinderia/.test(text)) score += 12;
    }

    if(has(tags, ['explore','hidden','routes','surf','adventure'])){
      if(['nature','adventure','islands'].includes(category)) score += 8;
      if(/falls|waterfall|viewpoint|boayan|remote|hidden|scooter|trail|surf|alimanguan/.test(text)) score += 12;
    }

    if(has(tags, ['quiet','private','slow','wellness'])){
      if(['beaches','islands','nature'].includes(category)) score += 7;
      if(/quiet|calm|slow|peaceful|remote|hammock|cove|undeveloped|private|relaxed/.test(text)) score += 12;
      if(/poblacion|night|crowd/.test(text)) score -= 4;
    }

    if(has(tags, ['social','pulse','local','island'])){
      if(['beaches','islands','culture'].includes(category)) score += 6;
      if(/port barton|island hopping|boat|village|local|night|people|market|poblacion/.test(text)) score += 12;
    }

    if(has(tags, ['photo','viewpoints','sunset'])){
      if(['nature','beaches','islands'].includes(category)) score += 7;
      if(/sunset|viewpoint|bato|long beach|above|scenic|photo|light|coast/.test(text)) score += 14;
    }

    if(has(tags, ['private','curated','boat'])){
      if(['islands','beaches'].includes(category)) score += 8;
      if(/boat|private|island|boayan|inaladelan|remote|clear water/.test(text)) score += 14;
    }

    if(name.includes('long beach')) score += has(tags, ['sunset','photo','beach','drink']) ? 5 : 0;
    if(name.includes('port barton')) score += has(tags, ['social','island','food']) ? 5 : 0;
    if(name.includes('pamuayan')) score += has(tags, ['explore','nature','adventure']) ? 6 : 0;
    if(name.includes('bato')) score += has(tags, ['photo','viewpoints','sunset']) ? 8 : 0;

    return score;
  }

  function rankedDestinations(items, tags){
    if(!Array.isArray(items) || !Array.isArray(tags) || !tags.length) return items;
    return items.slice().sort(function(a,b){
      const diff = scoreDestination(b, tags) - scoreDestination(a, tags);
      if(diff !== 0) return diff;
      return String(a.name || '').localeCompare(String(b.name || ''));
    });
  }

  function applyDiscoverOrdering(){
    const entry = getEntry();
    const tags = entry && Array.isArray(entry.vibeTags) ? entry.vibeTags : [];
    const list = document.getElementById('discoverList');
    if(!list || !window.destinations || !Array.isArray(window.destinations) || !tags.length) return;

    const active = document.querySelector('.discover-cat.active');
    const cat = active && active.dataset ? active.dataset.cat || 'all' : 'all';
    let items = cat === 'all'
      ? window.destinations.filter(function(d){ return d.featured; })
      : window.destinations.filter(function(d){ return d.category === cat; });

    if(cat === 'all' && !items.length) items = window.destinations.slice();
    items = rankedDestinations(items, tags);

    if(!items.length) return;
    list.innerHTML = items.map(function(d){
      const label = window.catStyle && window.catStyle[d.category] ? window.catStyle[d.category].label : d.category;
      const travel = d.stats && d.stats.travel ? d.stats.travel : '';
      return '<button class="discover-card" onclick="openDestinationById(' + d.id + ')">' +
        '<img src="' + escapeHtml(d.image) + '" alt="' + escapeHtml(d.name) + '" onerror="this.style.opacity=0">' +
        '<div class="discover-card-body">' +
        '<div class="discover-card-name">' + escapeHtml(d.name) + '</div>' +
        '<div class="discover-card-meta"><span>' + escapeHtml(label) + '</span><span>•</span><span>' + escapeHtml(travel) + '</span></div>' +
        '</div></button>';
    }).join('');
  }

  function applyAroundOrdering(){
    const entry = getEntry();
    const tags = entry && Array.isArray(entry.vibeTags) ? entry.vibeTags : [];
    const list = document.getElementById('aroundList');
    if(!list || !tags.length) return;

    const cards = Array.from(list.querySelectorAll('.around-card'));
    if(cards.length < 2) return;
    cards.sort(function(a,b){
      return scoreAroundCard(b, tags) - scoreAroundCard(a, tags);
    }).forEach(function(card){ list.appendChild(card); });
  }

  function scoreAroundCard(card, tags){
    const text = card.textContent.toLowerCase();
    let score = 0;
    if(has(tags, ['food','market','recovery']) && /food|grill|fish|market|coffee|snack|carinderia|halo|eat|drink/.test(text)) score += 20;
    if(has(tags, ['quiet','private','slow','wellness']) && /stay|beachfront|cottage|massage|quiet|calm/.test(text)) score += 14;
    if(has(tags, ['social','pulse','local','island']) && /boat|island|tour|bar|videoke|local|market/.test(text)) score += 16;
    if(has(tags, ['explore','hidden','routes','surf','adventure']) && /rental|motorbike|dive|surf|trail|falls|boat/.test(text)) score += 16;
    if(has(tags, ['photo','viewpoints','sunset']) && /view|sunset|beach|boat|island/.test(text)) score += 10;
    return score;
  }

  function applyPulseDefault(){
    const entry = getEntry();
    const tags = entry && Array.isArray(entry.vibeTags) ? entry.vibeTags : [];
    if(!tags.length || typeof window.selectPulseCategory !== 'function') return;
    const panel = document.getElementById('pulsePanel');
    if(!panel || !panel.classList.contains('open')) return;

    const active = document.querySelector('.pulse-cat.active');
    if(active && active.dataset && active.dataset.cat !== 'all') return;

    let cat = null;
    if(has(tags, ['food','market','recovery'])) cat = 'food';
    else if(has(tags, ['social','pulse','local','island'])) cat = 'island';
    else if(has(tags, ['explore','hidden','routes','adventure'])) cat = 'hidden';
    else if(has(tags, ['surf'])) cat = 'surf';
    else if(has(tags, ['photo','viewpoints','sunset'])) cat = 'hidden';
    if(cat) window.selectPulseCategory(cat);
  }

  function apply(){
    const entry = getEntry();
    if(!entry) return;

    const name = entry.nickname ? String(entry.nickname).trim() : '';
    const tags = Array.isArray(entry.vibeTags) ? entry.vibeTags : [];

    const heroTitle = document.getElementById('heroHeadline');
    const heroSub = document.getElementById('heroSubtitle');
    if(heroTitle && name){
      heroTitle.innerHTML = greeting() + ' ' + escapeHtml(name) + '<br><em>welcome back.</em>';
    }
    if(heroSub){
      heroSub.textContent = moodLine(tags);
    }

    const searchInputs = document.querySelectorAll('input[type="search"], .search-input, #searchInput, #heroInput, #talaInput');
    searchInputs.forEach(function(input){
      if(input){ input.placeholder = searchPlaceholder(tags); }
    });

    document.body.dataset.sanvicVibes = tags.join(' ');
    if(name) document.body.dataset.sanvicNickname = name;

    const talaIntro = document.querySelector('#talaChat .tala-msg.bot:first-child, #talaMessages .tala-msg, #talaMessages .msg, .tala-message');
    if(talaIntro && !talaIntro.dataset.softPersonalized){
      talaIntro.innerHTML = talaOpener(entry);
      talaIntro.dataset.softPersonalized = 'true';
    }

    applyDiscoverOrdering();
    applyAroundOrdering();
    applyPulseDefault();
  }

  function scheduleApply(){
    setTimeout(apply, 120);
    setTimeout(apply, 700);
  }

  window.addEventListener('load', function(){
    setTimeout(apply, 3200);
    setTimeout(apply, 5200);
  });
  document.addEventListener('click', scheduleApply);
  window.addEventListener('storage', apply);
  window.addEventListener('sanvic:entry-complete', apply);
})();
