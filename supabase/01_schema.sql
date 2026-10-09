-- =====================================================================
-- CELENGAN · Skema database Supabase
-- Jalankan sekali di Supabase > SQL Editor (urutan: 01, 02, 03).
-- Aman dijalankan ulang: tabel dibuat jika belum ada, fungsi diganti.
--
-- Prinsip keamanan:
-- * Semua tabel memakai Row Level Security tanpa policy, sehingga kunci
--   publik (anon key) TIDAK bisa membaca atau mengubah tabel secara langsung.
-- * Aplikasi hanya bisa memanggil fungsi RPC di bawah. Fungsi berjalan
--   sebagai pemilik (security definer) dan memeriksa token sesi sendiri.
-- * PIN dan password disimpan dalam bentuk hash bcrypt.
-- * Kunci jawaban kuis hanya ada di database dan baru dikirim ke peserta
--   setelah kuisnya dikumpulkan.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------- tabel
create table if not exists public.peserta (
  id            bigint generated always as identity primary key,
  nama          text not null unique,
  kategori      text not null check (kategori in ('Organik','Non-Organik')),
  pin_hash      text not null,
  pin_default   boolean not null default true,
  aktif         boolean not null default true,
  gagal_login   int not null default 0,
  kunci_sampai  timestamptz,
  dibuat        timestamptz not null default now()
);

create table if not exists public.admin_akun (
  username      text primary key,
  pass_hash     text not null,
  gagal_login   int not null default 0,
  kunci_sampai  timestamptz
);

create table if not exists public.sesi (
  token       uuid primary key default gen_random_uuid(),
  peserta_id  bigint references public.peserta(id) on delete cascade,
  admin_user  text references public.admin_akun(username) on delete cascade,
  dibuat      timestamptz not null default now(),
  berakhir    timestamptz not null,
  check ((peserta_id is null) <> (admin_user is null))
);

create table if not exists public.pengaturan (
  id               int primary key default 1 check (id = 1),
  n1               int not null default 10,
  n2               int not null default 5,
  buka_l1          boolean not null default true,
  buka_l2          boolean not null default true,
  periode_mulai    date,
  periode_selesai  date,
  topik_sembunyi   text[] not null default '{}',
  topik_kategori   jsonb not null default '{}'::jsonb,
  paket_l1         text[] not null default '{}',   -- soal yang sama untuk semua peserta
  paket_l2         text[] not null default '{}',
  paket_l1_at      timestamptz,
  paket_l2_at      timestamptz
);
insert into public.pengaturan (id) values (1) on conflict (id) do nothing;

create table if not exists public.soal_l1 (
  id     text primary key,
  tipe   text not null default 'basket' check (tipe in ('basket','pg','bs','hitung')),
  item   text not null,
  opts   jsonb,                    -- pilihan untuk tipe pg dan hitung
  ans    text not null,            -- basket: likuid|invest|utang, bs: benar|salah, pg/hitung: indeks
  topic  text not null,
  why    text not null,
  hint   text not null,
  aktif  boolean not null default true,
  dibuat timestamptz not null default now()
);

create table if not exists public.soal_l2 (
  id     text primary key,
  who    text not null,
  topics text[] not null default '{}',
  story  text not null,
  ask    text not null,
  opts   jsonb not null,           -- array teks pilihan, 2 sampai 4
  ok     int not null,             -- indeks pilihan benar (mulai 0)
  why    text not null,
  hint   text not null,
  aktif  boolean not null default true,
  dibuat timestamptz not null default now()
);

-- kuis yang sedang dikerjakan (belum dikumpulkan, tidak dihitung)
create table if not exists public.percobaan (
  peserta_id  bigint not null references public.peserta(id) on delete cascade,
  level       int not null check (level in (1,2)),
  item_ids    text[] not null,
  jawaban     jsonb not null default '{}'::jsonb,
  mulai_at    timestamptz not null default now(),
  primary key (peserta_id, level)
);

-- hasil final: satu baris per peserta per level (hanya 1x kesempatan)
create table if not exists public.hasil_kuis (
  id            bigint generated always as identity primary key,
  peserta_id    bigint not null references public.peserta(id) on delete cascade,
  level         int not null check (level in (1,2)),
  benar         int not null,
  total         int not null,
  skor          int not null,
  durasi_detik  int not null,
  review        jsonb not null,
  submitted_at  timestamptz not null default now(),
  unique (peserta_id, level)
);

create table if not exists public.saran (
  id          bigint generated always as identity primary key,
  peserta_id  bigint references public.peserta(id) on delete set null,
  nama        text,
  kategori    text,
  konteks     text,
  rating      int check (rating between 1 and 5),
  isi         text not null check (char_length(isi) between 3 and 2000),
  dibuat      timestamptz not null default now()
);


-- penyesuaian bila skema versi sebelumnya sudah pernah dijalankan
alter table public.soal_l1 drop constraint if exists soal_l1_ans_check;
alter table public.soal_l1 add column if not exists tipe text not null default 'basket';
alter table public.soal_l1 add column if not exists opts jsonb;
alter table public.pengaturan add column if not exists paket_l1 text[] not null default '{}';
alter table public.pengaturan add column if not exists paket_l2 text[] not null default '{}';
alter table public.pengaturan add column if not exists paket_l1_at timestamptz;
alter table public.pengaturan add column if not exists paket_l2_at timestamptz;

alter table public.peserta     enable row level security;
alter table public.admin_akun  enable row level security;
alter table public.sesi        enable row level security;
alter table public.pengaturan  enable row level security;
alter table public.soal_l1     enable row level security;
alter table public.soal_l2     enable row level security;
alter table public.percobaan   enable row level security;
alter table public.hasil_kuis  enable row level security;
alter table public.saran       enable row level security;

-- ---------------------------------------------------------------- helper
create or replace function public._peserta_dari_token(p_token uuid)
returns public.peserta language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r public.peserta;
begin
  select p.* into r from sesi s join peserta p on p.id = s.peserta_id
   where s.token = p_token and s.berakhir > now() and p.aktif;
  if not found then raise exception 'SESI_HABIS'; end if;
  return r;
end $$;

create or replace function public._admin_dari_token(p_token uuid)
returns text language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare u text;
begin
  select admin_user into u from sesi
   where token = p_token and admin_user is not null and berakhir > now();
  if u is null then raise exception 'SESI_HABIS'; end if;
  return u;
end $$;

-- batas waktu periode kuis dalam WIB
create or replace function public._periode()
returns table(mulai timestamptz, selesai timestamptz) language sql stable security definer
set search_path = public, extensions, pg_temp as $$
  select (periode_mulai::timestamp at time zone 'Asia/Jakarta'),
         ((periode_selesai + 1)::timestamp at time zone 'Asia/Jakarta')
    from pengaturan where id = 1;
$$;

-- skor kecepatan 0..100: hari pertama periode 100, akhir periode 0
create or replace function public._kecepatan(p_at timestamptz)
returns numeric language sql stable security definer
set search_path = public, extensions, pg_temp as $$
  select case when p.mulai is null or p.selesai is null or p.selesai <= p.mulai then null
              else greatest(0, least(100, 100 * extract(epoch from (p.selesai - p_at))
                                              / extract(epoch from (p.selesai - p.mulai)))) end
    from public._periode() p;
$$;

create or replace function public._leaderboard()
returns table(peringkat bigint, nama text, kategori text, l1 int, l2 int,
              kecepatan numeric, skor_akhir numeric, selesai_at timestamptz)
language sql stable security definer
set search_path = public, extensions, pg_temp as $$
  with x as (
    select p.nama, p.kategori, a.skor as l1, b.skor as l2,
           (coalesce(public._kecepatan(a.submitted_at),-1) + coalesce(public._kecepatan(b.submitted_at),-1)) / 2 as kc,
           greatest(a.submitted_at, b.submitted_at) as selesai_at
      from peserta p
      join hasil_kuis a on a.peserta_id = p.id and a.level = 1
      join hasil_kuis b on b.peserta_id = p.id and b.level = 2
  ), y as (
    select nama, kategori, l1, l2,
           case when kc < 0 then null else round(kc, 1) end as kecepatan,
           case when kc < 0 then round((l1 + l2) / 2.0, 1)
                else round(0.8 * (l1 + l2) / 2.0 + 0.2 * kc, 1) end as skor_akhir,
           selesai_at
      from x
  )
  select row_number() over (order by skor_akhir desc, selesai_at asc), y.*
    from y order by 1;
$$;

-- ---------------------------------------------------------------- publik
create or replace function public.daftar_nama()
returns table(nama text, kategori text) language sql stable security definer
set search_path = public, extensions, pg_temp as $$
  select nama, kategori from peserta where aktif order by nama;
$$;

create or replace function public.pengaturan_publik()
returns json language sql stable security definer
set search_path = public, extensions, pg_temp as $$
  select json_build_object(
    'n1', case when cardinality(g.paket_l1) > 0 then cardinality(g.paket_l1) else least(g.n1, (select count(*) from soal_l1 where aktif)) end,
    'n2', case when cardinality(g.paket_l2) > 0 then cardinality(g.paket_l2) else least(g.n2, (select count(*) from soal_l2 where aktif)) end,
    'buka', json_build_object('1', g.buka_l1, '2', g.buka_l2),
    'periode_mulai', g.periode_mulai, 'periode_selesai', g.periode_selesai,
    'topik_sembunyi', g.topik_sembunyi, 'topik_kategori', g.topik_kategori,
    'sekarang', now())
  from pengaturan g where g.id = 1;
$$;

-- paket soal: dipilih acak sekali, lalu dipakai semua peserta.
-- Level 1 diambil bergiliran per tipe supaya tipenya tercampur.
create or replace function public._buat_paket(p_level int)
returns text[] language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare g pengaturan; ids text[];
begin
  select * into g from pengaturan where id = 1;
  if p_level = 1 then
    select array_agg(id) into ids from (
      select id from (
        select id, row_number() over (partition by tipe order by random()) rk, random() r2
          from soal_l1 where aktif) x
       order by rk, r2 limit g.n1) y;
    -- acak urutan akhir agar tipe tidak selalu berpola sama
    select array_agg(id order by random()) into ids from unnest(ids) id;
    update pengaturan set paket_l1 = coalesce(ids, '{}'), paket_l1_at = now() where id = 1;
  else
    select array_agg(id) into ids from (select id from soal_l2 where aktif order by random() limit g.n2) s;
    update pengaturan set paket_l2 = coalesce(ids, '{}'), paket_l2_at = now() where id = 1;
  end if;
  delete from percobaan where level = p_level;
  return coalesce(ids, '{}');
end $$;

create or replace function public._paket(p_level int)
returns text[] language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare g pengaturan; ids text[];
begin
  select * into g from pengaturan where id = 1;
  ids := case when p_level = 1 then g.paket_l1 else g.paket_l2 end;
  if cardinality(ids) = 0 then ids := _buat_paket(p_level); end if;
  return ids;
end $$;

create or replace function public.login_peserta(p_nama text, p_pin text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r peserta; t uuid;
begin
  select * into r from peserta where nama = p_nama and aktif;
  if not found then return json_build_object('error','NAMA_TIDAK_ADA'); end if;
  if r.kunci_sampai is not null and r.kunci_sampai <= now() then
    update peserta set gagal_login = 0, kunci_sampai = null where id = r.id;
    r.gagal_login := 0; r.kunci_sampai := null;
  end if;
  if r.kunci_sampai is not null and r.kunci_sampai > now() then
    return json_build_object('error','TERKUNCI','menit', ceil(extract(epoch from (r.kunci_sampai - now()))/60));
  end if;
  if r.pin_hash <> crypt(coalesce(p_pin,''), r.pin_hash) then
    update peserta set gagal_login = gagal_login + 1,
           kunci_sampai = case when gagal_login + 1 >= 5 then now() + interval '10 minutes' else null end
     where id = r.id;
    return json_build_object('error', case when r.gagal_login + 1 >= 5 then 'TERKUNCI' else 'PIN_SALAH' end,
                             'sisa', greatest(0, 4 - r.gagal_login), 'menit', 10);
  end if;
  update peserta set gagal_login = 0, kunci_sampai = null where id = r.id;
  delete from sesi where berakhir < now();
  insert into sesi (peserta_id, berakhir) values (r.id, now() + interval '30 days') returning token into t;
  return json_build_object('token', t, 'nama', r.nama, 'kategori', r.kategori, 'pin_default', r.pin_default);
end $$;

create or replace function public.profil_saya(p_token uuid)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r peserta;
begin
  r := _peserta_dari_token(p_token);
  return json_build_object('nama', r.nama, 'kategori', r.kategori, 'pin_default', r.pin_default,
    'hasil', coalesce((select json_agg(json_build_object('level', level, 'skor', skor, 'benar', benar, 'total', total,
               'durasi_detik', durasi_detik, 'submitted_at', submitted_at) order by level)
               from hasil_kuis where peserta_id = r.id), '[]'::json));
end $$;

create or replace function public.ganti_pin(p_token uuid, p_lama text, p_baru text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r peserta;
begin
  r := _peserta_dari_token(p_token);
  if r.pin_hash <> crypt(coalesce(p_lama,''), r.pin_hash) then raise exception 'PIN_LAMA_SALAH'; end if;
  if p_baru !~ '^[0-9]{4}$' then raise exception 'PIN_TIDAK_VALID'; end if;
  update peserta set pin_hash = crypt(p_baru, gen_salt('bf', 8)), pin_default = false where id = r.id;
  return json_build_object('ok', true);
end $$;

create or replace function public.keluar(p_token uuid)
returns json language sql security definer
set search_path = public, extensions, pg_temp as $$
  delete from sesi where token = p_token;
  select json_build_object('ok', true);
$$;

-- ---------------------------------------------------------------- kuis
create or replace function public.mulai_kuis(p_token uuid, p_level int)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r peserta; g pengaturan; pr record; ids text[]; items json; pc percobaan; jw jsonb := '{}'::jsonb;
begin
  r := _peserta_dari_token(p_token);
  select * into g from pengaturan where id = 1;
  if p_level not in (1,2) then raise exception 'LEVEL_TIDAK_ADA'; end if;
  if (p_level = 1 and not g.buka_l1) or (p_level = 2 and not g.buka_l2) then raise exception 'LEVEL_DITUTUP'; end if;
  select * into pr from _periode();
  if pr.mulai is not null and now() < pr.mulai then raise exception 'PERIODE_BELUM'; end if;
  if pr.selesai is not null and now() >= pr.selesai then raise exception 'PERIODE_SELESAI'; end if;
  if exists (select 1 from hasil_kuis where peserta_id = r.id and level = p_level) then raise exception 'SUDAH_DIKERJAKAN'; end if;

  ids := _paket(p_level);
  if cardinality(ids) = 0 then raise exception 'SOAL_KOSONG'; end if;

  -- Level 1: jawaban yang sudah dikunci tetap tersimpan, peserta melanjutkan dari soal berikutnya
  select * into pc from percobaan where peserta_id = r.id and level = p_level;
  if found and pc.item_ids = ids and p_level = 1 then
    jw := pc.jawaban;
  else
    insert into percobaan (peserta_id, level, item_ids, jawaban, mulai_at)
    values (r.id, p_level, ids, '{}'::jsonb, now())
    on conflict (peserta_id, level) do update set item_ids = excluded.item_ids, jawaban = '{}'::jsonb, mulai_at = now();
  end if;

  if p_level = 1 then
    select json_agg(json_build_object('id', s.id, 'tipe', s.tipe, 'item', s.item, 'opts', s.opts) order by u.ord) into items
      from unnest(ids) with ordinality u(id, ord) join soal_l1 s on s.id = u.id;
  else
    select json_agg(json_build_object('id', s.id, 'who', s.who, 'story', s.story, 'ask', s.ask, 'opts', s.opts) order by u.ord) into items
      from unnest(ids) with ordinality u(id, ord) join soal_l2 s on s.id = u.id;
  end if;
  return json_build_object('level', p_level, 'items', items, 'jawaban', jw);
end $$;

create or replace function public.jawab_l1(p_token uuid, p_idx int, p_pick text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r peserta; pc percobaan; s soal_l1; prev jsonb; okv boolean;
begin
  r := _peserta_dari_token(p_token);
  select * into pc from percobaan where peserta_id = r.id and level = 1;
  if not found then raise exception 'KUIS_BELUM_DIMULAI'; end if;
  if p_idx < 0 or p_idx >= array_length(pc.item_ids, 1) then raise exception 'SOAL_TIDAK_ADA'; end if;
  select * into s from soal_l1 where id = pc.item_ids[p_idx + 1];
  prev := pc.jawaban -> p_idx::text;
  if prev is null then
    okv := (p_pick = s.ans);
    update percobaan set jawaban = jawaban || jsonb_build_object(p_idx::text,
      jsonb_build_object('pick', p_pick, 'ok', okv, 'item', s.item, 'tipe', s.tipe, 'opts', s.opts, 'topic', s.topic,
        'why', case when okv then s.why end, 'hint', case when okv then null else s.hint end, 'ans', case when okv then s.ans end))
     where peserta_id = r.id and level = 1;
  else
    okv := (prev ->> 'ok')::boolean; p_pick := prev ->> 'pick';
  end if;
  return json_build_object('ok', okv, 'pick', p_pick, 'item', s.item, 'tipe', s.tipe, 'opts', s.opts, 'topic', s.topic,
    'why', case when okv then s.why end, 'hint', case when okv then null else s.hint end,
    'ans', case when okv then s.ans end);
end $$;

create or replace function public.selesai_kuis(p_token uuid, p_level int, p_jawaban jsonb default '[]'::jsonb)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r peserta; pc percobaan; n int; c int := 0; rev jsonb := '[]'::jsonb; i int; okv boolean; pick jsonb;
        s1 soal_l1; s2 soal_l2; dur int; sk int; h hasil_kuis;
begin
  r := _peserta_dari_token(p_token);
  if exists (select 1 from hasil_kuis where peserta_id = r.id and level = p_level) then raise exception 'SUDAH_DIKERJAKAN'; end if;
  select * into pc from percobaan where peserta_id = r.id and level = p_level;
  if not found then raise exception 'KUIS_BELUM_DIMULAI'; end if;
  n := array_length(pc.item_ids, 1);
  for i in 0 .. n - 1 loop
    if p_level = 1 then
      select * into s1 from soal_l1 where id = pc.item_ids[i + 1];
      pick := pc.jawaban -> i::text;
      if pick is null then raise exception 'BELUM_SEMUA_DIJAWAB'; end if;
      okv := (pick ->> 'ok')::boolean;
      rev := rev || jsonb_build_array(jsonb_build_object('id', s1.id, 'tipe', s1.tipe, 'opts', s1.opts, 'item', s1.item, 'ans', s1.ans, 'pick', pick ->> 'pick',
               'ok', okv, 'why', s1.why, 'hint', s1.hint, 'topic', s1.topic));
    else
      select * into s2 from soal_l2 where id = pc.item_ids[i + 1];
      if jsonb_typeof(p_jawaban -> i) is distinct from 'number' then raise exception 'BELUM_SEMUA_DIJAWAB'; end if;
      okv := ((p_jawaban ->> i)::int = s2.ok);
      rev := rev || jsonb_build_array(jsonb_build_object('id', s2.id, 'who', s2.who, 'story', s2.story, 'ask', s2.ask,
               'opts', s2.opts, 'ans', s2.ok, 'pick', (p_jawaban ->> i)::int, 'ok', okv, 'why', s2.why, 'hint', s2.hint,
               'topics', to_jsonb(s2.topics)));
    end if;
    if okv then c := c + 1; end if;
  end loop;
  dur := greatest(1, extract(epoch from (now() - pc.mulai_at))::int);
  sk := round(100.0 * c / n);
  insert into hasil_kuis (peserta_id, level, benar, total, skor, durasi_detik, review)
  values (r.id, p_level, c, n, sk, dur, rev) returning * into h;
  delete from percobaan where peserta_id = r.id and level = p_level;
  return json_build_object('level', p_level, 'skor', sk, 'benar', c, 'total', n, 'durasi_detik', dur,
                           'submitted_at', h.submitted_at, 'review', rev);
end $$;

create or replace function public.pembahasan(p_token uuid, p_level int)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r peserta; h hasil_kuis;
begin
  r := _peserta_dari_token(p_token);
  select * into h from hasil_kuis where peserta_id = r.id and level = p_level;
  if not found then raise exception 'BELUM_DIKERJAKAN'; end if;
  return json_build_object('level', h.level, 'skor', h.skor, 'benar', h.benar, 'total', h.total,
                           'durasi_detik', h.durasi_detik, 'submitted_at', h.submitted_at, 'review', h.review);
end $$;

create or replace function public.kirim_saran(p_token uuid, p_konteks text, p_rating int, p_isi text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare r peserta;
begin
  r := _peserta_dari_token(p_token);
  if (select count(*) from saran where peserta_id = r.id and dibuat > now() - interval '1 hour') >= 10 then
    raise exception 'TERLALU_SERING';
  end if;
  insert into saran (peserta_id, nama, kategori, konteks, rating, isi)
  values (r.id, r.nama, r.kategori, left(p_konteks, 60), p_rating, trim(p_isi));
  return json_build_object('ok', true);
end $$;

-- ---------------------------------------------------------------- admin
create or replace function public.login_admin(p_user text, p_pass text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare a admin_akun; t uuid;
begin
  select * into a from admin_akun where username = trim(p_user);
  if not found then return json_build_object('error','SALAH'); end if;
  if a.kunci_sampai is not null and a.kunci_sampai <= now() then
    update admin_akun set gagal_login = 0, kunci_sampai = null where username = a.username;
    a.gagal_login := 0; a.kunci_sampai := null;
  end if;
  if a.kunci_sampai is not null and a.kunci_sampai > now() then return json_build_object('error','TERKUNCI'); end if;
  if a.pass_hash <> crypt(coalesce(p_pass,''), a.pass_hash) then
    update admin_akun set gagal_login = gagal_login + 1,
      kunci_sampai = case when gagal_login + 1 >= 5 then now() + interval '15 minutes' else null end
     where username = a.username;
    return json_build_object('error','SALAH');
  end if;
  update admin_akun set gagal_login = 0, kunci_sampai = null where username = a.username;
  insert into sesi (admin_user, berakhir) values (a.username, now() + interval '12 hours') returning token into t;
  return json_build_object('token', t, 'username', a.username);
end $$;

create or replace function public.admin_ringkasan(p_token uuid)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare u text;
begin
  u := _admin_dari_token(p_token);
  return json_build_object(
    'admin', u,
    'pengaturan', (select row_to_json(g) from pengaturan g where id = 1),
    'peserta', coalesce((select json_agg(json_build_object(
        'nama', p.nama, 'kategori', p.kategori, 'pin_default', p.pin_default,
        'l1', a.skor, 'l1_at', a.submitted_at, 'l1_durasi', a.durasi_detik,
        'l2', b.skor, 'l2_at', b.submitted_at, 'l2_durasi', b.durasi_detik) order by p.nama)
      from peserta p
      left join hasil_kuis a on a.peserta_id = p.id and a.level = 1
      left join hasil_kuis b on b.peserta_id = p.id and b.level = 2
      where p.aktif), '[]'::json),
    'leaderboard', coalesce((select json_agg(l) from _leaderboard() l), '[]'::json),
    'saran', coalesce((select json_agg(json_build_object('nama', nama, 'kategori', kategori, 'konteks', konteks,
        'rating', rating, 'isi', isi, 'dibuat', dibuat) order by dibuat desc) from saran), '[]'::json),
    'soal_l1', coalesce((select json_agg(json_build_object('id', id, 'tipe', tipe, 'opts', opts, 'item', item, 'ans', ans, 'topic', topic,
        'why', why, 'hint', hint, 'aktif', aktif) order by dibuat desc, id) from soal_l1), '[]'::json),
    'soal_l2', coalesce((select json_agg(json_build_object('id', id, 'who', who, 'topics', topics, 'story', story,
        'ask', ask, 'opts', opts, 'ok', ok, 'why', why, 'hint', hint, 'aktif', aktif) order by dibuat desc, id) from soal_l2), '[]'::json),
    'sekarang', now());
end $$;

create or replace function public.admin_atur(p_token uuid, p_patch jsonb)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare g pengaturan;
begin
  perform _admin_dari_token(p_token);
  select * into g from pengaturan where id = 1;
  update pengaturan set
    n1 = coalesce((p_patch ->> 'n1')::int, n1),
    n2 = coalesce((p_patch ->> 'n2')::int, n2),
    buka_l1 = coalesce((p_patch ->> 'buka_l1')::boolean, buka_l1),
    buka_l2 = coalesce((p_patch ->> 'buka_l2')::boolean, buka_l2),
    periode_mulai = case when p_patch ? 'periode_mulai' then nullif(p_patch ->> 'periode_mulai','')::date else periode_mulai end,
    periode_selesai = case when p_patch ? 'periode_selesai' then nullif(p_patch ->> 'periode_selesai','')::date else periode_selesai end,
    topik_sembunyi = case when p_patch ? 'topik_sembunyi' then array(select jsonb_array_elements_text(p_patch -> 'topik_sembunyi')) else topik_sembunyi end,
    topik_kategori = case when p_patch ? 'topik_kategori' then p_patch -> 'topik_kategori' else topik_kategori end
  where id = 1;
  -- jumlah soal berubah: paket dibuat ulang
  if (p_patch ? 'n1') and (p_patch ->> 'n1')::int <> g.n1 then perform _buat_paket(1); end if;
  if (p_patch ? 'n2') and (p_patch ->> 'n2')::int <> g.n2 then perform _buat_paket(2); end if;
  return json_build_object('ok', true);
end $$;

create or replace function public.admin_acak_paket(p_token uuid, p_level int)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare ids text[];
begin
  perform _admin_dari_token(p_token);
  ids := _buat_paket(p_level);
  return json_build_object('ok', true, 'jumlah', cardinality(ids));
end $$;

create or replace function public.admin_tambah_peserta(p_token uuid, p_nama text, p_kategori text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
begin
  perform _admin_dari_token(p_token);
  if char_length(trim(p_nama)) < 3 then raise exception 'NAMA_TERLALU_PENDEK'; end if;
  if exists (select 1 from peserta where lower(nama) = lower(trim(p_nama))) then
    update peserta set aktif = true where lower(nama) = lower(trim(p_nama));
    return json_build_object('ok', true, 'aktifkan_lagi', true);
  end if;
  insert into peserta (nama, kategori, pin_hash) values (trim(p_nama), p_kategori, crypt('1234', gen_salt('bf', 8)));
  return json_build_object('ok', true);
end $$;

create or replace function public.admin_hapus_peserta(p_token uuid, p_nama text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare pid bigint;
begin
  perform _admin_dari_token(p_token);
  update peserta set aktif = false where nama = p_nama returning id into pid;
  delete from sesi where peserta_id = pid;
  return json_build_object('ok', pid is not null);
end $$;

create or replace function public.admin_reset_pin(p_token uuid, p_nama text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
begin
  perform _admin_dari_token(p_token);
  update peserta set pin_hash = crypt('1234', gen_salt('bf', 8)), pin_default = true, gagal_login = 0, kunci_sampai = null
   where nama = p_nama;
  return json_build_object('ok', found);
end $$;

-- buka lagi kesempatan kuis (hapus hasil level tertentu, atau semua bila p_level null)
create or replace function public.admin_buka_kuis(p_token uuid, p_nama text, p_level int default null)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare pid bigint; n int;
begin
  perform _admin_dari_token(p_token);
  select id into pid from peserta where nama = p_nama;
  delete from hasil_kuis where peserta_id = pid and (p_level is null or level = p_level);
  get diagnostics n = row_count;
  delete from percobaan where peserta_id = pid and (p_level is null or level = p_level);
  return json_build_object('ok', true, 'dihapus', n);
end $$;

create or replace function public.admin_soal_simpan(p_token uuid, p_level int, p_data jsonb)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare nid text; t text;
begin
  perform _admin_dari_token(p_token);
  nid := (case when p_level = 1 then 'a' else 'c' end) || to_char(now(), 'YYMMDDHH24MISS') || substr(md5(random()::text), 1, 4);
  if p_level = 1 then
    t := coalesce(p_data ->> 'tipe', 'basket');
    if t not in ('basket','pg','bs','hitung') then raise exception 'TIPE_TIDAK_VALID'; end if;
    insert into soal_l1 (id, tipe, item, opts, ans, topic, why, hint)
    values (nid, t, p_data ->> 'item', case when t in ('pg','hitung') then p_data -> 'opts' end,
            p_data ->> 'ans', p_data ->> 'topic', p_data ->> 'why', p_data ->> 'hint');
  else
    insert into soal_l2 (id, who, topics, story, ask, opts, ok, why, hint)
    values (nid, p_data ->> 'who', array(select jsonb_array_elements_text(p_data -> 'topics')), p_data ->> 'story',
            p_data ->> 'ask', p_data -> 'opts', (p_data ->> 'ok')::int, p_data ->> 'why', p_data ->> 'hint');
  end if;
  return json_build_object('ok', true, 'id', nid);
end $$;

drop function if exists public.admin_soal_hapus(uuid, int, text);

-- ganti satu soal di paket dengan soal aktif lain (Level 1: tipe yang sama bila tersedia)
create or replace function public._ganti_di_paket(p_level int, p_id text)
returns boolean language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare g pengaturan; pk text[]; t text; pengganti text;
begin
  select * into g from pengaturan where id = 1;
  pk := case when p_level = 1 then g.paket_l1 else g.paket_l2 end;
  if not (p_id = any(pk)) then return false; end if;
  if p_level = 1 then
    select tipe into t from soal_l1 where id = p_id;
    select id into pengganti from soal_l1 where aktif and not (id = any(pk))
      order by (tipe = t) desc, random() limit 1;
  else
    select id into pengganti from soal_l2 where aktif and not (id = any(pk)) order by random() limit 1;
  end if;
  if pengganti is null then pk := array_remove(pk, p_id);
  else pk := array_replace(pk, p_id, pengganti); end if;
  if p_level = 1 then update pengaturan set paket_l1 = pk, paket_l1_at = now() where id = 1;
  else update pengaturan set paket_l2 = pk, paket_l2_at = now() where id = 1; end if;
  delete from percobaan where level = p_level;
  return true;
end $$;

-- nyalakan / matikan soal (tidak menghapus)
create or replace function public.admin_soal_aktif(p_token uuid, p_level int, p_id text, p_aktif boolean)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare diganti boolean := false;
begin
  perform _admin_dari_token(p_token);
  if p_level = 1 then update soal_l1 set aktif = p_aktif where id = p_id;
  else update soal_l2 set aktif = p_aktif where id = p_id; end if;
  if not p_aktif then diganti := _ganti_di_paket(p_level, p_id); end if;
  return json_build_object('ok', true, 'paket_diubah', diganti);
end $$;

create or replace function public.admin_ganti_password(p_token uuid, p_lama text, p_baru text)
returns json language plpgsql security definer
set search_path = public, extensions, pg_temp as $$
declare u text; a admin_akun;
begin
  u := _admin_dari_token(p_token);
  select * into a from admin_akun where username = u;
  if a.pass_hash <> crypt(coalesce(p_lama,''), a.pass_hash) then raise exception 'PASSWORD_LAMA_SALAH'; end if;
  if char_length(coalesce(p_baru,'')) < 8 then raise exception 'PASSWORD_TERLALU_PENDEK'; end if;
  update admin_akun set pass_hash = crypt(p_baru, gen_salt('bf', 10)) where username = u;
  return json_build_object('ok', true);
end $$;

-- ---------------------------------------------------------------- hak akses
revoke all on all tables in schema public from anon, authenticated;
revoke execute on all functions in schema public from public, anon, authenticated;

grant execute on function
  public.daftar_nama(), public.pengaturan_publik(),
  public.login_peserta(text, text), public.profil_saya(uuid), public.ganti_pin(uuid, text, text), public.keluar(uuid),
  public.mulai_kuis(uuid, int), public.jawab_l1(uuid, int, text), public.selesai_kuis(uuid, int, jsonb),
  public.pembahasan(uuid, int), public.kirim_saran(uuid, text, int, text),
  public.login_admin(text, text), public.admin_ringkasan(uuid), public.admin_atur(uuid, jsonb),
  public.admin_tambah_peserta(uuid, text, text), public.admin_hapus_peserta(uuid, text), public.admin_reset_pin(uuid, text),
  public.admin_buka_kuis(uuid, text, int), public.admin_soal_simpan(uuid, int, jsonb), public.admin_acak_paket(uuid, int), public.admin_soal_aktif(uuid, int, text, boolean),
  public.admin_ganti_password(uuid, text, text)
to anon, authenticated;

-- fungsi baru berikutnya tidak otomatis terbuka untuk publik
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;
