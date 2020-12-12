// Pavel Prchal 2020
// -------------------- ScaleControl
// --------------------
import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./control.mjs"

export class ScaleControl extends BaseControl{
    constructor(controlId, showOctaves, octave) {
        super(controlId);
        this.Octave = octave == undefined ? 4 : octave;
        this.ShowOctaves = showOctaves == undefined ? false : showOctaves;
        this.RootTone = MCore.tone('C', this.Octave);
        this.Scale = MCore.scale('dur');
    }

    // @rootToneName (C)
    // @scaleName (dur)
    render(rootTone, scale) {
        if(rootTone != undefined){
            this.RootTone = rootTone;
        }

        if(scale != undefined){
            this.Scale = scale;
        }

        let tonesInScale = MCore.generateScaleTablesForTone(this.RootTone, this.Scale);
        let html = '';
        for(let i=0; i<this.Scale.distances.length; i++){
            html += this.renderSingleScale(tonesInScale, i);
        }

        this.setHtml(html);

        // this.Childs.forEach(chid =>
        //     {
        //         let button = document.getElementById(chid);
        //         button.addEventListener('click', (e) => this.fireEvent('PLAY_TONE', 'C'));
        //     });
    }

    subscribeTo(eventName, messageGroup){
        this.MessageGroup = messageGroup;
        document.addEventListener(eventName, (e) => 
            {
                if(e.MessageGroup === this.MessageGroup){
                    if(e.type === 'SCALE_TYPE'){
                        this.render(undefined, e.EventData);
                    }
                    else if(e.type === 'TONE'){
                        this.render(e.EventData, undefined);
                    }                
                }
            }
        );

        return this;
    }

    renderSingleScale(tonesInScale, i){
        return '<table class = "u-full-width">' +
            this.printScaleHeader(this.Scale.distances[i]) +
            this.printSingleScaleTableBody(tonesInScale[i]) +
        '</table>';
    }

    printTonesHeader(){
        return '<tr><td>&nbsp;</td>' +
            DB.tones.reduce((html, tone) => html + `<th>${MCore.toneAsHtml(tone)}</th>`, '') +
        '</tr>';
    }

    // @tones[]
    printSingleScaleTableBody(tonesInScale) {
        return '<tr>' +
            tonesInScale.reduce((html, tone) => html + `<td>${this.renderScaleButton(tone)}</td>`, '') +
        '</tr>';
    } 

    renderScaleButton(tone){
        return `<a id=${this.getControlId()} class="button button-primary" href="javascript:none" onclick="" role="button">${MCore.toneAsHtml(tone, this.ShowOctaves)}</a>`;
    }

    printScaleHeader(distances) {
        return '<tr>' +
            distances.reduce((html, distance) => html + `<th>${this.formatDistance(distance)}</th>`, "") +
        '</tr>';
    } 
}
