// Pavel Prchal 2020

import {MCore} from "../core/mcore.mjs"

export class BaseControl{
    constructor(controlId) {
        this.ControlId = controlId;
        this.Tuning = MCore.tuning('equal-tempered');
        this.CtID = 0;
        this.Childs = [];
    }

    // new... todo refactor all...
    get Self(){
        return document.getElementById(this.ControlId);
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
        // window.console.debug(msg);
    }

    // @distance
    formatDistance(distance) {
        return `${(distance + 1)} - ${MCore.findInterval(distance).name}`;
    }    
}
