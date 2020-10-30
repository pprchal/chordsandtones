// Pavel Prchal 2019, 2020
// -------------------- ChordControl
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
        this.ChordToneId = 1;
    }

    // @chordTypeName (maj7)
    render(chordType) {
        if(chordType == undefined){
            chordType = DB.chords[0];
        }
        window.console.debug(`Rendering chords table: [${chordType.name}]`);
        let chordsInType = DB.tones.map(tone => 
            this.Core.generateChordTableForTone(chordType, tone)
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
        return "<table class=\"table table-hover table-sm\">" + 
            this.printChordHeader(chordType.distances) + 
            chordsInType.reduce((html, chord) => html + this.printChord(chord), "") +
        "</table>";
    } 

    // @distances
    printChordHeader(distances) {
        return "<tr>" +
            distances.reduce((html, distance) => html + `<th>${this.formatDistance(distance)}</th>`, "") +
        "</tr>";
    }        
    
    // @chord
    printChord(chord) {
        let html = "<tr>";

        for(let i=0; i<chord.tones.length; i++)
        {
            let tone = chord.tones[i];
            if(i == 0)
            {
                html += `<td>${this.renderChordButton(chord)}</td>`;
            }else{
                html += `<td id="chordTone_${this.ChordToneId}">${this.Core.toneAsHtml(tone)}</td>`;
            }
            this.ChordToneId++;
        }

        return html + "</tr>";
    }

    renderChordButton(chord){
        let script = `displayCharChords('${chord.rootTone.name}', '${chord.name}')`;
        return `<a class="btn btn-primary btn-block" href="javascript:none" onclick="${script}; return false;" role="button">${this.Core.toneAsText(chord.rootTone)}</a>`;
    }

    displayCharChords(rootTone, chordType){
        document.getElementById('divCharChords').innerText = this.Core.findCharChords(rootTone);
    }    
}
