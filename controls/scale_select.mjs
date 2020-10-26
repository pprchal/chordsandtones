// Pavel Prchal 2020
// -------------------- ScaleSelectControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ScaleSelectControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
    }

    render(document, onRefresh) {
        let to = document.getElementById(this.ControlId);
        to.addEventListener("change", onRefresh);
        this.fillScales(to, document);
    }
    
    fillScales(cbScales, document) {
        DB.scales.forEach((scale) => cbScales.add(this.createScaleOption(scale, document)));
    }

    createScaleOption(scale, document){
        let option = document.createElement("option");
        option.text = scale.name;
        return option;
    }
}
