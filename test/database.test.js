const assert = require('assert');
const execfile  = require('../execfile');

const container = execfile("core/container.js", {}).createContainer();
container.DB = execfile("core/database.js", { container }).getDB();

describe('Database consistency', () => {
    it('load ok', () => {
        assert.strictEqual(12, container.DB.tones.length);
        assert.strictEqual(12, container.DB.qround.length);
    });

    it('find tuning ok', () => {
        let mcore = execfile("core/mcore.js", container).createMCore();
        assert.strictEqual(108, mcore.tuning('equal-tempered').frequencies.length);
    });
});

