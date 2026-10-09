/* ================= MATERI 1: dasar, tujuan, nabung, utang, digital =================
   Struktur kartu: q (judul), a (penjelasan), f (rumus), ex (contoh), pts (poin), tip (tips), warn (hati-hati)
*/
TOPICS.push(
 {id:'dasar', title:'Keuangan Dasar', cat:'wajib', img:'t_dasar',
  desc:'Pondasi semua keputusan keuangan: membaca arus kas, menyusun anggaran, menghitung kekayaan bersih, dan memeriksa kesehatan keuangan secara berkala.',
  src:'OJK, Buku Seri Literasi Keuangan Jilid 1 (sikapiuangmu.ojk.go.id) · Bank Indonesia, Edukasi Keuangan · CFP Board, Financial Planning Competency Handbook · Consumer Financial Protection Bureau (CFPB), Your Money Your Goals',
  sets:[
   {name:'Arus Kas & Anggaran', cards:[
    {q:'Apa itu <b>arus kas pribadi</b> dan kenapa penting?', a:'Arus kas adalah selisih uang masuk (gaji, tunjangan, usaha sampingan) dan uang keluar dalam satu periode. Arus kas positif berarti ada sisa untuk ditabung, berinvestasi, atau melunasi utang lebih cepat. Arus kas negatif berarti pengeluaran ditutup dari tabungan atau utang, dan kalau berlangsung lama akan menggerus kondisi keuangan.',
     f:'Arus kas bersih = Total pemasukan − Total pengeluaran',
     ex:'Gaji bersih Rp8 juta, pengeluaran Rp6,5 juta. Arus kas bersih +Rp1,5 juta per bulan atau Rp18 juta per tahun yang bisa diarahkan ke tujuan keuangan.',
     tip:'Hitung arus kas memakai angka bersih yang benar-benar masuk rekening, setelah potongan pajak dan iuran.'},
    {q:'Bagaimana memakai pola anggaran <b>50/30/20</b>?', a:'Penghasilan bersih dibagi tiga: 50% kebutuhan pokok, 30% keinginan, dan 20% tabungan, investasi, atau pelunasan utang. Porsinya fleksibel. Orang yang tinggal di kota dengan biaya hidup tinggi mungkin butuh 60% untuk kebutuhan, sehingga porsi keinginan yang dikurangi. Yang tidak boleh dikorbankan adalah pos tabungan.',
     f:'50% kebutuhan + 30% keinginan + 20% tabungan/investasi/utang',
     ex:'Gaji bersih Rp7 juta: kebutuhan Rp3,5 juta (sewa, makan, transport, listrik), keinginan Rp2,1 juta (nongkrong, langganan streaming, hobi), tabungan Rp1,4 juta.',
     pts:['Kebutuhan: hal yang tetap harus dibayar walau penghasilan turun.','Keinginan: hal yang menambah kenyamanan dan bisa ditunda.','Cicilan konsumtif masuk pos kebutuhan karena wajib dibayar, sehingga makin besar cicilan makin sempit ruang anggaran.']},
    {q:'Apa bedanya anggaran <b>50/30/20</b>, <b>amplop</b>, dan <b>zero-based</b>?', a:'Tiga metode populer dengan gaya berbeda. Pola 50/30/20 cocok untuk pemula karena sederhana. Metode amplop membagi uang ke pos tertentu (fisik atau rekening terpisah) dan berhenti belanja saat amplopnya habis. Zero-based budgeting memberi tugas pada setiap rupiah sampai sisa anggaran nol, cocok untuk orang yang ingin kontrol penuh.',
     pts:['50/30/20: cepat, cukup tiga pos.','Amplop: ampuh menahan belanja impulsif, bisa memakai fitur "kantong" di aplikasi bank.','Zero-based: paling detail, butuh pencatatan rutin.'],
     tip:'Pilih metode yang paling mungkin kamu jalankan selama 3 bulan. Metode terbaik adalah yang konsisten dipakai.'},
    {q:'Kenapa menabung sebaiknya di <b>awal bulan</b>?', a:'Prinsip "pay yourself first": sisihkan tabungan begitu gaji masuk, baru belanjakan sisanya. Menabung dari sisa belanja cenderung gagal karena pengeluaran menyesuaikan saldo yang tersedia. Cara paling efektif adalah autodebet atau transfer terjadwal ke rekening tabungan terpisah di tanggal gajian.',
     ex:'Atur autodebet Rp1 juta setiap tanggal 26 ke rekening tabungan. Dalam setahun terkumpul Rp12 juta tanpa perlu mengandalkan niat setiap bulan.'}
   ]},
   {name:'Kekayaan Bersih & Rasio Kesehatan', cards:[
    {q:'Apa itu <b>kekayaan bersih</b> (net worth)?', a:'Total aset dikurangi total utang. Angka ini lebih menggambarkan kesehatan keuangan dibanding besar gaji, karena gaji besar bisa habis untuk cicilan. Kekayaan bersih bisa negatif, misalnya bagi yang baru lulus dengan utang pendidikan, dan yang penting adalah arahnya naik dari tahun ke tahun.',
     f:'Kekayaan bersih = Total aset − Total utang',
     ex:'Aset: tabungan Rp20 juta, reksa dana Rp15 juta, motor Rp12 juta (nilai jual sekarang). Utang: sisa cicilan motor Rp6 juta, kartu kredit Rp3 juta. Kekayaan bersih = Rp47 juta − Rp9 juta = Rp38 juta.',
     tip:'Nilai aset memakai harga jual hari ini, bukan harga beli. Kendaraan nilainya turun setiap tahun.'},
    {q:'Apa beda <b>aset likuid</b>, <b>aset investasi</b>, dan <b>aset guna</b>?', a:'Aset likuid mudah dicairkan tanpa kehilangan banyak nilai, misalnya tabungan, deposito jangka pendek, dan reksa dana pasar uang. Aset investasi ditujukan untuk tumbuh dalam jangka panjang, misalnya saham, obligasi, dan emas. Aset guna dipakai sehari-hari dan cenderung turun nilainya, misalnya kendaraan, gawai, dan perabot.',
     pts:['Likuid: untuk dana darurat dan kebutuhan jangka pendek.','Investasi: untuk tujuan jangka menengah dan panjang.','Guna: memberi manfaat, tetapi jangan dihitung sebagai sumber dana darurat.']},
    {q:'Rasio apa saja untuk <b>cek kesehatan keuangan</b>?', a:'Perencana keuangan memakai beberapa rasio sederhana sebagai "medical check-up" keuangan. Angka patokan berikut adalah panduan umum, bukan aturan baku.',
     pts:['Rasio tabungan: tabungan ÷ penghasilan, idealnya minimal 10 sampai 20%.','Rasio likuiditas: aset likuid ÷ pengeluaran bulanan, idealnya 3 sampai 6 kali.','Rasio cicilan: total cicilan ÷ penghasilan bersih, idealnya maksimal 30%.','Rasio utang terhadap aset: total utang ÷ total aset, makin kecil makin sehat.'],
     ex:'Penghasilan Rp10 juta, menabung Rp1,5 juta (15%), aset likuid Rp25 juta dengan pengeluaran Rp6 juta (4,2 bulan), cicilan Rp2 juta (20%). Ketiganya masih dalam batas sehat.'},
    {q:'Seberapa sering keuangan perlu <b>dievaluasi</b>?', a:'Catat pengeluaran setiap hari atau minggu, tinjau anggaran setiap bulan, dan hitung ulang kekayaan bersih serta rasio kesehatan minimal setahun sekali. Evaluasi juga perlu setiap ada perubahan besar: menikah, punya anak, pindah kerja, atau mulai mencicil rumah.',
     tip:'Jadwalkan "rapat keuangan" 30 menit di awal setiap bulan. Bandingkan rencana dan realisasi, lalu putuskan satu perbaikan kecil.'}
   ]},
   {name:'Kebiasaan & Bias Perilaku', cards:[
    {q:'Apa itu <b>lifestyle inflation</b>?', a:'Kecenderungan menaikkan gaya hidup setiap kali penghasilan naik, sehingga tabungan tidak ikut bertambah. Kenaikan gaji habis untuk kendaraan baru, tempat nongkrong yang lebih mahal, atau gawai terbaru.',
     ex:'Gaji naik Rp1 juta. Jika separuhnya (Rp500 ribu) langsung dialihkan ke investasi, dalam 10 tahun dengan imbal hasil 6% per tahun terkumpul sekitar Rp82 juta.',
     tip:'Terapkan aturan "naik gaji, naik tabungan": setiap kenaikan penghasilan, minimal separuhnya langsung masuk pos tabungan.'},
    {q:'Bias perilaku apa yang sering <b>menjebak</b> keputusan keuangan?', a:'Ilmu ekonomi perilaku menunjukkan keputusan keuangan sering dipengaruhi emosi dan jalan pintas berpikir. Mengenali bias membantu kita mengambil jeda sebelum memutuskan.',
     pts:['Present bias: lebih menghargai kesenangan sekarang dibanding manfaat masa depan.','Herding: ikut-ikutan karena banyak orang melakukannya, misalnya membeli saham yang sedang viral.','Anchoring: terpaku pada angka pertama, misalnya merasa "murah" karena ada coretan harga diskon.','Loss aversion: rasa sakit rugi terasa dua kali lebih kuat dari senangnya untung, sehingga orang enggan menjual investasi yang jelas buruk.'],
     tip:'Untuk pembelian besar yang tidak mendesak, terapkan aturan tunggu 72 jam.'},
    {q:'Kenapa <b>paylater dan cicilan kecil</b> terasa ringan?', a:'Cicilan kecil memecah harga besar sehingga terasa terjangkau, padahal totalnya tetap sama atau lebih mahal karena bunga dan biaya layanan. Banyak cicilan kecil yang menumpuk bisa membuat rasio cicilan diam-diam melewati batas aman.',
     ex:'Lima cicilan "cuma" Rp300 ribu per bulan berarti Rp1,5 juta. Pada gaji Rp6 juta, itu sudah 25% penghasilan.',
     warn:'Riwayat pembayaran paylater tercatat di SLIK OJK. Telat bayar dapat mempersulit pengajuan KPR atau kredit lain.'}
   ]}
  ]},

 {id:'tujuan', title:'Perencanaan Tujuan Keuangan', cat:'wajib', img:'t_tujuan',
  desc:'Mengubah keinginan menjadi rencana terukur: menetapkan tujuan SMART, menghitung target dengan memperhitungkan inflasi, dan memilih instrumen sesuai jangka waktu.',
  src:'OJK, Buku Seri Literasi Keuangan Jilid 1 · CFP Board, Financial Planning Process · FINRA Investor Education, Saving and Investing · Investopedia, Time Value of Money',
  sets:[
   {name:'Menetapkan Tujuan', cards:[
    {q:'Apa itu tujuan keuangan <b>SMART</b>?', a:'Tujuan yang Specific (jelas), Measurable (terukur dalam rupiah), Achievable (realistis), Relevant (penting bagimu), dan Time-bound (punya tenggat). "Ingin punya rumah" belum SMART. "Mengumpulkan uang muka rumah Rp100 juta dalam 4 tahun" sudah SMART.',
     ex:'Target Rp100 juta dalam 48 bulan tanpa memperhitungkan imbal hasil berarti menabung sekitar Rp2,1 juta per bulan. Jika angka itu terlalu berat, ubah tenggat atau nilai targetnya.'},
    {q:'Bagaimana mengelompokkan tujuan berdasarkan <b>jangka waktu</b>?', a:'Jangka waktu menentukan instrumen yang cocok. Makin panjang waktunya, makin besar ruang untuk instrumen yang berfluktuasi karena ada waktu untuk pulih.',
     pts:['Jangka pendek (di bawah 1 tahun): liburan, gawai, biaya acara. Tabungan, deposito, reksa dana pasar uang.','Jangka menengah (1 sampai 5 tahun): uang muka rumah, pernikahan. Reksa dana pendapatan tetap, SBN ritel, deposito.','Jangka panjang (di atas 5 tahun): pendidikan anak, pensiun. Reksa dana saham, saham, campuran yang terdiversifikasi.']},
    {q:'Tujuan mana yang <b>didahulukan</b>?', a:'Urutan umum yang dianjurkan perencana keuangan: (1) dana darurat dan proteksi dasar, (2) lunasi utang berbunga tinggi, (3) tujuan wajib seperti pendidikan anak dan pensiun, (4) tujuan gaya hidup. Tujuan bisa berjalan paralel, tetapi pondasi perlu kuat lebih dulu.',
     warn:'Berinvestasi untuk mengejar imbal hasil 10% per tahun sambil membiarkan utang kartu kredit berbunga sekitar 21% per tahun adalah langkah yang merugikan.'}
   ]},
   {name:'Menghitung Target', cards:[
    {q:'Kenapa target harus memperhitungkan <b>inflasi</b>?', a:'Harga barang dan jasa naik setiap tahun. Biaya kuliah, harga rumah, dan biaya kesehatan sering naik lebih cepat dari inflasi umum. Target yang dihitung dengan harga hari ini akan terasa kurang saat waktunya tiba.',
     f:'Nilai masa depan = Biaya hari ini × (1 + inflasi)ⁿ',
     ex:'Biaya kuliah hari ini Rp60 juta, kenaikan biaya pendidikan diasumsikan 8% per tahun, dibutuhkan 15 tahun lagi: 60 × 1,08¹⁵ ≈ Rp190 juta.'},
    {q:'Bagaimana menghitung <b>setoran bulanan</b> yang dibutuhkan?', a:'Setelah tahu nilai target di masa depan, hitung setoran rutin dengan memperhitungkan imbal hasil instrumen. Kalkulator di aplikasi bank atau spreadsheet (fungsi PMT) bisa membantu.',
     f:'Setoran bulanan = Target × r ÷ ((1 + r)ⁿ − 1), dengan r = imbal hasil per bulan dan n = jumlah bulan',
     ex:'Target Rp190 juta dalam 180 bulan dengan imbal hasil 8% per tahun (sekitar 0,64% per bulan): setoran sekitar Rp550 ribu per bulan. Tanpa imbal hasil, butuh Rp1,06 juta per bulan.',
     tip:'Selisih dua angka di atas adalah hasil kerja bunga majemuk. Makin awal mulai, makin ringan setorannya.'},
    {q:'Apa yang dilakukan jika target <b>tidak realistis</b>?', a:'Ada empat tuas yang bisa diatur: tambah setoran, perpanjang waktu, turunkan target, atau pilih instrumen dengan potensi imbal hasil lebih tinggi sesuai profil risiko. Hindari memaksakan instrumen berisiko tinggi untuk tujuan jangka pendek.',
     pts:['Tambah setoran: kurangi pos keinginan atau tambah penghasilan.','Perpanjang waktu: misalnya beli rumah 2 tahun lebih lambat.','Turunkan target: rumah yang lebih kecil atau lokasi alternatif.','Sesuaikan instrumen: hanya bila waktunya cukup panjang.']}
   ]},
   {name:'Tahapan Hidup', cards:[
    {q:'Apa fokus keuangan di setiap <b>tahap hidup</b>?', a:'Kebutuhan berubah seiring usia. Siklus hidup keuangan membantu menentukan prioritas.',
     pts:['Awal karier (20-an): bangun kebiasaan anggaran, dana darurat, hindari utang konsumtif, mulai investasi rutin.','Berkeluarga (30-an): proteksi jiwa dan kesehatan, dana pendidikan anak, uang muka rumah.','Puncak karier (40-an sampai 50-an): percepat dana pensiun, lunasi KPR, evaluasi portofolio.','Menjelang dan masa pensiun: alihkan ke instrumen yang lebih stabil, atur arus kas pensiun.']},
    {q:'Bagaimana menyiapkan <b>dana pendidikan anak</b>?', a:'Hitung biaya per jenjang (SD, SMP, SMA, kuliah) dengan memperhitungkan kenaikan biaya pendidikan, lalu siapkan pos terpisah untuk setiap jenjang. Jenjang terdekat memakai instrumen yang lebih stabil, jenjang yang masih lama bisa memakai reksa dana saham atau campuran.',
     tip:'Asuransi pendidikan bukan satu-satunya cara. Bandingkan biayanya dengan kombinasi asuransi jiwa berjangka plus investasi terpisah.'},
    {q:'Apa itu <b>sinking fund</b>?', a:'Pos tabungan untuk pengeluaran besar yang sudah pasti datang tetapi tidak setiap bulan, misalnya pajak kendaraan, biaya sekolah tahunan, servis besar, atau mudik Lebaran. Dengan menyicil ke pos ini setiap bulan, pengeluaran besar tidak mengganggu anggaran dan dana darurat tetap utuh.',
     ex:'Biaya mudik tahunan Rp6 juta: sisihkan Rp500 ribu per bulan ke rekening "Mudik".'}
   ]}
  ]},

 {id:'nabung', title:'Menabung & Dana Darurat', cat:'wajib', img:'pig',
  desc:'Menyiapkan bantalan untuk kejadian tak terduga, memilih produk simpanan yang tepat, dan memahami penjaminan simpanan oleh LPS.',
  src:'LPS, Ketentuan Penjaminan Simpanan (lps.go.id) · OJK, Buku Seri Literasi Keuangan Perbankan · CFPB, An Essential Guide to Building an Emergency Fund · Investopedia, Emergency Fund',
  sets:[
   {name:'Dana Darurat', cards:[
    {q:'Berapa besar <b>dana darurat</b> yang ideal?', a:'Panduan umum perencana keuangan di Indonesia: 3 bulan pengeluaran untuk lajang, 6 bulan untuk yang sudah menikah, lalu tambah sekitar 1 bulan untuk setiap anak. Pekerja dengan penghasilan tidak tetap (pekerja lepas, pedagang, pegawai kontrak) sebaiknya menyiapkan lebih, misalnya 6 sampai 12 bulan.',
     f:'Dana darurat = Pengeluaran bulanan × jumlah bulan',
     ex:'Pengeluaran Rp5 juta per bulan, menikah dengan 1 anak: (6 + 1) × Rp5 juta = Rp35 juta.',
     tip:'Hitung memakai pengeluaran wajib saja (tanpa pos keinginan), karena saat darurat pengeluaran bisa ditekan.'},
    {q:'Di mana sebaiknya dana darurat <b>disimpan</b>?', a:'Di instrumen yang aman dan cepat dicairkan, dengan nilai stabil. Dana darurat boleh dibagi dua lapis: sebagian di tabungan untuk akses instan, sisanya di instrumen yang sedikit lebih menguntungkan tetapi tetap likuid.',
     pts:['Lapis 1 (sekitar 1 bulan pengeluaran): rekening tabungan terpisah.','Lapis 2: deposito tenor pendek atau reksa dana pasar uang yang biasanya cair 1 sampai 2 hari kerja.','Hindari saham, kripto, dan properti karena nilainya bisa turun tepat saat dibutuhkan.']},
    {q:'Kapan dana darurat <b>boleh dipakai</b>, dan bagaimana mengisinya kembali?', a:'Dipakai untuk kejadian mendesak yang tidak direncanakan: sakit, kehilangan penghasilan, kerusakan rumah atau kendaraan yang mendesak, atau keluarga yang tertimpa musibah. Setelah dipakai, jadikan pengisian kembali sebagai prioritas di anggaran bulan-bulan berikutnya.',
     warn:'Liburan, gawai baru, dan diskon belanja bukan darurat. Untuk itu gunakan sinking fund atau tabungan tujuan.'},
    {q:'Bagaimana kalau dana darurat <b>belum ada sama sekali</b>?', a:'Mulai dari target kecil yang terasa mungkin, misalnya Rp1 juta atau satu bulan pengeluaran, lalu naikkan bertahap. Manfaatkan pemasukan tak terduga seperti THR, bonus, atau gaji ke-13 untuk mempercepat.',
     ex:'Target awal 1 bulan pengeluaran Rp4 juta: sisihkan Rp500 ribu per bulan plus separuh THR. Dalam sekitar 5 bulan target awal tercapai.'}
   ]},
   {name:'Produk Simpanan & LPS', cards:[
    {q:'Apa beda <b>tabungan</b>, <b>giro</b>, dan <b>deposito</b>?', a:'Tabungan bisa ditarik kapan saja dengan bunga rendah. Giro dipakai untuk transaksi bisnis dengan cek atau bilyet giro. Deposito dikunci untuk tenor tertentu (1, 3, 6, atau 12 bulan) dengan bunga lebih tinggi, dan pencairan sebelum jatuh tempo biasanya dikenai penalti.',
     pts:['Deposito ARO (automatic roll over): otomatis diperpanjang saat jatuh tempo.','Bunga simpanan dikenai pajak final 20% untuk saldo di atas Rp7,5 juta (ketentuan umum perpajakan).','Bandingkan bunga bersih setelah pajak dan biaya administrasi.']},
    {q:'Bagaimana <b>LPS</b> menjamin simpanan?', a:'Lembaga Penjamin Simpanan menjamin simpanan nasabah di bank peserta hingga Rp2 miliar per nasabah per bank. Simpanan dijamin bila memenuhi tiga syarat yang dikenal sebagai 3T: Tercatat dalam pembukuan bank, Tingkat bunga tidak melebihi tingkat bunga penjaminan LPS, dan Tidak menyebabkan bank gagal (misalnya tidak terlibat kredit macet).',
     ex:'Per 1 Juli 2026, tingkat bunga penjaminan LPS untuk simpanan rupiah di bank umum adalah 3,75%. Deposito dengan bunga 6% di bank umum tidak termasuk simpanan yang dijamin.',
     tip:'Tingkat bunga penjaminan diperbarui berkala. Cek angka terbaru di lps.go.id sebelum menaruh dana besar.'},
    {q:'Bagaimana <b>membagi</b> dana besar agar tetap dijamin?', a:'Karena batasnya per nasabah per bank, dana di atas Rp2 miliar dapat dibagi ke beberapa bank peserta LPS. Simpanan di BPR dan bank syariah juga dijamin LPS dengan tingkat bunga penjaminan masing-masing.',
     warn:'Bunga yang jauh di atas rata-rata pasar adalah tanda untuk berhati-hati, bukan tanda bank lebih baik.'}
   ]},
   {name:'Strategi Menabung', cards:[
    {q:'Apa itu <b>bunga majemuk</b> pada tabungan dan deposito?', a:'Bunga yang diperoleh ikut disimpan sehingga periode berikutnya bunga dihitung dari pokok plus bunga sebelumnya. Deposito ARO yang bunganya ikut diperpanjang (pokok + bunga) memanfaatkan efek ini.',
     f:'Nilai akhir = Pokok × (1 + r)ⁿ',
     ex:'Rp10 juta dengan bunga bersih 3% per tahun selama 5 tahun: 10 × 1,03⁵ ≈ Rp11,59 juta.'},
    {q:'Bagaimana trik <b>otomatisasi</b> menabung?', a:'Kebiasaan yang otomatis lebih mudah bertahan dibanding mengandalkan disiplin setiap bulan.',
     pts:['Autodebet di hari gajian ke rekening tabungan terpisah.','Fitur "kantong" atau "goals" di aplikasi bank untuk setiap tujuan.','Round-up: membulatkan setiap transaksi dan menabung selisihnya.','Naikkan persentase tabungan 1% setiap ada kenaikan gaji.']},
    {q:'Apakah menabung saja <b>cukup</b>?', a:'Menabung cocok untuk dana darurat dan tujuan jangka pendek. Untuk tujuan jangka panjang, bunga tabungan biasanya di bawah inflasi sehingga daya beli tergerus. Tujuan di atas 3 sampai 5 tahun perlu didukung investasi yang sesuai profil risiko.',
     ex:'Inflasi 3% dan bunga tabungan bersih 1%: secara riil, daya beli uang turun sekitar 2% per tahun.'}
   ]}
  ]},

 {id:'utang', title:'Utang & Kredit Sehat', cat:'wajib', img:'t_utang',
  desc:'Membedakan utang produktif dan konsumtif, menjaga cicilan dalam batas aman, memahami biaya kredit, riwayat SLIK, dan strategi keluar dari jebakan utang.',
  src:'OJK, Buku Saku Cerdas Mengelola Keuangan · OJK, Layanan SLIK (idebku.ojk.go.id) · Bank Indonesia, ketentuan bunga kartu kredit · SEOJK 19/2023 tentang LPBBTI · CFPB, Debt and Credit',
  sets:[
   {name:'Rasio & Jenis Utang', cards:[
    {q:'Berapa <b>batas aman</b> total cicilan?', a:'Panduan umum: total cicilan tidak lebih dari 30% penghasilan bersih bulanan. Di atas itu, ruang untuk menabung dan kebutuhan pokok mulai terjepit. Bank juga memakai rasio sejenis (debt service ratio) saat menilai pengajuan kredit.',
     f:'Rasio cicilan = Total cicilan ÷ Penghasilan bersih × 100%',
     ex:'Penghasilan bersih Rp10 juta. Cicilan motor Rp1,2 juta + rencana KPR Rp3,5 juta = Rp4,7 juta atau 47%, jauh di atas batas aman.'},
    {q:'Apa beda utang <b>produktif</b> dan <b>konsumtif</b>?', a:'Utang produktif dipakai untuk sesuatu yang menambah nilai atau penghasilan, misalnya modal usaha, KPR, atau pendidikan yang meningkatkan kemampuan kerja. Utang konsumtif dipakai untuk barang yang nilainya cepat turun, misalnya gawai, liburan, atau gaya hidup.',
     pts:['Utang produktif tetap berisiko bila cicilannya melebihi kemampuan bayar.','Utang konsumtif sebaiknya dibatasi dan segera dilunasi.','Pertanyaan kunci: apakah utang ini menambah aset atau penghasilan di masa depan?']},
    {q:'Bagaimana memahami <b>bunga flat</b> dan <b>bunga efektif</b>?', a:'Bunga flat dihitung dari pokok awal sepanjang tenor sehingga terlihat kecil, sedangkan bunga efektif (anuitas) dihitung dari sisa pokok. Bunga flat 1% per bulan setara bunga efektif sekitar 1,8% per bulan untuk tenor 12 bulan. Bandingkan pinjaman memakai bunga efektif atau total biaya.',
     ex:'Pinjaman Rp12 juta, bunga flat 1% per bulan, tenor 12 bulan: bunga Rp120 ribu × 12 = Rp1,44 juta. Total bayar Rp13,44 juta atau Rp1,12 juta per bulan.',
     tip:'Mintalah simulasi total yang harus dibayar, termasuk biaya provisi, administrasi, dan asuransi kredit.'}
   ]},
   {name:'Kartu Kredit, Paylater & Pinjaman Daring', cards:[
    {q:'Bagaimana bunga <b>kartu kredit</b> bekerja?', a:'Bank Indonesia menetapkan batas maksimum bunga kartu kredit 1,75% per bulan (sekitar 21% per tahun). Jika tagihan dibayar penuh sebelum jatuh tempo, umumnya tidak ada bunga. Jika hanya membayar minimum, sisa tagihan dikenai bunga dan utang lama sekali lunas.',
     ex:'Tagihan Rp10 juta, hanya membayar minimum setiap bulan dengan bunga 1,75%: butuh bertahun-tahun untuk lunas dan total bunga bisa jutaan rupiah.',
     warn:'Tarik tunai kartu kredit dikenai biaya tarik tunai dan bunga sejak hari penarikan. Hindari kecuali darurat.'},
    {q:'Apa aturan <b>pinjaman daring (pinjol)</b> legal?', a:'Penyelenggara pinjaman daring legal wajib berizin OJK sebagai Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI). OJK membatasi manfaat ekonomi (bunga plus biaya sejenis) secara bertahap. Untuk pendanaan konsumtif tenor pendek, batasnya 0,3% per hari (2024), 0,2% per hari (2025), dan 0,1% per hari mulai 2026. Untuk pendanaan produktif, 0,1% per hari (2024 sampai 2025) dan 0,067% per hari mulai 2026.',
     pts:['Pinjol legal hanya boleh mengakses kamera, mikrofon, dan lokasi (dikenal dengan istilah CAMILAN).','Penagihan wajib beretika: tidak boleh mengancam atau menyebarkan data ke kontak.','Cek daftar penyelenggara berizin di ojk.go.id atau Kontak OJK 157.'],
     ex:'Pinjaman konsumtif Rp1 juta selama 30 hari pada batas 0,1% per hari: manfaat ekonomi maksimal sekitar Rp30 ribu.'},
    {q:'Apa yang perlu diperhatikan sebelum memakai <b>paylater</b>?', a:'Paylater adalah pinjaman. Ada biaya layanan atau bunga, denda keterlambatan, dan riwayatnya tercatat di SLIK. Pakai hanya untuk kebutuhan yang sudah dianggarkan dan pastikan cicilannya masuk hitungan rasio 30%.',
     tip:'Matikan paylater di aplikasi belanja jika sering tergoda belanja impulsif.'}
   ]},
   {name:'Riwayat Kredit & Keluar dari Utang', cards:[
    {q:'Apa itu <b>SLIK OJK</b> dan kolektibilitas?', a:'Sistem Layanan Informasi Keuangan mencatat riwayat kredit setiap debitur, termasuk kartu kredit, KPR, kredit kendaraan, dan paylater dari lembaga yang melapor. Kualitas kredit dikelompokkan menjadi lima kolektibilitas.',
     pts:['Kol 1 Lancar: dibayar tepat waktu.','Kol 2 Dalam Perhatian Khusus: tunggakan 1 sampai 90 hari.','Kol 3 Kurang Lancar: tunggakan 91 sampai 120 hari.','Kol 4 Diragukan: tunggakan 121 sampai 180 hari.','Kol 5 Macet: tunggakan di atas 180 hari.'],
     tip:'Cek SLIK pribadimu secara gratis melalui layanan iDebKu OJK sebelum mengajukan KPR.'},
    {q:'Strategi apa untuk melunasi <b>banyak utang</b>?', a:'Daftar semua utang beserta saldo, bunga, dan cicilan minimumnya. Bayar minimum di semua utang, lalu arahkan dana lebih ke satu utang prioritas.',
     pts:['Avalanche: dahulukan bunga tertinggi. Total bunga paling hemat.','Snowball: dahulukan saldo terkecil. Cepat terasa hasilnya sehingga memotivasi.','Konsolidasi: gabungkan utang berbunga tinggi ke satu pinjaman berbunga lebih rendah, hanya bila total biayanya benar lebih murah.'],
     ex:'Kartu kredit 1,75% per bulan, KTA 1% per bulan, cicilan motor 0,8% per bulan. Metode avalanche melunasi kartu kredit lebih dulu.'},
    {q:'Apa tanda-tanda <b>jebakan utang</b> dan apa yang harus dilakukan?', a:'Tanda bahaya: berutang untuk membayar utang lain, cicilan di atas 50% penghasilan, sering telat bayar, dan tidak tahu total utang sendiri.',
     pts:['Hentikan utang baru, termasuk paylater.','Hubungi pemberi pinjaman untuk restrukturisasi sebelum menunggak.','Jual aset yang tidak produktif untuk melunasi utang berbunga tinggi.','Laporkan penagihan tidak beretika ke Kontak OJK 157.'],
     warn:'Hindari "gali lubang tutup lubang" memakai pinjol ilegal. Bunganya tidak terkendali dan cara penagihannya merugikan.'}
   ]}
  ]},

 {id:'digital', title:'Pembayaran Digital & QRIS', cat:'wajib', img:'t_digital',
  desc:'Mengenal ekosistem pembayaran digital Indonesia: QRIS, BI-FAST, uang elektronik, kartu debit, beserta biaya dan cara bertransaksi yang aman.',
  src:'Bank Indonesia, Sistem Pembayaran: QRIS dan BI-FAST (bi.go.id) · Bank Indonesia, Blueprint Sistem Pembayaran Indonesia 2030 · OJK, Buku Seri Literasi Keuangan Perbankan · BIS, Fast Payments: Enhancing the Speed and Availability of Retail Payments',
  sets:[
   {name:'QRIS', cards:[
    {q:'Apa itu <b>QRIS</b>?', a:'Quick Response Code Indonesian Standard adalah standar kode QR nasional yang ditetapkan Bank Indonesia. Satu kode QRIS bisa dibayar memakai aplikasi bank atau dompet digital mana pun yang berizin, sehingga pedagang cukup memasang satu kode.',
     pts:['QRIS statis: kode tercetak, pembeli memasukkan nominal sendiri.','QRIS dinamis: kode muncul di mesin kasir dengan nominal tertentu.','QRIS Tuntas: mendukung transfer, tarik tunai, dan setor tunai.','QRIS juga bisa dipakai di beberapa negara mitra (QRIS antarnegara) seperti Malaysia, Thailand, Singapura, dan Jepang.']},
    {q:'Siapa yang menanggung <b>biaya QRIS</b>?', a:'Biaya QRIS disebut Merchant Discount Rate (MDR) dan ditanggung pedagang, bukan pembeli. Bank Indonesia menegaskan pedagang tidak boleh membebankan MDR kepada konsumen. Untuk usaha mikro, transaksi sampai Rp500.000 dibebaskan dari MDR sejak 1 Desember 2024, sedangkan transaksi di atasnya dikenai MDR 0,3%.',
     warn:'Jika pedagang menambahkan biaya karena kamu membayar dengan QRIS, itu tidak sesuai ketentuan dan bisa dilaporkan.'},
    {q:'Bagaimana memastikan pembayaran QRIS <b>aman</b>?', a:'Sebelum menekan bayar, selalu cek nama pedagang yang tampil di aplikasi. Penipu kadang menempelkan stiker QRIS palsu di atas kode asli di tempat umum seperti kotak amal atau parkir.',
     pts:['Cocokkan nama merchant di layar dengan nama toko.','Pastikan nominal sudah benar sebelum memasukkan PIN.','Simpan bukti transaksi untuk keperluan komplain.']}
   ]},
   {name:'Transfer & Uang Elektronik', cards:[
    {q:'Apa itu <b>BI-FAST</b>?', a:'Infrastruktur transfer antarbank milik Bank Indonesia yang memproses transaksi secara real-time 24/7. Biaya maksimal yang boleh dikenakan bank kepada nasabah adalah Rp2.500 per transaksi, dengan batas nominal per transaksi hingga Rp250 juta.',
     pts:['Bisa memakai alias (nomor ponsel atau email) sebagai pengganti nomor rekening, tergantung dukungan bank.','Lebih murah dibanding transfer online lama yang umumnya Rp6.500.','Untuk nominal sangat besar, bank memakai SKNBI atau RTGS.']},
    {q:'Apa beda <b>uang elektronik berbasis kartu</b> dan <b>berbasis server</b>?', a:'Uang elektronik berbasis kartu (chip) menyimpan saldo di kartu, misalnya kartu tol dan transportasi. Uang elektronik berbasis server menyimpan saldo di sistem penerbit, misalnya dompet digital di ponsel. Penerbit uang elektronik wajib berizin Bank Indonesia.',
     pts:['Batas saldo uang elektronik terverifikasi (registered) lebih tinggi dibanding yang belum terverifikasi.','Saldo uang elektronik tidak termasuk simpanan yang dijamin LPS.','Kartu fisik yang hilang biasanya tidak bisa diblokir, sehingga saldonya ikut hilang.'],
     tip:'Simpan saldo secukupnya untuk kebutuhan transaksi, bukan sebagai tempat menabung.'},
    {q:'Bagaimana membandingkan <b>biaya transaksi</b> digital?', a:'Biaya kecil yang sering terjadi bisa menumpuk. Biasakan memilih kanal termurah untuk kebutuhan yang sama.',
     ex:'Transfer 20 kali sebulan dengan biaya Rp6.500 = Rp130 ribu. Memakai BI-FAST Rp2.500 = Rp50 ribu. Selisih Rp80 ribu per bulan atau hampir Rp1 juta per tahun.',
     pts:['Cek biaya top up dompet digital dan biaya admin bulanan rekening.','Gunakan QRIS untuk belanja di pedagang karena pembeli tidak dikenai biaya MDR.']}
   ]},
   {name:'Kebiasaan Transaksi Aman', cards:[
    {q:'Apa saja <b>kebiasaan dasar</b> transaksi digital yang aman?', a:'Mayoritas pembobolan rekening terjadi karena data rahasia bocor dari pemiliknya sendiri, bukan karena sistem bank diretas.',
     pts:['Jangan bagikan PIN, OTP, password, dan CVV kepada siapa pun termasuk yang mengaku petugas bank.','Aktifkan notifikasi transaksi dan batasi limit transfer harian.','Gunakan jaringan internet pribadi, hindari Wi-Fi publik untuk transaksi.','Perbarui aplikasi dan sistem operasi ponsel secara berkala.']},
    {q:'Apa yang dilakukan jika <b>salah transfer</b> atau ada transaksi tidak dikenal?', a:'Segera hubungi call center resmi bank (nomor tertera di kartu atau situs resmi), minta pemblokiran bila perlu, dan ajukan pengaduan tertulis. Simpan semua bukti transaksi. Bila tidak selesai, eskalasi pengaduan ke OJK melalui Kontak OJK 157 atau Aplikasi Portal Perlindungan Konsumen (APPK).',
     warn:'Waspada akun media sosial palsu yang mengaku "CS bank" saat kamu mengeluh di kolom komentar. Bank resmi tidak akan meminta data rahasia lewat DM.'}
   ]}
  ]}
);
