// Pavel Prchal, 2020
// import 'cache-require-paths';
import { strictEqual } from "assert";
import { GuitarControl } from "../controls/guitar.mjs";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><div id="guitar"></div></body>`, { runScripts: "dangerously" });
const { document } = dom.window;


describe('👁 Guitar', () => {
    it('👁 render', () => {
        let ctl = new GuitarControl("guitar", "EADGHE", 3);
        ctl.render(document);
        let ht = document.getElementById('guitar');
    });

    // it('👁 renderSVG', () => {
    //     let ctl = new GuitarControl("guitar", "EADGHE", 3);
    //     let svg = ctl.renderSVG();
    // });
});

