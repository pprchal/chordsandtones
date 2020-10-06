// Pavel Prchal 2019,2020

// -------------------- HarmonicaControl
// --------------------
class HarmonicaControl extends BaseControl {
    constructor() {
        super();
        this.DBC = new DBCore();
        this.HarmonicaToneId = 1;
    }

    render(harpKey) {
        this.ctx = new Context();
        this.ctx.Tuning = new DBCore().findTuningByName('equal-tempered');
        this.ctx.ToneMap = [];

        let harmonica = this.DBC.findHarmonicaByName('Richter diatonická');
        let harpRootTone = this.DBC.findToneByName(harpKey);
        window.console.debug(`Rendering harp in key: [${harpKey}] [${harmonica.name}]`);

        let html = "<table>";
        for (let i =0; i < harmonica.template.length; i++){

            if(i == 3) {
                html += this.printHoleNumbers(harmonica);
            }
            html += this.renderRow(harpRootTone, harmonica.template[i], i);
        }

        html += "</table>";
        this.ctx.html = html;
        return this.ctx;
    }        
    
    formatHarmonicaRowTitle(row){
        let htmlName = row.name;
        if(row.name === "1/2"){
            htmlName = "&#189;";
        }
        else if(row.name === "1"){
            htmlName = "Celý tón";
        }
        else if(row.name === "1 1/2"){
            htmlName = "<span>1 &#189;</span>";
        }
        return `${row.type}${htmlName}`;
    }

    renderRow(rootTone, row, rowNumber){
        let html = "<tr>";

        html += `<td>${this.formatHarmonicaRowTitle(row)}</td>`;
        html += `<td>${row.type}</td>`;

        for (let i =0; i < row.offsets.length; i++){
            if(isNaN(row.offsets[i])){
                html += "<td>&nbsp;</td>";
            }
            else{
                this.HarmonicaToneId = this.HarmonicaToneId + 1;
                var harmonicaTone = new ChordGen().plusTone(rootTone, row.offsets[i]);

                harmonicaTone.octave = this.getOctaveForHarmonicaTone(rowNumber, i);
                let harmonicaToneId = `harmonicaTone_${harmonicaTone.name}_${this.HarmonicaToneId}`;
                this.ctx.ToneMap.push(new ToneMapRecord(harmonicaToneId, harmonicaTone));
                html += `<td id="${harmonicaToneId}">${this.formatHtmlTone(harmonicaTone)}</td>`;

                window.console.debug(`${harmonicaTone.name} - ${harmonicaToneId}`);
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
    printHoleNumbers(harmonica) {
        let html = "<tr>";
        html +="<td></td><td></td>";

        for (let i =0; i<harmonica.template[0].offsets.length; i++) {
            html += `<th>${(i+1)}</th>`;
        }
        html += "</tr>";
        return html;
    }  

    colorKeyTones(ctx) {
        if ((ctx.ToneMap === undefined) || (ctx.TonesInScale === undefined))
            return;

        this.decolorAll(ctx.ToneMap);
        for (let i = 0; i < ctx.TonesInScale.length; i++) {
            let toneScale =  ctx.TonesInScale[i];
            for(let j = 0; j < toneScale.length; j++){
                // this i wanna to hi !
                let singleTone =toneScale[j];
                this.colorAllHarpTones(ctx, singleTone);
            }
        }
    }

    colorAllHarpTones(scaleCtx) {
        scaleCtx.TonesInScale.forEach(scale => this.colorHarpTones(scale))
    }

    colorHarpTones(tonesInScale) {
        tonesInScale.forEach(
            tone => this
                .findToneControlIdsByTone(tone)
                .forEach(
                    row => this.setColor(row.ControlId, true)
                )
        );
    }

    setColor(toneControlId, on) {
        window.console.debug(`${toneControlId}: [${(on ? "ON" : "OFF")}]`);
        setCssClass(
            document.getElementById(toneControlId), 
            'note-on',
            on
        );
    }

    decolorAll(toneMap) {
        toneMap.forEach(tc => this.setColor(tc.ControlId, false));
    }

    findToneControlIdsByTone(tone) {
        return this.ctx
            .ToneMap
            .filter(tr => DBCore.isToneEqual(tr.Tone, tone));
    }
}
