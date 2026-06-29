// SANVIC map pin cleanup
// Removes radar halos, opens to the full municipality, and keeps pins visible.
(function(){
  function addStyles(){
    if(document.getElementById('sanvicMapPinNoPulseCss')) return;
    const s = document.createElement('style');
    s.id = 'sanvicMapPinNoPulseCss';
    s.textContent = `
      .mk-wrap{width:28px!important;height:28px!important;filter:drop-shadow(0 3px 7px rgba(0,0,0,.55))!important;animation:none!important;}
      .mk-wrap *{animation:none!important;transition:none!important;}
      .mk-ring,.mk-glow{display:none!important;visibility:hidden!important;opacity:0!important;}
      .mk-dot{width:13px!important;height:13px!important;border:2px solid rgba(255,255,255,.98)!important;box-shadow:0 2px 7px rgba(0,0,0,.65)!important;}
      .leaflet-marker-icon{overflow:visible!important;}
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
