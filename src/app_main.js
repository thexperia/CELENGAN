P.msg = '<path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9a1.5 1.5 0 01-1.5 1.5H9l-5 4z"/>';
P.cards = '<rect x="3.5" y="6" width="12" height="15" rx="2.5"/><path d="M8 3h10.5A2 2 0 0120.5 5v12"/>';
P.cal = '<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4"/>';
P.left = '<path d="M19 12H5M12 19l-7-7 7-7"/>'; P.right = '<path d="M5 12h14M12 5l7 7-7 7"/>';

/* ================= HELPERS ================= */
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function strip(s){ return String(s).replace(/<[^>]+>/g,''); }
function mmss(s){ s = Math.max(0, Math.round(s||0)); var h = Math.floor(s/3600); var m = Math.floor((s%3600)/60); return (h ? h+':'+('0'+m).slice(-2) : m) + ':' + ('0'+(s%60)).slice(-2); }
var MON = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
function fmtDate(iso, withTime){ if(!iso) return '-'; var d = new Date(iso); if(isNaN(d)) return String(iso);
  var s = d.getDate()+' '+MON[d.getMonth()]+' '+d.getFullYear(); return withTime ? s+', '+('0'+d.getHours()).slice(-2)+'.'+('0'+d.getMinutes()).slice(-2) : s; }
function fmtDay(ymd){ if(!ymd) return '-'; var p = String(ymd).split('-'); return (+p[2])+' '+MON[+p[1]-1]+' '+p[0]; }
function initials(n){ var p = String(n).replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean); return ((p[0]||'')[0]||'') + ((p[1]||'')[0]||''); }
function greet(){ var h = new Date().getHours(); return h<11?'Selamat pagi,':h<15?'Selamat siang,':h<18?'Selamat sore,':'Selamat malam,'; }
function firstName(n){ var w = String(n).split(' ').filter(function(x){ return !/\.$/.test(x) && x.charAt(0)!=='('; }); return w[0] || n; }
function T(id){ for(var i=0;i<TOPICS.length;i++) if(TOPICS[i].id===id) return TOPICS[i]; return TOPICS[0]; }
function basketOf(k){ for(var i=0;i<BASKETS.length;i++) if(BASKETS[i].k===k) return BASKETS[i]; return {name:k}; }
function fmtNum(v){ return String(v).replace('.',','); }
var LS = {
  get: function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set: function(k, v){ try { localStorage.setItem(k, v); } catch(e){} },
  del: function(k){ try { localStorage.removeItem(k); } catch(e){} }
};
var SS = {
  get: function(k){ try { return sessionStorage.getItem(k); } catch(e){ return null; } },
  set: function(k, v){ try { sessionStorage.setItem(k, v); } catch(e){} },
  del: function(k){ try { sessionStorage.removeItem(k); } catch(e){} }
};

/* ================= STATE ================= */
var S = {
  token:null, user:null, roster:[], cfg:{n1:8, n2:5, buka:{1:true,2:true}, topik_sembunyi:[], topik_kategori:{}},
  hasil:{1:null, 2:null}, loginCat:'Organik', loginQ:'', sel:'',
  tf:'all', tq:'', gq:'', gcat:'all', pq:'', pf:'Semua', curTopic:'dasar', prog:{}
};
var ADM = null, ATOK = null, QZ = null, RES = null, MOD = null, REVI = 0, pin = [], undoFn = null;

function catOf(t){ return (S.cfg.topik_kategori || {})[t.id] || t.cat; }
function vis(){ var h = S.cfg.topik_sembunyi || []; return TOPICS.filter(function(t){ return h.indexOf(t.id) < 0; }); }
function doneLv(){ return (S.hasil[1]?1:0) + (S.hasil[2]?1:0); }
function lvName(n){ return 'Kuis Level '+n; }
function lvDesc(n){ return n===1 ? 'Soal campuran: keranjang, pilihan ganda, benar atau salah, hitung cepat' : 'Pilih keputusan terbaik dari studi kasus sehari-hari'; }
function lvCount(n){ return n===1 ? S.cfg.n1 : S.cfg.n2; }

/* progres belajar per orang (hanya penanda di perangkat ini) */
function progKey(){ return 'celengan_prog_' + (S.user ? S.user.nama : '-'); }
function loadProg(){ try { S.prog = JSON.parse(LS.get(progKey()) || '{}'); } catch(e){ S.prog = {}; } }
function saveProg(){ LS.set(progKey(), JSON.stringify(S.prog)); }
function modeDone(tid, m){ return !!(S.prog[tid] && S.prog[tid][m]); }
function markMode(tid, m){ S.prog[tid] = S.prog[tid] || {}; S.prog[tid][m] = 1; S.prog._last = tid; saveProg(); }
function lastTopic(){ var l = S.prog._last; return l && vis().some(function(t){ return t.id===l; }) ? T(l) : null; }

/* periode kuis */
function periodInfo(){
  var c = S.cfg; if(!c.periode_mulai || !c.periode_selesai) return null;
  var m = new Date(c.periode_mulai+'T00:00:00+07:00').getTime(), s = new Date(c.periode_selesai+'T00:00:00+07:00').getTime() + 864e5, now = Date.now();
  return {mulai:c.periode_mulai, selesai:c.periode_selesai, belum: now < m, lewat: now >= s, sisa: Math.max(0, Math.ceil((s-now)/864e5))};
}
function lvInfo(n){
  if(n===3) return {can:false, note:'Belum dirilis. Bank soalnya sedang disiapkan.'};
  if(S.hasil[n]) return {can:false, done:true, note:'Sudah dikumpulkan '+fmtDate(S.hasil[n].submitted_at)+'. Ketuk untuk melihat pembahasan.'};
  if(!S.cfg.buka[n]) return {can:false, note:'Level ini sedang ditutup sementara oleh admin.'};
  var p = periodInfo();
  if(p && p.belum) return {can:false, note:'Periode kuis dimulai '+fmtDay(p.mulai)+'.'};
  if(p && p.lewat) return {can:false, note:'Periode kuis sudah berakhir pada '+fmtDay(p.selesai)+'.'};
  return {can:true, note:'Belum dikerjakan. Ada contoh soal sebelum mulai. Hanya 1 kali kesempatan dan skor langsung final.'};
}

/* ================= PESAN ERROR ================= */
var MSG = {
  JARINGAN:'Tidak bisa terhubung ke server. Cek koneksi internet lalu coba lagi.',
  SESI_HABIS:'Sesi kamu sudah berakhir. Silakan masuk lagi.',
  NAMA_TIDAK_ADA:'Nama tidak terdaftar. Hubungi admin.',
  PIN_SALAH:'PIN salah.', TERKUNCI:'Terlalu banyak percobaan salah. Coba lagi beberapa menit lagi.',
  SUDAH_DIKERJAKAN:'Kuis level ini sudah kamu kerjakan. Kesempatan hanya 1 kali.',
  LEVEL_DITUTUP:'Level ini sedang ditutup oleh admin.', PERIODE_BELUM:'Periode kuis belum dimulai.', PERIODE_SELESAI:'Periode kuis sudah berakhir.',
  SOAL_KOSONG:'Bank soal untuk level ini masih kosong.', KUIS_BELUM_DIMULAI:'Sesi kuis tidak ditemukan. Silakan mulai ulang kuisnya.',
  BELUM_SEMUA_DIJAWAB:'Masih ada soal yang belum dijawab.', BELUM_DIKERJAKAN:'Level ini belum kamu kerjakan.',
  PIN_LAMA_SALAH:'PIN lama tidak sesuai.', PIN_TIDAK_VALID:'PIN baru harus 4 angka.', TERLALU_SERING:'Kamu sudah mengirim banyak saran. Coba lagi nanti.',
  SALAH:'Username atau password salah.', PASSWORD_LAMA_SALAH:'Password lama tidak sesuai.', PASSWORD_TERLALU_PENDEK:'Password baru minimal 8 karakter.',
  NAMA_TERLALU_PENDEK:'Nama minimal 3 huruf.', SERVER:'Terjadi kendala di server. Coba lagi sebentar lagi.'
};
function msg(e){ var c = e && e.code || 'SERVER'; var m = MSG[c] || MSG.SERVER;
  if(c==='TERKUNCI' && e.data && e.data.menit) m = 'Terlalu banyak percobaan salah. Coba lagi dalam '+e.data.menit+' menit.';
  if(c==='PIN_SALAH' && e.data && e.data.sisa != null) m = 'PIN salah. Sisa '+e.data.sisa+' kali percobaan.';
  return m; }
function fail(e){
  busy(false);
  if(e && e.code==='SESI_HABIS'){ if(ATOK){ ATOK = null; ADM = null; SS.del('celengan_admin'); } else clearSession(); stack = ['splash']; show('splash', false); }
  toast(msg(e));
}

/* ================= NAV ================= */
var stack = ['splash'];
function show(id, mode){
  var el = $(id); if(!el) return;
  if(R[id]) el.innerHTML = R[id]();
  Array.prototype.forEach.call(document.querySelectorAll('#phone .screen'), function(s){ s.classList.remove('on'); if(s !== el) s.innerHTML = ''; });
  el.classList.add('on');
  var b = el.querySelector('.body'); if(b) b.scrollTop = 0;
  if(mode === 'replace'){ stack[stack.length-1] = id; }
  else if(mode !== false && stack[stack.length-1] !== id) stack.push(id);
  if(AFTER[id]) AFTER[id]();
  closeSheet();
}
function back(){ if(stack.length > 1){ stack.pop(); show(stack[stack.length-1], false); } }
function root(id){ stack = id==='beranda' ? ['beranda'] : ['beranda', id]; show(id, false); }
function refresh(){ var cur = stack[stack.length-1]; var el=$(cur); if(!el || !R[cur]) return; var b=el.querySelector('.body'); var y=b?b.scrollTop:0; el.innerHTML = R[cur](); if(AFTER[cur]) AFTER[cur](); b=el.querySelector('.body'); if(b) b.scrollTop=y; }

/* ================= SHEET / TOAST / BUSY ================= */
function openSheet(html, dark){
  var m = $('modal'), s = $('sheet');
  s.className = 'sheet' + (dark ? ' dk' : '');
  s.innerHTML = '<div class="grab"></div>' + html;
  m.classList.add('on');
}
function closeSheet(){ $('modal').classList.remove('on'); }
var toastT = null;
function toast(m, undo){
  var t = $('toast'); undoFn = undo || null;
  t.innerHTML = '<span>'+m+'</span>' + (undo ? '<button data-act="undo">Batalkan</button>' : '');
  t.classList.add('on'); clearTimeout(toastT);
  toastT = setTimeout(function(){ t.classList.remove('on'); undoFn = null; }, undo ? 4200 : 3000);
}
var busyT = null;
function busy(on){ clearTimeout(busyT); if(on) busyT = setTimeout(function(){ $('busy').classList.add('on'); }, 220); else $('busy').classList.remove('on'); }
function call(p, done){ busy(true); return p.then(function(v){ busy(false); if(done) done(v); return v; }, function(e){ fail(e); throw e; }); }
function quiet(p){ p.catch(function(){}); }

/* ================= SHARED PARTS ================= */
function tabbar(active){
  var tabs = [['beranda','home','Beranda'],['belajar-topik','book','Belajar'],['quiz-level','bars','Kuis'],['profil','user','Profil']];
  return '<nav class="tabbar">' + tabs.map(function(t){
    var on = t[0]===active;
    return '<button class="tab'+(on?' on':'')+'" data-act="tab" data-arg="'+t[0]+'">'+ic(t[1], on?'#6C4BF6':'#6B6A85', 22)+'<span>'+t[2]+'</span></button>';
  }).join('') + '</nav>';
}
function topbar(title, sub, right, backAct){
  return '<div class="topbar"><button class="icon-btn" '+(backAct?'data-act="'+backAct+'"':'data-back')+' aria-label="Kembali">'+ic('back','#1C1B33',20)+'</button>'+
    '<div class="grow"><h2 style="font-size:18px">'+title+'</h2>'+(sub?'<div style="font-size:11.5px;color:var(--muted)">'+sub+'</div>':'')+'</div>'+(right||'')+'</div>';
}
function catChipTxt(t){ return catOf(t)==='wajib' ? 'UTAMA' : 'TAMBAHAN'; }
function thumb(img, w, h){ return '<span class="thumb" style="width:'+w+'px;height:'+h+'px"><img src="'+IMG[img]+'" alt=""></span>'; }
function avatar(txt, size, bg, col, r){ return '<span class="avatar" style="width:'+size+'px;height:'+size+'px;border-radius:'+(r||Math.round(size/3))+'px;background:'+bg+';color:'+col+';font-size:'+Math.round(size*0.36)+'px">'+txt+'</span>'; }
function saranCard(konteks, label){
  return '<div class="saran-card"><span class="sq" style="width:46px;height:46px;border-radius:15px;background:var(--purple-l)">'+ic('msg','#6C4BF6',22)+'</span>'+
    '<span class="grow"><b style="font-size:13.5px;display:block">'+(label||'Punya saran untuk CELENGAN?')+'</b><span style="display:block;margin-top:2px;font-size:11.5px;color:var(--muted);line-height:1.5">Masukanmu dibaca langsung oleh admin.</span></span>'+
    '<button class="chip" style="background:var(--purple);color:#fff;padding:9px 13px;font-size:12px" data-act="saran" data-arg="'+konteks+'">Kirim Saran</button></div>';
}

/* ================= RENDERERS ================= */
var R = {}, AFTER = {};

R['splash'] = function(){
  return '<div class="blob" style="top:-90px;right:-70px;width:250px;height:250px;background:#8A6FFF"></div>'+
  '<div class="blob" style="bottom:-120px;left:-90px;width:300px;height:300px;background:#5637DE"></div>'+
  '<div style="position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:22px">'+
    '<div class="hero-img" style="width:250px;height:156px;background:#fff"><img src="'+IMG.pig+'" alt="Celengan dengan koin berjatuhan" style="object-fit:contain;padding:10px"></div>'+
    '<div><div style="font-family:Inter,sans-serif;font-size:44px;font-weight:700;color:#fff;letter-spacing:1px">CELENGAN</div>'+
    '<div style="margin-top:8px;font-size:14px;font-weight:600;color:#E4DCFF;line-height:1.55">Cerdas Literasi Keuangan<br>KPwBI Daerah Istimewa Yogyakarta</div></div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">'+
      '<span class="chip" style="background:#5637DE;color:#E4DCFF">'+TOPICS.length+' topik</span><span class="chip" style="background:#5637DE;color:#E4DCFF">2 level kuis</span><span class="chip" style="background:#5637DE;color:#E4DCFF">'+GLOSS.length+' istilah</span></div>'+
    (API.REMOTE ? '' : '<span class="demo-chip">MODE DEMO &middot; DATA HANYA DI BROWSER INI</span>')+
  '</div>'+
  '<div style="position:relative;width:100%;margin-top:40px">'+
    '<button class="btn btn-y" data-act="toLogin">Masuk sebagai Peserta</button>'+
    '<button style="display:block;width:100%;margin-top:16px;padding:6px;font-size:12px;font-weight:600;color:#C9BCFF;text-decoration:underline;text-underline-offset:3px" data-go="login-admin">Masuk sebagai Admin</button></div>';
};

R['login-admin'] = function(){
  return '<div class="topbar"><button class="icon-btn" data-back aria-label="Kembali">'+ic('back','#1C1B33')+'</button><span class="grow"></span></div>'+
  '<div class="body pad pb" style="padding-top:26px;display:flex;flex-direction:column">'+
  '<span class="sq" style="background:var(--ink)">'+ic('gear','#fff',26)+'</span>'+
  '<h1 style="font-size:26px;margin-top:16px">Masuk sebagai Admin</h1>'+
  '<p style="margin:8px 0 0;font-size:13px;color:var(--muted);line-height:1.6">Khusus pengelola CELENGAN untuk mengatur kuis, materi, dan peserta.</p>'+
  '<label class="flabel" for="au">Username</label><input class="inp" id="au" type="text" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder="Username admin">'+
  '<label class="flabel" for="ap">Password</label><input class="inp" id="ap" type="password" autocomplete="current-password" placeholder="Password">'+
  '<div class="err" id="aerr"></div>'+
  (API.REMOTE ? '' : '<div style="margin-top:6px;padding:11px 13px;border-radius:14px;background:var(--yellow-l);font-size:11.5px;color:var(--yellow-t);line-height:1.55">Mode demo: username <b>admin</b>, password <b>demo1234</b>. Di versi deploy, akun admin diatur di database.</div>')+
  '<div class="sp" style="min-height:16px"></div><button class="btn btn-dark" data-act="adminLogin">Masuk</button></div>';
};
AFTER['login-admin'] = function(){
  ['au','ap'].forEach(function(id){ var el = $(id); if(el) el.addEventListener('keydown', function(e){ if(e.key==='Enter') A.adminLogin(); }); });
};

R['login-kategori'] = function(){
  function pick(cat, desc, o){
    return '<button class="pick'+(o?' o':'')+'" data-act="pickCat" data-arg="'+cat+'">'+
      '<span class="sq" style="background:var(--'+(o?'orange':'purple')+'-l)">'+ic(o?'users':'bank', o?'#C2410C':'#6C4BF6', 26)+'</span>'+
      '<span class="grow"><span style="display:block;font-family:Inter,sans-serif;font-size:20px;font-weight:600">'+cat+'</span>'+
      '<span style="display:block;margin-top:3px;font-size:12.5px;color:var(--muted)">'+desc+'</span></span>'+ic('chev', o?'#C2410C':'#6C4BF6', 22)+'</button>';
  }
  return '<div class="topbar"><button class="icon-btn" data-back aria-label="Kembali">'+ic('back','#1C1B33')+'</button><div class="steps"><i class="on"></i><i></i><i></i></div><span style="font-size:13px;font-weight:600;color:var(--muted)">1/3</span></div>'+
  '<div class="body pad pb" style="padding-top:28px"><h1 style="font-size:28px;line-height:1.25">Halo! Kamu masuk<br>kategori yang mana?</h1>'+
  '<p style="margin:10px 0 0;font-size:13.5px;color:var(--muted);line-height:1.6">Kategori dipakai untuk mengelompokkan laporan partisipasi. Semua materi tetap bisa diakses.</p>'+
  '<div class="col" style="gap:14px;margin-top:26px">'+pick('Organik','Pegawai tetap Bank Indonesia')+pick('Non-Organik','PKWT, tenaga alih daya, dan magang',1)+'</div>'+
  '<div class="row" style="margin-top:24px;padding:15px;border-radius:17px;background:#fff;border:1px dashed #D9CFBF;align-items:flex-start;gap:11px">'+ic('info','#6B6A85',19)+
  '<span style="font-size:12px;color:var(--muted);line-height:1.6">Pastikan kategorimu benar. Kategori tidak bisa diubah setelah masuk.</span></div></div>';
};

function nameMatches(){
  var q = S.loginQ.trim().toLowerCase(); if(!q) return [];
  var l = S.roster.filter(function(r){ return r.kategori===S.loginCat && r.nama.toLowerCase().indexOf(q)>=0; });
  l.sort(function(a,b){ var x = a.nama.toLowerCase().indexOf(q)===0 ? 0 : 1, y = b.nama.toLowerCase().indexOf(q)===0 ? 0 : 1; return x-y || a.nama.localeCompare(b.nama); });
  return l;
}
function nameDrop(){
  if(S.sel || !S.loginQ.trim()) return '';
  var l = nameMatches();
  if(!l.length) return '<div class="dd"><div class="dd-empty">Nama "'+esc(S.loginQ.trim())+'" tidak ditemukan di kategori '+S.loginCat+'.</div></div>';
  var q = S.loginQ.trim();
  return '<div class="dd" role="listbox">'+l.slice(0,6).map(function(r){
    var i = r.nama.toLowerCase().indexOf(q.toLowerCase());
    var hl = esc(r.nama.slice(0,i))+'<b>'+esc(r.nama.slice(i,i+q.length))+'</b>'+esc(r.nama.slice(i+q.length));
    return '<button class="dd-item" role="option" data-act="selName" data-arg="'+esc(r.nama)+'">'+avatar(initials(r.nama),32,'var(--purple-l)','var(--purple-d)',10)+'<span class="grow">'+hl+'</span></button>'; }).join('')+
    (l.length>6?'<div class="dd-more">'+(l.length-6)+' nama lain cocok. Ketik lebih lengkap.</div>':'')+'</div>';
}
function nameSelected(){
  if(!S.sel) return '<div style="margin-top:14px;padding:14px 15px;border-radius:17px;background:var(--sand);border:1px dashed #D9CFBF;font-size:12px;color:var(--muted);line-height:1.6">Ketik minimal satu huruf, lalu pilih namamu dari daftar yang muncul. Nama belum ada? Hubungi admin.</div>';
  return '<div class="name-row sel" style="margin-top:14px">'+avatar(initials(S.sel),44,'var(--purple)','#fff',15)+
    '<span class="grow"><b style="font-size:14.5px">'+esc(S.sel)+'</b><span style="display:block;margin-top:2px;font-size:11.5px;color:var(--muted)">Pegawai '+S.loginCat+'</span></span>'+
    '<span style="width:24px;height:24px;border-radius:50%;background:var(--purple);display:flex;align-items:center;justify-content:center">'+ic('check','#fff',15,null,3)+'</span></div>';
}
function paintNames(){ var d = $('namedd'), s = $('namesel'); if(d) d.innerHTML = nameDrop(); if(s) s.innerHTML = nameSelected(); }
R['login-nama'] = function(){
  var n = S.roster.filter(function(r){ return r.kategori===S.loginCat; }).length;
  return '<div class="topbar"><button class="icon-btn" data-back aria-label="Kembali">'+ic('back','#1C1B33')+'</button><div class="steps"><i class="on"></i><i class="on"></i><i></i></div><span style="font-size:13px;font-weight:600;color:var(--muted)">2/3</span></div>'+
  '<div class="body pad pb" style="padding-top:22px;display:flex;flex-direction:column"><h1 style="font-size:26px">Cari namamu</h1>'+
  '<div class="row" style="margin-top:8px;gap:8px"><span class="chip" style="background:var(--purple-l);color:var(--purple-d)">'+S.loginCat.toUpperCase()+'</span><span style="font-size:12.5px;color:var(--muted)">'+n+' pegawai terdaftar</span></div>'+
  '<div class="ddwrap" style="margin-top:16px"><div class="field">'+ic('search','#6B6A85',19)+'<input id="cari" data-in="nameSearch" type="text" value="'+esc(S.loginQ)+'" placeholder="Ketik namamu" autocomplete="off" aria-label="Cari nama"></div>'+
  '<div id="namedd">'+nameDrop()+'</div></div>'+
  '<div id="namesel">'+nameSelected()+'</div>'+
  '<div style="height:18px;flex:1"></div><button class="btn btn-p" data-act="toPin">Lanjut</button></div>';
};

R['login-pin'] = function(){
  return '<div class="topbar"><button class="icon-btn" data-back aria-label="Kembali">'+ic('back','#1C1B33')+'</button><div class="steps"><i class="on"></i><i class="on"></i><i class="on"></i></div><span style="font-size:13px;font-weight:600;color:var(--muted)">3/3</span></div>'+
  '<div class="body pad pb" style="padding-top:22px;display:flex;flex-direction:column"><div class="col" style="align-items:center;gap:10px">'+
  avatar(initials(S.sel),62,'var(--purple)','#fff',20)+'<h2 style="font-size:21px;text-align:center">'+esc(S.sel)+'</h2><span style="font-size:12.5px;color:var(--muted)">Pegawai '+S.loginCat+'</span></div>'+
  '<p style="margin:20px 0 0;text-align:center;font-size:13.5px;color:var(--muted)">Masukkan PIN 4 digit</p>'+
  '<div class="dots" style="margin-top:16px" id="pindots"><i></i><i></i><i></i><i></i></div><div class="err" id="pinerr"></div>'+
  '<div style="margin-top:4px;display:flex;justify-content:center"><span class="chip" style="background:var(--yellow-l);color:var(--yellow-t);padding:8px 14px;font-size:11.5px">'+ic('info','#8A4B00',15)+' PIN awal: 1234. Segera ganti setelah masuk.</span></div>'+
  '<div class="keys" style="margin-top:18px">'+[1,2,3,4,5,6,7,8,9].map(function(k){ return '<button data-act="key" data-arg="'+k+'">'+k+'</button>'; }).join('')+
  '<button class="fn" data-act="forgot" style="font-size:11px;font-family:inherit;font-weight:700;color:var(--muted)">Lupa?</button><button data-act="key" data-arg="0">0</button><button class="fn" data-act="key" data-arg="del" aria-label="Hapus">'+ic('backspace','#1C1B33',24)+'</button></div>'+
  '<div class="sp" style="min-height:16px"></div><button class="btn btn-p" data-act="pinSubmit">Masuk</button></div>';
};
AFTER['login-pin'] = function(){ pin = []; paintPin(); };
function paintPin(){ var d = $('pindots'); if(!d) return; for(var i=0;i<4;i++) d.children[i].classList.toggle('f', i < pin.length); }

/* ---------- Beranda ---------- */
R['beranda'] = function(){
  var lt = lastTopic(), first = vis().filter(function(t){ return catOf(t)==='wajib'; })[0] || vis()[0];
  var nt = lt || first;
  return '<div class="head-p"><div class="row">'+
    '<button class="avatar" style="width:46px;height:46px;background:var(--yellow);color:#4A2800;font-size:17px;border-radius:15px" data-act="tab" data-arg="profil" aria-label="Profil">'+initials(S.user.nama)+'</button>'+
    '<div class="grow"><div style="font-size:12.5px;color:#CFC3FF">'+greet()+'</div><div style="font-family:Inter,sans-serif;font-size:19px;font-weight:600">'+esc(firstName(S.user.nama))+'</div></div>'+
    (API.REMOTE ? '' : '<span class="demo-chip" style="font-size:9.5px">DEMO</span>')+'</div></div>'+
  '<div class="body pad" style="padding-top:18px">'+
    '<h2 style="font-size:18px">Mau ngapain hari ini?</h2>'+
    '<div class="col" style="gap:13px;margin-top:13px">'+
      '<button class="menu-card" style="background:var(--green);box-shadow:0 5px 0 var(--green-d)" data-act="tab" data-arg="belajar-topik"><span class="sq" style="background:var(--mint)">'+ic('book','#04372A',26)+'</span>'+
      '<span class="grow"><span style="display:block;font-family:Inter,sans-serif;font-size:21px;font-weight:600;color:#fff">Belajar</span><span style="display:block;margin-top:2px;font-size:12.5px;color:#C8F2E3">'+vis().length+' topik &middot; baca, mitos atau fakta, studi kasus</span></span>'+ic('chev','#fff',22)+'</button>'+
      '<button class="menu-card" style="background:var(--pink);box-shadow:0 5px 0 var(--pink-d)" data-act="tab" data-arg="quiz-level"><span class="sq" style="background:#FF7BAC">'+ic('bars','#fff',26)+'</span>'+
      '<span class="grow"><span style="display:block;font-family:Inter,sans-serif;font-size:21px;font-weight:600;color:#fff">Kuis</span><span style="display:block;margin-top:2px;font-size:12.5px;color:#FFD6E5">2 level &middot; '+doneLv()+'/2 dikerjakan</span></span>'+ic('chev','#fff',22)+'</button></div>'+
    '<div class="mgrid" style="margin-top:14px">'+
      '<button class="mini" data-go="kamus"><span class="ico" style="background:var(--green-l)">'+ic('dict','#047857',20)+'</span><b>Kamus Istilah</b><span class="s">'+GLOSS.length+' istilah per topik</span></button>'+
      '<button class="mini" data-act="tab" data-arg="profil"><span class="ico" style="background:var(--yellow-l)">'+ic('bars','#8A4B00',20)+'</span><b>Riwayat Kuis</b><span class="s">'+doneLv()+' dari 2 level selesai</span></button></div>'+
    '<div class="mini-wide" aria-disabled="true"><span class="ico" style="width:38px;height:38px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center">'+ic('calc','#9A98B0',20)+'</span>'+
      '<span class="grow"><b style="font-size:13px;color:var(--muted)">Alat Keuangan</b><span style="display:block;font-size:11px;color:var(--muted);margin-top:2px">Kalkulator keuangan sedang disiapkan</span></span><span class="soon-tag">SEGERA HADIR</span></div>'+
    '<div class="label" style="margin-top:20px">'+(lt?'LANJUTKAN':'MULAI DARI SINI')+'</div>'+
    '<button class="card row" style="margin-top:10px;padding:12px 13px;gap:13px;width:100%;text-align:left" data-act="openTopic" data-arg="'+nt.id+'">'+thumb(nt.img,62,48)+
      '<span class="grow"><b style="font-size:13.5px">'+nt.title+'</b><span style="display:block;margin-top:4px;font-size:11.5px;color:var(--muted)">'+(lt?'Buka lagi topik terakhirmu':'Materi utama yang paling dasar')+'</span></span>'+ic('chev','#6B6A85',20)+'</button>'+
    saranCard('beranda')+
    '<div style="height:20px"></div></div>'+tabbar('beranda');
};

/* ---------- Belajar ---------- */
function topicCard(t){
  var n = ['baca','mf','pilih'].filter(function(m){ return modeDone(t.id, m); }).length;
  return '<button class="topic'+(S.prog._last===t.id?' cur':'')+'" data-act="openTopic" data-arg="'+t.id+'"><span class="th"><img src="'+IMG[t.img]+'" alt="">'+
    '<span class="chip" style="position:absolute;top:7px;left:7px;padding:4px 9px;font-size:9px;background:'+(catOf(t)==='wajib'?'rgba(214,51,108,.92)':'rgba(108,75,246,.92)')+';color:#fff">'+catChipTxt(t)+'</span>'+
    (n?'<span style="position:absolute;top:7px;right:7px" class="tick">'+ic('check','#fff',13,null,3.2)+'</span>':'')+
    '</span><span class="tx"><h3>'+t.title+'</h3><span style="display:block;margin-top:5px;font-size:10.5px;font-weight:600;color:'+(n?'var(--green)':'var(--muted)')+'">'+(n?'Sudah dipelajari':'3 cara belajar')+'</span></span></button>';
}
function topicGrid(){
  var q = S.tq.toLowerCase();
  var list = vis().filter(function(t){ return (S.tf==='all' || catOf(t)===S.tf) && (!q || (t.title+' '+t.desc).toLowerCase().indexOf(q)>=0); });
  if(!list.length) return '<div class="empty" style="grid-column:1/-1">Tidak ada topik yang cocok. Coba kata kunci lain.</div>';
  return list.map(topicCard).join('');
}
R['belajar-topik'] = function(){
  var f = [['all','Semua'],['wajib','Utama'],['opsional','Tambahan']];
  return '<div class="topbar" style="padding-bottom:2px"><button class="icon-btn" data-act="tab" data-arg="beranda" aria-label="Kembali ke beranda">'+ic('back','#1C1B33',20)+'</button>'+
    '<div class="grow"><h2 style="font-size:22px">Belajar</h2><div style="font-size:11.5px;color:var(--muted)">'+vis().length+' topik materi keuangan</div></div>'+
    '<button class="icon-btn" data-go="kamus" aria-label="Kamus">'+ic('dict','#047857',19)+'</button></div>'+
  '<div class="body pad" style="padding-top:14px"><div class="field" style="height:46px">'+ic('search','#6B6A85',18)+'<input data-in="topicSearch" type="text" value="'+esc(S.tq)+'" placeholder="Cari topik, misalnya saham" aria-label="Cari topik"></div>'+
  '<div class="filters" style="margin-top:12px">'+f.map(function(x){ return '<button class="fchip'+(S.tf===x[0]?' on':'')+'" data-act="tfilter" data-arg="'+x[0]+'">'+x[1]+'</button>'; }).join('')+'</div>'+
  '<p style="margin:12px 0 0;font-size:11.5px;color:var(--muted);line-height:1.55">Materi utama menjadi sumber soal kuis. Semua topik boleh dipelajari dalam urutan apa pun.</p>'+
  '<div class="tgrid" style="margin-top:12px" id="tgrid">'+topicGrid()+'</div><div style="height:22px"></div></div>'+tabbar('belajar-topik');
};

function modeCard(t, m, ico, bg, col, title, sub, dur){
  var d = modeDone(t.id, m);
  return '<button class="mode'+(d?' done':'')+'" data-act="startMode" data-arg="'+m+'"><span class="mi" style="background:'+bg+'">'+ic(ico,col,23)+'</span>'+
    '<span class="grow"><b>'+title+'</b><span class="s">'+sub+'</span></span>'+(d?'<span class="tick">'+ic('check','#fff',13,null,3.2)+'</span>':'<span class="t">'+dur+'</span>')+'</button>';
}
R['belajar-materi'] = function(){
  var t = T(S.curTopic), M = MODUL[t.id];
  var nCards = t.sets.reduce(function(a,s){ return a + s.cards.length; }, 0);
  return '<div class="mhead"><div class="row"><button class="icon-btn gl" style="background:rgba(255,255,255,.18)" data-back aria-label="Kembali">'+ic('back','#fff')+'</button><span class="sp"></span>'+
    '<span class="chip" style="background:rgba(255,255,255,.18);color:#fff">'+catChipTxt(t)+'</span></div>'+
    '<div class="mimg"><img src="'+IMG[t.img]+'" alt=""></div></div>'+
  '<div class="body pad" style="padding-top:16px"><h1 style="font-size:24px">'+t.title+'</h1>'+
    '<p style="margin:10px 0 0;font-size:13px;color:var(--muted);line-height:1.65">'+t.desc+'</p>'+
    '<div class="label" style="margin-top:18px">PILIH CARA BELAJAR</div>'+
    '<p style="margin:5px 0 0;font-size:11.5px;color:var(--muted);line-height:1.55">Semua opsional dan tidak berurutan. Selesai satu cara, boleh langsung ke kuis.</p>'+
    '<div class="col" style="gap:10px;margin-top:11px">'+
      modeCard(t,'baca','doc','var(--green-l)','#047857','Baca Materi','Penjelasan lengkap, rumus, contoh, dan tips ('+nCards+' bagian)','&plusmn;'+readMin(t)+' mnt')+
      modeCard(t,'mf','cards','var(--pink-l)','#D6336C','Mitos atau Fakta',M.mf.length+' kartu, geser ke kiri atau kanan','&plusmn;1 mnt')+
      modeCard(t,'pilih','msg','var(--yellow-l)','#8A4B00','Kamu Pilih Apa?','1 situasi sehari-hari, pilih keputusanmu','&plusmn;1 mnt')+'</div>'+
    '<button class="rowbtn" style="margin-top:12px" data-act="tab" data-arg="quiz-level">'+ic('bars','#D6336C',20)+'<span class="grow"><b style="font-size:13px;display:block">Langsung ke Kuis</b><span style="font-size:11px;color:var(--muted)">Tidak wajib menyelesaikan materi dulu</span></span>'+ic('chev','#6B6A85',18)+'</button>'+
    '<div style="margin-top:14px;padding:14px 15px;border-radius:17px;background:var(--sand);border:1px solid #E5DCC9"><div class="row" style="gap:8px">'+ic('doc','#6B6A85',17)+'<span class="label" style="font-size:10.5px">SUMBER MATERI</span></div>'+
    '<p style="margin:8px 0 0;font-size:11px;color:var(--muted);line-height:1.7">'+t.src+'</p></div><div style="height:22px"></div></div>';
};

/* ---------- Modul: Baca ---------- */
function readMin(t){ var w = 0; t.sets.forEach(function(s){ s.cards.forEach(function(c){ w += strip([c.q,c.a,c.f||'',c.ex||'',c.tip||'',c.warn||'',(c.pts||[]).join(' ')].join(' ')).split(/\s+/).length; }); }); return Math.max(2, Math.round(w/180)); }
R['modul-baca'] = function(){
  var t = T(S.curTopic), M = MODUL[t.id];
  return topbar('Baca Materi', t.title)+
  '<div class="body pad pb" style="padding-top:14px"><div class="read">'+
    '<div style="border-radius:20px;overflow:hidden;background:#fff;border:1px solid var(--line)"><img src="'+IMG[t.img]+'" alt="" style="width:100%;height:130px;object-fit:contain;display:block;padding:8px 0"></div>'+
    '<h1 style="font-size:23px;margin-top:16px">'+t.title+'</h1><p style="font-size:14px">'+t.desc+'</p>'+
    '<div class="toc"><div class="label" style="font-size:10.5px">ISI MATERI &middot; &plusmn;'+readMin(t)+' MENIT</div>'+t.sets.map(function(s2,si){ return '<div class="toc-i"><b>'+(si+1)+'</b><span>'+s2.name+' <i>('+s2.cards.length+' bagian)</i></span></div>'; }).join('')+'</div>'+
    t.sets.map(function(s, si){
      return '<h2>'+(si+1)+'. '+s.name+'</h2>'+s.cards.map(function(c){
        return '<h3>'+strip(c.q)+'</h3><p>'+c.a+'</p>'+
          (c.pts?'<ul class="rpts">'+c.pts.map(function(x){ return '<li>'+x+'</li>'; }).join('')+'</ul>':'')+
          (c.f?'<div class="fx"><small>RUMUS</small>'+c.f+'</div>':'')+(c.ex?'<div class="ex"><small>CONTOH</small>'+c.ex+'</div>':'')+
          (c.tip?'<div class="rtip"><small>TIPS</small>'+c.tip+'</div>':'')+(c.warn?'<div class="rwarn"><small>HATI-HATI</small>'+c.warn+'</div>':'');
      }).join('');
    }).join('')+
    '<div class="keybox"><div class="label" style="color:var(--green)">POIN PENTING</div><ul>'+M.take.map(function(x,i){ return '<li><b>'+(i+1)+'</b><span>'+x+'</span></li>'; }).join('')+'</ul></div>'+
    '<p style="margin-top:14px;font-size:11px;color:var(--muted)">Sumber: '+t.src+'</p></div>'+
    '<div style="margin-top:16px"><button class="btn btn-g" data-act="doneBaca">Selesai Membaca</button></div></div>';
};

/* ---------- Modul: Mitos atau Fakta ---------- */
function modTop(label, col, i, n){
  return '<div class="mtop"><button class="icon-btn gl" data-act="exitMod" aria-label="Kembali ke topik">'+ic('back','#1C1B33')+'</button>'+
    '<span class="bar grow" style="height:8px;background:#F0DDE5"><i style="width:'+Math.round(i/n*100)+'%;background:'+col+'"></i></span>'+
    '<span style="font-size:12px;font-weight:700;color:var(--muted)">'+i+'/'+n+'</span></div>'+
    '<div style="padding:14px 22px 0"><div class="label" style="color:'+col+'">'+label+'</div><div style="font-size:12.5px;color:var(--muted);margin-top:3px">'+T(MOD.tid).title+'</div></div>';
}
R['modul-mf'] = function(){
  var L = MODUL[MOD.tid].mf, c = L[MOD.mi], next = L[MOD.mi+1];
  return modTop('MITOS ATAU FAKTA','var(--pink-d)',MOD.mi,L.length)+
  '<div class="deck" id="deck">'+(next?'<div class="mcard back2"><div class="q" style="opacity:.25">'+next.q+'</div></div>':'')+
  '<div class="mcard" id="mcard"><span class="stamp m" id="sm">MITOS</span><span class="stamp f" id="sf">FAKTA</span><div class="q">'+c.q+'</div></div></div>'+
  '<div class="mbtns" id="mbtns"><button class="mbtn m" data-act="mf" data-arg="m">'+ic('left','currentColor',18,null,2.6)+' Mitos</button><button class="mbtn f" data-act="mf" data-arg="f">Fakta '+ic('right','currentColor',18,null,2.6)+'</button></div>'+
  '<div class="swipehint" id="swh">Geser kartu ke kiri untuk Mitos, ke kanan untuk Fakta</div>';
};
AFTER['modul-mf'] = function(){
  var card = $('mcard'); if(!card) return;
  var x0 = null, dx = 0;
  card.addEventListener('pointerdown', function(e){ x0 = e.clientX; dx = 0; try { card.setPointerCapture(e.pointerId); } catch(x){} card.style.transition = 'none'; });
  card.addEventListener('pointermove', function(e){ if(x0===null) return; dx = e.clientX - x0; card.style.transform = 'translateX('+dx+'px) rotate('+(dx/18)+'deg)';
    $('sm').style.opacity = Math.min(1, Math.max(0, -dx/90)); $('sf').style.opacity = Math.min(1, Math.max(0, dx/90)); });
  function end(){ if(x0===null) return; x0 = null; card.style.transition = 'transform .25s';
    if(Math.abs(dx) > 90){ var a = dx>0?'f':'m'; card.style.transform = 'translateX('+(dx>0?500:-500)+'px) rotate('+(dx>0?20:-20)+'deg)'; setTimeout(function(){ answerMF(a); }, 180); }
    else { card.style.transform = ''; $('sm').style.opacity = 0; $('sf').style.opacity = 0; } }
  card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
};
function answerMF(a){
  var L = MODUL[MOD.tid].mf, c = L[MOD.mi], ok = a===c.a; MOD.mfAns[MOD.mi] = ok;
  var last = MOD.mi >= L.length-1;
  $('deck').innerHTML = '<div class="fb" style="background:'+(ok?'var(--green)':'var(--orange)')+'"><div class="v">'+(ok?'TEPAT!':'BELUM TEPAT')+'</div><h2>Ini '+(c.a==='m'?'Mitos':'Fakta')+'</h2><p>'+c.why+'</p>'+
    '<button class="btn" style="background:#fff;color:'+(ok?'#03583F':'#8A2C06')+'" data-act="nextMF">'+(last?'Selesai':'Kartu berikutnya')+'</button></div>';
  $('mbtns').style.visibility = 'hidden'; $('swh').style.visibility = 'hidden';
}

/* ---------- Modul: Kamu Pilih Apa ---------- */
R['modul-pilih'] = function(){
  var cs = MODUL[MOD.tid].cs, K = 'ABCD';
  var res = '';
  if(MOD.pick != null){
    var x = cs.opts[MOD.pick];
    res = '<div class="cres" style="background:'+(x.good?'var(--green)':'var(--orange)')+'"><div class="v">KAMU MEMILIH '+K[MOD.pick]+'</div><h3>'+x.h+'</h3><p>'+x.p+'</p></div>'+
      cs.opts.map(function(y, i){ if(i===MOD.pick) return ''; return '<div class="cres" style="background:#fff;color:var(--ink);border:1px dashed #D9CFBF"><div class="v" style="color:var(--muted)">KALAU MEMILIH '+K[i]+'</div><p style="margin-top:4px">'+y.p+'</p></div>'; }).join('');
  }
  return modTop('KAMU PILIH APA?','var(--purple-d)',MOD.pick==null?0:1,1)+
  '<div class="body pb"><div class="chat"><div class="chathead"><span class="av">'+esc(cs.from.charAt(0))+'</span><span><b style="font-size:14px;display:block">'+esc(cs.from)+'</b><span style="font-size:11px;color:var(--muted)">'+esc(cs.role)+'</span></span></div>'+
  cs.msgs.map(function(m,i){ return '<div class="bub">'+m+'<small>19.0'+(i+2)+'</small></div>'; }).join('')+'</div>'+
  '<div style="padding:16px 22px 0"><b style="font-size:16px">'+cs.ask+'</b>'+
  (MOD.pick==null
    ? '<div class="col" style="gap:10px;margin-top:12px">'+cs.opts.map(function(x,i){ return '<button class="copt" data-act="cpick" data-arg="'+i+'"><span class="k">'+K[i]+'</span><span>'+x.t+'</span></button>'; }).join('')+'</div>'
    : res+'<button class="btn btn-p" style="margin-top:16px" data-act="donePilih">Selesai</button>')+
  '</div></div>';
};

/* ---------- Modul: Selesai ---------- */
R['modul-selesai'] = function(){
  var t = T(MOD.tid), M = MODUL[t.id], m = MOD.mode;
  var title = m==='baca' ? 'Materi selesai dibaca!' : m==='mf' ? 'Mitos atau Fakta selesai!' : 'Studi kasus selesai!';
  var chip = m==='mf' ? '<span class="chip" style="margin-top:12px;background:var(--green-d);color:#fff">'+MOD.mfAns.filter(Boolean).length+'/'+M.mf.length+' tebakan tepat</span>' : '';
  var others = [['baca','Baca Materi'],['mf','Mitos atau Fakta'],['pilih','Kamu Pilih Apa?']].filter(function(x){ return x[0]!==m; });
  return '<div class="body pad pb" style="padding-top:36px;display:flex;flex-direction:column">'+
    '<div style="width:92px;height:92px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto;box-shadow:0 0 0 8px rgba(255,255,255,.18)">'+ic('check','#047857',46,null,3.2)+'</div>'+
    '<div style="text-align:center;margin-top:18px"><h1 style="font-size:26px;color:#fff">'+title+'</h1><p style="margin:6px 0 0;font-size:14px;color:#C8F2E3">'+t.title+'</p>'+chip+'</div>'+
    '<div class="label" style="color:#C8F2E3;margin-top:24px">3 HAL UNTUK DIINGAT</div><div class="col" style="gap:9px;margin-top:10px">'+
    M.take.map(function(x,i){ return '<div class="take"><b class="n">'+(i+1)+'</b><span>'+x+'</span></div>'; }).join('')+'</div>'+
    '<div class="sp" style="min-height:20px"></div><div class="col" style="gap:10px">'+
    '<button class="btn btn-y" data-act="tab" data-arg="quiz-level">Lanjut ke Kuis</button>'+
    '<div class="row" style="gap:10px">'+others.map(function(o){ return '<button class="btn btn-sm" style="flex:1;background:var(--green-d);color:#fff;font-size:13px;padding:13px 8px" data-act="startMode" data-arg="'+o[0]+'">'+(modeDone(t.id,o[0])?'Ulangi ':'')+o[1]+'</button>'; }).join('')+'</div>'+
    '<button style="padding:12px;color:#C8F2E3;font-size:14px;font-weight:600;width:100%" data-act="exitMod">Kembali ke Topik</button></div></div>';
};

/* ---------- Kuis ---------- */
R['quiz-level'] = function(){
  var p = periodInfo();
  function lvCard(n, col, colL){
    var inf = lvInfo(n), h = S.hasil[n], can = inf.can, live = can || inf.done;
    var chips = '<span class="chip" style="background:'+colL+';color:'+col+'">'+(h?h.total:lvCount(n))+' SOAL</span>'+
      (h ? '<span class="chip" style="background:var(--green-l);color:var(--green)">SELESAI &middot; SKOR '+h.skor+'</span>' : '<span class="chip" style="background:var(--sand);color:var(--muted)">1x KESEMPATAN</span>');
    return '<button class="card" style="width:100%;text-align:left;padding:18px;margin-top:14px;border:2px solid '+(live?col:'#D9CFBF')+';box-shadow:0 5px 0 '+(live?col:'#D9CFBF')+';border-radius:24px;'+(live?'':'background:var(--sand)')+'" data-act="levelTap" data-arg="'+n+'">'+
      '<span class="row">'+(h?'<span class="avatar" style="width:50px;height:50px;border-radius:17px;background:var(--green)">'+ic('check','#fff',24,null,3)+'</span>':live?avatar(n,50,col,'#fff',17):'<span class="avatar" style="width:50px;height:50px;border-radius:17px;background:var(--line)">'+ic('lock','#6B6A85',22)+'</span>')+
      '<span class="grow"><span style="display:block;font-family:Inter,sans-serif;font-size:19px;font-weight:600;'+(live?'':'color:var(--muted)')+'">'+lvName(n)+'</span><span style="display:block;margin-top:2px;font-size:11.5px;color:var(--muted)">'+lvDesc(n)+'</span></span>'+(live?ic('chev',col,22):'')+'</span>'+
      '<span class="row" style="margin-top:14px;gap:7px;flex-wrap:wrap">'+chips+'</span>'+
      '<span style="display:block;margin-top:12px;padding:12px 14px;border-radius:15px;background:'+(live?colL:'#fff')+';font-size:11.5px;color:'+(live?col:'var(--muted)')+';line-height:1.6">'+inf.note+'</span></button>';
  }
  var rules = ['Level 1 dan Level 2 bisa dikerjakan kapan saja'+(p?' selama periode kuis':'')+', tidak harus berurutan.',
    'Setiap level hanya bisa dikerjakan 1 kali. Skor yang muncul pertama kali langsung jadi skor final.',
    'Semua peserta mendapat paket soal yang sama.',
    'Level 1: setiap jawaban yang dikunci langsung tersimpan. Keluar di tengah tidak menghitung skor, dan kamu lanjut dari soal berikutnya saat kembali.',
    'Level 2: keluar di tengah tidak dihitung dan kuis bisa dimulai lagi dari awal.',
    'Tidak ada batas waktu. Kerjakan dengan tenang.',
    'Kunci dan pembahasan terbuka setelah jawaban dikumpulkan.'];
  if(p) rules.push('Peringkat dihitung dari 80% skor kuis dan 20% kecepatan mengumpulkan. Makin awal dikumpulkan dalam periode, makin tinggi nilai kecepatannya.');
  return '<div class="qhead"><div style="position:relative;max-width:190px"><button class="icon-btn back-on-head" data-act="tab" data-arg="beranda" aria-label="Kembali ke beranda">'+ic('back','#fff',20)+'</button><h1 style="font-size:26px;color:#fff">Kuis</h1>'+
    '<p style="margin:4px 0 0;font-size:12.5px;color:#FFD6E5;line-height:1.5">Semua soal bersumber dari materi utama.</p>'+
    '<span class="chip" style="margin-top:12px;background:rgba(255,255,255,.2);color:#fff">'+doneLv()+'/2 level dikerjakan</span></div>'+
    '<div class="qimg"><img src="'+IMG.checklist+'" alt="Ilustrasi daftar periksa"></div></div>'+
  '<div class="body pad" style="padding-top:4px">'+
    (p ? '<div class="period">'+ic('cal','#8A4B00',18)+'<span>Periode kuis <b>'+fmtDay(p.mulai)+'</b> sampai <b>'+fmtDay(p.selesai)+'</b>.'+(p.belum?' Belum dimulai.':p.lewat?' Sudah berakhir.':' Sisa '+p.sisa+' hari.')+'</span></div>' : '')+
    lvCard(1,'var(--pink)','var(--pink-l)')+lvCard(2,'var(--purple)','var(--purple-l)')+
    '<div style="width:100%;text-align:left;margin-top:14px;padding:18px;border-radius:24px;background:var(--sand);border:2px dashed #D9CFBF"><div class="row">'+
      '<span class="avatar" style="width:50px;height:50px;border-radius:17px;background:var(--line)">'+ic('lock','#6B6A85',22)+'</span><span class="grow"><span style="display:block;font-family:Inter,sans-serif;font-size:19px;font-weight:600;color:var(--muted)">Kuis Level 3</span>'+
      '<span style="display:block;margin-top:2px;font-size:11.5px;color:var(--muted)">'+lvInfo(3).note+'</span></span></div></div>'+
    '<div class="card" style="margin-top:16px;padding:15px 17px"><div class="label">ATURAN MAIN</div><div class="col" style="gap:8px;margin-top:9px;font-size:12px;color:var(--muted);line-height:1.55">'+
    rules.map(function(r,i){ return '<div class="row" style="align-items:flex-start;gap:9px"><b style="color:var(--pink)">'+(i+1)+'.</b><span>'+r+'</span></div>'; }).join('')+'</div></div>'+
    '<div style="height:22px"></div></div>'+tabbar('quiz-level');
};

function qTop(lv, i, n){
  var col = lv===1 ? 'var(--pink)' : 'var(--purple)', bg = lv===1 ? '#F7D6E2' : '#DBD0FF';
  return '<div style="padding:22px 22px 0"><div class="row"><button class="icon-btn gl" data-act="quitQuiz" aria-label="Keluar dari kuis">'+ic('close','#1C1B33')+'</button>'+
    '<span class="bar grow" style="height:8px;background:'+bg+'"><i style="width:'+Math.round(i/n*100)+'%;background:'+col+'"></i></span>'+
    '<span class="chip" style="background:#fff;color:'+col+';padding:8px 12px;font-size:12.5px">'+(i+1)+'/'+n+'</span></div>'+
    '<div class="row" style="margin-top:14px;justify-content:space-between"><span style="font-size:11.5px;font-weight:700;color:'+(lv===1?'var(--pink-d)':'var(--purple-d)')+';letter-spacing:.05em">KUIS LEVEL '+lv+'</span>'+
    '<span style="font-size:11.5px;font-weight:700;color:var(--muted)">'+(lv===1?'Soal':'Kasus')+' '+(i+1)+' dari '+n+'</span></div></div>';
}
/* ---------- tipe soal Level 1 ---------- */
var TIPE = {
  basket:{short:'Keranjang', label:'MASUKKAN KE KERANJANG', ico:'basket', col:'#D6336C', bg:'var(--pink-l)', ask:'Masukkan kartu berikut ke keranjang yang tepat.'},
  pg:{short:'Pilihan ganda', label:'PILIHAN GANDA', ico:'target', col:'#4F32D6', bg:'var(--purple-l)', ask:'Pilih satu jawaban yang paling tepat.'},
  bs:{short:'Benar/Salah', label:'BENAR ATAU SALAH', ico:'check', col:'#047857', bg:'var(--green-l)', ask:'Pernyataan berikut benar atau salah?'},
  hitung:{short:'Hitung cepat', label:'HITUNG CEPAT', ico:'calc', col:'#8A4B00', bg:'var(--yellow-l)', ask:'Hitung lalu pilih angka yang tepat.'}
};
function aktifQ(q){ return q.aktif !== false; }
function nAktif(L){ return L.filter(aktifQ).length; }
function tipeOf(it){ return TIPE[it.tipe] ? it.tipe : 'basket'; }
function tipeChip(t){ var m = TIPE[t]; return '<span class="chip" style="background:'+m.bg+';color:'+m.col+'">'+ic(m.ico,m.col,14,null,2.4)+' '+m.label+'</span>'; }
function ansText(it, k){ var t = tipeOf(it); if(k == null) return '-';
  if(t==='basket') return basketOf(k).name; if(t==='bs') return k==='benar' ? 'Benar' : 'Salah';
  return (it.opts||[])[+k] != null ? (it.opts||[])[+k] : k; }

/* badan soal Level 1: dipakai di kuis (mode 'quiz') dan contoh soal (mode 'demo') */
function l1Body(it, mode, sel, key){
  var t = tipeOf(it), act = mode==='quiz' ? 'answer' : 'demoAns', selAct = mode==='quiz' ? 'selAns' : 'demoSel', lockAct = mode==='quiz' ? 'lockAns' : 'demoLock';
  var kk = key ? ' data-key="'+key+'"' : '';
  if(t==='basket'){
    return '<div class="col" style="align-items:center;margin-top:'+(mode==='quiz'?20:12)+'px"><div style="width:'+(mode==='quiz'?240:220)+'px;padding:'+(mode==='quiz'?'24px 18px':'18px 16px')+';border-radius:22px;background:var(--ink);box-shadow:0 12px 24px rgba(168,30,81,.2);display:flex;flex-direction:column;align-items:center;gap:12px">'+
      '<span style="width:44px;height:44px;border-radius:14px;background:var(--mint);display:flex;align-items:center;justify-content:center">'+ic('note','#04372A',24)+'</span>'+
      '<span style="font-family:Inter,sans-serif;font-size:'+(mode==='quiz'?21:18)+'px;font-weight:600;color:#fff;text-align:center;line-height:1.3">'+esc(it.item)+'</span></div>'+
      '<span class="row" style="margin-top:11px;gap:7px;color:var(--pink-d);font-size:11.5px;font-weight:600">'+ic('down','#A81E51',16)+' Ketuk keranjang tujuannya</span></div>'+
      (mode==='quiz'?'<div class="sp" style="min-height:18px"></div>':'<div style="height:12px"></div>')+'<div class="row" style="gap:9px;align-items:stretch">'+
      BASKETS.map(function(b){ var c = b.cls==='p'?'#4F32D6':b.cls==='o'?'#C2410C':'#047857'; return '<button class="basket'+(b.cls?' '+b.cls:'')+'" data-act="'+act+'" data-arg="'+b.k+'"'+kk+'>'+ic('basket',c,28)+'<span>'+b.name.replace(' ','<br>')+'</span></button>'; }).join('')+'</div>';
  }
  if(t==='bs'){
    return '<div class="qcard bs"><span class="qmark">'+ic('info','#047857',22)+'</span><p>'+esc(it.item)+'</p></div>'+
      (mode==='quiz'?'<div class="sp" style="min-height:18px"></div>':'<div style="height:12px"></div>')+
      '<div class="row" style="gap:12px"><button class="bsbtn b" data-act="'+act+'" data-arg="benar"'+kk+'>'+ic('check','#fff',22,null,3)+' BENAR</button><button class="bsbtn s" data-act="'+act+'" data-arg="salah"'+kk+'>'+ic('close','#fff',22,null,3)+' SALAH</button></div>';
  }
  var calc = t==='hitung';
  return '<div class="qcard'+(calc?' calc':'')+'">'+(calc?'<span class="qmark">'+ic('calc','#8A4B00',22)+'</span>':'')+'<p>'+esc(it.item)+'</p></div>'+
    '<div class="'+(calc?'numgrid':'col')+'" style="gap:9px;margin-top:12px">'+(it.opts||[]).map(function(o,k){
      return '<button class="opt'+(calc?' num':'')+(sel===k?' sel':'')+'" data-act="'+selAct+'" data-arg="'+k+'"'+kk+'><span class="k">'+'ABCD'[k]+'</span><span>'+esc(o)+'</span></button>'; }).join('')+'</div>'+
    (mode==='quiz'?'<div class="sp" style="min-height:16px"></div>':'<div style="height:12px"></div>')+
    '<button class="btn btn-p'+(mode==='quiz'?'':' btn-sm')+'" data-act="'+lockAct+'"'+kk+' style="'+(sel==null?'opacity:.5':'')+'">Kunci Jawaban</button>';
}
R['quiz-l1'] = function(){
  var it = QZ.items[QZ.i], n = QZ.items.length, t = tipeOf(it);
  var dots = QZ.items.map(function(x,k){ var a = QZ.ans[k]; return '<i style="background:'+(a?(a.ok?'var(--green)':'var(--orange)'):k===QZ.i?'var(--pink)':'#F0DDE5')+'"></i>'; }).join('');
  return qTop(1, QZ.i, n)+
  '<div class="body pad pb" style="padding-top:12px;display:flex;flex-direction:column">'+
    '<div>'+tipeChip(t)+'</div>'+
    '<div style="margin-top:10px;font-size:13.5px;font-weight:700;line-height:1.5">'+TIPE[t].ask+'</div>'+
    l1Body(it, 'quiz', QZ.sel)+
    '<div class="dotrow" style="margin-top:16px">'+dots+'</div></div>';
};
R['quiz-feedback'] = function(){
  var a = QZ.ans[QZ.i], n = QZ.items.length, t = T(a.topic), ok = a.ok, last = QZ.i >= n-1, tp = tipeOf(a);
  var sub = !ok ? 'Kunci jawaban ada di pembahasan setelah kuis selesai'
    : tp==='basket' ? '"'+esc(a.item)+'" masuk '+basketOf(a.ans).name
    : tp==='bs' ? 'Pernyataan ini memang '+(a.ans==='benar'?'BENAR':'SALAH')
    : 'Jawabannya: '+esc(ansText(a, a.ans));
  $('quiz-feedback').style.background = ok ? 'var(--pink-bg)' : '#FFF4ED';
  return '<div class="body pad pb" style="padding-top:22px;display:flex;flex-direction:column">'+
    '<div class="row" style="opacity:.55"><span class="icon-btn gl">'+ic('close','#1C1B33')+'</span><span class="bar grow" style="height:8px;background:'+(ok?'#F7D6E2':'#FBDCC8')+'"><i style="width:'+Math.round((QZ.i+1)/n*100)+'%;background:'+(ok?'var(--pink)':'var(--orange)')+'"></i></span>'+
    '<span style="font-size:12px;font-weight:700;color:var(--muted)">'+(QZ.i+1)+'/'+n+'</span></div>'+
    '<div class="col" style="align-items:center;gap:14px;margin-top:26px"><span style="width:96px;height:96px;border-radius:50%;background:'+(ok?'var(--green)':'var(--orange)')+';display:flex;align-items:center;justify-content:center">'+ic(ok?'check':'excl','#fff',48,null,3.4)+'</span>'+
    '<div style="text-align:center"><h1 style="font-size:30px;color:'+(ok?'var(--green)':'var(--orange)')+'">'+(ok?'Tepat!':'Belum tepat')+'</h1>'+
    '<p style="margin:5px 0 0;font-size:13px;color:var(--muted);line-height:1.5">'+sub+'</p></div></div>'+
    (tp!=='basket'?'<div style="margin-top:18px;padding:12px 14px;border-radius:15px;background:#fff;border:1px dashed var(--line);font-size:12px;color:var(--muted);line-height:1.55"><b style="color:var(--ink)">Soal:</b> '+esc(a.item)+(ok?'':'<br><b style="color:var(--ink)">Jawabanmu:</b> '+esc(ansText(a, a.pick)))+'</div>':'')+
    '<div class="card" style="margin-top:14px;padding:18px;border-color:'+(ok?'#C8F2E3':'#FBDCC8')+'"><div class="row" style="gap:9px"><span class="avatar" style="width:25px;height:25px;border-radius:8px;background:'+(ok?'var(--green-l)':'var(--orange-l)')+'">'+ic(ok?'up':'bulb',ok?'#047857':'#C2410C',15)+'</span>'+
    '<span style="font-size:11.5px;font-weight:700;color:'+(ok?'var(--green)':'var(--orange)')+';letter-spacing:.05em">'+(ok?'KENAPA BEGITU':'PETUNJUK')+'</span></div>'+
    '<p style="margin:11px 0 0;font-size:13.5px;line-height:1.7">'+esc(ok?a.why:a.hint)+'</p>'+
    (ok?'<p style="margin:12px 0 0;padding-top:11px;border-top:1px dashed #DDE8E3;font-size:11px;color:var(--muted);line-height:1.6">Materi terkait: '+t.title+'</p>':'')+'</div>'+
    (!ok?'<button class="card row" style="margin-top:12px;padding:13px 15px;gap:12px;width:100%;text-align:left;border-style:dashed" data-act="peekTopic" data-arg="'+t.id+'">'+thumb(t.img,50,38)+
      '<span class="grow" style="font-size:12px;color:var(--muted);line-height:1.6">Petunjuk ini dari materi <b style="color:var(--ink)">'+t.title+'</b>. Intip materinya?</span>'+ic('chev','#6B6A85',18)+'</button>':'')+
    '<div class="sp" style="min-height:18px"></div><button class="btn '+(ok?'btn-g':'btn-o')+'" data-act="nextQ">'+(last?'Kumpulkan &amp; Lihat Hasil':'Soal Berikutnya')+'</button></div>';
};
/* ---------- Contoh soal sebelum kuis ---------- */
var CONTOH1 = [
  {tipe:'basket', item:'Uang di Celengan Rumah', ans:'likuid', why:'Uang tunai di celengan bisa langsung dipakai kapan saja, jadi termasuk aset likuid.'},
  {tipe:'pg', item:'Lembaga yang menjamin simpanan nasabah di bank adalah…', opts:['OJK','LPS','BEI','BPJS'], ans:'1', why:'Lembaga Penjamin Simpanan (LPS) menjamin simpanan di bank peserta sesuai ketentuan.'},
  {tipe:'bs', item:'Menabung sebaiknya dilakukan setelah semua keinginan terpenuhi.', ans:'salah', why:'Tabungan disisihkan di awal begitu gaji masuk. Kalau menunggu sisa, biasanya tidak ada yang tersisa.'},
  {tipe:'hitung', item:'Kamu menabung Rp100.000 setiap minggu. Berapa yang terkumpul setelah 10 minggu?', opts:['Rp100.000','Rp500.000','Rp1.000.000','Rp10.000.000'], ans:'2', why:'Rp100.000 × 10 minggu = Rp1.000.000.'}
];
var CONTOH2 = {who:'Ani', story:'Ani punya sisa gaji Rp2 juta dan belum punya dana darurat. Seorang kenalan menawarkan investasi dengan untung pasti 20% per bulan.', ask:'Langkah yang paling tepat bagi Ani adalah:',
  opts:['Ikut dengan seluruh Rp2 juta agar cepat untung.','Mulai menyisihkan dana darurat dan mengecek legalitas tawaran tersebut.','Meminjam uang agar bisa ikut lebih banyak.','Membiarkan uangnya tanpa rencana.'], ok:1,
  why:'Dana darurat adalah pondasi. Untung pasti 20% per bulan tidak logis, sehingga legalitasnya perlu dicek lewat Kontak OJK 157.'};
var CT = {lv:1, res:{}, sel:{}};
function demoResult(ok, why, ansTxt){
  return '<div class="cres" style="background:'+(ok?'var(--green)':'var(--orange)')+';margin-top:12px"><div class="v">'+(ok?'TEPAT!':'BELUM TEPAT')+'</div>'+
    (ok?'':'<h3 style="font-size:15px">Jawabannya: '+esc(ansTxt)+'</h3>')+'<p>'+esc(why)+'</p></div>';
}
R['quiz-contoh'] = function(){
  var lv = CT.lv, body;
  if(lv===1){
    body = CONTOH1.map(function(it, k){
      var r = CT.res[k];
      return '<div class="card" style="padding:16px;margin-top:14px"><div class="row" style="justify-content:space-between"><span style="font-size:11px;font-weight:700;color:var(--muted)">CONTOH '+(k+1)+'</span>'+tipeChip(it.tipe)+'</div>'+
        '<div style="margin-top:10px;font-size:12.5px;font-weight:700;color:var(--muted)">'+TIPE[it.tipe].ask+'</div>'+
        (r ? '<div class="qcard'+(it.tipe==='hitung'?' calc':it.tipe==='bs'?' bs':'')+'" style="margin-top:10px"><p>'+esc(it.item)+'</p></div>'+demoResult(r.ok, it.why, ansText(it, it.ans))
           : l1Body(it, 'demo', CT.sel[k], k))+'</div>';
    }).join('');
  } else {
    var r2 = CT.res[0];
    body = '<div class="card" style="padding:16px;margin-top:14px"><div style="font-size:11px;font-weight:700;color:var(--muted)">CONTOH KASUS</div>'+
      '<div style="margin-top:10px;padding:14px 16px;border-radius:16px;background:var(--ink)"><div class="row" style="gap:9px">'+ic('user','#FFC53D',17)+'<span style="font-size:11px;font-weight:700;color:var(--yellow);letter-spacing:.05em">SITUASI &middot; '+CONTOH2.who.toUpperCase()+'</span></div>'+
      '<p style="margin:9px 0 0;font-size:13px;color:#fff;line-height:1.65">'+CONTOH2.story+'</p></div>'+
      '<p style="margin:12px 0 0;font-size:13px;font-weight:700">'+CONTOH2.ask+'</p>'+
      (r2 ? demoResult(r2.ok, CONTOH2.why, CONTOH2.opts[CONTOH2.ok])
          : '<div class="col" style="gap:9px;margin-top:10px">'+CONTOH2.opts.map(function(o,k){ return '<button class="opt'+(CT.sel[0]===k?' sel':'')+'" data-act="demoSel" data-arg="'+k+'" data-key="0"><span class="k">'+'ABCD'[k]+'</span><span>'+o+'</span></button>'; }).join('')+'</div>'+
            '<button class="btn btn-p btn-sm" style="margin-top:12px;'+(CT.sel[0]==null?'opacity:.5':'')+'" data-act="demoLock" data-key="0">Kunci Jawaban</button>')+'</div>';
  }
  var nEx = lv===1 ? CONTOH1.length : 1, done = Object.keys(CT.res).length;
  return topbar('Contoh Soal', lvName(lv)+' &middot; latihan, tidak dinilai')+
  '<div class="body pad pb" style="padding-top:12px">'+
    '<div class="period" style="margin-top:0">'+ic('bulb','#8A4B00',18)+'<span>'+(lv===1?'Kuis Level 1 berisi <b>4 tipe soal</b> yang muncul acak. Coba dulu contoh di bawah supaya terbiasa.':'Kuis Level 2 berisi <b>studi kasus</b>. Baca situasinya, lalu pilih keputusan terbaik. Coba contoh di bawah dulu.')+'</span></div>'+
    body+
    '<div style="margin-top:16px;font-size:11.5px;color:var(--muted);text-align:center">'+done+' dari '+nEx+' contoh sudah dicoba</div>'+
    '<button class="btn '+(lv===1?'btn-o':'btn-p')+'" style="margin-top:10px;'+(lv===1?'background:var(--pink);box-shadow:0 5px 0 var(--pink-d)':'')+'" data-act="readyQuiz">Saya Siap, Mulai Kuis</button>'+
    '<div style="height:18px"></div></div>';
};
R['quiz-l2'] = function(){
  var cs = QZ.items[QZ.i], n = QZ.items.length, last = QZ.i===n-1;
  return qTop(2, QZ.i, n)+
  '<div class="body pad pb" style="padding-top:12px;display:flex;flex-direction:column">'+
    '<div style="border-radius:20px;overflow:hidden;background:#fff;border:1px solid #DBD0FF"><img src="'+IMG.h_kasus+'" alt="Ilustrasi berkas kasus" style="width:100%;height:100px;object-fit:contain;display:block;padding:6px 0">'+
    '<div style="padding:14px 16px;background:var(--ink)"><div class="row" style="gap:9px">'+ic('user','#FFC53D',17)+'<span style="font-size:11px;font-weight:700;color:var(--yellow);letter-spacing:.05em">SITUASI &middot; '+esc(cs.who).toUpperCase()+'</span></div>'+
    '<p style="margin:9px 0 0;font-size:13px;color:#fff;line-height:1.65">'+esc(cs.story)+'</p></div></div>'+
    '<p style="margin:14px 0 0;font-size:13px;font-weight:700">'+esc(cs.ask)+'</p><div class="col" style="gap:9px;margin-top:11px">'+
    cs.opts.map(function(o,k){ return '<button class="opt'+(QZ.pick===k?' sel':'')+'" data-act="pickOpt" data-arg="'+k+'"><span class="k">'+'ABCD'[k]+'</span><span>'+esc(o)+'</span></button>'; }).join('')+
    '</div><div class="sp" style="min-height:16px"></div>'+
    (last?'<p style="margin:0 0 10px;font-size:11.5px;color:var(--muted);text-align:center">Jawaban dikumpulkan sekali dan langsung jadi skor final.</p>':'')+
    '<button class="btn btn-p" data-act="submitL2" style="'+(QZ.pick==null?'opacity:.5':'')+'">'+(last?'Kumpulkan Jawaban':'Simpan &amp; Lanjut')+'</button></div>';
};

function weakTopics(res){
  var ids = [];
  res.review.forEach(function(a){ if(a.ok) return; (res.level===1 ? [a.topic] : (a.topics||[])).forEach(function(t){ if(t && ids.indexOf(t)<0) ids.push(t); }); });
  return ids;
}
R['quiz-hasil'] = function(){
  var weak = weakTopics(RES), other = RES.level===1 ? 2 : 1, oi = lvInfo(other);
  return '<div class="body pad pb" style="padding-top:28px;display:flex;flex-direction:column;position:relative">'+
    '<span class="confetti" style="top:20px;left:10px;width:11px;height:11px;background:var(--yellow);transform:rotate(25deg)"></span><span class="confetti" style="top:66px;right:16px;width:12px;height:12px;background:#FF7BAC;transform:rotate(-20deg)"></span><span class="confetti" style="top:132px;left:28px;width:9px;height:9px;border-radius:50%;background:var(--mint)"></span>'+
    '<div class="col" style="align-items:center;gap:12px;position:relative"><span style="width:104px;height:104px;border-radius:50%;overflow:hidden;background:#fff;border:6px solid var(--purple-dd)"><img src="'+IMG.h_selesai+'" alt="Piala" style="width:100%;height:100%;object-fit:cover;display:block"></span>'+
    '<div style="text-align:center"><span class="chip" style="background:var(--mint);color:#04372A">KUIS SELESAI</span><div style="margin-top:10px;font-family:Inter,sans-serif;font-size:54px;font-weight:600;color:#fff;line-height:1">'+RES.skor+'</div>'+
    '<p style="margin:3px 0 0;font-size:13.5px;color:#CFC3FF">'+lvName(RES.level)+' &middot; skor final</p></div></div>'+
    '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:20px;position:relative">'+
    '<div class="stat" style="background:var(--purple-dd)"><b style="color:var(--mint)">'+RES.benar+'</b><span style="color:#CFC3FF">Benar</span></div>'+
    '<div class="stat" style="background:var(--purple-dd)"><b style="color:var(--orange-b)">'+(RES.total-RES.benar)+'</b><span style="color:#CFC3FF">Salah</span></div>'+
    '<div class="stat" style="background:var(--purple-dd)"><b style="color:var(--yellow);font-size:20px">'+mmss(RES.durasi_detik)+'</b><span style="color:#CFC3FF">Durasi</span></div></div>'+
    '<div class="row" style="margin-top:12px;padding:15px 16px;border-radius:18px;background:var(--purple-dd);gap:12px;position:relative">'+ic('check','#34D399',22,null,3)+
    '<div class="grow"><div style="font-size:13.5px;font-weight:700;color:#fff">Tercatat '+fmtDate(RES.submitted_at, true)+'</div><div style="margin-top:2px;font-size:11.5px;color:#CFC3FF">Skor ini final dan dipakai untuk rekap.</div></div></div>'+
    '<div style="margin-top:12px;padding:15px 16px;border-radius:18px;background:#fff;position:relative"><div class="label">YANG PERLU DIPERKUAT</div>'+
    (weak.length ? weak.slice(0,3).map(function(id){ var t=T(id); return '<button class="row" style="margin-top:10px;gap:11px;width:100%;text-align:left" data-act="openTopic" data-arg="'+id+'">'+thumb(t.img,48,36)+
      '<span class="grow"><b style="font-size:12.5px">'+t.title+'</b><span style="display:block;font-size:11px;color:var(--muted);margin-top:1px">'+(catOf(t)==='wajib'?'Materi utama':'Materi tambahan')+'</span></span><span style="font-size:11.5px;font-weight:700;color:var(--purple-d)">Belajar</span></button>'; }).join('')
      : '<p style="margin:9px 0 0;font-size:12.5px;color:var(--green);font-weight:600">Semua jawaban benar. Tidak ada yang perlu diperkuat!</p>')+'</div>'+
    '<div style="margin-top:12px;padding:14px 15px;border-radius:18px;background:var(--purple-dd);display:flex;align-items:center;gap:12px">'+ic('msg','#CFC3FF',22)+
    '<span class="grow" style="font-size:12.5px;color:#fff;line-height:1.5">Bagaimana pengalaman kuisnya? Ceritakan ke admin.</span><button class="chip" style="background:#fff;color:var(--purple-d);padding:9px 13px;font-size:12px" data-act="saran" data-arg="setelah kuis L'+RES.level+'">Kirim Saran</button></div>'+
    '<div class="sp" style="min-height:16px"></div><div class="col" style="gap:10px;position:relative"><button class="btn btn-y" data-act="openReview">Lihat Pembahasan</button>'+
    '<div class="row" style="gap:10px">'+(oi.can ? '<button class="btn btn-sm" style="flex:1;background:#fff;color:var(--purple-d)" data-act="levelTap" data-arg="'+other+'">Lanjut '+lvName(other)+'</button>' : '<button class="btn btn-sm" style="flex:1;background:var(--purple-dd);color:#fff" data-act="tab" data-arg="belajar-topik">Lanjut Belajar</button>')+
    '<button class="btn btn-sm" style="flex:1;background:var(--purple-dd);color:#fff" data-act="tab" data-arg="beranda">Ke Beranda</button></div></div></div>';
};

function optReview(opts, key, pick){
  return opts.map(function(o,k){
    var isKey = k===key, mine = k===pick;
    if(!isKey && !mine) return '<div class="opt" style="opacity:.6"><span class="k">'+'ABCD'[k]+'</span><span>'+esc(o)+'</span></div>';
    return '<div class="opt '+(isKey?'ok':'')+'" style="'+(isKey?'':'background:var(--sand)')+'"><span class="k" style="'+(isKey?'':'background:var(--line);color:var(--muted)')+'">'+'ABCD'[k]+'</span><span style="'+(isKey?'font-weight:600':'color:var(--muted)')+'">'+esc(o)+
      '<b style="display:block;margin-top:3px;font-size:10px;'+(isKey?'color:var(--green)':'')+'">'+(isKey&&mine?'KUNCI &middot; JAWABANMU':isKey?'KUNCI':'JAWABANMU')+'</b></span></div>';
  }).join('');
}
R['quiz-review'] = function(){
  var n = RES.review.length; if(REVI >= n) REVI = 0;
  var a = RES.review[REVI], body, why, ref;
  if(RES.level === 1){
    var tp = tipeOf(a);
    if(tp==='basket'){
      var kb = basketOf(a.ans), pb = basketOf(a.pick);
      body = '<div class="card" style="margin-top:14px;padding:15px 16px"><div class="row" style="justify-content:space-between"><span class="label" style="font-size:10.5px">SOAL '+(REVI+1)+'</span>'+tipeChip(tp)+'</div><p style="margin:8px 0 0;font-size:13px;line-height:1.6">Masukkan <b>'+esc(a.item)+'</b> ke keranjang yang tepat.</p></div>'+
        '<div class="col" style="gap:9px;margin-top:11px"><div class="opt ok"><span class="k">'+ic('check','#fff',14,null,3)+'</span><span style="font-weight:600">'+kb.name+'<b style="display:block;margin-top:3px;font-size:10px;color:var(--green)">KUNCI'+(a.ok?' &middot; JAWABANMU':'')+'</b></span></div>'+
        (a.ok?'':'<div class="opt" style="background:var(--sand)"><span class="k" style="background:var(--line);color:var(--muted)">'+ic('close','#6B6A85',13)+'</span><span style="color:var(--muted)">'+pb.name+'<b style="display:block;margin-top:3px;font-size:10px">JAWABANMU</b></span></div>')+'</div>';
    } else {
      var opts = tp==='bs' ? ['Benar','Salah'] : (a.opts||[]), key = tp==='bs' ? (a.ans==='benar'?0:1) : +a.ans, mine = tp==='bs' ? (a.pick==='benar'?0:1) : +a.pick;
      body = '<div class="card" style="margin-top:14px;padding:15px 16px"><div class="row" style="justify-content:space-between"><span class="label" style="font-size:10.5px">SOAL '+(REVI+1)+'</span>'+tipeChip(tp)+'</div><p style="margin:8px 0 0;font-size:13px;line-height:1.6">'+esc(a.item)+'</p></div>'+
        '<div class="col" style="gap:9px;margin-top:11px">'+optReview(opts, key, mine)+'</div>';
    }
    why = a.why; ref = 'Materi: '+T(a.topic).title;
  } else {
    body = '<div class="card" style="margin-top:14px;padding:15px 16px"><div class="label" style="font-size:10.5px">KASUS '+(REVI+1)+' &middot; '+esc(a.who).toUpperCase()+'</div><p style="margin:8px 0 0;font-size:12.5px;line-height:1.65">'+esc(a.story)+'</p></div>'+
      '<div class="col" style="gap:9px;margin-top:11px">'+optReview(a.opts, a.ans, a.pick)+'</div>';
    why = a.why; ref = 'Materi: '+(a.topics||[]).map(function(x){ return T(x).title; }).join(', ');
  }
  return topbar('Pembahasan',lvName(RES.level)+' &middot; '+n+' soal &middot; skor '+RES.skor,'<span class="chip" style="background:var(--green-l);color:var(--green)">TERBUKA</span>')+
  '<div class="body pad pb" style="padding-top:14px"><div class="row" style="gap:6px;flex-wrap:wrap">'+
    RES.review.map(function(x,k){ return '<button class="qnum" data-act="revGo" data-arg="'+k+'" style="background:'+(k===REVI?'var(--ink)':x.ok?'var(--green)':'var(--orange)')+(k===REVI?';box-shadow:0 0 0 3px var(--purple-l)':'')+'">'+(k+1)+'</button>'; }).join('')+'</div>'+
    body+
    '<div style="margin-top:13px;border-radius:18px;overflow:hidden;border:1px solid var(--line)"><img src="'+IMG.presenter+'" alt="Ilustrasi pemateri" style="width:100%;height:96px;object-fit:contain;display:block;background:#fff;padding:6px 0">'+
    '<div style="padding:16px;background:var(--ink)"><div style="font-size:10.5px;font-weight:700;color:var(--yellow);letter-spacing:.05em">PENJELASAN</div>'+
    '<p style="margin:9px 0 0;font-size:12.5px;color:#fff;line-height:1.7">'+esc(why)+'</p><p style="margin:12px 0 0;padding-top:11px;border-top:1px solid #3A3859;font-size:10.5px;color:#A8A5C4;line-height:1.6">'+ref+'</p></div></div>'+
    '<div class="row" style="gap:10px;margin-top:16px"><button class="btn btn-sm" style="flex:1;background:#fff;border:1px solid var(--line);color:var(--ink);'+(REVI===0?'opacity:.4':'')+'" data-act="revGo" data-arg="'+(REVI-1)+'">Sebelumnya</button>'+
    (REVI<n-1?'<button class="btn btn-dark btn-sm" style="flex:1" data-act="revGo" data-arg="'+(REVI+1)+'">Berikutnya</button>':'<button class="btn btn-dark btn-sm" style="flex:1" data-back>Selesai</button>')+'</div>'+
    '<div style="height:22px"></div></div>';
};

/* ---------- Kamus ---------- */
function glossList(){
  var q = S.gq.toLowerCase().trim(), out = '', total = 0;
  vis().concat(TOPICS.filter(function(t){ return vis().indexOf(t)<0; })).forEach(function(t){
    if(S.gcat!=='all' && S.gcat!==t.id) return;
    var l = GLOSS.filter(function(g){ return g[2]===t.id && (!q || (g[0]+' '+g[1]).toLowerCase().indexOf(q)>=0); });
    if(!l.length) return; total += l.length;
    l.sort(function(a,b){ return a[0].localeCompare(b[0]); });
    out += '<div class="gl-head"><b>'+t.title+'</b><span>'+l.length+' istilah</span></div>'+
      l.map(function(g){ return '<button class="gl-item" data-act="gl"><div class="row"><b class="grow">'+g[0]+'</b>'+ic('chev','#6B6A85',16)+'</div><p>'+g[1]+'</p></button>'; }).join('');
  });
  return total ? out : '<div class="empty">Istilah "'+esc(S.gq)+'" belum ada di kamus.</div>';
}
R['kamus'] = function(){
  return topbar('Kamus Istilah', GLOSS.length+' istilah, dikelompokkan per topik')+
  '<div class="body pad pb" style="padding-top:14px"><div class="field" style="height:46px">'+ic('search','#6B6A85',18)+'<input data-in="gloss" type="text" value="'+esc(S.gq)+'" placeholder="Cari istilah, misalnya PER" aria-label="Cari istilah"></div>'+
  '<div class="filters" style="margin-top:12px">'+[['all','Semua']].concat(TOPICS.map(function(t){ return [t.id, t.title]; })).map(function(x){
    return '<button class="fchip'+(S.gcat===x[0]?' on':'')+'" style="white-space:nowrap" data-act="gcat" data-arg="'+x[0]+'">'+x[1]+'</button>'; }).join('')+'</div>'+
  '<div class="col" style="gap:8px;margin-top:6px" id="glist">'+glossList()+'</div></div>';
};

/* ---------- Profil ---------- */
R['profil'] = function(){
  var u = S.user, done = [1,2].filter(function(n){ return S.hasil[n]; });
  var avg = done.length ? Math.round(done.reduce(function(a,n){ return a + S.hasil[n].skor; }, 0) / done.length) : '-';
  return '<div class="head-dk"><div class="row"><button class="icon-btn dk" data-act="tab" data-arg="beranda" aria-label="Kembali ke beranda">'+ic('back','#fff',20)+'</button><h2 class="grow" style="font-size:17px">Profil Saya</h2></div>'+
  '<div class="row" style="margin-top:16px;gap:14px">'+avatar(initials(u.nama),62,'var(--yellow)','#4A2800',20)+'<div class="grow"><div style="font-family:Inter,sans-serif;font-size:19px;font-weight:600">'+esc(u.nama)+'</div>'+
  '<div style="margin-top:2px;font-size:12.5px;color:#A8A5C4">KPwBI Daerah Istimewa Yogyakarta</div><div style="margin-top:7px;display:flex;gap:6px"><span class="chip" style="background:var(--purple);color:#fff">'+u.kategori.toUpperCase()+'</span></div></div></div></div>'+
  '<div class="body pad" style="padding-top:16px"><div class="tgrid" style="gap:10px">'+
    [[done.length+'/2','Level dikerjakan','var(--pink)'],[avg,'Rata-rata skor','var(--orange)']].map(function(s){
      return '<div class="card" style="padding:13px"><b style="display:block;font-family:Inter,sans-serif;font-size:23px;color:'+s[2]+'">'+s[0]+'</b><span style="font-size:11px;color:var(--muted)">'+s[1]+'</span></div>'; }).join('')+'</div>'+
    '<div class="label" style="margin-top:18px">RIWAYAT KUIS</div><div class="col" style="gap:8px;margin-top:10px">'+
    [1,2].map(function(n){
      var h = S.hasil[n];
      if(!h) return '<div class="row" style="padding:12px 14px;gap:12px;border-radius:16px;background:var(--sand);border:1px dashed #D9CFBF">'+avatar('L'+n,37,'var(--line)','var(--muted)',12)+'<span class="grow"><b style="font-size:12.5px;color:var(--muted)">'+lvName(n)+'</b><span style="display:block;margin-top:2px;font-size:11px;color:var(--muted)">Belum dikerjakan</span></span></div>';
      return '<button class="card row" style="padding:12px 14px;gap:12px;width:100%;text-align:left" data-act="review" data-arg="'+n+'">'+avatar('L'+n,37,n===1?'var(--pink-l)':'var(--purple-l)',n===1?'var(--pink-d)':'var(--purple-d)',12)+
      '<span class="grow"><b style="font-size:12.5px">'+lvName(n)+'</b><span style="display:block;margin-top:2px;font-size:11px;color:var(--muted)">'+fmtDate(h.submitted_at, true)+' &middot; '+mmss(h.durasi_detik)+' &middot; lihat pembahasan</span></span>'+
      '<span style="text-align:right"><b style="display:block;font-family:Inter,sans-serif;font-size:17px;color:var(--ink)">'+h.skor+'</b><span style="font-size:9.5px;font-weight:700;color:var(--muted)">SKOR</span></span></button>'; }).join('')+'</div>'+
    '<div class="label" style="margin-top:18px">PENGATURAN</div><div class="col" style="gap:8px;margin-top:10px">'+
    '<button class="rowbtn" data-act="changePin">'+ic('key','#6C4BF6',20)+'<span class="grow"><b style="font-size:13px;display:block">Ganti PIN</b><span style="font-size:11px;color:'+(u.pin_default?'var(--orange)':'var(--muted)')+'">'+(u.pin_default?'Kamu masih memakai PIN awal 1234':'PIN 4 digit untuk masuk')+'</span></span>'+ic('chev','#6B6A85',18)+'</button>'+
    '<button class="rowbtn" data-act="saran" data-arg="profil">'+ic('msg','#6C4BF6',20)+'<span class="grow"><b style="font-size:13px;display:block">Kirim Saran</b><span style="font-size:11px;color:var(--muted)">Masukan untuk pengembangan CELENGAN</span></span>'+ic('chev','#6B6A85',18)+'</button>'+
    '<button class="rowbtn" data-act="logout" style="border-color:#FBDCC8">'+ic('logout','#C2410C',20)+'<span class="grow"><b style="font-size:13px;color:var(--orange)">Keluar</b></span></button></div>'+
    '<div style="height:20px"></div></div>'+tabbar('profil');
};

/* ================= ADMIN ================= */
function admHead(title, sub, right){
  return '<div style="padding:22px 22px 16px;background:#221F3A;border-radius:0 0 24px 24px"><div class="row"><button class="icon-btn dk" data-back aria-label="Kembali">'+ic('back','#fff')+'</button>'+
  '<div class="grow"><h2 style="font-size:18px;color:#fff">'+title+'</h2><div style="font-size:11.5px;color:#A8A5C4">'+sub+'</div></div>'+(right||'')+'</div>';
}
function sub(t, mt){ return '<div style="font-size:11px;font-weight:700;color:#A8A5C4;letter-spacing:.06em;margin-top:'+(mt==null?18:mt)+'px">'+t+'</div>'; }
function aRow(title, desc, act, arg, right){ return '<button class="row" style="width:100%;text-align:left;color:#fff" data-act="'+act+'"'+(arg?' data-arg="'+arg+'"':'')+'><div class="grow"><b style="font-size:13px">'+title+'</b><div style="font-size:11px;color:#A8A5C4;margin-top:2px">'+desc+'</div></div>'+(right||ic('chev','#A8A5C4',18))+'</button>'; }
function stepper(k, v){ return '<div class="stepper"><button data-act="step" data-arg="'+k+':-1" aria-label="Kurangi">&minus;</button><b>'+v+'</b><button data-act="step" data-arg="'+k+':1" aria-label="Tambah">+</button></div>'; }
function leaderRow(r, i){
  var c = i===0?['var(--yellow)','#4A2800']:i===1?['#C9CDDA','#221F3A']:i===2?['#D9A15C','#3A1F00']:['#3A3859','#A8A5C4'];
  return '<div class="qrow" style="align-items:center">'+avatar(r.peringkat,32,c[0],c[1],10)+
    '<span class="grow"><b style="font-size:12.5px;display:block">'+esc(r.nama)+'</b><span style="font-size:10.5px;color:#A8A5C4">'+r.kategori+' &middot; L1 '+r.l1+' &middot; L2 '+r.l2+(r.kecepatan!=null?' &middot; kecepatan '+fmtNum(r.kecepatan):'')+'</span></span>'+
    '<b style="font-family:Inter,sans-serif;font-size:16px;color:'+(i<3?'var(--mint)':'#fff')+'">'+fmtNum(Number(r.skor_akhir).toFixed(1))+'</b></div>';
}
function admStats(){
  var p = ADM.peserta, n = p.length || 1;
  function avg(k){ var l = p.filter(function(x){ return x[k]!=null; }); return l.length ? Math.round(l.reduce(function(a,x){ return a+x[k]; },0)/l.length) : '-'; }
  function part(cat){ var l = p.filter(function(x){ return x.kategori===cat; }); if(!l.length) return 0; return Math.round(100*l.filter(function(x){ return x.l1!=null || x.l2!=null; }).length/l.length); }
  return {l1:p.filter(function(x){ return x.l1!=null; }).length, l2:p.filter(function(x){ return x.l2!=null; }).length,
    both:p.filter(function(x){ return x.l1!=null && x.l2!=null; }).length, avg1:avg('l1'), avg2:avg('l2'),
    part:Math.round(100*p.filter(function(x){ return x.l1!=null || x.l2!=null; }).length/n), org:part('Organik'), non:part('Non-Organik')};
}
R['admin'] = function(){
  var c = ADM.pengaturan, st = admStats(), lb = ADM.leaderboard;
  return '<div style="padding:22px 22px 16px;background:#221F3A;border-radius:0 0 24px 24px"><div class="row">'+
  '<span class="sq" style="width:40px;height:40px;border-radius:13px;background:#3A3859">'+ic('gear','#fff',20)+'</span>'+
  '<div class="grow"><h2 style="font-size:18px;color:#fff">Panel Super Admin</h2><div style="font-size:11.5px;color:#A8A5C4">'+esc(ADM.admin)+(API.REMOTE?'':' &middot; mode demo')+'</div></div>'+
  '<button class="chip" style="background:#3A3859;color:#fff;padding:8px 12px" data-act="admReload">'+ic('refresh','#fff',14)+' Muat ulang</button></div>'+
  '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-top:16px">'+
  [[ADM.peserta.length,'Peserta','var(--mint)'],[st.l1,'Selesai L1','#FF7BAC'],[st.l2,'Selesai L2','#8A6FFF'],[ADM.saran.length,'Saran','var(--yellow)']].map(function(s){
    return '<div class="stat" style="background:#15142A;padding:11px 4px"><b style="color:'+s[2]+';font-size:19px">'+s[0]+'</b><span style="color:#A8A5C4;font-size:10px">'+s[1]+'</span></div>'; }).join('')+'</div></div>'+
  '<div class="body pad pb" style="padding-top:0">'+
  sub('PERIODE KUIS')+'<div class="acard" style="margin-top:9px"><div class="cols2" style="display:grid;grid-template-columns:1fr 1fr;gap:9px">'+
    '<label style="font-size:11px;color:#A8A5C4">Mulai<input class="dinp" style="margin-top:5px" id="pm" type="date" value="'+(c.periode_mulai||'')+'"></label>'+
    '<label style="font-size:11px;color:#A8A5C4">Selesai<input class="dinp" style="margin-top:5px" id="ps" type="date" value="'+(c.periode_selesai||'')+'"></label></div>'+
    '<p style="margin:10px 0 0;font-size:10.5px;color:#A8A5C4;line-height:1.6">Di luar periode, kuis tertutup. Skor kecepatan: hari pertama 100, akhir periode 0, proporsional. '+(c.periode_mulai&&c.periode_selesai?'':'<b style="color:var(--yellow)">Periode belum diatur, sehingga peringkat sementara hanya memakai skor kuis.</b>')+'</p>'+
    '<button class="btn btn-sm" style="margin-top:12px;background:var(--purple);color:#fff;padding:12px" data-act="savePeriode">Simpan Periode</button></div>'+
  sub('PENGATURAN KUIS')+'<div class="acard" style="margin-top:9px">'+
    '<div class="row"><div class="grow"><b style="font-size:13px">Jumlah soal Level 1</b><div style="font-size:11px;color:#A8A5C4;margin-top:2px">Dari '+nAktif(ADM.soal_l1)+' soal aktif. Mengubah jumlah membuat paket baru</div></div>'+stepper('n1',c.n1)+'</div>'+
    '<div class="row" style="margin-top:14px"><div class="grow"><b style="font-size:13px">Jumlah soal Level 2</b><div style="font-size:11px;color:#A8A5C4;margin-top:2px">Dari '+nAktif(ADM.soal_l2)+' kasus aktif. Mengubah jumlah membuat paket baru</div></div>'+stepper('n2',c.n2)+'</div>'+
    [[1,'buka_l1','Kuis Level 1'],[2,'buka_l2','Kuis Level 2']].map(function(l){
      return '<div class="row" style="margin-top:14px"><div class="grow"><b style="font-size:13px">'+l[2]+' dibuka</b><div style="font-size:11px;color:#A8A5C4;margin-top:2px">Matikan untuk menutup sementara</div></div><button class="sw'+(c[l[1]]?' on':'')+'" data-act="sw" data-arg="'+l[1]+'" aria-label="Buka '+l[2]+'"><i></i></button></div>'; }).join('')+'</div>'+
  sub('STATISTIK PESERTA')+'<div class="acard" style="margin-top:9px"><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px">'+
    '<div class="stat" style="background:#15142A"><b style="color:var(--mint)">'+st.avg1+'</b><span style="color:#A8A5C4">Rata-rata skor L1</span></div><div class="stat" style="background:#15142A"><b style="color:#FF7BAC">'+st.avg2+'</b><span style="color:#A8A5C4">Rata-rata skor L2</span></div>'+
    '<div class="stat" style="background:#15142A"><b style="color:var(--yellow)">'+st.both+'</b><span style="color:#A8A5C4">Selesai L1 &amp; L2</span></div><div class="stat" style="background:#15142A"><b style="color:#8A6FFF">'+st.part+'%</b><span style="color:#A8A5C4">Partisipasi total</span></div></div>'+
    '<div style="margin-top:12px;font-size:11px;font-weight:700;color:#A8A5C4">PARTISIPASI PER KATEGORI</div>'+
    [['Organik',st.org,'var(--purple)'],['Non-Organik',st.non,'var(--orange-b)']].map(function(r){ return '<div class="row" style="gap:10px;margin-top:8px;font-size:11.5px"><span style="width:84px">'+r[0]+'</span><span class="bar grow" style="background:#15142A;height:8px"><i style="width:'+r[1]+'%;background:'+r[2]+'"></i></span><b>'+r[1]+'%</b></div>'; }).join('')+'</div>'+
  '<div class="row" style="margin-top:18px"><span class="grow" style="font-size:11px;font-weight:700;color:#A8A5C4;letter-spacing:.06em">LEADERBOARD</span><button class="chip" style="background:var(--purple);color:#fff;padding:7px 13px" data-go="admin-leaderboard">Lihat semua</button></div>'+
  '<p style="margin:6px 0 0;font-size:10.5px;color:#A8A5C4;line-height:1.6">Skor akhir = 80% rata-rata skor L1 dan L2 + 20% kecepatan mengumpulkan. Skor sama, yang lebih dulu selesai unggul.</p><div class="col" style="gap:8px;margin-top:9px">'+
    (lb.length ? lb.slice(0,3).map(leaderRow).join('') : '<div style="padding:13px;border-radius:14px;border:1px dashed #3A3859;font-size:11.5px;color:#A8A5C4;text-align:center">Belum ada peserta yang menyelesaikan Level 1 dan Level 2.</div>')+'</div>'+
  sub('KELOLA')+'<div class="acard" style="margin-top:9px;display:flex;flex-direction:column;gap:14px">'+
    aRow('Bank soal', nAktif(ADM.soal_l1)+' soal Level 1 &middot; '+nAktif(ADM.soal_l2)+' kasus Level 2 aktif','go','admin-soal')+
    aRow('Materi belajar', 'Tampil/sembunyi dan kategori utama/tambahan','go','admin-materi')+
    aRow('Peserta', 'Tambah, reset PIN, buka ulang kesempatan kuis','go','admin-peserta')+
    aRow('Saran peserta', ADM.saran.length+' saran masuk','go','admin-saran')+'</div>'+
  sub('LAPORAN')+'<div class="acard" style="margin-top:9px;display:flex;flex-direction:column;gap:14px">'+
    aRow('Unduh rekap (Excel)','Rekap peserta, leaderboard, dan saran','export','',ic('download','#34D399',19))+'</div>'+
  sub('AKUN')+'<div class="acard" style="margin-top:9px;display:flex;flex-direction:column;gap:14px">'+
    aRow('Ganti password admin','Minimal 8 karakter','admPass','',ic('key','#A8A5C4',18))+'</div>'+
  '<button class="btn btn-sm" style="margin-top:18px;background:#221F3A;color:#A8A5C4" data-act="adminOut">Keluar dari Panel Admin</button><div style="height:10px"></div></div>';
};
R['admin-leaderboard'] = function(){
  var lb = ADM.leaderboard;
  return admHead('Leaderboard', lb.length+' peserta sudah menyelesaikan Level 1 &amp; Level 2')+
  '<div class="row" style="margin-top:14px;padding:13px 15px;border-radius:16px;background:#15142A;gap:10px;align-items:flex-start">'+ic('star','#FFC53D',20,'#FFC53D',1)+
  '<span style="font-size:11.5px;color:#C9C6E0;line-height:1.6">Skor akhir = <b style="color:#fff">80% skor kuis</b> + <b style="color:#fff">20% kecepatan</b>. Kecepatan dihitung dari tanggal submit tiap level dalam periode kuis, lalu dirata-rata.</span></div></div>'+
  '<div class="body pad pb" style="padding-top:16px"><div class="col" style="gap:8px">'+(lb.length?lb.map(leaderRow).join(''):'<div style="padding:13px;border-radius:14px;border:1px dashed #3A3859;font-size:11.5px;color:#A8A5C4;text-align:center">Belum ada data.</div>')+'</div></div>';
};
R['admin-materi'] = function(){
  var h = ADM.pengaturan.topik_sembunyi || [], k = ADM.pengaturan.topik_kategori || {};
  return admHead('Materi Belajar','Ketuk label untuk ubah utama/tambahan')+'</div>'+
  '<div class="body pad pb" style="padding-top:14px"><p style="margin:0 0 10px;font-size:11px;color:#A8A5C4;line-height:1.6">Materi utama menjadi rujukan soal kuis. Topik yang disembunyikan tidak tampil di aplikasi peserta.</p><div class="col" style="gap:8px">'+
  TOPICS.map(function(t){ var w = (k[t.id]||t.cat)==='wajib', on = h.indexOf(t.id)<0; return '<div class="adm-row" style="'+(on?'':'opacity:.55')+'">'+thumb(t.img,46,36)+'<span class="grow"><b style="font-size:12.5px;display:block">'+t.title+'</b>'+
    '<button class="chip" style="margin-top:5px;padding:3px 9px;font-size:9.5px;background:'+(w?'var(--pink-l);color:var(--pink-d)':'var(--purple-l);color:var(--purple-d)')+'" data-act="toggleCat" data-arg="'+t.id+'">'+(w?'UTAMA':'TAMBAHAN')+' '+ic('swap',w?'#A81E51':'#4F32D6',11,null,2.6)+'</button></span>'+
    '<button class="sw'+(on?' on':'')+'" data-act="toggleVis" data-arg="'+t.id+'" aria-label="Tampilkan '+t.title+'"><i></i></button></div>'; }).join('')+'</div></div>';
};
function pList(){
  var q = S.pq.toLowerCase();
  var l = ADM.peserta.filter(function(r){ return (S.pf==='Semua' || r.kategori===S.pf || (S.pf==='Belum ikut' && r.l1==null && r.l2==null)) && (!q || r.nama.toLowerCase().indexOf(q)>=0); });
  if(!l.length) return '<div style="padding:14px;border-radius:14px;border:1px dashed #3A3859;font-size:11.5px;color:#A8A5C4;text-align:center">Tidak ada peserta yang cocok.</div>';
  function chip(lv, v){ return '<span class="lv-chip" style="background:'+(v!=null?(lv===1?'#5C1F3A':'#3A2A7A'):'#2A2845')+';color:'+(v!=null?'#fff':'#6B6A85')+'">L'+lv+' '+(v!=null?v:'-')+'</span>'; }
  return '<div style="font-size:11px;color:#A8A5C4;margin-bottom:2px">'+l.length+' peserta</div>'+l.map(function(r){ return '<div class="adm-row">'+avatar(initials(r.nama),38,r.kategori==='Organik'?'var(--purple)':'var(--orange-b)','#fff',12)+
    '<span class="grow"><b style="font-size:12.5px;display:block">'+esc(r.nama)+'</b><span style="display:flex;gap:5px;margin-top:4px;align-items:center;flex-wrap:wrap">'+chip(1,r.l1)+chip(2,r.l2)+'<span style="font-size:10px;color:#A8A5C4">'+r.kategori+(r.pin_default?' &middot; PIN awal':'')+'</span></span></span>'+
    '<button class="chip" style="background:#3A3859;color:#fff;flex:0 0 auto" data-act="pMenu" data-arg="'+esc(r.nama)+'">Kelola</button></div>'; }).join('');
}
R['admin-peserta'] = function(){
  var p = ADM.peserta;
  return admHead('Daftar Peserta', p.filter(function(r){return r.kategori==='Organik';}).length+' Organik &middot; '+p.filter(function(r){return r.kategori==='Non-Organik';}).length+' Non-Organik',
    '<button class="chip" style="background:var(--purple);color:#fff;padding:8px 12px" data-act="addP">'+ic('plus','#fff',14,null,3)+' Tambah</button>')+
  '<div class="field" style="margin-top:14px;height:46px;background:#15142A;border-color:#3A3859">'+ic('search','#A8A5C4',18)+'<input data-in="pSearch" style="color:#fff" type="text" value="'+esc(S.pq)+'" placeholder="Cari nama peserta" aria-label="Cari peserta"></div>'+
  '<div class="filters" style="margin-top:10px">'+['Semua','Organik','Non-Organik','Belum ikut'].map(function(f){ return '<button class="fchip'+(S.pf===f?' on':'')+'" style="'+(S.pf===f?'background:var(--purple);border-color:var(--purple)':'background:#15142A;border-color:#3A3859;color:#A8A5C4')+'" data-act="pFilter" data-arg="'+f+'">'+f+'</button>'; }).join('')+'</div></div>'+
  '<div class="body pad pb" style="padding-top:14px"><div class="col" style="gap:8px" id="plist">'+pList()+'</div></div>';
};
var SOALTAB = 1, QTIPE = 'pg';
R['admin-soal'] = function(){
  var L = SOALTAB===1 ? ADM.soal_l1 : ADM.soal_l2, c = ADM.pengaturan, pk = c['paket_l'+SOALTAB] || [], pat = c['paket_l'+SOALTAB+'_at'];
  var inP = function(q){ return pk.indexOf(q.id) >= 0; };
  var sorted = L.filter(inP).concat(L.filter(function(q){ return !inP(q) && aktifQ(q); }), L.filter(function(q){ return !aktifQ(q); }));
  var mix = {}; if(SOALTAB===1) ADM.soal_l1.filter(inP).forEach(function(q){ var t = tipeOf(q); mix[t] = (mix[t]||0)+1; });
  return admHead('Bank Soal','Semua peserta mendapat paket soal yang sama', '<button class="chip" style="background:var(--purple);color:#fff;padding:8px 12px" data-act="addQ">'+ic('plus','#fff',14,null,3)+' Tambah</button>')+
  '<div class="tabs2" style="margin-top:14px"><button class="'+(SOALTAB===1?'on':'')+'" data-act="soalTab" data-arg="1">Level 1 ('+nAktif(ADM.soal_l1)+'/'+ADM.soal_l1.length+')</button><button class="'+(SOALTAB===2?'on':'')+'" data-act="soalTab" data-arg="2">Level 2 ('+nAktif(ADM.soal_l2)+'/'+ADM.soal_l2.length+')</button></div></div>'+
  '<div class="body pad pb" style="padding-top:14px">'+
  '<p style="margin:0 0 10px;font-size:11px;color:#A8A5C4;line-height:1.6">Geser tombol untuk menyertakan atau mengecualikan soal. Soal nonaktif tidak dihapus dan bisa dinyalakan lagi kapan saja. Soal yang baru dinyalakan ikut terpilih saat paket diacak ulang.</p>'+
  '<div class="acard"><div class="row"><div class="grow"><b style="font-size:13px">Paket soal aktif Level '+SOALTAB+'</b><div style="font-size:11px;color:#A8A5C4;margin-top:3px;line-height:1.5">'+(pk.length?pk.length+' soal &middot; dibuat '+fmtDate(pat,true):'Belum dibuat. Paket otomatis dibuat saat peserta pertama mulai kuis.')+'</div>'+
    (SOALTAB===1 && pk.length ? '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:7px">'+Object.keys(mix).map(function(t){ return '<span class="lv-chip" style="background:#3A3859;color:#fff">'+TIPE[t].short+' '+mix[t]+'</span>'; }).join('')+'</div>' : '')+
    '</div><button class="chip" style="background:var(--yellow);color:#4A2800;padding:9px 12px;flex:0 0 auto" data-act="acakPaket">'+ic('refresh','#4A2800',14)+' Acak Ulang</button></div></div>'+
  '<div class="col" style="gap:8px;margin-top:12px">'+
  (sorted.length ? sorted.map(function(q){
    var used = inP(q), on = aktifQ(q);
    var title = SOALTAB===1 ? esc(q.item)+' <span style="color:#A8A5C4;font-weight:500">&rarr; '+esc(ansText(q, q.ans))+'</span>' : 'Kasus '+esc(q.who)+': '+esc(q.story).slice(0,90)+'&hellip;';
    var tp = SOALTAB===1 ? T(q.topic).title : (q.topics||[]).map(function(x){ return T(x).title; }).join(', ');
    return '<div class="qrow" style="'+(used?'box-shadow:0 0 0 1.5px var(--mint)':'')+(on?'':';opacity:.5')+'"><span class="grow">'+
      '<span style="display:flex;gap:5px;margin-bottom:5px;flex-wrap:wrap">'+(SOALTAB===1?'<span class="lv-chip" style="background:#3A3859;color:#fff">'+TIPE[tipeOf(q)].short.toUpperCase()+'</span>':'')+(used?'<span class="lv-chip" style="background:var(--mint);color:#04372A">DIPAKAI</span>':'')+(on?'':'<span class="lv-chip" style="background:#5A3A3A;color:#FFB4A0">NONAKTIF</span>')+'</span>'+
      '<b style="font-size:12px;line-height:1.5;display:block">'+title+'</b><span style="display:block;margin-top:4px;font-size:10.5px;color:#A8A5C4">Materi: '+tp+'</span></span>'+
      '<button class="sw'+(on?' on':'')+'" style="align-self:center" aria-label="'+(on?'Nonaktifkan':'Aktifkan')+' soal" data-act="togQ" data-arg="'+esc(q.id)+'"><i></i></button></div>'; }).join('')
   : '<div style="padding:14px;border-radius:14px;border:1px dashed #3A3859;font-size:11.5px;color:#A8A5C4;text-align:center">Belum ada soal.</div>')+'</div></div>';
};
R['admin-saran'] = function(){
  var L = ADM.saran;
  return admHead('Saran Peserta', L.length+' saran masuk')+'</div>'+
  '<div class="body pad pb" style="padding-top:14px"><div class="col" style="gap:8px">'+
  (L.length ? L.map(function(s){ return '<div class="qrow" style="flex-direction:column;gap:6px"><div class="row" style="gap:8px;width:100%"><b class="grow" style="font-size:12.5px">'+esc(s.nama||'-')+'</b>'+
    (s.rating?'<span style="font-size:11px;color:var(--yellow);font-weight:700">'+'&#9733;'.repeat(s.rating)+'</span>':'')+'</div>'+
    '<p style="margin:0;font-size:12.5px;line-height:1.6;color:#E4E2F5">'+esc(s.isi)+'</p><span style="font-size:10.5px;color:#A8A5C4">'+fmtDate(s.dibuat, true)+' &middot; '+esc(s.konteks||'-')+' &middot; '+esc(s.kategori||'')+'</span></div>'; }).join('')
   : '<div style="padding:14px;border-radius:14px;border:1px dashed #3A3859;font-size:11.5px;color:#A8A5C4;text-align:center">Belum ada saran masuk.</div>')+'</div></div>';
};

/* ================= SESSION ================= */
function clearSession(){ S.token = null; S.user = null; S.hasil = {1:null, 2:null}; QZ = null; RES = null; MOD = null; LS.del('celengan_token'); }
function applyProfil(p){
  S.user = {nama:p.nama, kategori:p.kategori, pin_default:p.pin_default};
  S.hasil = {1:null, 2:null}; (p.hasil||[]).forEach(function(h){ S.hasil[h.level] = h; });
  loadProg();
}
function loadConfig(){ return API.config().then(function(c){ c.buka = c.buka || {}; S.cfg = {n1:c.n1, n2:c.n2, buka:{1:!!c.buka[1] || !!c.buka['1'], 2:!!c.buka[2] || !!c.buka['2']},
  periode_mulai:c.periode_mulai, periode_selesai:c.periode_selesai, topik_sembunyi:c.topik_sembunyi||[], topik_kategori:c.topik_kategori||{}}; }); }
function refreshMe(){ return Promise.all([loadConfig(), API.profil(S.token).then(applyProfil)]); }
function loadAdm(){ return API.adminRingkasan(ATOK).then(function(d){ ADM = d; ADM.pengaturan.topik_sembunyi = ADM.pengaturan.topik_sembunyi || []; ADM.pengaturan.topik_kategori = ADM.pengaturan.topik_kategori || {}; }); }
function admDo(p, okMsg){ busy(true); return p.then(loadAdm).then(function(){ busy(false); closeSheet(); refresh(); if(okMsg) toast(okMsg); }, function(e){ if(e && e.code!=='SESI_HABIS' && $('modal').classList.contains('on')){ busy(false); var er = document.querySelector('#sheet .err'); if(er){ er.textContent = msg(e); return; } } fail(e); }); }
function startQuizFlow(n){
  busy(true);
  API.mulaiKuis(S.token, n).then(function(d){
    busy(false);
    QZ = {lv:n, items:d.items, i:0, ans:[], picks:[], pick:null, sel:null, sending:false};
    var jw = d.jawaban || {}, resumed = 0;
    Object.keys(jw).forEach(function(k){ QZ.ans[+k] = jw[k]; resumed++; });
    while(QZ.i < QZ.items.length && QZ.ans[QZ.i]) QZ.i++;
    stack = ['beranda','quiz-level'];
    if(QZ.i >= QZ.items.length){ QZ.i = QZ.items.length-1; finishQuiz(); return; }
    show(n===1?'quiz-l1':'quiz-l2');
    if(resumed) toast(resumed+' jawaban sebelumnya tetap tersimpan. Lanjut dari soal '+(QZ.i+1)+'.');
  }, function(e){ fail(e); if(e.code==='SUDAH_DIKERJAKAN') quiet(refreshMe().then(refresh)); });
}
function finishQuiz(){
  if(!QZ || QZ.sending) return; QZ.sending = true; busy(true);
  API.selesaiKuis(S.token, QZ.lv, QZ.lv===2 ? QZ.picks : []).then(function(r){
    busy(false); RES = r; REVI = 0;
    S.hasil[r.level] = {level:r.level, skor:r.skor, benar:r.benar, total:r.total, durasi_detik:r.durasi_detik, submitted_at:r.submitted_at};
    QZ = null; stack = ['beranda','quiz-level']; show('quiz-hasil');
  }, function(e){
    busy(false); QZ.sending = false;
    if(e.code==='JARINGAN' || e.code==='SERVER'){
      openSheet('<h2 style="font-size:19px">Jawaban belum terkirim</h2><p style="font-size:13px;color:var(--muted);line-height:1.6">'+msg(e)+' Jawabanmu masih tersimpan di layar ini, jangan tutup aplikasinya.</p>'+
        '<button class="btn btn-p" style="margin-top:14px" data-act="retryFinish">Coba Kirim Lagi</button>');
    } else { fail(e); QZ = null; quiet(refreshMe().then(function(){ root('quiz-level'); })); }
  });
}

/* ================= EXPORT ================= */
function loadXLSX(){
  if(window.XLSX) return Promise.resolve(window.XLSX);
  return new Promise(function(res, rej){ var s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    s.onload = function(){ window.XLSX ? res(window.XLSX) : rej(new Error('x')); }; s.onerror = rej; document.head.appendChild(s); });
}
function exportRows(){
  var rekap = [['Nama','Kategori','Skor L1','Tanggal L1','Durasi L1 (menit)','Skor L2','Tanggal L2','Durasi L2 (menit)','Status']].concat(ADM.peserta.map(function(p){
    return [p.nama, p.kategori, p.l1, p.l1_at?fmtDate(p.l1_at,true):'', p.l1_durasi!=null?Math.round(p.l1_durasi/6)/10:'', p.l2, p.l2_at?fmtDate(p.l2_at,true):'', p.l2_durasi!=null?Math.round(p.l2_durasi/6)/10:'',
      p.l1!=null&&p.l2!=null?'Selesai L1 & L2':p.l1!=null||p.l2!=null?'Sebagian':'Belum ikut']; }));
  var lb = [['Peringkat','Nama','Kategori','Skor L1','Skor L2','Kecepatan','Skor Akhir','Selesai']].concat(ADM.leaderboard.map(function(r){
    return [r.peringkat, r.nama, r.kategori, r.l1, r.l2, r.kecepatan, r.skor_akhir, fmtDate(r.selesai_at,true)]; }));
  var sr = [['Tanggal','Nama','Kategori','Konteks','Rating','Saran']].concat(ADM.saran.map(function(s){ return [fmtDate(s.dibuat,true), s.nama, s.kategori, s.konteks, s.rating, s.isi]; }));
  return {rekap:rekap, lb:lb, saran:sr};
}
function download(name, blob){ var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500); }
function doExport(){
  var d = exportRows(), stamp = new Date().toISOString().slice(0,10);
  busy(true);
  loadXLSX().then(function(X){
    var wb = X.utils.book_new();
    [['Rekap Peserta',d.rekap],['Leaderboard',d.lb],['Saran',d.saran]].forEach(function(s){ var ws = X.utils.aoa_to_sheet(s[1]); ws['!cols'] = s[1][0].map(function(h,i){ return {wch: i===0 && s[0]!=='Leaderboard' ? 28 : Math.max(12, String(h).length+2)}; }); X.utils.book_append_sheet(wb, ws, s[0]); });
    X.writeFile(wb, 'Rekap_CELENGAN_'+stamp+'.xlsx'); busy(false); toast('Rekap Excel diunduh.');
  }, function(){
    busy(false);
    var csv = d.rekap.map(function(r){ return r.map(function(v){ v = v==null?'':String(v); return /[",;\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; }).join(';'); }).join('\r\n');
    download('Rekap_CELENGAN_'+stamp+'.csv', new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8'}));
    toast('Pustaka Excel tidak termuat, rekap diunduh sebagai CSV.');
  });
}

/* ================= ACTIONS ================= */
var SARAN = {rating:0, konteks:''};
var A = {
  go: function(el, a){ show(a); },
  tab: function(el, a){ if(QZ){ QZ = null; } root(a); },
  undo: function(){ if(undoFn){ undoFn(); undoFn = null; } $('toast').classList.remove('on'); },
  toLogin: function(){
    if(S.roster.length){ show('login-kategori'); return; }
    call(API.roster(), function(r){ S.roster = r || []; show('login-kategori'); });
  },
  pickCat: function(el, a){ S.loginCat = a; S.loginQ = ''; S.sel = ''; show('login-nama'); },
  selName: function(el, a){ S.sel = a; S.loginQ = a; var c = $('cari'); if(c){ c.value = a; c.blur(); } paintNames(); },
  toPin: function(el){ if(!S.sel){ el.classList.add('shake'); setTimeout(function(){el.classList.remove('shake');},400); toast('Ketik lalu pilih namamu dari daftar.'); return; } show('login-pin'); },
  key: function(el, k){
    if(k==='del') pin.pop(); else if(pin.length < 4) pin.push(k);
    paintPin(); $('pinerr').textContent = '';
    if(pin.length === 4) setTimeout(A.pinSubmit, 200);
  },
  forgot: function(){ toast('Minta admin mereset PIN lewat Panel Super Admin. PIN akan kembali ke 1234.'); },
  pinSubmit: function(){
    if(pin.length < 4){ $('pinerr').textContent = 'Masukkan 4 digit PIN.'; return; }
    if(A._logging) return; A._logging = true; busy(true);
    API.login(S.sel, pin.join('')).then(function(r){
      S.token = r.token; LS.set('celengan_token', r.token);
      return refreshMe();
    }).then(function(){
      A._logging = false; busy(false); root('beranda'); toast('Selamat datang, '+esc(firstName(S.user.nama))+'!');
      if(S.user.pin_default) setTimeout(function(){
        openSheet('<h2 style="font-size:19px">Ganti PIN awal dulu, yuk</h2><p style="font-size:13px;color:var(--muted);line-height:1.6">Kamu masih memakai PIN awal 1234 yang diketahui semua orang. Ganti dengan PIN pribadi supaya hasil kuismu aman.</p>'+
          '<div class="col" style="gap:10px;margin-top:14px"><button class="btn btn-p" data-act="changePin">Ganti PIN Sekarang</button><button class="btn btn-ghost btn-sm" data-act="closeSheet">Nanti saja</button></div>');
      }, 500);
    }).catch(function(e){
      A._logging = false; busy(false);
      if(e.code==='PIN_SALAH' || e.code==='TERKUNCI'){ var d=$('pindots'); if(d){ d.classList.add('shake'); $('pinerr').textContent = msg(e); setTimeout(function(){ d.classList.remove('shake'); pin=[]; paintPin(); }, 420); } }
      else { pin = []; paintPin(); fail(e); }
    });
  },
  tfilter: function(el, a){ S.tf = a; refresh(); },
  openTopic: function(el, a){ S.curTopic = a; S.prog._last = a; saveProg(); QZ = null; show('belajar-materi'); },
  startMode: function(el, m){
    var tid = MOD && stack[stack.length-1]==='modul-selesai' ? MOD.tid : S.curTopic;
    S.curTopic = tid; MOD = {tid:tid, mode:m, mi:0, mfAns:[], pick:null};
    var target = m==='baca' ? 'modul-baca' : m==='mf' ? 'modul-mf' : 'modul-pilih';
    if(stack[stack.length-1]==='modul-selesai') show(target, 'replace'); else show(target);
  },
  exitMod: function(){ stack = ['beranda','belajar-topik','belajar-materi']; show('belajar-materi', false); },
  doneBaca: function(){ MOD = {tid:S.curTopic, mode:'baca', mi:0, mfAns:[], pick:null}; markMode(S.curTopic, 'baca'); show('modul-selesai', 'replace'); },
  mf: function(el, a){ var card = $('mcard'); if(!card) return; card.style.transition = 'transform .25s'; card.style.transform = 'translateX('+(a==='f'?500:-500)+'px) rotate('+(a==='f'?20:-20)+'deg)'; setTimeout(function(){ answerMF(a); }, 180); },
  nextMF: function(){ MOD.mi++; if(MOD.mi < MODUL[MOD.tid].mf.length) show('modul-mf', 'replace'); else { markMode(MOD.tid, 'mf'); show('modul-selesai', 'replace'); } },
  cpick: function(el, a){ MOD.pick = +a; refresh(); },
  donePilih: function(){ markMode(MOD.tid, 'pilih'); show('modul-selesai', 'replace'); },
  peekTopic: function(el, a){
    var t = T(a);
    openSheet('<div class="row" style="gap:12px">'+thumb(t.img,70,52)+'<div class="grow"><div class="label">MATERI</div><h2 style="font-size:18px;margin-top:3px">'+t.title+'</h2></div></div>'+
      '<p style="font-size:13px;color:var(--muted);line-height:1.65">'+t.desc+'</p><div class="col" style="gap:8px">'+t.sets.map(function(s){ return s.cards.map(function(c){ return '<div class="qtile"><b style="font-size:12.5px;display:block">'+strip(c.q)+'</b><span style="display:block;margin-top:5px;font-size:12px;color:var(--muted);line-height:1.6">'+c.a+'</span></div>'; }).join(''); }).join('')+'</div>'+
      '<button class="btn btn-p" style="margin-top:16px" data-act="closeSheet">Kembali ke Kuis</button>');
  },
  closeSheet: function(){ closeSheet(); },
  levelTap: function(el, a){
    var n = +a, inf = lvInfo(n);
    if(inf.done){ A.review(null, n); return; }
    if(!inf.can){ toast(inf.note); return; }
    CT = {lv:n, res:{}, sel:{}}; show('quiz-contoh');
  },
  readyQuiz: function(){
    var n = CT.lv, cnt = lvCount(n);
    openSheet('<div class="row" style="gap:12px">'+avatar(n,50,n===1?'var(--pink)':'var(--purple)','#fff',17)+'<div class="grow"><div class="label">LEVEL '+n+'</div><h2 style="font-size:20px;margin-top:2px">'+lvName(n)+'</h2></div></div>'+
      '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:16px">'+
      [[cnt,'soal'],['Bebas','tanpa timer'],['1x','kesempatan']].map(function(x){ return '<div class="stat" style="background:var(--sand)"><b>'+x[0]+'</b><span style="color:var(--muted)">'+x[1]+'</span></div>'; }).join('')+'</div>'+
      '<div class="warnbox">'+ic('info','#C2410C',17)+'<span>Hanya <b>1 kali kesempatan</b> dan skor langsung final setelah dikumpulkan. '+(n===1?'Setiap jawaban yang dikunci langsung tersimpan. Kalau keluar di tengah, kamu lanjut dari soal berikutnya.':'Kalau keluar di tengah, pilihanmu belum tersimpan dan kuis bisa dimulai lagi dari awal.')+'</span></div>'+
      '<button class="btn '+(n===1?'btn-o':'btn-p')+'" style="margin-top:16px;'+(n===1?'background:var(--pink);box-shadow:0 5px 0 var(--pink-d)':'')+'" data-act="startQuiz" data-arg="'+n+'">Mulai Kuis Sekarang</button>');
  },
  demoSel: function(el, k){ var key = +el.getAttribute('data-key'); CT.sel[key] = +k; refresh(); },
  demoLock: function(el){ var key = +el.getAttribute('data-key');
    if(CT.sel[key] == null){ toast('Pilih salah satu jawaban dulu.'); return; }
    if(CT.lv===2) CT.res[0] = {ok: CT.sel[0]===CONTOH2.ok}; else CT.res[key] = {ok: String(CT.sel[key])===CONTOH1[key].ans};
    refresh(); },
  demoAns: function(el, k){ var key = +el.getAttribute('data-key'); CT.res[key] = {ok: k===CONTOH1[key].ans}; refresh(); },
  startQuiz: function(el, a){ closeSheet(); startQuizFlow(+a); },
  answer: function(el, k){
    if(!QZ || QZ.busy) return; QZ.busy = true;
    Array.prototype.forEach.call(document.querySelectorAll('#quiz-l1 button'), function(b){ b.disabled = true; });
    busy(true);
    API.jawabL1(S.token, QZ.i, String(k)).then(function(r){ busy(false); QZ.busy = false; QZ.sel = null; QZ.ans[QZ.i] = r; show('quiz-feedback', 'replace'); },
      function(e){ QZ.busy = false; Array.prototype.forEach.call(document.querySelectorAll('#quiz-l1 button'), function(b){ b.disabled = false; }); fail(e); });
  },
  selAns: function(el, k){ QZ.sel = +k; refresh(); },
  lockAns: function(el){ if(QZ.sel == null){ toast('Pilih salah satu jawaban dulu.'); return; } A.answer(el, QZ.sel); },
  nextQ: function(){ if(!QZ) return; if(QZ.i >= QZ.items.length-1) finishQuiz(); else { QZ.i++; show('quiz-l1', 'replace'); } },
  pickOpt: function(el, a){ QZ.pick = +a; Array.prototype.forEach.call(el.parentNode.children, function(o){ o.classList.remove('sel'); }); el.classList.add('sel'); var b = document.querySelector('[data-act=submitL2]'); if(b) b.style.opacity = 1; },
  submitL2: function(){
    if(QZ.pick == null){ toast('Pilih salah satu jawaban dulu.'); return; }
    QZ.picks[QZ.i] = QZ.pick; QZ.pick = null;
    if(QZ.i >= QZ.items.length-1) finishQuiz(); else { QZ.i++; show('quiz-l2', 'replace'); }
  },
  retryFinish: function(){ closeSheet(); finishQuiz(); },
  quitQuiz: function(){
    openSheet('<h2 style="font-size:19px">Keluar dari kuis?</h2><p style="font-size:13px;color:var(--muted);line-height:1.6">'+(QZ && QZ.lv===1 ? 'Jawaban yang sudah kamu kunci tetap tersimpan. Saat kembali, kamu lanjut dari soal berikutnya. Skor baru dihitung setelah semua soal dijawab.' : 'Pilihanmu di kuis ini belum tersimpan dan belum dihitung. Kamu bisa memulai lagi dari awal kapan saja.')+'</p>'+
      '<div class="col" style="gap:10px;margin-top:14px"><button class="btn btn-p" data-act="closeSheet">Lanjutkan Kuis</button><button class="btn btn-ghost btn-sm" data-act="exitQuiz">Keluar</button></div>');
  },
  exitQuiz: function(){ QZ = null; closeSheet(); root('quiz-level'); },
  openReview: function(){ REVI = 0; show('quiz-review'); },
  review: function(el, a){ var n = +a; call(API.pembahasan(S.token, n), function(r){ RES = r; REVI = 0; show('quiz-review'); }); },
  revGo: function(el, a){ var i = +a; if(i<0 || !RES || i>=RES.review.length) return; REVI = i; refresh(); },
  gl: function(el){ el.classList.toggle('on'); },
  gcat: function(el, a){ S.gcat = a; refresh(); },
  saran: function(el, k){
    SARAN = {rating:0, konteks:k||'umum'};
    openSheet('<h2 style="font-size:19px">Kirim saran untuk CELENGAN</h2><p style="font-size:12.5px;color:var(--muted);line-height:1.6;margin:6px 0 0">Ceritakan apa yang sudah bagus, apa yang membingungkan, atau fitur yang kamu inginkan.</p>'+
      '<label class="flabel">Seberapa puas kamu? (opsional)</label><div class="stars" id="stars">'+[1,2,3,4,5].map(function(i){ return '<button data-act="star" data-arg="'+i+'" aria-label="'+i+' bintang">'+ic('star','#C9A227',22,'none',1.8)+'</button>'; }).join('')+'</div>'+
      '<label class="flabel" for="sr">Saran atau masukan</label><textarea class="inp" id="sr" maxlength="2000" style="height:110px" placeholder="Tulis saranmu di sini"></textarea>'+
      '<div class="err" id="srerr"></div><button class="btn btn-p" style="margin-top:6px" data-act="sendSaran">Kirim</button>');
  },
  star: function(el, a){ SARAN.rating = +a; Array.prototype.forEach.call($('stars').children, function(b, i){ var on = i < SARAN.rating; b.classList.toggle('on', on); b.innerHTML = ic('star','#C9A227',22,on?'#FFC53D':'none',1.8); }); },
  sendSaran: function(){
    var v = $('sr').value.trim(); if(v.length < 3){ $('srerr').textContent = 'Tulis saran minimal 3 karakter.'; return; }
    call(API.kirimSaran(S.token, SARAN.konteks, SARAN.rating || null, v), function(){ closeSheet(); toast('Terima kasih! Saranmu sudah terkirim ke admin.'); });
  },
  changePin: function(){
    openSheet('<h2 style="font-size:19px">Ganti PIN</h2><label class="flabel">PIN lama</label><input class="inp" id="p0" type="password" inputmode="numeric" maxlength="4" placeholder="4 digit">'+
      '<label class="flabel">PIN baru</label><input class="inp" id="p1" type="password" inputmode="numeric" maxlength="4" placeholder="4 digit"><label class="flabel">Ulangi PIN baru</label><input class="inp" id="p2" type="password" inputmode="numeric" maxlength="4" placeholder="4 digit">'+
      '<div class="err" id="perr"></div><button class="btn btn-p" style="margin-top:6px" data-act="savePin">Simpan PIN</button>');
  },
  savePin: function(){
    var o = $('p0').value, a = $('p1').value, b = $('p2').value, e = $('perr');
    if(!/^\d{4}$/.test(a)){ e.textContent = 'PIN baru harus 4 angka.'; return; }
    if(a === '1234'){ e.textContent = 'Pilih PIN selain 1234.'; return; }
    if(a !== b){ e.textContent = 'Ulangi PIN baru belum sama.'; return; }
    busy(true);
    API.gantiPin(S.token, o, a).then(function(){ busy(false); S.user.pin_default = false; closeSheet(); refresh(); toast('PIN berhasil diganti. Pakai PIN baru saat masuk berikutnya.'); },
      function(x){ busy(false); if(x.code==='SESI_HABIS') fail(x); else e.textContent = msg(x); });
  },
  logout: function(){
    openSheet('<h2 style="font-size:19px">Keluar dari CELENGAN?</h2><p style="font-size:13px;color:var(--muted);line-height:1.6">Hasil kuismu tetap tersimpan di server.</p>'+
      '<div class="col" style="gap:10px;margin-top:14px"><button class="btn btn-o" data-act="doLogout">Keluar</button><button class="btn btn-ghost btn-sm" data-act="closeSheet">Batal</button></div>');
  },
  doLogout: function(){ quiet(API.keluar(S.token)); clearSession(); S.sel = ''; S.loginQ = ''; stack = ['splash']; show('splash', false); },

  /* ---- admin ---- */
  adminLogin: function(){
    var u = ($('au')||{}).value, p = ($('ap')||{}).value, e = $('aerr');
    if(!u || !p){ e.textContent = 'Isi username dan password.'; return; }
    busy(true);
    API.loginAdmin(u, p).then(function(r){ ATOK = r.token; SS.set('celengan_admin', r.token); return loadAdm(); })
      .then(function(){ busy(false); stack = ['admin']; show('admin', false); toast('Masuk sebagai admin.'); })
      .catch(function(x){ busy(false); e.textContent = msg(x); var b = $('ap'); if(b){ b.value = ''; b.classList.add('shake'); setTimeout(function(){ b.classList.remove('shake'); }, 400); } });
  },
  adminOut: function(){ quiet(API.keluar(ATOK)); ATOK = null; ADM = null; SS.del('celengan_admin'); stack = ['splash']; show('splash', false); },
  admReload: function(){ admDo(Promise.resolve(), 'Data diperbarui.'); },
  savePeriode: function(){
    var m = $('pm').value, s = $('ps').value;
    if((m && !s) || (!m && s)){ toast('Isi tanggal mulai dan selesai, atau kosongkan keduanya.'); return; }
    if(m && s && s < m){ toast('Tanggal selesai harus setelah tanggal mulai.'); return; }
    admDo(API.adminAtur(ATOK, {periode_mulai:m, periode_selesai:s}), m ? 'Periode kuis disimpan.' : 'Periode kuis dikosongkan.');
  },
  step: function(el, a){
    var p = a.split(':'), k = p[0], d = +p[1], c = ADM.pengaturan;
    var max = k==='n1' ? nAktif(ADM.soal_l1) : nAktif(ADM.soal_l2), min = k==='n1' ? 4 : 3;
    var v = Math.max(min, Math.min(max, c[k] + d));
    if(v === c[k]){ toast('Batas '+(d>0?'maksimal (jumlah soal aktif)':'minimal')+' tercapai.'); return; }
    var patch = {}; patch[k] = v; admDo(API.adminAtur(ATOK, patch));
  },
  sw: function(el, a){ var v = !ADM.pengaturan[a], patch = {}; patch[a] = v; admDo(API.adminAtur(ATOK, patch), (a==='buka_l1'?'Level 1':'Level 2')+(v?' dibuka':' ditutup')+' untuk peserta.'); },
  toggleVis: function(el, a){
    var h = (ADM.pengaturan.topik_sembunyi || []).slice(), i = h.indexOf(a);
    if(i < 0){ if(TOPICS.length - h.length <= 1){ toast('Minimal satu topik harus tampil.'); return; } h.push(a); } else h.splice(i,1);
    admDo(API.adminAtur(ATOK, {topik_sembunyi:h}), T(a).title+(i<0?' disembunyikan dari peserta.':' ditampilkan lagi.'));
  },
  toggleCat: function(el, a){
    var k = JSON.parse(JSON.stringify(ADM.pengaturan.topik_kategori || {})), t = T(a), cur = k[a] || t.cat;
    k[a] = cur==='wajib' ? 'opsional' : 'wajib';
    admDo(API.adminAtur(ATOK, {topik_kategori:k}), t.title+' sekarang jadi '+(k[a]==='wajib'?'materi utama':'materi tambahan')+'.');
  },
  pFilter: function(el, a){ S.pf = a; refresh(); },
  pMenu: function(el, nama){
    var r = ADM.peserta.filter(function(x){ return x.nama===nama; })[0]; if(!r) return;
    var e = esc(nama);
    openSheet('<div class="label" style="color:#A8A5C4">KELOLA PESERTA</div><h2 style="font-size:19px;margin-top:4px">'+e+'</h2><p style="margin:4px 0 0;font-size:12px;color:#A8A5C4">'+r.kategori+' &middot; L1: '+(r.l1!=null?r.l1+' ('+fmtDate(r.l1_at,true)+')':'belum')+' &middot; L2: '+(r.l2!=null?r.l2+' ('+fmtDate(r.l2_at,true)+')':'belum')+'</p>'+
      '<div class="col" style="gap:9px;margin-top:16px">'+
      '<button class="btn btn-sm" style="background:#3A3859;color:#fff" data-act="resetPin" data-arg="'+e+'">Reset PIN ke 1234</button>'+
      (r.l1!=null?'<button class="btn btn-sm" style="background:#5C1F3A;color:#fff" data-act="reopen" data-arg="'+e+'|1">Buka ulang Kuis Level 1</button>':'')+
      (r.l2!=null?'<button class="btn btn-sm" style="background:#3A2A7A;color:#fff" data-act="reopen" data-arg="'+e+'|2">Buka ulang Kuis Level 2</button>':'')+
      (r.l1!=null&&r.l2!=null?'<button class="btn btn-sm" style="background:#3A3859;color:#fff" data-act="reopen" data-arg="'+e+'|0">Buka ulang kedua level</button>':'')+
      '<button class="btn btn-sm" style="background:transparent;color:#FF8A3D;border:1px solid #5A3A3A" data-act="delP" data-arg="'+e+'">Nonaktifkan peserta</button></div>'+
      '<p style="margin:12px 0 0;font-size:10.5px;color:#A8A5C4;line-height:1.6">Buka ulang akan menghapus skor level tersebut, sehingga peserta bisa mengerjakan lagi dari awal.</p>', true);
  },
  resetPin: function(el, a){ admDo(API.adminResetPin(ATOK, a), 'PIN '+esc(a)+' direset ke 1234.'); },
  reopen: function(el, a){
    var p = a.split('|'), n = p[0], lv = +p[1];
    openSheet('<h2 style="font-size:19px">Buka ulang kesempatan kuis?</h2><p style="font-size:13px;color:#A8A5C4;line-height:1.6">Skor '+(lv?'Level '+lv:'Level 1 dan Level 2')+' milik <b style="color:#fff">'+esc(n)+'</b> akan dihapus permanen, lalu peserta bisa mengerjakan ulang.</p>'+
      '<div class="col" style="gap:10px;margin-top:14px"><button class="btn btn-sm" style="background:var(--orange-b);color:#3A1F00" data-act="doReopen" data-arg="'+esc(a)+'">Ya, buka ulang</button><button class="btn btn-sm" style="background:#3A3859;color:#fff" data-act="closeSheet">Batal</button></div>', true);
  },
  doReopen: function(el, a){ var p = a.split('|'); admDo(API.adminBukaKuis(ATOK, p[0], +p[1] || null), 'Kesempatan kuis '+esc(p[0])+' dibuka lagi.'); },
  delP: function(el, a){ admDo(API.adminHapusPeserta(ATOK, a), esc(a)+' dinonaktifkan. Tambahkan lagi dengan nama yang sama untuk mengaktifkan.'); },
  addP: function(){
    openSheet('<h2 style="font-size:19px">Tambah peserta</h2><label class="flabel">Nama lengkap</label><input class="inp" id="pn" placeholder="Nama peserta">'+
      '<label class="flabel">Kategori</label><div class="seg" id="pc"><button class="on" data-act="seg">Organik</button><button data-act="seg">Non-Organik</button></div>'+
      '<div class="err" id="pe"></div><button class="btn btn-p" style="margin-top:6px" data-act="saveP">Tambahkan</button>', true);
  },
  seg: function(el){ Array.prototype.forEach.call(el.parentNode.children, function(b){ b.classList.toggle('on', b===el); }); },
  saveP: function(){
    var n = $('pn').value.trim();
    if(n.length < 3){ $('pe').textContent = 'Isi nama minimal 3 huruf.'; return; }
    var c = $('pc').children[1].classList.contains('on') ? 'Non-Organik' : 'Organik';
    admDo(API.adminTambahPeserta(ATOK, n, c), esc(n)+' ditambahkan dengan PIN awal 1234.').then(function(){ S.roster = []; });
  },
  soalTab: function(el, a){ SOALTAB = +a; refresh(); },
  addQ: function(el, tp){
    var opts = TOPICS.map(function(t){ return '<option value="'+t.id+'">'+t.title+'</option>'; }).join('');
    if(SOALTAB===1){
      tp = tp || QTIPE; QTIPE = tp;
      var f = '';
      if(tp==='basket') f = '<label class="flabel">Kartu (produk atau keputusan keuangan)</label><input class="inp" id="q_item" placeholder="Contoh: Asuransi Kesehatan">'+
        '<label class="flabel">Keranjang yang benar</label><select class="inp" id="q_ans">'+BASKETS.map(function(b){ return '<option value="'+b.k+'">'+b.name+'</option>'; }).join('')+'</select>';
      else if(tp==='bs') f = '<label class="flabel">Pernyataan</label><textarea class="inp" id="q_item" placeholder="Contoh: Unit link memberikan hasil investasi yang dijamin."></textarea>'+
        '<label class="flabel">Jawaban benar</label><div class="seg" id="q_okbs"><button class="on" data-act="seg">Benar</button><button data-act="seg">Salah</button></div>';
      else f = '<label class="flabel">Pertanyaan</label><textarea class="inp" id="q_item"></textarea>'+
        ['A','B','C','D'].map(function(k,i){ return '<label class="flabel">Pilihan '+k+'</label><input class="inp" id="q_o'+i+'"'+(tp==='hitung'?' placeholder="Contoh: Rp1.000.000"':'')+'>'; }).join('')+
        '<label class="flabel">Jawaban benar</label><div class="seg" id="q_ok">'+['A','B','C','D'].map(function(k,i){ return '<button class="'+(i===0?'on':'')+'" data-act="seg">'+k+'</button>'; }).join('')+'</div>';
      openSheet('<h2 style="font-size:19px">Tambah soal Level 1</h2>'+
        '<label class="flabel">Tipe soal</label><div class="seg" style="flex-wrap:wrap">'+['basket','pg','bs','hitung'].map(function(t){ return '<button class="'+(t===tp?'on':'')+'" data-act="addQ" data-arg="'+t+'" style="font-size:11px">'+({basket:'Keranjang',pg:'Pilihan ganda',bs:'Benar/Salah',hitung:'Hitung'})[t]+'</button>'; }).join('')+'</div>'+
        f+'<label class="flabel">Materi rujukan</label><select class="inp" id="q_topic">'+opts+'</select>'+
        '<label class="flabel">Penjelasan (muncul jika benar)</label><textarea class="inp" id="q_why"></textarea>'+
        '<label class="flabel">Petunjuk (muncul jika salah)</label><textarea class="inp" id="q_hint"></textarea>'+
        '<div class="err" id="qerr"></div><button class="btn btn-p" style="margin-top:6px" data-act="saveQ">Simpan ke Bank Soal</button>', true);
    } else {
      openSheet('<h2 style="font-size:19px">Tambah kasus Level 2</h2>'+
        '<label class="flabel">Nama tokoh</label><input class="inp" id="q_who" placeholder="Contoh: Sari">'+
        '<label class="flabel">Cerita kasus</label><textarea class="inp" id="q_story"></textarea>'+
        '<label class="flabel">Pertanyaan</label><input class="inp" id="q_ask" value="Langkah paling tepat adalah:">'+
        ['A','B','C','D'].map(function(k,i){ return '<label class="flabel">Pilihan '+k+(i>1?' (opsional)':'')+'</label><input class="inp" id="q_o'+i+'">'; }).join('')+
        '<label class="flabel">Jawaban benar</label><div class="seg" id="q_ok">'+['A','B','C','D'].map(function(k,i){ return '<button class="'+(i===0?'on':'')+'" data-act="seg">'+k+'</button>'; }).join('')+'</div>'+
        '<label class="flabel">Materi rujukan</label><select class="inp" id="q_topic">'+opts+'</select>'+
        '<label class="flabel">Pembahasan</label><textarea class="inp" id="q_why"></textarea>'+
        '<label class="flabel">Petunjuk</label><textarea class="inp" id="q_hint"></textarea>'+
        '<div class="err" id="qerr"></div><button class="btn btn-p" style="margin-top:6px" data-act="saveQ">Simpan ke Bank Soal</button>', true);
    }
  },
  saveQ: function(){
    var v = function(id){ var e = $(id); return e ? e.value.trim() : ''; }, e = $('qerr'), d;
    if(SOALTAB===1){
      var tp = QTIPE, idx = function(id){ var r = 0; Array.prototype.forEach.call($(id).children, function(b,i){ if(b.classList.contains('on')) r = i; }); return r; };
      d = {tipe:tp, item:v('q_item'), topic:v('q_topic'), why:v('q_why'), hint:v('q_hint')};
      if(tp==='basket') d.ans = v('q_ans');
      else if(tp==='bs') d.ans = idx('q_okbs')===0 ? 'benar' : 'salah';
      else { d.opts = [0,1,2,3].map(function(i){ return v('q_o'+i); }); d.ans = String(idx('q_ok'));
        if(d.opts.some(function(x){ return !x; })){ e.textContent = 'Isi keempat pilihan jawaban.'; return; } }
      if(d.item.length < 3 || d.why.length < 10 || d.hint.length < 5){ e.textContent = 'Lengkapi soal, penjelasan, dan petunjuk.'; return; }
    } else {
      var o = [0,1,2,3].map(function(i){ return v('q_o'+i); }), ok = 0;
      Array.prototype.forEach.call($('q_ok').children, function(b,i){ if(b.classList.contains('on')) ok = i; });
      while(o.length > 2 && !o[o.length-1]) o.pop();
      d = {who:v('q_who'), story:v('q_story'), ask:v('q_ask'), opts:o, ok:ok, topics:[v('q_topic')], why:v('q_why'), hint:v('q_hint')};
      if(!d.who || d.story.length < 20 || !d.ask || o.some(function(x){ return !x; }) || d.why.length < 10 || d.hint.length < 5){ e.textContent = 'Lengkapi tokoh, cerita, pilihan A dan B, pembahasan, dan petunjuk.'; return; }
      if(ok >= o.length){ e.textContent = 'Jawaban benar harus salah satu pilihan yang terisi.'; return; }
    }
    admDo(API.adminSoalSimpan(ATOK, SOALTAB, d), 'Soal ditambahkan ke Level '+SOALTAB+'.');
  },
  acakPaket: function(){
    openSheet('<h2 style="font-size:19px">Acak ulang paket soal Level '+SOALTAB+'?</h2><p style="font-size:13px;color:#A8A5C4;line-height:1.6">Semua peserta yang mulai setelah ini akan mendapat paket soal baru dari soal yang aktif. Peserta yang sedang mengerjakan (belum mengumpulkan) akan mulai ulang dengan paket baru. Hasil yang sudah dikumpulkan tidak berubah.</p>'+
      '<p style="font-size:12px;color:var(--yellow);line-height:1.6">Saran: acak ulang sebelum periode kuis dimulai agar semua peserta mendapat soal yang sama.</p>'+
      '<div class="col" style="gap:10px;margin-top:14px"><button class="btn btn-sm" style="background:var(--yellow);color:#4A2800" data-act="doAcak">Ya, acak ulang</button><button class="btn btn-sm" style="background:#3A3859;color:#fff" data-act="closeSheet">Batal</button></div>', true);
  },
  doAcak: function(){ admDo(API.adminAcakPaket(ATOK, SOALTAB), 'Paket soal Level '+SOALTAB+' sudah diacak ulang.'); },
  togQ: function(el, id){
    var L = SOALTAB===1 ? ADM.soal_l1 : ADM.soal_l2, q = L.filter(function(x){ return x.id===id; })[0]; if(!q) return;
    var on = !aktifQ(q), pk = ADM.pengaturan['paket_l'+SOALTAB] || [];
    if(!on && pk.indexOf(id) >= 0){
      openSheet('<h2 style="font-size:19px">Nonaktifkan soal yang sedang dipakai?</h2><p style="font-size:13px;color:#A8A5C4;line-height:1.6">Soal ini ada di paket aktif Level '+SOALTAB+'. Soal akan diganti otomatis dengan soal aktif lain'+(SOALTAB===1?' bertipe sama':'')+'. Peserta yang sedang mengerjakan (belum mengumpulkan) akan mulai ulang. Hasil yang sudah dikumpulkan tidak berubah.</p>'+
        '<div class="col" style="gap:10px;margin-top:14px"><button class="btn btn-sm" style="background:var(--orange-b);color:#3A1F00" data-act="doTogQ" data-arg="'+esc(id)+'|0">Nonaktifkan &amp; ganti</button><button class="btn btn-sm" style="background:#3A3859;color:#fff" data-act="closeSheet">Batal</button></div>', true);
      return;
    }
    A.doTogQ(el, id+'|'+(on?1:0));
  },
  doTogQ: function(el, a){
    var p = a.split('|'), id = p[0], on = p[1]==='1';
    if(!on){ var L = SOALTAB===1 ? ADM.soal_l1 : ADM.soal_l2; if(nAktif(L) - 1 < (SOALTAB===1?4:3)){ closeSheet(); toast('Minimal '+(SOALTAB===1?4:3)+' soal harus tetap aktif.'); return; } }
    admDo(API.adminSoalAktif(ATOK, SOALTAB, id, on), on ? 'Soal diaktifkan. Akan ikut terpilih saat paket diacak ulang.' : 'Soal dinonaktifkan.');
  },
  export: function(){ doExport(); },
  admPass: function(){
    openSheet('<h2 style="font-size:19px">Ganti password admin</h2><label class="flabel">Password lama</label><input class="inp" id="ap0" type="password" autocomplete="current-password">'+
      '<label class="flabel">Password baru (min. 8 karakter)</label><input class="inp" id="ap1" type="password" autocomplete="new-password"><label class="flabel">Ulangi password baru</label><input class="inp" id="ap2" type="password" autocomplete="new-password">'+
      '<div class="err" id="aperr"></div><button class="btn btn-p" style="margin-top:6px" data-act="saveAdmPass">Simpan</button>', true);
  },
  saveAdmPass: function(){
    var a = $('ap0').value, b = $('ap1').value, c = $('ap2').value, e = $('aperr');
    if(b.length < 8){ e.textContent = 'Password baru minimal 8 karakter.'; return; }
    if(b !== c){ e.textContent = 'Ulangi password belum sama.'; return; }
    busy(true); API.adminGantiPassword(ATOK, a, b).then(function(){ busy(false); closeSheet(); toast('Password admin berhasil diganti.'); }, function(x){ busy(false); if(x.code==='SESI_HABIS') fail(x); else e.textContent = msg(x); });
  }
};

/* ================= EVENTS ================= */
document.addEventListener('click', function(e){
  var a = e.target.closest('[data-act]');
  if(a && !a.disabled){ var f = A[a.getAttribute('data-act')]; if(f){ f(a, a.getAttribute('data-arg')); return; } }
  var go = e.target.closest('[data-go]'); if(go){ show(go.getAttribute('data-go')); return; }
  if(e.target.closest('[data-back]')){ back(); return; }
  if(e.target.id === 'modal') closeSheet();
});
var IN = {
  nameSearch: function(el){ S.loginQ = el.value; if(S.sel && S.sel!==el.value) S.sel = ''; paintNames(); },
  topicSearch: function(el){ S.tq = el.value; $('tgrid').innerHTML = topicGrid(); },
  gloss: function(el){ S.gq = el.value; $('glist').innerHTML = glossList(); },
  pSearch: function(el){ S.pq = el.value; $('plist').innerHTML = pList(); }
};
document.addEventListener('input', function(e){ var t = e.target.closest('[data-in]'); if(t && IN[t.getAttribute('data-in')]) IN[t.getAttribute('data-in')](t); });

/* ================= BOOT ================= */
function boot(){
  show('splash', false);
  var tok = LS.get('celengan_token'), atok = SS.get('celengan_admin');
  loadConfig().catch(function(){});
  if(atok){
    ATOK = atok; busy(true);
    loadAdm().then(function(){ busy(false); stack = ['admin']; show('admin', false); }, function(){ busy(false); ATOK = null; SS.del('celengan_admin'); });
    return;
  }
  if(tok){
    S.token = tok; busy(true);
    refreshMe().then(function(){ busy(false); root('beranda'); }, function(e){ busy(false); if(e && e.code==='JARINGAN'){ toast(MSG.JARINGAN); } clearSession(); });
  }
}
boot();
})();
