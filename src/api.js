/* ================= API =================
   Dua mode dengan fungsi yang sama persis:
   1. REMOTE  : memanggil fungsi RPC Supabase (dipakai saat config.js terisi)
   2. DEMO    : database tiruan di localStorage browser (untuk pratinjau tanpa server)
*/
var API = (function(){
  'use strict';
  var CFG = window.CELENGAN_CONFIG || {};
  var REMOTE = !!(CFG.supabaseUrl && CFG.supabaseAnonKey);

  function err(code, data){ var e = new Error(code); e.code = code; e.data = data || {}; return e; }

  /* ---------- REMOTE: Supabase RPC lewat fetch biasa (tanpa library) ---------- */
  function rpc(fn, args){
    var base = String(CFG.supabaseUrl).replace(/\/+$/,''), key = CFG.supabaseAnonKey;
    var h = {'apikey':key, 'Content-Type':'application/json', 'Accept':'application/json'};
    if(/^eyJ/.test(key)) h.Authorization = 'Bearer ' + key; // anon key lama (JWT); publishable key cukup lewat header apikey
    return fetch(base + '/rest/v1/rpc/' + fn, {
      method:'POST',
      headers:h,
      body: JSON.stringify(args || {})
    }).then(function(r){
      return r.text().then(function(t){
        var j = null; try { j = t ? JSON.parse(t) : null; } catch(x){}
        if(!r.ok){ var m = (j && j.message) || ('HTTP_'+r.status); throw err(/^[A-Z_]+$/.test(m) ? m : 'SERVER', {detail:m}); }
        if(j && j.error) throw err(j.error, j);
        return j;
      });
    }, function(){ throw err('JARINGAN'); });
  }

  var remote = {
    roster: function(){ return rpc('daftar_nama'); },
    config: function(){ return rpc('pengaturan_publik'); },
    login: function(nama, pin){ return rpc('login_peserta', {p_nama:nama, p_pin:pin}); },
    profil: function(t){ return rpc('profil_saya', {p_token:t}); },
    gantiPin: function(t, a, b){ return rpc('ganti_pin', {p_token:t, p_lama:a, p_baru:b}); },
    keluar: function(t){ return rpc('keluar', {p_token:t}); },
    mulaiKuis: function(t, lv){ return rpc('mulai_kuis', {p_token:t, p_level:lv}); },
    jawabL1: function(t, i, k){ return rpc('jawab_l1', {p_token:t, p_idx:i, p_pick:k}); },
    selesaiKuis: function(t, lv, j){ return rpc('selesai_kuis', {p_token:t, p_level:lv, p_jawaban:j || []}); },
    pembahasan: function(t, lv){ return rpc('pembahasan', {p_token:t, p_level:lv}); },
    kirimSaran: function(t, k, r, isi){ return rpc('kirim_saran', {p_token:t, p_konteks:k, p_rating:r, p_isi:isi}); },
    loginAdmin: function(u, p){ return rpc('login_admin', {p_user:u, p_pass:p}); },
    adminRingkasan: function(t){ return rpc('admin_ringkasan', {p_token:t}); },
    adminAtur: function(t, patch){ return rpc('admin_atur', {p_token:t, p_patch:patch}); },
    adminTambahPeserta: function(t, n, k){ return rpc('admin_tambah_peserta', {p_token:t, p_nama:n, p_kategori:k}); },
    adminHapusPeserta: function(t, n){ return rpc('admin_hapus_peserta', {p_token:t, p_nama:n}); },
    adminResetPin: function(t, n){ return rpc('admin_reset_pin', {p_token:t, p_nama:n}); },
    adminBukaKuis: function(t, n, lv){ return rpc('admin_buka_kuis', {p_token:t, p_nama:n, p_level:lv || null}); },
    adminSoalSimpan: function(t, lv, d){ return rpc('admin_soal_simpan', {p_token:t, p_level:lv, p_data:d}); },
    adminSoalAktif: function(t, lv, id, on){ return rpc('admin_soal_aktif', {p_token:t, p_level:lv, p_id:id, p_aktif:on}); },
    adminAcakPaket: function(t, lv){ return rpc('admin_acak_paket', {p_token:t, p_level:lv}); },
    adminGantiPassword: function(t, a, b){ return rpc('admin_ganti_password', {p_token:t, p_lama:a, p_baru:b}); }
  };

  /* ---------- DEMO: tiruan database di localStorage ---------- */
  var KEY = 'celengan_demo_db_v9', mem = null;
  function seedDb(){
    return {
      peserta: (typeof ROSTER0 !== 'undefined' ? ROSTER0 : []).map(function(r){ return {nama:r.name, kategori:r.cat, pin:'1234', pin_default:true, aktif:true, gagal:0, kunci:0}; }),
      admin: {username:'admin', pass:'demo1234'},
      sesi: {},
      cfg: {n1:10, n2:5, buka_l1:true, buka_l2:true, periode_mulai:null, periode_selesai:null, topik_sembunyi:[], topik_kategori:{}, paket_l1:[], paket_l2:[], paket_l1_at:null, paket_l2_at:null},
      soal_l1: (typeof L1BANK !== 'undefined' ? L1BANK : []).map(function(x){ return JSON.parse(JSON.stringify(x)); }),
      soal_l2: (typeof L2BANK !== 'undefined' ? L2BANK : []).map(function(x){ return JSON.parse(JSON.stringify(x)); }),
      percobaan: {}, hasil: [], saran: []
    };
  }
  function db(){
    if(mem) return mem;
    try { var s = localStorage.getItem(KEY); if(s) mem = JSON.parse(s); } catch(e){}
    if(!mem) mem = seedDb();
    return mem;
  }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch(e){} }
  function ok(v){ return new Promise(function(res){ setTimeout(function(){ res(JSON.parse(JSON.stringify(v))); }, 90); }); }
  function fail(code, data){ return new Promise(function(res, rej){ setTimeout(function(){ rej(err(code, data)); }, 90); }); }
  function uid(){ return 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
  function P(nama){ return db().peserta.filter(function(p){ return p.nama === nama; })[0]; }
  function bySesi(t){ var s = db().sesi[t]; if(!s || s.admin) return null; var p = P(s.nama); return p && p.aktif ? p : null; }
  function isAdmin(t){ var s = db().sesi[t]; return !!(s && s.admin); }
  function hasil(nama, lv){ return db().hasil.filter(function(h){ return h.nama === nama && h.level === lv; })[0]; }
  function periode(){
    var c = db().cfg;
    if(!c.periode_mulai || !c.periode_selesai) return null;
    var m = new Date(c.periode_mulai + 'T00:00:00+07:00').getTime(), s = new Date(c.periode_selesai + 'T00:00:00+07:00').getTime() + 864e5;
    return s > m ? {m:m, s:s} : null;
  }
  function kec(at){ var p = periode(); if(!p) return null; return Math.max(0, Math.min(100, 100 * (p.s - new Date(at).getTime()) / (p.s - p.m))); }
  function leaderboard(){
    var rows = [];
    db().peserta.forEach(function(p){
      var a = hasil(p.nama, 1), b = hasil(p.nama, 2); if(!a || !b) return;
      var ka = kec(a.submitted_at), kb = kec(b.submitted_at), k = ka == null ? null : (ka + kb) / 2;
      var q = (a.skor + b.skor) / 2;
      rows.push({nama:p.nama, kategori:p.kategori, l1:a.skor, l2:b.skor, kecepatan: k == null ? null : Math.round(k*10)/10,
        skor_akhir: Math.round((k == null ? q : 0.8*q + 0.2*k) * 10) / 10,
        selesai_at: new Date(Math.max(new Date(a.submitted_at), new Date(b.submitted_at))).toISOString()});
    });
    rows.sort(function(x, y){ return y.skor_akhir - x.skor_akhir || new Date(x.selesai_at) - new Date(y.selesai_at); });
    rows.forEach(function(r, i){ r.peringkat = i + 1; });
    return rows;
  }
  function shuf(a){ a = a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var x=a[i]; a[i]=a[j]; a[j]=x; } return a; }
  function buatPaket(lv){
    var d = db(), c = d.cfg, ids;
    if(lv === 1){
      var by = {}; shuf(d.soal_l1.filter(function(x){ return x.aktif !== false; })).forEach(function(x){ (by[x.tipe] = by[x.tipe] || []).push(x.id); });
      var rr = [], ks = shuf(Object.keys(by)), k = 0;
      var nAct = d.soal_l1.filter(function(x){ return x.aktif !== false; }).length;
      while(rr.length < Math.min(c.n1, nAct)){ var b = by[ks[k % ks.length]]; if(b.length) rr.push(b.shift()); k++; }
      ids = shuf(rr);
    } else ids = shuf(d.soal_l2.filter(function(x){ return x.aktif !== false; })).slice(0, c.n2).map(function(x){ return x.id; });
    c['paket_l'+lv] = ids; c['paket_l'+lv+'_at'] = new Date().toISOString();
    Object.keys(d.percobaan).forEach(function(key){ if(key.slice(-2) === '|'+lv) delete d.percobaan[key]; });
    save(); return ids;
  }
  function paket(lv){ var c = db().cfg, ids = c['paket_l'+lv] || []; return ids.length ? ids : buatPaket(lv); }
  function needAdmin(t){ if(!isAdmin(t)) throw err('SESI_HABIS'); }
  function wrap(f){ return function(){ try { var v = f.apply(null, arguments); return v && v.then ? v : ok(v); } catch(e){ return fail(e.code || 'SERVER', e.data); } }; }

  var demo = {
    roster: wrap(function(){ return db().peserta.filter(function(p){ return p.aktif; }).map(function(p){ return {nama:p.nama, kategori:p.kategori}; }).sort(function(a,b){ return a.nama.localeCompare(b.nama); }); }),
    config: wrap(function(){ var c = db().cfg; return {n1:(c.paket_l1||[]).length || Math.min(c.n1, db().soal_l1.length), n2:(c.paket_l2||[]).length || Math.min(c.n2, db().soal_l2.length), buka:{1:c.buka_l1, 2:c.buka_l2},
      periode_mulai:c.periode_mulai, periode_selesai:c.periode_selesai, topik_sembunyi:c.topik_sembunyi, topik_kategori:c.topik_kategori, sekarang:new Date().toISOString()}; }),
    login: wrap(function(nama, pin){
      var p = P(nama); if(!p || !p.aktif) throw err('NAMA_TIDAK_ADA');
      if(p.kunci && p.kunci > Date.now()) throw err('TERKUNCI', {menit:Math.ceil((p.kunci-Date.now())/6e4)});
      if(p.kunci && p.kunci <= Date.now()){ p.kunci = 0; p.gagal = 0; }
      if(p.pin !== pin){ p.gagal++; var lock = p.gagal >= 5; if(lock) p.kunci = Date.now() + 6e5; save(); throw err(lock ? 'TERKUNCI' : 'PIN_SALAH', {sisa:Math.max(0, 5-p.gagal), menit:10}); }
      p.gagal = 0; var t = uid(); db().sesi[t] = {nama:p.nama}; save();
      return {token:t, nama:p.nama, kategori:p.kategori, pin_default:p.pin_default};
    }),
    profil: wrap(function(t){
      var p = bySesi(t); if(!p) throw err('SESI_HABIS');
      return {nama:p.nama, kategori:p.kategori, pin_default:p.pin_default,
        hasil: db().hasil.filter(function(h){ return h.nama === p.nama; }).sort(function(a,b){ return a.level-b.level; })
          .map(function(h){ return {level:h.level, skor:h.skor, benar:h.benar, total:h.total, durasi_detik:h.durasi_detik, submitted_at:h.submitted_at}; })};
    }),
    gantiPin: wrap(function(t, a, b){
      var p = bySesi(t); if(!p) throw err('SESI_HABIS');
      if(p.pin !== a) throw err('PIN_LAMA_SALAH'); if(!/^\d{4}$/.test(b)) throw err('PIN_TIDAK_VALID');
      p.pin = b; p.pin_default = false; save(); return {ok:true};
    }),
    keluar: wrap(function(t){ delete db().sesi[t]; save(); return {ok:true}; }),
    mulaiKuis: wrap(function(t, lv){
      var p = bySesi(t); if(!p) throw err('SESI_HABIS'); var c = db().cfg;
      if(!(lv === 1 ? c.buka_l1 : c.buka_l2)) throw err('LEVEL_DITUTUP');
      var pr = periode(); if(pr && Date.now() < pr.m) throw err('PERIODE_BELUM'); if(pr && Date.now() >= pr.s) throw err('PERIODE_SELESAI');
      if(hasil(p.nama, lv)) throw err('SUDAH_DIKERJAKAN');
      var ids = paket(lv); if(!ids.length) throw err('SOAL_KOSONG');
      var key = p.nama + '|' + lv, pc = db().percobaan[key], jw = {};
      if(lv === 1 && pc && pc.ids.join() === ids.join()) jw = pc.jawaban;
      else { db().percobaan[key] = {ids:ids.slice(), jawaban:{}, mulai:Date.now()}; save(); }
      var bank = lv === 1 ? db().soal_l1 : db().soal_l2;
      var items = ids.map(function(id){ return bank.filter(function(x){ return x.id === id; })[0]; }).filter(Boolean);
      return {level:lv, jawaban:jw, items: items.map(function(x){ return lv === 1 ? {id:x.id, tipe:x.tipe, item:x.item, opts:x.opts || null} : {id:x.id, who:x.who, story:x.story, ask:x.ask, opts:x.opts}; })};
    }),
    jawabL1: wrap(function(t, i, k){
      var p = bySesi(t); if(!p) throw err('SESI_HABIS'); var pc = db().percobaan[p.nama + '|1']; if(!pc) throw err('KUIS_BELUM_DIMULAI');
      var s = db().soal_l1.filter(function(x){ return x.id === pc.ids[i]; })[0]; if(!s) throw err('SOAL_TIDAK_ADA');
      var prev = pc.jawaban[i]; if(!prev){ var o = k === s.ans; prev = pc.jawaban[i] = {pick:k, ok:o, item:s.item, tipe:s.tipe, opts:s.opts || null, topic:s.topic, why:o ? s.why : null, hint:o ? null : s.hint, ans:o ? s.ans : null}; save(); }
      return {ok:prev.ok, pick:prev.pick, item:s.item, tipe:s.tipe, opts:s.opts || null, topic:s.topic, why:prev.ok ? s.why : null, hint:prev.ok ? null : s.hint, ans:prev.ok ? s.ans : null};
    }),
    selesaiKuis: wrap(function(t, lv, jw){
      var p = bySesi(t); if(!p) throw err('SESI_HABIS'); if(hasil(p.nama, lv)) throw err('SUDAH_DIKERJAKAN');
      var key = p.nama + '|' + lv, pc = db().percobaan[key]; if(!pc) throw err('KUIS_BELUM_DIMULAI');
      var c = 0, rev = pc.ids.map(function(id, i){
        if(lv === 1){ var s = db().soal_l1.filter(function(x){ return x.id === id; })[0], a = pc.jawaban[i]; if(!a) throw err('BELUM_SEMUA_DIJAWAB');
          if(a.ok) c++; return {id:s.id, tipe:s.tipe, opts:s.opts || null, item:s.item, ans:s.ans, pick:a.pick, ok:a.ok, why:s.why, hint:s.hint, topic:s.topic}; }
        var s2 = db().soal_l2.filter(function(x){ return x.id === id; })[0], pk = (jw || [])[i]; if(typeof pk !== 'number') throw err('BELUM_SEMUA_DIJAWAB');
        var okv = pk === s2.ok; if(okv) c++;
        return {id:s2.id, who:s2.who, story:s2.story, ask:s2.ask, opts:s2.opts, ans:s2.ok, pick:pk, ok:okv, why:s2.why, hint:s2.hint, topics:s2.topics};
      });
      var n = pc.ids.length, h = {nama:p.nama, level:lv, benar:c, total:n, skor:Math.round(100*c/n), durasi_detik:Math.max(1, Math.round((Date.now()-pc.mulai)/1000)), submitted_at:new Date().toISOString(), review:rev};
      db().hasil.push(h); delete db().percobaan[key]; save();
      return {level:lv, skor:h.skor, benar:c, total:n, durasi_detik:h.durasi_detik, submitted_at:h.submitted_at, review:rev};
    }),
    pembahasan: wrap(function(t, lv){
      var p = bySesi(t); if(!p) throw err('SESI_HABIS'); var h = hasil(p.nama, lv); if(!h) throw err('BELUM_DIKERJAKAN');
      return {level:lv, skor:h.skor, benar:h.benar, total:h.total, durasi_detik:h.durasi_detik, submitted_at:h.submitted_at, review:h.review};
    }),
    kirimSaran: wrap(function(t, k, r, isi){
      var p = bySesi(t); if(!p) throw err('SESI_HABIS');
      db().saran.unshift({nama:p.nama, kategori:p.kategori, konteks:k, rating:r, isi:isi.trim(), dibuat:new Date().toISOString()}); save(); return {ok:true};
    }),
    loginAdmin: wrap(function(u, pw){
      var a = db().admin; if(String(u).trim() !== a.username || pw !== a.pass) throw err('SALAH');
      var t = uid(); db().sesi[t] = {admin:a.username}; save(); return {token:t, username:a.username};
    }),
    adminRingkasan: wrap(function(t){
      needAdmin(t); var d = db();
      return {admin:d.admin.username, pengaturan:d.cfg,
        peserta: d.peserta.filter(function(p){ return p.aktif; }).map(function(p){ var a = hasil(p.nama,1), b = hasil(p.nama,2);
          return {nama:p.nama, kategori:p.kategori, pin_default:p.pin_default, l1:a?a.skor:null, l1_at:a?a.submitted_at:null, l1_durasi:a?a.durasi_detik:null,
            l2:b?b.skor:null, l2_at:b?b.submitted_at:null, l2_durasi:b?b.durasi_detik:null}; }).sort(function(a,b){ return a.nama.localeCompare(b.nama); }),
        leaderboard: leaderboard(), saran: d.saran, soal_l1: d.soal_l1, soal_l2: d.soal_l2, sekarang:new Date().toISOString()};
    }),
    adminAtur: wrap(function(t, patch){ needAdmin(t); var c = db().cfg, o1 = c.n1, o2 = c.n2; Object.keys(patch).forEach(function(k){ c[k] = patch[k] === '' ? null : patch[k]; }); save();
      if(patch.n1 != null && patch.n1 !== o1) buatPaket(1); if(patch.n2 != null && patch.n2 !== o2) buatPaket(2); return {ok:true}; }),
    adminAcakPaket: wrap(function(t, lv){ needAdmin(t); return {ok:true, jumlah:buatPaket(lv).length}; }),
    adminTambahPeserta: wrap(function(t, n, k){
      needAdmin(t); n = n.trim(); if(n.length < 3) throw err('NAMA_TERLALU_PENDEK');
      var ex = db().peserta.filter(function(p){ return p.nama.toLowerCase() === n.toLowerCase(); })[0];
      if(ex){ ex.aktif = true; save(); return {ok:true, aktifkan_lagi:true}; }
      db().peserta.push({nama:n, kategori:k, pin:'1234', pin_default:true, aktif:true, gagal:0, kunci:0}); save(); return {ok:true};
    }),
    adminHapusPeserta: wrap(function(t, n){ needAdmin(t); var p = P(n); if(p) p.aktif = false; save(); return {ok:!!p}; }),
    adminResetPin: wrap(function(t, n){ needAdmin(t); var p = P(n); if(p){ p.pin = '1234'; p.pin_default = true; p.gagal = 0; p.kunci = 0; } save(); return {ok:!!p}; }),
    adminBukaKuis: wrap(function(t, n, lv){
      needAdmin(t); var d = db(), before = d.hasil.length;
      d.hasil = d.hasil.filter(function(h){ return !(h.nama === n && (!lv || h.level === lv)); });
      Object.keys(d.percobaan).forEach(function(k){ if(k.indexOf(n + '|') === 0 && (!lv || k === n + '|' + lv)) delete d.percobaan[k]; });
      save(); return {ok:true, dihapus: before - d.hasil.length};
    }),
    adminSoalSimpan: wrap(function(t, lv, d){ needAdmin(t); d = JSON.parse(JSON.stringify(d)); d.id = (lv === 1 ? 'a' : 'c') + uid(); (lv === 1 ? db().soal_l1 : db().soal_l2).unshift(d); save(); return {ok:true, id:d.id}; }),
    adminSoalAktif: wrap(function(t, lv, id, on){ needAdmin(t); var k = lv === 1 ? 'soal_l1' : 'soal_l2', d = db();
      var q = d[k].filter(function(x){ return x.id === id; })[0]; if(!q) return {ok:false}; q.aktif = !!on;
      var pk = d.cfg['paket_l'+lv] || [], idx = pk.indexOf(id), changed = false;
      if(!on && idx >= 0){
        var pool = d[k].filter(function(x){ return x.aktif !== false && pk.indexOf(x.id) < 0; });
        var same = pool.filter(function(x){ return lv !== 1 || x.tipe === q.tipe; });
        var rep = (same.length ? same : pool)[Math.floor(Math.random() * (same.length ? same.length : pool.length))];
        if(rep) pk[idx] = rep.id; else pk.splice(idx, 1);
        d.cfg['paket_l'+lv] = pk; d.cfg['paket_l'+lv+'_at'] = new Date().toISOString(); changed = true;
        Object.keys(d.percobaan).forEach(function(key){ if(key.slice(-2) === '|'+lv) delete d.percobaan[key]; });
      }
      save(); return {ok:true, paket_diubah:changed}; }),
    adminGantiPassword: wrap(function(t, a, b){ needAdmin(t); if(a !== db().admin.pass) throw err('PASSWORD_LAMA_SALAH'); if(String(b).length < 8) throw err('PASSWORD_TERLALU_PENDEK'); db().admin.pass = b; save(); return {ok:true}; }),
    resetDemo: function(){ mem = seedDb(); save(); }
  };

  var api = REMOTE ? remote : demo;
  api.REMOTE = REMOTE;
  return api;
})();
