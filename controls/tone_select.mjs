// Pavel Prchal 2020
// -------------------- ToneSelectControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ToneSelectControl extends BaseControl{
    constructor(controlId, messageGroup) {
        super(controlId, messageGroup);
        this.selectedTone = DB.tones[0];
    }

    render(document, onRefresh) {
        let to = document.getElementById(this.ControlId);
        to.addEventListener("change", (e) => {
            this.selectedTone = DB.tones[e.target.selectedIndex];
           if(onRefresh != null){
                onRefresh();
           }
        });
        this.fillTones(to, document);
    }

    onToneChange(e){
    }

    get tone() {
        return this.selectedTone;
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
