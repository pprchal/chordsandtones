// Pavel Prchal 2020
// -------------------- ScaleSelectControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ScaleSelectControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
    }

    render(document) {
        let to = document.getElementById(this.ControlId);
        to.addEventListener("change", this.refr);
        this.fillScales(to, document);
    }
    
    refr(){
        console.debug('rnd');
    }

    fillScales(cbScales, document) {
        for (let i = 0; i < DB.scales.length; i++) {
            let scale = DB.scales[i];
            let option = document.createElement("option");
            option.text = scale.name;
            cbScales.add(option);
        }
    }
}
