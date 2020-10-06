// Pavel Prchal 2020
// -------------------- ScaleControl
// --------------------
class ScaleControl extends BaseControl{
    constructor() {
        super();
        this.ctx = new Context();
        this.ctx.Tuning = this.DBC.findTuningByName('equal-tempered');
    }

    // @rootToneName (C)
    // @scaleName (dur)
    render(rootToneName, scaleName, appendControlId) {
        this.ctx.RootTone = this.DBC.findToneByName(rootToneName);
        this.ctx.Scale = this.DBC.findScaleByName(scaleName);
        this.ctx.TonesInScale = new ChordGen().generateScaleTableForTone(
            this.ctx.RootTone,
            this.ctx.Scale
        );
        this.ctx.html = this.printScaleTable(
            this.ctx.Scale, 
            this.ctx.Tuning.name,
            this.ctx.TonesInScale,
            appendControlId
        );

        return this.ctx;
    }


    printTonesHeader(){
        let html = '<tr><td>&nbsp;</td>';
        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
        }
        return html + '</tr>';
    }

    // remove
    prepareArrByTones() {
        let arr = [];
        for(let i = 0; i<DB.tones.length; i++){
            arr[i] = '&nbsp;';
        }
        return arr;
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
