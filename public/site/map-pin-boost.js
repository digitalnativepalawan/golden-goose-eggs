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
        .dock-item{flex:1!important;width:auto!important;height:48px!important;border-radius:18px!important;gap:2px!important;color:rgba(255,255,255,.46)!important;background:transparent!important;}
        .dock-item svg{width:21px!important;height:21px!important;}
        .dock-item span{font-size:.58rem!important;letter-spacing:.01em!important;}
        .dock-item.active{color:rgba(255,255,255,.92)!important;background:transparent!important;}
        .dock-item.active::after{bottom:3px!important;width:4px!important;height:4px!important;box-shadow:0 0 8px rgba(20,184,166,.38)!important;}
        .dock-item.active svg{filter:drop-shadow(0 0 10px rgba(20,184,166,.32));}
        .dock-item[data-tab="tala"]{transform:translateY(-3px);}
        .dock-item[data-tab="tala"] svg{width:23px!important;height:23px!important;}
        .dock-item[data-tab="tala"].active{background:rgba(20,184,166,.12)!important;box-shadow:inset 0 0 0 1px rgba(20,184,166,.18),0 8px 18px rgba(0,0,0,.14)!important;}
      }
    `;
    document.head.appendChild(s);
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
      applyMapOpening();
      if(tries > 80) clearInterval(timer);
    }, 150);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();
