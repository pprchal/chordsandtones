// Pavel Prchal, 2020

import { strictEqual } from "assert"
import { MCore } from "../core/mcore.mjs"
let mcore = new MCore();

describe('Music math', () => {
    it('generate chord', () => {
        let tone = mcore.tone('F#');
        let chordType = mcore.chord('dur');
        let chord = mcore.generateChordTableForTone(chordType, tone);
        
        strictEqual("F#", chord.tones[0].name);
        strictEqual("B", chord.tones[1].name);
        strictEqual("C#", chord.tones[2].name);
    });

    it('shift tone up', () => {
        let tone = mcore.shiftTone(mcore.tone("C"), 12);
        strictEqual("C", tone.name);
    });

    it('shift tone down', () => {
        let tone = mcore.shiftTone(mcore.tone("C"), -1);
        strictEqual("H", tone.name);
    });

    it('shift copied tone down', () => {
        let clone = mcore.clone(mcore.tone("C#"));
        let tone = mcore.shiftTone(clone, -1);
        strictEqual("C", tone.name);
    });

    it('generate scale', () => {
        let scale = mcore.scale("dur");
        let tonesInScale = mcore.generateScaleTablesForTone(mcore.tone("C"), scale)[0].reduce((tones, tone) => tones + tone.name, "");
        strictEqual("CDEFGAH", tonesInScale);
    });

//     it('format ok', () => {
//         let tone = mcore.tone("C#");

//         let ht = tone.asHtml();
//         console.debug(ht);
// //        assert.strictEqual("CDEFGAH", tonesInScale);
//     });
});

