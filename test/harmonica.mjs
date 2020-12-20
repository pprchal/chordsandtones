// Pavel Prchal, 2020

import { strictEqual } from "assert";
import { HarmonicaControl } from "../controls/harmonica.mjs";
import { MCore } from "../core/mcore.mjs";
import {DB} from "../core/leaflet.mjs"

describe('👁 Harmonica', () => {
    it('👁 render', () => {
        document.body.innerHTML = '<body><div id="harp"></div></body>';
        let ctl = new HarmonicaControl("harp", "EADGHE", 3);
        let C = MCore.tone('C', 4);

        strictEqual('NaN NaN NaN NaN NaN NaN NaN NaN NaN B4 ', toRow(ctl.rr(C, DB.harmonicas[0].template[0])));
        strictEqual('NaN NaN NaN NaN NaN NaN NaN D#4 F#4 H4 ', toRow(ctl.rr(C, DB.harmonicas[0].template[1])));
        strictEqual('C4 E4 G4 C5 E5 G5 C6 E6 G6 C7 ', toRow(ctl.rr(C, DB.harmonicas[0].template[2])));
        strictEqual('D4 G4 H4 D5 F5 A5 H5 D6 F6 A6 ', toRow(ctl.rr(C, DB.harmonicas[0].template[3])));
        // strictEqual('C#4 F#4 B4 C#5 NaN G#5 C#5 NaN G# NaN ', toRow(ctl.rr(C, DB.harmonicas[0].template[4])));

        ctl.render(document);
        let ht = document.getElementById('harp');
    });


    function toRow(row){
        return row.reduce((t, cur) => t+=cur.name+cur.octave + ' ', '');
    }
});

