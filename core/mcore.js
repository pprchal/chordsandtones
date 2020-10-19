// Pavel Prchal 2019,209
// -------------------- MCore

class MCore {
    constructor(container){
        // vanila
        if(container != undefined){
            this.DB = container.DB;
        }
        else{
            if(window != undefined){
                this.DB = window.getContainer().DB;
            }
        }
    }

    clone(src) {
        let obj = {...src};
        return obj;
    }

    toneAsHtml(tone){
        // D♯
        return tone.name.replace('#', '<sup>&#9839;</sup>');
    }

    // @tone
    toneAsText(tone) {
        return tone.name;
    } 
    
    // @chordTemplate
    // @rootTone
    generateChordTableForTone(chordTemplate, rootTone) {
        let chord = this.clone(chordTemplate);

        chord.tones = new Array();
        let rootIndex = this.indexOfTone(rootTone);

        for (let i = 0; i < chord.distances.length; i++) {
            let toneIndex = chord.distances[i] + rootIndex;
            let octave = 0;
            while(toneIndex >= this.DB.tones.length) {
                octave++;
                toneIndex = toneIndex - this.DB.tones.length;
            }

            let chordTone = this.clone(this.DB.tones[toneIndex]);
            chordTone.octave = octave;
            chord.tones.push(chordTone);
        }

        // window.console.debug(`Chord ${rootTone}${chordTemplate} generated: ${chord.tones}`);
        chord.rootTone = rootTone;
        return chord;
    }  

    // @rootTone
    // @scale
    generateScaleTablesForTone(rootTone, scale) {
        let scaleTonesAll = new Array();
        for(let i = 0; i < scale.distances.length; i++){
            scaleTonesAll.push(this.generateScaleTableForDistance(rootTone, scale.distances[i]));
        }
        return scaleTonesAll;
    }          

    // @rootTone
    // @distances[]
    generateScaleTableForDistance(rootTone, distances){
        let scaleTones = new Array();
        let rootIndex = this.indexOfTone(rootTone);            

        for (let i = 0; i < distances.length; i++) {
            let n = distances[i] + rootIndex;
            let octave = 0;
            while(n >= this.DB.tones.length) {
                octave++;
                n = n - this.DB.tones.length;
            }

            let scaleTone = this.clone(this.DB.tones[n]);
            scaleTone.octave = octave;
            scaleTones.push(scaleTone);
        }

        return scaleTones;
    }

    findCharChords(rootTone){
        let chordRootTone = this.tone(rootTone);
        let res2 = "";

        for(let i=0; i < this.DB.qround.length; i++){
            let qr = this.DB.qround[i];
            if(qr.chord === ""){
                continue;
            }

            let t = this.shiftTone(chordRootTone, qr.n);
            res2 += `${qr.name} - ${t.name}${qr.chord}\n`;
        }

        return res2;
    }

    // @chord
    // @distance
    isMatchingChordDistance(chord, distance){
        if(chord.distances.length != distance.length){
            return false;
        }

        for(let i = 0; i < chord.distances.length; i++){
            if(chord.distances[i] != distance[i]){
                return false;
            }
        }

        return true;
    }

    shiftTone(rootTone, distance){
        let n = this.indexOfTone(rootTone) + distance;
        let octave = 0;

        if(n >= this.DB.tones.length) {
            octave++;
            n = n - this.DB.tones.length;
        }
        if(n < 0){
            octave--;
            n  = this.DB.tones.length - 1;
        }

        let clonedTone = this.clone(this.DB.tones[n]);
        clonedTone.octave = octave;
        return clonedTone;
    }

    indexOfTone(tone){
        for(let i=0; i < this.DB.tones.length; i++)
        {
            if(MCore.isToneEqual(this.DB.tones[i], tone)){
                return i;
            }
        }

        return -1;
    }

    // =================================  FIND 
    // @chordName
    chord(chordName) {
        return this.DB.chords.find(chord => MCore.isMatchingChordName(chord, chordName));
    }

    // @scaleName
    scale(scaleName) {
        return this.DB.scales.find(scale => MCore.isMatchingScaleName(scale, scaleName));
    }

    // @toneName
    tone(toneName) {
        return this.clone(this.DB.tones.find(tone => MCore.isMatchingToneName(tone, toneName)));
    }

    // @tuningName
    tuning(tuningName) {
        return this.DB.tunings.find(tuning => MCore.isMatchingTuningName(tuning, tuningName));
    }
    
    // @harmonicaName
    harmonica(harmonicaName) {
        return this.DB.harmonicas.find(harmonica => MCore.isMatchingHarmonicaName(harmonica, harmonicaName));
    }

    // @chord
    // @chordName
    static isMatchingChordName(chord, chordName) {
        return chord.name === chordName;
    }        

    // @tone
    // @toneName
    static isMatchingToneName(tone, toneName) {
        return tone.name === toneName;
    }    
    
    // @tuning
    // @tuningName
    static isMatchingTuningName(tuning, tuningName) {
        return tuning.name === tuningName;
    } 

    // @scale
    // @scaleName
    static isMatchingScaleName(scale, scaleName) {
        return scale.name === scaleName;
    }  
    
    // @harmonica
    // @harmonicaName
    static isMatchingHarmonicaName(harmonica, harmonicaName) {
        return harmonica.name === harmonicaName;
    }  

    static isToneEqual(tone1, tone2) {
        return tone1.name === tone2.name;
    }  
    
    // @distance
    findInterval(distance) {
        for (let i=0; i<this.DB.intervals.length; i++){
            if(this.DB.intervals[i].distance == distance){
                return this.DB.intervals[i];
            }
        }

        return this.DB.intervals[0];
    }
}

function createMCore(t){
    console.debug(t);
    let core = new MCore(this);
    core.DB = this.DB;
    return core;
}
