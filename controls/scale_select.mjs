// Pavel Prchal 2020

import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ScaleSelectControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
    }

    render(document) {
        let cont = document.getElementById(this.ControlId);
        cont.appendChild(this.createButton(-1));

        this.Select = document.createElement("select");
        document.getElementById(this.ControlId).appendChild(this.Select);
        this.fillScales(this.Select, document);
        this.Select.addEventListener("change", (e) =>{
            this.fireEvent('SCALE_TYPE', DB.scales[e.target.selectedIndex]);
        });

        cont.appendChild(this.createButton(1));
    }
    
    fillScales(cbScales, document) {
        DB.scales.forEach((scale) => cbScales.add(this.createScaleOption(scale, document)));
    }

    createScaleOption(scale, document){
        let option = document.createElement("option");
        option.text = scale.name;
        return option;
    }

    createButton(dir){
        let button = document.createElement('div');
        button.innerHTML = dir < 0 ? '&lt;' : '&gt;';
        button.className = 'button';
        button.addEventListener('click', (e) => this.shiftScale(dir));
        return button;
    }    

    shiftScale(dir){
        let n = this.Select.selectedIndex + dir;
        if(n<0){
            n = DB.scales.length - 1;
        }
        else if(n >= DB.scales.length){
            n = 0;
        }

        this.Select.selectedIndex = n;
        this.fireEvent('SCALE_TYPE', DB.scales[n]);
    }
}
