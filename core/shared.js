// Pavel Prchal 2019, 2020

function getSelectedValue(id){
    return document.getElementById(id).selectedOptions[0].value;
}       

function getSelectedValue2(id){
    return document.getElementById(id).value;
} 

class ToneMapRecord {
    constructor(controlId, tone){
        this.ControlId = controlId;
        this.Tone = tone;
    }
}

class BaseControl{
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

    // @tone
    formatPlainTone(tone) {
        return tone.name;
    }     

    // @distance
    formatDistance(distance) {
        return `${(distance + 1)} - ${this.Core.findInterval(distance).name}`;
    }    
 
}

function setCssClass(control, cssClass, on) {
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