// Pavel Prchal 2020
// -------------------- ScaleControl
// --------------------
class ScaleControl extends BaseControl{
    constructor(rootToneName, scaleName, appendControlId) {
        super();
        this.Tuning = this.DBC.findTuningByName('equal-tempered');
        this.RootTone = this.DBC.findToneByName(rootToneName);
        this.Scale = this.DBC.findScaleByName(scaleName);
        this.TonesInScale = new ChordGen().generateScaleTableForTone(
            this.RootTone,
            this.Scale
        );
        this.AppendControlId = appendControlId;
    }

    // @rootToneName (C)
    // @scaleName (dur)
    render() {
        return this.printScaleTable(
            this.Scale, 
            this.Tuning.name,
            this.TonesInScale,
            this.AppendControlId
        );
    }


    printTonesHeader(){
        let html = '<tr><td>&nbsp;</td>';
        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
        }
        return html + '</tr>';
    }

    // @tones[]
    printSingleScaleTableBody(tones, appendControlId, tuningName) {
        let html = "<tr>";
        for (let i = 0; i < tones.length; i++) {
            let tone = tones[i];
            html += `<td>${this.renderScaleButton(tone, appendControlId, tuningName)}</td>`;
        }
        html += "</tr>";
        return html;
    } 

    renderScaleButton(tone, appendControlId, tuningName){
        let script = `playToneWithOctave('${tone.name}', '${tone.octave}', '${tuningName}', '${appendControlId}')`;
        return `<a class="btn btn-primary btn-block" href="javascript:none" onclick="${script}; return false;" role="button">${this.formatPlainTone(tone)}</a>`;
    }

    printScaleTable(scale, tuningName, tonesInScale, appendControlId) {
        let html = "";

        for(let i=0; i<scale.distances.length; i++){
            html += "<table>";
            html += this.printScaleHeader(scale.distances[i]);
            html += this.printSingleScaleTableBody(tonesInScale[i], appendControlId, tuningName);
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
}
