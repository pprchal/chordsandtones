// Pavel Prchal 2020
// -------------------- ScaleControl
// --------------------
import {BaseControl} from "../core/shared.js"

export class ScaleControl extends BaseControl{
    constructor(controlId, rootToneName, scaleName, appendControlId) {
        super(controlId);
        this.Scale = this.Core.scale(scaleName);
        this.AppendControlId = appendControlId;
        this.RootTone = this.Core.tone(rootToneName);
        this.TonesInScale = this.Core.generateScaleTablesForTone(this.RootTone, this.Scale);
    }

    // @rootToneName (C)
    // @scaleName (dur)
    render() {
        let html = "";
        for(let i=0; i<this.Scale.distances.length; i++){
            html += this.renderSingleScale(i);
        }
        this.setHtml(html);
    }

    renderSingleScale(i){
        return "<table>" +
            this.printScaleHeader(this.Scale.distances[i]) +
            this.printSingleScaleTableBody(this.TonesInScale[i]) +
        "</table>";
    }


    printTonesHeader(){
        return "<tr><td>&nbsp;</td>" +
            DB.tones.reduce((html, tone) => html + `<th>${this.Core.toneAsHtml(tone)}</th>`, "") +
        "</tr>";
    }

    // @tones[]
    printSingleScaleTableBody(tonesInScale) {
        return "<tr>" +
            tonesInScale.reduce((html, tone) => html + `<td>${this.renderScaleButton(tone)}</td>`, "") +
        "</tr>";
    } 

    renderScaleButton(tone){
        let script = `playToneWithOctave('${tone.name}', '${tone.octave}', '${this.Tuning.name}', '${this.AppendControlId}')`;
        return `<a class="btn btn-primary btn-block" href="javascript:none" onclick="${script}; return false;" role="button">${this.Core.toneAsText(tone)}</a>`;
    }


    printScaleHeader(distances) {
        return "<tr>" +
            distances.reduce((html, distance) => html + `<th>${this.formatDistance(distance)}</th>`, "") +
        "</tr>";
    }        
}
