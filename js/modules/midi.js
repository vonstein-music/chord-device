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
    	getChordName: function(notes) {
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
					console.log(pitchValue, comparedPitchValue, interval, weightingPoints[interval], score);

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

			console.log(pitches);
			console.log(ratings);

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
			console.log('unclear, return the lowest pitch of all the winners');

			var winners = _.filter(ratings, ['score', highestScore]);



			var lowestPitchAmongWinners = _.sortBy(winners, 'pitch')[0];

			//console.log(_.sortBy(winners, 'pitch')[0]);

			return this._getNoteName(lowestPitchAmongWinners.pitch);
    	}
    };
    return midi;
});