/* ================= MATERI 4: emas, syariah, kripto, pajak ================= */
TOPICS.push(
 {id:'emas', title:'Emas & Komoditas', cat:'opsional', img:'t_emas',
  desc:'Mengenal emas sebagai pelindung nilai dan pelengkap portofolio: bentuk kepemilikan, biaya tersembunyi seperti spread, cara menyimpan, dan kapan emas cocok dipakai.',
  src:'World Gold Council, Gold as a Strategic Asset · OJK, Buku Seri Literasi Keuangan · Pegadaian dan Antam (Logam Mulia), Informasi Produk Emas · Investopedia, Investing in Gold',
  sets:[
   {name:'Emas sebagai Aset', cards:[
    {q:'Kenapa emas disebut <b>aset lindung nilai</b>?', a:'Harga emas cenderung naik dalam jangka panjang dan sering bertahan, bahkan naik, saat inflasi tinggi, krisis, atau pasar saham bergejolak. Karena itu emas dipakai untuk menjaga daya beli dan sebagai penyeimbang portofolio. Emas tidak memberi bunga atau dividen, sehingga keuntungannya hanya dari kenaikan harga.',
     tip:'Riset World Gold Council menunjukkan porsi emas sekitar 2 sampai 10% dapat membantu menurunkan fluktuasi portofolio yang terdiversifikasi.'},
    {q:'Apa itu <b>spread</b> dan kenapa penting?', a:'Spread adalah selisih harga jual (saat kita membeli) dan harga beli kembali atau buyback (saat kita menjual). Karena spread, emas yang baru dibeli langsung bernilai lebih rendah jika dijual hari itu. Harga emas perlu naik melebihi spread dulu sebelum kita untung.',
     f:'Spread (%) = (Harga jual − Harga buyback) ÷ Harga jual × 100%',
     ex:'Misalnya harga jual Rp2.000.000 per gram dan buyback Rp1.840.000 per gram. Spread 8%. Jika harga emas naik rata-rata 8% per tahun, butuh sekitar setahun hanya untuk menutup spread.'},
    {q:'Emas cocok untuk <b>tujuan apa</b>?', a:'Tujuan jangka menengah hingga panjang, misalnya menjaga nilai sebagian tabungan, dana pendidikan beberapa tahun lagi, atau dana haji dan umrah. Emas kurang cocok untuk dana darurat karena ada spread dan harganya bisa turun dalam jangka pendek.',
     warn:'Harga emas juga bisa turun signifikan. Antara 2012 dan 2015, harga emas dunia turun lebih dari 30%.'}
   ]},
   {name:'Cara Memiliki Emas', cards:[
    {q:'Apa saja <b>bentuk investasi</b> emas?', a:'Setiap bentuk punya kelebihan dan biaya yang berbeda.',
     pts:['Emas batangan (logam mulia): bersertifikat, spread lebih kecil dibanding perhiasan, perlu tempat simpan aman.','Perhiasan: ada ongkos pembuatan yang hilang saat dijual, lebih cocok sebagai perhiasan.','Tabungan emas: menabung mulai 0,01 gram di lembaga resmi seperti Pegadaian, bisa dicetak menjadi fisik.','Emas digital di platform: praktis, pastikan platform berizin dan emasnya disimpan di kustodian resmi.','Reksa dana atau ETF berbasis emas: terpapar harga emas tanpa menyimpan fisik.']},
    {q:'Apa yang diperhatikan saat membeli <b>emas batangan</b>?', a:'Beli dari penjual resmi, simpan sertifikat dan kemasannya dalam kondisi baik, perhatikan biaya penyimpanan, dan cek harga buyback sebelum membeli. Emas tanpa sertifikat atau kemasan rusak bisa dihargai lebih rendah saat dijual kembali.',
     tip:'Ukuran kecil (misalnya 1 sampai 5 gram) lebih fleksibel dijual sebagian, tetapi harga per gramnya biasanya sedikit lebih mahal.'},
    {q:'Apakah <b>emas digital</b> aman?', a:'Relatif aman jika platformnya berizin dan diawasi otoritas, emasnya disimpan di kustodian resmi, serta pemilik bisa mencetak atau menarik emasnya. Bandingkan spread, biaya penyimpanan, dan biaya cetak antar platform.',
     warn:'Waspada skema "investasi emas" yang menjanjikan imbal hasil tetap per bulan. Harga emas naik turun, sehingga janji imbal hasil tetap adalah tanda bahaya.'}
   ]},
   {name:'Komoditas Lain', cards:[
    {q:'Bagaimana dengan <b>komoditas</b> lain seperti perak atau minyak?', a:'Komoditas lain lebih volatil dan biasanya diperdagangkan lewat kontrak berjangka yang memakai leverage. Perdagangan berjangka komoditas di Indonesia diawasi Bappebti. Leverage membuat keuntungan dan kerugian berlipat, sehingga tidak cocok untuk pemula.',
     warn:'Banyak penawaran "trading forex dan komoditas" berkedok investasi menjanjikan profit tetap. Cek izin pialang di situs Bappebti.'}
   ]}
  ]},

 {id:'syariah', title:'Keuangan Syariah', cat:'opsional', img:'t_syariah',
  desc:'Prinsip keuangan syariah, akad-akad yang sering dipakai di bank dan investasi syariah, serta produk syariah yang tersedia di Indonesia.',
  src:'OJK, Buku Seri Literasi Keuangan Perbankan Syariah dan Pasar Modal Syariah · Dewan Syariah Nasional MUI, Fatwa DSN-MUI · Bank Indonesia, Ekonomi dan Keuangan Syariah · IDX, Indeks Saham Syariah · AAOIFI, Shari\'ah Standards',
  sets:[
   {name:'Prinsip Dasar', cards:[
    {q:'Apa <b>prinsip utama</b> keuangan syariah?', a:'Keuangan syariah mengikuti prinsip Islam yang ditetapkan melalui fatwa Dewan Syariah Nasional MUI dan diawasi Dewan Pengawas Syariah di setiap lembaga. Tiga larangan utama yang paling sering disebut:',
     pts:['Riba: tambahan yang disyaratkan atas pinjaman (bunga).','Gharar: ketidakjelasan berlebihan dalam akad, misalnya objek atau harga tidak jelas.','Maysir: spekulasi yang menyerupai perjudian.','Selain itu, dana tidak boleh disalurkan ke usaha yang haram, seperti minuman keras dan perjudian.']},
    {q:'Apa beda <b>bunga</b> dan <b>bagi hasil</b>?', a:'Bunga ditetapkan sebagai persentase tetap dari pokok tanpa melihat hasil usaha. Bagi hasil (nisbah) ditetapkan sebagai proporsi pembagian keuntungan, misalnya 40:60, sehingga nominalnya mengikuti hasil usaha yang sebenarnya.',
     ex:'Deposito mudharabah nisbah nasabah 40%. Jika pendapatan yang dibagihasilkan dari dana nasabah bulan ini setara 8% per tahun, nasabah memperoleh setara 3,2% per tahun. Bulan berikutnya bisa berbeda.'}
   ]},
   {name:'Akad-Akad Utama', cards:[
    {q:'Apa saja <b>akad</b> yang sering ditemui?', a:'Akad adalah perjanjian yang menentukan hak dan kewajiban. Produk syariah dibedakan berdasarkan akadnya.',
     pts:['Wadiah: titipan, misalnya tabungan wadiah. Bank boleh memberi bonus tanpa diperjanjikan.','Mudharabah: kerja sama usaha, satu pihak memberi modal dan pihak lain mengelola, keuntungan dibagi sesuai nisbah.','Musyarakah: kerja sama modal dari kedua pihak, keuntungan dan risiko dibagi.','Murabahah: jual beli dengan margin yang disepakati di awal, sering dipakai untuk pembiayaan rumah dan kendaraan.','Ijarah: sewa atas manfaat barang atau jasa.','Qardh: pinjaman kebajikan tanpa imbalan.']},
    {q:'Bagaimana <b>KPR syariah</b> murabahah bekerja?', a:'Bank membeli rumah lalu menjualnya kepada nasabah dengan harga pokok ditambah margin yang disepakati. Nasabah mencicil harga jual tersebut. Karena harga jual sudah disepakati di awal, cicilan tetap sampai lunas.',
     ex:'Harga rumah Rp500 juta, uang muka Rp100 juta, margin disepakati Rp180 juta untuk 15 tahun. Total yang dicicil Rp580 juta atau sekitar Rp3,22 juta per bulan, tetap selama tenor.',
     tip:'Bandingkan total yang dibayar dengan KPR konvensional, karena cicilan tetap juga berarti tidak ikut turun saat suku bunga pasar turun.'}
   ]},
   {name:'Produk Syariah', cards:[
    {q:'Produk apa saja yang tersedia di <b>pasar modal syariah</b>?', a:'Pasar modal Indonesia memiliki ekosistem syariah yang lengkap.',
     pts:['Saham syariah: masuk Daftar Efek Syariah (DES) OJK, dengan kriteria antara lain utang berbasis bunga maksimal 45% dari total aset dan pendapatan non-halal maksimal 10% dari total pendapatan.','Indeks: ISSI (seluruh saham syariah) dan JII (30 saham syariah paling likuid).','Sukuk: surat berharga syariah, termasuk Sukuk Ritel dan Sukuk Tabungan dari pemerintah.','Reksa dana syariah: dikelola sesuai prinsip syariah dengan pengawasan DPS.']},
    {q:'Apakah simpanan di <b>bank syariah</b> dijamin LPS?', a:'Ya. Simpanan di bank syariah dijamin LPS hingga Rp2 miliar per nasabah per bank, dengan tingkat imbalan penjaminan yang ditetapkan tersendiri. Prinsip 3T tetap berlaku.'}
   ]}
  ]},

 {id:'kripto', title:'Aset Kripto', cat:'opsional', img:'t_kripto',
  desc:'Memahami aset kripto secara jernih: cara kerja, status hukum dan pengawasan di Indonesia, risiko yang perlu diketahui, serta cara menghindari penipuan.',
  src:'OJK, POJK 27/2024 tentang Penyelenggaraan Perdagangan Aset Keuangan Digital termasuk Aset Kripto · OJK, Peralihan Pengawasan Aset Kripto dari Bappebti · Bank Indonesia, kripto bukan alat pembayaran sah · BIS Annual Economic Report, Cryptocurrencies · Investopedia, Cryptocurrency',
  sets:[
   {name:'Mengenal Kripto', cards:[
    {q:'Apa itu <b>aset kripto</b> dan <b>blockchain</b>?', a:'Aset kripto adalah aset digital yang memakai kriptografi dan dicatat di blockchain, yaitu buku besar digital yang disimpan bersama oleh banyak komputer sehingga sulit diubah. Contoh yang terkenal adalah Bitcoin dan Ethereum. Nilainya ditentukan oleh penawaran dan permintaan, tanpa aset dasar atau arus kas seperti saham dan obligasi.',
     pts:['Stablecoin: kripto yang dirancang nilainya mengikuti mata uang tertentu, misalnya dolar AS.','Token: aset yang diterbitkan di atas blockchain lain.']},
    {q:'Bagaimana <b>status kripto</b> di Indonesia?', a:'Aset kripto diperlakukan sebagai aset yang dapat diperdagangkan, bukan alat pembayaran. Bank Indonesia menegaskan alat pembayaran yang sah di Indonesia adalah rupiah. Sejak 10 Januari 2025, pengaturan dan pengawasan perdagangan aset kripto beralih dari Bappebti ke OJK, dengan dasar POJK 27/2024.',
     pts:['Perdagangan dilakukan melalui pedagang aset keuangan digital yang berizin OJK.','Hanya aset kripto yang masuk daftar yang ditetapkan yang boleh diperdagangkan.'],
     warn:'Membayar barang dan jasa memakai kripto di Indonesia tidak diperbolehkan.'}
   ]},
   {name:'Risiko', cards:[
    {q:'Apa saja <b>risiko utama</b> aset kripto?', a:'Kripto termasuk kelas aset dengan risiko sangat tinggi.',
     pts:['Volatilitas: harga bisa naik atau turun puluhan persen dalam hitungan hari.','Tidak ada nilai dasar: tidak ada laba atau kupon yang menopang harga.','Risiko platform: bursa atau aplikasi bisa bangkrut, diretas, atau menyalahgunakan dana nasabah.','Risiko kehilangan akses: private key atau frasa pemulihan yang hilang berarti aset hilang permanen.','Risiko proyek: banyak token gagal atau ditinggalkan pengembangnya (rug pull).'],
     ex:'Bitcoin pernah turun lebih dari 70% dari puncaknya di akhir 2021 hingga akhir 2022.'},
    {q:'Bagaimana jika tetap ingin <b>mencoba</b>?', a:'Jika ingin terpapar kripto, perlakukan sebagai bagian kecil portofolio dengan dana yang siap hilang seluruhnya.',
     pts:['Pastikan dana darurat dan proteksi sudah aman lebih dulu.','Batasi porsi, misalnya tidak lebih dari 5% portofolio.','Gunakan platform berizin OJK dan aktifkan pengamanan akun berlapis.','Jangan memakai uang pinjaman.']}
   ]},
   {name:'Penipuan Berkedok Kripto', cards:[
    {q:'Modus penipuan apa yang <b>sering memakai kripto</b>?', a:'Popularitas kripto dimanfaatkan penipu karena transaksinya sulit ditarik kembali.',
     pts:['Janji profit tetap harian dari "robot trading" atau "staking" tidak resmi.','Akun palsu tokoh terkenal yang membagikan "giveaway" dengan syarat kirim kripto lebih dulu.','Situs atau aplikasi bursa palsu yang meniru tampilan bursa asli.','Modus asmara daring (pig butchering): korban dibujuk berinvestasi oleh kenalan di aplikasi kencan.'],
     warn:'Tidak ada yang bisa menjamin keuntungan tetap dari aset yang harganya naik turun bebas.'}
   ]}
  ]},

 {id:'pajak', title:'Pajak Pribadi', cat:'opsional', img:'t_pajak',
  desc:'Dasar pajak penghasilan orang pribadi: NIK sebagai NPWP, PTKP, tarif progresif, cara kerja PPh 21 karyawan, pelaporan SPT Tahunan, dan pajak atas hasil investasi.',
  src:'Direktorat Jenderal Pajak, Panduan Pajak Orang Pribadi (pajak.go.id) · UU No. 7/2021 tentang Harmonisasi Peraturan Perpajakan · PP No. 58/2023 tentang Tarif Pemotongan PPh Pasal 21 · PMK 101/2016 tentang PTKP · OECD, Taxing Wages',
  sets:[
   {name:'Dasar-Dasar', cards:[
    {q:'Apa itu <b>NPWP</b> dan bagaimana kaitannya dengan NIK?', a:'Nomor Pokok Wajib Pajak adalah identitas wajib pajak. Sejak 1 Juli 2024, NIK di KTP berlaku sebagai NPWP untuk wajib pajak orang pribadi penduduk Indonesia, setelah dilakukan pemadanan data. Sejak 2025, layanan administrasi pajak dijalankan melalui sistem Coretax DJP.'},
    {q:'Apa itu <b>PTKP</b>?', a:'Penghasilan Tidak Kena Pajak adalah batas penghasilan setahun yang tidak dikenai pajak. Besarnya mengikuti status perkawinan dan jumlah tanggungan (maksimal 3).',
     pts:['Diri sendiri: Rp54 juta per tahun.','Tambahan status kawin: Rp4,5 juta.','Tambahan per tanggungan: Rp4,5 juta, maksimal 3 orang.'],
     ex:'Menikah dengan 2 anak (K/2): 54 + 4,5 + (2 × 4,5) = Rp67,5 juta per tahun.'},
    {q:'Bagaimana <b>tarif progresif</b> PPh orang pribadi?', a:'Penghasilan kena pajak (PKP) dikenai tarif bertingkat sesuai UU HPP. Setiap lapisan hanya dikenai tarif lapisannya, bukan seluruh penghasilan dikenai tarif tertinggi.',
     pts:['Sampai Rp60 juta: 5%.','Di atas Rp60 juta sampai Rp250 juta: 15%.','Di atas Rp250 juta sampai Rp500 juta: 25%.','Di atas Rp500 juta sampai Rp5 miliar: 30%.','Di atas Rp5 miliar: 35%.'],
     ex:'PKP Rp100 juta: 5% × 60 juta + 15% × 40 juta = Rp3 juta + Rp6 juta = Rp9 juta.'}
   ]},
   {name:'PPh 21 Karyawan', cards:[
    {q:'Bagaimana menghitung <b>PPh 21 setahun</b> secara sederhana?', a:'Untuk karyawan, perhitungan tahunan dimulai dari penghasilan bruto, dikurangi biaya jabatan dan iuran pensiun atau JHT yang dibayar sendiri, lalu dikurangi PTKP.',
     f:'PKP = Bruto − Biaya jabatan (5%, maks. Rp6 juta) − Iuran JHT/JP pekerja − PTKP',
     ex:'Gaji Rp10 juta per bulan, status TK/0. Bruto setahun Rp120 juta. Biaya jabatan Rp6 juta. Iuran JHT dan JP pekerja 3% = Rp3,6 juta. Neto Rp110,4 juta. PKP = 110,4 − 54 = Rp56,4 juta. PPh 21 setahun = 5% × 56,4 juta = Rp2,82 juta.'},
    {q:'Apa itu <b>TER</b> PPh 21?', a:'Sejak Januari 2024 (PP 58/2023), pemotongan PPh 21 bulanan karyawan memakai Tarif Efektif Rata-rata (TER) yang dikalikan langsung ke penghasilan bruto bulanan. Di masa pajak terakhir (biasanya Desember), pajak setahun dihitung ulang dengan tarif progresif, sehingga potongan bulan Desember bisa lebih besar atau lebih kecil.',
     tip:'Jika potongan Desember terasa besar, itu biasanya karena penyesuaian tahunan, misalnya akibat bonus di pertengahan tahun.'}
   ]},
   {name:'Lapor SPT & Pajak Investasi', cards:[
    {q:'Kapan dan bagaimana melapor <b>SPT Tahunan</b>?', a:'Wajib pajak orang pribadi melapor SPT Tahunan paling lambat 31 Maret tahun berikutnya. Karyawan memakai bukti potong PPh 21 dari pemberi kerja (formulir 1721-A1 atau A2). Seluruh harta, utang, dan penghasilan lain juga dilaporkan.',
     pts:['Laporkan harta seperti tabungan, reksa dana, saham, kendaraan, dan properti.','Laporkan utang seperti KPR dan kredit kendaraan.','Terlambat lapor dikenai denda administrasi.'],
     tip:'Simpan bukti potong dan dokumen harta dalam satu folder digital sepanjang tahun agar pelaporan cepat.'},
    {q:'Bagaimana <b>pajak atas hasil investasi</b>?', a:'Banyak penghasilan investasi dikenai pajak final yang langsung dipotong, sehingga tidak dihitung ulang dengan tarif progresif.',
     pts:['Bunga deposito dan tabungan: final 20% (untuk saldo di atas Rp7,5 juta).','Kupon SBN dan obligasi: final 10%.','Penjualan saham di bursa: final 0,1% dari nilai jual.','Dividen dalam negeri: dapat dibebaskan dari pajak jika diinvestasikan kembali di Indonesia sesuai ketentuan, jika tidak dikenai PPh final 10%.','Keuntungan reksa dana: bukan objek pajak bagi investor.'],
     warn:'Ketentuan pajak bisa berubah. Cek informasi terbaru di pajak.go.id atau Kring Pajak 1500200.'}
   ]}
  ]}
);
