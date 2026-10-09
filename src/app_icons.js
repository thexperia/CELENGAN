(function(){
'use strict';
var $ = function(id){ return document.getElementById(id); };

/* ================= ICONS ================= */
var P = {
  back:'<path d="M15 5l-7 7 7 7"/>', chev:'<path d="M9 5l7 7-7 7"/>', close:'<path d="M6 6l12 12M18 6L6 18"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  home:'<path d="M4 11l8-7 8 7v8.5a1.5 1.5 0 01-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 014 19.5z"/>',
  book:'<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5z"/><path d="M4 20.5A2.5 2.5 0 016.5 18H20v3H6.5"/>',
  bars:'<path d="M6 20V11M12 20V4M18 20v-7"/>', user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  star:'<path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6L12 16.8 6.6 19.6l1.2-6-4.5-4.2 6.1-.8z"/>',
  flame:'<path d="M12 3c1 4 5 5.5 5 10a5 5 0 01-10 0c0-2.5 1.5-3.5 2-5.5 1 1 1.5 2 1.5 3 1.5-1.5 2-4.5 1.5-7.5z"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>', lock:'<rect x="4" y="10" width="16" height="10" rx="3"/><path d="M8 10V7.5a4 4 0 018 0V10"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M2.5 12h3M18.5 12h3M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
  calc:'<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h3.5"/>',
  dict:'<path d="M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-6a2 2 0 00-2 2v14a2 2 0 012-2h6z"/>',
  target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
  bookmark:'<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>',
  logout:'<path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 17l-5-5 5-5M5 12h11"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/>',
  swap:'<path d="M7 7h12l-3-3M17 17H5l3 3"/>', trash:'<path d="M5 7h14M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', flip:'<path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  shield:'<path d="M12 3l7.5 3v6c0 4.5-3.2 8-7.5 9-4.3-1-7.5-4.5-7.5-9V6z"/>',
  alert:'<path d="M12 4L2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17.2v.3"/>',
  chart:'<path d="M4 19h16M6 15l4-4 3 3 5-6"/>', percent:'<path d="M6 18L18 6"/><circle cx="7" cy="7" r="2.2"/><circle cx="17" cy="17" r="2.2"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><circle cx="17" cy="9" r="2.8"/><path d="M17 14.5c2.4 0 4 1.6 4.8 4.5"/>',
  download:'<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  medal:'<circle cx="12" cy="14.5" r="6"/><path d="M8.5 3.5l2 5M15.5 3.5l-2 5"/><path d="M12 12l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z"/>',
  bank:'<path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  backspace:'<path d="M9 5h11v14H9l-6-7z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/>',
  basket:'<path d="M3.5 9.5h17l-1.8 9.2a2 2 0 01-2 1.6H7.3a2 2 0 01-2-1.6z"/><path d="M8 9.5L11 4M16 9.5L13 4"/>',
  wallet:'<path d="M4 7.5A2.5 2.5 0 016.5 5H18v3"/><rect x="4" y="8" width="16" height="11" rx="2.5"/><circle cx="16" cy="13.5" r="1.2"/>',
  down:'<path d="M12 5v14M6 13l6 6 6-6"/>', up:'<path d="M12 19V5M6 11l6-6 6 6"/>', note:'<rect x="4" y="6" width="16" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M7 9.5h.01M17 14.5h.01"/>',
  eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  refresh:'<path d="M20 12a8 8 0 11-2.3-5.7M20 4v5h-5"/>', minus:'<path d="M5 12h14"/>', excl:'<path d="M12 6v8M12 18v.5"/>'
};
function ic(n, c, s, fill, sw){
  s = s || 20;
  return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="'+(fill||'none')+'" stroke="'+(c||'currentColor')+
    '" stroke-width="'+(sw||2.2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:0 0 auto">'+P[n]+'</svg>';
}

