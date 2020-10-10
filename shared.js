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
    constructor(controlId) {
        this.ControlId = controlId;
        this.ChordGen = new ChordGen();
        this.Tuning = this.ChordGen.findTuningByName('equal-tempered');
    }

    setHtml(html){
        document.getElementById(this.ControlId).innerHTML = html;
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