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
        return templateRow
            .offsets
            .reduce((tones, offset, n) => 
                {
                    if(n === 0) {
                        tones[n] = MCore.shiftTone(rootTone, offset);
                    }else{
                        tones[n] = MCore.shiftTone(tones[n - 1], offset);
                    }
                    return tones;
                },
                Array(templateRow.offsets.length)
            );
    }

    static bendTone(tone, templateRow){
        let bend = templateRow.bend
        if(bend !== 0)
            bend = tone.name.endsWith('#') ? bend : 0

        return MCore.toneAsHtml(tone, true, bend)        
    }
}
