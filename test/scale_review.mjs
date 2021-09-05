// Pavel Prchal, 2020
// import 'cache-require-paths';
import { strictEqual } from "assert";
import { ScaleReviewControl } from "../controls/scale_review.mjs";
import 'jsdom-global/register.js'

describe('👁 Scale review', () => {
    it('👁 render', () => {
        document.body.innerHTML = '<body><div id="ctl"></div></body>';
        new ScaleReviewControl("ctl").render();
    });
});

