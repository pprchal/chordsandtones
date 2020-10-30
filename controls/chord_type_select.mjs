// Pavel Prchal 2020
// -------------------- ChordTypeSelectControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordTypeSelectControl extends BaseControl{
    constructor(controlId, messageGroup) {
        super(controlId, messageGroup);
        this.SelectedChordTypeName = DB.chords[0].name;
    }

    render(document) {
        let to = document.getElementById(this.ControlId);
        to.addEventListener("change", this.onSelect);
        to.self = this;
        this.fillChordTypes(to, document);
    }

    get chordType() {
        return this.Core.chord(this.SelectedChordTypeName);
    }    

    onSelect(e){
        this.SelectedChordTypeName = DB.chords[e.target.selectedIndex];
        var evt = document.createEvent("Event");
        evt.initEvent("CHORD_TYPE", true, true);
        evt.ControlId = e.currentTarget.self.ControlId;
        evt.MessageGroup = e.currentTarget.self.MessageGroup;
        evt.ChordType = this.SelectedChordTypeName ;
        document.dispatchEvent(evt);
    }
    
    fillChordTypes(cbChordTypes) {
        DB.chords.forEach((chord) => {
            let option = document.createElement("option");
            option.text = chord.name;
            cbChordTypes.add(option);
        });
    }
}
