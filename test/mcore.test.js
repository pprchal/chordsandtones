// Pavel Prchal, 2020

const assert = require('assert');

const execfile  = require('../execfile');

const container = execfile("core/container.js", {}).createContainer();
container.DB = execfile("core/database.js", { container }).getDB();
let mcore = execfile("core/mcore.js", container).createMCore();

describe('Music math', () => {
    it('generate chord', () => {
        let tone = mcore.findToneByName('F#');
        let chordType = mcore.findChordByName('dur');
        let chord = mcore.generateChordTableForTone(chordType, tone);
        
        assert.strictEqual("F#", chord.tones[0].name);
        assert.strictEqual("B", chord.tones[1].name);
        assert.strictEqual("C#", chord.tones[2].name);
    });

    it('shift tone up', () => {
        let tone = mcore.shiftTone(mcore.findToneByName("C"), 12);
        assert.strictEqual("C", tone.name);
    });

    it('shift tone down', () => {
        let tone = mcore.shiftTone(mcore.findToneByName("C"), -1);
        assert.strictEqual("H", tone.name);
    });

    it('shift copied tone down', () => {
        let clone = mcore.clone(mcore.findToneByName("C#"));
        let tone = mcore.shiftTone(clone, -1);
        assert.strictEqual("C", tone.name);
    });

    it('generate scale', () => {
        let rootTone = mcore.findToneByName("C");
        let scale = mcore.findScaleByName("dur");
        let tonesInScale = mcore.generateScaleTablesForTone(rootTone, scale)[0].map(tone => tone.name);
        assert.notStrictEqual(["C", "D", "E", "F","G","A","H"], tonesInScale);
    });
});

