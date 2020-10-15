const assert = require('assert');
const execfile  = require('../execfile');

const container = execfile("core/container.js", {}).createContainer();
container.DB = execfile("core/database.js", { container }).getDB();

describe('Music math', () => {
    it('shift ok', () => {
        let mcore = execfile("core/mcore.js", container).createMCore();
        let tone = mcore.findToneByName('F#');
        let chordType = mcore.findChordByName('dur');
        let chord = mcore.generateChordTableForTone(chordType, tone);
        
        assert.equal("F#", chord.tones[0].name);
        assert.equal("B", chord.tones[1].name);
        assert.equal("C#", chord.tones[2].name);
    });
});

