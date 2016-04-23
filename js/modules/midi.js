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

    	/*chordFunctions = [
				{func: 'Tonic', name: 'Tonic', major: 'I', minor: 'i', chordTypeMajor: [0,4,7]},
				{func: 'Supertonic', name: 'Subdominant parallel', major: 'ii', minor: 'ii°'},
				{func: 'Mediant', name: 'Dominant parallel/Tonic counter parallel', major: 'iii', minor: 'III'},
				{func: 'Subdominant', name: 'Subdominant', major: 'IV', minor: 'iv'},
				{func: 'Dominant', name: 'Dominant', major: 'V', minor: 'V'},
				{func: 'Submediant', name: 'Tonic parallel', major: 'vi', minor: 'VI'},
				{func: 'Leading', name: 'incomplete Dominant seventh', major: 'vii°', minor: 'VII'},
		],*/

		/*_getRomanNumeral: function(isMinor) {
			var isMinor = isMinor || false;
			return 
		},*/

		// e.g. played G in key C in major scale:
		//  in: pitch 7, keyPitch 0, orderedScalePitches [0, 2, 4, 5, 7, 9, 11]
		// should return 5

		// only makes sense for 7-pitchclasses-scales
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
// http://www.musictheory.net/calculators/analysis
//https://www.musictheory.net/lessons/49
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

		getDiatonicFunction: function(playedPitchesOrdered){
			var playedPitchClasses = this._getPitchClasses(playedPitchesOrdered);
			var scalePitches = diatonicScales[this.config.scaleIndex][1];
			var keyPitch     = this.config.keyPitch; 			
			
			if (this.hasPitchNotInKey(playedPitchClasses, keyPitch, scalePitches)) {
				//console.log();
				return '?';
			}
			
			var scaleDegree = this.getScaleDegree(playedPitchesOrdered[0], keyPitch, scalePitches);

			/*if (scaleDegree === 0) {
				return '';
				https://en.wikipedia.org/wiki/Mode_(music)
			}*/

			var simplifiedNaming = ['', 'Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone'];

			var selectedScaleName = diatonicScales[this.config.scaleIndex][0];
			if (selectedScaleName === 'Natural Minor') {
				simplifiedNaming[7] = 'Subtonic';
			}

			/* @todo: 

https://en.wikipedia.org/wiki/Roman_numeral_analysis


			Uppercase Roman numeral	Major triad	I
			Lowercase Roman numeral	Minor triad	i
			Superscript °	Diminished triad	i°
			Superscript + (sometimes x[citation needed])	Augmented triad	I+
			Superscript number	added note	V7, I6
			Two or more numbers	figured bass notation	V4 - 3, I6
			4 (equivalent to Ic)
			Lowercase b	First inversion	Ib
			Lowercase c	Second inversion	Ic
			Lowercase d	Third inversion	V7d

			uppercase for major chords
			lowercase for minor chords
			° for diminished
			+ for augmented

			*/

			return {scaleDegree: scaleDegree, name: simplifiedNaming[scaleDegree]};
		},



		/*isPrimeFormInScale: function(primeForm, rootPitch, keyPitch, orderedScalePitches) {
			
			var playedPitches = _.map(primeForm, function(pitch){
				return pitch + rootPitch%12;
			});
			var inPrimeFormButNotInScale = _.difference(
				primeForm, 
				orderedScalePitches
				this._getPitchesForKeyAndScale(keyPitch, orderedScalePitches)
			);
			return inPrimeFormButNotInScale.length === 0;
		},*/

		_getPitchesForKeyAndScale: function(keyPitch, scalePitches){
			
			return _.map(scalePitches, function(pitch){
				return (pitch + keyPitch) % 12;
			});
		},

		//getScaleDegreeNameFromScaleDegree:

		getNumeralFromScaleDegree: function(){

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

		getChordFunction: function(keyIndex, scaleIndex, rootNotePitch, isMinorChord){

			/*
			@todo

			- herausfinden welche akkordtypen welche funktionen wahrnehmen können
			- herausfinden ob das pauschal so festgelegt werden kann (unabhängig vom kontext/vorher gespielten noten)
			- dom7, diminshed, major, minor etc. berücksichtigen
			- wie verhält es sich mit 9th, 11th etc.?

			*/
			var keyIndex = keyIndex || 0;		// default C
			var scaleIndex = scaleIndex || 0; 	// default major
			var isMinorChord = isMinorChord || 0;

			var chordMode = isMinorChord ? 'min' : 'maj';

			var scale = diatonicScales[scaleIndex][1];

			var positionInScale = _.indexOf(currentScale, rootNotePitch);




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

		_getPrimeFromDirectedIntervalVector: function(directedIntervalVector) {
			

			
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
    			    chordNames += ', ' + possibleChord[0] + that._getInversionText(possibleChord[1]);
    			});

    			chordNames = chordNames.substr(2);


    			//console.log(commonChordsLookupTable[commonChordsLookupKey]);
    			// find root
    			var lowestInputPitch = orderedPitches[0];
    			//console.log('lowestInputPitch', lowestInputPitch);
    			//console.log('startingAtZero', startingAtZero);



    			//var actualRootNoteIfNotInversion = 

    			var rootNoteName = this.getNoteNameForPitch(orderedPitches[0]);
    			//console.log(rootNoteName);



    			return {
    				rootNoteName: rootNoteName, 
    				chordNames: chordNames.split(', '),
    				diatonicFunction: this.getDiatonicFunction(orderedPitches)
    			}; // @todo return multiple names if there

    			//console.log('gefunden: ', commonChordsLookupTable[commonChordsLookupKey]);

    			//
    			if (commonChordsLookupTable[commonChordsLookupKey][1]) {
    				console.log('------------->', commonChordsLookupTable[commonChordsLookupKey]);
    			}


    		} else {
    			//console.log('startingAtZero', startingAtZero);
    			//console.log('commonChordsLookupKey', commonChordsLookupKey);
    			//console.log('nicht gefunden: ', orderedPitches, commonChordsLookupKey);
    		}

    		var setLookupKey = '_' + this._getSickodecimal(this._getIntervalVector(notes));

    			//console.log('setLookupKey: ', setLookupKey);

    		if (_.has(setsLookupTable, setLookupKey)) {

    			    			//console.log('found setLookupKey: ', setLookupKey);


    			//var notesOrdered = _.sortBy(notes);

    			var fortePrimeForm = this.getFortePrimeForm(notes);
    			//var fortePrimeFormKey = this._getSickodecimal(primeForm);

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
    			//var pitchClassesKey = '_' + this._getSickodecimal(pitchClassesStartingAtZero);

				var orderedPC = _.sortBy(this._getPitchClasses(notes));
				var normalForm = this._getNormalForm(orderedPC);
				var primeForm = this._getPrimeFromNormalForm(normalForm)
				var primeFormKey = '_' + this._getSickodecimal(primeForm);

				//var normalFormInvertedSet = this._getPitchClassesStartingAtZero(this._getNormalForm(this._getInvertedSet(orderedPC)));

    			//console.log('[' + notes.join(',') + ']: setLookupKey: ' + setLookupKey + ', normalForm: ' + normalForm + ', normalFormInvertedSet: ' + normalFormInvertedSet + ', pitchClassesKey: ' + pitchClassesKey + ', primeFormKey: ' + primeFormKey);

    			if (_.has(setsLookupTable[setLookupKey], primeFormKey)) {

    				var inversionNumber = this._getInversionNumber(pitchClassesFromOrderedNotes, pitchClassesStartingAtZero);

					return {
    				rootNoteName: this.getRoot(notes), 
    				chordNames: (setsLookupTable[setLookupKey][primeFormKey] + this._getInversionText(inversionNumber)).split(', ')
    				};
    				//return [(setsLookupTable[setLookupKey][pitchClassesKey] + this._getInversionText(inversionNumber))];

    			} else {
    				//console.log('did not find primeFormKey: ' + primeFormKey);
    				// return first key
    				for(var key in setsLookupTable[setLookupKey]) break;

    					    				console.log(setsLookupTable[setLookupKey][key]);

    				return {
	    				rootNoteName: this.getRoot(notes), 
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
				//console.log(winnerPitch);
				//console.log('unique winner');
				return this._getNoteName(winnerPitch.pitch);
			}

			// all pitches have the same (highest) count, return lowest note
			if (countOfScoreMap[highestScore] === pitches.length) {
				//console.log('all same, return lowest');
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