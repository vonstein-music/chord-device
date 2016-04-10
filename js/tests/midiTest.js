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
                    {pitches: [1, 13, 25], expected: [1]},
                    {pitches: [0, 1, 12, 13], expected: [0, 1]},       
                ], function(p){
                    deepEqual(midi._getPitchClasses(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected.join());
                });
            });


            /*var notes = [12, 16, 7]; // {0: 20, 4: 20, 7: 20}
            var notes = [11, 3, 7]; // {3: 16, 7: 20, 11: 16}
            var notes = [13, 3, 7]; // {1: 6, 3: 13, 7: 13}*/

            test('getRoot works', function() {

                _.each(
                [
                    {pitches: [0, 3, 7], expected: 'C', chord: 'c minor'},
                    {pitches: [0, 4, 7], expected: 'C', chord: 'c major'},
                    {pitches: [4, 7, 12], expected: 'C', chord: 'c major 1. inversion'},
                    {pitches: [7, 12, 16], expected: 'C', chord: 'c major 2. inversion'},
                    {pitches: [12, 16, 19], expected: 'C', chord: 'c major 3. inversion (same chord)'},
                    {pitches: [1, 4, 8], expected: 'C#', chord: 'c# minor'},
                    {pitches: [2, 5, 9], expected: 'D', chord: 'd minor'},                    
                    {pitches: [0, 4, 7, 11], expected: 'C', chord: 'maj7'},
                    {pitches: [0, 3, 7, 10], expected: 'C', chord: 'min7'},
                    {pitches: [0, 4, 7, 10], expected: 'C', chord: 'dom7'},
                    {pitches: [0, 3, 6, 9], expected: 'C', chord: 'dim7'},
                    {pitches: [0, 4, 8], expected: 'C', chord: 'c aug'},
                    {pitches: [5, 9, 13], expected: 'C#', chord: 'c# aug first inversion'},

                    //{pitches: [0, 4, 7, 10, 15], expected: 'C', chord: 'hendrix chord'},
                    //{pitches: [1, 5, 8, 11, 16], expected: 'C#', chord: 'hendrix chord'},
                    {pitches: [0, 4, 7, 11, 14], expected: 'C', chord: 'maj 9'},


                    //{pitches: [2, 6, 9, 12, 17], expected: 'D', chord: 'hendrix chord'},
                    //{pitches: [3, 7, 10, 13, 18], expected: 'D#', chord: 'hendrix chord'},

                ], function(p){
                    equal(midi.getRoot(p.pitches), p.expected, p.pitches.join() + ' has root ' + p.expected);
                });
            });

            
        };
        return {run: run}
    }
);