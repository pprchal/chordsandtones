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
        let html = "<table class=\"table table-hover\">" + this.printChordHeader(chordType.distances);
        for (let i = 0; i < chordsInType.length; i++) {
            html += this.printSingleChordTableBody(chordsInType[i]);
        }
        html += "</table>";
        return html;
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
    printSingleChordTableBody(chord) {
        var html = "<tr>";
        for (let i = 0; i < chord.tones.length; i++) {
            this.ChordToneId = this.ChordToneId + 1;
            let chordToneId = `chordTone_${this.ChordToneId}`;
            let tone = chord.tones[i];
            html += `<td id="${chordToneId}">${this.formatHtmlTone(tone)}</td>`;
        }
        
        html += "</tr>";
        return html;
    }

    // renderChordToneButton(tone){
    //     return `<a class="btn btn-primary btn-block" href="#" role="button">${this.formatHtmlTone(tone)}</a>`;
    // }
}
