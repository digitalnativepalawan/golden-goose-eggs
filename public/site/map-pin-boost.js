// SANVIC mobile map/nav cleanup
// Removes radar halos, opens to the full municipality, keeps pins visible, hides Leaflet zoom buttons,
// and makes footer Tala the single primary Tala entry on mobile.
(function(){
  function addStyles(){
    if(document.getElementById('sanvicMapPinNoPulseCss')) return;
    const s = document.createElement('style');
    s.id = 'sanvicMapPinNoPulseCss';
    s.textContent = `
      .leaflet-control-zoom{display:none!important;visibility:hidden!important;pointer-events:none!important;}
      .mk-wrap{width:28px!important;height:28px!important;filter:drop-shadow(0 3px 7px rgba(0,0,0,.55))!important;animation:none!important;}
      .mk-wrap *{animation:none!important;transition:none!important;}
      .mk-ring,.mk-glow{display:none!important;visibility:hidden!important;opacity:0!important;}
      .mk-dot{width:13px!important;height:13px!important;border:0!important;box-shadow:0 2px 7px rgba(0,0,0,.55),0 0 8px currentColor!important;}
      .leaflet-marker-icon{overflow:visible!important;}

      @media(max-width:767px){
        #talaOrbWrap,.tala-orb-wrap{display:none!important;visibility:hidden!important;pointer-events:none!important;}
        .bottom-dock{bottom:calc(12px + var(--safe-bottom))!important;width:min(calc(100vw - 42px),430px)!important;padding:6px 7px!important;gap:1px!important;background:rgba(4,12,30,.74)!important;border-color:rgba(255,255,255,.08)!important;box-shadow:0 12px 34px rgba(0,0,0,.34)!important;}
        .dock-item{flex:1!important;width:auto!important;height:48px!important;border-radius:18px!important;gap:2px!important;color:rgba(255,255,255,.72)!important;background:transparent!important;}
        .dock-item svg{width:22px!important;height:22px!important;stroke:rgba(255,255,255,.84)!important;stroke-width:1.9!important;filter:drop-shadow(0 1px 3px rgba(0,0,0,.5));}
        .dock-item span{font-size:.58rem!important;letter-spacing:.01em!important;color:rgba(255,255,255,.62)!important;}
        .dock-item.active{color:rgba(255,255,255,.96)!important;background:transparent!important;}
        .dock-item.active span{color:rgba(255,255,255,.9)!important;}
        .dock-item.active::after{bottom:3px!important;width:4px!important;height:4px!important;box-shadow:0 0 8px rgba(20,184,166,.38)!important;}
        .dock-item.active svg{stroke:rgba(255,255,255,.98)!important;filter:drop-shadow(0 0 10px rgba(20,184,166,.32));}
        .dock-item[data-tab="tala"]{transform:translateY(-3px);}
        .dock-item[data-tab="tala"] svg{width:24px!important;height:24px!important;stroke-width:1.9!important;}
        .dock-item[data-tab="tala"].active{background:rgba(20,184,166,.12)!important;box-shadow:inset 0 0 0 1px rgba(20,184,166,.18),0 8px 18px rgba(0,0,0,.14)!important;}
      }
    `;
    document.head.appendChild(s);
  }

  function replaceTalaDockIcon(){
    const btn = document.querySelector('.dock-item[data-tab="tala"]');
    if(!btn || btn.dataset.talaIconFixed === '1') return;
    const svg = btn.querySelector('svg');
    if(!svg) return;
    svg.outerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5l1.7 4.4 4.4 1.7-4.4 1.7L12 15.7l-1.7-4.4-4.4-1.7 4.4-1.7L12 3.5z"/><path d="M18.5 14.5l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1z"/><path d="M5.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/></svg>';
    btn.dataset.talaIconFixed = '1';
  }

  function applyMapOpening(){
    try{
      if(typeof map !== 'undefined' && map && !window.__sanvicMunicipalityViewDone){
        window.__sanvicMunicipalityViewDone = true;
        map.setView([10.50, 119.20], 10, { animate:false });
      }
      if(typeof allMarkers !== 'undefined' && Array.isArray(allMarkers) && allMarkers.length){
        if(typeof activeMarkerSet !== 'undefined') activeMarkerSet = allMarkers;
        if(typeof pinVisibilityOverride !== 'undefined') pinVisibilityOverride = true;
        if(typeof applyPinVisibility === 'function') applyPinVisibility();
      }
    }catch(e){}
  }

  function boot(){
    addStyles();
    let tries = 0;
    const timer = setInterval(function(){
      tries += 1;
      replaceTalaDockIcon();
      applyMapOpening();
      if(tries > 80) clearInterval(timer);
    }, 150);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();
