"use strict";
define(
	['data/commonChordsLookupTable', 'data/setsLookupTable', 'data/scales'],
	function(commonChordsLookupTable, setsLookupTable, scales) {
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

		_getOrderedPitchesStartingAtZero: function (pitches) {
			var orderedPitches = _.sortBy(pitches)
			var lowestPitch = orderedPitches[0];
			return _.map(orderedPitches, function(pitch){
				return (pitch - lowestPitch); 
			});
		},

		_getIntervalSetStartingAtZero: function(pitches) {
		    var lowestPitch = pitches[0];
		    return _.map(pitches, function(pitch){
		        return (pitch - lowestPitch + 144)%12;
		    });
		},
		// not used
		_getIntervalSetStartingAtZeroKeepOrder: function(pitches) {

			var orderedPitches = _.sortBy(pitches);
		    var lowestPitch = orderedPitches[0];
		    return _.map(pitches, function(pitch){
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
    		//console.log('orderedPitches', orderedPitches);

    		var startingAtZero = this._getIntervalSetStartingAtZero(orderedPitches);    		
    		//console.log('startingAtZero', startingAtZero);

    		var commonChordsLookupKey = '_' + this._getSickodecimal(startingAtZero);
    		

			// 047  4-7-12
    		if (_.has(commonChordsLookupTable, commonChordsLookupKey)) {

			//console.log(commonChordsLookupTable[commonChordsLookupKey]);

    			var chordNames = '';
    			var that = this;
    			_.each(commonChordsLookupTable[commonChordsLookupKey], function(possibleChord){ 
    			// @todo: remove redundant names, Augmented Triad, Augmented Triad (1st inv), Augmented Triad (2nd inv)
    			// @todo: nicht-inversen an erster stelle
    			    chordNames += ', ' + possibleChord[0] + that._getInversionText(possibleChord[1]);
    			});

    			chordNames = chordNames.substr(2);


    			//console.log(commonChordsLookupTable[commonChordsLookupKey]);
    			// find root
    			var semitonesTransposed = orderedPitches[0];
    			//console.log('semitonesTransposed', semitonesTransposed);
    			//console.log('startingAtZero', startingAtZero);



    			//var actualRootNoteIfNotInversion = 

    			var rootNoteName = this.getNoteNameForPitch(orderedPitches[0]);
    			//console.log(rootNoteName);
    			return {
    				rootNoteName: rootNoteName, 
    				chordNames: chordNames.split(', ')
    			}; // @todo return multiple names if there





    			//console.log('gefunden: ', commonChordsLookupTable[commonChordsLookupKey]);

    			//
    			if (commonChordsLookupTable[commonChordsLookupKey][1]) {
    				console.log('------------->', commonChordsLookupTable[commonChordsLookupKey]);
    			}


    		} else {
    			console.log('startingAtZero', startingAtZero);
    			console.log('commonChordsLookupKey', commonChordsLookupKey);
    			console.log('nicht gefunden: ', orderedPitches, commonChordsLookupKey);
    		}

    		var setLookupKey = '_' + this._getSickodecimal(this._getIntervalVector(notes));

    			console.log('setLookupKey: ', setLookupKey);

    		if (_.has(setsLookupTable, setLookupKey)) {

    			    			console.log('found setLookupKey: ', setLookupKey);


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

    			if (_.has(setsLookupTable[setLookupKey], pitchClassesKey)) {

    				var inversionNumber = this._getInversionNumber(pitchClassesFromOrderedNotes, pitchClassesStartingAtZero);

					return {
    				rootNoteName: rootNoteName, 
    				chordNames: (setsLookupTable[setLookupKey][pitchClassesKey] + this._getInversionText(inversionNumber)).split(', ')
    				};
    				//return [(setsLookupTable[setLookupKey][pitchClassesKey] + this._getInversionText(inversionNumber))];

    			} else {
    				console.log('did not find pitchClassesKey: ' + pitchClassesKey);
    				// return first key
    				for(var key in setsLookupTable[setLookupKey]) break;

    					    				console.log(setsLookupTable[setLookupKey][key]);

    				return {
    				rootNoteName: rootNoteName, 
    				chordNames: setsLookupTable[setLookupKey][key].split(', ')
    				};
    				//return [setsLookupTable[setLookupKey][key]];
    			}


    			//return setsLookupTable[intervalVector][0];
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