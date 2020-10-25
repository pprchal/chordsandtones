// Pavel Prchal, 2020

import { strictEqual } from "assert";
import { ScaleSelectControl } from "../controls/scale_select.mjs";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><select id="cbTest"></select></body>`, { runScripts: "dangerously" });
const { document } = dom.window;


describe('Scale select control', () => {
    it('load ok', () => {
        let ctl = new ScaleSelectControl("cbTest");
        ctl.render(document);
    });
});

