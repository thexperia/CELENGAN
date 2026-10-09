/* ================= MATERI 2: aman, investasi, asuransi, pensiun, ilegal ================= */
TOPICS.push(
 {id:'aman', title:'Keamanan Data & Penipuan Digital', cat:'wajib', img:'t_aman',
  desc:'Mengenali modus penipuan digital yang paling sering terjadi, melindungi data pribadi dan akun keuangan, serta langkah cepat bila menjadi korban.',
  src:'OJK dan Satgas PASTI, Indonesia Anti-Scam Centre (IASC) · OJK, Waspada Social Engineering · Bank Indonesia, Edukasi Perlindungan Konsumen · FTC (Amerika Serikat), How to Recognize and Avoid Phishing Scams · UU No. 27/2022 tentang Pelindungan Data Pribadi',
  sets:[
   {name:'Modus yang Sering Terjadi', cards:[
    {q:'Apa itu <b>social engineering</b>?', a:'Teknik manipulasi psikologis agar korban sendiri yang menyerahkan data rahasia atau mentransfer uang. Pelaku memanfaatkan rasa takut (rekening akan diblokir), rasa senang (menang hadiah), rasa terdesak (promo berakhir hari ini), atau rasa percaya (mengaku petugas resmi).',
     pts:['Phishing: tautan atau situs palsu yang meniru bank, kurir, atau instansi.','Vishing: telepon dari "petugas bank" yang meminta OTP.','Smishing: SMS atau WhatsApp berisi tautan berbahaya.','Pretexting: cerita palsu yang meyakinkan, misalnya keluarga kecelakaan.']},
    {q:'Bagaimana modus <b>file APK</b> dan undangan palsu bekerja?', a:'Pelaku mengirim file berakhiran .apk yang disamarkan sebagai undangan pernikahan, surat tilang, tagihan, atau resi paket. Jika dipasang, aplikasi itu dapat membaca SMS termasuk kode OTP, lalu pelaku menguras rekening lewat mobile banking.',
     warn:'Jangan pernah memasang file .apk dari chat. Undangan asli berbentuk gambar, PDF, atau tautan situs, bukan aplikasi.',
     tip:'Matikan izin "Instal aplikasi tidak dikenal" di pengaturan Android.'},
    {q:'Modus apa lagi yang <b>marak</b>?', a:'Penipu terus memperbarui cerita. Polanya sama: membuat korban panik atau tergiur, lalu meminta data atau transfer.',
     pts:['Perubahan tarif transfer bank: korban diminta mengisi formulir di tautan palsu.','Kerja paruh waktu "like dan subscribe": awalnya dibayar kecil, lalu diminta deposit untuk "misi" lebih besar.','Akun palsu customer service di media sosial.','Salah transfer palsu: pelaku mengaku salah kirim dan meminta uang dikembalikan ke rekening lain.','Penawaran pinjaman tanpa syarat atau investasi bodong lewat SMS.']}
   ]},
   {name:'Melindungi Data & Akun', cards:[
    {q:'Data apa yang termasuk <b>rahasia mutlak</b>?', a:'PIN, password, kode OTP, CVV kartu, dan jawaban pertanyaan keamanan tidak boleh diberikan kepada siapa pun, termasuk keluarga atau yang mengaku pegawai bank, OJK, atau BI. Lembaga resmi tidak pernah meminta data tersebut.',
     pts:['Data pribadi seperti NIK, nama ibu kandung, dan tanggal lahir juga perlu dijaga karena dipakai untuk verifikasi.','Hati-hati mengunggah foto KTP, kartu, atau boarding pass di media sosial.','Saat menyerahkan fotokopi KTP, beri tanda air atau tulisan keperluan di atasnya.']},
    {q:'Bagaimana membuat akun lebih <b>sulit dibobol</b>?', a:'Lapisan pengamanan berlapis membuat pelaku kesulitan walau satu lapis bocor.',
     pts:['Password unik dan panjang untuk setiap layanan, bantu dengan pengelola password.','Aktifkan autentikasi dua faktor (2FA) di email dan media sosial.','Kunci ponsel dengan PIN atau biometrik, dan aktifkan fitur lacak serta hapus jarak jauh.','Atur limit transaksi harian dan notifikasi setiap transaksi.'],
     tip:'Email adalah kunci utama karena dipakai untuk reset password layanan lain. Lindungi email lebih dulu.'},
    {q:'Bagaimana <b>mengenali tautan palsu</b>?', a:'Periksa alamat situs dengan teliti sebelum memasukkan data. Situs palsu sering memakai ejaan mirip, domain gratisan, atau tambahan kata.',
     ex:'Situs resmi bank memakai domain resmi bank tersebut. Alamat seperti "bank-xyz-tarif.blogspot.com" atau "bankxyz.id-promo.com" hampir pasti palsu.',
     pts:['Tanda bahaya: salah ketik, tekanan waktu, hadiah terlalu besar, permintaan data rahasia.','Akses layanan bank dengan mengetik alamat sendiri atau dari aplikasi resmi, jangan dari tautan pesan.']}
   ]},
   {name:'Jika Menjadi Korban', cards:[
    {q:'Apa <b>langkah pertama</b> saat merasa tertipu?', a:'Kecepatan sangat menentukan peluang dana terselamatkan.',
     pts:['Segera hubungi call center resmi bank untuk memblokir rekening, kartu, dan mobile banking.','Ganti password email dan akun lain yang terhubung.','Laporkan ke Indonesia Anti-Scam Centre (IASC) milik OJK dan Satgas PASTI agar dana di rekening penerima bisa ditelusuri dan diblokir.','Simpan bukti: tangkapan layar percakapan, nomor rekening pelaku, dan bukti transfer.','Buat laporan ke kepolisian bila diperlukan untuk proses lanjutan.']},
    {q:'Bagaimana <b>membantu orang lain</b> agar tidak tertipu?', a:'Kelompok yang paling sering menjadi sasaran adalah orang tua dan pengguna baru layanan digital. Berbagi informasi modus terbaru di grup keluarga adalah langkah pencegahan sederhana yang efektif.',
     tip:'Sepakati "kata sandi keluarga" untuk memastikan telepon darurat yang mengaku anggota keluarga memang asli.'}
   ]}
  ]},

 {id:'investasi', title:'Dasar Investasi', cat:'wajib', img:'t_investasi',
  desc:'Memahami hubungan risiko dan imbal hasil, bunga majemuk, inflasi, profil risiko, alokasi aset, diversifikasi, serta strategi investasi rutin.',
  src:'OJK, Buku Seri Literasi Keuangan Pasar Modal · IDX, Sekolah Pasar Modal · U.S. SEC Investor.gov, Introduction to Investing · CFA Institute, Investment Foundations · Bodie, Kane & Marcus, Investments',
  sets:[
   {name:'Risiko & Imbal Hasil', cards:[
    {q:'Bagaimana hubungan <b>risiko</b> dan <b>imbal hasil</b>?', a:'Semakin tinggi potensi imbal hasil sebuah instrumen, semakin tinggi pula risikonya, yaitu kemungkinan nilainya turun atau hasilnya berbeda dari harapan. Tawaran untung besar dengan risiko rendah patut dicurigai.',
     pts:['Deposito dan SBN: risiko rendah, imbal hasil relatif rendah dan stabil.','Obligasi korporasi dan reksa dana pendapatan tetap: risiko menengah.','Saham dan reksa dana saham: risiko tinggi dalam jangka pendek, potensi imbal hasil tertinggi dalam jangka panjang.']},
    {q:'Apa saja <b>jenis risiko</b> investasi?', a:'Risiko tidak hanya berarti harga turun. Mengenali jenisnya membantu memilih cara mengelolanya.',
     pts:['Risiko pasar: harga turun karena kondisi ekonomi atau sentimen.','Risiko inflasi: imbal hasil kalah oleh kenaikan harga.','Risiko likuiditas: sulit menjual tanpa memotong harga.','Risiko gagal bayar: penerbit obligasi tidak mampu membayar.','Risiko suku bunga: harga obligasi turun saat suku bunga naik.','Risiko konsentrasi: terlalu banyak dana di satu aset.']},
    {q:'Apa itu <b>profil risiko</b>?', a:'Gambaran seberapa besar penurunan nilai investasi yang sanggup kamu tanggung, secara finansial maupun mental. Profil ini dipengaruhi usia, tujuan, jangka waktu, kondisi keuangan, dan pengalaman. Manajer investasi dan agen penjual reksa dana wajib meminta nasabah mengisi kuesioner profil risiko.',
     pts:['Konservatif: utamakan keamanan pokok.','Moderat: siap fluktuasi sedang demi hasil lebih tinggi.','Agresif: siap fluktuasi besar demi potensi hasil tinggi jangka panjang.'],
     tip:'Uji diri: jika investasimu turun 20% dalam sebulan, apakah kamu akan panik menjual? Jika ya, kurangi porsi aset berisiko.'}
   ]},
   {name:'Bunga Majemuk & Inflasi', cards:[
    {q:'Apa itu <b>bunga majemuk</b>?', a:'Imbal hasil yang diperoleh ikut diinvestasikan kembali sehingga menghasilkan imbal hasil berikutnya. Makin panjang waktunya, makin besar efek bola saljunya. Waktu adalah faktor paling berpengaruh.',
     f:'Nilai akhir = Modal × (1 + r)ⁿ',
     ex:'Rp1 juta per bulan selama 30 tahun dengan imbal hasil 8% per tahun menjadi sekitar Rp1,5 miliar, padahal total setoran hanya Rp360 juta. Jika baru mulai 10 tahun kemudian (20 tahun), hasilnya sekitar Rp590 juta.'},
    {q:'Apa itu <b>Rule of 72</b>?', a:'Cara cepat memperkirakan lama waktu uang menjadi dua kali lipat: bagi 72 dengan imbal hasil tahunan. Cara yang sama bisa dipakai untuk melihat seberapa cepat inflasi memotong daya beli menjadi setengahnya.',
     f:'Waktu ganda ≈ 72 ÷ imbal hasil tahunan (%)',
     ex:'Imbal hasil 8%: sekitar 9 tahun. Inflasi 3%: daya beli uang tunai turun separuh dalam sekitar 24 tahun.'},
    {q:'Apa itu <b>imbal hasil riil</b>?', a:'Imbal hasil setelah dikurangi inflasi. Inilah kenaikan daya beli yang sebenarnya. Investasi perlu memberi imbal hasil riil positif agar tujuan jangka panjang tercapai.',
     f:'Imbal hasil riil ≈ Imbal hasil nominal − Inflasi',
     ex:'Deposito 4% dikurangi pajak 20% menjadi 3,2%. Dengan inflasi 2,5%, imbal hasil riil sekitar 0,7%.'}
   ]},
   {name:'Alokasi & Strategi', cards:[
    {q:'Apa itu <b>alokasi aset</b> dan <b>diversifikasi</b>?', a:'Alokasi aset adalah pembagian dana ke kelas aset berbeda (kas, obligasi, saham, emas). Diversifikasi menyebar dana di dalam dan antar kelas aset agar kerugian di satu tempat dapat diimbangi tempat lain. Riset akademik menunjukkan alokasi aset adalah penentu terbesar variasi hasil portofolio jangka panjang.',
     ex:'Profil moderat untuk tujuan 7 tahun: 50% reksa dana saham, 40% obligasi atau SBN, 10% pasar uang.',
     warn:'Membeli lima saham dari sektor yang sama belum termasuk diversifikasi yang baik.'},
    {q:'Apa itu <b>dollar cost averaging</b> (investasi rutin)?', a:'Menginvestasikan nominal yang sama secara berkala tanpa melihat kondisi pasar. Saat harga turun, kamu mendapat unit lebih banyak. Strategi ini mengurangi risiko salah waktu masuk dan membangun kebiasaan.',
     ex:'Investasi Rp500 ribu per bulan di reksa dana. Bulan 1 NAB Rp1.000 (500 unit), bulan 2 NAB Rp800 (625 unit), bulan 3 NAB Rp1.000 (500 unit). Rata-rata harga beli sekitar Rp923, lebih rendah dari rata-rata NAB Rp933.'},
    {q:'Apa itu <b>rebalancing</b>?', a:'Mengembalikan komposisi portofolio ke alokasi target secara berkala, misalnya setahun sekali. Jika saham naik tajam sehingga porsinya membengkak, sebagian dijual dan dipindahkan ke aset lain. Rebalancing menjaga risiko tetap sesuai profil dan secara disiplin "menjual mahal, membeli murah".',
     tip:'Seiring tujuan makin dekat, geser porsi ke instrumen yang lebih stabil (strategi glide path).'}
   ]}
  ]},

 {id:'asuransi', title:'Asuransi & Proteksi', cat:'wajib', img:'shield',
  desc:'Mengalihkan risiko finansial besar ke perusahaan asuransi: jenis asuransi, cara menghitung kebutuhan proteksi, membaca polis, dan proses klaim.',
  src:'OJK, Buku Seri Literasi Keuangan Perasuransian · OJK, SEOJK 5/2022 tentang Produk Asuransi yang Dikaitkan dengan Investasi · BPJS Kesehatan · Insurance Information Institute (III), Insurance Basics',
  sets:[
   {name:'Konsep Dasar', cards:[
    {q:'Apa <b>fungsi utama</b> asuransi?', a:'Mengalihkan risiko kerugian finansial besar yang jarang terjadi tetapi berdampak berat, seperti rawat inap, penyakit kritis, atau meninggalnya pencari nafkah, kepada perusahaan asuransi dengan membayar premi. Asuransi berfungsi sebagai proteksi, bukan alat untuk menjadi kaya.',
     tip:'Prinsip memilih risiko yang diasuransikan: dampak finansialnya besar dan tidak sanggup ditanggung sendiri.'},
    {q:'Apa arti <b>premi, polis, uang pertanggungan, dan pengecualian</b>?', a:'Istilah ini muncul di setiap produk asuransi dan perlu dipahami sebelum menandatangani.',
     pts:['Premi: biaya berkala yang dibayar pemegang polis.','Polis: kontrak berisi hak dan kewajiban kedua pihak.','Uang pertanggungan: nilai manfaat yang dibayarkan saat klaim disetujui.','Pengecualian: kondisi yang tidak ditanggung, misalnya penyakit bawaan tertentu.','Masa tunggu: periode setelah polis aktif ketika manfaat tertentu belum bisa diklaim.','Free look period: masa untuk mempelajari polis dan membatalkannya dengan pengembalian premi sesuai ketentuan.']},
    {q:'Apa urutan <b>prioritas proteksi</b>?', a:'Umumnya dimulai dari jaminan kesehatan dasar (BPJS Kesehatan), lalu asuransi jiwa bila ada tanggungan, kemudian asuransi tambahan seperti kesehatan swasta, penyakit kritis, dan properti. Proteksi kendaraan dan perjalanan dipilih sesuai kebutuhan.',
     ex:'Lajang tanpa tanggungan: cukup BPJS Kesehatan plus dana darurat. Pencari nafkah dengan dua anak: tambah asuransi jiwa berjangka dan pertimbangkan asuransi kesehatan tambahan.'}
   ]},
   {name:'Jenis & Kebutuhan Proteksi', cards:[
    {q:'Apa beda asuransi jiwa <b>berjangka</b>, <b>seumur hidup</b>, dan <b>unit link</b>?', a:'Asuransi jiwa berjangka (term life) memberi proteksi murni untuk periode tertentu dengan premi relatif murah. Asuransi seumur hidup (whole life) melindungi sampai usia lanjut dengan premi lebih mahal. Unit link (Produk Asuransi yang Dikaitkan dengan Investasi atau PAYDI) menggabungkan proteksi dan investasi, preminya lebih mahal, dan hasil investasinya tidak dijamin.',
     pts:['Prinsip "beli berjangka, investasikan sisanya" sering dianjurkan untuk memisahkan proteksi dan investasi.','Melalui SEOJK 5/2022, OJK mewajibkan perusahaan menjelaskan manfaat, biaya, dan risiko unit link secara jelas sebelum polis dibeli.']},
    {q:'Berapa <b>uang pertanggungan jiwa</b> yang memadai?', a:'Panduan cepat: sekitar 10 kali penghasilan tahunan. Cara yang lebih teliti adalah metode kebutuhan: jumlahkan biaya hidup tanggungan selama beberapa tahun, sisa utang, dan dana pendidikan anak, lalu kurangi aset yang sudah ada.',
     ex:'Biaya hidup keluarga Rp6 juta per bulan selama 10 tahun (Rp720 juta) + sisa KPR Rp300 juta + dana pendidikan Rp200 juta − aset Rp120 juta = sekitar Rp1,1 miliar.'},
    {q:'Apa yang perlu dicek pada <b>asuransi kesehatan</b> swasta?', a:'Bandingkan manfaat, bukan hanya premi.',
     pts:['Sistem penggantian: cashless (langsung di rumah sakit rekanan) atau reimbursement.','Limit kamar per hari dan limit tahunan.','Skema inner limit (batas per jenis biaya) atau as charged (sesuai tagihan).','Masa tunggu penyakit tertentu dan pengecualian kondisi yang sudah ada.','Fitur koordinasi manfaat dengan BPJS Kesehatan.']}
   ]},
   {name:'Membeli & Klaim', cards:[
    {q:'Apa yang dicek <b>sebelum membeli</b> polis?', a:'Pastikan perusahaan dan agen berizin serta diawasi OJK, pahami ringkasan informasi produk dan layanan (RIPLAY), baca pengecualian polis, serta ukur premi terhadap anggaran. Isi formulir kesehatan dengan jujur karena data yang tidak benar bisa menjadi alasan klaim ditolak.',
     warn:'Jangan membeli asuransi hanya karena hadiah atau desakan kenalan. Premi adalah komitmen jangka panjang.'},
    {q:'Bagaimana agar <b>klaim lancar</b>?', a:'Klaim sering ditolak karena dokumen tidak lengkap, terlambat dilaporkan, atau kondisi termasuk pengecualian.',
     pts:['Simpan polis dan kartu peserta di tempat mudah dijangkau, beri tahu keluarga.','Laporkan klaim sesuai batas waktu di polis.','Siapkan resume medis, kuitansi asli, dan formulir klaim.','Bila sengketa tidak selesai, ajukan ke Lembaga Alternatif Penyelesaian Sengketa Sektor Jasa Keuangan (LAPS SJK).']}
   ]}
  ]},

 {id:'pensiun', title:'Dana Pensiun', cat:'wajib', img:'elderly',
  desc:'Menyiapkan penghasilan pengganti setelah berhenti bekerja: menghitung kebutuhan, memahami JHT, JP, dan DPLK, serta strategi menjelang pensiun.',
  src:'OJK, Buku Seri Literasi Keuangan Dana Pensiun · BPJS Ketenagakerjaan, Program JHT dan JP · OJK, Roadmap Pengembangan dan Penguatan Dana Pensiun · OECD, Pensions at a Glance',
  sets:[
   {name:'Kebutuhan Pensiun', cards:[
    {q:'Berapa <b>dana</b> yang dibutuhkan saat pensiun?', a:'Panduan umum: penghasilan saat pensiun sekitar 70 sampai 80% dari pengeluaran menjelang pensiun. Kalikan dengan perkiraan lama masa pensiun dan sesuaikan dengan inflasi. Biaya kesehatan biasanya naik di usia lanjut sehingga perlu diperhitungkan terpisah.',
     ex:'Pengeluaran sekarang Rp8 juta per bulan, pensiun 25 tahun lagi, inflasi 3%: kebutuhan bulanan saat pensiun sekitar 8 × 0,75 × 1,03²⁵ ≈ Rp12,6 juta.'},
    {q:'Apa itu <b>replacement ratio</b>?', a:'Perbandingan penghasilan saat pensiun dengan penghasilan terakhir saat bekerja. OECD merekomendasikan tingkat penggantian yang memadai agar standar hidup tidak turun drastis. Di Indonesia, banyak pekerja hanya mengandalkan JHT sehingga rasio penggantiannya rendah.',
     f:'Replacement ratio = Penghasilan pensiun ÷ Penghasilan terakhir × 100%'},
    {q:'Apa itu <b>aturan 4%</b>?', a:'Panduan dari riset di Amerika Serikat (Bengen, Trinity Study): dana pensiun yang terdiversifikasi dapat ditarik sekitar 4% per tahun, disesuaikan inflasi, dengan peluang besar bertahan sekitar 30 tahun. Panduan ini dipakai untuk memperkirakan besar dana yang perlu dikumpulkan.',
     f:'Dana pensiun yang dibutuhkan ≈ Kebutuhan tahunan ÷ 4% = Kebutuhan tahunan × 25',
     ex:'Kebutuhan Rp150 juta per tahun saat pensiun: dana sekitar Rp3,75 miliar.',
     warn:'Aturan 4% berasal dari data pasar Amerika. Gunakan sebagai gambaran, bukan kepastian.'}
   ]},
   {name:'Program Pensiun', cards:[
    {q:'Apa beda <b>JHT</b> dan <b>JP</b> BPJS Ketenagakerjaan?', a:'Jaminan Hari Tua (JHT) adalah tabungan yang dibayarkan sekaligus saat peserta mencapai usia pensiun atau memenuhi syarat lain. Iurannya 5,7% dari upah (3,7% pemberi kerja, 2% pekerja). Jaminan Pensiun (JP) memberi manfaat bulanan bagi peserta yang memenuhi masa iur minimal, dengan iuran 3% (2% pemberi kerja, 1% pekerja).',
     tip:'Cek saldo JHT secara berkala lewat aplikasi resmi BPJS Ketenagakerjaan (JMO).'},
    {q:'Apa itu <b>DPPK</b> dan <b>DPLK</b>?', a:'Dana Pensiun Pemberi Kerja (DPPK) dibentuk perusahaan untuk karyawannya. Dana Pensiun Lembaga Keuangan (DPLK) dikelola bank atau perusahaan asuransi jiwa dan bisa diikuti siapa pun secara mandiri, termasuk pekerja lepas. Peserta DPLK bisa memilih paket investasi (pasar uang, pendapatan tetap, saham, atau campuran).',
     pts:['Iuran ke DPLK yang dibayar pekerja sendiri dapat mengurangi penghasilan kena pajak sesuai ketentuan.','Dana DPLK tidak bisa ditarik sembarangan sebelum usia pensiun, sehingga disiplin lebih terjaga.']},
    {q:'Bolehkah dana pensiun <b>dipakai lebih awal</b>?', a:'Sebaiknya tidak. Penarikan dini memotong efek bunga majemuk dan membuat target pensiun sulit tercapai. Untuk kebutuhan mendesak, gunakan dana darurat.',
     ex:'Menarik Rp50 juta di usia 35 tahun dengan asumsi imbal hasil 7% per tahun sama dengan kehilangan sekitar Rp270 juta di usia 60 tahun.'}
   ]},
   {name:'Strategi Sepanjang Karier', cards:[
    {q:'Kenapa harus mulai <b>sejak muda</b>?', a:'Semakin awal mulai, semakin panjang waktu bunga majemuk bekerja, sehingga setoran bulanan yang dibutuhkan jauh lebih kecil.',
     ex:'Target Rp2 miliar di usia 60 dengan imbal hasil 8% per tahun. Mulai usia 25: sekitar Rp870 ribu per bulan. Mulai usia 40: sekitar Rp3,4 juta per bulan.'},
    {q:'Bagaimana mengatur investasi <b>menjelang pensiun</b>?', a:'Sekitar 5 sampai 10 tahun sebelum pensiun, kurangi porsi aset berisiko secara bertahap. Siapkan dana kas untuk 1 sampai 2 tahun pertama pensiun agar tidak terpaksa menjual aset saat pasar turun.',
     pts:['Lunasi utang sebelum pensiun, terutama KPR.','Siapkan proteksi kesehatan yang tetap berlaku setelah tidak bekerja.','Rencanakan sumber penghasilan: JP, anuitas, kupon SBN, sewa properti.']}
   ]}
  ]},

 {id:'ilegal', title:'Waspada Investasi Ilegal', cat:'wajib', img:'t_ilegal',
  desc:'Mengenali ciri penawaran investasi dan pinjaman ilegal, memahami cara kerja skema Ponzi, memeriksa legalitas, serta melapor.',
  src:'OJK, Satgas Pemberantasan Aktivitas Keuangan Ilegal (Satgas PASTI) · OJK, Kontak OJK 157 · U.S. SEC Investor.gov, Ponzi Schemes · FINRA, Investment Fraud',
  sets:[
   {name:'Kenali Cirinya', cards:[
    {q:'Apa <b>ciri umum</b> investasi ilegal?', a:'Penawaran ilegal cenderung punya pola yang berulang dari waktu ke waktu.',
     pts:['Menjanjikan imbal hasil tinggi dan pasti dalam waktu singkat.','Mengklaim tanpa risiko.','Memberi bonus besar untuk merekrut anggota baru.','Izin usahanya tidak jelas atau hanya izin umum seperti NIB atau akta pendirian.','Mendesak untuk segera bergabung.','Memakai tokoh terkenal sebagai promosi.']},
    {q:'Apa itu prinsip <b>2L</b>?', a:'Legal: pastikan lembaga dan produknya berizin dari otoritas yang berwenang, misalnya OJK untuk produk jasa keuangan. Logis: pastikan imbal hasil yang ditawarkan masuk akal dan sebanding dengan risikonya.',
     ex:'Tawaran 10% per bulan setara lebih dari 200% per tahun bila dimajemukkan, sementara deposito memberi beberapa persen per tahun. Tawaran itu tidak logis.'},
    {q:'Bagaimana <b>skema Ponzi</b> bekerja?', a:'Skema yang membayar "keuntungan" anggota lama memakai setoran anggota baru, bukan dari usaha nyata. Pembayaran awal lancar sehingga menumbuhkan kepercayaan dan testimoni. Skema pasti runtuh ketika anggota baru berhenti bertambah, dan sebagian besar peserta kehilangan dana.',
     pts:['Skema piramida mirip, tetapi keuntungan utamanya dari biaya rekrutmen.','Varian modern: robot trading, arisan online berbunga, "investasi" aplikasi berkedok kerja paruh waktu.'],
     warn:'Pencairan pertama yang lancar justru bagian dari jebakan.'}
   ]},
   {name:'Cek & Lapor', cards:[
    {q:'Bagaimana <b>mengecek legalitas</b>?', a:'Cek daftar entitas berizin di situs OJK, hubungi Kontak OJK 157 (telepon) atau WhatsApp 081 157 157 157. Untuk produk pasar modal, pastikan perusahaan efek dan manajer investasi terdaftar. Untuk pinjaman daring, pastikan berizin sebagai LPBBTI.',
     tip:'Cek nama perusahaan secara lengkap, karena penipu sering meniru nama yang mirip dengan perusahaan berizin.'},
    {q:'Apa itu <b>Satgas PASTI</b>?', a:'Satuan Tugas Pemberantasan Aktivitas Keuangan Ilegal yang dikoordinasikan OJK bersama sejumlah kementerian dan lembaga, termasuk Kepolisian, Kementerian Komunikasi dan Digital, dan Bank Indonesia. Satgas memblokir situs dan aplikasi ilegal serta mengumumkan daftar entitas ilegal secara berkala.'},
    {q:'Apa yang dilakukan saat menerima <b>tawaran mencurigakan</b>?', a:'Jangan transfer dana, jangan berikan data pribadi atau kode OTP, simpan buktinya, lalu laporkan ke Kontak OJK 157 atau Satgas PASTI. Jika sudah terlanjur mentransfer, segera laporkan ke bank dan Indonesia Anti-Scam Centre (IASC).',
     pts:['Ingatkan keluarga dan rekan yang ikut diajak.','Jangan tergiur "pemulihan dana" berbayar, karena itu sering menjadi penipuan lanjutan.']}
   ]}
  ]}
);
