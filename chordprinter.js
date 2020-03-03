// Pavel Prchal 2019
// -------------------- ChordPrinter
// --------------------
class ChordPrinter extends BasePrinter{
    constructor(context) {
        super();

        this.ctx = context;
        this.DBC = new DBCore();
    }

    printChordTable() {
        let chordType = this.ctx.ChordType;
        let generatedChords = this.ctx.GeneratedChords;

        let html = "<table>" + this.printChordHeader(chordType.distances);
        for (let i = 0; i < generatedChords.length; i++) {
            html += this.printSingleChordTableBody(generatedChords[i]);
        }
        html += "</table>";
        return html;
    }        

    
    printTonesHeader(){
        // new ChordPrinter(new Context()).printTonesHeader()
        let html = '<tr><td>&nbsp;</td>';
        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
            
        }
        return html + '</tr>';
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
        for(let i = 0; i<DB.tones.length; i++){
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

    // @chord
    printSingleChordTableBody(chord) {
        var html = "<tr>";

        html +=this.renderChordTd(chord);
        for (let i = 0; i < chord.tones.length; i++) {
            this.ctx.ChordToneId = this.ctx.ChordToneId + 1;
            let chordToneId = "chordTone_" + this.ctx.ChordToneId;
            let tone = chord.tones[i];
            html += `<td id="${chordToneId}">${this.formatHtmlTone(tone)}</td>`;

            this.ctx.ToneMap.push(new ToneMapRecord(chordToneId, tone));
        }
        
        html += "</tr>";
        return html;
    }   

    renderChordTd(chord){
        return `<td><a class="btn btn-primary btn-block" href="#" role="button">${this.formatChordName(chord)}</a></td>`;
    }

    // @chordTypeName (maj7)
    printChordsTable(chordTypeName) {
        let chordType = this.DBC.findChordByName(chordTypeName);
        let chordsInType = new Array();
        let chordGen = new ChordGen();

        this.ctx.ChordToneId = 1;
        this.ctx.GeneratedChords = chordsInType;
        this.ctx.ChordType = chordType;

        for (let i = 0; i < DB.tones.length; i++) {
            chordsInType.push(chordGen.generateChordTableForTone(
                chordType,
                DB.tones[i]
            ));
        }

        return this.printChordTable();
    }  

    
    // @distances
    printChordHeader(distances) {
        let html = "<tr>";

        html += "<td></td>";
        for (let i =0; i<distances.length; i++) {
            let distance = distances[i];
            html += `<th>${this.formatDistance(distance)}</th>`;
        }
        html += "</tr>";
        return html;
    }        
    

    // @distance
    formatDistance(distance) {
        return distance + " - " + this.DBC.findInterval(distance).name;
    }


    // @tones[]
    printSingleScaleTableBody(tones) {
        let html = "<tr>";
        for (let i = 0; i < tones.length; i++) {
            let tone = tones[i];
            html += `<td>${this.renderScaleButton(tone)}</td>`;
        }
        html += "</tr>";
        return html;
    } 

    renderScaleButton(tone){
        let script = `playToneWithOctave('${tone.name}', '${tone.octave}', '${this.ctx.Tuning.name}')`;
        return `<a class="btn btn-primary btn-block" href="javascript:none" onclick="${script}; return false;" role="button">${this.formatPlainTone(tone)}</a>`;
    }

    printScaleTable = function() {
        let scale = this.ctx.Scale;
        let tonesInScale = this.ctx.TonesInScale;
        let html = "";

        for(let i=0; i<scale.distances.length; i++){
            html += "<table>";
            html += this.printScaleHeader(scale.distances[i]);
            html += this.printSingleScaleTableBody(tonesInScale[i]);
            html += "</table>";
        }

        return html;
    }  

    printScaleHeader(distances) {
        let html = "<tr>";

        for (let i =0; i<distances.length; i++) {
            let distance = distances[i];
            html += `<th>${this.formatDistance(distance)}</th>`;
        }
        html += "</tr>";
        return html;
    }        

    // @rootToneName (C)
    // @scaleName (dur)
    printScalesTable(rootToneName, scaleName) {
        this.ctx.RootTone = this.DBC.findToneByName(rootToneName);
        this.ctx.ScaleToneId = 1;
        this.ctx.Scale = this.DBC.findScaleByName(scaleName);
        this.ctx.TonesInScale = new ChordGen().generateScaleTableForTone(
            this.ctx.RootTone,
            this.ctx.Scale
        );

        return this.printScaleTable();
    }
}
