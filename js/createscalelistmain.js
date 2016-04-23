"use strict";
define(function(require) {

    var _ = require('./libs/lodash');
    var scottScales = require('./dataSources/scottScales');
    var wikiScales = require('./dataSources/wikiScales');


//console.log(wikiScales);

function renderTable(){
    document.write('<table>');
    _.each(wikiScales, function(scale){

            document.write('<tr><td>');
            document.write(scale.join('</td><td>'));
            document.write('</td></tr>');
    });
    document.write('</table>');
}

// 1 s1 2 s2 3 4 s4 5 s5 6 s6 7

var mapToSemitoneInterval = {
    _1: 0,
    _s1: 1,
    _b2: 1,
    _2: 2,
    _s2: 3,
    _b3: 3,
    _3: 4,
    _s3: 5,    
    _b4: 4,
    _4: 5,
    _s4: 6,
    _b5: 6,
    _5: 7,
    _s5: 8,
    _b6: 8,
    _6: 9,
    _s6: 10,
    _b7: 10,
    _7: 11   
};


var wikiScaleConverted = [];

function convertIntervals(){

   _.each(wikiScales, function(scale){

        var intervals = scale[2].split(' ');
        var intervalsInSemitones = _.map(intervals, function(interval){
            return mapToSemitoneInterval['_' + interval];
        })

        wikiScaleConverted.push([scale[0], intervalsInSemitones]);
    }); 
}

convertIntervals();

console.log(wikiScaleConverted);

// fill with scott scales
var mergedScales = _.map(scottScales, function(scale){
    return [scale[0][0], scale[1]]; // first name, intervals
});

function mergeScales(){

    var scottScaleIntervals = _.map(scottScales, function(scale){
        return scale[1];
    });

    //console.log(scottScaleIntervals);

    _.each(wikiScaleConverted, function(wikiScale){

        //console.log(scale);

        var inScottScales = _.filter(scottScaleIntervals, function(scottInterval){
            //console.log(scottInterval, scale[1]);
            return _.isEqual(scottInterval.sort(), wikiScale[1].sort()); // both already sorted
        }).length > 0;

        if (!inScottScales) {
            mergedScales.push([wikiScale[0], _.sortBy(wikiScale[1])]);
        }   

        //console.log(_.includes(wikiScaleConverted, scale[1]));
    });

    console.log(mergedScales);
}

// by Greg Dean
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


function renderMerged(){

    document.write('"use strict";');
    document.write('<br>');
    document.write('define(function() {');
    document.write('<br>');
    document.write('var scales = [');

    _.each(mergedScales, function(scale){
        document.write('<br>');
        document.write('&nbsp;&nbsp;&nbsp;&nbsp;[');

        document.write('\'' + toTitleCase(scale[0]) + '\', [' + _.sortBy(scale[1])  + ']');

        document.write('],');

    });

    document.write('<br>');
    document.write('];');
    document.write('<br>');

    document.write('return scales;');
    document.write('<br>');
    document.write('});');  
}

mergeScales();
renderMerged();

});