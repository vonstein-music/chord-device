"use strict";
define(function(require) {

    var _ = require('./libs/lodash');
    var midi = require('./modules/midi');
    var commonChords = require('./dataSources/commonChords');
    var sets = require('./dataSources/sets');
    var commonChordsLookupTable = require('./data/commonChordsLookupTable');

    function createCommonChordsLookupTable() {

        var chordsByAllIntervalKeys = {};

        _.each(commonChords, function(chord) {

            var rotation = chord.intervals.slice();
            var currentChordName = chord.fullName.split(',')[0];

            for (var i = 0, len = chord.intervals.length; i < len; i++) {


                console.log('rotatioin ' + i, rotation);

                var intervalSetStartingAtZero = midi._getIntervalSetStartingAtZero(rotation);

                //console.log(intervalSetStartingAtZero, midi._getIntervalSetStartingAtZero(rotation));

                var key = midi._getSickodecimal(intervalSetStartingAtZero);

                //console.log('rsulting key: ', key);
                var inversionNumber = i;

                /*if (!_.has(chordsByAllIntervalKeys, key)) {
                    chordsByAllIntervalKeys[key] = [];
                }
                        chordsByAllIntervalKeys[key].push([currentChordName, inversionNumber, rotation.join()]);*/



                var intervalSetStartingAtZero = midi._getIntervalSetStartingAtZero(rotation);

                console.log(intervalSetStartingAtZero);

                var key = midi._getSickodecimal(intervalSetStartingAtZero);
                var inversionNumber = i;



                /*if (!_.has(chordsByAllIntervalKeys, key)) {

                    chordsByAllIntervalKeys[key] = [];
                }
                chordsByAllIntervalKeys[key].push([currentChordName, inversionNumber, rotation.join()]);*/


                if (!_.has(chordsByAllIntervalKeys, key)) {

                    chordsByAllIntervalKeys[key] = [];
                    chordsByAllIntervalKeys[key].push([currentChordName, inversionNumber, rotation.join()]);

                } else {

                    console.log(_.last(chordsByAllIntervalKeys[key])[0]);
                    console.log(currentChordName);

                    if (_.last(chordsByAllIntervalKeys[key])[0] !== currentChordName) {
                        chordsByAllIntervalKeys[key].push([currentChordName, inversionNumber, rotation.join()]);
                    }
                }



                var firstInterval = rotation.shift();
                rotation.push(firstInterval + 12);
            }
        });


        document.write('"use strict";');
        document.write('<br>');
        document.write('define(function() {');
            document.write('<br>');

        document.write('var commonChordsLookupTable = {');


        _.each(chordsByAllIntervalKeys, function(values, key) {

            document.write('<br>');
            document.write('&nbsp;&nbsp;&nbsp;&nbsp;_' + key + ': [');

            _.each(values, function(value) {
                document.write('[\'' + value[0] + '\', ' + value[1] + '], ');
            });
            document.write('],');

        });

        document.write('<br>');
        document.write('};');
        document.write('<br>');


        document.write('return commonChordsLookupTable;');
        document.write('<br>');
        document.write('});');  
    };

    function createSetsLookupTable() {

        document.write('var setsLookupTable = {');

        _.each(sets, function(value, key) {

            var str = '';
            _.each(value, function(value2, key2) {
                if (value2 !== '') {
                    str += key2 + ': \'' + value2 + '\',';
                }

            });

            if (str !== '') {
                document.write('<br>');
                document.write(key + ': {');
                _.each(value, function(value2, key2) {

                    console.log(value2);
                    if (value2 !== '') {
                        document.write(key2 + ': \'' + value2.replace("'", "\\'") + '\',');
                    }

                });

                document.write('},');
            }
        });

        document.write('<br>');
        document.write('};');
    }


    function createTestContent() {
        _.each(commonChords, function(chord) {
            document.write('<br>');
            document.write('{pitches: [' + chord.intervals + '], expected: \'' + chord.fullName.split(', ')[0] + '\'},');            
        });

    }

    //createCommonChordsLookupTable();
    createSetsLookupTable();
    //createTestContent();


});