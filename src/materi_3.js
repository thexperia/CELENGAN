/* ================= MATERI 3: moneter, reksadana, saham, funda, teknikal ================= */
TOPICS.push(
 {id:'moneter', title:'Inflasi, Suku Bunga & Peran BI', cat:'opsional', img:'t_moneter',
  desc:'Memahami inflasi, BI-Rate dan cara kebijakan moneter merambat ke cicilan, deposito, dan nilai tukar, serta dampaknya bagi keuangan rumah tangga.',
  src:'Bank Indonesia, Kebijakan Moneter dan Mekanisme Transmisi (bi.go.id) · Bank Indonesia, Laporan Kebijakan Moneter · BPS, Indeks Harga Konsumen · IMF, Back to Basics: What Is Inflation?',
  sets:[
   {name:'Inflasi', cards:[
    {q:'Apa itu <b>inflasi</b> dan bagaimana mengukurnya?', a:'Inflasi adalah kenaikan harga barang dan jasa secara umum dan terus-menerus. Di Indonesia, inflasi diukur oleh BPS memakai Indeks Harga Konsumen (IHK) dari sekeranjang barang dan jasa yang biasa dikonsumsi rumah tangga. Bank Indonesia dan Pemerintah menetapkan sasaran inflasi bersama, yaitu 2,5% ± 1%, termasuk untuk tahun 2026 dan 2027.',
     f:'Inflasi tahunan = (IHK tahun ini − IHK tahun lalu) ÷ IHK tahun lalu × 100%',
     ex:'IHK naik dari 105 menjadi 107,6: inflasi sekitar 2,5%. Belanja bulanan Rp5 juta tahun lalu kini butuh sekitar Rp5,12 juta untuk barang yang sama.'},
    {q:'Apa saja <b>komponen</b> dan penyebab inflasi?', a:'BI mengelompokkan inflasi menjadi tiga komponen agar sumbernya lebih mudah dibaca.',
     pts:['Inflasi inti: dipengaruhi permintaan dan ekspektasi, relatif stabil.','Harga bergejolak (volatile food): bahan pangan seperti cabai dan beras, dipengaruhi cuaca dan pasokan.','Harga diatur pemerintah (administered prices): BBM, tarif listrik, tarif angkutan.','Penyebab umum: tarikan permintaan (demand pull), dorongan biaya (cost push), dan inflasi impor akibat pelemahan nilai tukar.']},
    {q:'Bagaimana inflasi memengaruhi <b>keuangan pribadi</b>?', a:'Inflasi menggerus daya beli uang tunai dan tabungan berbunga rendah. Sebaliknya, inflasi meringankan beban riil utang berbunga tetap karena nilai cicilan tidak berubah sementara penghasilan nominal cenderung naik.',
     pts:['Naikkan target tujuan keuangan sesuai perkiraan inflasi.','Pastikan imbal hasil investasi jangka panjang di atas inflasi.','Perhatikan inflasi pendidikan dan kesehatan yang biasanya lebih tinggi dari inflasi umum.']}
   ]},
   {name:'BI-Rate & Transmisi', cards:[
    {q:'Apa itu <b>BI-Rate</b>?', a:'Suku bunga kebijakan Bank Indonesia yang diputuskan dalam Rapat Dewan Gubernur (RDG) setiap bulan. Sejak 21 Desember 2023, BI kembali memakai nama BI-Rate, dengan operasional tetap mengacu pada reverse repo tenor 7 hari. BI menaikkan suku bunga untuk meredam inflasi atau menstabilkan rupiah, dan menurunkannya untuk mendorong pertumbuhan ekonomi.'},
    {q:'Bagaimana kebijakan BI <b>merambat</b> ke masyarakat?', a:'Perubahan BI-Rate tidak langsung mengubah semua harga. Efeknya merambat melalui beberapa jalur dengan jeda waktu, biasanya beberapa bulan.',
     pts:['Jalur suku bunga: bunga pasar uang, deposito, lalu bunga kredit ikut menyesuaikan.','Jalur kredit: bank lebih atau kurang agresif menyalurkan pinjaman.','Jalur nilai tukar: perbedaan suku bunga memengaruhi aliran modal dan rupiah.','Jalur harga aset: harga obligasi dan saham bereaksi.','Jalur ekspektasi: masyarakat dan pelaku usaha menyesuaikan perkiraan inflasi.']},
    {q:'Apa dampak kenaikan atau penurunan suku bunga bagi <b>rumah tangga</b>?', a:'Arah suku bunga memengaruhi keputusan menabung, berutang, dan berinvestasi.',
     pts:['Bunga naik: bunga deposito membaik, cicilan KPR berbunga mengambang (floating) bisa naik, harga obligasi lama cenderung turun.','Bunga turun: biaya kredit lebih murah, harga obligasi lama cenderung naik, bunga deposito menurun.'],
     ex:'KPR Rp500 juta tenor 20 tahun. Bunga naik dari 8% ke 10% membuat cicilan naik dari sekitar Rp4,18 juta menjadi Rp4,83 juta per bulan.',
     tip:'Saat mengambil KPR, pahami kapan masa bunga tetap (fixed) berakhir dan hitung cicilan jika bunga floating naik 2 sampai 3 poin.'}
   ]},
   {name:'Nilai Tukar & Stabilitas', cards:[
    {q:'Bagaimana <b>nilai tukar rupiah</b> memengaruhi kita?', a:'Rupiah yang melemah membuat barang impor, bahan baku impor, dan biaya perjalanan ke luar negeri lebih mahal, yang bisa mendorong inflasi. Bagi eksportir, pelemahan rupiah dapat menambah pendapatan dalam rupiah.',
     ex:'Biaya kuliah di luar negeri USD20.000 per tahun. Kurs Rp15.500 berarti Rp310 juta, kurs Rp16.500 berarti Rp330 juta.',
     tip:'Untuk kebutuhan valas yang pasti (kuliah, umrah, liburan), cicil pembelian valas secara bertahap untuk meratakan kurs.'},
    {q:'Apa peran <b>BI, OJK, LPS, dan Kemenkeu</b> dalam stabilitas sistem keuangan?', a:'Keempat lembaga tergabung dalam Komite Stabilitas Sistem Keuangan (KSSK). BI menjaga stabilitas nilai rupiah, sistem pembayaran, dan kebijakan makroprudensial. OJK mengatur dan mengawasi lembaga jasa keuangan serta melindungi konsumen. LPS menjamin simpanan dan menangani bank bermasalah. Kementerian Keuangan mengelola fiskal termasuk penerbitan SBN.'}
   ]}
  ]},

 {id:'reksadana', title:'Reksa Dana & Obligasi', cat:'opsional', img:'t_reksadana',
  desc:'Mengenal wadah investasi yang dikelola profesional dan surat utang untuk pemula: jenis, biaya, cara membaca kinerja, serta SBN ritel.',
  src:'OJK, Buku Seri Literasi Keuangan Pasar Modal · Kemenkeu DJPPR, SBN Ritel (djppr.kemenkeu.go.id) · KSEI, AKSes · Investopedia, Mutual Funds dan Bond Basics · CFA Institute, Fixed Income',
  sets:[
   {name:'Reksa Dana', cards:[
    {q:'Apa itu <b>reksa dana</b> dan bagaimana cara kerjanya?', a:'Wadah untuk menghimpun dana dari banyak investor yang dikelola manajer investasi ke dalam portofolio efek. Dana investor disimpan di bank kustodian, bukan di rekening manajer investasi, sehingga lebih terlindungi. Investor memiliki unit penyertaan yang nilainya mengikuti NAB per unit.',
     pts:['Manajer investasi: mengelola portofolio, berizin OJK.','Bank kustodian: menyimpan aset dan menghitung NAB.','Agen penjual (APERD): aplikasi atau bank tempat membeli, juga wajib berizin.']},
    {q:'Apa saja <b>jenis reksa dana</b> dan kapan cocok dipakai?', a:'Jenis ditentukan oleh isi portofolio. Pilih sesuai jangka waktu tujuan dan profil risiko.',
     pts:['Pasar uang: deposito dan surat utang di bawah 1 tahun. Risiko terendah, untuk dana darurat atau tujuan di bawah 1 tahun.','Pendapatan tetap: minimal 80% obligasi. Untuk 1 sampai 3 tahun.','Campuran: kombinasi saham, obligasi, pasar uang. Untuk 3 sampai 5 tahun.','Saham: minimal 80% saham. Untuk di atas 5 tahun.','Indeks dan ETF: mengikuti indeks tertentu dengan biaya lebih rendah.','Terproteksi: pokok dilindungi pada jatuh tempo dengan syarat tertentu.']},
    {q:'Bagaimana membaca <b>NAB per unit</b> dan menghitung untung?', a:'NAB per unit adalah harga satu unit reksa dana pada hari itu. Keuntungan berasal dari kenaikan NAB per unit. Pembelian sebelum batas waktu (umumnya pukul 13.00 WIB) memakai NAB hari itu.',
     f:'Imbal hasil = (NAB jual − NAB beli) ÷ NAB beli × 100%',
     ex:'Beli Rp5 juta saat NAB Rp1.250 (4.000 unit). Setahun kemudian NAB Rp1.350. Nilai menjadi Rp5,4 juta, imbal hasil 8%.'},
    {q:'Apa yang dicek sebelum memilih <b>produk reksa dana</b>?', a:'Jangan memilih hanya dari kinerja satu tahun terakhir. Kinerja masa lalu tidak menjamin kinerja masa depan.',
     pts:['Kinerja 3 sampai 5 tahun dibanding tolok ukurnya (benchmark).','Total biaya (expense ratio) serta biaya pembelian dan penjualan.','Besar dana kelolaan (AUM) dan konsistensi manajer investasi.','Fund fact sheet dan prospektus yang wajib tersedia.'],
     tip:'Cek kepemilikan unit reksa dana kamu lewat AKSes KSEI untuk memastikan tercatat resmi.'}
   ]},
   {name:'Obligasi', cards:[
    {q:'Apa itu <b>obligasi</b>?', a:'Surat utang yang diterbitkan pemerintah atau perusahaan. Pemegangnya menerima kupon (bunga) secara berkala dan pokoknya dikembalikan saat jatuh tempo. Obligasi korporasi diberi peringkat oleh lembaga pemeringkat seperti Pefindo. Makin rendah peringkat, makin tinggi risiko gagal bayar dan biasanya makin tinggi kuponnya.'},
    {q:'Kenapa harga obligasi <b>berlawanan</b> dengan suku bunga?', a:'Jika suku bunga pasar naik, obligasi baru menawarkan kupon lebih tinggi sehingga obligasi lama berkupon rendah kurang menarik dan harganya turun. Sebaliknya, saat suku bunga turun, harga obligasi lama naik. Makin panjang sisa tenor, makin sensitif harganya (konsep durasi).',
     ex:'Obligasi kupon 6% dibeli pada harga 100. Suku bunga pasar naik ke 7%: harganya bisa turun di bawah 100. Jika dipegang sampai jatuh tempo, investor tetap menerima kupon dan pokok penuh.'},
    {q:'Apa itu <b>yield to maturity</b>?', a:'Perkiraan total imbal hasil tahunan jika obligasi dibeli pada harga sekarang dan dipegang sampai jatuh tempo, termasuk kupon dan selisih harga. YTM berguna untuk membandingkan obligasi dengan harga dan kupon berbeda.',
     f:'Current yield = Kupon tahunan ÷ Harga pasar × 100%',
     ex:'Kupon Rp70 ribu per tahun, harga pasar Rp950 ribu (nominal Rp1 juta): current yield 7,4%, dan YTM lebih tinggi lagi karena ada tambahan selisih Rp50 ribu saat jatuh tempo.'}
   ]},
   {name:'SBN Ritel', cards:[
    {q:'Apa itu <b>SBN ritel</b>?', a:'Surat Berharga Negara yang dijual khusus untuk investor individu warga negara Indonesia melalui mitra distribusi resmi. Pokok dan kuponnya dijamin negara sesuai undang-undang. Pembelian mulai Rp1 juta.',
     pts:['ORI: konvensional, kupon tetap, bisa diperdagangkan.','SR (Sukuk Ritel): syariah, imbalan tetap, bisa diperdagangkan.','SBR: konvensional, kupon mengambang dengan batas bawah, tidak bisa diperdagangkan, bisa dicairkan sebagian lebih awal (early redemption) sampai 50% sesuai jadwal.','ST (Sukuk Tabungan): versi syariah dari SBR.']},
    {q:'Bagaimana kupon <b>floating with floor</b> pada SBR dan ST bekerja?', a:'Kupon mengikuti suku bunga acuan (BI-Rate) ditambah spread tertentu dan disesuaikan berkala. Jika acuan naik, kupon ikut naik. Jika acuan turun, kupon tidak akan lebih rendah dari kupon awal yang menjadi batas bawah.',
     tip:'Kupon SBN dikenai pajak final 10%, lebih rendah dari pajak bunga deposito 20%.'}
   ]}
  ]},

 {id:'saham', title:'Saham: Pengantar', cat:'opsional', img:'trading',
  desc:'Dasar kepemilikan perusahaan lewat saham: sumber keuntungan, mekanisme perdagangan di BEI, biaya, aksi korporasi, dan cara memulai dengan aman.',
  src:'IDX, Panduan Investor Saham dan Sekolah Pasar Modal (idx.co.id) · OJK, Buku Saku Pasar Modal · KSEI, Sistem SID dan AKSes · U.S. SEC Investor.gov, Stocks · Benjamin Graham, The Intelligent Investor',
  sets:[
   {name:'Kenalan dengan Saham', cards:[
    {q:'Apa itu <b>saham</b> dan dari mana keuntungannya?', a:'Saham adalah bukti kepemilikan atas sebagian perusahaan. Keuntungan datang dari dua sumber: dividen (bagian laba yang dibagikan) dan capital gain (kenaikan harga). Risikonya adalah capital loss saat harga turun, dan dalam kondisi terburuk perusahaan dapat dihapus dari bursa (delisting).',
     ex:'Beli 1 lot (100 lembar) di harga Rp2.000, menerima dividen Rp80 per lembar, lalu menjual di Rp2.300. Dividen Rp8.000 + capital gain Rp30.000 = Rp38.000 atau 19% sebelum biaya.'},
    {q:'Apa itu <b>dividen yield</b> dan <b>tanggal-tanggal dividen</b>?', a:'Dividen yield adalah dividen per tahun dibagi harga saham. Untuk berhak atas dividen, investor harus memiliki saham sebelum tanggal ex-dividen (cum date adalah hari terakhir membeli dengan hak dividen).',
     f:'Dividen yield = Dividen per lembar ÷ Harga saham × 100%',
     pts:['Cum date: hari terakhir beli dengan hak dividen.','Ex date: mulai hari ini membeli tidak lagi mendapat dividen, harga biasanya turun sebesar dividen.','Recording date: pencatatan pemegang saham.','Payment date: dividen masuk ke RDN.']},
    {q:'Apa saja <b>jenis saham</b> berdasarkan karakter?', a:'Pengelompokan ini membantu memahami perilaku harga.',
     pts:['Blue chip: perusahaan besar, mapan, likuid, sering masuk indeks LQ45 atau IDX30.','Growth: pertumbuhan laba tinggi, dividen kecil, valuasi cenderung mahal.','Value: dihargai di bawah nilai wajarnya menurut analisis fundamental.','Defensif: kinerja relatif stabil saat ekonomi melambat, misalnya barang konsumsi pokok.','Siklikal: kinerjanya naik turun mengikuti siklus ekonomi, misalnya komoditas dan properti.']}
   ]},
   {name:'Mekanisme Bursa', cards:[
    {q:'Bagaimana cara <b>mulai membeli</b> saham?', a:'Buka rekening efek di perusahaan sekuritas berizin OJK dan anggota bursa. Investor akan mendapat Single Investor Identification (SID) dari KSEI dan Rekening Dana Nasabah (RDN) atas nama sendiri di bank untuk menampung dana transaksi. Transaksi saham diselesaikan T+2, artinya dana dan saham berpindah dua hari bursa setelah transaksi.',
     tip:'Pastikan kamu menerima kartu AKSes atau akses ke akses.ksei.co.id untuk mengecek saham atas namamu secara independen.'},
    {q:'Berapa <b>satuan</b> dan <b>biaya</b> transaksi saham?', a:'Satuan perdagangan adalah 1 lot = 100 lembar. Biaya transaksi berbeda antar sekuritas, umumnya sekitar 0,15% saat beli dan 0,25% saat jual (sudah termasuk pajak penjualan saham 0,1%).',
     ex:'Beli 10 lot di Rp1.500 = Rp1,5 juta, biaya beli 0,15% = Rp2.250. Jual di Rp1.600 = Rp1,6 juta, biaya jual 0,25% = Rp4.000. Untung bersih Rp93.750.'},
    {q:'Apa itu <b>ARA</b>, <b>ARB</b>, dan fraksi harga?', a:'Auto Rejection Atas dan Bawah adalah batas maksimal kenaikan dan penurunan harga saham dalam satu hari perdagangan yang ditetapkan BEI berdasarkan rentang harga. Batasnya dapat diubah oleh bursa sesuai kondisi pasar. Fraksi harga adalah kelipatan perubahan harga yang diizinkan (misalnya Rp1, Rp2, Rp5, Rp10, Rp25 tergantung rentang harga).',
     ex:'Per pengumuman BEI September 2026, ARA untuk saham di atas Rp200 sampai Rp5.000 adalah 25%, sedangkan ARB 15% sampai akhir 2026 dan direncanakan kembali simetris dengan ARA mulai Januari 2027.',
     tip:'Cek ketentuan terbaru di idx.co.id karena aturan ARA/ARB bisa berubah.'},
    {q:'Apa itu <b>IHSG</b> dan indeks lainnya?', a:'Indeks Harga Saham Gabungan mencerminkan pergerakan harga seluruh saham tercatat di BEI. Ada juga indeks lain untuk kelompok tertentu.',
     pts:['LQ45: 45 saham paling likuid dengan kapitalisasi besar.','IDX30 dan IDX80: kelompok saham likuid dan berfundamental baik.','ISSI dan JII: indeks saham syariah.','IDX Sektoral: indeks per sektor seperti keuangan dan energi.']}
   ]},
   {name:'Aksi Korporasi & Kebiasaan Aman', cards:[
    {q:'Apa saja <b>aksi korporasi</b> yang perlu dipahami?', a:'Aksi korporasi dapat mengubah jumlah atau harga saham yang dimiliki.',
     pts:['IPO: penawaran saham perdana kepada publik.','Right issue: penawaran saham baru kepada pemegang saham lama.','Stock split: memecah harga per lembar agar lebih terjangkau, nilai total tidak berubah.','Reverse split: kebalikan stock split.','Buyback: perusahaan membeli kembali sahamnya sendiri.']},
    {q:'Kebiasaan apa yang membuat investor saham <b>bertahan lama</b>?', a:'Banyak investor pemula rugi karena membeli berdasarkan rumor dan memakai uang yang seharusnya untuk kebutuhan lain.',
     pts:['Gunakan dana dingin, yaitu dana yang tidak dibutuhkan setidaknya 5 tahun.','Pahami bisnis perusahaan sebelum membeli.','Batasi porsi per saham, misalnya maksimal 10 sampai 20% portofolio.','Hindari membeli karena "rekomendasi grup" tanpa analisis.','Catat alasan membeli dan kondisi untuk menjual.'],
     warn:'Waspada praktik "pom-pom" dan goreng saham: harga dinaikkan beramai-ramai lalu dijual ke pembeli yang terlambat.'}
   ]}
  ]},

 {id:'funda', title:'Analisis Fundamental', cat:'opsional', img:'magnifier',
  desc:'Menilai kesehatan dan nilai wajar perusahaan dari laporan keuangan, rasio kinerja, valuasi, dan kualitas bisnisnya sebelum memutuskan membeli saham.',
  src:'IDX, Laporan Keuangan dan Tahunan Emiten · OJK, Buku Saku Pasar Modal · CFA Institute, Equity Investments dan Financial Statement Analysis · Aswath Damodaran, Investment Valuation · Benjamin Graham, The Intelligent Investor',
  sets:[
   {name:'Membaca Laporan Keuangan', cards:[
    {q:'Apa isi <b>tiga laporan keuangan</b> utama?', a:'Ketiganya saling terhubung dan sebaiknya dibaca bersama, minimal untuk 3 sampai 5 tahun terakhir agar terlihat tren.',
     pts:['Neraca: aset, liabilitas, dan ekuitas pada satu tanggal. Menunjukkan kekuatan keuangan.','Laba rugi: pendapatan, beban, dan laba dalam satu periode. Menunjukkan profitabilitas.','Arus kas: kas dari operasi, investasi, dan pendanaan. Menunjukkan apakah laba benar menjadi uang tunai.'],
     tip:'Laporan keuangan dan laporan tahunan emiten tersedia gratis di idx.co.id dan situs hubungan investor perusahaan.'},
    {q:'Kenapa <b>arus kas operasi</b> penting?', a:'Laba bisa tercatat walau uangnya belum diterima, misalnya penjualan kredit yang belum dibayar pelanggan. Arus kas operasi yang positif, stabil, dan sejalan dengan laba bersih menunjukkan kualitas laba yang baik.',
     f:'Free cash flow = Arus kas operasi − Belanja modal (capex)',
     ex:'Laba bersih Rp500 miliar tetapi arus kas operasi negatif tiga tahun berturut-turut dan piutang terus membengkak. Ini tanda bahaya yang perlu diselidiki.'},
    {q:'Apa <b>tanda bahaya</b> (red flags) di laporan keuangan?', a:'Beberapa pola sering mendahului masalah besar.',
     pts:['Laba naik tetapi arus kas operasi terus negatif.','Piutang atau persediaan tumbuh jauh lebih cepat dari penjualan.','Utang meningkat tajam tanpa pertumbuhan pendapatan.','Opini auditor selain wajar tanpa pengecualian, atau sering berganti auditor.','Banyak transaksi dengan pihak berelasi.']}
   ]},
   {name:'Rasio Kinerja', cards:[
    {q:'Apa itu <b>ROE</b> dan bagaimana membacanya?', a:'Return on Equity mengukur kemampuan perusahaan menghasilkan laba dari modal pemegang saham. ROE tinggi dan konsisten (misalnya di atas 15% selama beberapa tahun) menandakan bisnis efisien. Periksa juga apakah ROE tinggi karena utang besar.',
     f:'ROE = Laba bersih ÷ Total ekuitas × 100%',
     ex:'Laba bersih Rp300 miliar, ekuitas Rp1,5 triliun: ROE 20%.',
     tip:'Analisis DuPont memecah ROE menjadi margin laba × perputaran aset × leverage untuk melihat sumber ROE.'},
    {q:'Apa itu <b>margin laba</b>?', a:'Margin menunjukkan berapa bagian dari penjualan yang tersisa sebagai laba di tiap tingkat. Bandingkan dengan pesaing di industri yang sama karena margin berbeda jauh antar industri.',
     pts:['Margin laba kotor = Laba kotor ÷ Pendapatan.','Margin laba operasi = Laba operasi ÷ Pendapatan.','Margin laba bersih = Laba bersih ÷ Pendapatan.'],
     ex:'Pendapatan Rp2 triliun, laba bersih Rp200 miliar: margin bersih 10%.'},
    {q:'Apa itu <b>DER</b> dan <b>current ratio</b>?', a:'Debt to Equity Ratio membandingkan total utang dengan modal sendiri. DER tinggi berarti perusahaan banyak dibiayai utang dan lebih rentan saat bunga naik. Current ratio membandingkan aset lancar dengan liabilitas lancar untuk melihat kemampuan membayar kewajiban jangka pendek.',
     f:'DER = Total liabilitas ÷ Total ekuitas · Current ratio = Aset lancar ÷ Liabilitas lancar',
     warn:'Bank dan perusahaan pembiayaan secara alami memiliki DER tinggi. Untuk sektor ini gunakan rasio khusus seperti CAR dan NPL.'}
   ]},
   {name:'Valuasi', cards:[
    {q:'Apa yang diukur <b>PER</b>?', a:'Price to Earnings Ratio menunjukkan berapa kali laba per saham yang dibayar investor. PER perlu dibandingkan dengan rata-rata historis perusahaan dan pesaing di sektor yang sama. PER rendah bisa berarti murah, tetapi juga bisa berarti pasar memperkirakan laba akan turun.',
     f:'PER = Harga saham ÷ Laba per saham (EPS)',
     ex:'Harga Rp4.000, EPS Rp400: PER 10 kali. Jika rata-rata sektor 15 kali dan fundamentalnya setara, saham ini relatif murah.'},
    {q:'Apa itu <b>PBV</b>?', a:'Price to Book Value membandingkan harga saham dengan nilai buku per saham. Berguna untuk perusahaan yang asetnya dominan seperti bank. PBV di bawah 1 berarti harga pasar lebih rendah dari nilai buku ekuitasnya, namun perlu dicek alasannya.',
     f:'PBV = Harga saham ÷ Nilai buku per saham',
     ex:'Harga Rp1.200, nilai buku per saham Rp1.500: PBV 0,8 kali.'},
    {q:'Apa itu <b>nilai intrinsik</b> dan <b>margin of safety</b>?', a:'Nilai intrinsik adalah perkiraan nilai wajar perusahaan berdasarkan kemampuannya menghasilkan kas di masa depan, misalnya dengan metode discounted cash flow (DCF). Margin of safety, konsep dari Benjamin Graham, adalah membeli jauh di bawah nilai intrinsik sebagai bantalan terhadap kesalahan perkiraan.',
     f:'Margin of safety = (Nilai intrinsik − Harga) ÷ Nilai intrinsik × 100%',
     ex:'Nilai intrinsik diperkirakan Rp5.000, harga Rp3.500: margin of safety 30%.',
     tip:'Valuasi adalah perkiraan, bukan kepastian. Gunakan asumsi yang konservatif.'}
   ]}
  ]},

 {id:'teknikal', title:'Analisis Teknikal', cat:'opsional', img:'t_teknikal',
  desc:'Membaca pola harga dan volume untuk menentukan waktu masuk dan keluar: candlestick, tren, support dan resistance, indikator populer, serta manajemen risiko.',
  src:'IDX, Sekolah Pasar Modal · John J. Murphy, Technical Analysis of the Financial Markets · CMT Association, Body of Knowledge · Investopedia, Technical Analysis (RSI, MACD, Bollinger Bands) · Steve Nison, Japanese Candlestick Charting Techniques',
  sets:[
   {name:'Candlestick & Pola', cards:[
    {q:'Apa informasi dalam satu <b>candlestick</b>?', a:'Satu batang candlestick merangkum empat harga dalam satu periode: pembukaan (open), tertinggi (high), terendah (low), dan penutupan (close). Badan (body) menunjukkan jarak open ke close. Ekor atau sumbu (shadow) menunjukkan harga tertinggi dan terendah.',
     pts:['Badan hijau atau putih: close lebih tinggi dari open (naik).','Badan merah atau hitam: close lebih rendah dari open (turun).','Ekor atas panjang: pembeli sempat mendorong naik, tetapi penjual menekan kembali.','Ekor bawah panjang: harga sempat jatuh, tetapi pembeli mengangkatnya kembali.'],
     ex:'Open Rp1.000, high Rp1.080, low Rp990, close Rp1.060: candle hijau dengan badan Rp60 dan ekor atas Rp20.'},
    {q:'Apa saja <b>pola candlestick</b> yang sering dipakai?', a:'Pola candlestick menggambarkan pertarungan pembeli dan penjual. Pola lebih bermakna jika muncul di area support atau resistance dan dikonfirmasi volume serta candle berikutnya.',
     pts:['Hammer: badan kecil di atas, ekor bawah panjang, muncul setelah penurunan. Sinyal potensi pembalikan naik.','Shooting star: kebalikan hammer, muncul setelah kenaikan. Potensi pembalikan turun.','Doji: open dan close hampir sama, menandakan keraguan pasar.','Bullish engulfing: candle hijau besar menelan seluruh badan candle merah sebelumnya.','Bearish engulfing: kebalikannya, candle merah besar menelan candle hijau sebelumnya.']},
    {q:'Apa itu pola <b>chart</b> klasik?', a:'Pola yang terbentuk dari banyak candle dalam rentang waktu lebih panjang.',
     pts:['Double bottom (huruf W): dua kali gagal turun di level sama, potensi pembalikan naik saat menembus puncak di tengahnya.','Double top (huruf M): kebalikannya.','Head and shoulders: tiga puncak dengan puncak tengah tertinggi, pola pembalikan turun.','Triangle dan flag: pola konsolidasi sebelum harga melanjutkan tren.'],
     warn:'Pola bisa gagal. Selalu siapkan batas rugi.'}
   ]},
   {name:'Tren, Support & Resistance', cards:[
    {q:'Bagaimana mengenali <b>tren</b>?', a:'Prinsip utama analisis teknikal: harga bergerak dalam tren, dan tren cenderung berlanjut sampai ada tanda pembalikan.',
     pts:['Tren naik (uptrend): puncak dan lembah makin tinggi (higher high, higher low).','Tren turun (downtrend): puncak dan lembah makin rendah (lower high, lower low).','Sideways: harga bergerak mendatar dalam rentang tertentu.'],
     tip:'Mulai dari grafik mingguan untuk melihat tren besar, lalu grafik harian untuk mencari titik masuk.'},
    {q:'Apa itu <b>support</b> dan <b>resistance</b>?', a:'Support adalah area harga yang cenderung menahan penurunan karena banyak pembeli masuk. Resistance adalah area yang cenderung menahan kenaikan karena banyak penjual. Jika resistance ditembus dengan volume besar (breakout), area itu sering berubah peran menjadi support baru.',
     ex:'Saham tiga kali gagal menembus Rp2.500 lalu akhirnya ditutup di Rp2.560 dengan volume dua kali rata-rata. Rp2.500 kini berpotensi menjadi support. Jika harga kembali turun ke sekitar Rp2.500 dan bertahan (retest), itu menjadi konfirmasi.'},
    {q:'Apa peran <b>volume</b>?', a:'Volume menunjukkan kekuatan di balik pergerakan harga. Kenaikan harga dengan volume besar lebih meyakinkan dibanding kenaikan dengan volume tipis. Penurunan dengan volume besar menandakan tekanan jual yang kuat.',
     pts:['Breakout tanpa volume sering gagal (false breakout).','Volume yang mengecil saat tren berlangsung bisa menandakan tren melemah.']}
   ]},
   {name:'Indikator Populer', cards:[
    {q:'Bagaimana membaca <b>Moving Average</b> (MA)?', a:'Rata-rata harga penutupan dalam periode tertentu yang menghaluskan pergerakan harga. Simple MA memberi bobot sama, Exponential MA (EMA) memberi bobot lebih besar pada data terbaru.',
     f:'MA 5 hari = Jumlah 5 harga penutupan terakhir ÷ 5',
     pts:['Harga di atas MA 200 hari sering dianggap tren jangka panjang naik.','Golden cross: MA 50 memotong ke atas MA 200, sinyal penguatan.','Death cross: MA 50 memotong ke bawah MA 200, sinyal pelemahan.'],
     ex:'Harga penutupan 5 hari: 1.000, 1.020, 1.010, 1.040, 1.050. MA 5 = 5.120 ÷ 5 = 1.024. Harga terakhir 1.050 di atas MA, menandakan momentum naik jangka pendek.'},
    {q:'Bagaimana membaca <b>RSI</b>?', a:'Relative Strength Index (dikembangkan J. Welles Wilder) adalah indikator momentum berskala 0 sampai 100, umumnya memakai periode 14. Di atas 70 sering dianggap jenuh beli (overbought), di bawah 30 jenuh jual (oversold). Dalam tren kuat, RSI bisa bertahan lama di area ekstrem.',
     pts:['Divergensi bullish: harga membuat lembah lebih rendah, tetapi RSI membuat lembah lebih tinggi. Momentum turun melemah.','Divergensi bearish: harga membuat puncak lebih tinggi, tetapi RSI puncaknya lebih rendah.'],
     warn:'RSI di atas 70 bukan perintah jual otomatis. Gunakan bersama tren dan support/resistance.'},
    {q:'Apa itu <b>MACD</b> dan <b>Bollinger Bands</b>?', a:'MACD (Moving Average Convergence Divergence) mengukur selisih EMA 12 dan EMA 26, dengan garis sinyal EMA 9. Bollinger Bands terdiri dari MA 20 dan dua pita di atas dan bawahnya sejauh dua standar deviasi, menggambarkan volatilitas.',
     pts:['MACD memotong ke atas garis sinyal: momentum menguat.','MACD memotong ke bawah garis sinyal: momentum melemah.','Pita Bollinger menyempit (squeeze): volatilitas rendah, sering mendahului pergerakan besar.','Harga menyentuh pita atas dalam uptrend kuat adalah hal biasa, bukan otomatis sinyal jual.']}
   ]},
   {name:'Manajemen Risiko Trading', cards:[
    {q:'Apa itu <b>stop loss</b> dan <b>risk-reward ratio</b>?', a:'Stop loss adalah batas harga untuk keluar saat analisis ternyata salah, agar kerugian kecil dan terkendali. Risk-reward ratio membandingkan potensi rugi dengan potensi untung. Banyak trader mensyaratkan minimal 1:2.',
     ex:'Beli di Rp1.000 dengan stop loss Rp950 (risiko Rp50) dan target Rp1.100 (potensi Rp100). Rasio 1:2. Dengan rasio ini, menang 40% dari transaksi saja sudah bisa menghasilkan untung bersih.'},
    {q:'Berapa <b>ukuran posisi</b> yang aman?', a:'Aturan umum trader: risiko kerugian per transaksi maksimal 1 sampai 2% dari total modal.',
     f:'Jumlah lembar = (Modal × % risiko) ÷ (Harga beli − Stop loss)',
     ex:'Modal Rp20 juta, risiko 2% = Rp400 ribu. Beli Rp1.000, stop loss Rp950 (selisih Rp50): maksimal 8.000 lembar atau 80 lot.',
     warn:'Analisis teknikal tidak memberi kepastian. Trading jangka pendek memiliki risiko tinggi dan biaya transaksi yang menumpuk.'}
   ]}
  ]}
);
