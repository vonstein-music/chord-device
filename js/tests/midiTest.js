"use strict";
define(
    ['modules/midi'],
    function(midi) {
        var run = function() {

            /*test('_getHexadecimal works', function() {
                _.each(
                [
                    {pitches: [0,1,2,3,4,5,6,7,8,9,10,11,12], expected: '0123456789ABC'},

                ], function(p){
                    deepEqual(midi._getHexadecimal(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });*/


            /*test('getPrimeForm works', function() {
                _.each(
                [
                    {pitches: [0,1], expected: [0,1,]},
                    {pitches: [0,1,2], expected: [0,1,2]},

                    {pitches: [0,1,2,3,4,5], expected: [0,1,2,3,4,5]},
                    {pitches: [3,4,5,6,7,8], expected: [0,1,2,3,4,5]},

                    {pitches: [3,7,11], expected: [0,4,8]},


                    {pitches: [0,4,7], expected: [0,3,7]},
                    {pitches: [0,7,10], expected: [0,2,5]},
                    
                    {pitches: [0,3,7,10,11], expected: [0,3,4,5,8]},
                    {pitches: [1,3,7,10,11], expected: [0,2,4,5,8]},

                    {pitches: [1,3,7,10,11, 13, 22], expected: [0,2,4,5,8]},

                    {pitches: [1,2,4,6,7,9,10], expected: [0,1,3,4,6,8,9]},
                    {pitches: [13,2,16,22, 6,7,4, 9], expected: [0,1,3,4,6,8,9]},

                    {pitches: [0,1,2,5,6,8], expected: [0,1,2,5,6,8]},
                    {pitches: [6,7,10], expected: [0,1,4]},
                    {pitches: [0,9,10], expected: [0,1,3]},


                ], function(p){
                    deepEqual(midi.getPrimeForm(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });*/

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


/*
         [
             ["maj", "major"],
             [0, 4, 7], "Major"
         ], [
             ["m", "min", "minor"],
             [0, 3, 7], "Minor"
         ], [
             ["7"],
             [0, 4, 7, 10], "Dominant Seventh"
         ], [
             ["min7", "m7", "minor7"],
             [0, 3, 7, 10], "Minor Seventh"
         ], [
             ["maj7", "Major7"],
             [0, 4, 7, 11], "Major Seventh"
         ], [
             ["sus4", "sus"],
             [0, 5, 7], "Suspended Fourth"
         ], [
             ["7sus4", "7sus"],
             [0, 5, 7, 10], "Seventh Suspended Fourth"
         ], [
             ["6", "maj6", "major6"],
             [0, 4, 7, 9], "Sixth"
         ], [
             ["min6", "m6", "minor6"],
             [0, 3, 7, 9], "Minor Sixth"
         ], [
             ["dim", "dim7", "diminished", "o"],
             [0, 3, 6],
             "Diminished Seventh"
         ], [
             ["aug", "+", "augmented"],
             [0, 4, 8], "Augmented"
         ], [
             ["7-5", "7b5"],
             [0, 4, 6, 10], "Seventh Diminished Fifth"
         ], [
             ["7+5", "7#5"],
             [0, 4, 8, 10], "Seventh Augmented Fifth"
         ], [
             ["m7-5", "m7b5", "0"],
             [0, 3, 6, 10], "Half Diminished Seventh"
         ], [
             ["m/maj7"],
             [0, 3, 7, 11], "Minor/Major Seventh"
         ], [
             ["maj7+5", "maj7#5"],
             [0, 4, 8, 11], "Major Seventh Augmented Fifth"
         ], [
             ["maj7-5", "maj7b5"],
             [0, 4, 6, 11], "Major Seventh Diminished Fifth"
         ], [
             ["9"],
             [0, 4, 7, 10, 14], "Ninth"
         ], [
             ["m9"],
             [0, 3, 7, 10, 14], "Minor Ninth"
         ], [
             ["maj9"],
             [0, 4, 7, 11, 14], "Major Ninth"
         ], [
             ["7+9", "7#9"],
             [0, 4, 7, 10, 15], "Seventh Augmented Ninth"
         ], [
             ["7-9", "7b9"],
             [0, 4, 7, 10, 13], "Seventh Diminished Ninth"
         ], [
             ["7+9-5", "7#9b5"],
             [0, 4, 6, 10, 15],
             "Seventh Augmented Ninth Diminished Fifth"
         ], [
             ["6/9", "69"],
             [0, 4, 7, 9, 14], "Sixth/Ninth"
         ], [
             ["9+5", "9#5"],
             [0, 4, 8, 10, 14], "Ninth Augmented Fifth"
         ], [
             ["9-5", "9b5"],
             [0, 4, 6, 10, 14], "Ninth Diminished Fifth"
         ], [
             ["m9-5", "m9b5"],
             [0, 3, 6, 10, 14],
             "Minor Ninth Diminished Fifth"
         ], [
             ["11"],
             [0, 4, 7, 10, 14, 17], "Eleventh"
         ], [
             ["m11"],
             [0, 3, 7, 10, 14, 17], "Minor Eleventh"
         ], [
             ["11-9", "11b9"],
             [0, 4, 7, 10, 13, 17],
             "Eleventh Diminished Ninth"
         ], [
             ["13"],
             [0, 4, 7, 10, 14, 17, 21], "Thirteenth"
         ], [
             ["m13"],
             [0, 3, 7, 10, 14, 17, 21], "Minor Thirteenth"
         ], [
             ["maj13"],
             [0, 4, 7, 11, 14, 17, 21], "Major Thirteenth"
         ], [
             ["add9", "(add9)"],
             [0, 4, 7, 14], "Major (Add Ninth)"
         ], [
             ["madd9", "m(add9)"],
             [0, 3, 7, 14], "Minor (Add Ninth)"
         ], [
             ["sus2"],
             [0, 2, 7], "Suspended Second"
         ], [
             ["5"],
             [0, 7], "Power Chord"
         ]

*/

            /*test('intervalVector return corresponds primeform return', function() {
                _.each(
                [
   
                ], function(p){
                    deepEqual(midi._getPitchClasses(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected.join());
                });
            });*/


/*
cases:
- voicing below
- voicing above
*/



            test('getOutOfScalePitches', function() {
                _.each(
                [
                    {played: [1,4,7], scale: [0, 2, 4, 5, 7, 9, 11], expected: [1]},
                    {played: [0,3,7], scale: [0, 2, 4, 5, 7, 9, 11], expected: [3]},
                    {played: [0,4,5,6,8], scale: [0, 2, 4, 5, 7, 9, 11], expected: [6,8]},
                    {played: [8, 6, 1], scale: [0, 5, 7, 9, 11, 2, 4], expected: [8, 6, 1]},
                    
                ], function(p){

                    deepEqual(midi.getOutOfScalePitches(p.played, p.scale), p.expected);
                });
            });

            test('getConsonanceRating', function() {
                _.each(
                [
                    {pitches: [0,4,7]},
                    {pitches: [0,3,7]},
                    {pitches: [0,4,8]},
                    {pitches: [0,1,2,3]},
                    {pitches: [0,12,24]},

                ], function(p){

                    equal(1,1, p.pitches.join() + ' has rating: ' + midi.getConsonanceRating(p.pitches));
                });
            });

           /* test('customLookup works', function() {
                _.each(
                [
                    {pitches: [0,4,7], expected: 'Major Triad'},
                    {pitches: [11,15,18], expected: 'Major Triad'}, // transposed
                    {pitches: [15,18,11], expected: 'Major Triad'}, // differentOrder
                    {pitches: [4,7,12], expected: 'Major Triad (1st inv)'}, // first inversion
                    {pitches: [7,12,16], expected: 'Major Triad (2nd inv)'}, // second inversion
                    {pitches: [0,4,7,12], expected: 'Major Triad'}, // additional voicing

                    {pitches: [0,3,7], expected: 'Minor Triad'},
                    {pitches: [0,3,6], expected: 'Diminished Triad'},
                    {pitches: [0,4,8], expected: 'Augmented Triad'},
                    {pitches: [0,4,7,11], expected: 'Major seventh chord'},
                    {pitches: [0,3,7,10], expected: 'Minor seventh chord'},
                    {pitches: [0,4,7,10], expected: 'Dominant seventh chord, major/minor seventh chord, 7th chord'},
                    {pitches: [0,3,6,9], expected: 'Diminished seventh chord, full diminished seventh chord, Diminished 7th (with Flat 5th)'},
                    {pitches: [0,3,6,10], expected: 'Minor seventh flat five chord, Half-diminished seventh chord'},
                    {pitches: [0,3,7,11], expected: 'Minor major seventh chord'},
                    {pitches: [0,4,8,11], expected: 'Major seventh sharp five chord, augmented major seventh chord'},
                    {pitches: [0,3,6,11], expected: 'Diminished major seventh chord'},
                    {pitches: [0,4,6,10], expected: 'Dominant seventh flat five chord, Seven Flat Five'},
                    {pitches: [0,4,7,14], expected: 'Added ninth chord'},
                    {pitches: [0,4,7,11,14], expected: 'major ninth chord'},
                    {pitches: [0,3,7,10,14], expected: 'minor ninth chord'},
                    {pitches: [0,3,7,11,14], expected: 'Minor-major ninth chord'},
                    {pitches: [0,3,7,14], expected: 'Minor added ninth chord'},
                    {pitches: [0,4,7,14,18], expected: 'Major ninth sharp eleventh chord|Major seventh sharp eleventh chord'},
                    {pitches: [0,4,8,10,14], expected: 'Dominant ninth sharp five chord'},
                    {pitches: [0,4,6,10,14], expected: 'Dominant ninth flat five chord'},
                    {pitches: [0,4,7,10,14], expected: 'Dominant 9th, Dominant ninth chord'},
                    {pitches: [0,4,7,10,13], expected: 'Dominant minor 9th, Dominant seventh flat ninth chord'},
                    {pitches: [0,4,7,10,15], expected: 'Dominant seventh sharp ninth chord, dominant 7â™¯9 chord, Hendrix chord'},
                    {pitches: [0,4,8,10,15], expected: 'Dominant seventh sharp five sharp ninth chord'},
                    {pitches: [0,4,8,10,13], expected: 'Dominant seventh sharp five flat ninth chord'},
                    {pitches: [0,4,8,10], expected: 'dominant seventh sharp five chord, augmented seventh chord, Seven Sharp Five'},
                    {pitches: [0,4,7,10,13,18], expected: 'Dominant seventh sharp eleventh chord'},
                    {pitches: [0,4,6,10,15], expected: 'Dominant seventh flat five sharp ninth chord'},
                    {pitches: [0,3,7,9,14], expected: 'Minor seventh sharp five chord, minor six-nine chord'},
                    {pitches: [0,4,6,11], expected: 'Major seventh flat five chord'},
                    {pitches: [0,3,7,9], expected: 'Minor sixth chord'},
                    {pitches: [0,4,7,9], expected: 'Major sixth chord'},
                    {pitches: [0,4,7,9,14], expected: 'Major six-nine chord'},
                    {pitches: [0,3,7,10,14,17], expected: 'Minor eleventh chord'},
                    {pitches: [0,4,7,11,14,17], expected: 'Major eleventh chord'},
                    {pitches: [0,4,7,10,13,17], expected: 'Dominant eleventh flat ninth chord'},
                    {pitches: [0,4,7,14,17], expected: 'Dominant eleventh chord'},
                    {pitches: [0,3,7,10,14,21], expected: 'Minor thirteenth chord'},
                    {pitches: [0,4,7,11,14,18,21], expected: 'Major thirteenth sharp eleventh chord'},
                    {pitches: [0,4,7,11,14,21], expected: 'Major thirteenth chord'},
                    {pitches: [0,4,7,10,15,21], expected: 'Dominant thirteenth sharp ninth chord'},
                    {pitches: [0,4,7,10,14,18,21], expected: 'Dominant thirteenth sharp eleventh chord'},
                    {pitches: [0,4,7,10,13,21], expected: 'Dominant thirteenth flat ninth chord'},
                    {pitches: [0,4,7,10,14,21], expected: 'Dominant thirteenth chord'},
                    {pitches: [0,2,5,7], expected: 'Suspended second suspended fourth chord'},
                    {pitches: [0,2,7], expected: 'Suspended Second Chord'},
                    {pitches: [0,5,7], expected: 'Suspended Fourth Chord'},
                    {pitches: [0,2,7,11], expected: 'Major seventh suspended second chord'},
                    {pitches: [0,5,7,11], expected: 'Major seventh suspended fourth chord'},
                    {pitches: [0,5,7,10,14,21], expected: 'Dominant thirteenth suspended fourth chord'},
                    {pitches: [0,2,7,10], expected: 'Dominant seventh suspended second chord'},
                    {pitches: [0,5,7,10], expected: 'Dominant seventh suspended fourth chord'},
                    {pitches: [0,5,7,10,14], expected: 'Dominant ninth suspended fourth chord'},
                    {pitches: [0,7], expected: 'Power Chord'},
                    {pitches: [0,7,12], expected: 'Power Chord Octave Doubled'},
                    {pitches: [0,4,6], expected: 'Flat five chord'},
                    {pitches: [0,2,6], expected: 'Flat five chord'},
                    {pitches: [0,2,4,7], expected: 'Mu chord'},
                ], function(p){
                    equal(midi.customLookup(p.pitches), p.expected, p.pitches.join() + ' is ' + p.expected);
                });
            });*/


            /*test('_getIntervalSetStartingAtZero works', function() {
                _.each(
                [
                    {pitchesOrdered: [0, 3, 7, 9, 15, 18], expected: [0, 3, 7, 9, 15, 18]},
                    {pitchesOrdered: [3, 7, 9, 15, 18], expected: [0, 4, 6, 12, 15]},
                    {pitchesOrdered: [14, 15, 18, 45], expected: [0, 1, 4, 31]},
                ], function(p){
                    deepEqual(midi._getIntervalSetStartingAtZero(p.pitchesOrdered), p.expected);
                });
            });*/

            /*test('_getPitchClassesStartingAtZero works', function() {
                _.each(
                [
                    {pitchesOrdered: [0, 3, 7, 9, 15, 18], expected: [0, 3, 7, 9, 3, 6]},
                    {pitchesOrdered: [3, 7, 9], expected: [0, 4, 6]},
                    {pitchesOrdered: [14, 15, 18, 45], expected: [0, 1, 4, 7]},
                ], function(p){
                    deepEqual(midi._getPitchClassesStartingAtZero(p.pitchesOrdered), p.expected, p.pitchesOrdered.join() + ' becomes ' + p.expected.join());
                });
            });
*/
/*
            test('_getInversionNumber works', function() {
                _.each(
                [
                    {pitchClassesOnlyOrdered: [0, 3, 7], pitchClassesAsInLookup: [0, 3, 7], expected: 0},
                    {pitchClassesOnlyOrdered: [3, 7, 0], pitchClassesAsInLookup: [0, 3, 7], expected: 1},
                    {pitchClassesOnlyOrdered: [7, 0, 3], pitchClassesAsInLookup: [0, 3, 7], expected: 2},
                    // @TODO more tests

                ], function(p){
                    equal(midi._getInversionNumber(p.pitchClassesOnlyOrdered, p.pitchClassesAsInLookup), p.expected, p.pitchClassesOnlyOrdered.join() + ' is: ' + p.expected + '. inversion');
                });
            });
*/


//      getPitchesOfChordForScaleDegree: function(scaleDegree, cardinality, keyPitch, scalePitches){

            test('getPitchesOfChordForScaleDegree works', function() {
                _.each(
                [
                    {scaleDegree: 1, cardinality: 3, key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: [0, 4, 7]},
                    {scaleDegree: 1, cardinality: 5, key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: [0, 4, 7, 11, 14]},
                    {scaleDegree: 7, cardinality: 3, key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: [11, 14, 17]},
                    {scaleDegree: 1, cardinality: 4, key: 2, scale: [0, 2, 4, 5, 7, 9, 11], expected: [2, 6, 9, 13]}, // Dmaj scale

                    {scaleDegree: 4, cardinality: 3, key: 0, scale: [0,2,4,6,7,9,11], expected: [6,9,12]}, // C lydian
                    {scaleDegree: 5, cardinality: 5, key: 11, scale: [0,2,4,6,7,9,11], expected: [18, 22, 25, 29, 32]}, // B lydian // 7 11 14 18 21 > 18, 22, 25, 29, 32

                ], function(p){
                    deepEqual(midi.getPitchesOfChordForScaleDegree(p.scaleDegree, p.cardinality, p.key, p.scale), p.expected);
                });
            });

            test('getDiatonicFunction works', function() {
                _.each(
                [
                    {pitches: [0, 4, 7], key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: 1}, // C in C major
                    {pitches: [2, 5, 9], key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: 2}, // D in C major



                ], function(p){
                    equal(midi.getDiatonicFunction(p.pitches).scaleDegree, p.expected, p.pitches + ' in ' + p.key + '/' + p.scale + ' has Degree: ' + p.expected);
                });
            });


            test('getScaleDegree works', function() {
                _.each(
                [
                    {pitch: 0, key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: 1}, // C in C major
                    {pitch: 5, key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: 4}, // G in C major
                    {pitch: 11, key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: 7}, // B in C major
                    {pitch: 1, key: 0, scale: [0, 2, 4, 5, 7, 9, 11], expected: 0}, // C# in C major (0 = not found)

                    {pitch: 2, key: 2, scale: [0, 2, 4, 5, 7, 9, 11], expected: 1}, // D in D major
                    {pitch: 9, key: 2, scale: [0, 2, 3, 5, 7, 9, 10], expected: 5}, // A in D dorian

                    {pitch: 11, key: 5, scale: [0, 2, 4, 6, 7, 9, 11], expected: 4}, // B in F Lydian


                ], function(p){
                    deepEqual(midi.getScaleDegree(p.pitch, p.key, p.scale), p.expected);
                });
            });

            test('_getPrimeFromNormalForm works', function() {
                _.each(
                [
                    {pitches: [6, 8, 9, 0, 3], expected: [0, 2, 3, 6, 9]},

                ], function(p){
                    deepEqual(midi._getPrimeFromNormalForm(p.pitches), p.expected, p.pitches.join() + ' is: ' + p.expected.join());
                });
            });

            test('hasPitchNotInKey works', function() {
                _.each(
                [
                    {pitches: [0, 4, 7], key: 0, scale: [0, 2, 4, 6, 7, 9, 11], expected: false}, // Cmaj in C major scale
                    {pitches: [1, 4, 7], key: 0, scale: [0, 2, 4, 6, 7, 9, 11], expected: true}, // bstrd in C major scale
                    {pitches: [0, 4, 7, 11], key: 0, scale: [0, 2, 4, 6, 7, 9, 11], expected: false}, // Cmaj7 in C major scale
                    {pitches: [2, 6, 9], key: 2, scale: [0, 2, 4, 6, 7, 9, 11], expected: false}, // Dmaj in D major scale
                    {pitches: [2, 6, 9], key: 2, scale: [0, 2, 3, 5, 7, 8, 10], expected: true}, // Dmaj in D aeolian scale


                ], function(p){
                    equal(midi.hasPitchNotInKey(p.pitches, p.key, p.scale), p.expected);
                });
            });

            test('_getDirectedIntervalVector works', function() {
                _.each(
                [
                    {pitches: [0, 3, 7], expected: [3, 4, 5]},
                    {pitches: [3, 7, 0], expected: [4, 5, 3]},
                    {pitches: [0, 3, 6, 8, 9], expected: [3, 3, 2, 1, 3]},

                ], function(p){
                    deepEqual(midi._getDirectedIntervalVector(p.pitches), p.expected, p.pitches.join() + ' is: ' + p.expected.join());
                });
            });

            test('_getIntervalSetStartingAtZeroKeepOrder works', function() {
                _.each(
                [
                    {pitches: [0, 3, 7], expected: [0, 3, 7]},
                    {pitches: [3, 7, 0], expected: [3, 7, 0]},
                    {pitches: [7, 0, 3], expected: [7, 0, 3]},
                    {pitches: [4, 6, 9], expected: [0, 2, 5]},
                    {pitches: [14, 6, 9], expected: [8, 0, 3]},
                    // @TODO more tests

                ], function(p){
                    deepEqual(midi._getIntervalSetStartingAtZeroKeepOrder(p.pitches), p.expected, p.pitches.join() + ' is: ' + p.expected.join());
                });
            });


            test('getChordInfo works', function() {
                _.each(
                [
                    
/*
{pitches: [0,4,7], expected: 'Major Triad'},
{pitches: [0,3,7], expected: 'Minor Triad'},
{pitches: [0,3,6], expected: 'Diminished Triad'},
{pitches: [0,4,8], expected: 'Augmented Triad'},
{pitches: [0,4,7,11], expected: 'Major seventh'},
{pitches: [0,3,7,10], expected: 'Minor seventh'},
{pitches: [0,4,7,10], expected: 'Dominant seventh'},
{pitches: [0,3,6,9], expected: 'Diminished seventh'},
{pitches: [0,3,6,10], expected: 'Half-diminished seventh'},
{pitches: [0,3,7,11], expected: 'Minor major seventh'},
{pitches: [0,4,8,11], expected: 'augmented major seventh'},
{pitches: [0,3,6,11], expected: 'Diminished major seventh'},
{pitches: [0,4,6,10], expected: 'Dominant seventh flat five'},
{pitches: [0,4,7,14], expected: 'Added ninth'},
{pitches: [0,4,7,11,14], expected: 'major ninth'},
{pitches: [0,3,7,10,14], expected: 'minor ninth'},
{pitches: [0,4,8,11,14], expected: 'Augmented Major 9th'},
{pitches: [0,3,7,11,14], expected: 'Minor-major ninth'},
{pitches: [0,3,7,14], expected: 'Minor added ninth'},
{pitches: [0,3,6,10,14], expected: 'Minor Ninth Diminished Fifth'},
{pitches: [0,4,7,14,18], expected: 'Major seventh sharp eleventh'},
{pitches: [0,4,8,10,14], expected: 'Dominant ninth sharp five'},
{pitches: [0,3,6,9,14], expected: 'Diminished 9th'},
{pitches: [0,3,6,10,13], expected: 'Half-Diminished Minor 9th'},
{pitches: [0,3,6,9,13], expected: 'Diminished Minor 9th'},
{pitches: [0,4,6,10,14], expected: 'Dominant ninth flat five'},
{pitches: [0,4,7,10,14], expected: 'Dominant 9th'},
{pitches: [0,4,7,10,13], expected: 'Dominant minor 9th'},
{pitches: [0,4,7,10,15], expected: 'Dominant seventh sharp ninth'},
{pitches: [0,4,8,10,15], expected: 'Dominant seventh sharp five sharp ninth'},
{pitches: [0,4,8,10,13], expected: 'Dominant seventh sharp five flat ninth'},
{pitches: [0,4,8,10], expected: 'augmented seventh'},
{pitches: [0,4,7,10,13,18], expected: 'Dominant seventh sharp eleventh'},
{pitches: [0,4,6,10,15], expected: 'Dominant seventh flat five sharp ninth'},
{pitches: [0,3,7,9,14], expected: 'Minor seventh sharp five'},
{pitches: [0,4,6,11], expected: 'Major seventh flat five'},
{pitches: [0,4,7,14,18], expected: 'Major seventh sharp eleventh'},
{pitches: [0,3,7,9], expected: 'Minor sixth'},
{pitches: [0,3,7,9,14], expected: 'Minor six-nine'},
{pitches: [0,4,7,9], expected: 'Major sixth'},
{pitches: [0,4,7,9,14], expected: 'Major six-nine'},
{pitches: [0,3,7,10,14,17], expected: 'Minor eleventh'},
{pitches: [0,4,7,11,14,17], expected: 'Major eleventh'},
{pitches: [0,4,7,10,13,17], expected: 'Dominant eleventh flat ninth'},
{pitches: [0,4,7,10,14,17], expected: 'Dominant 11th'},
{pitches: [0,3,7,10,14,21], expected: 'Minor thirteenth'},
{pitches: [0,4,7,11,14,18,21], expected: 'Major thirteenth sharp eleventh'},
{pitches: [0,4,7,11,14,17,21], expected: 'Major Thirteenth'},
{pitches: [0,4,7,10,15,21], expected: 'Dominant thirteenth sharp ninth'},
{pitches: [0,4,7,10,14,18,21], expected: 'Dominant thirteenth sharp eleventh'},
{pitches: [0,4,7,10,13,21], expected: 'Dominant thirteenth flat ninth'},
{pitches: [0,4,7,10,14,17,21], expected: 'Dominant 13th'},
{pitches: [0,2,5,7], expected: 'Suspended second suspended fourth'},
{pitches: [0,2,7], expected: 'Suspended Second'},
{pitches: [0,5,7], expected: 'Suspended Fourth'},
{pitches: [0,2,7,11], expected: 'Major seventh suspended second'},
{pitches: [0,5,7,11], expected: 'Major seventh suspended fourth'},
{pitches: [0,4,8,11,14,17], expected: 'Augmented 11th'},
{pitches: [0,3,6,10,13,17], expected: 'Half-Diminished 11th'},
{pitches: [0,3,6,9,13,16], expected: 'Diminished 11th'},
{pitches: [0,4,8,10,14,17,21], expected: 'Augmented Dominant 13th'},
{pitches: [0,3,7,10,14,17,21], expected: 'Minor Dominant 13th'},
{pitches: [0,3,7,11,14,17,21], expected: 'Minor Major Thirteenth'},
{pitches: [0,4,8,11,14,17,21], expected: 'Augmented Major 13th'},
{pitches: [0,4,8,10,14,17,21], expected: 'Augmented Dominant 13th'},
{pitches: [0,3,6,10,14,17,21], expected: 'Half-Diminished 13th'},
{pitches: [0,5,7,10,14,21], expected: 'Dominant thirteenth suspended fourth'},
{pitches: [0,2,7,10], expected: 'Dominant seventh suspended second'},
{pitches: [0,5,7,10], expected: 'Dominant seventh suspended fourth'},
{pitches: [0,5,7,10,14], expected: 'Dominant ninth suspended fourth'},
{pitches: [0,7], expected: 'Power'},
{pitches: [0,7,12], expected: 'Power Octave Doubled'},
{pitches: [0,4,6], expected: 'Flat five'},
{pitches: [0,2,6], expected: 'Flat five'},
{pitches: [0,2,4,7], expected: 'Mu'},

*/
{pitches: [1,5,8], expected: 'Major Triad'},
{pitches: [12,4,7], expected: 'Major Triad (1st inv)'},
{pitches: [7,12,4], expected: 'Major Triad (1st inv)'},

{pitches: [7,12,16], expected: 'Major Triad (2nd inv)'},

// voicings
{pitches: [0,4,7, 12, 24, 16], expected: 'Major Triad'},
{pitches: [2, 6, 9, 14, 26, 18], expected: 'Major Triad'},


{pitches: [0, 3, 7, 12, 15], expected: 'Minor Triad'},
{pitches: [3, 6, 10, 15, 18], expected: 'Minor Triad'},

{pitches: [1,2,3,4,5,6], expected: 'Chromatic Hexamirror'},

{pitches: [0, 2, 4, 7, 9], expected: '"Black Key" Pentatonic'},

                ], function(p){
                    notEqual(_.indexOf(midi.getChordInfo(p.pitches).chordNames, p.expected), -1, p.expected + ' is among ' + midi.getChordInfo(p.pitches).chordNames.join() + ' root: ' + midi.getChordInfo(p.pitches).rootNoteName);
                });
            });



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