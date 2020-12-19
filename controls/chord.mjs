// Pavel Prchal 2019, 2020

import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./base_control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordControl extends BaseControl{
    constructor(controlId, messageGroup) {
        super(controlId, messageGroup);
        this.ChordToneId = 1;
    }

    // @chordTypeName (maj7)
    render(chordType) {
        // handle events
        if(chordType == undefined){
            chordType = DB.chords[0];
        }

        let chordsInType = DB.tones.map(tone => 
            MCore.generateChordTableForTone(chordType, tone)
        );

        this.setHtml(this.printChordTable(chordsInType, chordType));
    }  

    subscribeTo(eventName, messageGroup){
        document.addEventListener(eventName, (e) => 
        {
            if(messageGroup === messageGroup){
                this.render(e.EventData);
            }
        });

        return this;
    }

    printChordTable(chordsInType, chordType) {
        return '<table class=\"table table-hover table-sm\">' + 
            this.printChordHeader(chordType.distances) + 
            chordsInType.reduce((html, chord) => html + this.printChord(chord), '') +
        '</table>';
    } 

    // @distances
    printChordHeader(distances) {
        return '<tr>' +
            distances.reduce((html, distance) => html + `<th>${this.formatDistance(distance)}</th>`, '') +
        '</tr>';
    }        
    
    // @chord
    printChord(chord) {
        return '<tr>' + 
            chord.tones.reduce((html, tone) => 
            {
                this.ChordToneId++;
                return html += `<td id="chordTone_${this.ChordToneId}"><a class="row">${MCore.toneAsHtml(tone)}</a></td>`;
            },
            ''
        ) + '</tr>';
    }
}
