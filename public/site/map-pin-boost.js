// SANVIC map pin cleanup
// Visual-only: removes radar/pulsing halos from map location pins.
(function(){
  function injectPinStyles(){
    if(document.getElementById('sanvicMapPinNoPulseCss')) return;
    const s = document.createElement('style');
    s.id = 'sanvicMapPinNoPulseCss';
    s.textContent = `
      .mk-wrap{width:34px!important;height:34px!important;filter:drop-shadow(0 3px 8px rgba(0,0,0,.5));animation:none!important;}
      .mk-ring{display:none!important;animation:none!important;opacity:0!important;}
      .mk-glow{display:none!important;animation:none!important;opacity:0!important;}
      .mk-dot{width:12px!important;height:12px!important;border:2px solid rgba(255,255,255,.96)!important;box-shadow:0 2px 8px rgba(0,0,0,.55)!important;}
      .leaflet-marker-icon{overflow:visible!important;}
    `;
    document.head.appendChild(s);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectPinStyles, { once:true });
  else injectPinStyles();
})();
