// Pavel Prchal, 2020

import { strictEqual } from "assert";
import { ScaleSelectControl } from "../controls/scale_select.mjs";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const dom = new JSDOM('<body><div id="divScale"></div></body>', { runScripts: "dangerously" });
const { document } = dom.window;


describe('👁 Scale select', () => {
    it('👁 render', () => {
        let a= document.getElementById('divScale');
        let ctl = new ScaleSelectControl("divScale");
        ctl.render();
    });
});

