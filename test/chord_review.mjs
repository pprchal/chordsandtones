// Pavel Prchal, 2020
import { strictEqual } from "assert";
import { ChordReviewControl } from "../controls/chord_review.mjs";
import { MCore } from "../core/mcore.mjs";

describe('👁 Chord review', () => {
    it('👁 render', () => {
        document.body.innerHTML = '<body><div id="ctl"></div></body>';
        new ChordReviewControl("ctl").render();
    });

    it('👁 Cdur', () => {
        let Cdur = MCore.chord("dur");
        strictEqual(
            '<tr><td><b>dur<b></td><td>&nbsp;</td><td>C</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>E</td><td>&nbsp;</td><td>&nbsp;</td><td>G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>11</td></tr>', 
            new ChordReviewControl("ctla").printChordRow(Cdur)
        );
    });

    it('👁 C9', () => {
        let C9 = MCore.chord("9");
        new ChordReviewControl("ctl").printChordRow(C9)
    });
});

