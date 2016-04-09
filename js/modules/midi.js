"use strict";
define(function() {
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
    	}
    };
    return midi;
});