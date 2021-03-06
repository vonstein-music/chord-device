/*
// http://www.secretsofsongwriting.com/2014/10/29/5-lydian-mode-chord-progressions-and-how-they-work/
// http://www.musictheory.net/calculators/analysis
// https://www.musictheory.net/lessons/49

getScaleDegree: only makes sense for 7-pitchclasses-scales



*/


"use strict";
define(
	['data/commonChordsLookupTable', 'data/setsLookupTable', 'data/diatonicScales'],
	function(commonChordsLookupTable, setsLookupTable, diatonicScales) {
    var midi = {

    	config: {
    		keyPitch: 0, // 0 - 11
    		scaleIndex: 0
    	},

    	noteNamesLookup: {
    		flat: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
    		sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    	},

    	// for little poppy
    	getPitchesOfChordForScaleDegree: function(scaleDegree, cardinality, keyPitch, scalePitches){

			var pitchesOfChord = [];

			_.times(cardinality, function(index){

				var positionInScale = (scaleDegree - 1) + 2*index;
				var safePositionInScale = positionInScale % 7;
				var pitchFromScale = scalePitches[safePositionInScale];

				if (positionInScale > 6) {
					pitchFromScale += 12;
				}

				pitchesOfChord.push(pitchFromScale + keyPitch);
			});

			return pitchesOfChord;
    	},

    	// for little poppy
    	getNextDegree: function(currentDegree, selectedScaleIndex){
			
			var progressionOptions = [
				    // Major
				    [
				    	[1, 2, 3, 4, 5, 6, 7], // first scale degree goes anywhere
				    	[5, 7, 5, 5], // 2nd scale degree
				    	[6],
				    	[5, 7, 5, 5],
				    	[1],
				    	[2, 4, 2, 2],
				    	[1, 3]
				    ],
				    // Natural Minor
				    [
				    	[1, 2, 3, 4, 5, 6, 7],
				    	[5, 7, 5, 5],
				    	[4, 6, 6],
				    	[1, 2, 5, 7, 1, 5, 5],
				    	[1, 6, 1],
				    	[2, 4, 5, 2],
				    	[1, 3],
				    ]
			];

			var options = progressionOptions[selectedScaleIndex][currentDegree - 1];
			return _.shuffle(options)[0];
		},	

		getRomanNumeral: function(scaleDegree, primeForm, orderedPitchClassesStartingAtZero, inversionNumber) {
			// @todo figured bass notation

			var numerals = ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
			var romanNumeral = numerals[scaleDegree];

			switch (primeForm.join('').substring(0, 3)) {

				case '036': // diminished
					romanNumeral += '°';
					break;

				case '047': // major
					romanNumeral = romanNumeral.toUpperCase();
					break;

				case '048': // augmented
					romanNumeral = romanNumeral.toUpperCase() + '+';
					break;
			}

			// superscript number
			if (orderedPitchClassesStartingAtZero.length > 3) {

				var intervalInSemitones = _.last(orderedPitchClassesStartingAtZero);
				var semitonesToIntervalName = [
					1, //0,
					2, //1,
					2, //2,
					3, //3,
					3, //4,
					4, //5,
					'd5/A4', //6, Tritone, no number
					5, //7,
					6, //8,
					6, //9,
					7, //10,
					7, //11,
					8, //12
					9, //13,
					9, //14,
					10, //15,
					10, //16,
					11, //17,
					'd12/A11', //18,
					12, //19,
					13, //20,
					13, //21,
					14, //22,
					14, //23,
					15, //24					
				];

				romanNumeral += semitonesToIntervalName[intervalInSemitones];
			}

			var inversions = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
			romanNumeral += inversions[inversionNumber];

			return romanNumeral;
		},

		getScaleDegree: function(pitch, keyPitch, orderedScalePitches) {

			// add keypitch to all in scale, then look for position of pitch

			// or: subtract keypitch from pitch + 12, take modulo 12 and then look for pos
			var normalizedPitch = (pitch - keyPitch + 12) % 12;

			return _.indexOf(orderedScalePitches,  normalizedPitch) + 1;
		},




		// in: 0 4 7 11 (already in prime form)
		// [0, 2, 4, 5, 7, 9, 11]
		// to check if the chord has all the notes in the scale 
		/*isPrimeFormInScale: function(primeForm, orderedScalePitches) {
			var inPrimeFormButNotInScale = _.difference(
				primeForm, 
				orderedScalePitches
				//this._getPitchesForKeyAndScale(keyPitch, orderedScalePitches)
			);
			return inPrimeFormButNotInScale.length === 0;
		},*/

		hasPitchNotInKey: function(playedPitchClasses, keyPitch, orderedScalePitches){
			//console.log(playedPitchClasses, keyPitch, orderedScalePitches);
			var keyPitches = this._getPitchesForKeyAndScale(keyPitch, orderedScalePitches);
			//console.log('playedPitchClasses', playedPitchClasses);

			//console.log('keyPitches', keyPitches);
			var pitchesPlayedButNotInScale = _.difference(playedPitchClasses, keyPitches);
			//console.log('pitchesPlayedButNotInScale', pitchesPlayedButNotInScale);

			//console.log(pitchesPlayedButNotInScale.length === 0);
			return pitchesPlayedButNotInScale.length > 0;
		},

		_isScaleSelected: function(){
			return this.config.scaleIndex === -1;
		},

		getDiatonicFunction: function(playedPitchesOrdered, keyPitch, scalePitches){

			var playedPitchClasses = this._getPitchClasses(playedPitchesOrdered);

			scalePitches = scalePitches || diatonicScales[this.config.scaleIndex][1];
			keyPitch = keyPitch || this.config.keyPitch; 			
			
			if (this.hasPitchNotInKey(playedPitchClasses, keyPitch, scalePitches)) {
				//console.log();
				return {
					scaleDegree: 'chord not in scale', 
					functionName: 'chord not in scale'
				};
			}
			
			var scaleDegree = this.getScaleDegree(playedPitchesOrdered[0], keyPitch, scalePitches);
			var simplifiedNaming = ['', 'Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone'];
			var selectedScaleName = diatonicScales[this.config.scaleIndex][0];

			if (selectedScaleName === 'Natural Minor') {
				simplifiedNaming[7] = 'Subtonic';
			}

			return {scaleDegree: scaleDegree, functionName: simplifiedNaming[scaleDegree]};
		},

		_getPitchesForKeyAndScale: function(keyPitch, scalePitches){
			
			return _.map(scalePitches, function(pitch){
				return (pitch + keyPitch) % 12;
			});
		},

    	_getNoteName: function(pitch, isFlat) {
    		var suffix = isFlat ? 'flat' : 'sharp';
    		return this.noteNamesLookup[suffix][pitch%12];
    	},

    	getNoteNameForPitchWithOctave: function(pitch, isFlat) {
    		return this._getNoteName(pitch, isFlat) + (Math.floor(pitch/12) - 2);
    	},

    	getNoteNameForPitch: function(pitch, isFlat) {
    		return this._getNoteName(pitch, isFlat);
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

		getFortePrimeForm: function(notes) {
			var orderedPC = _.sortBy(this._getPitchClasses(notes));
			var normalForm = this._getNormalForm(orderedPC);
			var normalFormInvertedSet = this._getNormalForm(this._getInvertedSet(orderedPC));

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

		_getOrderedPitchesStartingAtZero: function (pitches) {
			var orderedPitches = _.sortBy(pitches)
			var lowestPitch = orderedPitches[0];
			return _.map(orderedPitches, function(pitch){
				return (pitch - lowestPitch); 
			});
		},

		_getPitchClassesInPlayedOrderTransposedDown: function(pitches) {
		    var lowestPitch = pitches[0];
		    return _.map(pitches, function(pitch){
		        return (pitch - lowestPitch + 144)%12;
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

		getOutOfScalePitches: function(playedPitches, scalePitches) {
			return _.difference(playedPitches, scalePitches);
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

		// prime, not forte prime
		_getPrimeFromNormalForm: function(normalForm) {
			var semitonesToTransposeDown = normalForm[0];
			return _.map(normalForm, function(value, index){
				var currentTransposedDown = value - semitonesToTransposeDown;
				if (currentTransposedDown < 0) {
					return currentTransposedDown + 12;
				}
				return currentTransposedDown;
			});
		},

		_getDirectedIntervalVector: function(orderedPitchClasses) {
			var len = orderedPitchClasses.length;
			return _.map(orderedPitchClasses, function(value, index){
				var intervalToTheNext = orderedPitchClasses[(index + 1) % len] - orderedPitchClasses[index];
				if (intervalToTheNext < 0) {
					return intervalToTheNext + 12;
				}
				return intervalToTheNext;
			});
		},

    	getChordInfo: function(notes) {

    		var foundChords = [];
    		var fortePrimeForm = this.getFortePrimeForm(notes);
    		var playedPitchesOrdered = _.sortBy(notes);
			var pitchClassesFromOrderedNotes = this._getPitchClasses(_.sortBy(notes));
			var pitchClassesStartingAtZero = this._getPitchClassesStartingAtZero(
				_.sortBy(pitchClassesFromOrderedNotes)
			);
			var orderedPC = _.sortBy(this._getPitchClasses(notes));
			var normalForm = this._getNormalForm(orderedPC);
			var primeForm = this._getPrimeFromNormalForm(normalForm)
    		var consonanceRating = this.getConsonanceRating(notes);
    		var startingAtZero = this._getPitchClassesInPlayedOrderTransposedDown(playedPitchesOrdered);    		
    		var commonChordsLookupKey = '_' + this._getSickodecimal(startingAtZero);
    		
    		if (_.has(commonChordsLookupTable, commonChordsLookupKey)) { // hit in common chords table

				var lowestInputPitch = playedPitchesOrdered[0];
				var rootNoteName = this.getNoteNameForPitch(playedPitchesOrdered[0]);
    			var that = this;

    			// loop chords that were found
    			_.each(commonChordsLookupTable[commonChordsLookupKey], function(possibleChord){

    				var foundChord = {
    					chordName: possibleChord[0], // take the first in the list that is returned (maybe send all to m4l)
    					rootNotePitch: lowestInputPitch,
    					rootNoteName: rootNoteName,
    					inversionNumber: possibleChord[1],
    					inversionText: that._getInversionText(possibleChord[1]),
    					consonanceRating: consonanceRating,
    					forte: fortePrimeForm
    				};

    				if (that._isScaleSelected) { // get diatonic stuff

    					var diatonicFunction = that.getDiatonicFunction(playedPitchesOrdered);

    					foundChord.scaleDegree = diatonicFunction.scaleDegree;
    					foundChord.diatonicFunctionName = diatonicFunction.functionName;
    					
    					if (foundChord.scaleDegree !== 'chord not in scale') { // get roman numberal

    						var playedPitchClasses = that._getPitchClasses(playedPitchesOrdered);

							var orderedPitchClassesStartingAtZero = that._getPitchClassesStartingAtZero(
									_.sortBy(playedPitchClasses)
								);

							var romanNumeral = that.getRomanNumeral(
									diatonicFunction.scaleDegree,
									primeForm,
									orderedPitchClassesStartingAtZero, 
									possibleChord[1]
								);

							foundChord.romanNumeral = romanNumeral;
    					}
    				}

    				foundChords.push(foundChord);
    			});

    			return foundChords;
    		}

    		var setLookupKey = '_' + this._getSickodecimal(this._getIntervalVector(notes));

    		if (_.has(setsLookupTable, setLookupKey)) {

				var primeFormKey = '_' + this._getSickodecimal(primeForm);

    			if (_.has(setsLookupTable[setLookupKey], primeFormKey)) { // hit in sets

    				var inversionNumber = this._getInversionNumber(pitchClassesFromOrderedNotes, pitchClassesStartingAtZero);
    				var guessedRootPitch = this.guessRootPitch(notes);

    				var foundChord = {
    					chordName: setsLookupTable[setLookupKey][primeFormKey].split(', ')[0], // first of commaseparated list @todo make arrays in set table
    					rootNotePitch: guessedRootPitch,
    					rootNoteName: this._getNoteName(guessedRootPitch),
    					inversionNumber: inversionNumber,
    					inversionText: this._getInversionText(inversionNumber),
    					consonanceRating: consonanceRating,
    					forte: fortePrimeForm
    				};

    				foundChords.push(foundChord);

					return foundChords;

    			} else {
    				// return first key
    				for(var key in setsLookupTable[setLookupKey]) break;

    				return {
	    				rootNoteName: this.guessRootPitch(notes), 
	    				chordNames: setsLookupTable[setLookupKey][key].split(', ')
    				};
    			}
    		}
    		return foundChords; // empty array
    	},
    	guessRootPitch: function(notes) {

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
			var ratings = [];
			var countOfScoreMap = {};
			var highestScore = 0;

			_.each(pitches, function(pitchValue){

				var score = 0;
				_.each(pitches, function(comparedPitchValue){
					var interval = Math.abs(pitchValue - comparedPitchValue);
					score += weightingPoints[interval];
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

			// unique winner
			if (countOfScoreMap[highestScore] === 1) {
				var winnerPitch = _.find(ratings, ['score', highestScore]);
				return winnerPitch.pitch;
			}

			// all pitches have the same (highest) count, return lowest note
			if (countOfScoreMap[highestScore] === pitches.length) {
				return pitches[0];
			}

			// unclear, return the lowest pitch of all the winners				
			var winners = _.filter(ratings, ['score', highestScore]);
			var lowestPitchAmongWinners = _.sortBy(winners, 'pitch')[0];

			return lowestPitchAmongWinners.pitch;
    	}
    };
    return midi;
});