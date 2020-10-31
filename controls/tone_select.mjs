// Pavel Prchal 2020
// -------------------- ToneSelectControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ToneSelectControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
    }

    render(document) {
        let to = document.getElementById(this.ControlId);
        to.addEventListener("change", (e) => {
            this.fireEvent('TONE', DB.tones[e.target.selectedIndex]);
        });
        this.fillTones(to, document);
    }
    
    // fill tones
    fillTones(cbTones) {
        DB.tones.forEach((tone) => {
            let option = document.createElement("option");
            option.text = tone.name;
            option.setAttribute("octave", tone.octave);
            cbTones.add(option);            
        });
    }
}
