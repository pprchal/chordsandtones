// Pavel Prchal 2020

import {MCore} from "./mcore.mjs"

/**
 * Harp core module
 */
export class MHarp {
    static generateHarp(harp, rootTone){
        return harp.template.map(r => this.generateRow(rootTone, r))
    }

    static generateRow(rootTone, templateRow){
        let tones = Array(templateRow.offsets.length)

        let prevTone = undefined;
        for (let i=0; i < templateRow.offsets.length; i++){
            let offset = templateRow.offsets[i]
            if(isNaN(offset)){
                tones[i] = undefined
            }else if(prevTone === undefined){
                tones[i] = MCore.shiftTone(rootTone, offset)
                prevTone = tones[i]
            }else {
                tones[i] = MCore.shiftTone(prevTone, offset)
                prevTone = tones[i]
            }
        }

        return tones
    }

    static bendTone(tone, templateRow){
        if(tone.name == undefined){
            console.debug('tt')
        }
        let bend = templateRow.bend
        if(bend !== 0)
            bend = tone.name.endsWith('#') ? bend : 0

        return MCore.toneAsHtml(tone, true, bend)        
    }
}
