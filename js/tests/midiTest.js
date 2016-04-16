"use strict";
define(
    ['modules/midi'],
    function(midi) {
        var run = function() {

            test('getPrimeForm works', function() {
                _.each(
                [
                    {pitches: [0,1], expected: '01'},
                    {pitches: [0,1,2], expected: '012'},

                    {pitches: [0,1,2,3,4,5], expected: '012345'},
                    {pitches: [3,4,5,6,7,8], expected: '012345'},

                    {pitches: [3,7,11], expected: '048'},


                    {pitches: [0,4,7], expected: '037'},
                    {pitches: [0,7,10], expected: '025'},
                    
                    {pitches: [0,3,7,10,11], expected: '03458'},
                    {pitches: [1,3,7,10,11], expected: '02458'},

                    {pitches: [1,3,7,10,11, 13, 22], expected: '02458'},

                ], function(p){
                    deepEqual(midi.getPrimeForm(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });

            /*test('_getNormalForm works', function() {
                _.each(
                [
                    {pitches: [8,0,4,6], expected: [0, 2, 4, 8]},     
                    {pitches: [0,2,6], expected: '010101'},
                    {pitches: [0,2,3,6], expected: '112101'},
                    {pitches: [4,6,0,1,3], expected: '223111'},
                    {pitches: [0,1,2,4,5,8], expected: '323421'},
                    //{pitches: [0,2,3,4,6], expected: '223111'},
                    //{pitches: [0,1,2,4,6], expected: [2,2,3,1,1,1]},     
                ], function(p){
                    deepEqual(midi._getNormalForm(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected.join());
                });
            });*/

           /* test('_getTnSetClass works', function() {
                _.each(
                [
                    {pitches: [5, 2, 11, 3, 9], expected: '100011'},     

                    //{pitches: [0,2,3,4,6], expected: '223111'},
                    //{pitches: [0,1,2,4,6], expected: [2,2,3,1,1,1]},     
                ], function(p){
                    deepEqual(midi._getTnSetClass(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });*/

/*
            test('_getIntervalVector works', function() {
                _.each(
                [
                    {pitches: [2, 3, 9], expected: '100011'},     
                    {pitches: [0,2,6], expected: '010101'},
                    {pitches: [0,2,3,6], expected: '112101'},
                    {pitches: [4,6,0,1,3], expected: '223111'},
                    {pitches: [0,1,2,4,5,8], expected: '323421'},
                    //{pitches: [0,2,3,4,6], expected: '223111'},
                    //{pitches: [0,1,2,4,6], expected: [2,2,3,1,1,1]},     
                ], function(p){
                    deepEqual(midi._getIntervalVectorString(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });

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
            });*/



            /*test('getIntervalKey works', function() {
                _.each(
                [
                    {pitches: [1, 2, 4], expected: '12'},
                    {pitches: [1, 3], expected: '2'},
                    {pitches: [0, 4, 6, 10], expected: '242'},



                ], function(p){
                    equal(midi._getIntervalKey(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });*/

            /*test('getChordName works', function() {
                _.each(
                [
                    {pitches: [0, 3, 6], expected: 'Diminished Chord'},
                    {pitches: [3, 6, 9], expected: 'Diminished Chord'},
                    {pitches: [0, 3, 7], expected: 'Minor Chord'},
                    {pitches: [0, 4, 7], expected: 'Major Chord'},
                    {pitches: [4, 7, 12], expected: 'Major Chord'},
                    {pitches: [0, 4, 7, 12, 24], expected: 'Major Chord'},
                    {pitches: [0, 3, 7, 10], expected: 'Minor-seventh Chord'},                     
                    {pitches: [0, 3, 6, 10], expected: 'Half-diminished Seventh Chord'}, 

                    {pitches: [0, 3, 7, 11, 14], expected: 'Minor-major Ninth Chord'}, // 3 4 4 3 nö, 1 4 8 0 3 -> 01348 -> 1 2 1 4
                    {pitches: [0, 3, 7, 10, 14], expected: 'Major-Ninth Chord'}, // 2 5 9 0 4, 0 2 4 5 9, 1 2 1 4


                    // +3: 3 6 10 13 15 -> 3 6 10 1

                    // 1 4 8 11 15 -> 1 4 8 11 3 -> 1 3 4 8 11 -> 2 1 4 3

                    //{pitches: [0, 4, 6, 10], expected: 'Dominant seventh flat five chord, Seven Flat Five'}, // 0, 2, 6, 8 // 2 4 2
                    //{pitches: [0, 2, 5, 6, 7], expected: 'Double-seconds Triple-fourth Pentachord.2'}, // 0, 2, 6, 8 // 2 4 2



                ], function(p){
                    equal(midi.getChordName(p.pitches), p.expected, p.pitches.join() + ' has name: ' + p.expected);
                });
            });*/



            /*var notes = [12, 16, 7]; // {0: 20, 4: 20, 7: 20}
            var notes = [11, 3, 7]; // {3: 16, 7: 20, 11: 16}
            var notes = [13, 3, 7]; // {1: 6, 3: 13, 7: 13}*/

            /*test('getRoot works', function() {

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
            });*/

            
        };
        return {run: run}
    }
);