// Pavel Prchal  2020

import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./base_control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordReviewControl extends BaseControl{
    constructor(controlId, tableId) {
        super(controlId);
        this.ChordToneId = 1;
        this.TableId = tableId;
    }

    render(){
        this.setHtml(`<table id="${this.TableId}" class="table table-hover">` +
            this.printHeader() +
            this.renderRows() +
        '</table>');

        try{
            $(`#${this.TableId}`).DataTable( { searching: false, paging: false, info: false } );
        }catch{
        }
    }

    renderRows(){
        return DB.chords.reduce((html, chord) => html + this.printChordRow(chord), '');
    }


    printChordRow(chord){
        let cols = Array.from(Array(2 * DB.tones.length), () => '&nbsp;');

        // C
        let rootTone = MCore.tone(DB.tones[0].name);
        let chordWeight = 0;
        MCore.generateChordTableForTone(
            chord, 
            rootTone, 
            (idx, tone) =>
            {
                cols[idx] = MCore.toneAsHtml(tone);
                chordWeight += idx;
            }
        );

        cols = ['&nbsp;', ...cols, chordWeight];
        return `<tr><td><b>${chord.name}<b></td>` +
            cols.reduce((html, td) => html += `<td>${td}</td>`, '') +
        '</tr>';
    }

    formatChordDistance(chordDistance){
        let dist = chordDistance;
        while(dist >= DB.tones.length)
        {
            dist -= DB.tones.length;
        }

        try{
            return DB.tones[dist].name;
        }
        catch(e){
            return "---";
        }
    }

    printHeader(){
        let baseTone = MCore.tone('C');
        let cols = Array.from(Array(2 * DB.tones.length), (n, k) => {
            let tone = MCore.shiftTone(baseTone, k);

            if(tone.octave > baseTone.octave){
                return `<b>${MCore.toneAsHtml(tone)}</b>`;
            }
            return MCore.toneAsHtml(tone);
        });
        cols.push('Váha'); // weight

        return '<thead><tr><td>&nbsp;</td><td>&nbsp;</td>' +
            cols.reduce((html, td) => html + `<td>${td}</td>`, '') +
        '</tr></thead>';
    }
}
