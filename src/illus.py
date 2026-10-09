"""Flat indigo illustrations matching the chosen upload family (white bg, floor pills)."""
import os
IND='#333399'; INDD='#26267A'; LAV='#EFEFF7'; LAV2='#DEDEEB'; PERI='#8C8CD9'
TEAL='#72CFD0'; TEALD='#48B3B5'; MAUVE='#B49ABB'; GOLD='#E6B34A'; GOLDL='#F5D27E'
GOLDD='#C08A2B'; CORAL='#E0605B'; PAPER='#F8F8FC'; KEY='#5656B5'

def wrap(body, w=320, h=200):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w*2}" height="{h*2}">'
            f'<rect width="{w}" height="{h}" fill="#fff"/>{body}</svg>')

def pills(y=174, x0=40, x1=280):
    return (f'<rect x="{x0}" y="{y}" width="24" height="10" rx="5" fill="{LAV}"/>'
            f'<rect x="{x0+32}" y="{y}" width="{x1-x0-64}" height="10" rx="5" fill="{LAV}"/>'
            f'<rect x="{x1-24}" y="{y}" width="24" height="10" rx="5" fill="{LAV}"/>')

def plus(x, y, c=LAV2):
    return f'<path d="M{x-4} {y}h8M{x} {y-4}v8" stroke="{c}" stroke-width="2" stroke-linecap="round"/>'

def chev(x, y, c='#C9C9E6'):
    return ''.join(f'<path d="M{x+i*7} {y-4}l4 4-4 4" stroke="{c}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' for i in range(3))

def coin_stack(cx, base, n, r=19):
    s = ''
    for i in range(n):
        cy = base - i * 8
        s += f'<ellipse cx="{cx}" cy="{cy+4}" rx="{r}" ry="5.5" fill="{GOLDD}"/>'
        s += f'<rect x="{cx-r}" y="{cy}" width="{2*r}" height="4" fill="{GOLDD}"/>'
        s += f'<ellipse cx="{cx}" cy="{cy}" rx="{r}" ry="5.5" fill="{GOLD}"/>'
    return s

def coin(cx, cy, r=14):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{GOLD}"/><circle cx="{cx}" cy="{cy}" r="{r*0.68:.1f}" fill="none" stroke="{GOLDL}" stroke-width="2.2"/>'
            f'<text x="{cx}" y="{cy+r*0.33:.1f}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="{r*0.9:.0f}" fill="{GOLDD}">Rp</text>')

def check(x, y, s=12, on=True):
    if not on:
        return f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="3" fill="{LAV2}"/>'
    return (f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="3" fill="{TEAL}"/>'
            f'<path d="M{x+3} {y+s/2}l{s*0.22:.1f} {s*0.22:.1f} {s*0.38:.1f}-{s*0.42:.1f}" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')

ILL = {}

# 1 Keuangan dasar: clipboard + calculator + coins
b = pills()
b += plus(44, 52) + plus(282, 118) + chev(246, 44)
b += f'<rect x="110" y="38" width="96" height="130" rx="11" fill="{IND}"/>'
b += f'<rect x="118" y="50" width="80" height="110" rx="6" fill="#fff"/>'
b += f'<rect x="138" y="30" width="40" height="16" rx="6" fill="{PERI}"/>'
for i, y in enumerate([64, 88, 112, 136]):
    b += check(126, y, 12, i < 3)
    b += f'<rect x="144" y="{y+3}" width="{44 if i%2==0 else 34}" height="6" rx="3" fill="{LAV2}"/>'
b += f'<rect x="214" y="92" width="58" height="78" rx="9" fill="{INDD}"/>'
b += f'<rect x="222" y="100" width="42" height="16" rx="3" fill="{TEAL}"/>'
for j in range(3):
    for i in range(3):
        c = CORAL if (i == 2 and j == 2) else KEY
        b += f'<rect x="{222+i*15}" y="{124+j*14}" width="11" height="9" rx="2.5" fill="{c}"/>'
b += coin_stack(72, 162, 5) + coin_stack(102, 166, 2, 15)
ILL['t_dasar'] = wrap(b)

# 2 Dasar investasi: rising bars + arrow + coins + sprout
b = pills()
b += plus(46, 60) + plus(286, 140) + chev(58, 36)
for i, (h, c) in enumerate([(40, PERI), (62, IND), (84, PERI), (110, IND)]):
    x = 112 + i * 32
    b += f'<rect x="{x}" y="{170-h}" width="22" height="{h}" rx="4" fill="{c}"/>'
b += f'<polyline points="98,128 134,102 160,114 200,70 232,52" fill="none" stroke="{TEAL}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
b += f'<polygon points="244,44 222,46 236,64" fill="{TEAL}"/>'
b += coin_stack(72, 164, 3)
b += coin_stack(266, 166, 4, 16)
b += f'<path d="M266 134 C266 124 266 116 266 108" stroke="{TEALD}" stroke-width="3" fill="none" stroke-linecap="round"/>'
b += f'<path d="M266 118 C254 118 248 110 248 102 C258 102 266 108 266 118Z" fill="{TEAL}"/>'
b += f'<path d="M266 112 C278 112 284 104 284 96 C274 96 266 102 266 112Z" fill="{TEALD}"/>'
b += coin(88, 70, 12)
ILL['t_investasi'] = wrap(b)

# 3 Utang & kredit: card + receipt + percent badge + clock
b = pills()
b += plus(286, 48) + chev(40, 150)
b += f'<path d="M178 38h76v112l-7-6-7 6-7-6-7 6-7-6-7 6-7-6-7 6-7-6-7 6-6-6z" fill="{PAPER}" stroke="{LAV2}" stroke-width="2" stroke-linejoin="round"/>'
for i, y in enumerate([56, 70, 84, 98]):
    b += f'<rect x="190" y="{y}" width="{52 if i%2 else 40}" height="6" rx="3" fill="{LAV2}"/>'
b += f'<rect x="190" y="116" width="52" height="8" rx="3" fill="{IND}"/>'
b += f'<g transform="rotate(-12 140 112)"><rect x="70" y="72" width="136" height="86" rx="11" fill="{IND}"/>'
b += f'<rect x="70" y="90" width="136" height="15" fill="{INDD}"/>'
b += f'<rect x="86" y="116" width="24" height="18" rx="3.5" fill="{GOLD}"/>'
b += f'<rect x="86" y="142" width="60" height="5" rx="2.5" fill="{PERI}"/>'
b += f'<circle cx="178" cy="136" r="10" fill="{CORAL}"/><circle cx="191" cy="136" r="10" fill="{GOLDL}" fill-opacity=".92"/></g>'
b += f'<circle cx="252" cy="148" r="22" fill="{CORAL}"/>'
b += f'<text x="252" y="157" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="24" fill="#fff">%</text>'
b += f'<circle cx="68" cy="56" r="16" fill="{LAV2}"/><circle cx="68" cy="56" r="11" fill="#fff"/>'
b += f'<path d="M68 49v7l5 3" stroke="{IND}" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
ILL['t_utang'] = wrap(b)

# 4 Waspada investasi ilegal: phone with too-good offer + warning triangle
b = pills()
b += plus(48, 48) + plus(292, 70) + chev(40, 128)
b += f'<rect x="100" y="26" width="80" height="146" rx="14" fill="{IND}"/>'
b += f'<rect x="107" y="38" width="66" height="122" rx="6" fill="{LAV}"/>'
b += f'<rect x="130" y="30" width="20" height="4" rx="2" fill="{INDD}"/>'
b += f'<rect x="113" y="48" width="54" height="36" rx="7" fill="#fff"/>'
b += f'<text x="140" y="64" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="12" fill="{CORAL}">+10%</text>'
b += f'<text x="140" y="77" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="8" fill="{IND}">PER HARI</text>'
b += coin(126, 104, 9) + coin(150, 108, 9)
b += f'<rect x="115" y="130" width="50" height="16" rx="8" fill="{CORAL}"/>'
b += f'<rect x="127" y="136" width="26" height="4" rx="2" fill="#fff"/>'
b += f'<path d="M236 66 L278 142 H194 Z" fill="{CORAL}" stroke="{CORAL}" stroke-width="12" stroke-linejoin="round"/>'
b += f'<rect x="231" y="86" width="10" height="34" rx="5" fill="#fff"/><circle cx="236" cy="132" r="6" fill="#fff"/>'
ILL['t_ilegal'] = wrap(b)

# 5 Emas: gold bar pyramid + sparkles
def bar(x, y):
    return (f'<polygon points="{x+9},{y} {x+61},{y} {x+70},{y+11} {x},{y+11}" fill="{GOLDL}"/>'
            f'<rect x="{x}" y="{y+11}" width="70" height="17" fill="{GOLD}"/>'
            f'<rect x="{x}" y="{y+24}" width="70" height="4" fill="{GOLDD}"/>'
            f'<rect x="{x+22}" y="{y+16}" width="26" height="4" rx="2" fill="{GOLDL}"/>')
def spark(x, y, s, c=GOLD):
    return f'<path d="M{x} {y-s}C{x+s*0.18} {y-s*0.18} {x+s*0.18} {y-s*0.18} {x+s} {y}C{x+s*0.18} {y+s*0.18} {x+s*0.18} {y+s*0.18} {x} {y+s}C{x-s*0.18} {y+s*0.18} {x-s*0.18} {y+s*0.18} {x-s} {y}C{x-s*0.18} {y-s*0.18} {x-s*0.18} {y-s*0.18} {x} {y-s}Z" fill="{c}"/>'
b = pills()
b += chev(48, 50) + plus(290, 52)
b += bar(51, 142) + bar(125, 142) + bar(199, 142)
b += bar(88, 114) + bar(162, 114)
b += bar(125, 86)
b += spark(104, 66, 11) + spark(226, 70, 8, PERI) + spark(252, 104, 12) + spark(78, 100, 7, TEAL)
ILL['t_emas'] = wrap(b)

# 6 Reksa dana & obligasi: donut chart + bond certificate
b = pills()
b += plus(44, 44) + chev(256, 30) + plus(292, 150)
b += f'<rect x="64" y="42" width="84" height="116" rx="8" fill="{PAPER}" stroke="{LAV2}" stroke-width="2"/>'
b += f'<rect x="76" y="56" width="60" height="10" rx="3" fill="{IND}"/>'
for i, y in enumerate([76, 88, 100, 112]):
    b += f'<rect x="76" y="{y}" width="{60 if i%2==0 else 44}" height="5" rx="2.5" fill="{LAV2}"/>'
b += f'<path d="M118 142l-6 16 8-4 6 6 3-16z" fill="{CORAL}"/><path d="M130 142l6 16-8-4-6 6-3-16z" fill="{CORAL}"/>'
b += f'<circle cx="124" cy="138" r="13" fill="{GOLD}"/><circle cx="124" cy="138" r="8" fill="none" stroke="{GOLDL}" stroke-width="2"/>'
C = 2 * 3.14159 * 40
segs = [(IND, .40), (TEAL, .25), (GOLD, .20), (MAUVE, .15)]
off = 0
b += f'<g transform="rotate(-90 212 104)">'
for col, f in segs:
    L = C * f
    b += f'<circle cx="212" cy="104" r="40" fill="none" stroke="{col}" stroke-width="26" stroke-dasharray="{L-1.5:.1f} {C-L+1.5:.1f}" stroke-dashoffset="{-off:.1f}"/>'
    off += L
b += '</g>'
b += f'<circle cx="212" cy="104" r="20" fill="#fff"/>'
b += f'<circle cx="266" cy="58" r="15" fill="{TEAL}"/><path d="M259 62l7-8 7 8M266 54v12" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
ILL['t_reksadana'] = wrap(b)

# 7 Studi kasus: folder + papers + magnifier + question bubble
b = pills()
b += chev(250, 36) + plus(292, 126) + plus(40, 124)
b += f'<path d="M84 60h40l10 12h78a8 8 0 018 8v84a8 8 0 01-8 8H84a8 8 0 01-8-8V68a8 8 0 018-8z" fill="{INDD}"/>'
b += f'<rect x="96" y="54" width="100" height="80" rx="5" fill="#fff" transform="rotate(-5 146 94)"/>'
b += f'<rect x="104" y="62" width="100" height="80" rx="5" fill="{PAPER}" stroke="{LAV2}" stroke-width="1.5"/>'
for i, y in enumerate([74, 86, 98]):
    b += f'<rect x="114" y="{y}" width="{70 if i!=1 else 52}" height="5" rx="2.5" fill="{LAV2}"/>'
b += f'<path d="M76 100h144v64a8 8 0 01-8 8H84a8 8 0 01-8-8z" fill="{IND}"/>'
b += f'<rect x="132" y="118" width="32" height="6" rx="3" fill="{PERI}"/>'
b += f'<rect x="246" y="130" width="12" height="40" rx="6" fill="{INDD}" transform="rotate(-40 252 150)"/>'
b += f'<circle cx="232" cy="112" r="26" fill="#fff" fill-opacity=".85" stroke="{TEAL}" stroke-width="9"/>'
b += f'<path d="M222 110l7 7 13-14" stroke="{TEALD}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
b += f'<circle cx="70" cy="48" r="18" fill="{CORAL}"/>'
b += f'<text x="70" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="22" fill="#fff">?</text>'
b += coin_stack(56, 164, 2, 14)
ILL['h_kasus'] = wrap(b)

# 8 Selesai: trophy (square)
b = f'<circle cx="100" cy="100" r="96" fill="{LAV}"/>'
b += f'<ellipse cx="100" cy="166" rx="46" ry="6" fill="{LAV2}"/>'
b += f'<path d="M64 52c-22 0-26 30-2 40" stroke="{GOLDD}" stroke-width="9" fill="none" stroke-linecap="round"/>'
b += f'<path d="M136 52c22 0 26 30 2 40" stroke="{GOLDD}" stroke-width="9" fill="none" stroke-linecap="round"/>'
b += f'<path d="M60 44h80v26c0 26-18 44-40 44s-40-18-40-44z" fill="{GOLD}"/>'
b += f'<path d="M60 44h20v26c0 20 8 34 20 40-22-2-40-18-40-40z" fill="{GOLDL}" fill-opacity=".7"/>'
b += f'<rect x="92" y="112" width="16" height="22" fill="{GOLDD}"/>'
b += f'<rect x="70" y="132" width="60" height="28" rx="6" fill="{IND}"/>'
b += f'<rect x="84" y="142" width="32" height="7" rx="3.5" fill="{PERI}"/>'
b += spark(100, 76, 14, '#fff')
for x, y, w, h, c, r in [(30, 40, 8, 8, TEAL, 20), (160, 30, 8, 8, CORAL, -15), (170, 110, 6, 6, PERI, 30), (26, 120, 7, 7, GOLD, 10), (150, 150, 6, 6, TEAL, 0)]:
    b += f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="1.5" fill="{c}" transform="rotate({r} {x} {y})"/>'
ILL['h_selesai'] = wrap(b, 200, 200)


# ---- v9: ilustrasi topik baru ----
def phone(x, y, w=74, h=124):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{IND}"/>'
            f'<rect x="{x+6}" y="{y+12}" width="{w-12}" height="{h-24}" rx="5" fill="#fff"/>'
            f'<rect x="{x+w/2-10}" y="{y+5}" width="20" height="3" rx="1.5" fill="{PERI}"/>')

# Tujuan keuangan: tangga menuju bendera target
b = pills() + plus(46, 54) + plus(284, 132) + chev(240, 40)
for i in range(4):
    b += f'<rect x="{96+i*34}" y="{150-i*24}" width="34" height="{20+i*24}" rx="4" fill="{PERI if i%2 else IND}"/>'
b += f'<rect x="226" y="54" width="4" height="52" rx="2" fill="{INDD}"/>'
b += f'<path d="M230 56 L262 64 L230 74Z" fill="{CORAL}"/>'
b += coin(112, 128, 10) + coin(146, 104, 10) + coin(180, 80, 10)
b += coin_stack(66, 164, 3, 15)
ILL['t_tujuan'] = wrap(b)

# Pembayaran digital: ponsel dengan QR + gelombang
b = pills() + plus(48, 60) + plus(282, 52) + chev(226, 150)
b += phone(122, 38)
for (x, y) in [(136, 58), (170, 58), (136, 92)]:
    b += f'<rect x="{x}" y="{y}" width="18" height="18" rx="2" fill="none" stroke="{IND}" stroke-width="4"/>'
for (x, y) in [(166, 92), (178, 98), (166, 106), (182, 88), (174, 112), (140, 120), (158, 122)]:
    b += f'<rect x="{x}" y="{y}" width="7" height="7" fill="{IND}"/>'
for r in [16, 28, 40]:
    b += f'<path d="M{214} {96-r} a{r} {r} 0 0 1 0 {2*r}" fill="none" stroke="{TEAL}" stroke-width="5" stroke-linecap="round" transform="translate({r*0.3},0)"/>'
b += coin(80, 130, 16)
ILL['t_digital'] = wrap(b)

# Keamanan digital: ponsel + gembok + kail pancing
b = pills() + plus(44, 56) + plus(286, 124) + chev(52, 152)
b += phone(96, 40)
b += f'<rect x="114" y="90" width="38" height="32" rx="6" fill="{TEAL}"/>'
b += f'<path d="M122 90 v-10 a11 11 0 0 1 22 0 v10" fill="none" stroke="{TEALD}" stroke-width="5"/>'
b += f'<circle cx="133" cy="104" r="4" fill="#fff"/><rect x="131" y="104" width="4" height="10" rx="2" fill="#fff"/>'
b += f'<path d="M236 30 V112 a18 18 0 0 1 -36 0 v-10" fill="none" stroke="{INDD}" stroke-width="5" stroke-linecap="round"/>'
b += f'<path d="M200 102 l-7 9 M200 102 l8 6" stroke="{INDD}" stroke-width="5" stroke-linecap="round"/>'
b += f'<rect x="216" y="128" width="44" height="28" rx="5" fill="{CORAL}"/><path d="M218 132 l20 14 l20 -14" fill="none" stroke="#fff" stroke-width="3"/>'
ILL['t_aman'] = wrap(b)

# Pajak: dokumen dengan persen + stempel
b = pills() + plus(46, 56) + plus(282, 128) + chev(236, 40)
b += f'<rect x="108" y="34" width="96" height="134" rx="10" fill="{IND}"/><rect x="116" y="44" width="80" height="116" rx="5" fill="#fff"/>'
for i, y in enumerate([58, 74, 90]):
    b += f'<rect x="126" y="{y}" width="{58 if i!=1 else 44}" height="6" rx="3" fill="{LAV2}"/>'
b += f'<circle cx="142" cy="124" r="7" fill="none" stroke="{CORAL}" stroke-width="4"/><circle cx="172" cy="144" r="7" fill="none" stroke="{CORAL}" stroke-width="4"/><path d="M176 116 L138 152" stroke="{CORAL}" stroke-width="5" stroke-linecap="round"/>'
b += f'<circle cx="236" cy="132" r="26" fill="{TEAL}"/><circle cx="236" cy="132" r="18" fill="none" stroke="#fff" stroke-width="3"/><path d="M228 132 l6 6 l11 -12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
b += coin_stack(72, 164, 3, 15)
ILL['t_pajak'] = wrap(b)

# Keuangan syariah: timbangan seimbang + koin
b = pills() + plus(44, 52) + plus(286, 120) + chev(232, 34)
b += f'<rect x="156" y="52" width="8" height="104" rx="4" fill="{INDD}"/><rect x="128" y="152" width="64" height="12" rx="6" fill="{IND}"/>'
b += f'<rect x="90" y="56" width="140" height="7" rx="3.5" fill="{IND}"/><circle cx="160" cy="52" r="9" fill="{GOLD}"/>'
for cx in (104, 216):
    b += f'<path d="M{cx} 63 L{cx-22} 110 M{cx} 63 L{cx+22} 110" stroke="{PERI}" stroke-width="3"/>'
    b += f'<path d="M{cx-30} 110 h60 a30 14 0 0 1 -60 0z" fill="{TEAL}"/>'
b += coin(104, 100, 11) + coin(216, 100, 11)
ILL['t_syariah'] = wrap(b)

# Aset kripto: koin besar + rantai blok + grafik naik turun
b = pills() + plus(46, 60) + plus(284, 50) + chev(222, 156)
for i in range(3):
    b += f'<rect x="{70+i*44}" y="{42+(i%2)*14}" width="32" height="32" rx="6" fill="{PERI if i%2 else IND}"/>'
    if i < 2: b += f'<rect x="{102+i*44}" y="{56+(i%2)*4}" width="12" height="5" rx="2.5" fill="{LAV2}"/>'
b += f'<circle cx="214" cy="112" r="40" fill="{GOLD}"/><circle cx="214" cy="112" r="30" fill="none" stroke="{GOLDL}" stroke-width="4"/>'
b += f'<path d="M206 94 v36 M218 94 v36 M200 100 h22 a8 8 0 0 1 0 12 h-22 h24 a8 8 0 0 1 0 12 h-24" fill="none" stroke="{GOLDD}" stroke-width="5" stroke-linejoin="round"/>'
b += f'<polyline points="62,150 86,120 104,136 130,98 150,126" fill="none" stroke="{CORAL}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
ILL['t_kripto'] = wrap(b)

# Inflasi & suku bunga: gedung bank + termometer harga
b = pills() + plus(48, 58) + plus(286, 136) + chev(52, 150)
b += f'<path d="M86 74 L146 44 L206 74Z" fill="{IND}"/><rect x="88" y="74" width="116" height="8" fill="{INDD}"/>'
for i in range(4):
    b += f'<rect x="{98+i*26}" y="86" width="12" height="62" rx="3" fill="{PERI}"/>'
b += f'<rect x="84" y="150" width="124" height="14" rx="4" fill="{IND}"/>'
b += f'<rect x="236" y="42" width="22" height="98" rx="11" fill="{LAV}" stroke="{IND}" stroke-width="4"/><rect x="243" y="74" width="8" height="66" fill="{CORAL}"/><circle cx="247" cy="146" r="17" fill="{CORAL}" stroke="{IND}" stroke-width="4"/>'
b += f'<path d="M226 64 h-10 M226 84 h-10 M226 104 h-10" stroke="{PERI}" stroke-width="3" stroke-linecap="round"/>'
b += f'<text x="146" y="70" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="14" fill="#fff">%</text>'
ILL['t_moneter'] = wrap(b)

# Analisis teknikal: candlestick
b = pills() + plus(44, 56) + plus(286, 60) + chev(236, 156)
b += f'<rect x="70" y="36" width="180" height="128" rx="10" fill="{PAPER}" stroke="{LAV2}" stroke-width="2"/>'
cs = [(92,120,140,108,150,TEALD),(116,104,124,92,132,CORAL),(140,112,128,100,136,TEALD),(164,86,108,76,116,TEALD),(188,94,100,84,108,CORAL),(212,62,88,52,96,TEALD),(236,56,70,48,80,TEALD)]
for x, t, bt, hi, lo, c in cs[:6]:
    b += f'<path d="M{x} {hi} V{lo}" stroke="{c}" stroke-width="2.5"/><rect x="{x-6}" y="{t}" width="12" height="{bt-t}" rx="2" fill="{c}"/>'
b += f'<polyline points="86,134 112,122 136,118 160,100 184,96 208,76 232,64" fill="none" stroke="{IND}" stroke-width="3" stroke-dasharray="1 0"/>'
ILL['t_teknikal'] = wrap(b)

if __name__ == '__main__':
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'img')
    for k, v in ILL.items():
        open(os.path.join(out, k + '.svg'), 'w').write(v)
    print(sorted(ILL))
