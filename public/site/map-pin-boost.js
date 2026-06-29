// SANVIC map pin glow
// Visual-only marker styling. Does not touch onboarding, storage, map state, panels, or navigation.
(function(){
  function injectPinStyles(){
    if(document.getElementById('sanvicMapPinGlowCss')) return;
    const s = document.createElement('style');
    s.id = 'sanvicMapPinGlowCss';
    s.textContent = `
      .mk-wrap{width:44px!important;height:44px!important;filter:drop-shadow(0 8px 18px rgba(0,0,0,.55));}
      .mk-ring{border-width:2.5px!important;opacity:.72!important;transform:scale(1.12);animation:mkp 2.2s ease-in-out infinite!important;}
      .mk-dot{width:14px!important;height:14px!important;border:2px solid rgba(255,255,255,.95)!important;box-shadow:0 0 0 4px rgba(2,14,38,.72),0 0 22px rgba(255,255,255,.65)!important;}
      .mk-glow{inset:-14px!important;opacity:.5!important;filter:blur(1px);}
      .leaflet-marker-icon{overflow:visible!important;}
    `;
    document.head.appendChild(s);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectPinStyles, { once:true });
  else injectPinStyles();
})();
