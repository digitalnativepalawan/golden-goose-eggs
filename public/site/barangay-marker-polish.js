// SANVIC barangay marker polish
// Visual-only refinement for the municipality-level barangay dots and labels.
(function(){
  function addStyles(){
    if(document.getElementById('sanvicBarangayMarkerPolishCss')) return;
    const style = document.createElement('style');
    style.id = 'sanvicBarangayMarkerPolishCss';
    style.textContent = `
      .sv-brgy-pin{gap:5px!important;transform:translate(-6px,-7px)!important;}
      .sv-brgy-dot{width:10px!important;height:10px!important;border-width:1.5px!important;box-shadow:0 0 0 3px rgba(29,155,240,.12),0 0 10px rgba(29,155,240,.5),0 2px 8px rgba(0,0,0,.42)!important;}
      .sv-brgy-label{font-size:.58rem!important;letter-spacing:.045em!important;padding:3px 7px!important;line-height:1.1!important;background:rgba(4,12,30,.36)!important;border-color:rgba(29,155,240,.16)!important;}
      .sv-brgy-pin.label-hidden .sv-brgy-label{display:none!important;}
      @media(min-width:768px) and (max-width:1024px){
        .sv-brgy-dot{width:9px!important;height:9px!important;box-shadow:0 0 0 3px rgba(29,155,240,.11),0 0 9px rgba(29,155,240,.46),0 2px 7px rgba(0,0,0,.4)!important;}
        .sv-brgy-label{font-size:.56rem!important;padding:3px 7px!important;letter-spacing:.04em!important;}
      }
      @media(max-width:767px){
        .sv-brgy-pin{gap:4px!important;transform:translate(-5px,-6px)!important;}
        .sv-brgy-dot{width:8px!important;height:8px!important;border-width:1.25px!important;box-shadow:0 0 0 2px rgba(29,155,240,.11),0 0 8px rgba(29,155,240,.42),0 2px 6px rgba(0,0,0,.38)!important;}
        .sv-brgy-label{font-size:.52rem!important;padding:2px 6px!important;letter-spacing:.035em!important;background:rgba(4,12,30,.3)!important;}
      }
    `;
    document.head.appendChild(style);
  }

  function overlap(a,b,pad){
    return !(a.right + pad < b.left || a.left - pad > b.right || a.bottom + pad < b.top || a.top - pad > b.bottom);
  }

  function layoutLabels(){
    try{
      const pins = Array.from(document.querySelectorAll('.sv-brgy-pin'));
      if(!pins.length) return;
      pins.forEach(pin => pin.classList.remove('label-hidden'));

      const w = window.innerWidth || 1024;
      const phone = w <= 767;
      const tight = w <= 430;
      const visible = [];
      const z = (typeof map !== 'undefined' && map && map.getZoom) ? map.getZoom() : 10;

      pins.forEach((pin, index) => {
        const label = pin.querySelector('.sv-brgy-label');
        if(!label) return;
        if((phone && z <= 9) || (tight && z <= 10 && index % 2 === 1)){
          pin.classList.add('label-hidden');
          return;
        }
        const rect = label.getBoundingClientRect();
        const pad = phone ? 8 : 6;
        if(visible.some(existing => overlap(rect, existing, pad))){
          pin.classList.add('label-hidden');
        } else {
          visible.push(rect);
        }
      });
    }catch(e){}
  }

  function boot(){
    addStyles();
    let tries = 0;
    const timer = setInterval(function(){
      tries += 1;
      layoutLabels();
      if(tries > 80) clearInterval(timer);
    }, 150);
    window.addEventListener('resize', () => setTimeout(layoutLabels, 120), { passive:true });
    document.addEventListener('click', () => setTimeout(layoutLabels, 120), true);
    try{
      if(typeof map !== 'undefined' && map && map.on){
        map.on('zoomend moveend resize', function(){ setTimeout(layoutLabels, 80); });
      }
    }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();
