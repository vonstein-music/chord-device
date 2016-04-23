"use strict";
define(function() {

    var sets = {

        _000000: {
            _0: 'Unison'
        },
        _100000: {
            _01: 'Semitone'
        },
        _010000: {
            _02: 'Whole-tone'
        },
        _001000: {
            _03: 'Minor Third'
        },
        _000100: {
            _04: 'Major Third'
        },
        _000010: {
            _05: 'Perfect Fourth'
        },
        _000001: {
            _06: 'Tritone'
        },
        _210000: {
            _012: 'BACH /Chromatic Trimirror'
        },
        _111000: {
            _013: 'Phrygian Trichord',
            _023: 'Minor Trichord'
        },
        _101100: {
            _014: 'Major-minor Trichord.1',
            _034: 'Major-minor Trichord.2'
        },
        _100110: {
            _015: 'Incomplete Major-seventh chord.1',
            _045: 'Incomplete Major-seventh chord.2'
        },
        _100011: {
            _016: 'Rite chord.2, Tritone-fourth.1',
            _056: 'Rite chord.1, Tritone-fourth.2'
        },
        _020100: {
            _024: 'Whole-tone Trichord'
        },
        _011010: {
            _025: 'Incomplete minor seventh chord',
            _035: 'Incomplete Dominant-seventh chord.2'
        },
        _010101: {
            _026: 'Italian-sixth, Incomplete Dominant-seventh chord.1',
            _046: 'Incomplete Half-dim-seventh chord'
        },
        _010020: {
            _027: 'Quartal Trichord'
        },
        _002001: {
            _036: 'Diminished Triad'
        },
        _001110: {
            _037: 'Minor Triad',
            _047: 'Major Triad'
        },
        _000300: {
            _048: 'Augmented Triad'
        },
        _321000: {
            _0123: 'BACH /Chromatic Tetramirror'
        },
        _221100: {
            _0124: 'Major-second Tetracluster.2',
            _0234: 'Major-second Tetracluster.1'
        },
        _212100: {
            _0134: 'Alternating Tetramirror'
        },
        _211110: {
            _0125: 'Minor Third Tetracluster.2',
            _0345: 'Minor Third Tetracluster.1'
        },
        _210111: {
            _0126: 'Major Third Tetracluster.2',
            _0456: 'Major Third Tetracluster.1'
        },
        _210021: {
            _0127: 'Perfect Fourth Tetramirror'
        },
        _201210: {
            _0145: 'Arabian Tetramirror, Chromatic Mezotetrachord'
        },
        _200121: {
            _0156: 'Double Fourth Tetramirror'
        },
        _200022: {
            _0167: 'Double Tritone Tetramirror, Messiaen\'s truncated 5, Lendvai\'s'
        },
        _122010: {
            _0235: 'Minor Tetramirror'
        },
        _121110: {
            _0135: 'Phrygian Tetrachord',
            _0245: 'Major Tetrachord, Lydian Tetrachord'
        },
        _112101: {
            _0236: 'Harmonic-minor Tetrachord',
            _0346: 'Major-third Diminished Tetrachord'
        },
        _112011: {
            _0136: 'Minor-second Diminished Tetrachord',
            _0356: 'Perfect-fourth Diminished Tetrachord'
        },
        _111120: {
            _0237: 'Major-second Minor Tetrachord',
            _0457: 'Perfect-fourth Major Tetrachord'
        },
        _111111: {
            _0146: 'All-interval Tetrachord.1',
            _0256: 'All-interval Tetrachord.2',
            _0137: 'All-interval Tetrachord.3',
            _0467: 'All-interval Tetrachord.4'
        },
        _110121: {
            _0157: 'Minor-second Quartal Tetrachord',
            _0267: 'Tritone Quartal Tetrachord'
        },
        _102210: {
            _0347: 'Major-minor Tetramirror'
        },
        _102111: {
            _0147: 'Major diminished Tetrachord',
            _0367: 'Minor-diminished Tetrachord'
        },
        _101310: {
            _0148: 'Minor augmented Tetrachord',
            _0348: 'Augmented-major Tetrachord'
        },
        _101220: {
            _0158: 'Major seventh chord, Raga Lavangi'
        },
        _030201: {
            _0246: 'Whole-tone Tetramirror'
        },
        _021120: {
            _0247: 'Major-second Major Tetrachord',
            _0357: 'Perfect-fourth Minor Tetrachord'
        },
        _021030: {
            _0257: 'Quartal Tetramirror'
        },
        _020301: {
            _0248: 'Augmented seventh chord'
        },
        _020202: {
            _0268: 'Dominant seventh flat five chord, Seven Flat Five, French-sixth chord, Messiaen\'s truncated 6'
        },
        _012120: {
            _0358: 'Minor seventh chord'
        },
        _012111: {
            _0258: 'Half-diminished seventh chord',
            _0368: 'Dominant-seventh, German-sixth chord'
        },
        _004002: {
            _0369: 'Diminished seventh chord, full diminished seventh chord, Diminished 7th (with Flat 5th)'
        },
        _432100: {
            _01234: 'Chromatic Pentamirror'
        },
        _332110: {
            _01235: 'Major-second Pentacluster.2',
            _02345: 'Major-second Pentacluster.1'
        },
        _322210: {
            _01245: 'Minor-second Major Pentachord',
            _01345: 'Spanish Pentacluster'
        },
        _322111: {
            _01236: 'Blues Pentacluster',
            _03456: 'Minor-third Pentacluster'
        },
        _321121: {
            _01237: 'Major-third Pentacluster.2',
            _04567: 'Major-third Pentacluster.1'
        },
        _311221: {
            _01256: 'Oriental Pentacluster.1',
            _01456: 'Oriental Pentacluster.2'
        },
        _310132: {
            _01267: 'DoublePentacluster.1',
            _01567: 'Double Pentacluster.2'
        },
        _232201: {
            _02346: 'Tritone-Symmetric Pentamirror'
        },
        _231211: {
            _01246: 'Tritone-Expanding Pentachord',
            _02456: 'Tritone-Contracting Pentachord'
        },
        _223111: {
            _01346: 'Alternating Pentachord.1',
            _02356: 'Alternating Pentachord.2'
        },
        _222220: {
            _02347: 'Center-cluster Pentachord.1',
            _03457: 'Center-cluster Pentachord.2'
        },
        _222121: {
            _01356: 'Locrian Pentamirror',
            _01247: 'Major-seventh Pentacluster.2',
            _03567: 'Minor-seventh Pentacluster.1'
        },
        _221311: {
            _01248: 'Augmented Pentacluster.1',
            _02348: 'Augmented Pentacluster.2'
        },
        _221131: {
            _01257: 'Double-seconds Triple-fourth Pentachord.1',
            _02567: 'Double-seconds Triple-fourth Pentachord.2'
        },
        _220222: {
            _01268: 'Assymetric Pentamirror, Bardos\'s'
        },
        _213211: {
            _01347: 'Major-minor-dim Pentachord.1',
            _03467: 'Major-minor-dim Pentachord.2'
        },
        _212320: {
            _01348: 'Minor-major ninth chord',
            _03458: 'Center-cluster Pentamirror'
        },
        _212221: {
            _01457: 'Gypsy/semiditonic Pentachord.1',
            _02367: 'Gypsy/semiditonic Pentachord.2',
            _01258: 'Diminished Pentacluster.1',
            _03678: 'Diminished Pentacluster.2'
        },
        _212122: {
            _01367: 'Javanese Pentachord',
            _01467: 'Balinese Pentachord'
        },
        _211231: {
            _02378: 'Indian-Japan Pentatonic',
            _01378: 'Balinese Pelog Pentatonic, Korean, Raga Bhupala, Raga Bibhas',
            _01578: 'Hirajoshi Pentatonic, Iwato, Sakura, Raga Saveri'
        },
        _202420: {
            _01458: 'Major-augmented ninth chord, Syrian Pentatonic, Raga Megharanji',
            _03478: 'Lebanese Pentachord, Augmented-minor chord'
        },
        _202321: {
            _01478: 'Persian Pentamirror, Raga reva/Ramkali'
        },
        _132130: {
            _02357: 'Dorian/Minor Pentachord',
            _02457: 'Major/Ionic Pentachord'
        },
        _131221: {
            _01357: 'Phrygian Pentachord',
            _02467: 'Lydian Pentachord'
        },
        _123121: {
            _02358: 'Diminished-major ninth chord',
            _03568: 'Minor-diminished ninth chord'
        },
        _122311: {
            _02458: 'Diminished-augmented ninth chord',
            _03468: 'Augmented-diminished ninth chord'
        },
        _122230: {
            _01358: 'Minor ninth chord',
            _03578: 'Major ninth chord'
        },
        /* check */
        _122212: {
            _02368: 'Augmented-sixth Pentachord.1',
            _02568: 'Augmented-sixth Pentachord.2, Indian Hindola, Javan Pentatonic'
        },
        _122131: {
            _01368: 'Kumoi Pentachord.2',
            _02578: 'Kumoi Pentachord.1'
        },
        _121321: {
            _01468: 'Enigmatic Pentachord.1',
            _02478: 'Enigmatic Pentachord.2, Altered Pentatonic'
        },
        _114112: {
            _01369: 'Diminished Minor-ninth chord',
            _02369: 'Flat-ninth Pentachord, Ranjaniraga'
        },
        _113221: {
            _01469: 'Neapolitan Pentachord.1',
            _01479: 'Neapolitan Pentachord.2'
        },
        _040402: {
            _02468: 'Whole-tone Pentamirror'
        },
        _032221: {
            _02469: 'Dominant ninth, major-minor, Prometheus Pentamirror'
        },
        _032140: {
            _02479: '"Black Key" Pentatonic, Slendro, Bilahariraga, Quartal Pentamirror, Yo'
        },
        _543210: {
            _012345: 'Chromatic Hexamirror, 1st ord. all-comb (P6, Ib, RI5)'
        },
        _443211: {
            _012346: 'comb I (b)',
            _023456: 'comb I (1)'
        },
        _433221: {
            _012356: '',
            _012347: '',
            _034567: '',
            _013456: ''
        },
        _432321: {
            _012456: 'comb RI (6)',
            _012348: 'comb RI (4)'
        },
        _422232: {
            _012367: 'comb I (b)',
            _014567: 'comb I (3)'
        },
        _421242: {
            _012567: 'Double-cluster Hexamirror',
            _012378: 'comb RI (3)'
        },
        _420243: {
            _012678: 'Messiaen\'s mode 5, 2nd ord.all-comb(P3+9,I5,Ib,R6,RI2+8)'
        },
        _343230: {
            _023457: '1st ord.all-comb (P6, I1, RI7)'
        },
        _342231: {
            _012357: 'comb I (b)',
            _024567: 'comb I (3)'
        },
        _333321: {
            _013457: '',
            _023458: '',
            _023467: '',
            _034568: ''
        },
        _333231: {
            _012457: '',
            _012358: '',
            _035678: '',
            _023567: ''
        },
        _332232: {
            _012467: '',
            _012368: '',
            _025678: '',
            _013567: ''
        },
        _324222: {
            _013467: 'Alternating Hexamirror, comb RI7)',
            _012369: 'Raga Dipak, comb RI (3)'
        },
        _323430: {
            _013458: 'comb P (6)',
            _034578: 'comb P (6)'
        },
        _323421: {
            _012458: 'comb I (b)',
            _034678: 'comb I (5)'
        },
        _322431: {
            _014568: 'comb I (3)',
            _023478: 'Megha or "Cloud" Raga, comb.I (1)'
        },
        _322332: {
            _012478: 'all-trichord hexachord',
            _014678: 'Raga Dhavalangam',
            _023678: 'Raga Syamalam',
            _012568: ''
        },
        _322242: {
            _012578: 'comb I (b)',
            _013678: 'comb I (5)'
        },
        _313431: {
            _013478: '',
            _012569: 'Schoenberg Anagram Hexachord',
            _012589: 'Bauli raga',
            _014578: 'Gypsy hexatonic',
            _014578: ''
        },
        _303630: {
            _014589: 'Augmented, Messiaen\'s truncated 3, Genus tertium, 3rd ord. all-comb (P2+6+10, I3+7+b, R4+8, RI1+5+9), "Ode-to-Napoleon" hexachord'
        },
        _242412: {
            _023468: 'comb I (1)',
            _024568: 'comb I (3)'
        },
        _241422: {
            _012468: 'Arabian Major Locrian, comb I (b)',
            _024678: 'comb I (5)'
        },
        _234222: {
            _023568: 'Super-Locrian Hexamirror, comb RI (8)',
            _023469: 'comb RI (6)'
        },
        _233331: {
            _013468: '',
            _024578: 'Melodic-minor Hexachord',
            _012469: '',
            _024569: ''
        },
        _233241: {
            _013568: 'Locrian Hexachord, Suddha Saveriraga',
            _023578: 'Minor Hexachord',
            _012479: '',
            _023479: 'Indian, Blues mode.1'
        },
        _232341: {
            _013578: 'Phrygian Hexamirror, comb RI (8)',
            _012579: 'comb RI (2)'
        },
        _225222: {
            _013469: 'comb I (b)',
            _023569: 'Pyramid Hexachord, comb I (1)'
        },
        _224322: {
            _013569: 'Double-Phrygian Hexachord, comb RI (6)',
            _013479: 'Prometheus Neapolitan mode, Indian Dipaka, comb RI (4)'
        },
        _224232: {
            _013689: 'comb RI (9)',
            _014679: 'comb RI (1)',
            _023679: 'Bridge chord'
        },
        _224223: {
            _013679: 'Minor-bitonal Hexachord, comb R (6), I (5,b)',
            _023689: 'Petrushka chord, Major-bitonal Hexachord, Messiaen\'s truncated mode 2, comb R (6), I (1,7)'
        },
        _223431: {
            _013589: 'comb I (7)',
            _014689: 'comb I (b)'
        },
        _143250: {
            _024579: 'Arezzo major Diatonic, major hexamirror, quartal hexamirror, 1st ord.all-comb P (6), I (3), RI (9)'
        },
        _143241: {
            _023579: 'Dorian Hexachord, comb I (1)',
            _024679: 'Dominant-11th, Lydian Hexachord, comb I (5)'
        },
        _142422: {
            _013579: 'Scriabin\'s Mystic chord or Prometheus Hexachord, comb I (B)',
            _024689: 'Harmonic Hexachord, Augmented-11th, Indian Sviraga, comb I (7)'
        },
        _060603: {
            _02468A: 'Wholetone scale, Messiaen\'s mode 1, Raga Gopriya, Anhemitonic Hexatonic, 6th ord.all-comb.(P+IoddT, R+RIevenT)'
        },
        _654321: {
            _0123456: 'Chromatic Heptamirror'
        },
        _554331: {
            _0123457: '',
            _0234567: ''
        },
        _544431: {
            _0123458: '',
            _0345678: ''
        },
        _544332: {
            _0123467: '',
            _0134567: ''
        },
        _543342: {
            _0123567: '',
            _0124567: ''
        },
        _533442: {
            _0123478: '',
            _0145678: ''
        },
        _532353: {
            _0123678: '',
            _0125678: ''
        },
        _454422: {
            _0234568: ''
        },
        _453432: {
            _0123468: '',
            _0245678: ''
        },
        _445332: {
            _0123469: '',
            _0234569: ''
        },
        _444441: {
            _0134568: '',
            _0234578: ''
        },
        _444342: {
            _0123479: '',
            _0123568: '',
            _0235678: ''
        },
        _443532: {
            _0124568: '',
            _0234678: ''
        },
        _443352: {
            _0123578: '',
            _0135678: ''
        },
        _442443: {
            _0124678: ''
        },
        _435432: {
            _0123569: 'Debussy\'s Heptatonic',
            _0134569: ''
        },
        _434541: {
            _0124569: '',
            _0134578: ''
        },
        _434442: {
            _0123589: '',
            _0146789: '',
            _0124578: '',
            _0134678: ''
        },
        _434343: {
            _0123679: '',
            _0123689: ''
        },
        _433452: {
            _0234789: 'Greek Chromatic, Indian',
            _0124789: 'Chromatic Phrygian inverse',
            _0125789: 'Pantuvarali Raga, Chromatic Mixolydian, Chromatic Dorian, Mela Kanakangi'
        },
        _424641: {
            _0124589: '',
            _0134589: 'Gypsy hexatonic'
        },
        _424542: {
            _0125689: 'Persian, Major Gypsy, Hungarian Minor, Double Harmonic scale, Bhairav That, Mayamdavagaula Raga (all: 1312131), Oriental'
        },
        _354351: {
            _0234579: '',
            _0245679: 'Tritone Major Heptachord'
        },
        _353442: {
            _0123579: '',
            _0246789: 'Enigmatic Heptatonic'
        },
        _345342: {
            _0234679: '',
            _0235679: ''
        },
        _344532: {
            _0134579: '',
            _0245689: ''
        },
        _344451: {
            _0124579: '',
            _0245789: 'Modified Blues mode'
        },
        _344433: {
            _0135679: '',
            _0234689: ''
        },
        _344352: {
            _0124679: '',
            _0235789: ''
        },
        _343542: {
            _0124689: 'Neapolitan-Minor mode, Mela Dhenuka',
            _0135789: ''
        },
        _336333: {
            _0134679: 'Alternating Heptachord.1, Hungarian Major mode',
            _0235689: 'Alternating Heptachord.2'
        },
        _335442: {
            _0134689: 'Spanish Gypsy, Harmonic-Minor mode, Mela Kiravani, Pilu That',
            _0135689: 'Dharmavati Scale, Harmonic minor inverse, Mela Cakravana, Raga Ahir Bhairav'
        },
        _262623: {
            _012468A: 'Neapolitan-major mode, Leading-Whole-tone mode, Combined, Kafenda\'s, Neapolitan-major mode,Leading-Whole-tone mode'
        },
        _254442: {
            _013468A: 'Harmonic, Super-Locrian, Melodic minor ascending, Aug.13th Heptamirror, Jazz Minor'
        },
        _254361: {
            _013568A: 'Greek, Medieval, Natural, Genuine, Major Diatonic Heptachord, Dominant-13th, Locrian, Phrygian, Major inverse'
        },
        _765442: {
            _01234567: 'Chromatic Octamirror'
        },
        _665542: {
            _01234568: '',
            _02345678: ''
        },
        _656542: {
            _01234569: ''
        },
        _655552: {
            _01234578: '',
            _01345678: ''
        },
        _654553: {
            _01234678: '',
            _01245678: ''
        },
        _654463: {
            _01235678: ''
        },
        _645652: {
            _01234589: ''
        },
        _644563: {
            _01234789: ''
        },
        _644464: {
            _01236789: 'Messiaen\'s mode 4'
        },
        _566452: {
            _02345679: ''
        },
        _565552: {
            _01234579: '',
            _02456789: ''
        },
        _556543: {
            _01345679: '',
            _02345689: ''
        },
        _556453: {
            _01234679: '',
            _02356789: ''
        },
        _555562: {
            _01245679: '',
            _02345789: ''
        },
        _555553: {
            _01234689: '',
            _01356789: '',
            _01235679: '',
            _02346789: ''
        },
        _554563: {
            _01235789: '',
            _01246789: 'Enigmatic Octatonic, Free-constructed'
        },
        _546652: {
            _01345689: ''
        },
        _546553: {
            _01235689: '',
            _01346789: ''
        },
        _545752: {
            _0134568A: '',
            _01245689: '',
            _01345789: 'Mela Jyotisvarupini, Raga Jotismatti'
        },
        _545662: {
            _01245789: ''
        },
        _474643: {
            _0123468A: ''
        },
        _465562: {
            _0123568A: 'Spanish Octatonic',
            _0123579A: 'Spanish Octatonic Scale (r9)'
        },
        _465472: {
            _0123578A: 'Greek Complete, Egyptian, Blues, Quartal Octachord, Diatonic Octad'
        },
        _464743: {
            _0124568A: ''
        },
        _464644: {
            _0124678A: 'Messiaen\'s 6, Messiaen mode 6'
        },
        _456562: {
            _0134578A: 'Spanish, Major-Minor, Blues',
            _0124579A: 'Spanish Phrygian (r9),  Blues mode.2'
        },
        _456553: {
            _0124578A: '',
            _0124679A: ''
        },
        _448444: {
            _0134679A: 'Alternating Octatonic, Messiaen\'s mode 2, Diminished scale'
        },
        _876663: {
            _012345678: 'Chromatic Nonamirror'
        },
        _777663: {
            _012345679: '',
            _023456789: ''
        },
        _767763: {
            _012345689: '',
            _013456789: ''
        },
        _766773: {
            _012345789: '',
            _012456789: ''
        },
        _766674: {
            _012346789: '',
            _012356789: ''
        },
        _686763: {
            _01234568A: ''
        },
        _677673: {
            _01234578A: 'Nonatonic Blues, Nonatonic Blues Scale',
            _01234579A: ''
        },
        _676764: {
            _01234678A: '',
            _01234689A: ''
        },
        _676683: {
            _01235678A: 'Major-minor Nonatonic, Ramdasi Malhar',
            _01235678A: 'Raga Ramdasi Malhar (r2)'
        },
        _668664: {
            _01234679A: ''
        },
        _667773: {
            _01235679A: 'Diminishing Nonachord?',
            _01235689A: 'Diminishing Nonachord',
            _01245679A: 'Diminishing Nonachord'
        },
        _666963: {
            _01245689A: 'Messiaen mode 3, Tsjerepnin'
        },
        _988884: {
            _0123456789: 'Chromatic Decamirror'
        },
        _898884: {
            _012345678A: ''
        },
        _889884: {
            _012345679A: ''
        },
        _888984: {
            _012345689A: ''
        },
        _888894: {
            _012345789A: 'Major-minor mixed (r7)'
        },
        _888885: {
            _012346789A: 'Messiaen mode 7'
        },
        _AAAAA5: {
            _0123456789A: 'Chromatic Undecamirror'
        },
        _CCCCC6: {
            _0123456789AB: 'Chromatic Scale, Dodecamirror'
        }
    };

    return sets;
});