// Pavel Prchal 2020

import {BaseControl} from "./base_control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordTypeSelectControl extends BaseControl{
    constructor(controlId, messageGroup) {
        super(controlId, messageGroup);
    }

    render() {
        this.createButton(-1);
        this.select = this.createSelect();
        this.createButton(1);
        return this;
    }

    createSelect(){
        let select = document.createElement('select');
        this.Self.appendChild(select);
        select.addEventListener('change', (e) => {
            this.fireEvent('CHORD_TYPE', DB.chords[e.target.selectedIndex]);
        });
        this.fillChordTypes(select);
        return select;
    }

    createButton(dir){
        let button = document.createElement('div');
        button.innerHTML = dir < 0 ? '&lt;' : '&gt;';
        button.className = 'button';
        this.Self.appendChild(button);
        button.addEventListener('click', (e) => this.shiftChord(dir));
    }

    shiftChord(dir){
        let n = this.select.selectedIndex + dir;
        if(n<0){
            n = DB.chords.length - 1;
        }
        else if(n >= DB.chords.length){
            n = 0;
        }

        this.select.selectedIndex = n;
        this.fireEvent('CHORD_TYPE', DB.chords[n]);
    }

    fillChordTypes(cbChordTypes) {
        DB.chords.forEach((chord) => {
            let option = document.createElement('option');
            option.text = chord.name;
            cbChordTypes.add(option);
        });
    }
}
