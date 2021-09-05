// Pavel Prchal, 2020

import { strictEqual } from "assert";
import { HarmonicaControl } from "../controls/harmonica.mjs";
import { MCore } from "../core/mcore.mjs";
import {DB} from "../core/leaflet.mjs"
import { MHarp } from "../core/mharp.mjs";

describe('👁 Harmonica', () => {
    it('👁 render', () => {
        document.body.innerHTML = '<body><div id="harp"></div></body>'
        let ctl = new HarmonicaControl("harp", "EADGHE", 3)
        ctl.render(document)
        let ht = document.getElementById('harp')
    });

    it('generateRow', () => 
    {
        let harp = DB.harmonicas[0];
        let C = MCore.tone('C', 4)
        strictEqual('C4 E4 G4 C5 E5 G5 C6 E6 G6 C7 ', toRow(MHarp.generateRow(C, harp.template[0])))
        strictEqual('D4 G4 H4 D5 F5 A5 H5 D6 F6 A6 ', toRow(MHarp.generateRow(C, harp.template[1])))
    });

    // it('F harp', () => 
    // {
    //     let row = toRow(new MHarp().rr(MCore.tone('F', 4), DB.harmonicas[0].template[2]))
    //     strictEqual('F4 A4 C4 F5 A5 C5 F6 A6 C6 F7 ', row)
    // });

    function toRow(row){
        return row.reduce((t, cur) => t+=cur.name+cur.octave + ' ', '')
    }
});

