// Pavel Prchal, 2020
// import 'cache-require-paths';
import { strictEqual } from "assert";
import { ChordReviewControl } from "../controls/chord_review.mjs";
import { MCore } from "../core/MCore.mjs";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><div id="ctl"></div></body>`, { runScripts: "dangerously" });
const { document } = dom.window;


describe('👁 Chord review', () => {
    // it('👁 render', () => {
    //     let ctl = new ChordReviewControl("ctl");
    //     ctl.render(document);
    // });

    it('👁 Cdur', () => {
        let Cdur = new MCore().chord("dur");
        strictEqual(
            '<tr><td><b>dur<b></td><td>C</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>E</td><td>&nbsp;</td><td>&nbsp;</td><td>G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>', 
            new ChordReviewControl("ctl").printChordRow(Cdur)
        );
    });
});

