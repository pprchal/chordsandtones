# chordsandtones

Learning app for chords, tones and scales

For this moment, stable is hosted on my private blog:
[http://pavel.borec.cz/chordGen.html]


or - little bit experimental on
[https://pprchal.github.io/chordsandtones/]

# release history
* 10-31-2020 modules, lot of tests, work on guitar fretboard
* 01-06-2020 bug hunting
* 03-03-2020 new chord-distance table for exploring chord similiarities 
* 03-03-2020 small touches to be up-to date with ES-6
* 10-17-2019 working on better find chord-by-notes

# development notes
settings.json
```
"mochaExplorer.files": "test/**/*.mjs"
```

# ussage
## tones
```js
// get tone
let C4 = MCore.tone('C', 4)

// shift tone
let D = MCore.shiftTone(C4, 2)
```

## chords
```js
// get chord
let chord = MCore.chord('dur')
```

# TODO
* fix harmonica octavese
* make harp - coloring in palette
* fix harp rendering - now is broken (more work on octaves)

Pavel Prchal
