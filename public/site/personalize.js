// ═══════════════════════════════════════════════════════
// SANVIC Soft Personalization
// Reads the first-entry vibe context and quietly adapts language.
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

    const searchInputs = document.querySelectorAll('input[type="search"], .search-input, #searchInput, #talaInput');
    searchInputs.forEach(function(input){
      if(input && input.placeholder){
        input.placeholder = searchPlaceholder(tags);
      }
    });

    document.body.dataset.sanvicVibes = tags.join(' ');
    if(name) document.body.dataset.sanvicNickname = name;

    const talaIntro = document.querySelector('#talaMessages .tala-msg, #talaMessages .msg, .tala-message');
    if(talaIntro && !talaIntro.dataset.softPersonalized){
      talaIntro.innerHTML = talaOpener(entry);
      talaIntro.dataset.softPersonalized = 'true';
    }
  }

  window.addEventListener('load', function(){
    setTimeout(apply, 3200);
    setTimeout(apply, 5200);
  });
  document.addEventListener('click', function(){ setTimeout(apply, 180); });
  window.addEventListener('storage', apply);
})();
