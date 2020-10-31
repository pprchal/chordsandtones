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

    publishTo(messageGroup){
        this.MessageGroup = messageGroup;
        return this;
    }

    fireEvent(name, eventData){
        var evt = document.createEvent("Event");
        evt.initEvent(name, true, true);
        evt.MessageGroup = this.MessageGroup;
        evt.Sender = this;
        evt.EventData = eventData;
        document.dispatchEvent(evt);
    }

    subscribeTo(eventName, handler, self){
        document.addEventListener(eventName, (e) => {
            if(self.MessageGroup === e.MessageGroup){
                handler.call(e, self);
            }
        });
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
