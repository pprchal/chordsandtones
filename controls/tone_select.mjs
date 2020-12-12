// Pavel Prchal 2020

import {BaseControl} from './base_control.mjs'
import {DB} from '../core/leaflet.mjs'

export class ToneSelectControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
    }

    render() {
        // <
        this.Self.appendChild(this.createShiftButton(-1));

        this.Select = document.createElement("select");
        this.Self.appendChild(this.Select);
        this.fillTones(this.Select);

        this.Self.addEventListener(
            'change', 
            (e) => this.fireEvent('TONE', DB.tones[e.target.selectedIndex])
        );

        // >
        this.Self.appendChild(this.createShiftButton(1));
    }
    
    // fill tones
    fillTones(cbTones) {
        DB.tones.forEach((tone) => {
            let option = document.createElement('option');
            option.text = tone.name;
            option.setAttribute('octave', tone.octave);
            cbTones.add(option);            
        });
    }

    createShiftButton(dir){
        let button = document.createElement('div');
        button.innerHTML = dir < 0 ? '&lt;' : '&gt;';
        button.className = 'button';
        button.addEventListener('click', (e) => this.shiftTone(dir));
        return button;
    }  

    shiftTone(dir){
        let n = this.Select.selectedIndex + dir;
        if(n<0){
            n = DB.tones.length - 1;
        }
        else if(n >= DB.tones.length){
            n = 0;
        }

        this.Select.selectedIndex = n;
        this.fireEvent('TONE', DB.tones[n]);
    }
}
