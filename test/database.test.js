const assert = require('assert');
const execfile  = require('../execfile');
const DB = execfile("core/database.js", { }).getDB();


describe('Database consistency', () => {
    it('load ok', () => {
        // let DB = execfile("core/database.js", { }).getDB();
        assert.equal(12, DB.tones.length);
        assert.equal(12, DB.qround.length);
    });

    it('chordgen ok', () => {
        let ctx = execfile("core/context.js", { }).createContext();

        // let b = execfile("core/chordgen.js", ctx);
        let b = execfile("core/chordgen.js", ctx).createCho();


        // let proto = b.protos[0];
        // let obj = Object.create(proto, DB);
        let ccc = b.findTuningByName('equal-tempered');

        // assert.equal(12, DB.tones.length);
        // assert.equal(12, DB.qround.length);
    });
});

