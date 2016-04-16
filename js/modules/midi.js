"use strict";
define(function() {
    var midi = {    	
    	_getNoteName: function(pitch, isFlat) {
    		var noteNames = {
    			flat: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
    			sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    		};
    		var suffix = isFlat ? 'flat' : 'sharp';
    		return noteNames[suffix][pitch%12];
    	},
    	getNoteNameForPitch: function(pitch, isFlat) {
    		return this._getNoteName(pitch, isFlat) + (Math.floor(pitch/12) - 2);
    	},
    	_getIntervalVectorString: function(pitches) {

    		var intervalVector = [0, 0, 0, 0, 0, 0];    		
    		var pitchClasses = _.sortBy(this._getPitchClasses(pitches));

    		for(var i = 0, len = pitchClasses.length; i < len; i++) {
    			for(var k = i + 1; k < len; k++){
					var intervalClass = Math.abs(pitchClasses[k] - pitchClasses[i]);
					if(intervalClass > 6) {
						intervalClass = 12 - intervalClass;
					}
					intervalVector[intervalClass - 1]++;
    			}
    		}
    		return intervalVector.join('');
    	},
    	_getIntervalKey: function(pitchClasses) {





    		//var ordered = _.sortBy(pitchClasses);

			var biggestUnder12 = _.sortBy(_.filter(pitchClasses, function(pitch){ return pitch < 12})).pop();
			var diff = 12 - biggestUnder12;

			var newPitchClasses = _.sortBy(_.map(pitchClasses, function(pitch){
				return (pitch + diff)%12;
			}));

			//console.log(biggestUnder12);

    		var intervalKey = '';

    		for (var i = 1, l = newPitchClasses.length; i < l; i++) {
    			intervalKey += Math.abs(newPitchClasses[i] - newPitchClasses[i-1]);
    		}
    		return intervalKey;

    		
    		/*pitchClasses = _.sortBy(pitchClasses);

    		var intervalKey = '';

    		for (var i = 1, l = pitchClasses.length; i < l; i++) {
    			intervalKey += Math.abs(pitchClasses[i] - pitchClasses[i-1]);
    		}
    		console.log(intervalKey);
    		return intervalKey;*/


    		/*
				-> chords mit hinterlegten intervallen, z.B. [0, 3, 7, 11, 14]
				-> pitchklassen nehmen, z.B. [0, 3, 7, 11, 2]
				-> grösste unter 12 auf 12 bringen (differenz zu allen addieren)
				-> 1 4 8 0 3
				-> ordnen 0 1 3 4 8
				-> abstände berechnen 1 2 1 4
    		*/
    	},
    	/*getPitchClasses: function(notes) {
    		//console.log(_.VERSION);
    		return _.uniqBy(notes, function(note){
    			return note%12;
    		});
    	},*/
    	_getPitchClasses: function(notes) {
    		return _.uniq(_.map(notes, function(note){
    			return note%12;
    		})); 
    	},
    	chordTable: {
			_000000: {_empty: 'Null set'},
			_000000: {_0: 'Unison'},
			_100000: {_01: 'Semitone'},
			_010000: {_02: 'Whole-tone'},
			_001000: {_03: 'Minor Third'},
			_000100: {_04: 'Major Third'},
			_000010: {_05: 'Perfect Fourth'},
			_000001: {_06: 'Tritone'},
			_210000: {_012: 'BACH /Chromatic Trimirror'},
			_111000: {_013: 'Phrygian Trichord', _023: 'Minor Trichord', _023: 'Minor Trichord'},
			_101100: {_034: 'Major-minor Trichord.2'},
			_100110: {_015: 'Incomplete Major-seventh Chord.1', _045: 'Incomplete Major-seventh Chord.2'},
			_100011: {_016: 'Rite chord.2, Tritone-fourth.1', _056: 'Rite chord.1, Tritone-fourth.2'},
			_020100: {_024: 'Whole-tone Trichord'},
			_011010: {_025: 'Incomplete Minor-seventh Chord', _035: 'Incomplete Dominant-seventh Chord.2'},
			_010101: {_026: 'Incomplete Dominant-seventh Chord.1/Italian-sixth', _046: 'Incomplete Half-dim-seventh Chord'},
			_010020: {_027: 'Quartal Trichord'},
			_002001: {_036: 'Diminished Chord'},
			_001110: {_037: 'Minor Chord', _047: 'Major Chord'},
			_000300: {_048: 'Augmented Chord'},
			_321000: {_0123: 'BACH /Chromatic Tetramirror'},
			_221100: {_0124: 'Major-second Tetracluster.2', _0234: 'Major-second Tetracluster.1'},
			_212100: {_0134: 'Alternating Tetramirror'},
			_211110: {_0125: 'Minor Third Tetracluster.2', _0345: 'Minor Third Tetracluster.1'},
			_210111: {_0126: 'Major Third Tetracluster.2', _0456: 'Major Third Tetracluster.1'},
			_210021: {_0127: 'Perfect Fourth Tetramirror'},
			_201210: {_0145: 'Arabian Tetramirror'},
			_200121: {_0156: 'Double Fourth Tetramirror'},
			_200022: {_0167: 'Double Tritone Tetramirror'},
			_122010: {_0235: 'Minor Tetramirror'},
			_121110: {_0135: 'Phrygian Tetrachord', _0245: 'Major Tetrachord'},
			_112101: {_0236: 'Harmonic-minor Tetrachord', _0346: 'Major-third Diminished Tetrachord'},
			_112011: {_0136: 'Minor-second Diminished Tetrachord', _0356: 'Perfect-fourth Diminished Tetrachord'},
			_111120: {_0237: 'Major-second Minor Tetrachord', _0457: 'Perfect-fourth Major Tetrachord'},
			_111111: {_0146: 'All-interval Tetrachord.1', _0256: 'All-interval Tetrachord.2', _0137: 'All-interval Tetrachord.3', _0467: 'All-interval Tetrachord.4'},
			_110121: {_0157: 'Minor-second Quartal Tetrachord', _0267: 'Tritone Quartal Tetrachord'},
			_102210: {_0347: 'Major-minor Tetramirror'},
			_102111: {_0147: 'Major-diminished Tetrachord', _0367: 'Minor-diminished Tetrachord'},
			_101310: {_0148: 'Minor-augmented Tetrachord', _0348: 'Augmented-major Tetrachord'},
			_101220: {_0158: 'Major-seventh Chord'},
			_030201: {_0246: 'Whole-tone Tetramirror'},
			_021120: {_0247: 'Major-second Major Tetrachord', _0357: 'Perfect-fourth Minor Tetrachord'},
			_021030: {_0257: 'Quartal Tetramirror'},
			_020301: {_0248: 'Augmented Seventh Chord'},
			_020202: {_0268: 'French-sixth Chord'},
			_012120: {_0358: 'Minor-seventh Chord'},
			_012111: {_0258: 'Half-diminished Seventh Chord', _0368: 'Dominant-seventh/German-sixth Chord'},
			_004002: {_0369: 'Diminished-seventh Chord'},
			_432100: {_01234: 'Chromatic Pentamirror'},
			_332110: {_01235: 'Major-second Pentacluster.2', _02345: 'Major-second Pentacluster.1'},
			_322210: {_01245: 'Minor-second Major Pentachord', _01345: 'Spanish Pentacluster'},
			_322111: {_01236: 'Blues Pentacluster', _03456: 'Minor-third Pentacluster'},
			_321121: {_01237: 'Major-third Pentacluster.2', _04567: 'Major-third Pentacluster.1'},
			_311221: {_01256: 'Oriental Pentacluster.1, Raga Megharanji (13161)', _01456: 'Oriental Pentacluster.2'},
			_310132: {_01267: 'DoublePentacluster.1, Raga Nabhomani (11415)', _01567: 'Double Pentacluster.2'},
			_232201: {_02346: 'Tritone-Symmetric Pentamirror'},
			_231211: {_01246: 'Tritone-Expanding Pentachord', _02456: 'Tritone-Contracting Pentachord'},
			_223111: {_01346: 'Alternating Pentachord.1', _02356: 'Alternating Pentachord.2'},
			_222220: {_02347: 'Center-cluster Pentachord.1', _03457: 'Center-cluster Pentachord.2'},
			_222121: {_01356: 'Locrian Pentamirror', _01247: 'Major-seventh Pentacluster.2', _03567: 'Minor-seventh Pentacluster.1'},
			_221311: {_01248: 'Augmented Pentacluster.1', _02348: 'Augmented Pentacluster.2'},
			_221131: {_01257: 'Double-seconds Triple-fourth Pentachord.1', _02567: 'Double-seconds Triple-fourth Pentachord.2'},
			_220222: {_01268: 'Assymetric Pentamirror'},
			_213211: {_01347: 'Major-minor-dim Pentachord.1', _03467: 'Major-minor-dim Pentachord.2'},
			_212320: {_01348: 'Minor-major Ninth Chord', _03458: 'Center-cluster Pentamirror'},
			_212221: {_01457: 'Gypsy Pentachord.1', _02367: 'Gypsy Pentachord.2', _01258: 'Diminished Pentacluster.1', _03678: 'Diminished Pentacluster.2'},
			_212122: {_01367: 'Javanese Pentachord', _01467: 'Balinese Pentachord'},
			_211231: {_01378: 'Balinese Pelog Pentatonic (12414), Raga Bhupala, Raga Bibhas', _01578: 'Hirajoshi Pentatonic (21414), Iwato (14142), Sakura/Raga Saveri (14214)'},
			_202420: {_01458: 'Syrian Pentatonic/Major-augmented Ninth Chord, Raga Megharanji (13134)', _03478: 'Lebanese Pentachord/Augmented-minor Chord'},
			_202321: {_01478: 'Persian Pentamirror, Raga reva/Ramkali (13314)'},
			_132130: {_02357: 'Minor Pentachord', _02457: 'Major Pentachord'},
			_131221: {_01357: 'Phrygian Pentachord', _02467: 'Lydian Pentachord'},
			_123121: {_02358: 'Diminished-major Ninth Chord', _03568: 'Minor-diminished Ninth Chord'},
			_122311: {_02458: 'Diminished-augmented Ninth Chord', _03468: 'Augmented-diminished Ninth Chord'},
			_122230: {_01358: 'Major-Ninth Chord', _03578: 'Minor-Ninth Chord'},
			_122212: {_02368: 'Augmented-sixth Pentachord.1', _02568: 'Augmented-sixth Pentachord.2'},
			_122131: {_01368: 'Kumoi Pentachord.2', _02578: 'Kumoi Pentachord.1'},
			_121321: {_01468: 'Enigmatic Pentachord.1', _02478: 'Enigmatic Pentachord.2, Altered Pentatonic (14223)'},
			_114112: {_01369: 'Diminished Minor-Ninth Chord', _02369: 'Ranjaniraga/Flat-Ninth Pentachord'},
			_113221: {_01469: 'Neapolitan Pentachord.1', _01479: 'Neapolitan Pentachord.2'},
			_040402: {_02468: 'Whole-tone Pentamirror'},
			_032221: {_02469: 'Dominant-ninth/major-minor/Prometheus Pentamirror, Dominant Pentatonic (22332)'},
			_032140: {_02479: '"Black Key" Pentatonic/Slendro/Bilahariraga/Quartal Pentamirror, Yo (23232)'},
			_543210: {_012345: 'Chromatic Hexamirror/1st ord. all-comb (P6, Ib, RI5)'},
			_443211: {_012346: 'comb I (b)', _023456: 'comb I (1)'},
			_433221: {_012356: ''},
			_433221: {_013456: ''},
			_432321: {_012456: 'comb RI (6)', _012348: 'comb RI (4)'},
			_422232: {_012367: 'comb I (b)', _014567: 'comb I (3)'},
			_421242: {_012567: 'Double-cluster Hexamirror', _012378: 'comb RI (3)'},
			_420243: {_012678: 'Messiaen\'s mode 5 (114114), 2nd ord.all-comb(P3+9,I5,Ib,R6,RI2+8)'},
			_343230: {_023457: '1st ord.all-comb (P6, I1, RI7)'},
			_342231: {_012357: 'comb I (b)', _024567: 'comb I (3)'},
			_333321: {_013457: ''},
			_333321: {_023467: ''},
			_333231: {_012457: ''},
			_333231: {_023567: ''},
			_332232: {_012467: ''},
			_332232: {_013567: ''},
			_324222: {_013467: 'Alternating Hexamirror/comb RI7)', _012369: 'comb RI (3)'},
			_323430: {_013458: 'comb P (6)'},
			_323430: {_034578: 'comb P (6)'},
			_323421: {_012458: 'comb I (b)', _034678: 'comb I (5)'},
			_322431: {_014568: 'comb I (3)', _023478: 'Megha or "Cloud" Raga/comb.I (1)'},
			_322332: {_012478: 'all-trichord hexachord'},
			_322332: {_014678: ''},
			_322242: {_012578: 'comb I (b)', _013678: 'comb I (5)'},
			_313431: {_013478: ''},
			_313431: {_014578: ''},
			_303630: {_014589: 'Augmented scale, Genus tertium, 3rd ord. all-comb (P2+6+10, I3+7+b, R4+8, RI1+5+9), "Ode-to-Napoleon" hexachord'},
			_242412: {_023468: 'comb I (1)', _024568: 'comb I (3)'},
			_241422: {_012468: 'comb I (b)', _024678: 'comb I (5)'},
			_234222: {_023568: 'Super-Locrian Hexamirror/comb RI (8)', _023469: 'comb RI (6)'},
			_233331: {_013468: '', _024578: 'Melodic-minor Hexachord'},
			_233241: {_013568: 'Locrian Hexachord/Suddha Saveriraga', _023578: 'Minor Hexachord', _012479: '', _023479: 'Blues mode.1 (321132)'},
			_232341: {_013578: 'Phrygian Hexamirror/comb RI (8)', _012579: 'comb RI (2)'},
			_225222: {_013469: 'comb I (b)', _023569: 'Pyramid Hexachord/comb I (1)'},
			_224322: {_013569: 'Double-Phrygian Hexachord/comb RI (6)', _013479: 'Prometheus Neapolitan mode (132312), comb RI (4)'},
			_224232: {_013689: 'comb RI (9)', _014679: 'comb RI (1)', _023679: 'Bridge chord'},
			_224223: {_013679: 'Minor-bitonal Hexachord/comb R (6), I (5,b), Messiaen\'s truncated mode 2', _023689: 'Petrushka chord, Major-bitonal Hexachord, comb R (6), I (1,7)'},
			_223431: {_013589: 'comb I (7)', _014689: 'comb I (b)'},
			_143250: {_024579: 'Arezzo major Diatonic (221223), major hexamirror, quartal hexamirror, 1st ord.all-comb P (6), I (3), RI (9)'},
			_143241: {_023579: 'Dorian Hexachord/comb I (1)', _024679: 'Dominant-11th/Lydian Hexachord/comb I (5)'},
			_142422: {_013579: 'Scriabin\'s Mystic Chord or Prometheus Hexachord/comb I (B)', _024689: 'Harmonic Hexachord/Augmented-11th/comb I (7)'},
			_060603: {_02468A: 'Wholetone scale/6th ord.all-comb.(P+IoddT, R+RIevenT)'},
			_433221: {_012347: ''},
			_433221: {_034567: ''},
			_333321: {_023458: ''},
			_333321: {_034568: ''},
			_333231: {_012358: ''},
			_333231: {_035678: ''},
			_332232: {_012368: ''},
			_332232: {_025678: ''},
			_322332: {_012568: ''},
			_322332: {_023678: ''},
			_313431: {_012569: 'Schoenberg Anagram Hexachord', _012589: 'Bauli raga (133131)'},
			_233331: {_012469: ''},
			_233331: {_024569: ''},
			_232341: {_012579: 'comb RI (2)'},
			_654321: {_0123456: 'Chromatic Heptamirror'},
			_554331: {_0123457: ''},
			_554331: {_0234567: ''},
			_544431: {_0123458: ''},
			_544431: {_0345678: ''},
			_544332: {_0123467: ''},
			_544332: {_0134567: ''},
			_543342: {_0123567: ''},
			_543342: {_0124567: ''},
			_533442: {_0123478: ''},
			_533442: {_0145678: ''},
			_532353: {_0123678: ''},
			_532353: {_0125678: ''},
			_454422: {_0234568: ''},
			_453432: {_0123468: ''},
			_453432: {_0245678: ''},
			_445332: {_0123469: ''},
			_445332: {_0234569: ''},
			_444441: {_0134568: ''},
			_444441: {_0234578: ''},
			_444342: {_0123479: ''},
			_443532: {_0124568: ''},
			_443532: {_0234678: ''},
			_443352: {_0123578: ''},
			_443352: {_0135678: ''},
			_442443: {_0124678: ''},
			_435432: {_0123569: ''},
			_435432: {_0134569: ''},
			_434541: {_0124569: ''},
			_434442: {_0123589: ''},
			_434442: {_0146789: ''},
			_434343: {_0123679: ''},
			_434343: {_0123689: ''},
			_433452: {_0124789: 'Chromatic Phrygian inverse (1123113)', _0125789: 'Pantuvarali Raga (1321131), Chromatic Mixolydian (1131132), Chromatic Dorian/Mela Kanakangi (1132113)'},
			_424641: {_0124589: '', _0134589: 'Gypsy hexatonic (1312113)'},
			_424542: {_0125689: 'Persian, Major Gypsy, Hungarian Minor, Double Harmonic scale, Bhairav That, Mayamdavagaula Raga (all: 1312131), Oriental (1311312)'},
			_354351: {_0234579: '', _0245679: 'Tritone Major Heptachord'},
			_353442: {_0123579: '', _0246789: 'Enigmatic Heptatonic (1322211)'},
			_345342: {_0234679: ''},
			_345342: {_0235679: ''},
			_344532: {_0134579: ''},
			_344532: {_0245689: ''},
			_344451: {_0124579: '', _0245789: 'Modified Blues mode (2121132)'},
			_344433: {_0135679: ''},
			_344433: {_0234689: ''},
			_344352: {_0124679: ''},
			_344352: {_0235789: ''},
			_343542: {_0124689: 'Neapolitan-Minor mode (1222131), Mela Dhenuka', _0135789: ''},
			_336333: {_0134679: 'Alternating Heptachord.1/Hungarian Major mode (3121212)', _0235689: 'Alternating Heptachord.2'},
			_335442: {_0134689: 'Harmonic-Minor mode (2122131), Spanish Gypsy, Mela Kiravani, Pilu That', _0135689: 'Dharmavati Scale (2131221), Harmonic minor inverse (1312212), Mela Cakravana, Raga Ahir Bhairav'},
			_262623: {_012468A: 'Neapolitan-major mode (1222221)/Leading-Whole-tone mode (222211)'},
			_254442: {_013468A: 'Harmonic/Super-Locrian, Melodic minor ascending (1212222)/Aug.13th Heptamirror, Jazz Minor'},
			_254361: {_013568A: 'Major Diatonic Heptachord/Dominant-13th, Locrian (1221222), Phrygian (1222122), Major inverse'},
			_444342: {_0123568: ''},
			_444342: {_0235678: ''},
			_434541: {_0134578: ''},
			_434442: {_0124578: ''},
			_434442: {_0134678: ''},
			_765442: {_01234567: 'Chromatic Octamirror'},
			_665542: {_01234568: ''},
			_665542: {_02345678: ''},
			_656542: {_01234569: ''},
			_655552: {_01234578: ''},
			_655552: {_01345678: ''},
			_654553: {_01234678: ''},
			_654553: {_01245678: ''},
			_654463: {_01235678: ''},
			_645652: {_01234589: ''},
			_644563: {_01234789: ''},
			_644464: {_01236789: ['Messiaen\'s mode 4 (11131113)', 'Messiaen\'s mode 4 inverse']},
			_566452: {_02345679: ''},
			_565552: {_01234579: ''},
			_565552: {_02456789: ''},
			_556543: {_01345679: ''},
			_556543: {_02345689: ''},
			_556453: {_01234679: ''},
			_556453: {_02356789: ''},
			_555562: {_01245679: ''},
			_555562: {_02345789: ''},
			_555553: {_01234689: ''},
			_555553: {_01356789: ''},
			_554563: {_01235789: ''},
			_554563: {_01246789: ''},
			_546652: {_01345689: ''},
			_546553: {_01235689: ''},
			_546553: {_01346789: ''},
			_545752: {_01245689: ''},
			_545752: {_01345789: ['', 'Mela Jyotisvarupini, Raga Jotismatti', 'Raga Saurastra']},
			_545662: {_01245789: ''},
			_474643: {_0123468A: ''},
			_465562: {_0123568A: '', _0123579A: 'Spanish Octatonic Scale (r9) (12111222)'},
			_465472: {_0123578A: 'Quartal Octachord, Diatonic Octad'},
			_464743: {_0124568A: ''},
			_464644: {_0124678A: 'Messiaen mode 6 (11221122)'},
			_456562: {_0124579A: 'Spanish Phrygian (r9) (12112122)/ Blues mode.2 (21211212)'},
			_456553: {_0124578A: ''},
			_456553: {_0124679A: ''},
			_448444: {_0134679A: 'Alternating Octatonic or Diminished scale (12121212)'},
			_555553: {_01235679: ''},
			_555553: {_02346789: ''},
			_876663: {_012345678: 'Chromatic Nonamirror'},
			_777663: {_012345679: ''},
			_777663: {_023456789: ''},
			_767763: {_012345689: ''},
			_767763: {_013456789: ''},
			_766773: {_012345789: ''},
			_766773: {_012456789: ''},
			_766674: {_012346789: ''},
			_766674: {_012356789: ''},
			_686763: {_01234568A: ''},
			_677673: {_01234578A: 'Nonatonic Blues Scale (211111212)'},
			_677673: {_01234579A: ''},
			_676764: {_01234678A: ''},
			_676764: {_01234689A: ''},
			_676683: {_01235678A: 'Raga Ramdasi Malhar (r2) (211122111)'},
			_668664: {_01234679A: ''},
			_667773: {_01235679A: '', _01235689A: 'Diminishing Nonachord'},
			_666963: {_01245689A: 'Tsjerepnin/Messiaen mode 3 (112112112)'},
			_988884: {_0123456789: 'Chromatic Decamirror'},
			_898884: {_012345678A: ''},
			_889884: {_012345679A: ''},
			_888984: {_012345689A: ''},
			_888894: {_012345789A: 'Major-minor mixed (r7)'},
			_888885: {_012346789A: 'Messiaen mode 7 (1111211112)'},
			_AAAAA5: {_0123456789A: 'Chromatic Undecamirror'},
			_CCCCC6: {_0123456789AB: 'Chromatic Scale/Dodecamirror (111111111111)'}
		},
		scaleTable: 
		[
		 [
		     ["Major", "Ionian"],
		     [0, 2, 4, 5, 7, 9, 11]
		 ], [
		     ["natural minor", "Aeolian"],
		     [0, 2, 3, 5, 7, 8, 10]
		 ], [
		     ["harmonic minor", "Mohammedan"],
		     [0, 2, 3, 5, 7, 8, 11]
		 ], [
		     ["melodic minor"],
		     [0, 2, 3, 5, 7, 9, 11]
		 ], [
		     ["major pentatonic"],
		     [0, 2, 4, 7, 9]
		 ], [
		     ["minor pentatonic"],
		     [0, 3, 5, 7, 10]
		 ], [
		     ["blues"],
		     [0, 3, 5, 6, 7, 10]
		 ], [
		     ["minor blues"],
		     [0, 2, 3, 5, 6, 7, 8, 10]
		 ], [
		     ["major blues"],
		     [0, 2, 3, 4, 5, 6, 7, 9, 10]
		 ], [
		     ["augmented", "whole tone"],
		     [0, 2, 4, 6, 8, 10]
		 ], [
		     ["diminished"],
		     [0, 2, 3, 5, 6, 8, 9, 11]
		 ], [
		     ["Phrygian-Dominant", "major Phrygian", "Spanish-flamenco"],
		     [0, 1, 4, 5, 7, 8, 10]
		 ], [
		     ["Dorian"],
		     [0, 2, 3, 5, 7, 9, 10]
		 ], [
		     ["Phrygian"],
		     [0, 1, 3, 5, 7, 8, 10]
		 ], [
		     ["Lydian"],
		     [0, 2, 4, 6, 7, 9, 11]
		 ], [
		     ["Mixolydian"],
		     [0, 2, 4, 5, 7, 9, 10]
		 ], [
		     ["Locrian"],
		     [0, 1, 3, 5, 6, 8, 10]
		 ], [
		     ["jazz melodic minor"],
		     [0, 2, 3, 5, 7, 9, 11]
		 ], [
		     ["Dorian b2"],
		     [0, 1, 3, 5, 7, 9, 10]
		 ], [
		     ["Lydian augmented"],
		     [0, 2, 4, 6, 8, 9, 11]
		 ], [
		     ["Lydian b7", "overture"],
		     [0, 2, 4, 6, 7, 9, 10]
		 ], [
		     ["Mixolydian b13", "Hindu"],
		     [0, 2, 4, 5, 7, 8, 10]
		 ], [
		     ["Locrian #2"],
		     [0, 2, 3, 5, 6, 8, 10]
		 ], [
		     ["super Locrian", "altered"],
		     [0, 1, 3, 4, 6, 8, 10]
		 ], [
		     ["whole half diminished"],
		     [0, 2, 3, 5, 6, 8, 9, 11]
		 ], [
		     ["half whole diminished"],
		     [0, 1, 3, 4, 6, 7, 9, 10]
		 ], [
		     ["enigmatic"],
		     [0, 1, 4, 6, 8, 10, 11]
		 ], [
		     ["double harmonic", "gypsy", "Byzantine"],
		     [0, 1, 4, 5, 7, 8, 11]
		 ], [
		     ["Hungarian minor"],
		     [0, 2, 3, 6, 7, 8, 11]
		 ], [
		     ["Persian"],
		     [0, 1, 4, 5, 6, 8, 11]
		 ], [
		     ["Arabian", "major Locrian"],
		     [0, 2, 4, 5, 6, 8, 10]
		 ], [
		     ["Japanese"],
		     [0, 1, 5, 7, 8]
		 ], [
		     ["Egyptian"],
		     [0, 2, 5, 7, 10]
		 ], [
		     ["Hirajoshi"],
		     [0, 2, 3, 7, 8]
		 	]
		 ],

/*
next steps:

- methode für berechnung von prime
- wird verwendet um für die gespielten noten die prime zu berechnen
- der akkord wird immer noch über den vektor gefunden
- die prime wird aber verwendet um die untervariante zu finden
- wenn die untervariante gefunden ist, rotation (inverse berechnen)
- bestimmte inversen haben besondere namen
	- ist kein Name angegeben, einfach "x. inverse" angeben
- tabelle vervollständigen/prüfen
	- form: 
		- objekt, keys level 1 sind interval-vektoren
		- bei interval-vektor code sind objekte hinterlegt, welche mit der primeform(forte) als key angesprochen werden
		- innerhalb einer bestimmten Primeform gibt es wieder ein objekt für die besondere benennung von inversen, die keys sind nummern

- sus, omit prüfen
- versuchen root über anzahl rotationen herauszufinden

- festlegen von key und scale
- einbauen von funktionstheorie (anzeige funktion)

- harmonizität anzeige
	- funktion getConsonance([0,3,7]): 100%
		- durchschnitt aller intervalle (bewertung) 03 37 07 / 3



- prüfen, was es mit verwandten sets auf sich hat

- vorschläge für tension, übergang, aufläsung
	- anzeige? button zum vorhören?

- chord explorer
	- scale und key wählen
	- pitchrange oben und unten begrenzen
	- inverse wählen (1. inverse = tiefster Ton +1 oktave)
	- save/export favs



Separates Device:
	- Key und Scale werden erst festgelegt
	- funktion pitchInScale(key, scale) z.B. (0, [0, 1, 5, 7, 8]) (C in Japanese)
	- wird benötigt für die anzeige des keyboards (rot nicht in scale, blau in scale)





*/


// http://vladimir_ladma.sweb.cz/english/music/structs/mus_rot.htm
// http://solomonsmusic.net/pcsets.htm#Explanation%20of%20This%20Table
// view-source:http://composertools.com/Tools/PCSets/setfinder.html
// https://en.wikipedia.org/wiki/Set_theory_(music)

/*
function ComputePartialPrime(pc, pcout)
{
  var best = 0;    // The best rotation found so far
  var adj = 0;     // Adjustment applied based on the algorithm type (Temp var)

  // Find the best rotation

  for(i = 1 ; i < card ; i++) {
    // Test to see if the size of the set is smaller than we've found so far
    if( (pc[i+card-1] - pc[i]) < (pc[best+card-1] - pc[best]) ) {
      best = i;
      continue;
    }

    // Test to see if the sizes are the same, if so, we go into tie-breaker mode
    if( (pc[i+card-1] - pc[i]) == (pc[best+card-1] - pc[best]) ) {
      for(j = 1 ; j < (card-1) ; j++ ) {
        if(isForte)  adj = j;
        else         adj = card-j-1;

        // is the new interval better?
        if( (pc[i+adj] - pc[i]) < (pc[best+adj] - pc[best]) )  {
          best = i;  // then it becomes the best and we're done
          break;
        }
        // is the new interval worse?
        else if( (pc[i+adj] - pc[i]) > (pc[best+adj] - pc[best]) )
          break;  // then the old best is still best and we're done

        // otherwise, we are still tied, so keep looking
      }
    }
  }

  // Found the best rotation, so now copy it into pcout and transpose down
  for(i = 0 ; i < card ; i++)
    pcout[i] = pc[best+i] - pc[best];
}


function ComparePartialPrimes()
{
  var bestPrime = 0;  // Assume pcOrigPrime is best until we know otherwise

  for(i = 0 ; i < card ; i++) {
    if(isForte)  adj = i;

    // is the new interval better?
    if( (pcInvPPrime[i] - pcInvPPrime[0]) < (pcOrigPPrime[i] - pcOrigPPrime[0]) )  {
      bestPrime = 1;  // then inverted form becomes the best and we're done
      break;
    }
    // is the new interval worse?
    else if( (pcInvPPrime[i] - pcInvPPrime[0]) > (pcOrigPPrime[i] - pcOrigPPrime[0]) )
      break;  // then the original is definitiely best and we're done

    // otherwise, we are still tied, so keep looking
  }

  if(bestPrime == 0) {
    for(i = 0 ; i < card ; i++)  pcPrime[i] = pcOrigPPrime[i];
  }
  else {
    for(i = 0 ; i < card ; i++)  pcPrime[i] = pcInvPPrime[i];
  }
}*/


		_getDistanceOfRotation: function(orderedPitchClasses, rotationIndex, indexToCompareWith, cardinality){

			var firstPitchOfRotation = orderedPitchClasses[rotationIndex];
			var pitchToSubstractFrom = orderedPitchClasses[(indexToCompareWith + cardinality - 1) % cardinality];

			return (pitchToSubstractFrom + 12 - firstPitchOfRotation) % 12;
		},

		getPrimeForm: function(notes) {

			var normalForm = this._getNormalForm(notes);
			var normalFormTransposed = this._getPitcheClassesStartingAtZero(normalForm);
			var orderedAndinverted = _.sortBy(this._getInvertedSet(normalFormTransposed));
			var normalFormOfInverted = this._getNormalForm(orderedAndinverted);
			var normalFormOfInvertedTransposed = this._getPitcheClassesStartingAtZero(this._getNormalForm(normalFormOfInverted));

			return this._getSetWithSmallerPitchesToTheLeft(normalFormTransposed, normalFormOfInvertedTransposed);
		},

		_getSetWithSmallerPitchesToTheLeft: function(setOne, setTwo){

			var i = 0;
			var cardinality = setOne.length;

			while (i < cardinality) {
				if (setOne[i] < setTwo[i]) {
					return setOne;
				}

				if (setOne[i] > setTwo[i]) {
					return setTwo;
				}
			}
			return setOne;
		},

		_getNormalForm: function(notes){

			var orderedPC = _.sortBy(this._getPitchClasses(notes));
			var bestRotationIndex = 0;
			var cardinality = orderedPC.length;

			for (var i = 1; i < cardinality; i++) {

				var lastIndexOfBestRotation  = (bestRotationIndex + cardinality - 1) % cardinality;
				var lastIndexOfCurrentRotation  = (i + cardinality - 1) % cardinality;

				var smallestDistanceFirstToLastSoFar = this._getDistanceOfRotation(
					orderedPC, 
					bestRotationIndex, 
					lastIndexOfBestRotation,
					cardinality
				);

				var distanceFirstToLastCurrentRotation = this._getDistanceOfRotation(
					orderedPC, 
					i, 
					lastIndexOfCurrentRotation,
					cardinality
				);

				if (distanceFirstToLastCurrentRotation < smallestDistanceFirstToLastSoFar) {
					bestRotationIndex = i;
					continue;
				}

				if (distanceFirstToLastCurrentRotation === smallestDistanceFirstToLastSoFar) {

					for (var k = 1; k < (cardinality - 1) ; k++ ) {

						var distanceFirstToKthBestRotation = this._getDistanceOfRotation(
							orderedPC, 
							bestRotationIndex, 
							k,
							cardinality
						);

						var distanceFirstToKthCurrentRotation = this._getDistanceOfRotation(
							orderedPC, 
							i, 
							k,
							cardinality
						);

						if (distanceFirstToKthCurrentRotation < distanceFirstToKthBestRotation) {
							bestRotationIndex = i;
							break;
						}

						if (distanceFirstToKthCurrentRotation > distanceFirstToKthBestRotation) {
							break;
						}
				     }				
				}
			}

			return orderedPC.slice(bestRotationIndex, cardinality).concat(orderedPC.slice(0, bestRotationIndex));
			//return this._getPitcheClassesStartingAtZero(bestRotationPitchClasses);
		},

		_getPitcheClassesStartingAtZero: function (pitches) {
			var semitonesToTransposeDown = pitches[0];
			return _.map(pitches, function(pitch){
				return (pitch - semitonesToTransposeDown + 12) % 12;
			});
		},

		_getInvertedSet: function (pitches) {
			return _.map(pitches, function(pitch){
				return (12 - pitch) % 12;
			});
		},

    	getChordName: function(notes) {

    		/*var pitchClasses = _.sortBy(this._getPitchClasses(notes));
    		var intervalKey = this._getIntervalKey(pitchClasses);
	
    		if (_.has(this.chordTable, intervalKey)) {
    			return this.chordTable[intervalKey];
    		}*/

    		var intervalVector = '_' + this._getIntervalVectorString(notes);
    		if (_.has(this.chordTable, intervalVector)) {
    			// @todo: inversions, testen, getroot verfeinern, sets vergleichen, namen ergänzen, omit/sus hinzufügen
    			// scale erkennung, akkord-funktion (tonic, dominant etc.)
    			// vorschläge
    			// im display jeweils die skalen anzeigen (aufleuchten), in welchen der akkord vorkommt und welche funktion er darin hat (V, vii etc.)
    			// grenzfälle abdecken AAAAA5 etc.
    			// evtl. intervalVektor zur Bewertung oder root-findung heranziehen
    			// chord found, now try to be more precise (major/minor, inversions etc.)

    			console.log(this.chordTable[intervalVector]);

    			var pitchClasses = _.sortBy(this._getPitchClasses(notes));
    			console.log(pitchClasses);

    			var lowestValue = pitchClasses[0];
    			pitchClasses = _.map(pitchClasses, function(pitch){
    				return pitch - lowestValue;
    			});
    			console.log(pitchClasses);

    			var pitchesKey = '_' + pitchClasses.join('');

    			if (_.has(this.chordTable[intervalVector], pitchesKey)) {
    				console.log(this.chordTable[intervalVector][pitchesKey]);
    				return this.chordTable[intervalVector][pitchesKey]
    			} else {
    				// return first
    				for(var key in this.chordTable[intervalVector]) break;
    				return this.chordTable[intervalVector][key];
    			}


    			//return this.chordTable[intervalVector][0];
    		}
    		return '?';

    		/*
				my approach

				-> chords mit hinterlegten intervallen, z.B. [0, 3, 7, 11, 14]
				-> pitchklassen nehmen, z.B. [0, 3, 7, 11, 2]
				-> kleinste unter 12 auf 12 bringen (differenz zu allen addieren)
				-> 1 4 8 0 3
				-> ordnen 0 1 3 4 8
				-> abstände berechnen 1 2 1 4

				-> gespielte pitches nehmen, z.B. [1, 4, 8, 12, 15]				
				-> pitchklassen nehmen, z.B. [1, 4, 8, 0, 3]
				-> der reihe nach ordnen 0 1 3 4 8

				-> abstände berechnen, z.B. [1 2 1 4]



    		*/





    		/**

    		TODO NEXT

				- mit regexes table.txt aufbereiten, sodass
				\d+\s:\s(.*)?\n\s+\d\/\d+\s+(.*)\(
				\d{6}\s:\s(.*)\n\s



				gut: aufräum: \(.*\s*,[#\w]+\s*:	
					- interval-combo (z.B. 1 1 1 2 1) auf chord-namen mappt

					- falls kein Akkord-Name vorhandne leeren String zurückgeben

				- in getChordName (Algorithmus)			
					- noten als input [0, 3, 7, 11, 14]
					- wir wollen nur einstellige, deshalb alles was über 9 verändern
					- niedrigste zahl über 9 so viel addieren, dass 12 ergibt und dann %12 (pitchklasse)
					- bei allen diese niedrigste zahl addieren, z.B. +1 = 1 4 8 0 3
					- nach grösse ordnen (fuer finden) -> z.B. 01348
					- intervalle nehmen, z.B. 1->1 = 1, 1->3 = 2 etc., ergibt interval-combo 1214
					- interval-combo in tabelle finden und auf namen mappen
					- evtl. weiterer algorithmus für welche inversion verwendet wurde
						- dazu original pitch-set verwenden (vor pitch class transformation)
						- idee: 1 dial für range oben, 1 dial für range unten
					- fertig :-)
					- optimierung: tree für selektion
						4
						 3: minor trichord
						 4: augmented trichord
    		*/
    	},
    	getRoot: function(notes) {

			var weightingPoints = [
				0,  	// same note 	(0)
				0,  	// minor 2nd 	(1)
				0,  	// 2nd		 	(2)
				1,  	// minor 3rd	(3)
				1, 	// major 3rd	(4)
				0,  	// perfect 4th	(5)
				0, 	// augm 4th		(6)
				1, 	// perfect 5th	(7)
				1,  	// minor 6th	(8)
				1,  	// major 6th	(9)
				1, 	// minor 7th	(10)
				1, 	// major 7th	(11)
			];



			var lowestPitch = _.sortBy(notes)[0] % 12;

			var pitches = _.sortBy(this._getPitchClasses(notes));
			//var pitches = _.sortBy(notes);
			var ratings = [];
			var countOfScoreMap = {};
			var highestScore = 0;

			_.each(pitches, function(pitchValue){

				var score = 0;
				_.each(pitches, function(comparedPitchValue){
					var interval = Math.abs(pitchValue - comparedPitchValue);
					score += weightingPoints[interval];
					//console.log(pitchValue, comparedPitchValue, interval, weightingPoints[interval], score);

				});

				ratings.push({ 
					pitch: pitchValue, 
					score: score
				});

				if (countOfScoreMap[score]) {
					countOfScoreMap[score]++;
				} else {
					countOfScoreMap[score] = 1;
				}

				if (score > highestScore) {
					highestScore = score;
				}				
			});

			//console.log(pitches);
			//console.log(ratings);

			// unique winner
			if (countOfScoreMap[highestScore] === 1) {
				var winnerPitch = _.find(ratings, ['score', highestScore]);
				console.log(winnerPitch);
				console.log('unique winner');
				return this._getNoteName(winnerPitch.pitch);
			}

			// all pitches have the same (highest) count, return lowest note
			if (countOfScoreMap[highestScore] === pitches.length) {
				console.log('all same, return lowest');
				return this._getNoteName(pitches[0]);
			}

			// unclear, return the lowest pitch of all the winners				
			//console.log('unclear, return the lowest pitch of all the winners');

			var winners = _.filter(ratings, ['score', highestScore]);



			var lowestPitchAmongWinners = _.sortBy(winners, 'pitch')[0];

			//console.log(_.sortBy(winners, 'pitch')[0]);

			return this._getNoteName(lowestPitchAmongWinners.pitch);
    	}
    };
    return midi;
});