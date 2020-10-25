// Pavel Prchal 2020

import {MCore} from "../core/mcore.mjs"

export class BaseControl{
    constructor(controlId) {
        this.ControlId = controlId;
        this.Core = new MCore();
        this.Tuning = this.Core.tuning('equal-tempered');
        this.CtID = 0;
    }

    setHtml(html){
        document.getElementById(this.ControlId).innerHTML = html;
    }

    getControlId(){
        this.CtID++;
        return `${this.ControlId}_${this.CtID}`;
    }

    getControlId(x){
        this.CtID++;
        return `${this.ControlId}_${x}_${this.CtID}`;
    }
    
    debug(msg){
        // window.console.debug(msg);
    }

    // @distance
    formatDistance(distance) {
        return `${(distance + 1)} - ${this.Core.findInterval(distance).name}`;
    }    
}
