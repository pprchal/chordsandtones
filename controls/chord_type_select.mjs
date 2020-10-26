// Pavel Prchal 2020
// -------------------- ChordTypeSelectControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordTypeSelectControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
        this.SelectedChordTypeName = DB.chords[0].name;
    }

    render(document) {
        let to = document.getElementById(this.ControlId);
        to.addEventListener("change", this.onSelect);
        this.fillChordTypes(to, document);
    }

    get chordType() {
        return this.Core.chord(this.SelectedChordTypeName);
    }    

    onSelect(e){
        this.SelectedChordTypeName = DB.tones[e.target.selectedIndex];
    }
    
    fillChordTypes(cbChordTypes) {
        DB.chords.forEach((chord) => {
            let option = document.createElement("option");
            option.text = chord.name;
            cbChordTypes.add(option);
        });
    }
}
