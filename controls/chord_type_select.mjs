// Pavel Prchal 2020
// -------------------- ChordTypeSelectControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordTypeSelectControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
    }

    render(document, onRefresh) {
        let to = document.getElementById(this.ControlId);
        to.addEventListener("change", onRefresh);
        this.fillChordTypes(to, document);
    }
    
    fillChordTypes(cbChordTypes) {
        DB.chords.forEach((chord) => {
            let option = document.createElement("option");
            option.text = chord.name;
            cbChordTypes.add(option);
        });
    }
}
