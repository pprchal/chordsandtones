// Pavel Prchal 2019, 2020

export const DB = {
  version: "1.3",
  chords: [
    { name: "dur",  distances: [ 0, 4, 7 ], families: ["dur"] },
    { name: "aug",  distances: [ 0, 4, 8 ], families: ["aug"] },
    { name: "7",    distances: [ 0, 4, 7, 10 ], families: ["7"] },
    { name: "7/6",  distances: [ 0, 4, 7, 9, 10 ], families: ["7"] },
    { name: "maj7", distances: [ 0, 4, 7, 11 ], families: ["7"] },
    { name: "5",    distances: [ 0, 7, 12 ], families: ["5"] },
    { name: "6/9",  distances: [ 0, 2, 4, 7, 11 ], families: ["6"] },
    { name: "6",    distances: [ 0, 4, 7, 9 ], families: ["6"] },
    { name: "9",    distances: [ 0, 4, 10, 14 ], families: ["9"] },
    { name: "11",   distances: [ 0, 5, 10, 14, 19 ], families: ["11"] },
    { name: "m11",  distances: [ 0, 5, 10, 14, 17 ], families: ["11"] },    
    { name: "13",   distances: [ 0, 4, 10, 14, 21 ], families: ["13"] },
    { name: "m13",  distances: [ 0, 4, 10, 15, 21 ], families: ["13"] },
    { name: "aug7", distances: [ 0, 4, 8, 10 ], families: ["7"] },
    { name: "mol",  distances: [ 0, 3, 7], families: ["mol"] },
    { name: "dim",  distances: [ 0, 3, 6, 9 ], families: ["dim"]  },
    { name: "sus4", distances: [ 0, 5, 7 ], families: ["sus"] }
  ],

  scales: [
    { name: "dur", distances: [ [ 0, 2, 4, 5, 7, 9, 11 ] ] },
    { name: "mol", distances: [ [ 0, 2, 3, 5, 7, 8, 10 ] ] },
    { name: "penta-mol", distances: [ [ 0, 3, 5, 7, 10 ] ] },
    { name: "penta-dur", distances: [ [ 0, 2 ,4, 7, 9 ] ] },
    { name: "lydic", distances: [ [ 0, 2, 4, 6, 7, 9, 11 ] ] },    
    { name: "mixolydic", distances: [ [ 0, 2, 4, 5, 7, 9, 10 ] ] },
    { name: "locrian", distances: [ [ 0, 1, 3, 5, 6, 8, 10 ] ] },
    { name: "dorian", distances: [ [ 0, 2, 3, 5, 7, 9, 10 ] ] },
    { name: "hexa-blues", distances: [ [ 0, 3, 5, 6, 7, 10 ] ] },
    { name: "melodic-mol", distances: [ [ 0, 2, 4, 5, 7, 9, 11 ], [ 0, 2, 3, 5, 7, 9, 11 ] ] } 
  ],

  tones: [
    { name: "C",  octave: 3 }, 
    { name: "C#", octave: 3 },
    { name: "D",  octave: 3 },
    { name: "D#", octave: 3 },
    { name: "E",  octave: 3 },
    { name: "F",  octave: 3 },
    { name: "F#", octave: 3 },
    { name: "G",  octave: 3 },
    { name: "G#", octave: 3 },
    { name: "A",  octave: 3 },
    { name: "B",  octave: 3 },
    { name: "H",  octave: 1 }
  ],

  "intervals":[
    { name: "???", distance: -1 },
    { name: "čistá prima", distance: 0 },
    { name: "malá sekunda", distance: 1 },
    { name: "velká sekunda", distance: 2 },
    { name: "malá tercie", distance: 3 },
    { name: "velká tercie", distance: 4 },
    { name: "čistá kvarta", distance: 5 },
    { name: "zvětšená kvarta", distance: 6 },
    { name: "kvinta", distance: 7 },
    { name: "malá sexta", distance: 8 },
    { name: "velká sexta", distance: 9 },
    { name: "malá septima", distance: 10 },
    { name: "velká septima", distance: 11 },
    { name: "čistá oktáva", distance: 12 }
  ],

  tunings : [ 
    {
        name: "equal-tempered",
        frequencies: [16.35,17.32,18.35,19.45,20.60,21.83,23.12,24.50,25.96,27.50,29.14,30.87,32.70,34.65,36.71,38.89,41.20,43.65,46.25,49.00,51.91,55.00,58.27,61.74,65.41,69.30,73.42,77.78,82.41,87.31,92.50,98.00,103.83,110.00,116.54,123.47,130.81,138.59,146.83,155.56,164.81,174.61,185.00,196.00,207.65,220.00,233.08,246.94,261.63,277.18,293.66,311.13,329.63,349.23,369.99,392.00,415.30,440.00,466.16,493.88,523.25,554.37,587.33,622.25,659.25,698.46,739.99,783.99,830.61,880.00,932.33,987.77,1046.50,1108.73,1174.66,1244.51,1318.51,1396.91,1479.98,1567.98,1661.22,1760.00,1864.66,1975.53,2093.00,2217.46,2349.32,2489.02,2637.02,2793.83,2959.96,3135.96,3322.44,3520.00,3729.31,3951.07,4186.01,4434.92,4698.63,4978.03,5274.04,5587.65,5919.91,6271.93,6644.88,7040.00,7458.62,7902.13]
    }
  ],

  qround : [ 
    { n: 0,  chord: "dur", name: "tónika" },             // C
    { n: 7,  chord: "dur", name: "dominanta"},           // G
    { n: 2,  chord: "mol", name: "mollová subdominanta"},// D
    { n: 9,  chord: "mol", name: "mollová tónika"},      // A
    { n: 4,  chord: "mol", name: "mollová dominanta"},   // E
    { n: 11, chord: "",    name: "dominanta"},           // H
    { n: 6,  chord: "",    name: "dominanta"},           // F#
    { n: 1,  chord: "",    name: ""},                    // C#           
    { n: 8,  chord: "",    name: ""},                    // G#
    { n: 3,  chord: "",    name: ""},                    // D#
    { n: 10, chord: "",    name: ""},                    // B
    { n: 5,  chord: "dur", name: "subdominanta"}         // F
  ],

  harmonicas : [
    { 
      name: "Richter diatonická",
      startOctave: 3,
      template : [
          { name: "1",         type: "+", offsets: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 10 ] },
          { name: "1/2",       type: "+", offsets: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, 3,   6,   11 ] },
          { name: "výdech",    type: "+", offsets: [0,   4,   7,   0,   4,   7,   0,   4,   7,   0  ] },
          { name: "nádech",    type: "-", offsets: [2,   7,   11,  2,   5,   9,   11,  2,   5,   9  ] },
          { name: "1/2",       type: "-", offsets: [1,   6,   10,  1,   NaN, 8  , NaN, NaN, NaN, NaN] },
          { name: "1",         type: "-", offsets: [NaN, 5,   9,   NaN, NaN, NaN, NaN, NaN, NaN, NaN] },
          { name: "1 1/2",     type: "-", offsets: [NaN, NaN, 8,   NaN, NaN, NaN, NaN, NaN, NaN, NaN] }
      ]
    }
  ]
}
