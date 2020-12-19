// Pavel Prchal 2020

import {MCore} from "../core/mcore.mjs"

export class BaseControl{
    constructor(controlId, messageGroup) {
        this.ControlId = controlId
        this.Tuning = MCore.tuning('equal-tempered')
        this.CtID = 0
        this.Childs = []
        this.MessageGroup = (messageGroup == undefined ? "---" : messageGroup)
    }

    // new... todo refactor all...
    get Self(){
        return document.getElementById(this.ControlId)
    }


    setHtml(html){
        this.Self.innerHTML = html
    }

    setCssClass(control, cssClass, on) {
        let contains = control.classList.contains(cssClass);
    
        if (on) {
            if (!contains)
                control.classList.add(cssClass);
        }
        else {
            if (contains)
                control.classList.remove(cssClass);
        }
    }
    
    fireEvent(name, eventData){
        this.debug(`fireEvent(${name}, ${eventData}, ${this.MessageGroup})`)
        let evt = new CustomEvent(name)
        evt.EventData = eventData
        evt.MessageGroup = this.MessageGroup
        document.dispatchEvent(evt)
    }

    subscribeTo(eventName){
        document.addEventListener(eventName, (e) => {
            if((self.MessageGroup == undefined) ||
               (self.MessageGroup === e.MessageGroup)){
                this.dispatchSubscribtion(e);
            }
        });
    }

    dispatchSubscribtion(e){
    }

    getControlId(x){
        this.CtID++;

        let id = '';
        if(x == undefined){
            id = `${this.ControlId}_${this.CtID}`;
        }
        else {
            id = `${this.ControlId}_${x}_${this.CtID}`
        }
        this.Childs.push(id);
        return id;
    }

    debug(msg){
        window.console.debug(msg);
    }

    // @distance
    formatDistance(distance) {
        return `${(distance + 1)} - ${MCore.findInterval(distance).name}`;
    }    
}
