// Pavel Prchal 2020

import {MGuitar} from "../core/mguitar.mjs"
import {BaseControl} from "./base_control.mjs"

export class GuitarControl extends BaseControl {
    constructor(controlId, tuning, frets) {
        super(controlId);
        this.StringRows = [];
        this.Fretboard = MGuitar.generateGuitarFretboard(tuning, frets);
    }

    render(document) {
        let htmlStrings = this.Fretboard.map(guitarString => this.renderString(guitarString));
        let table = document.createElement('table');
        this.Self.appendChild(table);
        table.innerHtml = htmlStrings.join('');
    }        

    renderSVG(){
        let svg = this.drawLines();
    }

    drawStrings(){
        let svgLines = this.Fretboard.map(guitarString => this.drawString(guitarString));
    }

    renderString(guitarString){
        // E, F ,F#, ...
        let htmlSemitones = guitarString.map(semitone => this.renderSemitone(semitone));
        let x = `<tr>${htmlSemitones.join('')}</tr>`; ;
        return x;
    }

    renderSemitone(tone){
        return `<td octave="${tone.octave}">${tone.name}</td>`;
    }
}
