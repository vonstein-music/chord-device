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

function hasFiveWholeStepsAndTwoHalfSteps(scale){
 console.log(scale);
    scale = _.sortBy(scale[1]);
   

    var numberOfPitches = scale.length;

    if (numberOfPitches !== 7) {
        return false;
    }

    var halfSteps = 0;
    var fullSteps = 0;

    //var halfStepsSeparatedByTwoOrThreeFullSteps = 0;

    var intervals = []; // 2212221

    //var intervalCode = '';

// all major scales use the same interval sequence T-T-s-T-T-T-s
// natural minor: W, H, W, W, H, W, W        OR    T S T T S T T
console.log(scale);
    _.each(scale, function(pitch, index){



//console.log('index', index);


        var interval = Math.abs(scale[(index+1)%numberOfPitches] - pitch);
        if(interval > 6) {
            interval = 12 - interval;
        }


        if (interval === 1){
            halfSteps++;
            //intervalCode += 'W';
        }
        if (interval === 2){
            fullSteps++;
            //intervalCode += 'H';

        }
        intervals.push(interval);

        // loop intervals
        // see if previous 2 or 3 are fullsteps and the next 2 or 3 are fullsteps
    });
//console.log(intervals);

    if (fullSteps !== 5 || halfSteps !== 2) {
        return false;
    }

    var firstHalfStepIndex = _.indexOf(intervals, 1);

    var after = intervals.slice(firstHalfStepIndex, numberOfPitches);
    var before = intervals.slice(0, firstHalfStepIndex);

    //console.log(after, before);

    var str = after.join('') + before.join('');
    console.log(str);

    if (str === '1221222' || str === '1222122') {
        console.log('true');
        return true;
    }
    console.log('false');
    return false;
}
/*
    ['Major', [0,2,4,5,7,9,11]],
    ['Natural Minor', [0,2,3,5,7,8,10]],
    ['Dorian', [0,2,3,5,7,9,10]],
    ['Phrygian', [0,1,3,5,7,8,10]],
    ['Lydian', [0,2,4,6,7,9,11]],
    ['Mixolydian', [0,2,4,5,7,9,10]],
    ['Locrian', [0,1,3,5,6,8,10]],
*/
function onlyDiatonicScales(scales) {

    return _.filter(scales, function(scale){
        return hasFiveWholeStepsAndTwoHalfSteps(scale);
    });
}


function render(scales){

    document.write('"use strict";');
    document.write('<br>');
    document.write('define(function() {');
    document.write('<br>');
    document.write('var scales = [');

    _.each(scales, function(scale){
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
render(onlyDiatonicScales(mergedScales));

});