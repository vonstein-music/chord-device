"use strict";
define(function(require) {

    var _ = require('./libs/lodash');
    var midi = require('./modules/midi');
    var commonChords = require('./dataSources/commonChords');
    var sets = require('./dataSources/sets');
    var commonChordsLookupTable = require('./data/commonChordsLookupTable');

    /*
    gegencheck vollständigkeit der von hand erstellten liste

    nur triaden und höher, bis 13th

    funktion 1: loopen, akkord mit intervallen zusammensetzen


    funktion 2: naming-rule anwenden

    */

    function createChordList() {
        var chordList = [];

        var possibleIntervals = [3, 4, 6, 7, 9, 10, 11, 14, 17, 21];

        /*var intervals = [
            {
                interval: 3
            }
        ];*/

        var quality = '';

        var intervalCombination;

        var third = intervals[1];
        var fifth = intervals[2];
        var seventh = intervals[3];

        // dim or aug?

        switch (intervalCombination[2]) {

            case 6:

                naming += 'dim';

            case 8:

                naming += 'aug';



        }

        if (=== 6) {
            naming += 'dim';

        }

    }


});