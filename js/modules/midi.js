"use strict";
define(function() {
//console.log(_.VERSION);



/**


TODO NEXT

	- DATAPROVIDERS (PARAMETRIZE)
	- TESTS UMSCHREIBEN
	- FIND ROOT FUNKTION
*/


	//console.log(_);
	//console.log(_.uniq([1,1,2,3]));
    var midi = {    	
    	_getNoteName: function(pitch, isFlat) {

    		var noteNames = {
    			flat: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
    			sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    		};
    		var suffix = isFlat ? 'flat' : 'sharp';
    		return noteNames[suffix][pitch % 12];
    	},
    	getNoteNameForPitch: function(pitch, isFlat) {
    		return this._getNoteName(pitch, isFlat) + (Math.floor(pitch/12) - 2);
    	},
    	getPitchClasses: function(notes) {
    		//console.log(_.VERSION);
    		return _.uniqBy(notes, function(note){
    			return note%12;
    		});
    	},
    	getRoot: function(notes) {
    		//console.log(_.sortBy(_.uniqnotes));

    		/*
			- find the note with most musical intervals above it
				

    		*/

    		//var score = _.map(notes, );

    	}
    };
    return midi;
});