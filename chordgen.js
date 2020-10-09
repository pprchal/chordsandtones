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
    constructor(){
        this.DBC = new DBCore();
    }

    // @chordTemplate
    // @rootTone
    generateChordTableForTone(chordTemplate, rootTone) {
        let chord = clone(chordTemplate);

        chord.tones = new Array();
        let rootIndex = DB.tones.indexOf(rootTone);

        for (let i = 0; i < chord.distances.length; i++) {
            let toneIndex = chord.distances[i] + rootIndex;
            let octave = 0;
            while(toneIndex >= DB.tones.length) {
                octave++;
                toneIndex = toneIndex - DB.tones.length;
            }

            let chordTone = clone(DB.tones[toneIndex]);
            chordTone.octave = octave;
            chord.tones.push(chordTone);
        }

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
        let rootIndex = DB.tones.indexOf(rootTone);            

        for (let i = 0; i < distances.length; i++) {
            let n = distances[i] + rootIndex;
            let octave = 0;
            while(n >= DB.tones.length) {
                octave++;
                n = n - DB.tones.length;
            }

            let scaleTone = clone(DB.tones[n]);
            scaleTone.octave = octave;
            scaleTones.push(scaleTone);
        }

        return scaleTones;
    }

    parseTones(rawToneNames){
        let tones = new Array();
        let split = rawToneNames.split(" ");

        for(let i = 0; i < split.length; i++){
            let tone = this.DBC.findToneByName(split[i]);
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
        for(let j =0; j<DB.chords.length; j++){
            if(this.isMatchingChordDistance(DB.chords[j], distances)){
                possibleChords.push(DB.chords[j]);
            }
        }
        return possibleChords;
    }

    distanceBetween(toneA, toneB){
        if(toneA.name == toneB.name){
            return 0;
        }

        let i = DB.tones.indexOf(toneA);
        let dist = 0;

        do{
            i++;
            if(i >= DB.tones.length){
                i = 0;
            }
            dist++;

        }while(!DBCore.isMatchingToneName(DB.tones[i], toneB.name));

        return dist;
    }

    plusTone(rootTone, halfToneOffset){
        let n = DB.tones.indexOf(rootTone) + halfToneOffset;
        let octave = 0;

        if(n >= DB.tones.length) {
            octave++;
            n = n - DB.tones.length;
        }

        let clonedTone = clone(DB.tones[n]);
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
            dists.push(DB.tones.indexOf(tones[i]));
        }
        
        return dists.join();
    } 
}

