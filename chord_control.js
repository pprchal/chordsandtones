// Pavel Prchal 2019, 2020
// -------------------- ChordControl
// --------------------
class ChordControl extends BaseControl{
    constructor(controlId, chordTypeName) {
        super(controlId);
        this.ChordToneId = 1;
        this.Tuning = this.DBC.findTuningByName('equal-tempered');
        this.ChordType = this.DBC.findChordByName(chordTypeName);
    }

    // @chordTypeName (maj7)
    render() {
        window.console.debug(`Rendering chord table: [${this.ChordType.name}]`);
        let chordGen = new ChordGen();
        let chordsInType = DB.tones.map(tone => chordGen.generateChordTableForTone(
            this.ChordType,
            tone
        ));

        this.setHtml(this.printChordTable(chordsInType, this.ChordType));
    }  


    printChordTable(chordsInType, chordType) {
        return "<table class=\"table table-hover\">" + 
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
                html += `<td id="chordTone_${this.ChordToneId}">${this.formatHtmlTone(tone)}</td>`;
            }else{
                html += `<td id="chordTone_${this.ChordToneId}">${this.formatHtmlTone(tone)}</td>`;
            }
            this.ChordToneId++;
        }

        return html + "</tr>";
    }

    renderChordButton(chord){
        let script = `displayCharChords('${tone.name}', '${tone.octave}')`;
        return `<a class="btn btn-primary btn-block" href="javascript:none" onclick="${script}; return false;" role="button">${this.formatPlainTone(tone)}</a>`;
    }

}
