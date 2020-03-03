// Pavel Prchal 2019

// -------------------- HarmonicaPrinter
// --------------------
class HarmonicaPrinter extends BasePrinter {
    constructor(context) {
        super();
        this.ctx = context;
        this.DBC = new DBCore();
    }

    printHarmonicaTable() {
        let harmonica = this.DBC.findHarmonicaByName('Richter diatonická');
        let rootTone = this.DBC.findToneByName(this.ctx.HarmonicaToneName);

        let html = "<table>";
        for (let i =0; i < harmonica.template.length; i++){

            if(i == 3) {
                html += this.printHarmonicaHoleNumbers(harmonica);
            }
            html += this.renderRow(rootTone, harmonica.template[i], i);
        }

        html += "</table>";
        return html;
    }        
    
    
    renderRow(rootTone, row, rowNumber){
        let html = "<tr>";

        html += `<td>${row.name}</td>`;
        html += `<td>${row.type}</td>`;

        for (let i =0; i < row.offsets.length; i++){
            if(isNaN(row.offsets[i])){
                html += "<td>&nbsp;</td>";
            }
            else{
                this.ctx.HarmonicaToneId = this.ctx.HarmonicaToneId + 1;
                var harmonicaTone = new ChordGen().plusTone(rootTone, row.offsets[i]);

                harmonicaTone.octave = this.getOctaveForHarmonicaTone(rowNumber, i);
                let harmonicaToneId = "harmonicaTone_" + this.ctx.HarmonicaToneId;
                this.ctx.ToneMap.push(new ToneMapRecord(harmonicaToneId, harmonicaTone));
                html += `<td id="${harmonicaToneId}">${this.formatHtmlTone(harmonicaTone)}</td>`;
            }
        }

        html += "</tr>";
        return html;
    }

    getOctaveForHarmonicaTone(row, col){
        if(col >= 9)
            return 4;
    
        if(col >= 6)
            return 3;

        if(col >= 3)
            return 2;
    
        return 1;
    }

    // @harmonica
    printHarmonicaHoleNumbers(harmonica) {
        let html = "<tr>";
        html +="<td></td><td></td>";

        for (let i =0; i<harmonica.template[0].offsets.length; i++) {
            html += `<th>${(i+1)}</th>`;
        }
        html += "</tr>";
        return html;
    }  

}
