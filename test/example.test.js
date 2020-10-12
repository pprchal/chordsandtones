const assert = require('assert');

const db = require('../database');
const MY_MODULE = require('../chordGen');

describe('Simple Math Test', () => {
  
 it('should return 2', () => {

    let dbb =  db;
        let chg = MY_MODULE.ChordGen();
        let ch = chg.findChordByName('maj7');
        assert.equal(1 + 1, 2);
    });


 it('should return 9', () => {
        assert.equal(3 * 3, 9);
    });


});

