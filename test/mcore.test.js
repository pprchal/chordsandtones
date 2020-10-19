// Pavel Prchal, 2020

const assert = require('assert');

const execfile  = require('../execfile');

const container = execfile("core/container.js", {}).createContainer();
container.DB = execfile("core/database.js", { container }).getDB();
let mcore = execfile("core/mcore.js", container).createMCore();

describe('Music math', () => {
    it('generate chord', () => {
        let tone = mcore.tone('F#');
        let chordType = mcore.chord('dur');
        let chord = mcore.generateChordTableForTone(chordType, tone);
        
        assert.strictEqual("F#", chord.tones[0].name);
        assert.strictEqual("B", chord.tones[1].name);
        assert.strictEqual("C#", chord.tones[2].name);
    });

    it('shift tone up', () => {
        let tone = mcore.shiftTone(mcore.tone("C"), 12);
        assert.strictEqual("C", tone.name);
    });

    it('shift tone down', () => {
        let tone = mcore.shiftTone(mcore.tone("C"), -1);
        assert.strictEqual("H", tone.name);
    });

    it('shift copied tone down', () => {
        let clone = mcore.clone(mcore.tone("C#"));
        let tone = mcore.shiftTone(clone, -1);
        assert.strictEqual("C", tone.name);
    });

    it('generate scale', () => {
        let scale = mcore.scale("dur");
        let tonesInScale = mcore.generateScaleTablesForTone(mcore.tone("C"), scale)[0].reduce((tones, tone) => tones + tone.name, "");
        assert.strictEqual("CDEFGAH", tonesInScale);
    });

//     it('format ok', () => {
//         let tone = mcore.tone("C#");

//         let ht = tone.asHtml();
//         console.debug(ht);
// //        assert.strictEqual("CDEFGAH", tonesInScale);
//     });

});

