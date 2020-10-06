// Pavel Prchal 2019, 2020

function clone(src) {
    return {...src};
}

class Context {
    constructor(){
        this.Tuning = undefined;
        this.TonesInScale = undefined;
        this.ToneMap = new Array();
    }
}


class ToneMapRecord {
    constructor(controlId, tone){
        this.ControlId = controlId;
        this.Tone = tone;
    }
}


class BaseControl{
    constructor() {
        this.DBC = new DBCore();
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
        let name = this.DBC.findInterval(distance).name;
        if(distance == 0)
            return name;

        return `${distance} - ${name}`;
    }    
}