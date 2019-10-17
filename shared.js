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
    // @tone
    getToneName(tone, format) {
        if(format == undefined)
            format = 'html';

        let toneName = tone.name;

        if(tone.octave == 0)
            return toneName;

        if(format === 'plain') 
            return toneName + tone.octave;

        return toneName + "<sup>" + tone.octave + "</sup>";
    }     
}