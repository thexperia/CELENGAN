# CELENGAN · Panduan Deploy

Arsitektur: **Supabase** (database + fungsi keamanan) dan **Vercel** (hosting halaman web). Keduanya cukup memakai paket gratis untuk sekitar 170 peserta.

```
celengan/
├── public/              ← yang di-hosting di Vercel
│   ├── index.html       aplikasi (tanpa kunci jawaban dan daftar nama)
│   └── config.js        isi URL dan key Supabase di sini
├── supabase/
│   ├── 01_schema.sql    tabel, keamanan, dan semua fungsi
│   ├── 02_seed.sql      168 peserta (PIN awal 1234), 47 soal Level 1, 23 kasus Level 2
│   └── 03_admin.sql     akun admin, isi password dulu
├── src/                 kode sumber + build.py (untuk mengubah materi/tampilan)
├── celengan-demo.html   versi demo satu file (data hanya di browser)
└── vercel.json
```

---

## Langkah 1 · Siapkan database di Supabase (±10 menit)

1. Buka **supabase.com**, daftar/masuk, lalu **New project**.
   - Name: `celengan`
   - Database password: buat yang kuat dan simpan
   - Region: **Southeast Asia (Singapore)**, paling dekat dengan Yogyakarta
2. Tunggu proyek selesai dibuat (1 sampai 2 menit).
3. Buka menu **SQL Editor** → **New query**. Jalankan file berikut **berurutan**. Caranya: buka file, salin seluruh isinya, tempel, lalu klik **Run**.
   1. `supabase/01_schema.sql`
   2. `supabase/02_seed.sql`
   3. `supabase/03_admin.sql` → **sebelum di-Run, ganti teks `GANTI_PASSWORD_INI` dengan password admin baru** (minimal 8 karakter). Password lama `21109812` sudah tidak dipakai.
4. Cek hasilnya di **Table Editor**: tabel `peserta` berisi 168 baris, `soal_l1` 47 baris, `soal_l2` 23 baris.
   Jika sebelumnya sudah menjalankan versi lama, cukup jalankan ulang `01_schema.sql` dan `02_seed.sql`. Skema akan menyesuaikan sendiri tanpa menghapus data peserta dan hasil kuis.
5. Buka **Project Settings → API Keys** (atau **Data API**), lalu catat:
   - **Project URL**, contoh `https://abcdxyz.supabase.co`
   - **Publishable key** (`sb_publishable_...`) atau **anon public key** (`eyJ...`). Keduanya bisa dipakai.
   - ⚠️ Jangan pernah memakai **secret key / service_role key** di aplikasi.

## Langkah 2 · Isi `public/config.js`

```js
window.CELENGAN_CONFIG = {
  supabaseUrl: 'https://abcdxyz.supabase.co',
  supabaseAnonKey: 'sb_publishable_xxxxxxxx'
};
```

Key ini memang boleh terlihat publik. Semua tabel dikunci (Row Level Security tanpa policy), sehingga key tersebut hanya bisa memanggil fungsi yang sudah disiapkan, dan setiap fungsi memeriksa sesi login sendiri.

Uji dulu di komputer: buka `public/index.html` lewat server lokal, misalnya `npx serve public` atau `python3 -m http.server -d public`, lalu login dengan nama mana pun + PIN `1234`. Kalau di layar awal masih muncul **MODE DEMO**, berarti `config.js` belum terbaca.

## Langkah 3 · Deploy ke Vercel (±5 menit)

**Cara A · lewat GitHub (disarankan, update berikutnya otomatis)**
1. Buat repository **private** di GitHub, lalu unggah seluruh isi folder `celengan/` (kecuali file SQL admin yang sudah berisi password).
2. Buka **vercel.com** → masuk dengan akun GitHub → **Add New → Project** → pilih repository tadi.
3. Framework Preset: **Other**. Build command: kosongkan. `vercel.json` sudah mengarahkan output ke folder `public`.
4. Klik **Deploy**. Dalam 1 menit kamu mendapat alamat seperti `https://celengan-xxx.vercel.app`.
5. Opsional: ganti nama alamat lewat **Settings → Domains**, misalnya `celengan-bidiy.vercel.app`.

**Cara B · lewat Vercel CLI (tanpa GitHub)**
```bash
npm i -g vercel
cd celengan
vercel --prod
```

Setiap kali ada perubahan, cukup push ke GitHub (Cara A) atau jalankan `vercel --prod` lagi (Cara B).

## Langkah 4 · Sebelum dibagikan ke peserta

- [ ] Login admin dengan `irv21` + password baru. Buka **Bank Soal**, cek paket soal aktif, dan tekan **Acak Ulang** sekali jika ingin paket baru. Lakukan ini sebelum periode dimulai.
- [ ] **Atur Periode Kuis** (tanggal mulai dan selesai). Tanpa periode, kuis bisa dikerjakan kapan saja dan skor kecepatan belum dihitung.
- [ ] Coba login sebagai 1 peserta, kerjakan kuis, lalu **Buka ulang** kesempatannya dari panel admin supaya data uji coba bersih.
- [ ] Verifikasi ulang kontak OJK 157 / WhatsApp 081 157 157 157 di materi.
- [ ] Bagikan link + info: "Login dengan nama, PIN awal 1234, lalu segera ganti PIN."

---

## Aturan yang dijaga server (bukan di browser)

| Aturan | Cara kerjanya |
|---|---|
| Paket soal seragam | Soal dipilih acak sekali menjadi "paket", lalu semua peserta mendapat soal dan urutan yang sama. Level 1 diambil bergiliran per tipe (keranjang, pilihan ganda, benar atau salah, hitung cepat) supaya selalu tercampur. Admin bisa **Acak Ulang** paket kapan saja. |
| Kuis 1x per level | Tabel `hasil_kuis` punya kunci unik peserta + level. Percobaan kedua otomatis ditolak. |
| Keluar di tengah tidak dihitung | Skor baru dihitung setelah semua soal dijawab. Level 1: jawaban yang sudah dikunci tetap tersimpan, peserta melanjutkan dari soal berikutnya (agar tidak bisa mencoba ulang soal yang sama). Level 2: pilihan belum tersimpan, peserta mulai lagi dari awal. |
| Kunci jawaban rahasia | Soal dikirim tanpa kunci. Skor dihitung di database. Pembahasan baru dikirim setelah dikumpulkan. |
| Skor akhir leaderboard | 80% × rata-rata skor L1 dan L2 + 20% × kecepatan. Kecepatan = 100 di awal periode, turun proporsional sampai 0 di akhir periode, dihitung per level lalu dirata-rata. |
| PIN dan password | Disimpan sebagai hash bcrypt. 5 kali PIN salah, akun terkunci 10 menit (admin 15 menit). |
| Periode kuis | Di luar tanggal mulai sampai selesai (WIB), kuis tidak bisa dimulai. |

## Tugas admin sehari-hari

- **Buka ulang kesempatan kuis**: Panel Admin → Peserta → Kelola → Buka ulang Level 1/2.
- **Reset PIN** (peserta lupa PIN): Peserta → Kelola → Reset PIN ke 1234.
- **Tambah peserta baru**: Peserta → Tambah. Peserta keluar: Kelola → Nonaktifkan.
- **Saran**: menu Saran peserta, juga ikut di file rekap.
- **Unduh rekap Excel**: berisi sheet Rekap Peserta, Leaderboard, dan Saran.
- **Ganti password admin**: Panel Admin → Akun.

## Catatan paket gratis

- Proyek Supabase gratis akan **di-pause otomatis jika tidak ada aktivitas selama 7 hari**. Saat periode kuis berjalan ini tidak terjadi. Kalau ter-pause, cukup klik **Restore** di dashboard Supabase.
- Lakukan backup berkala: Table Editor → `hasil_kuis` → Export CSV, atau unduh rekap Excel dari panel admin.

## Mengubah materi, soal, atau tampilan

- **Soal kuis**: tambah/hapus langsung dari Panel Admin → Bank Soal (tidak perlu deploy ulang). Level 1 punya 4 tipe soal. Soal tidak dihapus, cukup dinyalakan atau dimatikan dengan tombol geser. Soal yang dimatikan saat sedang dipakai paket akan diganti otomatis dengan soal aktif lain bertipe sama.
- **Materi belajar, Mitos atau Fakta, studi kasus, kamus**: edit `src/materi_1.js` sampai `src/materi_4.js` (19 topik), `src/modul.js`, `src/gloss.js`, lalu jalankan `python3 src/build.py` (butuh Python 3 dan Node.js) dan deploy ulang. File `public/config.js` milikmu tidak tertimpa.
