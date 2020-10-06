// Pavel Prchal 2019, 2020
// -------------------- ChordControl
// --------------------
class ChordControl extends BaseControl{
    constructor() {
        super();
        this.DBC = new DBCore();
        this.ChordToneId = 1;
    }

    // @chordTypeName (maj7)
    printChordsTable(chordTypeName) {
        this.ctx = new Context();
        this.ctx.Tuning = new DBCore().findTuningByName('equal-tempered');

        let chordType = this.DBC.findChordByName(chordTypeName);
        let chordsInType = new Array();
        let chordGen = new ChordGen();
        window.console.debug(`Rendering chord table: [${chordType.name}]`);
        this.ctx.ChordType = chordType;

        for (let i = 0; i < DB.tones.length; i++) {
            chordsInType.push(chordGen.generateChordTableForTone(
                chordType,
                DB.tones[i]
            ));
        }

        this.ctx.html = this.printChordTable(chordsInType, chordType);
        return this.ctx;
    }  

    printChordReviewRow(chord){
        let html = `<tr><td>${chord.name}</td>`;
        let arr = this.prepareArrByTones();

        for(let i = 0; i<arr.length; i++){
            if(i < chord.distances.length){
                arr[chord.distances[i]] = chord.distances[i];
            }
        }

        for(let j = 0; j<arr.length; j++){
            html += `<td>${arr[j]}</td>`;
        }

        return html + '</tr>';
    }

    prepareArrByTones() {
        let arr = [];
        for(let i = 0; i<DB.tones.length * 2; i++){
            arr[i] = '&nbsp;';
        }
 
        return arr;
    }

    printChordsReview(){
        let html = '<table>' + this.printTonesHeader();

        for (let i=0; i<DB.chords.length; i++){
            html += this.printChordReviewRow(DB.chords[i]);
        }
        return html + '</table>';
    }

    printTonesHeader(){
        let html = '<tr><td>&nbsp;</td>';
        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
        }

        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
        }
        return html + '</tr>';
    }

    printChordTable(chordsInType, chordType) {
        let html = "<table>" + this.printChordHeader(chordType.distances);
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
