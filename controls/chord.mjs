// Pavel Prchal 2019, 2020
// -------------------- ChordControl
import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
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
        this.MessageGroup = messageGroup;
        document.addEventListener(eventName, (e) => 
        {
            if(messageGroup === this.MessageGroup){
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
        let html = '<tr>';

        for(let i=0; i<chord.tones.length; i++)
        {
            let tone = chord.tones[i];
            if(i == 0)
            {
                html += `<td>${this.renderChordButton(chord)}</td>`;
            }else{
                html += `<td id="chordTone_${this.ChordToneId}"><a class="row">${MCore.toneAsHtml(tone)}</a></td>`;
            }
            this.ChordToneId++;
        }

        return html + '</tr>';
    }

    renderChordButton(chord){
        let script = `displayCharChords('${chord.rootTone.name}', '${chord.name}')`;
        return `<a class="button button-primary" href="javascript:none" onclick="${script}; return false;" role="button">${MCore.toneAsHtml(chord.rootTone)}</a>`;
    }

    // displayCharChords(rootTone, chordType){
    //     document.getElementById('divCharChords').innerText = MCore.findCharChords(rootTone);
    // }    
}
