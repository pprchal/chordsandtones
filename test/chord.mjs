// Pavel Prchal, 2020

import { ChordControl } from "../controls/chord.mjs";

describe('👁 Chord', () => {
    it('👁 render', () => {
        document.body.innerHTML = '<body><div id="ctl"></div></body>';
        new ChordControl('ctl', 'grp').render();
    });
});

