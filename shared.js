// Pavel Prchal 2019

class Context {
    constructor(){
        this.Tuning = undefined;
        this.ShiftOctave = 4;
        this.TonesInScale = undefined;
        this.ToneMap = new Array();
        this.ChordToneId = 1;
        this.HarmonicaName = undefined;
        this.HarmonicaToneId = 1;
        this.HarmonicaToneName = undefined;
    }
}


class ToneMapRecord {
    constructor(controlId, tone){
        this.ControlId = controlId;
        this.Tone = tone;
    }
}


class BasePrinter{
    // @chord
    formatChordName(chord) {
        return this.formatHtmlTone(chord.rootTone);
    }       

    // @tone
    formatPlainTone(tone) {
        let toneName = tone.name;

        if(tone.octave == 0)
            return toneName;

        if(format === 'plain') 
            return toneName + tone.octave;
    }     

    formatHtmlTone(tone){
        // D♯
        return tone.name.replace('#', '<sup>&#9839;</sup>');
    }
}