// Pavel Prchal, 2020

import { strictEqual } from "assert";
import { ScaleControl } from "../controls/scale.mjs";

describe('👁 Scale', () => {
    it('👁 render', () => {
        document.body.innerHTML = '<body><div id="ctl"></div></body>';
        new ScaleControl("ctl").render();
    });
});

