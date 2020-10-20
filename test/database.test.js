import {DB} from "../core/leaflet.js"

// const assert = require('assert');
// const execfile = require('../execfile');
// // const DB = require('../core/leaflet.js');

// const container = execfile("core/container.js", {}).createContainer();
// container.DB = execfile("core/database.js", { container }).getDB();
// const DB = container.DB;

describe('Database consistency', () => {
    it('load ok', () => {
        assert.strictEqual(12, DB.tones.length);
        assert.strictEqual(12, DB.qround.length);
    });

    it('find tuning ok', () => {
        // let mcore = execfile("core/mcore.js", container).createMCore();
        assert.strictEqual(108, mcore.tuning('equal-tempered').frequencies.length);
    });
});

