// Pavel Prchal 2019,209

import {MCore} from "./mcore.mjs"
import {DB} from "./leaflet.mjs"

/**
 * Guitar core module
 * for music. Tones, chords, ...
 */
export class MGuitar {
    static guitarRootStrings(guitarName){
        // [E] ->
        // [A] ->
        // [D] ->
        // [G] ->
        // [H] ->
        // [E] ->
        let guitar = MCore.guitar(guitarName);
        return guitar
            .template
            .offsets
            .reduce((tones, offset, n) => 
                {
                    if(n === 0) {
                        tones[n] = MGuitar.guitarRootTone(guitar);
                    }else{
                        tones[n] = MCore.shiftTone(tones[n - 1], offset);
                    }
                    return tones;
                },
                Array(guitar.template.offsets.length)
            );
    }

    static guitarRootTone(guitar){
        let tone = MCore.clone(DB.tones[guitar.template.offsets[0]]);
        tone.octave = guitar.octave;
        return tone;
    }

    static unwindGuitarString(tone, frets){
        // [**E**] [F] [F#] [G], ...
        return Array.from(Array(frets), (x, fret) => MCore.shiftTone(tone, fret));
    }

    static generateGuitarFretboard(tuning, frets){
        let rootStrings = MGuitar.guitarRootStrings(tuning);
        return rootStrings.map((rootNote) => MGuitar.unwindGuitarString(rootNote, frets));
    }
}
