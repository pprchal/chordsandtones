const assert = require('assert');
const execfile  = require('../execfile');

const container = execfile("core/container.js", {}).createContainer();
container.DB = execfile("core/database.js", { container }).getDB();

describe('Database consistency', () => {
    it('load ok', () => {
        assert.equal(12, container.DB.tones.length);
        assert.equal(12, container.DB.qround.length);
    });

    it('chordgen ok', () => {
        let b = execfile("core/chordgen.js", container).createCho();
        let ccc = b.findTuningByName('equal-tempered');
    });
});

