import 'cache-require-paths';


import { strictEqual } from 'assert';
import {DB} from "../core/leaflet.mjs"
import { MCore } from "../core/mcore.mjs"
let mcore = new MCore();

describe('leaflet', () => {
    it('load ok', () => {
        strictEqual(12, DB.tones.length);
        strictEqual(12, DB.qround.length);
    });

    it('find tuning ok', () => {
        // assert.  vs  strictEqual   => ES6 problem
        strictEqual(108, mcore.tuning('equal-tempered').frequencies.length);
    });
});

