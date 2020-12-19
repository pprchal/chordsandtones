// Pavel Prchal, 2020
// import 'cache-require-paths';
import { strictEqual } from "assert";
import { GuitarControl } from "../controls/guitar.mjs";

describe('👁 Guitar', () => {
    it('👁 render', () => {
        document.body.innerHTML = '<body><div id="guitar"></div></body>';
        let ctl = new GuitarControl("guitar", "EADGHE", 3);
        ctl.render(document);
        let ht = document.getElementById('guitar');
    });

    // it('👁 renderSVG', () => {
    //     let ctl = new GuitarControl("guitar", "EADGHE", 3);
    //     let svg = ctl.renderSVG();
    // });
});

