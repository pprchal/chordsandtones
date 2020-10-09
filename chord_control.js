// Pavel Prchal 2019, 2020
// -------------------- ChordControl
// --------------------
class ChordControl extends BaseControl{
    constructor(chordTypeName) {
        super();
        this.ChordToneId = 1;
        this.Tuning = this.DBC.findTuningByName('equal-tempered');
        this.ChordType = this.DBC.findChordByName(chordTypeName);
    }

    // @chordTypeName (maj7)
    render() {
        let chordsInType = new Array();
        let chordGen = new ChordGen();
        window.console.debug(`Rendering chord table: [${this.ChordType.name}]`);

        for (let i = 0; i < DB.tones.length; i++) {
            chordsInType.push(chordGen.generateChordTableForTone(
                this.ChordType,
                DB.tones[i]
            ));
        }

        return this.printChordTable(chordsInType, this.ChordType);
    }  


    printChordTable(chordsInType, chordType) {
        return "<table class=\"table table-hover\">" + 
            this.printChordHeader(chordType.distances) + 
            chordsInType.reduce((html, chord) => html + this.printChord(chord)) +
        "</table>";
    } 

    // @distances
    printChordHeader(distances) {
        let html = "<tr>";

        for (let i =0; i<distances.length; i++) {
            let distance = distances[i];
            html += `<th>${this.formatDistance(distance)}</th>`;
        }
        html += "</tr>";
        return html;
    }        
    
    // @chord
    printChord(chord) {
        return "<tr>" +
            chord.tones.reduce((html, tone) => {
                this.ChordToneId = this.ChordToneId + 1;
                return html + `<td id="chordTone_${this.ChordToneId}">${this.formatHtmlTone(tone)}</td>`;
            }, "") +
        "</tr>";
    }
}
