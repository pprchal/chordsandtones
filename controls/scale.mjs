// Pavel Prchal 2020

import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./base_control.mjs"

export class ScaleControl extends BaseControl{
    constructor(controlId, showOctaves, octave, messageGroup) {
        super(controlId, messageGroup);
        this.Octave = octave == undefined ? 4 : octave;
        this.ShowOctaves = showOctaves == undefined ? false : showOctaves;
        this.RootTone = MCore.tone('C', this.Octave);
        this.Scale = MCore.scale('dur');
    }

    render(rootTone, scale) {
        if(rootTone != undefined){
            this.RootTone = rootTone;
        }

        if(scale != undefined){
            this.Scale = scale;
        }

        this.debug(`scale.render(${this.RootTone.name}, ${this.Scale.name})`);
        this.clear()

        // Cdur
        // ...and speciality...
        for(let i=0; i<this.Scale.distances.length; i++){
            this.Self.appendChild(this.renderScale(i))
        }

        this.fireEvent(
            'SCALE_CHANGED', 
            {
                RootTone: this.RootTone,
                Scale: this.Scale
            }
        );
    }

    subscribeTo(eventName, messageGroup){
        document.addEventListener(eventName, (e) => 
            {
                if(e.MessageGroup === messageGroup){
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

    renderScale(n){
        let gs = MCore.generateScale(this.RootTone, this.Scale, n)

        let table = document.createElement('table')
        table.class = 'u-full-width'
        table.appendChild(this.thead(this.Scale.distances[n]))
        table.appendChild(this.tr(gs))
        return table
    }

    tr(tonesInScale) {
        let tr = document.createElement('tr')
        tr.append(...tonesInScale.map(tone => 
            {
                let td = document.createElement('td')
                td.appendChild(this.button(tone))
                return td
            }
        ))
        return tr
    } 

    button(tone){
        let a = document.createElement('a')
        a.className = 'button button-primary'
        a.innerHTML = MCore.toneAsHtml(tone, this.ShowOctaves)
        return a
    }

    thead(distances) {
        let thead = document.createElement('thead')
        let tr = document.createElement('tr')

        thead.appendChild(tr)
        tr.append(...MCore.fromRelative(distances).map(distance =>
            {
                let td = document.createElement('th')
                td.innerHTML = MCore.distanceAsHtml(distance)
                return td
            }
        ));
            
        return thead
    } 
}
