// Pavel Prchal 2019,2020

// -------------------- HarmonicaControl
// --------------------
class HarmonicaControl extends BaseControl {
    constructor(controlId, harpKey) {
        super(controlId);
        this.HarmonicaToneId = 1;
        this.ToneMap = [];
        this.HarpRootTone = this.Core.tone(harpKey);
        this.Harmonica = this.Core.harmonica('Richter diatonická');
    }

    render() {
        this.debug(`Rendering harp in key: [${this.HarpRootTone.name}] [${this.Harmonica.name}]`);

        let html = "<table>";
        for (let i =0; i < this.Harmonica.template.length; i++){

            if(i == 3) {
                html += this.printHoleNumbers(this.Harmonica);
            }
            html += this.renderRow(this.HarpRootTone, this.Harmonica.template[i], i);
        }

        this.uniqueTones = new Set(this.ToneMap.map(r => r.Tone.name));
        this.setHtml(html + "</table>");
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
        return "<tr>" +
            `<td>${this.formatHarmonicaRowTitle(row)}</td>` +
            `<td>${row.type}</td>` +
            row.offsets.reduce((html, distance) => {
                if(isNaN(distance)){
                    return html + "<td>&nbsp;</td>";
                }
                else{
                    this.HarmonicaToneId = this.HarmonicaToneId + 1;
                    var harmonicaTone = this.Core.shiftTone(rootTone, distance);
                    harmonicaTone.octave = this.getOctaveForHarmonicaTone(rowNumber, 1);
                    let harmonicaToneId = `harmonicaTone_${harmonicaTone.name}_${this.HarmonicaToneId}`;
                    this.ToneMap.push(new ToneMapRecord(harmonicaToneId, harmonicaTone));
                    this.debug(`${harmonicaTone.name} - ${harmonicaToneId}`);
                    return html + `<td id="${harmonicaToneId}">${this.Core.toneAsHtml(harmonicaTone)}</td>`;
                }
            }, "") +
        "</tr>";
    }

    getOctaveForHarmonicaTone(col){
        // TODO: need this octave? ....
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
        let html = "<tr>" +
            "<td></td><td></td>";

        for (let i =0; i<harmonica.template[0].offsets.length; i++) {
            html += `<th>${(i+1)}</th>`;
        }

        return html + "</tr>";
    }  

    colorKeyTones(scaleCtl) {
        this.decolorAll(this.ToneMap);
        scaleCtl
            .TonesInScale
            .forEach(tonesInScale => this.colorAllHarpTonesBy(tonesInScale));
    }

    colorAllHarpTonesBy(tonesInScale) {
        tonesInScale.forEach(tone => this.colorHarpTonesBy(tone))
    }

    colorHarpTonesBy(tone) {
        this
            .findToneControlIdsByTone(tone)
            .forEach(row => this.setColor(row.ControlId, true));
    }

    setColor(toneControlId, on) {
        // window.console.debug(`${toneControlId}: [${(on ? "ON" : "OFF")}]`);
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
        return this.ToneMap
            .filter(tr => MCore.isToneEqual(tr.Tone, tone));
    }
}
