// Pavel Prchal 2020
// -------------------- ToneSelectControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ToneSelectControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
        this.selectedTone = DB.tones[0];
    }

    render(document, onRefresh) {
        let to = document.getElementById(this.ControlId);
        to.addEventListener("change", (e) => {
            this.selectedTone = DB.tones[e.target.selectedIndex];
            onRefresh();
        });
        this.fillTones(to, document);
    }

    get tone() {
        return this.selectedTone;
    }
    
    // fill tones
    fillTones(cbTones) {
        DB.tones.forEach((tone) => {
            let option = document.createElement("option");
            option.text = tone.name;
            cbTones.add(option);            
        });
    }
}
