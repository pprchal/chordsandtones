// Pavel Prchal 2020
// -------------------- ScaleControl
// --------------------
import {BaseControl} from "./control.mjs"

export class ScaleControl extends BaseControl{
    constructor(controlId, showOctaves, octave) {
        super(controlId);
        this.Octave = octave == undefined ? 4 : octave;
        this.ShowOctaves = showOctaves == undefined ? false : showOctaves;
        this.RootTone = this.Core.tone('C', this.Octave);
        this.Scale = this.Core.scale('dur');
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

        this.TonesInScale = this.Core.generateScaleTablesForTone(this.RootTone, this.Scale);

        // this.Scale.distances.reduce((html, scaleDistance) => html += this.renderSingleScale(i))
        let html = "";
        for(let i=0; i<this.Scale.distances.length; i++){
            html += this.renderSingleScale(i);
        }
        this.setHtml(html);
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

    renderSingleScale(i){
        return '<table>' +
            this.printScaleHeader(this.Scale.distances[i]) +
            this.printSingleScaleTableBody(this.TonesInScale[i]) +
        '</table>';
    }

    printTonesHeader(){
        return '<tr><td>&nbsp;</td>' +
            DB.tones.reduce((html, tone) => html + `<th>${this.Core.toneAsHtml(tone)}</th>`, "") +
        '</tr>';
    }

    // @tones[]
    printSingleScaleTableBody(tonesInScale) {
        return "<tr>" +
            tonesInScale.reduce((html, tone) => html + `<td>${this.renderScaleButton(tone)}</td>`, "") +
        "</tr>";
    } 

    renderScaleButton(tone){
        // ${this.toneClickScript(tone)}; return false;
        let button = `<a class="btn btn-primary btn-block" href="javascript:none" onclick="" role="button">${this.fromatScaleTone(tone)}</a>`;
        return button;
    }

    fromatScaleTone(tone){
        return this.Core.toneAsText(tone) + (this.ShowOctaves ? tone.octave : '');
    }

   
    playToneWithOctave(toneName, toneOctave, tuningName, appendControlId, tt) {
        this.fireEvent('PLAY_TONE', tone);
        // document.getElementById(appendControlId).value += toneName;
        P_CONTAINER.SOUND.playToneWithOctave(toneName, toneOctave, tuningName);
    }

    printScaleHeader(distances) {
        return "<tr>" +
            distances.reduce((html, distance) => html + `<th>${this.formatDistance(distance)}</th>`, "") +
        "</tr>";
    } 
}
