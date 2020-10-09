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
        window.console.debug(`Rendering chord table: [${this.ChordType.name}]`);
        let chordGen = new ChordGen();
        let chordsInType = DB.tones.map(tone => chordGen.generateChordTableForTone(
            this.ChordType,
            tone
        ));

        return this.printChordTable(chordsInType, this.ChordType);
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
        return "<tr>" +
            chord.tones.reduce((html, tone) => {
                this.ChordToneId = this.ChordToneId + 1;
                return html + `<td id="chordTone_${this.ChordToneId}">${this.formatHtmlTone(tone)}</td>`;
            }, "") +
        "</tr>";
    }
}
