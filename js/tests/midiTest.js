"use strict";
define(
    ['modules/midi'],
    function(midi) {
        var run = function() {
            test('getNoteNameForPitch returns expected values', function() {

                var isFlat = true;

                equal(midi.getNoteNameForPitch(0, isFlat), 'C-2', '');
                equal(midi.getNoteNameForPitch(1, isFlat), 'Db-2', '');
                equal(midi.getNoteNameForPitch(2, isFlat), 'D-2', '');
                equal(midi.getNoteNameForPitch(3, isFlat), 'Eb-2', '');
                equal(midi.getNoteNameForPitch(4, isFlat), 'E-2', '');
                equal(midi.getNoteNameForPitch(5, isFlat), 'F-2', '');
                equal(midi.getNoteNameForPitch(6, isFlat), 'Gb-2', '');
                equal(midi.getNoteNameForPitch(7, isFlat), 'G-2', '');
                equal(midi.getNoteNameForPitch(8, isFlat), 'Ab-2', '');
                equal(midi.getNoteNameForPitch(9, isFlat), 'A-2', '');
                equal(midi.getNoteNameForPitch(10, isFlat), 'Bb-2', '');
                equal(midi.getNoteNameForPitch(11, isFlat), 'B-2', '');
                equal(midi.getNoteNameForPitch(12, isFlat), 'C-1', '');

                equal(midi.getNoteNameForPitch(127, isFlat), 'G8', '');

                isFlat = false;
                equal(midi.getNoteNameForPitch(1, isFlat), 'C#-2', '');
                equal(midi.getNoteNameForPitch(3, isFlat), 'D#-2', '');
                equal(midi.getNoteNameForPitch(6, isFlat), 'F#-2', '');
                equal(midi.getNoteNameForPitch(8, isFlat), 'G#-2', '');
                equal(midi.getNoteNameForPitch(10, isFlat), 'A#-2', '');
            });
        };
        return {run: run}
    }
);