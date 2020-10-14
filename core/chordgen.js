// Pavel Prchal 2019
// -------------------- PossibleChord
// --------------------

class PossibleChord {
    constructor(chord){
        this.Chord = chord;
        this.Percent = 0;
    }
}

// -------------------- ChordGen
// --------------------
class ChordGen {
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
    // @chordTemplate
    // @rootTone
    generateChordTableForTone(chordTemplate, rootTone) {
        let chord = clone(chordTemplate);

        chord.tones = new Array();
        let rootIndex = this.DB.tones.indexOf(rootTone);

        for (let i = 0; i < chord.distances.length; i++) {
            let toneIndex = chord.distances[i] + rootIndex;
            let octave = 0;
            while(toneIndex >= this.DB.tones.length) {
                octave++;
                toneIndex = toneIndex - this.DB.tones.length;
            }

            let chordTone = clone(this.DB.tones[toneIndex]);
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
        let rootIndex = this.DB.tones.indexOf(rootTone);            

        for (let i = 0; i < distances.length; i++) {
            let n = distances[i] + rootIndex;
            let octave = 0;
            while(n >= this.DB.tones.length) {
                octave++;
                n = n - this.DB.tones.length;
            }

            let scaleTone = clone(this.DB.tones[n]);
            scaleTone.octave = octave;
            scaleTones.push(scaleTone);
        }

        return scaleTones;
    }

    findCharChords(rootTone){
        let chordRootTone = this.findToneByName(rootTone);
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

    parseTones(rawToneNames){
        let tones = new Array();
        let split = rawToneNames.split(" ");

        for(let i = 0; i < split.length; i++){
            let tone = this.findToneByName(split[i]);
            if(tone != null){
                tones.push(tone);
            }
        }
        return tones;        
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

    findAllPossibleChords(tones){
        let distances = new Array();

        for(let i = 0; i<tones.length; i++){
            let distance = this.distanceBetween(tones[0], tones[i]);
            distances.push(distance);
        }

        let possibleChords = new Array();
        for(let j =0; j<this.DB.chords.length; j++){
            if(this.isMatchingChordDistance(this.DB.chords[j], distances)){
                possibleChords.push(this.DB.chords[j]);
            }
        }
        return possibleChords;
    }

    distanceBetween(toneA, toneB){
        if(toneA.name == toneB.name){
            return 0;
        }

        let i = this.DB.tones.indexOf(toneA);
        let dist = 0;

        do{
            i++;
            if(i >= this.DB.tones.length){
                i = 0;
            }
            dist++;

        }while(!this.isMatchingToneName(this.DB.tones[i], toneB.name));

        return dist;
    }

    shiftTone(rootTone, halfToneOffset){
        let n = this.DB.tones.indexOf(rootTone) + halfToneOffset;
        let octave = 0;

        if(n >= this.DB.tones.length) {
            octave++;
            n = n - this.DB.tones.length;
        }
        if( n < 0){
            octave--;
            n  = this.DB.tones.length - 1;
        }

        let clonedTone = clone(this.DB.tones[n]);
        clonedTone.octave = octave;
        return clonedTone;
    }

    guessChordsByTones(rawToneNames){
        let tones = this.parseTones(rawToneNames);
        let possibleChords = this.findAllPossibleChords(tones);
        let textResult = "";

        for(let i=0; i<possibleChords.length; i++){
            textResult += possibleChords[i].name + "  ";
        }
        
        return textResult;
    }    

    guessScalesByTones(rawToneNames){
        let tones = this.parseTones(rawToneNames);

        let dists = new Array();
        for(let i=0; i < tones.length; i++){
            dists.push(this.DB.tones.indexOf(tones[i]));
        }
        
        return dists.join();
    } 
    // @chordName
    findChordByName(chordName) {
        return this.DB.chords.find(chord => this.isMatchingChordName(chord, chordName));
    }

    // @scaleName
    findScaleByName(scaleName) {
        return this.DB.scales.find(scale => scale.name === scaleName);
    }

    // @harmonicaName
    findHarmonicaByName(harmonicaName) {
        return this.DB.harmonicas.find(harmonica => harmonica.name === harmonicaName);
    }

    // @chord
    // @chordName
    isMatchingChordName(chord, chordName) {
        return chord.name === chordName;
    }        

    // @toneName
    findToneByName(toneName) {
        return this.DB.tones.find(tone => ChordGen.isMatchingToneName(tone, toneName));
    }

    // @tuningName
    findTuningByName(tuningName) {
        return this.DB.tunings.find(tuning => ChordGen.isMatchingToneName(tuning, tuningName));
    }

    // @tone
    // @toneName
    static isMatchingToneName(tone, toneName) {
        return tone.name === toneName;
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

// if(this != undefined){
//     this.register(ChordGen);
// }

// this.setBean("a", new ChordGen(this));
function createCho(t){
    console.debug(t);
    let chg  = new ChordGen(this);
    chg.DB = this.DB;
    return chg;
}
