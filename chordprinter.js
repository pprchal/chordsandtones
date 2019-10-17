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


    // @chord
    printSingleChordTableBody(chord) {
        var html = "<tr>";

        html +=this.renderChordTd(chord);
        for (let i = 0; i < chord.tones.length; i++) {
            this.ctx.ChordToneId = this.ctx.ChordToneId + 1;
            let chordToneId = "chordTone_" + this.ctx.ChordToneId;
            let tone = chord.tones[i];
            html +="<td id=\"" + chordToneId + "\">" + this.getToneName(tone, 'html') + "</td>";

            this.ctx.ToneMap.push(new ToneMapRecord(chordToneId, tone));
        }
        
        html += "</tr>";
        return html;
    }   

    renderChordTd(chord){
        return '<td><a class="btn btn-primary btn-block" href="#" role="button">' + this.getChordName(chord) + '</a></td>';
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

    
    // @chord
    getChordName(chord) {
        return chord.rootTone.name + chord.name;
    }       
    
    // @distances
    printChordHeader(distances) {
        let html = "<tr>";

        html += "<td></td>";
        for (let i =0; i<distances.length; i++) {
            let distance = distances[i];
            html += "<th>"+ this.formatDistance(distance) + "</th>";
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
            let script = "playToneWithOctave('" + tone.name + "', " +  tone.octave +  ", '" + this.ctx.Tuning.name +  "')";
            html +="<td><input type=\"button\" value=\"" + this.getToneName(tone, 'plain') + "\" onclick=\"" + script + "\"></input></td>";
        }
        html += "</tr>";
        return html;
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
            html += "<th>"+ this.formatDistance(distance) + "</th>";
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
