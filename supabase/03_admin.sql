-- =====================================================================
-- CELENGAN · Akun admin
-- 1. Ganti teks GANTI_PASSWORD_INI di bawah dengan password baru (min. 8 karakter).
-- 2. Jalankan di Supabase > SQL Editor.
-- 3. Jangan simpan file ini di repo publik setelah password diisi.
-- Password disimpan sebagai hash bcrypt, tidak pernah tersimpan dalam teks asli.
-- =====================================================================
insert into public.admin_akun (username, pass_hash)
values ('irv21', extensions.crypt('GANTI_PASSWORD_INI', extensions.gen_salt('bf', 10)))
on conflict (username) do update set pass_hash = excluded.pass_hash, gagal_login = 0, kunci_sampai = null;
