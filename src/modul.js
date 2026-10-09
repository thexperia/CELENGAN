/* ---------- Konten modul belajar per topik ----------
   mf   : Mitos atau Fakta (a: 'm' mitos, 'f' fakta)
   cs   : Kamu Pilih Apa? (situasi chat, opsi dengan good/h/p)
   take : 3 poin penting (dipakai di mode Baca dan layar selesai)
*/
var MODUL = {
 dasar:{
  mf:[
   {q:'Kalau gaji sudah besar, mencatat pengeluaran tidak perlu lagi.', a:'m', why:'Gaji besar tetap bisa habis tanpa jejak. Catatan pengeluaran membantu melihat ke mana uang pergi, berapa pun penghasilannya.'},
   {q:'Menabung di awal bulan lebih berhasil daripada menabung dari sisa belanja.', a:'f', why:'Prinsip "bayar diri sendiri dulu". Pengeluaran cenderung menyesuaikan saldo, jadi sisa di akhir bulan sering kali nol.'},
   {q:'Kekayaan bersih dihitung dari total aset dikurangi total utang.', a:'f', why:'Benar. Angka ini lebih menggambarkan kesehatan keuangan dibanding besar gaji.'},
   {q:'Porsi anggaran 50/30/20 wajib diikuti persis, tidak boleh diubah.', a:'m', why:'50/30/20 adalah panduan umum. Porsinya boleh disesuaikan dengan kondisi, asalkan pos tabungan tetap disisihkan lebih dulu.'}
  ],
  cs:{from:'Dimas', role:'Teman satu unit', msgs:['Eh gajian kok udah tipis aja ya tanggal 20 😅','Padahal aku nggak beli barang mahal.','Kamu ada trik biar nggak boncos tiap bulan?'], ask:'Saran apa yang kamu berikan?',
   opts:[
    {t:'Catat pengeluaran 2 minggu, lalu buat anggaran dan sisihkan tabungan di awal bulan', good:true, h:'Saran yang tepat!', p:'Dimas jadi tahu uangnya bocor di jajan dan langganan aplikasi. Setelah menabung di awal bulan, sisa gajinya cukup sampai akhir bulan.'},
    {t:'Pakai paylater dulu, nanti dibayar saat gajian berikutnya', good:false, h:'Masalahnya cuma ditunda', p:'Tagihan paylater memotong gaji bulan depan, sehingga Dimas makin cepat kehabisan uang dan mulai terjebak utang konsumtif.'}
   ]},
  take:['Arus kas positif berarti masih ada sisa untuk ditabung atau diinvestasikan.','Sisihkan tabungan begitu gaji masuk, lalu belanjakan sisanya.','Hitung kekayaan bersih minimal setahun sekali: total aset dikurangi total utang.']
 },
 nabung:{
  mf:[
   {q:'Dana darurat sebaiknya disimpan di saham supaya cepat bertambah.', a:'m', why:'Nilai saham bisa turun tepat saat dana dibutuhkan. Dana darurat perlu aman dan cepat cair, misalnya tabungan terpisah atau reksa dana pasar uang.'},
   {q:'Orang yang sudah menikah butuh dana darurat lebih besar dari yang lajang.', a:'f', why:'Panduan umum: 3 bulan pengeluaran untuk lajang, 6 bulan untuk yang menikah, ditambah sekitar 1 bulan per anak.'},
   {q:'Diskon besar akhir tahun termasuk alasan sah memakai dana darurat.', a:'m', why:'Dana darurat untuk kejadian mendesak yang tidak direncanakan, seperti sakit atau kehilangan penghasilan. Belanja diskon bukan darurat.'},
   {q:'Simpanan di bank peserta LPS dijamin hingga Rp2 miliar per nasabah per bank.', a:'f', why:'Benar, selama bunga simpanannya tidak melebihi tingkat bunga penjaminan LPS.'}
  ],
  cs:{from:'Mbak Wulan', role:'Rekan kerja', msgs:['Aku baru kumpulin dana darurat 15 juta nih 🎉','Tapi ada promo HP baru, cicilan 0%...','Pakai dana darurat dulu nggak apa-apa kali ya? Nanti diisi lagi.'], ask:'Kamu sarankan apa?',
   opts:[
    {t:'Tahan dulu. Dana darurat khusus untuk kejadian mendesak', good:true, h:'Tepat!', p:'Dua bulan kemudian motor Mbak Wulan rusak berat. Biaya perbaikan bisa dibayar dari dana darurat tanpa perlu berutang.'},
    {t:'Pakai saja, toh nanti bisa diisi lagi', good:false, h:'Bantalannya jadi hilang', p:'Saat motornya rusak, dana darurat sudah terpakai untuk HP. Mbak Wulan terpaksa pinjam ke teman dan menunda tabungan berbulan-bulan.'}
   ]},
  take:['Target dana darurat: 3 bulan (lajang), 6 bulan (menikah), plus sekitar 1 bulan per anak.','Simpan di tempat aman dan cepat cair, terpisah dari rekening gaji.','Pakai hanya untuk kejadian mendesak yang tidak direncanakan.']
 },
 utang:{
  mf:[
   {q:'Membayar tagihan minimum kartu kredit setiap bulan sudah cukup aman.', a:'m', why:'Sisa tagihan terus berbunga, sehingga utang lama lunas dan total bunga membengkak.'},
   {q:'Total cicilan sebaiknya tidak lebih dari 30% penghasilan bersih.', a:'f', why:'Ini panduan umum batas aman. Di atas itu, ruang untuk menabung dan kebutuhan pokok mulai terjepit.'},
   {q:'Telat bayar paylater tidak berpengaruh pada pengajuan KPR nanti.', a:'m', why:'Riwayat paylater tercatat di SLIK OJK. Catatan telat bayar bisa mempersulit pengajuan kredit berikutnya.'},
   {q:'Metode avalanche melunasi utang berbunga tertinggi lebih dulu.', a:'f', why:'Benar. Cara ini membuat total bunga yang dibayar paling hemat.'}
  ],
  cs:{from:'Andi', role:'Teman kos lama', msgs:['Bro, cicilanku sekarang 45% dari gaji 😩','Ada KTA, kartu kredit, sama paylater.','Mau ambil cicilan mobil juga, gimana menurutmu?'], ask:'Kamu jawab apa?',
   opts:[
    {t:'Tunda mobil. Lunasi dulu utang berbunga tertinggi sampai cicilan di bawah 30%', good:true, h:'Saran yang sehat!', p:'Andi fokus melunasi kartu kredit lebih dulu. Setahun kemudian rasio cicilannya turun ke 25% dan ia bisa mulai menabung lagi.'},
    {t:'Ambil saja, mobil kan aset', good:false, h:'Rasio cicilannya makin berat', p:'Cicilan Andi naik melewati 60% gaji. Beberapa tagihan mulai telat dan tercatat di SLIK, sehingga pengajuan kredit berikutnya ditolak.'}
   ]},
  take:['Jaga total cicilan maksimal 30% dari penghasilan bersih.','Bayar tagihan kartu kredit penuh. Tagihan minimum membuat bunga menumpuk.','Bayar tepat waktu karena riwayat kredit tercatat di SLIK OJK.']
 },
 investasi:{
  mf:[
   {q:'Investasi dengan untung tinggi biasanya juga punya risiko tinggi.', a:'f', why:'Risiko dan imbal hasil berjalan searah. Tawaran untung besar tanpa risiko patut dicurigai.'},
   {q:'Kalau imbal hasil investasi di bawah inflasi, daya beli uang tetap terjaga.', a:'m', why:'Imbal hasil perlu di atas inflasi. Kalau di bawahnya, daya beli uangmu justru tergerus.'},
   {q:'Menaruh semua dana di satu saham favorit adalah bentuk diversifikasi.', a:'m', why:'Diversifikasi berarti menyebar dana ke beberapa jenis aset agar kerugian satu aset bisa diimbangi aset lain.'},
   {q:'Dengan Rule of 72, uang yang tumbuh 8% per tahun jadi dua kali lipat sekitar 9 tahun.', a:'f', why:'72 dibagi 8 sama dengan 9. Cara cepat untuk memperkirakan efek bunga majemuk.'}
  ],
  cs:{from:'Sinta', role:'Adik tingkat', msgs:['Kak, aku baru kerja dan mau mulai investasi 💸','Semua tabunganku mau aku taruh di satu saham yang lagi naik.','Biar cepet cuan. Oke nggak?'], ask:'Kamu sarankan apa?',
   opts:[
    {t:'Kenali profil risiko dulu, siapkan dana darurat, lalu sebar ke beberapa instrumen', good:true, h:'Langkah yang bijak!', p:'Sinta mulai dari reksa dana pasar uang untuk dana darurat, lalu menyebar sisanya. Saat saham favoritnya turun 30%, portofolionya hanya turun sedikit.'},
    {t:'Gas aja, mumpung harganya lagi naik', good:false, h:'Semua telur di satu keranjang', p:'Sebulan kemudian harga saham itu anjlok. Tabungan Sinta turun drastis dan ia tidak punya dana cadangan saat butuh.'}
   ]},
  take:['Makin tinggi potensi imbal hasil, makin tinggi pula risikonya.','Pilih instrumen sesuai profil risiko dan jangka waktu tujuanmu.','Sebar dana ke beberapa aset dan biarkan bunga majemuk bekerja.']
 },
 asuransi:{
  mf:[
   {q:'Asuransi kesehatan sebaiknya dimiliki lebih dulu sebelum asuransi lain.', a:'f', why:'Umumnya proteksi kesehatan didahulukan, misalnya BPJS Kesehatan sebagai dasar.'},
   {q:'Orang lajang tanpa tanggungan paling butuh asuransi jiwa yang besar.', a:'m', why:'Asuransi jiwa penting ketika ada anggota keluarga yang bergantung pada penghasilanmu. Tanpa tanggungan, prioritasnya biasanya proteksi kesehatan.'},
   {q:'Unit link pasti memberi hasil investasi yang dijamin.', a:'m', why:'Unit link menggabungkan proteksi dan investasi. Hasil investasinya tidak dijamin dan preminya lebih mahal dari asuransi jiwa berjangka.'},
   {q:'Sebelum membeli polis, pastikan perusahaannya berizin dan diawasi OJK.', a:'f', why:'Benar. Pahami juga pengecualian polis, masa tunggu, dan kesesuaian premi dengan anggaran.'}
  ],
  cs:{from:'Budi', role:'Teman SMA', msgs:['Aku baru punya anak nih 👶','Gajiku satu-satunya sumber nafkah keluarga.','Ada agen nawarin unit link premi 1,5 juta/bulan. Ambil nggak ya?'], ask:'Kamu sarankan apa?',
   opts:[
    {t:'Pastikan BPJS Kesehatan aktif, lalu pertimbangkan asuransi jiwa berjangka yang preminya terjangkau', good:true, h:'Proteksi yang pas!', p:'Dengan premi jauh lebih murah, Budi mendapat uang pertanggungan sekitar 10 kali penghasilan tahunan. Sisa anggarannya bisa ditabung untuk pendidikan anak.'},
    {t:'Ambil unit link, sekalian investasi', good:false, h:'Premi berat, proteksi kecil', p:'Premi 1,5 juta per bulan menekan anggaran keluarga, uang pertanggungannya kecil, dan hasil investasinya tidak dijamin. Setahun kemudian Budi kesulitan membayar premi.'}
   ]},
  take:['Asuransi mengalihkan risiko finansial besar dengan biaya premi yang terukur.','Dahulukan proteksi kesehatan, lalu asuransi jiwa jika ada tanggungan.','Cek izin OJK, pengecualian polis, dan masa tunggu sebelum membeli.']
 },
 pensiun:{
  mf:[
   {q:'Persiapan pensiun cukup dimulai 5 tahun sebelum berhenti bekerja.', a:'m', why:'Semakin awal mulai, semakin lama bunga majemuk bekerja, sehingga setoran bulanannya jauh lebih kecil.'},
   {q:'Kebutuhan dana pensiun kira-kira 70 sampai 80% dari pengeluaran bulanan menjelang pensiun.', a:'f', why:'Ini panduan umum, lalu dikalikan perkiraan lama masa pensiun dan disesuaikan dengan inflasi.'},
   {q:'DPLK hanya boleh diikuti pegawai perusahaan tertentu.', a:'m', why:'DPLK dikelola bank atau perusahaan asuransi dan bisa diikuti siapa pun secara mandiri.'},
   {q:'Menarik dana pensiun lebih awal bisa membuat target pensiun sulit tercapai.', a:'f', why:'Penarikan dini memotong efek bunga majemuk. Untuk kebutuhan mendesak, gunakan dana darurat.'}
  ],
  cs:{from:'Pak Harto', role:'Senior di kantor', msgs:['Dik, saya 6 tahun lagi pensiun.','Saya baru sadar tabungan pensiun belum dihitung sama sekali 😬','Mulai dari mana ya?'], ask:'Kamu sarankan apa?',
   opts:[
    {t:'Hitung kebutuhan pensiun, cek saldo JHT dan JP, lalu tambah setoran rutin misalnya lewat DPLK', good:true, h:'Langkah yang terarah!', p:'Pak Harto jadi tahu kekurangannya. Dengan setoran rutin dan pengeluaran yang dirapikan, targetnya masih bisa dikejar dalam 6 tahun.'},
    {t:'Taruh semua tabungan di investasi berisiko tinggi agar cepat terkejar', good:false, h:'Terlalu berisiko di waktu sempit', p:'Pasar sedang turun tepat menjelang pensiun. Nilai tabungan Pak Harto anjlok dan tidak sempat pulih sebelum ia berhenti bekerja.'}
   ]},
  take:['Mulai sejak muda supaya bunga majemuk bekerja lebih lama.','Targetkan sekitar 70 sampai 80% pengeluaran bulanan menjelang pensiun.','Lengkapi JHT dan JP dengan program mandiri seperti DPLK.']
 },
 ilegal:{
  mf:[
   {q:'Kalau perusahaannya punya kantor dan akta pendirian, investasinya pasti legal.', a:'m', why:'Akta pendirian hanya bukti badan usaha berdiri. Untuk menghimpun dana masyarakat, perusahaan wajib punya izin dari otoritas seperti OJK.'},
   {q:'Janji untung tinggi yang "dijamin tanpa risiko" adalah tanda bahaya.', a:'f', why:'Setiap investasi punya risiko. Untung tinggi yang dijamin hampir selalu ciri penipuan.'},
   {q:'Investasi yang dipromosikan artis atau tokoh terkenal pasti aman.', a:'m', why:'Promosi tokoh terkenal tidak membuktikan izin. Banyak investasi ilegal sengaja memakai endorsement agar terlihat terpercaya.'},
   {q:'Legalitas tawaran investasi bisa dicek lewat Kontak OJK 157.', a:'f', why:'Benar. Hubungi 157 atau WhatsApp 081 157 157 157 untuk menanyakan izin sebuah entitas.'}
  ],
  cs:{from:'Rina', role:'Teman kantor', msgs:['Ikut yuk robot trading. Profit 1% per hari! 🤑','Aku udah cair 3x lho, beneran masuk rekening.','Deposit min. 2 juta. Pendaftaran tutup malam ini ya!'], ask:'Kamu pilih apa?',
   opts:[
    {t:'Langsung ikut, Rina sudah terbukti cair', good:false, h:'Hati-hati, ini jebakan umum', p:'Pencairan di awal sering dipakai untuk memancing anggota baru. Beberapa bulan kemudian aplikasinya tidak bisa diakses dan dana Rp2 juta hilang.'},
    {t:'Cek dulu izinnya lewat Kontak OJK 157', good:true, h:'Pilihan tepat!', p:'Ternyata entitas itu tidak berizin dan sudah masuk daftar investasi ilegal. Uangmu aman, dan kamu bisa mengingatkan Rina.'}
   ]},
  take:['Untung tinggi yang dijamin tanpa risiko adalah tanda bahaya.','Pakai rumus 2L: Legal (ada izin OJK?) dan Logis (masuk akal?).','Ragu? Tanya Kontak OJK 157 atau WhatsApp 081 157 157 157.']
 },
 reksadana:{
  mf:[
   {q:'Reksa dana bisa dimulai dengan nominal kecil.', a:'f', why:'Banyak reksa dana bisa dibeli mulai puluhan ribu rupiah, sehingga cocok untuk pemula.'},
   {q:'Reksa dana saham punya risiko paling rendah di antara jenis reksa dana.', a:'m', why:'Urutannya dari risiko terendah: pasar uang, pendapatan tetap, campuran, lalu saham dengan risiko tertinggi.'},
   {q:'Pokok dan kupon SBN ritel dijamin oleh negara.', a:'f', why:'Benar. Contohnya ORI, SBR, Sukuk Ritel, dan Sukuk Tabungan.'},
   {q:'SBR bisa diperjualbelikan bebas di pasar sekunder seperti ORI.', a:'m', why:'SBR tidak bisa diperdagangkan, tetapi bisa dicairkan sebagian lebih awal sesuai ketentuan. ORI yang bisa diperdagangkan di pasar sekunder.'}
  ],
  cs:{from:'Fajar', role:'Teman satu angkatan', msgs:['Aku mau nabung buat DP rumah, butuhnya 2 tahun lagi 🏠','Bingung pilih reksa dana saham atau pasar uang/pendapatan tetap.','Yang mana ya?'], ask:'Kamu sarankan apa?',
   opts:[
    {t:'Untuk 2 tahun, pilih yang risikonya lebih rendah seperti pasar uang atau pendapatan tetap, atau SBN ritel', good:true, h:'Cocok dengan jangka waktunya!', p:'Nilai tabungan Fajar tumbuh stabil. Saat waktunya membayar DP, dananya siap tanpa harus menunggu pasar pulih.'},
    {t:'Reksa dana saham saja, potensi untungnya paling besar', good:false, h:'Jangka waktunya terlalu pendek', p:'Setahun sebelum DP, pasar saham turun tajam. Nilai reksa dana Fajar anjlok dan rencana beli rumah harus ditunda.'}
   ]},
  take:['Reksa dana dikelola manajer investasi dan bisa dimulai dengan nominal kecil.','Sesuaikan jenis reksa dana dengan jangka waktu dan profil risikomu.','SBN ritel seperti ORI dan SBR dijamin negara, pokok maupun kuponnya.']
 },
 saham:{
  mf:[
   {q:'Membeli saham berarti ikut memiliki sebagian perusahaan.', a:'f', why:'Saham adalah bukti kepemilikan. Pemegangnya berhak atas dividen dan bisa mendapat capital gain.'},
   {q:'Satu lot saham di BEI berisi 1.000 lembar.', a:'m', why:'Satu lot berisi 100 lembar saham.'},
   {q:'Semua perusahaan wajib membagikan dividen setiap tahun.', a:'m', why:'Dividen dibagikan berdasarkan keputusan RUPS. Tidak semua perusahaan membagikannya setiap tahun.'},
   {q:'Untuk membeli saham, kita perlu membuka rekening efek di sekuritas berizin OJK.', a:'f', why:'Benar. Kamu juga akan mendapat Rekening Dana Nasabah (RDN) untuk menampung dana transaksi.'}
  ],
  cs:{from:'Grup Investor Pemula', role:'Grup WhatsApp', msgs:['📢 Saham XYZ pasti naik 50% minggu ini!','Info orang dalam, jangan sampai ketinggalan 🚀','Beli sekarang sebelum ARA!'], ask:'Kamu pilih apa?',
   opts:[
    {t:'Abaikan, lalu pelajari dulu kinerja perusahaannya sebelum membeli saham apa pun', good:true, h:'Keputusan yang tenang!', p:'Esoknya saham XYZ sempat naik lalu turun tajam setelah ramai dijual. Kamu terhindar dari kerugian karena tidak ikut-ikutan.'},
    {t:'Langsung beli, mumpung belum naik', good:false, h:'Terjebak euforia', p:'Kamu membeli di harga puncak. Beberapa hari kemudian harganya turun berturut-turut dan modalmu menyusut.'}
   ]},
  take:['Saham adalah bukti kepemilikan sebagian perusahaan.','Satu lot berisi 100 lembar. Mulai dari sekuritas berizin OJK.','Jangan beli karena rumor. Pelajari perusahaannya lebih dulu.']
 },
 funda:{
  mf:[
   {q:'Laba bersih yang besar selalu berarti perusahaan punya banyak uang tunai.', a:'m', why:'Laba bisa tercatat walau uangnya belum diterima. Arus kas operasi yang menunjukkan uang tunai benar-benar masuk.'},
   {q:'PER yang tinggi berarti harga saham relatif mahal dibanding labanya.', a:'f', why:'PER = harga saham dibagi laba per saham. Makin tinggi, makin mahal relatif terhadap laba.'},
   {q:'DER tinggi menandakan perusahaan banyak dibiayai utang.', a:'f', why:'Benar. Perusahaan dengan DER tinggi lebih rentan saat suku bunga naik.'},
   {q:'PBV di bawah 1 pasti berarti sahamnya bagus untuk dibeli.', a:'m', why:'PBV di bawah 1 hanya berarti harga pasar di bawah nilai buku. Tetap perlu cek kinerja, utang, dan prospek bisnisnya.'}
  ],
  cs:{from:'Reza', role:'Teman diskusi saham', msgs:['Saham ABC PER-nya cuma 4x, murah banget! 😍','Tapi DER-nya 3x dan arus kas operasinya negatif 2 tahun.','Serok nggak nih?'], ask:'Kamu sarankan apa?',
   opts:[
    {t:'Hati-hati. Murah belum tentu sehat, cek dulu utang dan arus kasnya', good:true, h:'Analisis yang lengkap!', p:'Reza menunda pembelian. Beberapa bulan kemudian perusahaan itu kesulitan membayar utang dan harga sahamnya terus turun.'},
    {t:'Serok! PER rendah pasti undervalued', good:false, h:'Hanya melihat satu rasio', p:'Utang besar dan arus kas negatif membuat perusahaan kesulitan bayar bunga. Harga sahamnya turun lebih dalam lagi.'}
   ]},
  take:['Baca tiga laporan: neraca, laba rugi, dan arus kas.','Arus kas operasi yang positif menunjukkan bisnis benar-benar menghasilkan uang.','Nilai saham dari beberapa rasio sekaligus: PER, PBV, ROE, dan DER.']
 },
 teknikal:{
  mf:[
   {q:'Satu candlestick memuat harga pembukaan, penutupan, tertinggi, dan terendah.', a:'f', why:'Benar. Badan hijau berarti harga naik, badan merah berarti harga turun dalam periode itu.'},
   {q:'RSI di atas 70 berarti harga pasti segera turun.', a:'m', why:'RSI di atas 70 hanya sering dianggap jenuh beli. Harga bisa tetap naik lebih lama.'},
   {q:'Tren naik ditandai puncak dan lembah yang makin tinggi.', a:'f', why:'Higher high dan higher low adalah ciri tren naik.'},
   {q:'Kenaikan harga dengan volume tipis sama meyakinkannya dengan volume besar.', a:'m', why:'Volume menunjukkan kekuatan di balik pergerakan. Kenaikan dengan volume besar biasanya lebih meyakinkan.'}
  ],
  cs:{from:'Tika', role:'Teman kantor', msgs:['Lihat deh, saham ini tembus resistance! 📈','Tapi volumenya kecil banget hari ini.','Langsung beli semua modal?'], ask:'Kamu sarankan apa?',
   opts:[
    {t:'Tunggu konfirmasi volume, dan tetap atur batas rugi serta porsi modal', good:true, h:'Disiplin yang tepat!', p:'Esoknya harga kembali turun di bawah resistance. Tika tidak rugi besar karena belum masuk dengan seluruh modal.'},
    {t:'Beli semua sekarang sebelum terlambat', good:false, h:'Sinyalnya belum kuat', p:'Kenaikan tanpa volume ternyata rapuh. Harga berbalik turun dan seluruh modal Tika tertahan di posisi rugi.'}
   ]},
  take:['Candlestick merangkum harga buka, tutup, tertinggi, dan terendah.','Support menahan penurunan, resistance menahan kenaikan.','Konfirmasi sinyal dengan volume. Indikator bukan kepastian.']
 },
 emas:{
  mf:[
   {q:'Emas cocok untuk jual beli cepat dalam hitungan minggu.', a:'m', why:'Ada spread antara harga jual dan buyback, sehingga jual beli jangka pendek cenderung rugi.'},
   {q:'Emas sering dipakai untuk menjaga daya beli dalam jangka panjang.', a:'f', why:'Harga emas cenderung bertahan saat inflasi tinggi atau pasar bergejolak.'},
   {q:'Platform emas digital yang menjanjikan imbal hasil tetap adalah hal wajar.', a:'m', why:'Harga emas naik turun. Janji imbal hasil tetap dari emas patut dicurigai.'},
   {q:'Saat membeli emas batangan, sertifikat dan kemasannya perlu disimpan.', a:'f', why:'Benar. Ini memudahkan saat menjual kembali. Cek juga harga buyback sebelum membeli.'}
  ],
  cs:{from:'Lina', role:'Sepupu', msgs:['Aku beli emas 10 gram minggu lalu ✨','Mau aku jual minggu depan biar dapat untung cepat.','Masuk akal kan?'], ask:'Kamu jawab apa?',
   opts:[
    {t:'Kurang cocok. Emas untuk jangka menengah dan panjang karena ada spread', good:true, h:'Penjelasan yang tepat!', p:'Lina menahan emasnya untuk biaya sekolah anak 4 tahun lagi. Nilainya terjaga dan selisih spread tertutup oleh kenaikan harga.'},
    {t:'Jual aja, pasti untung', good:false, h:'Tergerus spread', p:'Harga buyback lebih rendah dari harga beli. Setelah seminggu, Lina justru rugi karena selisih spread.'}
   ]},
  take:['Emas berfungsi menjaga nilai dalam jangka menengah hingga panjang.','Perhatikan spread antara harga jual dan buyback.','Beli dari penjual atau platform resmi, dan simpan sertifikatnya.']
 }
};

/* ---------- Modul topik baru v9 ---------- */
MODUL.tujuan = {
  mf:[
   {q:'"Ingin punya rumah" sudah termasuk tujuan keuangan yang SMART.', a:'m', why:'Tujuan SMART butuh angka dan tenggat, misalnya uang muka Rp100 juta dalam 4 tahun.'},
   {q:'Target biaya pendidikan 15 tahun lagi perlu dihitung dengan memperhitungkan kenaikan biaya.', a:'f', why:'Biaya pendidikan naik setiap tahun. Target dengan harga hari ini akan kurang saat waktunya tiba.'},
   {q:'Tujuan jangka pendek di bawah 1 tahun paling cocok ditaruh di saham.', a:'m', why:'Saham bisa turun tajam dalam jangka pendek. Tujuan jangka pendek lebih cocok di tabungan, deposito, atau reksa dana pasar uang.'},
   {q:'Sinking fund membantu menyiapkan pengeluaran besar yang pasti datang, seperti biaya mudik.', a:'f', why:'Dengan menyicil ke pos khusus setiap bulan, pengeluaran besar tidak mengganggu anggaran dan dana darurat.'}
  ],
  cs:{from:'Mas Arif', role:'Rekan satu tim', msgs:['Aku pengen DP rumah 100 juta 💭','Tapi sampai sekarang belum mulai nabung sama sekali.','Mulainya dari mana ya?'], ask:'Saran apa yang kamu berikan?',
   opts:[
    {t:'Tetapkan tenggat (misal 4 tahun), hitung setoran per bulan, lalu otomatiskan dengan autodebet ke instrumen yang sesuai', good:true, h:'Rencana yang terukur!', p:'Mas Arif tahu ia perlu sekitar Rp2 juta per bulan. Dengan autodebet ke reksa dana pendapatan tetap, setorannya berjalan tanpa harus diingat setiap bulan.'},
    {t:'Nabung aja sisa gaji tiap bulan, nanti juga terkumpul', good:false, h:'Tanpa target, mudah gagal', p:'Sisa gaji sering kali habis. Dua tahun kemudian tabungan Mas Arif baru belasan juta dan targetnya terasa makin jauh.'}
   ]},
  take:['Ubah keinginan menjadi tujuan SMART: ada angka dan tenggat.','Hitung target dengan memperhitungkan inflasi atau kenaikan biaya.','Sesuaikan instrumen dengan jangka waktu tujuan.']
};
MODUL.digital = {
  mf:[
   {q:'Pembeli boleh dikenai biaya tambahan saat membayar memakai QRIS.', a:'m', why:'Biaya QRIS (MDR) ditanggung pedagang. BI menegaskan pedagang tidak boleh membebankannya kepada konsumen.'},
   {q:'Biaya maksimal transfer BI-FAST yang boleh dikenakan bank adalah Rp2.500.', a:'f', why:'Benar. BI-FAST memproses transfer antarbank secara real-time 24/7 dengan biaya maksimal Rp2.500.'},
   {q:'Saldo dompet digital dijamin LPS seperti tabungan bank.', a:'m', why:'Uang elektronik tidak termasuk simpanan yang dijamin LPS. Simpan saldo secukupnya untuk transaksi.'},
   {q:'Sebelum membayar dengan QRIS, cek nama pedagang yang tampil di aplikasi.', a:'f', why:'Penipu kadang menempelkan stiker QRIS palsu. Nama merchant di layar harus sesuai dengan toko.'}
  ],
  cs:{from:'Bu Sri', role:'Pedagang kantin', msgs:['Mas, sekarang saya pakai QRIS 😊','Boleh nggak saya tambah Rp1.000 tiap pembeli yang bayar pakai QRIS?','Kan ada potongannya.'], ask:'Kamu jawab apa?',
   opts:[
    {t:'Tidak boleh dibebankan ke pembeli. Untuk usaha mikro, transaksi sampai Rp500 ribu bahkan bebas MDR', good:true, h:'Penjelasan yang tepat!', p:'Bu Sri jadi tahu sebagian besar transaksi kantinnya tidak kena potongan. Pembeli juga tetap nyaman memakai QRIS.'},
    {t:'Boleh saja, kan biayanya memang ada', good:false, h:'Tidak sesuai ketentuan', p:'Pembeli bisa melaporkan praktik ini. Bu Sri juga berisiko kehilangan pelanggan yang merasa dirugikan.'}
   ]},
  take:['QRIS: satu kode untuk semua aplikasi, biaya MDR ditanggung pedagang.','BI-FAST: transfer antarbank real-time dengan biaya maksimal Rp2.500.','Cek nama merchant dan nominal sebelum memasukkan PIN.']
};
MODUL.aman = {
  mf:[
   {q:'Petugas bank resmi bisa meminta kode OTP untuk memverifikasi rekening.', a:'m', why:'Bank, OJK, dan BI tidak pernah meminta OTP, PIN, atau password. Permintaan seperti itu pasti penipuan.'},
   {q:'Undangan pernikahan berbentuk file .apk aman dibuka asal dari nomor yang dikenal.', a:'m', why:'File .apk bisa membaca SMS termasuk OTP. Nomor yang dikenal pun bisa sudah diretas.'},
   {q:'Korban penipuan transfer sebaiknya segera menghubungi bank dan melapor ke IASC.', a:'f', why:'Kecepatan menentukan peluang dana di rekening pelaku sempat diblokir.'},
   {q:'Mengaktifkan autentikasi dua faktor di email membantu melindungi akun keuangan.', a:'f', why:'Email dipakai untuk reset password banyak layanan. Lapisan tambahan membuatnya lebih sulit dibobol.'}
  ],
  cs:{from:'+62 812-xxxx', role:'Nomor tidak dikenal', msgs:['Selamat siang, kami dari Bank XYZ.','Tarif transfer Anda akan naik jadi Rp150.000/bulan 😮','Isi formulir di link ini agar tetap tarif lama: bankxyz-tarif.site'], ask:'Kamu pilih apa?',
   opts:[
    {t:'Abaikan, jangan klik, lalu cek informasi lewat aplikasi atau call center resmi bank', good:true, h:'Kamu aman!', p:'Ternyata tidak ada perubahan tarif. Situs itu dibuat untuk mencuri data login dan OTP. Kamu juga melaporkan nomornya.'},
    {t:'Klik link dan isi data supaya tidak kena tarif baru', good:false, h:'Data bocor', p:'Situs palsu itu merekam username, password, dan OTP. Dalam hitungan menit saldo rekening terkuras.'}
   ]},
  take:['Jangan pernah bagikan PIN, OTP, password, dan CVV.','Jangan pasang file .apk dari chat dan jangan klik tautan mencurigakan.','Jika tertipu: blokir lewat bank, lapor IASC, simpan bukti.']
};
MODUL.moneter = {
  mf:[
   {q:'Inflasi membuat uang tunai yang disimpan lama kehilangan daya beli.', a:'f', why:'Saat harga naik, nominal uang yang sama hanya bisa membeli lebih sedikit barang.'},
   {q:'Kenaikan BI-Rate langsung mengubah semua bunga kredit pada hari yang sama.', a:'m', why:'Dampaknya merambat bertahap melalui beberapa jalur transmisi dan butuh waktu beberapa bulan.'},
   {q:'Saat suku bunga naik, harga obligasi lama cenderung turun.', a:'f', why:'Obligasi baru menawarkan kupon lebih tinggi sehingga obligasi lama berkupon rendah kurang menarik.'},
   {q:'Rupiah yang melemah membuat barang impor menjadi lebih murah.', a:'m', why:'Saat rupiah melemah, dibutuhkan lebih banyak rupiah untuk membeli barang impor sehingga harganya naik.'}
  ],
  cs:{from:'Dina', role:'Teman kuliah', msgs:['Aku mau ambil KPR bunga floating, cicilan awal 4,2 juta 🏠','Gajiku 12 juta.','Aman kan?'], ask:'Kamu sarankan apa?',
   opts:[
    {t:'Hitung juga cicilan jika bunga naik 2 poin, dan pastikan masih di bawah 30-35% gaji', good:true, h:'Antisipasi yang bijak!', p:'Dengan bunga naik 2 poin, cicilan Dina bisa menjadi sekitar 4,8 juta. Ia memilih tenor dan uang muka yang membuat cicilannya tetap aman.'},
    {t:'Aman, cicilan kan tetap segitu terus', good:false, h:'Lupa risiko bunga floating', p:'Setelah masa bunga tetap habis, suku bunga naik dan cicilan Dina melonjak. Anggaran bulanannya jadi terjepit.'}
   ]},
  take:['Inflasi menggerus daya beli, jadi tujuan keuangan perlu disesuaikan.','BI-Rate memengaruhi bunga deposito, kredit, dan harga obligasi secara bertahap.','Untuk KPR floating, uji kemampuan bayar jika bunga naik.']
};
MODUL.syariah = {
  mf:[
   {q:'Dalam akad murabahah, bank menjual barang dengan margin yang disepakati di awal.', a:'f', why:'Karena harga jual disepakati di awal, cicilan murabahah tetap sampai lunas.'},
   {q:'Bagi hasil selalu memberi nominal yang sama setiap bulan.', a:'m', why:'Bagi hasil memakai nisbah, sehingga nominalnya mengikuti hasil usaha yang sebenarnya.'},
   {q:'Simpanan di bank syariah juga dijamin LPS.', a:'f', why:'Benar, hingga Rp2 miliar per nasabah per bank dengan tingkat imbalan penjaminan tersendiri.'},
   {q:'Semua saham di bursa otomatis termasuk saham syariah.', a:'m', why:'Saham syariah harus lolos kriteria dan masuk Daftar Efek Syariah yang ditetapkan OJK.'}
  ],
  cs:{from:'Fikri', role:'Teman kantor', msgs:['Aku pengen investasi saham tapi yang syariah 🙏','Gimana cara tahu sahamnya syariah atau bukan?'], ask:'Kamu jawab apa?',
   opts:[
    {t:'Cek Daftar Efek Syariah (DES) OJK atau pilih dari indeks ISSI/JII, dan pakai sekuritas dengan fitur syariah', good:true, h:'Tepat!', p:'Fikri bisa memilih saham dari ISSI dan memakai rekening efek syariah sehingga transaksinya sesuai prinsip syariah.'},
    {t:'Pilih saja perusahaan yang namanya terdengar islami', good:false, h:'Nama bukan ukuran', p:'Status syariah ditentukan oleh usaha dan rasio keuangan perusahaan, bukan namanya.'}
   ]},
  take:['Keuangan syariah menghindari riba, gharar, dan maysir.','Kenali akad: wadiah, mudharabah, musyarakah, murabahah, ijarah.','Saham syariah tercantum di DES OJK dan indeks ISSI/JII.']
};
MODUL.kripto = {
  mf:[
   {q:'Di Indonesia, kripto boleh dipakai sebagai alat pembayaran di toko.', a:'m', why:'Alat pembayaran yang sah adalah rupiah. Kripto hanya boleh diperdagangkan sebagai aset.'},
   {q:'Sejak 10 Januari 2025, pengawasan perdagangan aset kripto dipegang OJK.', a:'f', why:'Benar. Pengawasan beralih dari Bappebti ke OJK dengan dasar POJK 27/2024.'},
   {q:'Kripto memiliki arus kas seperti dividen yang menopang harganya.', a:'m', why:'Harga kripto ditentukan penawaran dan permintaan, tanpa laba atau kupon yang menopangnya.'},
   {q:'Kehilangan private key bisa membuat aset kripto hilang permanen.', a:'f', why:'Tanpa private key atau frasa pemulihan, tidak ada pihak yang bisa memulihkan akses ke dompet tersebut.'}
  ],
  cs:{from:'Kenalan di aplikasi kencan', role:'Baru kenal 2 minggu', msgs:['Aku punya platform kripto yang profitnya stabil 3% per hari 💕','Coba deposit 10 juta dulu, nanti aku ajari.','Ini rahasia kita berdua ya.'], ask:'Kamu pilih apa?',
   opts:[
    {t:'Menolak dan memutus kontak, karena profit tetap harian adalah tanda penipuan', good:true, h:'Keputusan yang tepat!', p:'Ini modus pig butchering. Korban diberi untung kecil di awal, lalu diminta deposit makin besar sampai akhirnya dana tidak bisa ditarik.'},
    {t:'Coba deposit sedikit dulu untuk tes', good:false, h:'Masuk perangkap', p:'Setoran awal tampak untung di aplikasi palsu. Saat ingin menarik, kamu diminta membayar "pajak" dan dana tidak pernah kembali.'}
   ]},
  take:['Kripto adalah aset berisiko sangat tinggi, bukan alat pembayaran.','Gunakan platform berizin OJK dan dana yang siap hilang.','Profit tetap harian dari kripto adalah tanda penipuan.']
};
MODUL.pajak = {
  mf:[
   {q:'Dengan tarif progresif, seluruh penghasilan dikenai tarif tertinggi yang dicapai.', a:'m', why:'Setiap lapisan penghasilan hanya dikenai tarif lapisannya masing-masing.'},
   {q:'Sejak 1 Juli 2024, NIK berlaku sebagai NPWP untuk wajib pajak orang pribadi.', a:'f', why:'Benar, setelah data NIK dipadankan dengan data perpajakan.'},
   {q:'Karyawan yang sudah dipotong PPh 21 tidak perlu melapor SPT Tahunan.', a:'m', why:'Pemotongan dan pelaporan berbeda. Karyawan tetap melapor SPT Tahunan paling lambat 31 Maret.'},
   {q:'Kupon SBN dikenai pajak final lebih rendah dibanding bunga deposito.', a:'f', why:'Kupon SBN dikenai pajak final 10%, sedangkan bunga deposito 20%.'}
  ],
  cs:{from:'Rani', role:'Teman satu angkatan', msgs:['Gajiku Desember kok potongan pajaknya gede banget 😭','Bulan lain biasa aja.','Salah hitung ya?'], ask:'Kamu jelaskan apa?',
   opts:[
    {t:'Bulan lain memakai TER, di Desember pajak setahun dihitung ulang dengan tarif progresif, termasuk bonus', good:true, h:'Penjelasan yang tepat!', p:'Rani paham potongan Desember adalah penyesuaian tahunan. Ia juga mengecek bukti potong 1721-A1 untuk pelaporan SPT.'},
    {t:'Pasti salah hitung, minta HRD kembalikan semua potongan Desember', good:false, h:'Belum tentu salah', p:'Setelah dicek, hitungannya benar. Rani sudah terlanjur berprasangka buruk tanpa memahami aturan TER.'}
   ]},
  take:['NIK kini berlaku sebagai NPWP orang pribadi.','PPh dihitung dari PKP dengan tarif progresif berlapis.','Lapor SPT Tahunan paling lambat 31 Maret, termasuk harta dan utang.']
};
