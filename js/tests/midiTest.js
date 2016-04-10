"use strict";
define(
    ['modules/midi'],
    function(midi) {
        var run = function() {

            test('getNoteNameForPitch for', function() {
                _.each(
                [
                    {pitch: 0, isFlat: 1, expected: 'C-2'},
                    {pitch: 0, isFlat: 1, expected: 'C-2'},
                    {pitch: 1, isFlat: 1, expected: 'Db-2'},
                    {pitch: 2, isFlat: 1, expected: 'D-2'},
                    {pitch: 3, isFlat: 1, expected: 'Eb-2'},
                    {pitch: 4, isFlat: 1, expected: 'E-2'},
                    {pitch: 5, isFlat: 1, expected: 'F-2'},
                    {pitch: 6, isFlat: 1, expected: 'Gb-2'},
                    {pitch: 7, isFlat: 1, expected: 'G-2'},
                    {pitch: 8, isFlat: 1, expected: 'Ab-2'},
                    {pitch: 9, isFlat: 1, expected: 'A-2'},
                    {pitch: 10, isFlat: 1, expected: 'Bb-2'},
                    {pitch: 11, isFlat: 1, expected: 'B-2'},
                    {pitch: 12, isFlat: 1, expected: 'C-1'},

                    {pitch: 127, isFlat: 1, expected: 'G8'},

                    {pitch: 1, isFlat: 0, expected: 'C#-2'},
                    {pitch: 3, isFlat: 0, expected: 'D#-2'},
                    {pitch: 6, isFlat: 0, expected: 'F#-2'},
                    {pitch: 8, isFlat: 0, expected: 'G#-2'},
                    {pitch: 10, isFlat: 0, expected: 'A#-2'},

                ], function(p){
                    equal(
                        midi.getNoteNameForPitch(p.pitch, p.isFlat), 
                        p.expected,
                        '"' + p.pitch + '" (isFlat ' + p.isFlat + ') equals: "' + p.expected + '"'
                    );
                });
            });

            test('getPitchClasses works', function() {
                _.each(
                [
                    {pitches: [1, 1, 2, 3], expected: [1, 2, 3]},
                    {pitches: [1, 2, 3], expected: [1, 2, 3]},
                ], function(p){
                    deepEqual(midi.getPitchClasses(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected.join());
                });
            });

            test('getRoot works', function() {
                _.each(
                [
                    {pitches: [0, 3, 7], expected: 'C', chord: 'c minor'},
                    {pitches: [0, 4, 7], expected: 'C', chord: 'c major'},
                    {pitches: [4, 7, 12], expected: 'C', chord: 'c major 1. inversion'},
                    {pitches: [7, 12, 16], expected: 'C', chord: 'c major 2. inversion'},
                ], function(p){
                    equal(midi.getRoot(p.pitches), p.expected, p.pitches.join() + ' has root ' + p.expected);
                });
            });

            
        };
        return {run: run}
    }
);