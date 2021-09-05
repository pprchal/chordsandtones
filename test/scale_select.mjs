// Pavel Prchal, 2020

import { strictEqual } from "assert";
import { ScaleSelectControl } from "../controls/scale_select.mjs";

describe('👁 Scale select', () => {
    it('👁 render', () => {
        document.body.innerHTML = '<body><div id="divScale"></div></body>';
        let ctl = new ScaleSelectControl("divScale");
        ctl.render();

        strictEqual(
            document.getElementById('divScale').innerHTML,
            "<div class=\"button\">&lt;</div><select><option>dur</option><option>mol</option><option>penta-mol</option><option>penta-dur</option><option>lydic</option><option>mixolydic</option><option>locrian</option><option>dorian</option><option>hexa-blues</option><option>melodic-mol</option></select><div class=\"button\">&gt;</div>"
        )
    });
});

