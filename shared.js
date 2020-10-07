// Pavel Prchal 2019, 2020

function clone(src) {
    return {...src};
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

    debug(msg){
        window.console.debug(msg);
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