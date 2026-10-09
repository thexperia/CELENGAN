"""Build CELENGAN.
Output:
  ../celengan-demo.html     satu file, mode demo (data di browser), untuk pratinjau
  ../public/index.html      versi produksi tanpa kunci jawaban dan daftar nama
  ../public/config_contoh.js  contoh config (config.js milikmu tidak ditimpa)
  ../supabase/02_seed.sql   data awal: peserta, bank soal
Jalankan: python3 build.py  (butuh Python 3 dan Node.js)
"""
import base64, re, os, sys, json, subprocess
D = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, D)
import illus

ids = ['login-kategori','login-nama','login-pin','login-admin','beranda','belajar-topik','belajar-materi',
 'modul-baca','modul-mf','modul-pilih','modul-selesai',
 'quiz-level','quiz-contoh','quiz-l1','quiz-feedback','quiz-l2','quiz-hasil','quiz-review',
 'kamus','profil','admin','admin-leaderboard','admin-materi','admin-peserta','admin-soal','admin-saran']
dark = {'admin','admin-leaderboard','admin-materi','admin-peserta','admin-soal','admin-saran'}
bg = {'modul-selesai':'var(--green)','quiz-hasil':'var(--purple-d)','quiz-l1':'var(--pink-bg)','quiz-l2':'var(--purple-bg)',
      'modul-mf':'var(--pink-bg)','modul-pilih':'var(--purple-bg)'}
for a in dark: bg[a] = '#15142A'

def rd(n): return open(os.path.join(D, n), encoding='utf-8').read()
def uri(k):
    p = D+'/img/'+k+'.webp'
    if os.path.exists(p): return 'data:image/webp;base64,'+base64.b64encode(open(p,'rb').read()).decode()
    return 'data:image/svg+xml;base64,'+base64.b64encode(illus.ILL[k].encode()).decode()

scr = '\n'.join('<section class="screen" id="%s"%s></section>' % (i, ' style="background:%s;color:%s"' % (bg[i], '#fff' if i in dark else 'inherit') if i in bg else '') for i in ids)
css = rd('base.css') + rd('extra.css') + rd('v7.css')
shell = rd('shell.html').replace('/*CSS*/', css).replace('<!--SCREENS-->', scr)

def page(with_seed, config_inline):
    js = rd('data.js') + rd('materi_1.js') + rd('materi_2.js') + rd('materi_3.js') + rd('materi_4.js') + rd('modul.js') + rd('gloss.js') + (rd('seed.js') if with_seed else '') + rd('api.js') + rd('app_icons.js') + rd('app_main.js')
    cfg = ('<script>window.CELENGAN_CONFIG = window.CELENGAN_CONFIG || {};</script>' if config_inline
           else '<script src="config.js"></script>')
    html = shell.replace('<!--CONFIG-->', cfg).replace('/*APP*/', js)
    html = re.sub(r'\{\{IMG:([a-z_]+)\}\}', lambda m: uri(m.group(1)), html)
    assert '{{' not in html
    return html

os.makedirs(D+'/../public', exist_ok=True); os.makedirs(D+'/../supabase', exist_ok=True)
open(D+'/../celengan-demo.html','w').write(page(True, True))
dep = page(False, False)
for leak in ['var L1BANK', 'var L2BANK', 'var ROSTER0', "id:'a1'", "id:'p1'", "id:'c1'"]:
    assert leak not in dep, leak
open(D+'/../public/index.html','w').write(dep)
open(D+'/../public/config_contoh.js','w').write(
"""// Isi dengan data dari Supabase > Project Settings > API.
// Anon key memang aman ditaruh di sini: database dikunci dengan RLS dan
// aplikasi hanya bisa memanggil fungsi yang diizinkan.
// Biarkan kosong untuk menjalankan mode demo (data hanya di browser).
window.CELENGAN_CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: ''
};
""")

# ---------- seed SQL dari seed.js ----------
js = rd('seed.js') + '\nprocess.stdout.write(JSON.stringify({l1:L1BANK, l2:L2BANK, r:ROSTER0}));'
data = json.loads(subprocess.check_output(['node', '-e', js]))
def q(s): return "'" + str(s).replace("'", "''") + "'"
out = ['-- CELENGAN · Data awal (dibuat otomatis oleh build.py). Jalankan setelah 01_schema.sql.',
       '-- Semua peserta memakai PIN awal 1234 dan diminta menggantinya setelah masuk.', '',
       'insert into public.peserta (nama, kategori, pin_hash) values']
out.append(',\n'.join("  (%s, %s, extensions.crypt('1234', extensions.gen_salt('bf', 8)))" % (q(r['name']), q(r['cat'])) for r in data['r']))
out[-1] += '\non conflict (nama) do nothing;\n'
out.append('insert into public.soal_l1 (id, tipe, item, opts, ans, topic, why, hint) values')
out.append(',\n'.join('  (%s, %s, %s, %s, %s, %s, %s, %s)' % (q(x['id']), q(x['tipe']), q(x['item']),
    (q(json.dumps(x['opts'], ensure_ascii=False)) + '::jsonb') if x.get('opts') else 'null',
    q(x['ans']), q(x['topic']), q(x['why']), q(x['hint'])) for x in data['l1']))
out[-1] += '\non conflict (id) do update set tipe = excluded.tipe, item = excluded.item, opts = excluded.opts, ans = excluded.ans, topic = excluded.topic, why = excluded.why, hint = excluded.hint;\n'
out.append('insert into public.soal_l2 (id, who, topics, story, ask, opts, ok, why, hint) values')
out.append(',\n'.join("  (%s, %s, %s, %s, %s, %s::jsonb, %d, %s, %s)" % (q(x['id']), q(x['who']),
    "array[" + ','.join(q(t) for t in x['topics']) + "]::text[]", q(x['story']), q(x['ask']),
    q(json.dumps(x['opts'], ensure_ascii=False)), x['ok'], q(x['why']), q(x['hint'])) for x in data['l2']))
out[-1] += '\non conflict (id) do update set who = excluded.who, topics = excluded.topics, story = excluded.story, ask = excluded.ask, opts = excluded.opts, ok = excluded.ok, why = excluded.why, hint = excluded.hint;\n'
open(D+'/../supabase/02_seed.sql','w').write('\n'.join(out))
print('demo', os.path.getsize(D+'/../celengan-demo.html'), 'deploy', os.path.getsize(D+'/../public/index.html'),
      'peserta', len(data['r']), 'soal', len(data['l1']), len(data['l2']))
