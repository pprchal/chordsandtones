// Pavel Prchal  2020
// -------------------- ChordReviewControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordReviewControl extends BaseControl{
    constructor(controlId, tableId) {
        super(controlId);
        this.ChordToneId = 1;
        this.TableId = tableId;
    }

    render(document){
        this.setHtml(`<table id="${this.TableId}" class="table table-hover">` +
            this.printHeader() +
            this.renderRows() +
        '</table>');
        $(`#${this.TableId}`).DataTable( { searching: false, paging: false, info: false } );
    }

    renderRows(){
        return DB.chords.reduce((html, chord) => html + this.printChordRow(chord), "");
    }


    printChordRow(chord){
        let html = `<tr><td><b>${chord.name}<b></td>`;
        let arr = this.prepareTonesArray();

        // C
        let tone = this.Core.tone(DB.tones[0].name);
        chord = this.Core.generateChordTableForTone(chord, tone);
        let octave = chord.tones[0].octave;

        chord.tones.map((tone, n) => 
            {
                let k = tone.
                n = ((tone.octave - octave) * 12) + n;
                arr[n] = tone.name;
            }
        );
        // put tones to arr
        // chord
        //     .distances
        //     .reduce((distance, cur, n) => 
        //         {
        //             try{
        //                 distance += cur;

        //                 let tone = DB.tones[distance];
        //                 arr[distance] = tone.name;
        //                 return distance;
        //             }
        //             catch(e){
        //                 console.error(e);
        //             }
        //         }, 
        //         chord.distances[0]
        //     );
        
        return html + arr.reduce((html, td) => html += `<td>${td}</td>`, '') + '</tr>';
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

    prepareTonesArray() {
        return Array.from(Array(2 * DB.tones.length), () => '&nbsp;');
    }

    printHeader(){
        let html = '<thead><tr><td>&nbsp;</td>';
        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.Core.toneAsHtml(DB.tones[i])}</th>`;
        }

        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.Core.toneAsHtml(DB.tones[i])}</th>`;
        }
        return html + '</tr></thead>';
    }
}
