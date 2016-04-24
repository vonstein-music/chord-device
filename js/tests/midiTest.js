"use strict";
define(
    ['modules/midi'],
    function(midi) {
        var run = function() {

            test('_getSickodecimal works', function() {
                _.each(
                [
                    {pitches: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], expected: '0123456789ABCDEFGHI'},

                ], function(p){
                    deepEqual(midi._getSickodecimal(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });


            test('getFortePrimeForm works', function() {
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
                    deepEqual(midi.getFortePrimeForm(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });

            test('_getNormalForm works', function() {
                _.each(
                [
                    {pitches: [8,0,4,6], expected: [0, 4, 6, 8]},     
                ], function(p){
                    deepEqual(midi._getNormalForm(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected.join());
                });
            });

            test('_getIntervalVector works', function() {
                _.each(
                [
                    {pitches: [2,3,9], expected: [1,0,0,0,1,1]},     
                    {pitches: [0,2,6], expected: [0,1,0,1,0,1]},
                    {pitches: [0,2,3,6], expected: [1,1,2,1,0,1]},
                    {pitches: [4,6,0,1,3], expected: [2,2,3,1,1,1]},
                    {pitches: [0,1,2,4,5,8], expected: [3,2,3,4,2,1]}, 
                ], function(p){
                    deepEqual(midi._getIntervalVector(p.pitches), p.expected, p.pitches.join() + ' becomes ' + p.expected);
                });
            });

            test('getNoteNameForPitch works', function() {
                _.each(
                [
                    {pitch: 0, isFlat: 1, expected: 'C'},
                    {pitch: 0, isFlat: 1, expected: 'C'},
                    {pitch: 1, isFlat: 1, expected: 'Db'},
                    {pitch: 2, isFlat: 1, expected: 'D'},
                    {pitch: 3, isFlat: 1, expected: 'Eb'},
                    {pitch: 4, isFlat: 1, expected: 'E'},
                    {pitch: 5, isFlat: 1, expected: 'F'},
                    {pitch: 6, isFlat: 1, expected: 'Gb'},
                    {pitch: 7, isFlat: 1, expected: 'G'},
                    {pitch: 8, isFlat: 1, expected: 'Ab'},
                    {pitch: 9, isFlat: 1, expected: 'A'},
                    {pitch: 10, isFlat: 1, expected: 'Bb'},
                    {pitch: 11, isFlat: 1, expected: 'B'},
                    {pitch: 12, isFlat: 1, expected: 'C'},

                    {pitch: 127, isFlat: 1, expected: 'G'},

                    {pitch: 1, isFlat: 0, expected: 'C#'},
                    {pitch: 3, isFlat: 0, expected: 'D#'},
                    {pitch: 6, isFlat: 0, expected: 'F#'},
                    {pitch: 8, isFlat: 0, expected: 'G#'},
                    {pitch: 10, isFlat: 0, expected: 'A#'},

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

            test('_getPitchClassesInPlayedOrderTransposedDown works', function() {
                _.each(
                [
                    {pitchesOrdered: [0, 3, 7, 9, 15, 18], expected: [0, 3, 7, 9, 3, 6]},
                    {pitchesOrdered: [3, 7, 9, 15, 18], expected: [0, 4, 6, 0, 3]},
                    {pitchesOrdered: [14, 15, 18, 45], expected: [0, 1, 4, 7]},

                ], function(p){
                    deepEqual(midi._getPitchClassesInPlayedOrderTransposedDown(p.pitchesOrdered), p.expected);
                });
            });

            test('_getPitchClassesStartingAtZero works', function() {
                _.each(
                [
                    {pitchesOrdered: [0, 3, 7, 9, 15, 18], expected: [0, 3, 7, 9, 3, 6]},
                    {pitchesOrdered: [3, 7, 9], expected: [0, 4, 6]},
                    {pitchesOrdered: [14, 15, 18, 45], expected: [0, 1, 4, 7]},
                ], function(p){
                    deepEqual(midi._getPitchClassesStartingAtZero(p.pitchesOrdered), p.expected, p.pitchesOrdered.join() + ' becomes ' + p.expected.join());
                });
            });

            test('getRomanNumeral works', function() {
                _.each(
                [
                    {scaleDegree: 1, primeForm: [0, 3, 7], orderedPitchClassesStartingAtZero: [0, 3, 7], inversion: 0, expected: 'i'},                    
                    {scaleDegree: 1, primeForm: [0, 4, 7], orderedPitchClassesStartingAtZero: [0, 4, 7], inversion: 0, expected: 'I'},                    
                    {scaleDegree: 2, primeForm: [0, 4, 7], orderedPitchClassesStartingAtZero: [0, 4, 7], inversion: 0, expected: 'II'},  
                    {scaleDegree: 2, primeForm: [0, 4, 7], orderedPitchClassesStartingAtZero: [0, 4, 7, 11], inversion: 0, expected: 'II7'},
                    {scaleDegree: 2, primeForm: [0, 4, 7], orderedPitchClassesStartingAtZero: [0, 4, 7, 11, 14, 21], inversion: 0, expected: 'II13'},
                    {scaleDegree: 7, primeForm: [0, 3, 6], orderedPitchClassesStartingAtZero: [0, 3, 6], inversion: 0, expected: 'vii°'},  
                    {scaleDegree: 5, primeForm: [0, 4, 8], orderedPitchClassesStartingAtZero: [0, 4, 8], inversion: 0, expected: 'V+'},  
                    {scaleDegree: 1, primeForm: [0, 4, 7], orderedPitchClassesStartingAtZero: [0, 4, 7], inversion: 1, expected: 'Ia'},                    
                    {scaleDegree: 1, primeForm: [0, 4, 7], orderedPitchClassesStartingAtZero: [0, 4, 7], inversion: 2, expected: 'Ib'},

                ], function(p){
                    console.log(midi.getRomanNumeral(
                            p.scaleDegree, 
                            p.primeForm,
                            p.orderedPitchClassesStartingAtZero,
                            p.inversion
                        ));
                    equal(midi.getRomanNumeral(
                            p.scaleDegree, 
                            p.primeForm,
                            p.orderedPitchClassesStartingAtZero,
                            p.inversion
                        ), p.expected);
                });
            });


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



//      getPitchesOfChordForScaleDegree: scaleDegree, cardinality, keyPitch, scalePitches

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
                    {pitch: 9, key: 9, scale: [0,2,3,5,7,9,10], expected: 1}, // A in A dorian


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

            test('getChordInfo works', function() {
                _.each(
                [                                        

                    {pitches: [0,4,7], expectedName: 'Major Triad'},
                    {pitches: [0,3,7], expectedName: 'Minor Triad'},
                    {pitches: [0,3,6], expectedName: 'Diminished Triad'},
                    {pitches: [0,4,8], expectedName: 'Augmented Triad'},
                    {pitches: [0,4,7,11], expectedName: 'Major seventh'},
                    {pitches: [0,3,7,10], expectedName: 'Minor seventh'},
                    {pitches: [0,4,7,10], expectedName: 'Dominant seventh'},
                    {pitches: [0,3,6,9], expectedName: 'Diminished seventh'},
                    {pitches: [0,3,6,10], expectedName: 'Half-diminished seventh'},
                    {pitches: [0,3,7,11], expectedName: 'Minor major seventh'},
                    {pitches: [0,4,8,11], expectedName: 'augmented major seventh'},
                    {pitches: [0,3,6,11], expectedName: 'Diminished major seventh'},
                    {pitches: [0,4,6,10], expectedName: 'Dominant seventh flat five'},
                    {pitches: [0,4,7,14], expectedName: 'Added ninth'},
                    {pitches: [0,4,7,11,14], expectedName: 'major ninth'},
                    {pitches: [0,3,7,10,14], expectedName: 'minor ninth'},
                    {pitches: [0,4,8,11,14], expectedName: 'Augmented Major 9th'},
                    {pitches: [0,3,7,11,14], expectedName: 'Minor-major ninth'},
                    {pitches: [0,3,7,14], expectedName: 'Minor added ninth'},
                    {pitches: [0,3,6,10,14], expectedName: 'Minor Ninth Diminished Fifth'},
                    {pitches: [0,4,7,14,18], expectedName: 'Major seventh sharp eleventh'},
                    {pitches: [0,4,8,10,14], expectedName: 'Dominant ninth sharp five'},
                    {pitches: [0,3,6,9,14], expectedName: 'Diminished 9th'},
                    {pitches: [0,3,6,10,13], expectedName: 'Half-Diminished Minor 9th'},
                    {pitches: [0,3,6,9,13], expectedName: 'Diminished Minor 9th'},
                    {pitches: [0,4,6,10,14], expectedName: 'Dominant ninth flat five'},
                    {pitches: [0,4,7,10,14], expectedName: 'Dominant 9th'},
                    {pitches: [0,4,7,10,13], expectedName: 'Dominant minor 9th'},
                    {pitches: [0,4,7,10,15], expectedName: 'Dominant seventh sharp ninth'},
                    {pitches: [0,4,8,10,15], expectedName: 'Dominant seventh sharp five sharp ninth'},
                    {pitches: [0,4,8,10,13], expectedName: 'Dominant seventh sharp five flat ninth'},
                    {pitches: [0,4,8,10], expectedName: 'augmented seventh'},
                    {pitches: [0,4,7,10,13,18], expectedName: 'Dominant seventh sharp eleventh'},
                    {pitches: [0,4,6,10,15], expectedName: 'Dominant seventh flat five sharp ninth'},
                    {pitches: [0,3,7,9,14], expectedName: 'Minor seventh sharp five'},
                    {pitches: [0,4,6,11], expectedName: 'Major seventh flat five'},
                    {pitches: [0,4,7,14,18], expectedName: 'Major seventh sharp eleventh'},
                    {pitches: [0,3,7,9], expectedName: 'Minor sixth'},
                    {pitches: [0,3,7,9,14], expectedName: 'Minor six-nine'},
                    {pitches: [0,4,7,9], expectedName: 'Major sixth'},
                    {pitches: [0,4,7,9,14], expectedName: 'Major six-nine'},
                    {pitches: [0,3,7,10,14,17], expectedName: 'Minor eleventh'},
                    {pitches: [0,4,7,11,14,17], expectedName: 'Major eleventh'},
                    {pitches: [0,4,7,10,13,17], expectedName: 'Dominant eleventh flat ninth'},
                    {pitches: [0,4,7,10,14,17], expectedName: 'Dominant 11th'},
                    {pitches: [0,3,7,10,14,21], expectedName: 'Minor thirteenth'},
                    {pitches: [0,4,7,11,14,18,21], expectedName: 'Major thirteenth sharp eleventh'},
                    {pitches: [0,4,7,11,14,17,21], expectedName: 'Major Thirteenth'},
                    {pitches: [0,4,7,10,15,21], expectedName: 'Dominant thirteenth sharp ninth'},
                    {pitches: [0,4,7,10,14,18,21], expectedName: 'Dominant thirteenth sharp eleventh'},
                    {pitches: [0,4,7,10,13,21], expectedName: 'Dominant thirteenth flat ninth'},
                    {pitches: [0,4,7,10,14,17,21], expectedName: 'Dominant 13th'},
                    {pitches: [0,2,5,7], expectedName: 'Suspended second suspended fourth'},
                    {pitches: [0,2,7], expectedName: 'Suspended Second'},
                    {pitches: [0,5,7], expectedName: 'Suspended Fourth'},
                    {pitches: [0,2,7,11], expectedName: 'Major seventh suspended second'},
                    {pitches: [0,5,7,11], expectedName: 'Major seventh suspended fourth'},
                    {pitches: [0,4,8,11,14,17], expectedName: 'Augmented 11th'},
                    {pitches: [0,3,6,10,13,17], expectedName: 'Half-Diminished 11th'},
                    {pitches: [0,3,6,9,13,16], expectedName: 'Diminished 11th'},
                    {pitches: [0,4,8,10,14,17,21], expectedName: 'Augmented Dominant 13th'},
                    {pitches: [0,3,7,10,14,17,21], expectedName: 'Minor Dominant 13th'},
                    {pitches: [0,3,7,11,14,17,21], expectedName: 'Minor Major Thirteenth'},
                    {pitches: [0,4,8,11,14,17,21], expectedName: 'Augmented Major 13th'},
                    {pitches: [0,4,8,10,14,17,21], expectedName: 'Augmented Dominant 13th'},
                    {pitches: [0,3,6,10,14,17,21], expectedName: 'Half-Diminished 13th'},
                    {pitches: [0,5,7,10,14,21], expectedName: 'Dominant thirteenth suspended fourth'},
                    {pitches: [0,2,7,10], expectedName: 'Dominant seventh suspended second'},
                    {pitches: [0,5,7,10], expectedName: 'Dominant seventh suspended fourth'},
                    {pitches: [0,5,7,10,14], expectedName: 'Dominant ninth suspended fourth'},
                    {pitches: [0,7], expectedName: 'Power'},
                    {pitches: [0,7,12], expectedName: 'Power Octave Doubled'},
                    {pitches: [0,4,6], expectedName: 'Flat five'},
                    {pitches: [0,2,6], expectedName: 'Flat five'},
                    {pitches: [0,2,4,7], expectedName: 'Mu'},

                    {pitches: [1,5,8], expectedName: 'Major Triad'},
                    {pitches: [12,4,7], expectedName: 'Major Triad (1st inv)'},
                    {pitches: [7,12,4], expectedName: 'Major Triad (1st inv)'},

                    {pitches: [7,12,16], expectedName: 'Major Triad (2nd inv)'},

                    // voicings
                    {pitches: [0,4,7, 12, 24, 16], expectedName: 'Major Triad'},
                    {pitches: [2, 6, 9, 14, 26, 18], expectedName: 'Major Triad'},


                    {pitches: [0, 3, 7, 12, 15], expectedName: 'Minor Triad'},
                    {pitches: [3, 6, 10, 15, 18], expectedName: 'Minor Triad'},

                    {pitches: [1,2,3,4,5,6], expectedName: 'Chromatic Hexamirror'},

                    {pitches: [0, 2, 4, 7, 9], expectedName: '"Black Key" Pentatonic'},

                ], function(p){

                    var result = midi.getChordInfo(p.pitches);

                    var listOfFoundChordNames = _.map(result, function(chord){
                        return chord.chordName;
                    });
                    console.log(listOfFoundChordNames);
                    console.log(p.expectedName);

                    var inThere = _.findIndex(listOfFoundChordNames, function(chordName){
                        return chordName === p.expectedName;
                    }) !== -1;

                    equal(inThere, true, p.pitches);

                });
            });



            /*var notes = [12, 16, 7]; // {0: 20, 4: 20, 7: 20}
            var notes = [11, 3, 7]; // {3: 16, 7: 20, 11: 16}
            var notes = [13, 3, 7]; // {1: 6, 3: 13, 7: 13}*/

            test('guessRootPitch works', function() {

                _.each(
                [
                    {pitches: [0, 3, 7], expected: 0, chord: 'c minor'},
                    {pitches: [0, 4, 7], expected: 0, chord: 'c major'},
                    {pitches: [4, 7, 12], expected: 0, chord: 'c major 1. inversion'},
                    {pitches: [7, 12, 16], expected: 0, chord: 'c major 2. inversion'},
                    {pitches: [12, 16, 19], expected: 0, chord: 'c major 3. inversion (same chord)'},
                    {pitches: [1, 4, 8], expected: 1, chord: 'c# minor'},
                    {pitches: [2, 5, 9], expected: 2, chord: 'd minor'},                    
                    {pitches: [0, 4, 7, 11], expected: 0, chord: 'maj7'},
                    {pitches: [0, 3, 7, 10], expected: 0, chord: 'min7'},
                    {pitches: [0, 4, 7, 10], expected: 0, chord: 'dom7'},
                    {pitches: [0, 3, 6, 9], expected: 0, chord: 'dim7'},
                    {pitches: [0, 4, 8], expected: 0, chord: 'c aug'},
                    {pitches: [5, 9, 13], expected: 1, chord: 'c# aug first inversion'},

                    //{pitches: [0, 4, 7, 10, 15], expected: 'C', chord: 'hendrix chord'},
                    //{pitches: [1, 5, 8, 11, 16], expected: 'C#', chord: 'hendrix chord'},
                    //{pitches: [0, 4, 7, 11, 14], expected: 0, chord: 'maj 9'},
                    //{pitches: [2, 6, 9, 12, 17], expected: 'D', chord: 'hendrix chord'},
                    //{pitches: [3, 7, 10, 13, 18], expected: 'D#', chord: 'hendrix chord'},

                ], function(p){
                    equal(midi.guessRootPitch(p.pitches), p.expected, p.pitches.join() + ' has root ' + p.expected);
                });
            });

            
        };
        return {run: run}
    }
);