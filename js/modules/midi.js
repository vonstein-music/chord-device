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
    	_getIntervalVector: function(pitches) {

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
    		return intervalVector;
    	},
    	_getSickodecimal: function(intervalVector){

    		var hexadecimal = '';
    		var hexaLookup = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    		_.each(intervalVector, function(intervalCount){
    			hexadecimal += hexaLookup[intervalCount];
    		});
    		return hexadecimal;
    	},
    	_getPitchClasses: function(notes) {
    		return _.uniq(_.map(notes, function(note){
    			return note%12;
    		})); 
    	},
    	chordTable: {
			_000000: {_0: 'Unison'},
			_100000: {_01: 'Semitone'},
			_010000: {_02: 'Whole-tone'},
			_001000: {_03: 'Minor Third'},
			_000100: {_04: 'Major Third'},
			_000010: {_05: 'Perfect Fourth'},
			_000001: {_06: 'Tritone'},
			_210000: {_012: 'BACH /Chromatic Trimirror'},
			_111000: {_013: 'Phrygian Trichord', _023: 'Minor Trichord'},
			_101100: {_014: 'Major-minor Trichord.1', _034: 'Major-minor Trichord.2'},
			_100110: {_015: 'Incomplete Major-seventh chord.1', _045: 'Incomplete Major-seventh chord.2'},
			_100011: {_016: 'Rite chord.2, Tritone-fourth.1', _056: 'Rite chord.1, Tritone-fourth.2'},
			_020100: {_024: 'Whole-tone Trichord'},
			_011010: {_025: 'Incomplete minor seventh chord', _035: 'Incomplete Dominant-seventh chord.2'},
			_010101: {_026: 'Italian-sixth, Incomplete Dominant-seventh chord.1', _046: 'Incomplete Half-dim-seventh chord'},
			_010020: {_027: 'Quartal Trichord'},
			_002001: {_036: 'Diminished Triad'},
			_001110: {_037: 'Minor Triad', _047: 'Major Triad'},
			_000300: {_048: 'Augmented Triad'},
			_321000: {_0123: 'BACH /Chromatic Tetramirror'},
			_221100: {_0124: 'Major-second Tetracluster.2', _0234: 'Major-second Tetracluster.1'},
			_212100: {_0134: 'Alternating Tetramirror'},
			_211110: {_0125: 'Minor Third Tetracluster.2', _0345: 'Minor Third Tetracluster.1'},
			_210111: {_0126: 'Major Third Tetracluster.2', _0456: 'Major Third Tetracluster.1'},
			_210021: {_0127: 'Perfect Fourth Tetramirror'},
			_201210: {_0145: 'Arabian Tetramirror, Chromatic Mezotetrachord'},
			_200121: {_0156: 'Double Fourth Tetramirror'},
			_200022: {_0167: 'Double Tritone Tetramirror, Messiaen\'s truncated 5, Lendvai\'s'},
			_122010: {_0235: 'Minor Tetramirror'},
			_121110: {_0135: 'Phrygian Tetrachord', _0245: 'Major Tetrachord, Lydian Tetrachord'},
			_112101: {_0236: 'Harmonic-minor Tetrachord', _0346: 'Major-third Diminished Tetrachord'},
			_112011: {_0136: 'Minor-second Diminished Tetrachord', _0356: 'Perfect-fourth Diminished Tetrachord'},
			_111120: {_0237: /* Minor added ninth chord */'Minor added ninth chord, Major-second Minor Tetrachord', _0457: 'Perfect-fourth Major Tetrachord'},
			_111111: {_0146: 'All-interval Tetrachord.1', _0256: 'All-interval Tetrachord.2', _0137: 'All-interval Tetrachord.3', _0467: 'All-interval Tetrachord.4'},
			_110121: {_0157: /* Major seventh flat five chord */'Major seventh flat five chord, Minor-second Quartal Tetrachord', _0267: 'Tritone Quartal Tetrachord'},
			_102210: {_0347: 'Major-minor Tetramirror'},
			_102111: {_0147: 'Diminished major seventh chord OR Major diminished Tetrachord', _0367: 'Minor-diminished Tetrachord'},
			_101310: {_0148: 'Minor major seventh chord OR Major Seventh Augmented Fifth OR augmented major seventh chord, Minor augmented Tetrachord', _0348: 'Augmented-major Tetrachord'},
			_101220: {_0158: 'Major seventh chord, Raga Lavangi'},
			_030201: {_0246: 'Whole-tone Tetramirror'},
			_021120: {_0247: /* Added ninth chord*/'Added ninth chord, Major-second Major Tetrachord', _0357: 'Perfect-fourth Minor Tetrachord'},
			_021030: {_0257: 'Quartal Tetramirror'},
			_020301: {_0248: 'Augmented seventh chord'},
			_020202: {_0268: 'Dominant seventh flat five chord, Seven Flat Five, French-sixth chord, Messiaen\'s truncated 6'},
			_012120: {_0358: 'Minor seventh chord'},
			_012111: {_0258: 'Dominant seventh chord OR Half-diminished seventh chord', _0368: 'Dominant-seventh, German-sixth chord'},
			_004002: {_0369: 'Diminished seventh chord, full diminished seventh chord, Diminished 7th (with Flat 5th)'},
			_432100: {_01234: 'Chromatic Pentamirror'},
			_332110: {_01235: 'Major-second Pentacluster.2', _02345: 'Major-second Pentacluster.1'},
			_322210: {_01245: 'Minor-second Major Pentachord', _01345: 'Spanish Pentacluster'},
			_322111: {_01236: 'Blues Pentacluster', _03456: 'Minor-third Pentacluster'},
			_321121: {_01237: 'Major-third Pentacluster.2', _04567: 'Major-third Pentacluster.1'},
			_311221: {_01256: 'Oriental Pentacluster.1', _01456: 'Oriental Pentacluster.2'},
			_310132: {_01267: 'DoublePentacluster.1', _01567: 'Double Pentacluster.2'},
			_232201: {_02346: 'Tritone-Symmetric Pentamirror'},
			_231211: {_01246: 'Tritone-Expanding Pentachord', _02456: 'Tritone-Contracting Pentachord'},
			_223111: {_01346: 'Alternating Pentachord.1', _02356: 'Alternating Pentachord.2'},
			_222220: {_02347: 'Center-cluster Pentachord.1', _03457: 'Center-cluster Pentachord.2'},
			_222121: {_01356: 'Locrian Pentamirror', _01247: 'Major-seventh Pentacluster.2', _03567: 'Minor-seventh Pentacluster.1'},
			_221311: {_01248: 'Augmented Pentacluster.1', _02348: 'Augmented Pentacluster.2'},
			_221131: {_01257: 'Double-seconds Triple-fourth Pentachord.1', _02567: 'Double-seconds Triple-fourth Pentachord.2'},
			_220222: {_01268: 'Assymetric Pentamirror, Bardos\'s'},
			_213211: {_01347: 'Major-minor-dim Pentachord.1', _03467: 'Major-minor-dim Pentachord.2'},
			_212320: {_01348: 'Minor-major ninth chord', _03458: 'Center-cluster Pentamirror'},
			_212221: {_01457: 'Gypsy/semiditonic Pentachord.1', _02367: 'Gypsy/semiditonic Pentachord.2', _01258: 'Diminished Pentacluster.1', _03678: 'Diminished Pentacluster.2'},
			_212122: {_01367: 'Javanese Pentachord', _01467: 'Balinese Pentachord'},
			_211231: {_02378: 'Indian-Japan Pentatonic', _01378: 'Balinese Pelog Pentatonic, Korean, Raga Bhupala, Raga Bibhas', _01578: 'Hirajoshi Pentatonic, Iwato, Sakura, Raga Saveri'},
			_202420: {_01458: 'Major-augmented ninth chord, Syrian Pentatonic, Raga Megharanji', _03478: 'Lebanese Pentachord, Augmented-minor chord'},
			_202321: {_01478: 'Persian Pentamirror, Raga reva/Ramkali'},
			_132130: {_02357: 'Dorian/Minor Pentachord', _02457: 'Major/Ionic Pentachord'},
			_131221: {_01357: 'Phrygian Pentachord', _02467: /* Major ninth sharp eleventh chord */'Major ninth sharp eleventh chord, Lydian Pentachord'},
			_123121: {_02358: 'Diminished-major ninth chord', _03568: 'Minor-diminished ninth chord'},
			_122311: {_02458: 'Diminished-augmented ninth chord', _03468: 'Augmented-diminished ninth chord'},
			_122230: {_01358: 'Minor ninth chord', _03578: 'Major ninth chord'}, /* check */
			_122212: {_02368: 'Augmented-sixth Pentachord.1', _02568: 'Augmented-sixth Pentachord.2, Indian Hindola, Javan Pentatonic'},
			_122131: {_01368: 'Kumoi Pentachord.2', _02578: 'Kumoi Pentachord.1'},
			_121321: {_01468: 'Enigmatic Pentachord.1', _02478: 'Enigmatic Pentachord.2, Altered Pentatonic'},
			_114112: {_01369: 'Diminished Minor-ninth chord', _02369: 'Flat-ninth Pentachord, Ranjaniraga'},
			_113221: {_01469: /*Dominant seventh sharp ninth chord*/'Dominant seventh sharp ninth chord, Neapolitan Pentachord.1', _01479: 'Neapolitan Pentachord.2'},
			_040402: {_02468: /* Dominant ninth sharp five chord */'Dominant ninth sharp five chord, Whole-tone Pentamirror'},
			_032221: {_02469: 'Dominant ninth, major-minor, Prometheus Pentamirror'},
			_032140: {_02479: '"Black Key" Pentatonic, Slendro, Bilahariraga, Quartal Pentamirror, Yo'},
			_543210: {_012345: 'Chromatic Hexamirror, 1st ord. all-comb (P6, Ib, RI5)'},
			_443211: {_012346: 'comb I (b)', _023456: 'comb I (1)'},
			_433221: {_012356: '', _012347: '', _034567: '', _013456: ''},
			_432321: {_012456: 'comb RI (6)', _012348: 'comb RI (4)'},
			_422232: {_012367: 'comb I (b)', _014567: 'comb I (3)'},
			_421242: {_012567: 'Double-cluster Hexamirror', _012378: 'comb RI (3)'},
			_420243: {_012678: 'Messiaen\'s mode 5, 2nd ord.all-comb(P3+9,I5,Ib,R6,RI2+8)'},
			_343230: {_023457: '1st ord.all-comb (P6, I1, RI7)'},
			_342231: {_012357: 'comb I (b)', _024567: 'comb I (3)'},
			_333321: {_013457: '', _023458: '', _023467: '', _034568: ''},
			_333231: {_012457: '', _012358: '', _035678: '', _023567: ''},
			_332232: {_012467: '', _012368: '', _025678: '', _013567: ''},
			_324222: {_013467: 'Alternating Hexamirror, comb RI7)', _012369: 'Raga Dipak, comb RI (3)'},
			_323430: {_013458: 'comb P (6)', _034578: 'comb P (6)'},
			_323421: {_012458: 'comb I (b)', _034678: 'comb I (5)'},
			_322431: {_014568: 'comb I (3)', _023478: 'Megha or "Cloud" Raga, comb.I (1)'},
			_322332: {_012478: 'all-trichord hexachord', _014678: 'Raga Dhavalangam', _023678: 'Raga Syamalam', _012568: ''},
			_322242: {_012578: 'comb I (b)', _013678: 'comb I (5)'},
			_313431: {_013478: '', _012569: 'Schoenberg Anagram Hexachord', _012589: 'Bauli raga', _014578: 'Gypsy hexatonic', _014578: ''},
			_303630: {_014589: 'Augmented, Messiaen\'s truncated 3, Genus tertium, 3rd ord. all-comb (P2+6+10, I3+7+b, R4+8, RI1+5+9), "Ode-to-Napoleon" hexachord'},
			_242412: {_023468: 'comb I (1)', _024568: 'comb I (3)'},
			_241422: {_012468: 'Arabian Major Locrian, comb I (b)', _024678: 'comb I (5)'},
			_234222: {_023568: 'Super-Locrian Hexamirror, comb RI (8)', _023469: 'comb RI (6)'},
			_233331: {_013468: '', _024578: 'Melodic-minor Hexachord', _012469: '', _024569: ''},
			_233241: {_013568: 'Locrian Hexachord, Suddha Saveriraga', _023578: 'Minor Hexachord', _012479: '', _023479: 'Indian, Blues mode.1'},
			_232341: {_013578: 'Phrygian Hexamirror, comb RI (8)', _012579: 'comb RI (2)'},
			_225222: {_013469: 'comb I (b)', _023569: 'Pyramid Hexachord, comb I (1)'},
			_224322: {_013569: 'Double-Phrygian Hexachord, comb RI (6)', _013479: 'Prometheus Neapolitan mode, Indian Dipaka, comb RI (4)'},
			_224232: {_013689: 'comb RI (9)', _014679: 'comb RI (1)', _023679: 'Bridge chord'},
			_224223: {_013679: 'Minor-bitonal Hexachord, comb R (6), I (5,b)', _023689: 'Petrushka chord, Major-bitonal Hexachord, Messiaen\'s truncated mode 2, comb R (6), I (1,7)'},
			_223431: {_013589: 'comb I (7)', _014689: 'comb I (b)'},
			_143250: {_024579: 'Arezzo major Diatonic, major hexamirror, quartal hexamirror, 1st ord.all-comb P (6), I (3), RI (9)'},
			_143241: {_023579: 'Dorian Hexachord, comb I (1)', _024679: 'Dominant-11th, Lydian Hexachord, comb I (5)'},
			_142422: {_013579: 'Scriabin\'s Mystic chord or Prometheus Hexachord, comb I (B)', _024689: 'Harmonic Hexachord, Augmented-11th, Indian Sviraga, comb I (7)'},
			_060603: {_02468A: 'Wholetone scale, Messiaen\'s mode 1, Raga Gopriya, Anhemitonic Hexatonic, 6th ord.all-comb.(P+IoddT, R+RIevenT)'},
			_654321: {_0123456: 'Chromatic Heptamirror'},
			_554331: {_0123457: '', _0234567: ''},
			_544431: {_0123458: '', _0345678: ''},
			_544332: {_0123467: '', _0134567: ''},
			_543342: {_0123567: '', _0124567: ''},
			_533442: {_0123478: '', _0145678: ''},
			_532353: {_0123678: '', _0125678: ''},
			_454422: {_0234568: ''},
			_453432: {_0123468: '', _0245678: ''},
			_445332: {_0123469: '', _0234569: ''},
			_444441: {_0134568: '', _0234578: ''},
			_444342: {_0123479: '', _0123568: '', _0235678: ''},
			_443532: {_0124568: '', _0234678: ''},
			_443352: {_0123578: '', _0135678: ''},
			_442443: {_0124678: ''},
			_435432: {_0123569: 'Debussy\'s Heptatonic', _0134569: ''},
			_434541: {_0124569: '', _0134578: ''},
			_434442: {_0123589: '', _0146789: '', _0124578: '', _0134678: ''},
			_434343: {_0123679: '', _0123689: ''},
			_433452: {_0234789: 'Greek Chromatic, Indian', _0124789: 'Chromatic Phrygian inverse', _0125789: 'Pantuvarali Raga, Chromatic Mixolydian, Chromatic Dorian, Mela Kanakangi'},
			_424641: {_0124589: '', _0134589: 'Gypsy hexatonic'},
			_424542: {_0125689: 'Persian, Major Gypsy, Hungarian Minor, Double Harmonic scale, Bhairav That, Mayamdavagaula Raga (all: 1312131), Oriental'},
			_354351: {_0234579: '', _0245679: 'Tritone Major Heptachord'},
			_353442: {_0123579: '', _0246789: 'Enigmatic Heptatonic'},
			_345342: {_0234679: '', _0235679: ''},
			_344532: {_0134579: '', _0245689: ''},
			_344451: {_0124579: '', _0245789: 'Modified Blues mode'},
			_344433: {_0135679: '', _0234689: ''},
			_344352: {_0124679: '', _0235789: ''},
			_343542: {_0124689: 'Neapolitan-Minor mode, Mela Dhenuka', _0135789: ''},
			_336333: {_0134679: 'Alternating Heptachord.1, Hungarian Major mode', _0235689: 'Alternating Heptachord.2'},
			_335442: {_0134689: 'Spanish Gypsy, Harmonic-Minor mode, Mela Kiravani, Pilu That', _0135689: 'Dharmavati Scale, Harmonic minor inverse, Mela Cakravana, Raga Ahir Bhairav'},
			_262623: {_012468A: 'Neapolitan-major mode, Leading-Whole-tone mode, Combined, Kafenda\'s, Neapolitan-major mode,Leading-Whole-tone mode'},
			_254442: {_013468A: 'Harmonic, Super-Locrian, Melodic minor ascending, Aug.13th Heptamirror, Jazz Minor'},
			_254361: {_013568A: 'Greek, Medieval, Natural, Genuine, Major Diatonic Heptachord, Dominant-13th, Locrian, Phrygian, Major inverse'},
			_765442: {_01234567: 'Chromatic Octamirror'},
			_665542: {_01234568: '', _02345678: ''},
			_656542: {_01234569: ''},
			_655552: {_01234578: '', _01345678: ''},
			_654553: {_01234678: '', _01245678: ''},
			_654463: {_01235678: ''},
			_645652: {_01234589: ''},
			_644563: {_01234789: ''},
			_644464: {_01236789: 'Messiaen\'s mode 4'},
			_566452: {_02345679: ''},
			_565552: {_01234579: '', _02456789: ''},
			_556543: {_01345679: '', _02345689: ''},
			_556453: {_01234679: '', _02356789: ''},
			_555562: {_01245679: '', _02345789: ''},
			_555553: {_01234689: '', _01356789: '', _01235679: '', _02346789: ''},
			_554563: {_01235789: '', _01246789: 'Enigmatic Octatonic, Free-constructed'},
			_546652: {_01345689: ''},
			_546553: {_01235689: '', _01346789: ''},
			_545752: {_0134568A: '', _01245689: '', _01345789: 'Mela Jyotisvarupini, Raga Jotismatti'},
			_545662: {_01245789: ''},
			_474643: {_0123468A: ''},
			_465562: {_0123568A: 'Spanish Octatonic', _0123579A: 'Spanish Octatonic Scale (r9)'},
			_465472: {_0123578A: 'Greek Complete, Egyptian, Blues, Quartal Octachord, Diatonic Octad'},
			_464743: {_0124568A: ''},
			_464644: {_0124678A: 'Messiaen\'s 6, Messiaen mode 6'},
			_456562: {_0134578A: 'Spanish, Major-Minor, Blues', _0124579A: 'Spanish Phrygian (r9),  Blues mode.2'},
			_456553: {_0124578A: '', _0124679A: ''},
			_448444: {_0134679A: 'Alternating Octatonic, Messiaen\'s mode 2, Diminished scale'},
			_876663: {_012345678: 'Chromatic Nonamirror'},
			_777663: {_012345679: '', _023456789: ''},
			_767763: {_012345689: '', _013456789: ''},
			_766773: {_012345789: '', _012456789: ''},
			_766674: {_012346789: '', _012356789: ''},
			_686763: {_01234568A: ''},
			_677673: {_01234578A: 'Nonatonic Blues, Nonatonic Blues Scale', _01234579A: ''},
			_676764: {_01234678A: '', _01234689A: ''},
			_676683: {_01235678A: 'Major-minor Nonatonic, Ramdasi Malhar', _01235678A: 'Raga Ramdasi Malhar (r2)'},
			_668664: {_01234679A: ''},
			_667773: {_01235679A: 'Diminishing Nonachord?', _01235689A: 'Diminishing Nonachord', _01245679A: 'Diminishing Nonachord'},
			_666963: {_01245689A: 'Messiaen mode 3, Tsjerepnin'},
			_988884: {_0123456789: 'Chromatic Decamirror'},
			_898884: {_012345678A: ''},
			_889884: {_012345679A: ''},
			_888984: {_012345689A: ''},
			_888894: {_012345789A: 'Major-minor mixed (r7)'},
			_888885: {_012346789A: 'Messiaen mode 7'},
			_AAAAA5: {_0123456789A: 'Chromatic Undecamirror'},
			_CCCCC6: {_0123456789AB: 'Chromatic Scale, Dodecamirror'}
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

// http://vladimir_ladma.sweb.cz/english/music/structs/mus_rot.htm
// http://solomonsmusic.net/pcsets.htm#Explanation%20of%20This%20Table
// view-source:http://composertools.com/Tools/PCSets/setfinder.html
// https://en.wikipedia.org/wiki/Set_theory_(music)

		commonChordsLookupTable: {


_047A25: [['Eleventh', 0], ],
_036A18: [['Eleventh', 1], ],
_037A59: [['Eleventh', 2], ],
_047269: [['Eleventh', 3], ],
_03A258: [['Eleventh', 4], ],
_07B259: [['Eleventh', 5], ],
_047A259: [['Thirteenth', 0], ['Minor Thirteenth', 5], ['Major thirteenth sharp eleventh chord', 4], ['Major Thirteenth', 2], ],
_036A158: [['Thirteenth', 1], ['Minor Thirteenth', 6], ['Major thirteenth sharp eleventh chord', 5], ['Major Thirteenth', 3], ],
_037A259: [['Thirteenth', 2], ['Minor Thirteenth', 0], ['Major thirteenth sharp eleventh chord', 6], ['Major Thirteenth', 4], ],
_047B269: [['Thirteenth', 3], ['Minor Thirteenth', 1], ['Major thirteenth sharp eleventh chord', 0], ['Major Thirteenth', 5], ],
_037A258: [['Thirteenth', 4], ['Minor Thirteenth', 2], ['Major thirteenth sharp eleventh chord', 1], ['Major Thirteenth', 6], ],
_047B259: [['Thirteenth', 5], ['Minor Thirteenth', 3], ['Major thirteenth sharp eleventh chord', 2], ['Major Thirteenth', 0], ],
_037A158: [['Thirteenth', 6], ['Minor Thirteenth', 4], ['Major thirteenth sharp eleventh chord', 3], ['Major Thirteenth', 1], ],
_047: [['Major Triad', 0], ],
_038: [['Major Triad', 1], ],
_059: [['Major Triad', 2], ],
_037: [['Minor Triad', 0], ],
_049: [['Minor Triad', 1], ],
_058: [['Minor Triad', 2], ],
_036: [['Diminished Triad', 0], ],
_039: [['Diminished Triad', 1], ],
_069: [['Diminished Triad', 2], ],
_048: [['Augmented Triad', 0], ['Augmented Triad', 1], ['Augmented Triad', 2], ],
_047B: [['Major seventh chord', 0], ],
_0378: [['Major seventh chord', 1], ],
_0459: [['Major seventh chord', 2], ],
_0158: [['Major seventh chord', 3], ],
_037A: [['Minor seventh chord', 0], ['Major sixth chord', 3], ],
_0479: [['Minor seventh chord', 1], ['Major sixth chord', 0], ],
_0358: [['Minor seventh chord', 2], ['Major sixth chord', 1], ],
_0259: [['Minor seventh chord', 3], ['Major sixth chord', 2], ],
_047A: [['Dominant seventh chord', 0], ],
_0368: [['Dominant seventh chord', 1], ],
_0359: [['Dominant seventh chord', 2], ],
_0269: [['Dominant seventh chord', 3], ],
_0369: [['Diminished seventh chord', 0], ['Diminished seventh chord', 1], ['Diminished seventh chord', 2], ['Diminished seventh chord', 3], ],
_036A: [['Minor seventh flat five chord', 0], ['Minor sixth chord', 3], ],
_0379: [['Minor seventh flat five chord', 1], ['Minor sixth chord', 0], ],
_0469: [['Minor seventh flat five chord', 2], ['Minor sixth chord', 1], ],
_0258: [['Minor seventh flat five chord', 3], ['Minor sixth chord', 2], ],
_037B: [['Minor major seventh chord', 0], ],
_0489: [['Minor major seventh chord', 1], ],
_0458: [['Minor major seventh chord', 2], ],
_0148: [['Minor major seventh chord', 3], ],
_048B: [['Major seventh sharp five chord', 0], ],
_0478: [['Major seventh sharp five chord', 1], ],
_0348: [['Major seventh sharp five chord', 2], ],
_0159: [['Major seventh sharp five chord', 3], ],
_036B: [['Diminished major seventh chord', 0], ],
_0389: [['Diminished major seventh chord', 1], ],
_0569: [['Diminished major seventh chord', 2], ],
_0147: [['Diminished major seventh chord', 3], ],
_046A: [['Dominant seventh flat five chord', 0], ['Dominant seventh flat five chord', 2], ],
_0268: [['Dominant seventh flat five chord', 1], ['Dominant seventh flat five chord', 3], ],
_0472: [['Added ninth chord', 0], ],
_03A8: [['Added ninth chord', 1], ],
_0759: [['Added ninth chord', 2], ],
_0A25: [['Added ninth chord', 3], ],
_047B2: [['major ninth chord', 0], ],
_037A8: [['major ninth chord', 1], ],
_04759: [['major ninth chord', 2], ],
_03158: [['major ninth chord', 3], ],
_0A259: [['major ninth chord', 4], ],
_037A2: [['minor ninth chord', 0], ],
_047B9: [['minor ninth chord', 1], ],
_03758: [['minor ninth chord', 2], ],
_04259: [['minor ninth chord', 3], ],
_0A158: [['minor ninth chord', 4], ],
_037B2: [['Minor-major ninth chord', 0], ],
_048B9: [['Minor-major ninth chord', 1], ],
_04758: [['Minor-major ninth chord', 2], ],
_03148: [['Minor-major ninth chord', 3], ],
_0A159: [['Minor-major ninth chord', 4], ],
_0372: [['Minor added ninth chord', 0], ],
_04B9: [['Minor added ninth chord', 1], ],
_0758: [['Minor added ninth chord', 2], ],
_0A15: [['Minor added ninth chord', 3], ],
_036A2: [['Minor Ninth Diminished Fifth', 0], ],
_037B9: [['Minor Ninth Diminished Fifth', 1], ],
_04869: [['Minor Ninth Diminished Fifth', 2], ],
_04258: [['Minor Ninth Diminished Fifth', 3], ],
_0A148: [['Minor Ninth Diminished Fifth', 4], ],
_04726: [['Major ninth sharp eleventh chord', 0], ['Major seventh sharp eleventh chord', 0], ],
_03A28: [['Major ninth sharp eleventh chord', 1], ['Major seventh sharp eleventh chord', 1], ],
_07B59: [['Major ninth sharp eleventh chord', 2], ['Major seventh sharp eleventh chord', 2], ],
_04A25: [['Major ninth sharp eleventh chord', 3], ['Major seventh sharp eleventh chord', 3], ],
_06A18: [['Major ninth sharp eleventh chord', 4], ['Major seventh sharp eleventh chord', 4], ],
_048A2: [['Dominant ninth sharp five chord', 0], ],
_046A8: [['Dominant ninth sharp five chord', 1], ],
_02648: [['Dominant ninth sharp five chord', 2], ],
_0426A: [['Dominant ninth sharp five chord', 3], ],
_0A268: [['Dominant ninth sharp five chord', 4], ],
_046A2: [['Dominant ninth flat five chord', 0], ],
_026A8: [['Dominant ninth flat five chord', 1], ],
_0486A: [['Dominant ninth flat five chord', 2], ],
_04268: [['Dominant ninth flat five chord', 3], ],
_0A248: [['Dominant ninth flat five chord', 4], ],
_047A2: [['Dominant 9th', 0], ],
_036A8: [['Dominant 9th', 1], ],
_03759: [['Dominant 9th', 2], ],
_04269: [['Dominant 9th', 3], ],
_0A258: [['Dominant 9th', 4], ],
_047A1: [['Dominant minor 9th', 0], ],
_03698: [['Dominant minor 9th', 1], ],
_03659: [['Dominant minor 9th', 2], ],
_03269: [['Dominant minor 9th', 3], ],
_0B369: [['Dominant minor 9th', 4], ],
_047A3: [['Dominant seventh sharp ninth chord', 0], ],
_036B8: [['Dominant seventh sharp ninth chord', 1], ],
_03859: [['Dominant seventh sharp ninth chord', 2], ],
_05269: [['Dominant seventh sharp ninth chord', 3], ],
_09147: [['Dominant seventh sharp ninth chord', 4], ],
_048A3: [['Dominant seventh sharp five sharp ninth chord', 0], ],
_046B8: [['Dominant seventh sharp five sharp ninth chord', 1], ],
_02748: [['Dominant seventh sharp five sharp ninth chord', 2], ],
_0526A: [['Dominant seventh sharp five sharp ninth chord', 3], ],
_09157: [['Dominant seventh sharp five sharp ninth chord', 4], ],
_048A1: [['Dominant seventh sharp five flat ninth chord', 0], ],
_04698: [['Dominant seventh sharp five flat ninth chord', 1], ],
_02548: [['Dominant seventh sharp five flat ninth chord', 2], ],
_0326A: [['Dominant seventh sharp five flat ninth chord', 3], ],
_0B379: [['Dominant seventh sharp five flat ninth chord', 4], ],
_048A: [['dominant seventh sharp five chord', 0], ],
_0468: [['dominant seventh sharp five chord', 1], ],
_0248: [['dominant seventh sharp five chord', 2], ],
_026A: [['dominant seventh sharp five chord', 3], ],
_047A16: [['Dominant seventh sharp eleventh chord', 0], ],
_036928: [['Dominant seventh sharp eleventh chord', 1], ],
_036B59: [['Dominant seventh sharp eleventh chord', 2], ],
_038269: [['Dominant seventh sharp eleventh chord', 3], ],
_05B369: [['Dominant seventh sharp eleventh chord', 4], ],
_06A147: [['Dominant seventh sharp eleventh chord', 5], ],
_046A3: [['Dominant seventh flat five sharp ninth chord', 0], ],
_026B8: [['Dominant seventh flat five sharp ninth chord', 1], ],
_0496A: [['Dominant seventh flat five sharp ninth chord', 2], ],
_05268: [['Dominant seventh flat five sharp ninth chord', 3], ],
_09137: [['Dominant seventh flat five sharp ninth chord', 4], ],
_03792: [['Minor seventh sharp five chord', 0], ['Minor six-nine chord', 0], ],
_046B9: [['Minor seventh sharp five chord', 1], ['Minor six-nine chord', 1], ],
_02758: [['Minor seventh sharp five chord', 2], ['Minor six-nine chord', 2], ],
_0536A: [['Minor seventh sharp five chord', 3], ['Minor six-nine chord', 3], ],
_0A157: [['Minor seventh sharp five chord', 4], ['Minor six-nine chord', 4], ],
_046B: [['Major seventh flat five chord', 0], ],
_0278: [['Major seventh flat five chord', 1], ],
_056A: [['Major seventh flat five chord', 2], ],
_0157: [['Major seventh flat five chord', 3], ],
_04792: [['Major six-nine chord', 0], ],
_035A8: [['Major six-nine chord', 1], ],
_02759: [['Major six-nine chord', 2], ],
_0537A: [['Major six-nine chord', 3], ],
_0A257: [['Major six-nine chord', 4], ],
_037A25: [['Minor eleventh chord', 0], ],
_047B29: [['Minor eleventh chord', 1], ],
_037A58: [['Minor eleventh chord', 2], ],
_047259: [['Minor eleventh chord', 3], ],
_03A158: [['Minor eleventh chord', 4], ],
_07A259: [['Minor eleventh chord', 5], ],
_047B25: [['Major eleventh chord', 0], ],
_037A18: [['Major eleventh chord', 1], ],
_047A59: [['Major eleventh chord', 2], ],
_036158: [['Major eleventh chord', 3], ],
_03A259: [['Major eleventh chord', 4], ],
_07B269: [['Major eleventh chord', 5], ],
_047A15: [['Dominant eleventh flat ninth chord', 0], ],
_036918: [['Dominant eleventh flat ninth chord', 1], ],
_036A59: [['Dominant eleventh flat ninth chord', 2], ],
_037269: [['Dominant eleventh flat ninth chord', 3], ],
_04B369: [['Dominant eleventh flat ninth chord', 4], ],
_07B258: [['Dominant eleventh flat ninth chord', 5], ],
_04725: [['Dominant eleventh chord', 0], ],
_03A18: [['Dominant eleventh chord', 1], ],
_07A59: [['Dominant eleventh chord', 2], ],
_03A25: [['Dominant eleventh chord', 3], ],
_07B29: [['Dominant eleventh chord', 4], ],
_047A39: [['Dominant thirteenth sharp ninth chord', 0], ],
_036B58: [['Dominant thirteenth sharp ninth chord', 1], ],
_038259: [['Dominant thirteenth sharp ninth chord', 2], ],
_05B269: [['Dominant thirteenth sharp ninth chord', 3], ],
_069147: [['Dominant thirteenth sharp ninth chord', 4], ],
_037A16: [['Dominant thirteenth sharp ninth chord', 5], ],
_047A269: [['Dominant thirteenth sharp eleventh chord', 0], ],
_036A258: [['Dominant thirteenth sharp eleventh chord', 1], ],
_037B259: [['Dominant thirteenth sharp eleventh chord', 2], ],
_048B269: [['Dominant thirteenth sharp eleventh chord', 3], ],
_047A258: [['Dominant thirteenth sharp eleventh chord', 4], ],
_036A148: [['Dominant thirteenth sharp eleventh chord', 5], ],
_037A159: [['Dominant thirteenth sharp eleventh chord', 6], ],
_047A19: [['Dominant thirteenth flat ninth chord', 0], ],
_036958: [['Dominant thirteenth flat ninth chord', 1], ],
_036259: [['Dominant thirteenth flat ninth chord', 2], ],
_03B269: [['Dominant thirteenth flat ninth chord', 3], ],
_08B369: [['Dominant thirteenth flat ninth chord', 4], ],
_037A14: [['Dominant thirteenth flat ninth chord', 5], ],
_047A29: [['Dominant thirteenth chord', 0], ],
_036A58: [['Dominant thirteenth chord', 1], ],
_037259: [['Dominant thirteenth chord', 2], ],
_04B269: [['Dominant thirteenth chord', 3], ],
_07A258: [['Dominant thirteenth chord', 4], ],
_037A15: [['Dominant thirteenth chord', 5], ],
_0257: [['Suspended second suspended fourth chord', 0], ['Dominant seventh suspended fourth chord', 1], ],
_035A: [['Suspended second suspended fourth chord', 1], ['Dominant seventh suspended fourth chord', 2], ],
_0279: [['Suspended second suspended fourth chord', 2], ['Dominant seventh suspended fourth chord', 3], ],
_057A: [['Suspended second suspended fourth chord', 3], ['Dominant seventh suspended fourth chord', 0], ],
_027: [['Suspended Second Chord', 0], ['Suspended Fourth Chord', 1], ],
_05A: [['Suspended Second Chord', 1], ['Suspended Fourth Chord', 2], ],
_057: [['Suspended Second Chord', 2], ['Suspended Fourth Chord', 0], ],
_027B: [['Major seventh suspended second chord', 0], ],
_059A: [['Major seventh suspended second chord', 1], ],
_0457: [['Major seventh suspended second chord', 2], ],
_0138: [['Major seventh suspended second chord', 3], ],
_057B: [['Major seventh suspended fourth chord', 0], ],
_0267: [['Major seventh suspended fourth chord', 1], ],
_045A: [['Major seventh suspended fourth chord', 2], ],
_0168: [['Major seventh suspended fourth chord', 3], ],
_057A29: [['Dominant thirteenth suspended fourth chord', 0], ],
_025947: [['Dominant thirteenth suspended fourth chord', 1], ],
_03725A: [['Dominant thirteenth suspended fourth chord', 2], ],
_04B279: [['Dominant thirteenth suspended fourth chord', 3], ],
_07A358: [['Dominant thirteenth suspended fourth chord', 4], ],
_038A15: [['Dominant thirteenth suspended fourth chord', 5], ],
_027A: [['Dominant seventh suspended second chord', 0], ],
_058A: [['Dominant seventh suspended second chord', 1], ],
_0357: [['Dominant seventh suspended second chord', 2], ],
_0249: [['Dominant seventh suspended second chord', 3], ],
_057A2: [['Dominant ninth suspended fourth chord', 0], ],
_02597: [['Dominant ninth suspended fourth chord', 1], ],
_0375A: [['Dominant ninth suspended fourth chord', 2], ],
_04279: [['Dominant ninth suspended fourth chord', 3], ],
_0A358: [['Dominant ninth suspended fourth chord', 4], ],
_07: [['Power Chord', 0], ],
_05: [['Power Chord', 1], ],
_070: [['Power Chord Octave Doubled', 0], ],
_055: [['Power Chord Octave Doubled', 1], ],
_007: [['Power Chord Octave Doubled', 2], ],
_046: [['Flat five chord', 0], ],
_028: [['Flat five chord', 1], ],
_06A: [['Flat five chord', 2], ],
_026: [['Flat five chord', 0], ],
_04A: [['Flat five chord', 1], ],
_068: [['Flat five chord', 2], ],
_0247: [['Mu chord', 0], ],
_025A: [['Mu chord', 1], ],
_038A: [['Mu chord', 2], ],
_0579: [['Mu chord', 3], ],
		},


		_getDistanceOfRotation: function(orderedPitchClasses, rotationIndex, indexToCompareWith, cardinality){

			var firstPitchOfRotation = orderedPitchClasses[rotationIndex];
			var pitchToSubstractFrom = orderedPitchClasses[(indexToCompareWith + cardinality) % cardinality];

			return (pitchToSubstractFrom + 12 - firstPitchOfRotation) % 12;
		},

		getPrimeForm: function(notes) {
			var orderedPC = _.sortBy(this._getPitchClasses(notes));
			var normalForm = this._getNormalForm(orderedPC);
			var normalFormInvertedSet = this._getNormalForm(this._getInvertedSet(orderedPC));

			//console.log(normalForm);
			//console.log(this._getIntervalSetStartingAtZero(normalForm));
			//console.log(this._getPitchClassesStartingAtZero(normalForm));

			return this._getSetWithSmallerPitchesToTheLeft(
					  this._getPitchClassesStartingAtZero(normalForm), 
					  this._getPitchClassesStartingAtZero(normalFormInvertedSet)
				   );
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

				i++;
			}
			return setOne;
		},

		_getNormalForm: function(orderedPC){

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
		},

		/*
			@todo evtl. rahn prime auch einbauen (neben forte)
		*/

		/*_getOrderedPitchesStartingAtZero: function (orderedPitches) {
			var lowestPitch = orderedPitches[0];
			return _.map(orderedPitches, function(pitch){
				return (pitch - lowestPitch);
			});
		},*/

		_getIntervalSetStartingAtZeroKeepOrder: function(pitches) {
		    var lowestPitch = pitches[0];
		    return _.map(pitches, function(pitch){
		        return (pitch - lowestPitch + 144)%12;
		    });
		},

		_getIntervalSetStartingAtZero: function (unorderedPitches) {
			var orderedPitches = _.sortBy(unorderedPitches);
			var lowestPitch = orderedPitches[0];
			return _.map(orderedPitches, function(pitch){
				return (pitch - lowestPitch);
			});
		},

		_getPitchClassesStartingAtZero: function (setOfPitchClasses) {
			var semitonesToTransposeDown = setOfPitchClasses[0];
			return _.map(setOfPitchClasses, function(pitch){
				return (pitch - semitonesToTransposeDown + 12) % 12;
			});
		},

		_getInvertedSet: function (pitches) {
			var invertedSet = [];
			for(var i = pitches.length; i > 0; i--) {
				invertedSet.push(12 - pitches[i - 1]);
			}
			return invertedSet;
		},

		getChordFunction: function(scaleIndex, modeIndex, rootNote, set){

			// in: 0, 1, 0 (C, major, C-2)
			// out: Tonic

			// in: 0, 1, 7 (C, major, G-2)
			// out: Dominant
		},
		_getInversionNumber: function(pitchClassesOnlyOrdered, pitchClassesStartingAtZero){

			var cardinality = pitchClassesOnlyOrdered.length;
			var inversionNumber = 0;

			while (inversionNumber < cardinality) {

				if (pitchClassesOnlyOrdered[inversionNumber] === pitchClassesStartingAtZero[0]) {
					return (cardinality - inversionNumber) % cardinality;
				}
				inversionNumber++;				
			}
			return 0;
		},
		_getInversionText: function(inversionNumber) {
			var prefix = ' (';
			var suffix = ' inv)';

			switch(inversionNumber) {
				case 0: return '';
				case 1: return prefix + '1st' + suffix;
				case 2: return prefix + '2nd' + suffix;
				case 3: return prefix + '3rd' + suffix;
				default: return prefix + inversionNumber + 'th' + suffix;
			}
		},

		customLookup: function(notes){

			var chords = [ 
{pitches: [0,4,7], expected: 'Major Triad'},
{pitches: [0,3,8], expected: 'Major Triad (1st inv)'},
{pitches: [0,5,9], expected: 'Major Triad (2nd inv)'},

{pitches: [0,3,7], expected: 'Minor Triad'},
{pitches: [0,3,6], expected: 'Diminished Triad'},
{pitches: [0,4,8], expected: 'Augmented Triad'},
{pitches: [0,4,7,11], expected: 'Major seventh chord'},
{pitches: [0,3,7,10], expected: 'Minor seventh chord'},
{pitches: [0,4,7,10], expected: 'Dominant seventh chord, major/minor seventh chord, 7th chord'},
{pitches: [0,3,6,9], expected: 'Diminished seventh chord, full diminished seventh chord, Diminished 7th (with Flat 5th)'},
{pitches: [0,3,6,10], expected: 'Minor seventh flat five chord, Half-diminished seventh chord'},
{pitches: [0,3,7,11], expected: 'Minor major seventh chord'},
{pitches: [0,4,8,11], expected: 'Major seventh sharp five chord, augmented major seventh chord'},
{pitches: [0,3,6,11], expected: 'Diminished major seventh chord'},
{pitches: [0,4,6,10], expected: 'Dominant seventh flat five chord, Seven Flat Five'},
{pitches: [0,4,7,14], expected: 'Added ninth chord'},
{pitches: [0,4,7,11,14], expected: 'major ninth chord'},
{pitches: [0,3,7,10,14], expected: 'minor ninth chord'},
{pitches: [0,3,7,11,14], expected: 'Minor-major ninth chord'},
{pitches: [0,3,7,14], expected: 'Minor added ninth chord'},
{pitches: [0,4,7,14,18], expected: 'Major ninth sharp eleventh chord|Major seventh sharp eleventh chord'},
{pitches: [0,4,8,10,14], expected: 'Dominant ninth sharp five chord'},
{pitches: [0,4,6,10,14], expected: 'Dominant ninth flat five chord'},
{pitches: [0,4,7,10,14], expected: 'Dominant 9th, Dominant ninth chord'},
{pitches: [0,4,7,10,13], expected: 'Dominant minor 9th, Dominant seventh flat ninth chord'},
{pitches: [0,4,7,10,15], expected: 'Dominant seventh sharp ninth chord, dominant 7â™¯9 chord, Hendrix chord'},
{pitches: [0,4,8,10,15], expected: 'Dominant seventh sharp five sharp ninth chord'},
{pitches: [0,4,8,10,13], expected: 'Dominant seventh sharp five flat ninth chord'},
{pitches: [0,4,8,10], expected: 'dominant seventh sharp five chord, augmented seventh chord, Seven Sharp Five'},
{pitches: [0,4,7,10,13,18], expected: 'Dominant seventh sharp eleventh chord'},
{pitches: [0,4,6,10,15], expected: 'Dominant seventh flat five sharp ninth chord'},
{pitches: [0,3,7,9,14], expected: 'Minor seventh sharp five chord, minor six-nine chord'},
{pitches: [0,4,6,11], expected: 'Major seventh flat five chord'},
{pitches: [0,4,7,14,18], expected: 'Major seventh sharp eleventh chord'},
{pitches: [0,3,7,9], expected: 'Minor sixth chord'},
{pitches: [0,4,7,9], expected: 'Major sixth chord'},
{pitches: [0,4,7,9,14], expected: 'Major six-nine chord'},
{pitches: [0,3,7,10,14,17], expected: 'Minor eleventh chord'},
{pitches: [0,4,7,11,14,17], expected: 'Major eleventh chord'},
{pitches: [0,4,7,10,13,17], expected: 'Dominant eleventh flat ninth chord'},
{pitches: [0,4,7,14,17], expected: 'Dominant eleventh chord'},
{pitches: [0,3,7,10,14,21], expected: 'Minor thirteenth chord'},
{pitches: [0,4,7,11,14,18,21], expected: 'Major thirteenth sharp eleventh chord'},
{pitches: [0,4,7,11,14,21], expected: 'Major thirteenth chord'},
{pitches: [0,4,7,10,15,21], expected: 'Dominant thirteenth sharp ninth chord'},
{pitches: [0,4,7,10,14,18,21], expected: 'Dominant thirteenth sharp eleventh chord'},
{pitches: [0,4,7,10,13,21], expected: 'Dominant thirteenth flat ninth chord'},
{pitches: [0,4,7,10,14,21], expected: 'Dominant thirteenth chord'},
{pitches: [0,2,5,7], expected: 'Suspended second suspended fourth chord'},
{pitches: [0,2,7], expected: 'Suspended Second Chord'},
{pitches: [0,5,7], expected: 'Suspended Fourth Chord'},
{pitches: [0,2,7,11], expected: 'Major seventh suspended second chord'},
{pitches: [0,5,7,11], expected: 'Major seventh suspended fourth chord'},
{pitches: [0,5,7,10,14,21], expected: 'Dominant thirteenth suspended fourth chord'},
{pitches: [0,2,7,10], expected: 'Dominant seventh suspended second chord'},
{pitches: [0,5,7,10], expected: 'Dominant seventh suspended fourth chord'},
{pitches: [0,5,7,10,14], expected: 'Dominant ninth suspended fourth chord'},
{pitches: [0,7], expected: 'Power Chord'},
{pitches: [0,7,12], expected: 'Power Chord Octave Doubled'},
{pitches: [0,4,6], expected: 'Flat five chord'},
{pitches: [0,2,6], expected: 'Flat five chord'},
{pitches: [0,2,4,7], expected: 'Mu chord'}
];

			//var intervalsOrdered = _.sortBy(notes);
			//var transposedBy = intervalsOrdered[0];
			var intervalsStartingAtZero = this._getIntervalSetStartingAtZero(notes);
			var hit = _.find(chords, function(chord) {
				return _.isEqual(intervalsStartingAtZero, chord.pitches); 
			});

			if (!_.isUndefined(hit)) {
				return hit.expected;
			}
			return'not found';

			/*
				new strategy 17.4.2016:

				- try to get the most specific via custom (limit: voicings)
				- if that fails, use sets
					- testen: die untervariante finden via normalForm / normalFormInvertedSet, um dennoch genauer zu sein.

			*/

		},

		getConsonanceRating: function(notes){
			var intervalConsonanceRating = [
				10, // (0 semitones) unison
				-2,  // (1 semitones) minor 2nd
				3,  // (2 semitones) 2nd
				7,  // (3 semitones) minor 3rd
				7,  // (4 semitones) major 3rd
				3,  // (5 semitones) perfect 4th
				3,  // (6 semitones) augmented 4th
				9, // (7 semitones) perfect 5th
				4,  // (8 semitones) minor 6th
				4,  // (9 semitones) major 6th
				3,  // (10 semitones) minor 7th
				1   // (11 semitones) major 7th
			];

			var sum = 0;
			var count = 0;

			for (var i = notes.length - 1; i >= 0; i--) {
				for (var k = notes.length - 1; k >= 0; k--) {
					var interval = Math.abs(notes[i]%12 - notes[k]%12);
					sum += intervalConsonanceRating[interval];
					count++;				
				};
			};

			return Math.round(sum/count);
		},

		getConsonanceRating2: function(notes){
			var intervalConsonanceRating = [
				-2,  // (1 semitones) minor 2nd
				3,  // (2 semitones) 2nd
				8,  // (3 semitones) minor 3rd
				8,  // (4 semitones) major 3rd
				6,  // (5 semitones) perfect 4th
				3,  // (6 semitones) augmented 4th
			];

			var sum = 0;
			var count = 0;
			var intervalVector = this._getIntervalVector(notes);

			for (var i = 0, len = intervalVector.length; i < len; i++) {
				sum += intervalVector[i] * intervalConsonanceRating[i];
				count += intervalVector[i];
			};

			if (count === 0) {
				return 10;
			}

			return Math.round(sum/count);
		},

		/*getChordInfo: function(notes) {
			var allNames = this._getAllChordNames(notes);
			if (allNames === '') {
				return 'No info available';
			}
			return allNames.split(',')[0];
		},*/


		/**
			todo
			----

			- keine sortierungen, operationen auf sets
				- alle zu Beginn berechnen und erklären wofür

			- commonChordTableLookup einbauen

			- testen, ob lookup auf common geht mit ordered pitchclasses
				- [12,4,7,0,16]->[0,4,7]->maj
				- [1,4,8,13]->min 

			- fallback auf sets wenn nicht geklappt hat in commonChordTableLookup
				(weil zu exotisch?)

			- bei fallback wie bisher (mit ordered pitchclasses versuchen mehr details zu finden)

			- aufräumen, refactoring

			- testing

		*/
    	getChordInfo: function(notes) {

    		var orderedPitches = _.sortBy(notes);
    		console.log('orderedPitches', orderedPitches);

    		var startingAtZero = this._getIntervalSetStartingAtZeroKeepOrder(orderedPitches);    		
    		console.log('startingAtZero', startingAtZero);

    		var commonChordsLookupKey = '_' + this._getSickodecimal(startingAtZero);
    		//console.log('commonChordsLookupKey', commonChordsLookupKey);

    		// first try to find chords with root, ignore inversions (not possible here 
    		// because we use an interval path where order is important)
			// 047  4-7-12
    		if (_.has(this.commonChordsLookupTable, commonChordsLookupKey)) {

    			console.log(this.commonChordsLookupTable[commonChordsLookupKey][0][0]);
    			// find root
    			var semitonesTransposed = orderedPitches[0];
    			return {
    				root: orderedPitches[0], 
    				chordName: this.commonChordsLookupTable[commonChordsLookupKey][0][0]
    			}; // @todo return multiple names if there





    			//console.log('gefunden: ', this.commonChordsLookupTable[commonChordsLookupKey]);

    			//
    			if (this.commonChordsLookupTable[commonChordsLookupKey][1]) {
    				console.log('------------->', this.commonChordsLookupTable[commonChordsLookupKey]);
    			}


    		} else {
    			console.log('nicht gefunden: ', orderedPitches, commonChordsLookupKey);
    		}

    		var setLookupKey = '_' + this._getSickodecimal(this._getIntervalVector(notes));

    		if (_.has(this.chordTable, setLookupKey)) {



    			//var notesOrdered = _.sortBy(notes);

    			var primeForm = this.getPrimeForm(notes);
    			var primeFormKey = this._getSickodecimal(primeForm);

    			// half-diminished seventh chord [0,3,6,10] -> _036A
    			/*var pitchClassesFromOrderedNotes = this._getPitchClasses(_.sortBy(notes));
    			var pitchClassesStartingAtZero = this._getIntervalSetStartingAtZero(
    				_.sortBy(pitchClassesFromOrderedNotes)
    			);
    			var pitchClassesKey = '_' + this._getSickodecimal(pitchClassesStartingAtZero);*/


    			// half-diminished seventh chord [0,3,6,10] -> 0258
    			// Dominant-seventh/German-sixth Chord [[0,4,7,10]]-> 0368

    			/*
				

    			*/




				var pitchClassesFromOrderedNotes = this._getPitchClasses(_.sortBy(notes));
    			var pitchClassesStartingAtZero = this._getPitchClassesStartingAtZero(
    				_.sortBy(pitchClassesFromOrderedNotes)
    			);
    			var pitchClassesKey = '_' + this._getSickodecimal(pitchClassesStartingAtZero);

				var orderedPC = _.sortBy(this._getPitchClasses(notes));
				var normalForm = this._getPitchClassesStartingAtZero(this._getNormalForm(orderedPC));

				var normalFormInvertedSet = this._getPitchClassesStartingAtZero(this._getNormalForm(this._getInvertedSet(orderedPC)));

    			//console.log('[' + notes.join(',') + ']: setLookupKey: ' + setLookupKey + ', normalForm: ' + normalForm + ', normalFormInvertedSet: ' + normalFormInvertedSet + ', pitchClassesKey: ' + pitchClassesKey + ', primeFormKey: ' + primeFormKey);

    			if (_.has(this.chordTable[setLookupKey], pitchClassesKey)) {

    				var inversionNumber = this._getInversionNumber(pitchClassesFromOrderedNotes, pitchClassesStartingAtZero);
    				return this.chordTable[setLookupKey][pitchClassesKey] + this._getInversionText(inversionNumber);

    			} else {
    				//console.log('did not find pitchClassesKey: ' + pitchClassesKey);
    				// return first key
    				for(var key in this.chordTable[setLookupKey]) break;
    				return this.chordTable[setLookupKey][key];
    			}


    			//return this.chordTable[intervalVector][0];
    		}
    		return '';
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