import { strictEqual } from 'assert';
import {DB} from "../core/leaflet.mjs"
import { MCore } from "../core/mcore.mjs"

describe('leaflet', () => {
    it('load ok', () => {
        strictEqual(12, DB.tones.length);
        strictEqual(12, DB.qround.length);
    });

    it('find tuning ok', () => {
        // assert.  vs  strictEqual   => ES6 problem
        strictEqual(108, MCore.tuning('equal-tempered').frequencies.length);
    });
});

