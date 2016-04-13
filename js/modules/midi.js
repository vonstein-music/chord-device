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
    				console.log(pitchClasses[i], pitchClasses[k]);

					var intervalClass = Math.abs(pitchClasses[k] - pitchClasses[i]);
					if(intervalClass > 6) {
						intervalClass = 12 - intervalClass;
					}

					console.log(intervalClass);
					intervalVector[intervalClass - 1]++;
    			}
    		}
    		console.log(intervalVector);
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

    		335: 'Diminished major seventh chord',

    		1: 'Semitone',
			2: 'Whole-tone',
			11: 'Bach/Chromatic Trimirror',
			3: 'Minor Third',
			12: 'Phrygian Trichord',
			21: 'Minor Trichord',
			4: 'Major Third',
			13: 'Major-minor Trichord.1',
			22: 'Whole-tone Trichord',
			112: 'Major-second Tetracluster.2',
			31: 'Major-minor Trichord.2',
			121: 'Alternating Tetramirror',
			211: 'Major-second Tetracluster.1',
			1111: 'Chromatic Pentamirror',
			5: 'Perfect Fourth',
			23: 'Incomplete Minor-seventh Chord',
			113: 'Minor-Third Tetracluster.2',
			32: 'Incomplete Dominant-seventh Chord.2',
			122: 'Dorian Tetrachord, Phrygian Tetrachord?',
			212: 'Phrygian Tetrachord, Minor Tetramirror',
			1112: 'Major-second Pentacluster.2',
			131: 'Chromatic Mezotetrachord, Arabian Tetramirror',
			221: 'Lydian Tetrachord, Major Tetrachord',
			1121: 'Minor-second Major Pentachord',
			311: 'Minor-Third Tetracluster.1',
			1211: 'Spanish Pentacluster',
			2111: 'Major-second Pentacluster.1',
			11111: 'Chromatic Hexamirror',
			6: 'Tritone',
			15: 'Rite chord.2, Tritone-fourth.1',
			24: 'Italian sixth, Incomplete Dominant-seventh Chord.1',
			114: 'Major-Third Tetracluster.2',
			33: 'Diminished Chord',
			123: 'Minor-second Diminished Tetrachord',
			213: 'Harmonic-minor Tetrachord',
			1113: 'Blues Pentacluster',
			42: 'Incomplete Half-dim-seventh Chord',
			132: 'All-interval Tetrachord.1',
			222: 'Whole-tone Tetramirror',
			1122: 'Tritone-Expanding Pentachord',
			312: 'Major-third Diminished Tetrachord',
			1212: 'Alternating Pentachord.1',
			2112: 'Tritone-Symmetric Pentamirror',
			51: 'Rite chord.1, Tritone-fourth.2',
			141: 'Double Fourth Tetramirror',
			231: 'All-interval Tetrachord.2',
			1131: 'Oriental Pentacluster.1',
			321: 'Perfect-fourth Diminished Tetrachord',
			1221: 'Locrian Pentamirror',
			2121: 'Alternating Pentachord.2',
			411: 'Major-Third Tetracluster.1',
			1311: 'Oriental Pentacluster.2',
			2211: 'Tritone-Contracting Pentachord',
			3111: 'Minor-third Pentacluster',
			111111: 'Chromatic Heptamirror',
			25: 'Quartal Trichord',
			115: 'Perfect Fourth Tetramirror',
			34: 'Minor Chord',
			124: 'All-interval Tetrachord.3',
			214: 'Major-second Minor Tetrachord',
			1114: 'Major-third Pentacluster.2',
			43: 'Major Chord',
			133: 'Major-diminished Tetrachord',
			223: 'Major-second Major Tetrachord',
			1123: 'Major-seventh Pentacluster.2',
			313: 'Major-minor Tetramirror',
			1213: 'Major-minor-dim Pentachord.1',
			2113: 'Center-cluster Pentachord.1',
			142: 'Minor-second Quartal Tetrachord',
			232: 'Quartal Tetramirror',
			1132: 'Double-seconds Triple-fourth Pentachord.1',
			322: 'Perfect-fourth Minor Tetrachord',
			1222: 'Phrygian Pentachord',
			2122: 'Dorian/Minor Pentachord',
			412: 'Perfect-fourth Major Tetrachord',
			1312: 'Gypsy/semiditonic Pentachord.1',
			2212: 'Major/Ionic Pentachord',
			3112: 'Center-cluster Pentachord.2',
			151: 'Messiaen\'s truncated 5, Lendvai\'s, Double Tritone Tetramirror',
			241: 'Tritone Quartal Tetrachord',
			1141: 'Double Pentacluster1',
			331: 'Minor-diminished Tetrachord',
			1231: 'Javanese Pentachord',
			2131: 'Gypsy/semiditonic Pentachord.2',
			421: 'All-interval Tetrachord.4',
			1321: 'Balinese Pentachord',
			2221: 'Lydian Pentachord',
			3121: 'Major-minor-dim Pentachord.2',
			12121: 'Alternating Hexamirror',
			1411: 'Double Pentacluster.2',
			2311: 'Double-seconds Triple-fourth Pentachord.2',
			11311: 'Double-cluster Hexamirror',
			3211: 'Major-seventh Pentacluster.1',
			4111: 'Major-third Pentacluster.2',
			1111111: 'Chromatic Octamirror',
			44: 'Augmented Chord',
			134: 'Minor-augmented Tetrachord',
			1124: 'Augmented Pentacluster.1',
			314: 'Augmented-major Tetrachord',
			1214: 'Minor-major Ninth Chord',
			2114: 'Augmented Pentacluster.2',
			143: 'Major-seventh Chord',
			233: 'Half-diminished Seventh Chord',
			1133: 'Diminished Pentacluster.1',
			323: 'Minor-seventh Chord',
			1223: 'Major-Ninth Chord',
			2123: 'Diminished-major Ninth Chord',
			1313: 'Syrian pentatonic, Major-augmented Ninth Chord',
			2213: 'Diminished-augmented Ninth Chord',
			3113: 'Center-cluster Pentamirror',
			242: 'French-sixth Chord, Messiaen\'s truncated 6',
			1142: 'Bardos\'s, Assymetric Pentamirror',
			332: 'Dominanth-seventh/German-sixth Chord',
			1232: 'Kumoi Pentachord.2',
			2132: 'Augmented-sixth Pentachord.1',
			1322: 'Enigmatic Pentachord.1',
			2222: 'Whole-tone Pentamirror',
			3122: 'Augmented-diminished Ninth Chord',
			1412: 'Balinese Pelog Pentatonic, Korean',
			2312: 'Augmented-sixth Pentachord.2, Indian Hindola, Javan Pentatonic',
			3212: 'Minor-diminished Ninth Chord',
			12212: 'Locrian Hexachord, Suddha Saveriraga',
			21212: 'Super-Locrian Hexamirror',
			2141: 'Indian-Japan Pentatonic',
			1331: 'Persian Pentamirror',
			2231: 'Enigmatic Pentachord.2, Altered Pentatonic',
			3131: 'Lebanese Pentachord, Augmented-minor Chord',
			21131: 'Megha or "Cloud" raga',
			2321: 'Korean, Kumoi Pentachord.1',
			3221: 'Minor Ninth Chord',
			12221: 'Phrygian Hexamirror',
			21221: 'Minor Hexachord',
			13121: 'Gypsy hexatonic',
			22121: 'Melodic-minor Hexachord',
			11411: 'Messiaen\'s 5',
			3311: 'Diminished Pentacluster.2',
			11111111: 'Chromatic Nonamirror',
			333: 'Diminished-seventh Chord',
			1233: 'Diminished Minor-Ninth Chord',
			2133: 'Flat-Ninth Pentachord, Ranjaniraga',
			1323: 'Neapolitan Pentachord.1',
			2223: 'Dominant-ninth,Major-minor, Prometheus Pentamirror',
			2313: 'Neapolitan Pentachord.2',
			11313: 'Schoenberg Anagram Hexachord',
			21213: 'Pyramid',
			111213: 'Debussy\'s Heptatonic',
			2232: 'Natural/Genuine/"Black Key"/Blues Pentatonic, Slendro, Bilahariraga, Quartal Pentamirror, Kausika,Mehga',
			12132: 'Indian Dipaka, Prometheus Neapolitan',
			21132: 'Indian, Blues',
			12222: 'Scriabin\'s Mystic, Prometheus Hexachord',
			21222: 'Dorian Hexachord',
			22122: 'Guidon/Arezzo/Natural/Genuine/Persian Hexachord, Quartal Hexamirror,',
			12312: 'Messiaen\'s truncated 2, Minor-bitonal Hexachord',
			22212: 'Dominanth-11th, Natural/Genuine/Lydian Hexachord',
			121212: 'Gypsy, Moravian Pistalkova (Whistle), Alternating Heptachord.1',
			1111212: 'Blues Octatonic',
			113112: 'Indian, Chromatic inverse',
			221112: 'Tritone Major Heptachord',
			13131: 'Augmented, Messiaen\'s truncated 3, Lendvai\'s, Genus tertium',
			21321: 'Messiaen\'s truncated 2, Petruskka chord, Major-bitonal Hexachord',
			22221: 'Harmonic Hexachord, Augmented-11th, Indian Sviraga',
			112221: 'Neapolitan',
			121221: 'Harmonic Minor, Spanish Gypsy',
			113121: 'Persian, Gypsy, Hungarian, Double Harmonic, Indian Bhairava, Turkish',
			122121: 'Harmonic Major',
			212121: 'Diminished, Alternating Heptachord.2',
			211311: 'Greek Chromatic, Indian',
			221211: 'Modified Blues',
			1113111: 'Messiaen\'s 4',
			222111: 'Enigmatic Heptatonic',
			1122111: 'Enigmatic Octatonic, Free-constructed',
			2211111: 'Blues Octatonic',
			111111111: 'Chromatic Decamirror',
			22222: 'Whole-tone, Messiaen\'s mode 1, Raga Gopriya, Anhemitonic Hexatonic',
			112222: 'Neapolitan, Leading Whole-tone, Combined, Kafenda\'s',
			121222: 'Jazz Minor, Bartok\'s, Aug.13th Heptamirror, Acoustic, Plane-altered, Moravian Podhalska',
			122122: 'Greek, Medieval, Natural/Genuine',
			1211122: 'Spanish Octatonic',
			1112212: 'Greek Complete, Egyptian, Blues, Quartal Octachord, Diatonic Octad',
			1211212: 'Spanish, Major-Minor, Blues',
			11111212: 'Nonatonic Blues',
			1122112: 'Messiaen\'s 6',
			11121112: 'Major-minor Nonatonic, Ramdasi Malhar',
			1212121: 'Diminished, Messiaen\'s 2, Lendvai\'s',
			11211121: 'Diminished Nonachord',
			11211211: 'Messiaen\'s 3, Tsjerepnin',
			111112111: 'Major-minor mixed',
			111121111: 'Messiaen\'s 7',
			1111111111: 'Chromatic Undecamirror',
			11111111111: 'Twelve-tone Chromatic,Dodecamirror',
    	},

    	getChordName: function(notes) {

    		var pitchClasses = _.sortBy(this._getPitchClasses(notes));
    		var intervalKey = this._getIntervalKey(pitchClasses);

    		if (_.has(this.chordTable, intervalKey)) {
    			return this.chordTable[intervalKey];
    		}
    		return 'you invented a chord!';

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