// Pavel Prchal 2019,2020

import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./base_control.mjs"

export class HarmonicaControl extends BaseControl {
    constructor(controlId, messageGroup) {
        super(controlId, messageGroup);
        this.HarpRootTone = MCore.tone('C', 4);
        this.Harmonica = MCore.harmonica('Richter diatonická', this.HarpRootTone.name);
    }

    render(harpRootTone) {
        if(harpRootTone != undefined){
            this.HarpRootTone = harpRootTone;
            this.Harmonica = MCore.harmonica('Richter diatonická', this.HarpRootTone.name);
        }

        this.debug(`harmonica.render(${this.HarpRootTone.name}, [${this.Harmonica.name}])`);
        let html = '<table>';
        for (let i = 0; i < this.Harmonica.template.length; i++){

            if(i === 3) {
                html += this.printHoleNumbers(this.Harmonica);
            }
            html += this.renderRow(this.HarpRootTone, this.Harmonica.template[i], i);
        }

        this.setHtml(html + '</table>');
    }        
    
    subscribeTo(eventName, messageGroup, doAction){
        document.addEventListener(eventName, (e) => 
        {
            this.debug(`harmonica.subscribeTo(${eventName}, ${e.MessageGroup}, ${doAction})`);
            if(e.MessageGroup === messageGroup)
            {
                if(doAction === "COLORIZE")
                {
                    this.colorize(e.EventData);
                }
                else if(doAction === undefined)
                {
                    // default action - i don't want to write RENDER to all commands
                    // but.. think twice to refactor
                    this.render(e.EventData);
                }
            }
        });

        return this;
    }

    formatHarmonicaRowTitle(row){
        let htmlName = row.name;
        if(row.name === '1/2'){
            htmlName = '&#189;';
        }
        else if(row.name === '1'){
            htmlName = 'Celý tón';
        }
        else if(row.name === '1 1/2'){
            htmlName = '<span>1 &#189;</span>';
        }
        return `${row.type}${htmlName}`;
    }

    renderRow(rootTone, row, rowNumber){
        return '<tr>' +
            `<td>${this.formatHarmonicaRowTitle(row)}</td>` +
            `<td>${row.type}</td>` +
            row.offsets.reduce((html, distance) => {
                if(isNaN(distance)){
                    return html + '<td>&nbsp;</td>';
                }
                else{
                    let tone = MCore.shiftTone(rootTone, distance);
                    return html + `<td tone="${tone.name}" octave="${tone.octave}">${MCore.toneAsHtml(tone, true)}</td>`;
                }
            }, '') +
        '</tr>';
    }

    // @harmonica
    printHoleNumbers(harmonica) {
        let html = '<tr>' +
            '<td></td><td></td>';

        for (let i =0; i<harmonica.template[0].offsets.length; i++) {
            html += `<th>${(i+1)}</th>`;
        }

        return html + '</tr>';
    }  

    colorize(scaleChanged) {
        // this.Self.querySelectorAll("td[tone='C'][octave='4']")

        this.Self.querySelectorAll("td[tone]").forEach(td => {
            let tdToneName = td.attributes['tone'].value
            let tdToneOctave = td.attributes['octave'].value
        });

        let tones = scaleChanged.TonesInScale;
        
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
        // setCssClass(
        //     document.getElementById(toneControlId), 
        //     'note-on',
        //     on
        // );
    }

    // decolorAll(toneMap) {
    //     toneMap.forEach(tc => this.setColor(tc.ControlId, false));
    // }

    // findToneControlIdsByTone(tone) {
    //     return this.ToneMap
    //         .filter(tr => MCore.isToneEqual(tr.Tone, tone));
    // }
}
