"use strict";
define(function() {

// from: https://en.wikipedia.org/wiki/List_of_musical_scales_and_modes

var wikiScales = [
	['"Gypsy" scale[a]', '"Gypsy" [sic] scale on C.', '1 2 b3 s4 5 b6 b7', '7', 'Gypsy', 'Phrygian', 'Unusual'],
	['Acoustic scale', 'Acoustic scale on C.', '1 2 3 s4 5 6 b7', '7', 'whole tone', 'minor', ''],
	['Aeolian mode or natural minor scale', 'Aeolian on C.', '1 2 b3 4 5 b6 b7', '7', 'minor', 'Phrygian', 'Usual'],
	['Altered scale', 'Altered scale on C.', '1 b2 b3 b4 b5 b6 b7', '7', 'diminished', 'whole tone', ''],
	['Augmented scale', 'Augmented scale on C.', '1 b3 3 5 s5 7', '6', '—', '—', ''],
	['Bebop dominant scale', 'Bebop dominant scale on C.', '1 2 3 4 5 6 b7 7', '8', '—', '—', ''],
	['Blues scale', 'Blues scale on C.', '1 b3 4 s4 5 b7', '6', '—', '—', ''],
	['Chromatic scale', 'Chromatic scale on C.', '1 s1 2 s2 3 4 s4 5 s5 6 s6 7'],
	['Dorian mode', 'Dorian on C.', '1 2 b3 4 5 6 b7', '7', 'minor', 'minor', 'Usual'],
	['Double harmonic scale', 'Double harmonic scale on C.', '1 b2 3 4 5 b6 7', '7', 'harmonic', 'harmonic', 'Unusual'],
	['Enigmatic scale', 'Enigmatic scale on C.', '1 b2 3 s4 s5 s6 7', '7', '', '', 'Unusual'],
	['Flamenco mode', 'Flamenco mode on C.', '1 b2 3 4 5 b6 7', '7', 'Phrygian', 'Phrygian', 'Unusual'],
	['Half diminished scale', 'Half diminished scale on C.', '1 2 b3 4 b5 b6 b7', '7', 'minor', 'whole tone', ''],
	['Harmonic major scale', 'Harmonic major scale on C.', '1 2 3 4 5 b6 7', '7', 'major', 'harmonic', ''],
	//['Harmonic minor scale', 'Harmonic minor scale on C.', '1 2 b3 4 5 b6 (♮)7', '7', 'minor', 'harmonic', ''],
	['Hirajoshi scale', 'Hirajoshi scale on C.', '1 2 b3 5 b6', '5', '—', '—', '—'],
	['Hungarian "Gypsy" scale[a]', 'Hungarian "Gypsy"[sic] scale on C.', '1 2 b3 s4 5 b6 7', '7', 'Gypsy', 'harmonic', 'Unusual'],
	['Hungarian minor scale', 'Hungarian minor scale on C.', '1 2 b3 s4 5 b6 7', '7', 'Gypsy', 'harmonic', ''],
	['In scale', 'Miyako-bushi scale on D; equivalent toin scale on D; with brackets on fourths.', '1 b2 4 5 b6', '5', '—', '—', ''],
	['Insen scale', 'Insen scale on C.', '1 b2 4 5 b7', '5', '—', '—', '—'],
	['Ionian mode or major scale', 'Ionian on C.', '1 2 3 4 5 6 7', '7', 'major', 'major', 'Usual'],
	['Istrian scale', 'Istrian mode on C.', '1 b2 b3 b4 b5 5', '6', '—', '—', '—'],
	['Iwato scale', 'Iwato scale on C.', '1 b2 4 b5 b7', '5', '—', '—', '—'],
	['Locrian mode', 'Locrian on C.', '1 b2 b3 4 b5 b6 b7', '7', 'Phrygian', 'whole tone', 'Usual'],
	['Lydian augmented scale', 'Lydian augmented scale on C.', '1 2 3 s4 s5 6 7', '7', 'whole tone', 'diminished', ''],
	['Lydian mode', 'Lydian on C.', '1 2 3 s4 5 6 7', '7', 'whole tone', 'major', 'Usual'],
	['Major bebop scale (#5)', 'Major bebop scale on C.', '1 2 3 4 5 s5 6 7', '7', '—', '—', ''],
	['Major bebop scale (b6)', 'Major bebop scale on C.', '1 2 3 4 5 b6 6 7', '7', '—', '—', ''],
	['Major bebop scale (#5 and b6)', 'Major bebop scale on C.', '1 2 3 4 5 s5 b6 6 7', '8', '—', '—', ''],
	['Major Locrian scale', 'Major Locrian scale C.', '1 2 3 4 b5 b6 b7', '7', 'major', 'whole tone', ''],
	['Major pentatonic scale', 'Major pentatonic scale on C.', '1 2 3 5 6', '5', '—', '—', 'Usual'],

	['Melodic minor scale (ascending)', 'Melodic minor scale ascending on A.', '1 2 b3 4 5 6 7', '7', 'minor', 'varies?', ''],
	['Melodic minor scale (descending)', 'Melodic minor scale descending on A.', '1 2 b3 4 5 b6 b7', '7', 'minor', 'varies?', ''],

	['Minor pentatonic scale', 'Minor pentatonic scale on A.', '1 b3 4 5 b7', '5', '—', '—', 'Usual'],
	['Mixolydian mode or Adonai malakh mode', 'Mixolydian on C.', '1 2 3 4 5 6 b7', '7', 'major', 'minor', 'Usual'],
	['Neapolitan major scale', 'Neapolitan major scale on C.', '1 b2 b3 4 5 6 7', '7', 'Phrygian', 'major', 'Unusual'],
	['Neapolitan minor scale', 'Neapolitan minor scale on C.', '1 b2 b3 4 5 b6 7', '7', 'Phrygian', 'harmonic', 'Unusual'],
	['Octatonic scale 1', 'Octatonic scales on C.', '1 2 b3 4 b5 b6 6 7', '8', '—', '—', ''],
	['Octatonic scale 2', 'Octatonic scales on C.', '1 b2 b3 3 s4 5 6 b7', '8', '—', '—', ''],
	['Persian scale', 'Persian scale on C.', '1 b2 3 4 b5 b6 7', '7', 'harmonic', 'unusual', ''],
	['Phrygian dominant scale', 'Phrygian dominant on C.', '1 b2 3 4 5 b6 b7', '7', 'harmonic', 'Phrygian', 'Unusual'],
	['Phrygian mode', 'Phrygian on C.', '1 b2 b3 4 5 b6 b7', '7', 'Phrygian', 'Phrygian', 'Usual'],
	['Prometheus scale', 'Prometheus scale on C.', '1 2 3 s4 6 b7', '6', '—', '—', ''],
	['Tritone scale', 'Tritone scale on C.', '1 b2 3 b5 5 b7', '6', '—', '—', ''],
	['Ukrainian Dorian scale', 'Ukrainian Dorian mode on C.', '1 2 b3 s4 5 6 b7', '7', 'Gypsy', 'minor', 'Unusual'],
	['Whole tone scale', 'Whole tone scale on C.', '1 2 3 s4 s5 s6', '6', '—', '—', ''],
	['Yo scale', 'Minyō scale on D; equivalent to yoscale on D; with brackets on fourths.', '1 b3 4 5 7', '5', '—', '—', '']
];

    return wikiScales;
}); 