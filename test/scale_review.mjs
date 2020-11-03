// Pavel Prchal, 2020
// import 'cache-require-paths';
import { strictEqual } from "assert";
import { ScaleReviewControl } from "../controls/scale_review.mjs";
import { MCore } from "../core/MCore.mjs";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><div id="ctl"></div></body>`, { runScripts: "dangerously" });
const { document } = dom.window;


describe('👁 Scale review', () => {
    it('👁 render', () => {
        new ScaleReviewControl("ctl").render();
    });
});

