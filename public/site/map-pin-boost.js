// SANVIC map pin cleanup
// Visual-only: removes radar/pulsing halos, opens to the full municipality, and keeps pins visible.
(function(){
  const VIEW_DONE = '__sanvicMunicipalityMapViewDone';

  function injectPinStyles(){
    if(document.getElementById('sanvicMapPinNoPulseCss')) return;
    const s = document.createElement('style');
    s.id = 'sanvicMapPinNoPulseCss';
    s.textContent = `
      .mk-wrap{width:28px!important;height:28px!important;filter:drop-shadow(0 3px 7px rgba(0,0,0,.55))!important;animation:none!important;}
      .mk-wrap *{animation:none!important;transition:none!important;}
      .mk-ring,.mk-glow{display:none!important;visibility:hidden!important;opacity:0!important;width:0!important;height:0!important;border:0!important;box-shadow:none!important;background:none!important;}
      .mk-dot{width:13px!important;height:13px!important;border:2px solid rgba(255,255,255,.98)!important;box-shadow:0 2px 7px rgba(0,0,0,.65)!important;}
      .leaflet-marker-icon{overflow:visible!important;}
    `;
    document.head.appendChild(s);
  }

  function stripHalos(){
    document.querySelectorAll('.mk-ring,.mk-glow').forEach(el => el.remove());
    document.querySelectorAll('.mk-wrap').forEach(el => { el.style.animation = 'none'; });
  }

  function showPinsAtWideView(){
    try{
      if(typeof allMarkers === 'undefined' || !Array.isArray(allMarkers) || !allMarkers.length) return false;
      if(typeof activeMarkerSet !== 'undefined') activeMarkerSet = allMarkers;
      if(typeof pinVisibilityOverride !== 'undefined') pinVisibilityOverride = true;
      if(typeof applyPinVisibility === 'function') applyPinVisibility();
      stripHalos();
      return true;
    }catch(e){ return false; }
  }

  function setMunicipalityMapView(){
    try{
      if(window[VIEW_DONE]) return true;
      if(typeof map === 'undefined' || !map || typeof map.setView !== 'function') return false;
      window[VIEW_DONE] = true;
      map.setView([10.50, 119.20], 11, { animate:false });
      showPinsAtWideView();
      return true;
    }catch(e){ return false; }
  }

  function boot(){
    injectPinStyles();
    stripHalos();

    const obs = new MutationObserver(stripHalos);
    obs.observe(document.body, { childList:true, subtree:true });

    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      stripHalos();
      const viewSet = setMunicipalityMapView();
      const pinsShown = showPinsAtWideView();
      if((viewSet && pinsShown && tries > 6) || tries > 100) clearInterval(timer);
    }, 150);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();
