"use strict";
define(function() {

// from: https://www.cs.cmu.edu/~scottd/chords_and_scales/music.js

var scottScales = [
    [
        ["Major", "Ionian"],
        [0, 2, 4, 5, 7, 9, 11]
    ],
    [
        ["natural minor", "Aeolian"],
        [0, 2, 3, 5, 7, 8, 10]
    ],
    [
        ["harmonic minor", "Mohammedan"],
        [0, 2, 3, 5, 7, 8, 11]
    ],
    [
        ["melodic minor"],
        [0, 2, 3, 5, 7, 9, 11]
    ],
    [
        ["major pentatonic"],
        [0, 2, 4, 7, 9]
    ],
    [
        ["minor pentatonic"],
        [0, 3, 5, 7, 10]
    ],
    [
        ["blues"],
        [0, 3, 5, 6, 7, 10]
    ],
    [
        ["minor blues"],
        [0, 2, 3, 5, 6, 7, 8, 10]
    ],
    [
        ["major blues"],
        [0, 2, 3, 4, 5, 6, 7, 9, 10]
    ],
    [
        ["augmented", "whole tone"],
        [0, 2, 4, 6, 8, 10]
    ],
    [
        ["diminished"],
        [0, 2, 3, 5, 6, 8, 9, 11]
    ],
    [
        ["Phrygian-Dominant", "major Phrygian", "Spanish-flamenco"],
        [0, 1, 4, 5, 7, 8, 10]
    ],
    [
        ["Dorian"],
        [0, 2, 3, 5, 7, 9, 10]
    ],
    [
        ["Phrygian"],
        [0, 1, 3, 5, 7, 8, 10]
    ],
    [
        ["Lydian"],
        [0, 2, 4, 6, 7, 9, 11]
    ],
    [
        ["Mixolydian"],
        [0, 2, 4, 5, 7, 9, 10]
    ],
    [
        ["Locrian"],
        [0, 1, 3, 5, 6, 8, 10]
    ],
    [
        ["jazz melodic minor"],
        [0, 2, 3, 5, 7, 9, 11]
    ],
    [
        ["Dorian b2"],
        [0, 1, 3, 5, 7, 9, 10]
    ],
    [
        ["Lydian augmented"],
        [0, 2, 4, 6, 8, 9, 11]
    ],
    [
        ["Lydian b7", "overture"],
        [0, 2, 4, 6, 7, 9, 10]
    ],
    [
        ["Mixolydian b13", "Hindu"],
        [0, 2, 4, 5, 7, 8, 10]
    ],
    [
        ["Locrian #2"],
        [0, 2, 3, 5, 6, 8, 10]
    ],
    [
        ["super Locrian", "altered"],
        [0, 1, 3, 4, 6, 8, 10]
    ],
    [
        ["whole half diminished"],
        [0, 2, 3, 5, 6, 8, 9, 11]
    ],
    [
        ["half whole diminished"],
        [0, 1, 3, 4, 6, 7, 9, 10]
    ],
    [
        ["enigmatic"],
        [0, 1, 4, 6, 8, 10, 11]
    ],
    [
        ["double harmonic", "gypsy", "Byzantine"],
        [0, 1, 4, 5, 7, 8, 11]
    ],
    [
        ["Hungarian minor"],
        [0, 2, 3, 6, 7, 8, 11]
    ],
    [
        ["Persian"],
        [0, 1, 4, 5, 6, 8, 11]
    ],
    [
        ["Arabian", "major Locrian"],
        [0, 2, 4, 5, 6, 8, 10]
    ],
    [
        ["Japanese"],
        [0, 1, 5, 7, 8]
    ],
    [
        ["Egyptian"],
        [0, 2, 5, 7, 10]
    ],
    [
        ["Hirajoshi"],
        [0, 2, 3, 7, 8]
    ]
];

    return scottScales;
}); 
