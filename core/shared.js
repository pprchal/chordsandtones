// Pavel Prchal 2019, 2020

function clone(src) {
    return {...src};
}

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
        this.ChordGen = new ChordGen();
        this.Tuning = this.ChordGen.findTuningByName('equal-tempered');
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

    // @chord
    formatChordName(chord) {
        return this.formatHtmlTone(chord.rootTone);
    }       

    // @tone
    formatPlainTone(tone) {
        return tone.name;
    }     

    formatHtmlTone(tone){
        // D♯
        return tone.name.replace('#', '<sup>&#9839;</sup>');
    }
    
    // @distance
    formatDistance(distance) {
        return `${(distance + 1)} - ${this.ChordGen.findInterval(distance).name}`;
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