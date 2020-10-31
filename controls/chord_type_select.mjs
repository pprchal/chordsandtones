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
        to.addEventListener('change', (e) => {
            this.fireEvent('CHORD_TYPE', DB.chords[e.target.selectedIndex]);
        });
         // to.self = this;
        this.fillChordTypes(to, document);
        return this;
    }

    fillChordTypes(cbChordTypes) {
        DB.chords.forEach((chord) => {
            let option = document.createElement("option");
            option.text = chord.name;
            cbChordTypes.add(option);
        });
    }
}
