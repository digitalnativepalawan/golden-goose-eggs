// SANVIC mobile map/nav cleanup
// Keeps footer Tala as the single primary Tala entry and cleans up map controls/pins.
(function(){
  function addStyles(){
    if(document.getElementById('sanvicMapPinNoPulseCss')) return;
    const s = document.createElement('style');
    s.id = 'sanvicMapPinNoPulseCss';
    s.textContent = `
      .splash-tagline{color:rgba(255,255,255,.72)!important;text-shadow:0 2px 12px rgba(0,0,0,.55)!important;font-weight:400!important;}
      .splash-footer{color:rgba(255,255,255,.72)!important;text-shadow:0 2px 12px rgba(0,0,0,.6)!important;font-weight:600!important;opacity:1!important;}
      .leaflet-control-zoom{display:none!important;visibility:hidden!important;pointer-events:none!important;}
      #talaOrbWrap,.tala-orb-wrap{display:none!important;visibility:hidden!important;pointer-events:none!important;}
      .mk-wrap{width:28px!important;height:28px!important;filter:drop-shadow(0 3px 7px rgba(0,0,0,.55))!important;animation:none!important;}
      .mk-wrap *{animation:none!important;transition:none!important;}
      .mk-ring,.mk-glow{display:none!important;visibility:hidden!important;opacity:0!important;}
      .mk-dot{width:13px!important;height:13px!important;border:0!important;box-shadow:0 2px 7px rgba(0,0,0,.55),0 0 8px currentColor!important;}
      .leaflet-marker-icon{overflow:visible!important;}

      @media(max-width:767px){
        .splash-tagline{font-size:.98rem!important;line-height:1.75!important;color:rgba(255,255,255,.76)!important;}
        .splash-footer{font-size:.72rem!important;color:rgba(255,255,255,.76)!important;letter-spacing:.38em!important;opacity:1!important;}
        .bottom-dock{bottom:calc(12px + var(--safe-bottom))!important;width:min(calc(100vw - 42px),430px)!important;padding:6px 7px!important;gap:1px!important;background:rgba(4,12,30,.74)!important;border-color:rgba(255,255,255,.08)!important;box-shadow:0 12px 34px rgba(0,0,0,.34)!important;}
        .dock-item{flex:1!important;width:auto!important;height:48px!important;border-radius:18px!important;gap:2px!important;color:rgba(255,255,255,.72)!important;background:transparent!important;}
        .dock-item svg{width:22px!important;height:22px!important;stroke:rgba(255,255,255,.84)!important;stroke-width:1.85!important;filter:drop-shadow(0 1px 3px rgba(0,0,0,.5));}
        .dock-item span{font-size:.58rem!important;letter-spacing:.01em!important;color:rgba(255,255,255,.62)!important;}
        .dock-item.active{color:rgba(255,255,255,.96)!important;background:rgba(255,255,255,.055)!important;}
        .dock-item.active span{color:rgba(255,255,255,.9)!important;}
        .dock-item.active::after{bottom:3px!important;width:4px!important;height:4px!important;box-shadow:0 0 8px rgba(20,184,166,.38)!important;}
        .dock-item.active svg{stroke:rgba(255,255,255,.98)!important;filter:drop-shadow(0 0 10px rgba(20,184,166,.32));}
        .dock-item[data-tab="tala"]{transform:none!important;}
        .dock-item[data-tab="tala"] svg{width:22px!important;height:22px!important;stroke-width:1.85!important;}
        .dock-item[data-tab="tala"].active{background:rgba(255,255,255,.055)!important;box-shadow:none!important;}

        .dest-sheet.expanded .sanvic-dest-close{display:flex!important;}
        .sanvic-dest-close{position:fixed;top:calc(var(--safe-top) + 12px);right:14px;z-index:130;width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(4,12,30,.72);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);color:rgba(255,255,255,.92);align-items:center;justify-content:center;font-size:24px;line-height:1;box-shadow:0 8px 24px rgba(0,0,0,.32);}
      }
    `;
    document.head.appendChild(s);
  }

  function restoreTalaDockIcon(){
    const btn = document.querySelector('.dock-item[data-tab="tala"]');
    if(!btn || btn.dataset.talaIconFixed === 'reference') return;
    const svg = btn.querySelector('svg');
    if(!svg) return;
    svg.outerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>';
    btn.dataset.talaIconFixed = 'reference';
  }

  function ensureDestinationClose(){
    const sheet = document.getElementById('destSheet');
    if(!sheet || document.getElementById('sanvicDestClose')) return;
    const b = document.createElement('button');
    b.id = 'sanvicDestClose';
    b.className = 'sanvic-dest-close';
    b.type = 'button';
    b.setAttribute('aria-label','Back to map');
    b.textContent = '×';
    b.style.display = 'none';
    b.onclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      if(typeof closeDestSheet === 'function') closeDestSheet();
    };
    sheet.appendChild(b);
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
      restoreTalaDockIcon();
      ensureDestinationClose();
      applyMapOpening();
      if(tries > 80) clearInterval(timer);
    }, 150);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();
