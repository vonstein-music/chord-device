var commonChords = {

    'maj': {
        intervals: [0, 4, 7],
        i2: 'R/1-3-5',
        fullName: 'Major Triad',
        desc: 'Consonant, resolved',
        comments: 'The tonality of a major chord is consonant and resolved, in other words it does not "lead away" from itself like the dominant seventh chord, or leave the listener with a sense of "suspense" like the minor seventh flat five chord.',
        exampleName: 'C, Cmaj, Cma, CMAJ, CMA, CΔ'
    },

    'min': {
        intervals: [0, 3, 7],
        i2: 'R/1-♭3-5',
        fullName: 'Minor Triad',
        desc: 'Consonant, resolved',
        comments: 'The tonality of a minor chord is consonant and resolved, though it is considerably "darker" than a major chord. It does not "lead away" from itself like the dominant seventh chord, or leave the listener with a sense of "suspense" like the minor seventh flat five chord. Major, minor and diminished triads occur naturally in the harmonized major scale (triads), an augmented triad is simply a major triad with a raised fifth degree.',
        exampleName: 'Cmi, Cmin, CMIN, CMI, C−'
    },


    'dim': {
        intervals: [0, 3, 6],
        i2: 'R/1-♭3-♭5',
        fullName: 'Diminished Triad',
        desc: 'Dissonant, unstable, unresolved',
        comments: 'The tonality of a diminished chord is dissonant, non-centered and unstable (as opposed to a major chord which is stable and resolved), and is in need of resolution to the root. The diminished chord occurs naturally in the harmonized major scale at the seventh degree, for example: in the key of C major, B⁰ is the VII chord.',
        exampleName: 'C⁰, Cdim, Cmi(♭5)'
    },

    'aug': {
        intervals: [0, 4, 8],
        i2: 'R/1-3-♯5',
        fullName: 'Augmented Triad',
        desc: 'Dissonant, unstable, unresolved',
        comments: 'The augmented triad on the fifth scale degree may be used as a substitute dominant',
        exampleName: 'C⁺, Caug, C♯5, C(♯5)',
        substitutions: ['aug7']
    },

    'maj7': {
        intervals: [0, 4, 7, 11], // 1 5 8 0 -> 4 3 4
        i2: 'R/1-3-5-7',
        fullName: 'Major seventh chord',
        desc: 'centered, consonant, stable, resolved',
        comments: 'The tonality of a major seventh chord is consonant, resolved and stable, it does not "lead away" from itself like the dominant seventh chord, or leave the listener with a sense of "suspense" like the minor seventh flat five chord.',
        descBuild: 'Major Triad plus a major 7th (11 semitones)',
        exampleName: 'CMA7, Cmaj7, CMAJ7, Cma7, CΔ7Cmaj7, CM7, CΔ, C7+'
    },

    'min7': {
        intervals: [0, 3, 7, 10], // 2 5 9 0 -> 3 4 3
        i2: 'R/1-♭3-5-♭7',
        fullName: 'Minor seventh chord',
        desc: '	Consonant, stable, resolved.',
        comments: 'The minor seventh chord occurs naturally in the harmonized major scale (tetrads) on the II, III and VI.',
        descBuild: 'Minor Triad plus a minor 7th (10 semitones)',
        exampleName: 'Cmi7, CMI7, C–7Cmin7, Cm7, Cmin7, CMIN7, C−7'
    },

    'dom7': {
        intervals: [0, 4, 7, 10],
        i2: 'R/1-3-5-♭7',
        fullName: 'Dominant seventh chord, major/minor seventh chord, 7th chord',
        desc: 'Widely used. Somewhat dissonant, unresolved',
        comments: 'The dominant seventh chord is built upon the fifth degree of the harmonized major scale (tetrads), and is widely used in all styles of music. Authentic cadence is achieved when the dominant seventh chord is resolved to the tonic chord (for example: G7 to CMA). The tonality of a dominant seventh chord is somewhat dissonant and unresolved when played as the V chord resolving to the I, but is frequently used as the I chord particularly in Funk and Blues styles. Blues players regularly substitute major chords for dominant seventh chords, for example: a I-IV-V progression in the key of G would normally be GMA, CMA and D7, Blues players may change this to G7, C7 and D7.',
        descBuild: 'Major Triad plus a minor 7th (10 semitones). Important dominant chord (V7)',
        exampleName: 'C7, Cdom7, CDOM7, C7, C(♭7), C7th',
        go: 'I' // tonic
    },

    'dim7': {
        intervals: [0, 3, 6, 9], // 3 3 3
        i2: 'R/1-♭3-♭5-Double Flat7',
        fullName: 'Diminished seventh chord, full diminished seventh chord, Diminished 7th (with Flat 5th)',
        desc: 'Dissonant, unstable, unresolved. drives towards root resolution',
        comments: 'Flat 5th can be omitted. A diminished seventh chord occurs naturally in a harmonized harmonic minor scale on the seventh scale degree, and although it does not occur naturally in a harmonized major scale, it does appear in a major scales parallel harmonic minor. The double flat (Double Flat) 7th is enharmonically equivalent to a major 6th and is one half-step/semi-tone lower than a minor 7th interval, hence the name diminished 7th. The tonality of a diminished seventh chord is dissonant and distinctly unresolved, it "drives" towards root resolution as opposed to a major seventh chord which is stable and centered.',
        descBuild: 'Diminished triad plus the interval of a diminished seventh',
        exampleName: 'C⁰7, C⁰7, Cmi6(♭5), Cdim7, C°7, Cm6(♭5, Cm7b5',
        go: 'root'
    },

    'min7f5': {
        intervals: [0, 3, 6, 10],
        i2: 'R/1-♭3-♭5-♭7',
        fullName: 'Minor seventh flat five chord, Half-diminished seventh chord',
        desc: 'Creates suspense. It has been described as a "considerable instability"',
        descBuild: 'Diminished triad plus the interval of a a minor 7th.',
        comments: 'The minor seventh flat five chord is built upon the seventh degree of the harmonized major scale (tetrads) and possesses an extraordinary drive towards root resolution. ',
        exampleName: 'Cmi7(♭5), Cø, C-7(-5), C-7 (♭5), Cø7, Dm7b5'
            //link: 'http://guitar.ricmedia.com/minor-seventh-flat-five-chord/'
    },

    'minmaj7': {
        intervals: [0, 3, 7, 11],
        fullName: 'Minor major seventh chord',
        desc: 'Weak function, rarely used. Unstable, heavily dissonant and distinctly unresolved.',
        descBuild: 'minor triad plus a major seventh (11 semitones)',
        exampleName: 'Cmi(MA7), C−(ma7), C-(MA7), mM7, mΔ7, -Δ7, mM7, m/M7, m(M7), minmaj7, m⑦,m(♮7), m7+'
    },
    
    'aug7': { //maj7s5
        intervals: [0, 4, 8, 11],
        i2: 'R/1-3-♯5-7',
        fullName: 'Major seventh sharp five chord, augmented major seventh chord',
        desc: 'Dissonant, unstable, unresolved',
        comments: 'The tonality of the major seventh sharp five chord is dissonant and unresolved, it does not particularly drive towards the root, but can be used in place of an augmented triad. Major seventh, minor seventh, dominant seventh and minor seventh flat five tetrads occur naturally in the harmonized major scale (tetrads), a major seventh sharp five tetrad is simply an augmented triad with an added major 7th interval.',
        exampleName: 'CMA7(♯5), C⁺(maj7), CΔ7(♯5), +M7, +Δ7, M7♯5, M7(♯5), M7/♯5, M7+5, maj+7, Δ+7, Caug7th',
        substitutions: ['aug']
    },// 1590 0159 -> 1 4 4, [11, 16, 8, 0] -> 0 5 9 1 -> 0159 -> 1 4 4

    'dimmaj7': {
        intervals: [0, 3, 6, 11],
        fullName: 'Diminished major seventh chord',
        desc: '',
        exampleName: 'Comaj7'
    },

    'dom7f5': {
        intervals: [0, 4, 6, 10],
        i2: 'R/1-3-♭5-♭7',
        fullName: 'Dominant seventh flat five chord, Seven Flat Five',
        desc: 'Dissonant, unresolved',
        exampleName: 'C7(♭5), C7(-5), C(♭7♭5)'
    },

    /* 9th chords */

    'add9': {
        intervals: [0, 4, 7, 14], // 0 2 4 7 -> 2 2 3
        i2: 'R/1-3-5-9',
        fullName: 'Added ninth chord',
        desc: 'Consonant, resolved',
        descBuild: 'An added ninth chord is a major triad with an added ninth. Added ninth chords differ from other ninth chords because the seventh is not included',
        comments: 'In order for a chord to be called an add9 chord it must not contain a seventh degree whether it be major, minor or diminished. This lessens the overall "major" feel of the chord and also opens up some melodic possibilities that would otherwise be unavailable. Some texts refer to the add9 chord as being equivalent to a sus2 chord however this is incorrect, the sus2 chord infers there is no third degree present in the voicing, where as the add9 chord does have a third present and it is presumed that the added ninth interval should come from the second octave above the root, however in practice this is not always the case.',
        exampleName: 'Cadd9, C(add9), Csus2, Cadd2'
    },

    'maj9': {
        intervals: [0, 4, 7, 11, 14], // 1 5 8 0 3 -> 0 1 3 5 8 -> 1 2 2 3
        i2: 'R/1-3-5-7-9',
        fullName: 'major ninth chord',
        desc: 'Consonant, resolved',
        comments: '',
        exampleName: 'CMA9, Cma7(add9), Cmaj9, CM9, CΔ9'
    },

    'min9': {
        intervals: [0, 3, 7, 10, 14], // 0 3 7 10 2 -> +2 -> 2 5 9 0 4 -> 02459
        i2: 'R/1-♭3-5-♭7-9',
        fullName: 'minor ninth chord, Minor Dominant 9th',
        desc: 'Consonant, resolved',
        comments: 'This chord has a more "bluesy" sound and fits very well with the dominant 9th',
        exampleName: 'Cmi9, Cmi7(add9), C−9, Cmin9, Cm9, Cmin9'
    },

    'augmaj9': {
        intervals: [0, 4, 8, 11, 14],
        fullName: 'Augmented Major 9th',
        exampleName: 'C+M9, Caugmaj9'
    },
    

    'minmaj9': {
        intervals: [0, 3, 7, 11, 14], // ->+1: 1 4 8 0 3 ->geordnet: 01348 ODER 0, 3, 7, 11, 2
        i2: 'R/1-♭3-5-7-9',
        fullName: 'Minor-major ninth chord',
        desc: 'Dissonant, unresolved',
        comments: '',
        exampleName: 'Cmi(MA7), C-(maj9), C-(maj9), CmM9, C−M9, Cminmaj9' // 0 3 7 11 14 +1, %12 -> 1 4 8 0 3 -> 0 1 3 4 8 -> 1 2 1 4
    }, // 0, 15, 7, 11, 14 -> 1 4 8 0 3 -> 01348

    'minadd9': {
        intervals: [0, 3, 7, 14],
        i2: 'R/1-♭3-5-9',
        fullName: 'Minor added ninth chord',
        desc: 'Somewhat Dissonant, unresolved',
        comments: 'As with the major added ninth chord, to be called a miadd9 chord it must not contain a seventh degree whether it be major, minor or diminished.',
        exampleName: 'Cmiadd9, Cmi(add9), C-add9'
    },


    'min9dim5': {
        intervals: [0, 3, 6, 10, 14],
        fullName: 'Minor Ninth Diminished Fifth, Half-Diminished 9th',
        exampleName: 'CØ9'
    },

    'maj9s11': {
        intervals: [0, 4, 7, 14, 18],
        i2: 'R/1-3-5-7-9-♯11',
        fullName: 'Major ninth sharp eleventh chord',
        desc: 'Somewhat dissonant, resolved',
        comments: '',
        exampleName: 'CMA9(♯11), Cma9(+11)'
    },

    'dom9s5': {
        intervals: [0, 4, 8, 10, 14],
        i2: 'R/1-3-♯5-♭7-9',
        fullName: 'Dominant ninth sharp five chord, Augmented Dominant 9th',
        desc: 'Dissonant, unresolved',
        comments: '',
        exampleName: 'C9(♯5), Cdom9(♯5), C+9 / C9♯5 Caug9'
    },

    'dim9': {
        intervals: [0, 3, 6, 9, 14],
        fullName: 'Diminished 9th',
        exampleName: 'C°9, Cdim9'
    },

    'hdimmin9': {
        intervals: [0, 3, 6, 10, 13],
        fullName: 'Half-Diminished Minor 9th',
        exampleName: 'CØ♭9'
    },



    'dimmin9': {
        intervals: [0, 3, 6, 9, 13],
        fullName: 'Diminished Minor 9th',
        exampleName: 'C°♭9, Cdim♭9'
    },

    'dom9f5': {
        intervals: [0, 4, 6, 10, 14],
        i2: 'R/1-3-♭5-♭7-9',
        fullName: 'Dominant ninth flat five chord',
        desc: 'Dissonant, unresolved',
        comments: '',
        exampleName: 'C9(♭5), Cdom9(♭5)'
    },

    'dom9': {
        intervals: [0, 4, 7, 10, 14],
        i2: 'R/1-3-5-♭7-9',
        fullName: 'Dominant 9th, Dominant ninth chord',
        desc: 'Somewhat dissonant, resolved',
        descBuild: 'The dominant ninth (V9) is a dominant seventh plus a major or minor ninth',
        comments: '',
        exampleName: 'C9, Cdom9, C7(add9)'
    },

    'dommin9': {
        intervals: [0, 4, 7, 10, 13],
        i2: 'R/1-3-5-♭7-♭9',
        fullName: 'Dominant minor 9th, Dominant seventh flat ninth chord',
        desc: 'dissonant, unstable, unresolved. C7♭9 (C E G B♭ D♭) is particularly effective in heightening the drama and sense of threat',
        exampleName: 'C7(♭9), C7(-9) or C(-7-9)'
    },

    'dom7s9': {
        intervals: [0, 4, 7, 10, 15],
        i2: 'R/1-3-5-♭7-♯9',
        fullName: 'Dominant seventh sharp ninth chord, dominant 7♯9 chord, Hendrix chord',
        desc: 'Dissonant, unstable, unresolved. Important chord. The ninth is available in flat, natural, sharp, and flat-and-sharp "alt" styles. (augmented 9th or R/1-3-5-♭7-♯9).',
        exampleName: '7#9, C7(♯9), C7+9 or C-7+9'
            /* http://guitar.ricmedia.com/ */
    },

    'dom7s5s9': {
        intervals: [0, 4, 8, 10, 15],
        i2: 'R/1-3-♯5-♭7-♯9',
        fullName: 'Dominant seventh sharp five sharp ninth chord',
        desc: 'Dissonant, unresolved',
        exampleName: 'C7(♯5♯9), C7(+5+9)'
    },

    'dom7s5f9': {
        intervals: [0, 4, 8, 10, 13],
        i2: 'R/1-3-♯5-♭7-♭9',
        fullName: 'Dominant seventh sharp five flat ninth chord',
        desc: 'Dissonant, unresolved',
        exampleName: 'C7(♯5♭9), C7(+5-9)'
    },

    'dom7s5': {
        intervals: [0, 4, 8, 10],
        i2: 'R/1-3-♯5-♭7',
        fullName: 'dominant seventh sharp five chord, augmented seventh chord, Seven Sharp Five, augmented major seventh',
        desc: 'Dissonant, unstable, unresolved',
        exampleName: 'C7(♯5), C+7 or Caug(7), Caug7th'
    },

    'dom7s11': {
        intervals: [0, 4, 7, 10, 13, 18],
        i2: 'R/1-3-5-♭7-9-♯11',
        fullName: 'Dominant seventh sharp eleventh chord',
        desc: 'Dissonant, unstable, unresolved',
        exampleName: 'C7(♯11), C7+11 or C-7+11'
    },

    'dom7f5f9': {
        intervals: [0, 4, 6, 10, 13],
        i2: 'R/1-3-♭5-♭7-♭9',
        fullName: 'Dominant seventh flat five flat ninth chord',
        desc: 'Dissonant, unresolved',
        exampleName: 'C7(♭5♭9) or C7(-5-9)'
    },

    'dom7f5f9': {
        intervals: [0, 4, 6, 10, 15],
        i2: 'R/1-3-♭5-♭7-♯9',
        fullName: 'Dominant seventh flat five sharp ninth chord',
        desc: 'Dissonant, unresolved',
        exampleName: 'C7(♭5♯9), C7(-5+9)'
    },

    'min7s5': {
        intervals: [0, 3, 7, 9, 14],
        i2: 'R/1-♭3-5-6-9',
        fullName: 'Minor seventh sharp five chord, minor six-nine chord',
        desc: 'Somewhat dissonant, resolved',
        exampleName: 'Cmi6/9 or C−6/9'
    },

    'maj7f5': {
        intervals: [0, 4, 6, 11],
        i2: 'R/1-3-♭5-7',
        fullName: 'Major seventh flat five chord',
        desc: 'Dissonant, unresolved',
        exampleName: 'CMA7(♭5), CMA7(-5), CΔ7(♭5)'
    },

    'maj7s11': {
        intervals: [0, 4, 7, 14, 18],
        i2: 'R/1-3-5-7-9-♯11',
        fullName: 'Major seventh sharp eleventh chord',
        desc: 'Dissonant, unresolved',
        exampleName: 'CMA7(♯11), Cmaj7(♯11), CΔ7(♯11), Cmaj7(♯11), CΔ7(♯11)'
    },

    /* 6th chords*/

    'min6': {
        intervals: [0, 3, 7, 9],
        i2: 'R/1-♭3-5-6',
        fullName: 'Minor sixth chord',
        desc: 'Consonant, resolved',
        exampleName: 'Cmi6, Cmiadd6, Cmi(maj6), Cmin6'
    },

    'min69': {
        intervals: [0, 3, 7, 9, 14],
        i2: 'R/1-♭3-5-6-9',
        fullName: 'Minor six-nine chord',
        desc: '	Somewhat dissonant, resolved',
        exampleName: 'Cmi6/9, C−6/9'
    },

    'maj6': {
        intervals: [0, 4, 7, 9],
        i2: 'R/1-3-5-6',
        fullName: 'Major sixth chord',
        desc: 'Consonant, resolved',
        exampleName: 'C6, Cma6, Cadd6, Cmaj6'
    },

    'maj69': {
        intervals: [0, 4, 7, 9, 14],
        i2: 'R/1-3-5-6-9',
        fullName: 'Major six-nine chord',
        desc: 'Consonant, resolved',
        exampleName: 'C6/9, Cma6/9, Csix-nine'
    },

    /* 11th chords*/

    'min11': {
        intervals: [0, 3, 7, 10, 14, 17],
        i2: 'R/1-♭3-5-♭7-9-11',
        fullName: 'Minor eleventh chord',
        desc: 'Consonant, resolved',
        comments: '',
        exampleName: 'Cmi11, C-11, Cm11, Cmin11'
    },

    'maj11': {
        intervals: [0, 4, 7, 11, 14, 17],
        i2: 'R/1-3-5-7-9-11',
        fullName: 'Major eleventh chord',
        desc: 'Somewhat dissonant, resolved',
        comments: 'http://guitar.ricmedia.com/major-eleventh-chord/',
        exampleName: 'CMA11, Cmaj11, CMAJ11, Cma11, CΔ11, CMA9sus4, CMA9sus, CM11'
    },

    'dom11f9': {
        intervals: [0, 4, 7, 10, 13, 17],
        i2: 'R/1-3-5-♭7-♭9-11',
        fullName: 'Dominant eleventh flat ninth chord',
        desc: 'Dissonant, unresolved',
        comments: '',
        exampleName: 'C11(♭9), Cdom11(♭9)'
    },

    'dom11': {
        intervals: [0, 4, 7, 14, 17],
        i2: 'R/1-3-5-♭7-9-11',
        fullName: 'Dominant eleventh chord',
        desc: 'Somewhat dissonant, unresolved',
        comments: '',
        exampleName: 'C11, Cdom11, C9sus4, C9sus'
    },

    /* 13th chords */

    'min13': {
        intervals: [0, 3, 7, 10, 14, 21],
        i2: 'R/1-♭3-5-♭7-9-13',
        fullName: 'Minor thirteenth chord',
        desc: 'Somewhat dissonant, resolved',
        comments: '',
        exampleName: 'Cmi13, Cmi13(no11)'
    },

    'maj13s11': {
        intervals: [0, 4, 7, 11, 14, 18, 21],
        i2: 'R/1-3-5-7-9-♯11-13',
        fullName: 'Major thirteenth sharp eleventh chord',
        desc: 'Somewhat dissonant, unresolved',
        comments: 'A major thirteenth sharp eleventh chord is formed due to the dissonance created between the major third and perfect eleventh (perfect fourth) intervals in a major thirteenth chord voiced with an eleventh interval included. Normally, we omit the eleventh from major and dominant thirteenth voicings due to this dissonance, and limitation of six notes on a six string guitar, alternatively we can sharpen the eleventh and remove the fifth or ninth intervals, the major thirteenth sharp eleventh chord is a result of this latter process.',
        exampleName: 'CMA13(♯11), Cmaj13(♯11)'
    },

    'maj13': {
        intervals: [0, 4, 7, 11, 14, 21],
        i2: 'R/1-3-5-7-9-13',
        fullName: 'Major thirteenth chord',
        desc: 'Consonant, resolved',
        comments: '',
        exampleName: 'CMA13, Cma13(no11)'
    },

    'dom13s9': {
        intervals: [0, 4, 7, 10, 15, 21],
        i2: 'R/1-3-5-♭7-♯9-13',
        fullName: 'Dominant thirteenth sharp ninth chord',
        desc: 'Dissonant, unresolved',
        comments: '',
        exampleName: 'C13(♯9), Cdom13(♯9)'
    },

    'dom13s11': {
        intervals: [0, 4, 7, 10, 14, 18, 21],
        i2: 'R/1-3-5-♭7-9-♯11-13',
        fullName: 'Dominant thirteenth sharp eleventh chord',
        desc: 'Dissonant, unresolved',
        comments: 'A dominant thirteenth sharp eleventh chord comes about due to the dissonance created between the major third and perfect eleventh (perfect fourth) intervals in a dominant thirteenth chord voiced with an eleventh interval included. Normally, we omit the eleventh from major and dominant thirteenth voicings due to this dissonance, and limitation of six notes on a six string guitar, alternatively we can sharpen the eleventh and remove the fifth or ninth intervals, the dominant thirteenth sharp eleventh chord is a result of this latter process.',
        exampleName: 'C13(♯11), Cdom13(♯11)'
    },

    'dom13f9': {
        intervals: [0, 4, 7, 10, 13, 21],
        i2: 'R/1-3-5-♭7-♭9-13',
        fullName: 'Dominant thirteenth flat ninth chord',
        desc: 'Dissonant, unresolved',
        comments: '',
        exampleName: 'C13(♭9), Cdom13(♭9)'
    },

    'dom13': {
        intervals: [0, 4, 7, 10, 14, 21],
        i2: 'R/1-3-5-♭7-9-13',
        fullName: 'Dominant thirteenth chord',
        desc: 'Somewhat dissonant, unresolved',
        comments: '',
        exampleName: 'C13, C13(no11)'
    },

    /* suspended chords */

    'sus2sus4': {
        intervals: [0, 2, 5, 7],
        i2: 'R/1-2-4-5',
        fullName: 'Suspended second suspended fourth chord',
        desc: 'Consonant, unresolved',
        comments: '',
        exampleName: 'Csus2sus4, C(sus2sus4)'
    },

    'sus2': {
        intervals: [0, 2, 7],
        i2: 'R/1-2-5',
        fullName: 'Suspended Second Chord',
        desc: 'Consonant, unresolved. creates an open sound, dissonance creates tension',
        exampleName: 'Csus2, C(sus2)'
    },

    'sus4': {
        intervals: [0, 5, 7],
        i2: 'R/1-4-5',
        fullName: 'Suspended Fourth Chord',
        desc: 'Consonant, unresolved. creates an open sound, dissonance creates tension',
        exampleName: 'Csus4, Csus'
    },

    'maj7sus2': {
        intervals: [0, 2, 7, 11],
        i2: 'R/1-2-5-7',
        fullName: 'Major seventh suspended second chord',
        desc: 'Somewhat dissonant, unresolved',
        comments: '',
        exampleName: 'CMA7sus2, CMA(sus2)'
    },

    'maj7sus4': {
        intervals: [0, 5, 7, 11],
        i2: 'R/1-4-5-7',
        fullName: 'Major seventh suspended fourth chord',
        desc: 'Somewhat dissonant, unresolved. It is not necessary to resolve the major seventh suspended fourth chord, it is mearly a tonal tool we can use if required.',
        comments: 'The major seventh suspended fourth chord has a major tonality even though it lacks a 3rd degree, its the major seventh interval that gives it this quality. If the perfect 4th (suspended 4th) is resolved to the major 3rd the major quality becomes even clearer.',
        exampleName: 'CMA7sus4, CMAsus'
    },

    'dom11': {
        intervals: [0, 4, 7, 10, 14, 17],
        fullName: 'Dominant 11th, Eleventh',
        exampleName: 'C11, Cdom11'
    }, 

    'aug11': {
        intervals: [0, 4, 8, 11, 14, 17],
        fullName: 'Augmented 11th'
        exampleName: 'C+11, C11♯5, Caug11'
    },

    'hdim11': {
        intervals: [0, 3, 6, 10, 13, 17],
        fullName: 'Half-Diminished 11th'
        exampleName: 'CØ11'
    },   
    
    'dim11': {
        intervals: [0, 3, 6, 9, 13, 16],
        fullName: 'Diminished 11th'
        exampleName: 'C°11, Cdim11'
    },    


    

    'augdom11': {
        intervals: [0, 4, 8, 10, 14, 17, 21],
        fullName: 'Augmented Dominant 13th'
        exampleName: 'C+13, C13♯5, Caug13'
    },


    'dom13': {
        intervals: [0, 4, 7, 10, 14, 17, 21],
        fullName: 'Dominant 13th, Thirteenth',
        exampleName: 'C13, Cdom13'
    },

    'mindom13': {
        intervals: [0, 3, 7, 10, 14, 17, 21],
        fullName: 'Minor Dominant 13th, Minor Thirteenth',
        exampleName: 'Cm13, C−13, Cmin13'

    },

    'minmaj13': {
        intervals: [0, 3, 7, 11, 14, 17, 21],
        fullName: 'Minor Major Thirteenth'
        exampleName: 'CmM13, C−M13, Cminmaj13'
    },

    'augmaj13': {
        intervals: [0, 4, 8, 11, 14, 17, 21],
        fullName: 'Augmented Major 13th'
        exampleName: 'C+M13, Caugmaj13'
    },

    'augdom13': {
        intervals: [0, 4, 8, 10, 14, 17, 21],
        fullName: 'Augmented Dominant 13th'
        exampleName: 'C+13, C13♯5, Caug13'
    },

    'hdim13': {
        intervals: [0, 3, 6, 10, 14, 17, 21],
        fullName: 'Half-Diminished 13th'
        exampleName: 'CØ13'
    },
    

    'maj13': {
        intervals: [0, 4, 7, 11, 14, 17, 21],
        fullName: 'Major Thirteenth',
        exampleName: 'CM13, CΔ13, Cmaj13'
    },

    'dom13sus4': {
        intervals: [0, 5, 7, 10, 14, 21],
        i2: 'R/1-4-5-♭7-9-13',
        fullName: 'Dominant thirteenth suspended fourth chord',
        desc: 'Consonant, unresolved',
        comments: '',
        exampleName: 'C13sus4, C13sus'
    },

    'dom7sus2': {
        intervals: [0, 2, 7, 10],
        i2: 'R/1-2-5-♭7',
        fullName: 'Dominant seventh suspended second chord',
        desc: 'Somewhat dissonant, unresolved. It is not necessary to resolve the dominant seventh suspended second or the minor seventh suspended second chords, it is mearly a tonal tool we can use if required.',
        comments: 'http://guitar.ricmedia.com/dominant-seventh-suspended-second-chord/',
        exampleName: 'C7sus2, C7(sus2)'
    },

    'dom7sus4': {
        intervals: [0, 5, 7, 10],
        i2: 'R/1-4-5-♭7',
        fullName: 'Dominant seventh suspended fourth chord',
        desc: 'Somewhat dissonant, unresolved. It is not necessary to resolve the dominant seventh suspended fourth or the minor seventh suspended fourth chords, it is merely a tonal tool we can use if required.',
        comments: 'http://guitar.ricmedia.com/dominant-seventh-suspended-second-chord/',
        exampleName: 'C7sus4, C7sus'
    },

    'dom9sus4': {
        intervals: [0, 5, 7, 10, 14],
        i2: 'R/1-4-5-♭7-9',
        fullName: 'Dominant ninth suspended fourth chord',
        desc: 'Consonant, unresolved',
        comments: '',
        exampleName: 'C9sus4, C9sus'
    },

    /* special chords */
    'pow': {
        intervals: [0, 7],
        i2: 'R/1-5',
        fullName: 'Power Chord',
        desc: 'Consonant, resolved. Can go anywhere, indetermant. Good when distorted.',
        exampleName: 'C5, C(no 3)'
    },

    'powOct': {
        intervals: [0, 7, 12],
        i2: 'R/1-5-1',
        fullName: 'Power Chord Octave Doubled',
        desc: 'Consonant, resolved. Can go anywhere, indetermant. Good when distorted.',
        exampleName: 'C5, C(no 3)'
    },

    'flat5': {
        intervals: [0, 4, 6],
        i2: 'R/1-3-♭5',
        fullName: 'Flat five chord',
        desc: 'Dissonant, unresolved',
        exampleName: 'C♭5, C♭5, C♭5'
    },

	'flat5low': {
        intervals: [0, 2, 6],
        i2: 'R/1-2-♭5',
        fullName: 'Flat five chord',
        desc: 'Dissonant, unresolved',
        exampleName: 'C♭5, C♭5, C♭5'
    },

    'mu': {
        intervals: [0, 2, 4, 7],
        fullName: 'Mu chord',
        desc: 'may be used in chord substitution to replace simple major triads',
        exampleName: 'μ'
    },
};