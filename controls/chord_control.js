// Pavel Prchal 2019, 2020
// -------------------- ChordControl

class ChordControl extends BaseControl{
    constructor(controlId, chordTypeName) {
        super(controlId);
        this.ChordToneId = 1;
        this.ChordType = this.Core.chord(chordTypeName);
    }

    // @chordTypeName (maj7)
    render() {
        // window.console.debug(`Rendering chord table: [${this.ChordType.name}]`);
        let chordsInType = DB.tones.map(tone => 
            this.Core.generateChordTableForTone(this.ChordType, tone)
        );

        this.setHtml(this.printChordTable(chordsInType, this.ChordType));
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
        return `<a class="btn btn-primary btn-block" href="javascript:none" onclick="${script}; return false;" role="button">${this.formatPlainTone(chord.rootTone)}</a>`;
    }

}
