// SANVIC map pin visibility boost
// Keeps default map useful: location pins visible at the opening zoom, with clearer markers.
(function(){
  function injectPinStyles(){
    if(document.getElementById('sanvicMapPinBoostCss')) return;
    const s = document.createElement('style');
    s.id = 'sanvicMapPinBoostCss';
    s.textContent = `
      .mk-wrap{width:44px!important;height:44px!important;filter:drop-shadow(0 8px 18px rgba(0,0,0,.42));}
      .mk-ring{border-width:2.5px!important;opacity:.55!important;animation:mkp 2.4s ease-in-out infinite!important;}
      .mk-dot{width:13px!important;height:13px!important;border:2px solid rgba(255,255,255,.92)!important;box-shadow:0 0 0 3px rgba(2,14,38,.55),0 0 18px currentColor!important;}
      .mk-glow{inset:-9px!important;opacity:.22!important;}
      .leaflet-marker-icon{overflow:visible!important;}
    `;
    document.head.appendChild(s);
  }

  function showDefaultPins(){
    try{
      if(typeof mapReady === 'undefined' || !mapReady) return false;
      if(typeof allMarkers === 'undefined' || !Array.isArray(allMarkers) || !allMarkers.length) return false;
      if(typeof activeMarkerSet !== 'undefined') activeMarkerSet = allMarkers;
      if(typeof pinVisibilityOverride !== 'undefined') pinVisibilityOverride = true;
      if(typeof applyPinVisibility === 'function') applyPinVisibility();
      return true;
    }catch(e){ return false; }
  }

  function wrapMapDock(){
    try{
      if(typeof dockNav !== 'function' || dockNav.__sanvicPinBoostWrapped) return;
      const realDockNav = dockNav;
      dockNav = function(tab){
        realDockNav.apply(this, arguments);
        if(tab === 'map') setTimeout(showDefaultPins, 300);
      };
      dockNav.__sanvicPinBoostWrapped = true;
    }catch(e){}
  }

  function boot(){
    injectPinStyles();
    wrapMapDock();
    let tries = 0;
    const timer = setInterval(()=>{
      tries++;
      wrapMapDock();
      const shown = showDefaultPins();
      if(shown || tries > 80) clearInterval(timer);
    }, 150);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
  window.addEventListener('sanvic:entry-complete', () => setTimeout(showDefaultPins, 500));
})();
