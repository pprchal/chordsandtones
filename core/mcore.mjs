// Pavel Prchal 2019,209
// -------------------- MCore

import {DB} from "./leaflet.mjs"

export class MCore {
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
        chord.rootTone = this.clone(rootTone);
        chord.tones = chord.distances.map((distance) => this.shiftTone(chord.rootTone, distance));
        return chord;
    }  

    // @rootTone
    // @scale
    generateScaleTablesForTone(rootTone, scale) {
        return scale
            .distances
            .map((scaleDistance) => this.generateScaleTableForDistance(rootTone, scaleDistance));
    }          

    // @rootTone
    // @distances[]
    generateScaleTableForDistance(rootTone, distances){
        return distances
            .reduce((tones, distance, n) => {
                if(n == 0) {
                    return tones;
                }else{
                    return [...tones, this.shiftTone(tones[n - 1], distance)];
                }
            }, [this.clone(rootTone)]);
    }

    findCharChords(rootTone){
        let chordRootTone = this.tone(rootTone);
        let res2 = "";

        for(let i=0; i < DB.qround.length; i++){
            let qr = DB.qround[i];
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
        return chord.distances.every((dist, n) => dist === distance[n]);
    }

    shiftTone(rootTone, distance){
        let n = this.indexOfTone(rootTone) + distance;
        let octave = rootTone.octave;

        while( (n < 0) || (n >= DB.tones.length) ) {
            if(n >= DB.tones.length) {
                octave++;
                n -= DB.tones.length;
            }else if(n < 0){
                octave--;
                n += DB.tones.length;
            }
        }

        let clonedTone = this.clone(DB.tones[n]);
        clonedTone.octave = octave;
        return clonedTone;
    }

    indexOfTone(tone){
        return DB.tones.findIndex((t) => MCore.isToneEqual(t, tone));
    }

    static isToneEqual(tone1, tone2) {
        return tone1.name === tone2.name;
    }  

    // =================================  FIND 
    // @chordName
    chord(chordName) {
        return DB.chords.find(chord => MCore.isMatchingChordName(chord, chordName));
    }

    // @scaleName
    scale(scaleName) {
        return DB.scales.find(scale => MCore.isMatchingScaleName(scale, scaleName));
    }

    // @toneName
    tone(toneName, octave) {
        let tone = this.clone(DB.tones.find(tone => MCore.isMatchingToneName(tone, toneName)));
        if(octave != undefined){
            tone.octave = octave;
        }
        return tone;
    }

    // @guitarName
    guitar(guitarName) {
        return this.clone(DB.guitars.find(guitar => MCore.isMatchingGuitarName(guitar, guitarName)));
    }

    // @tuningName
    tuning(tuningName) {
        return DB.tunings.find(tuning => MCore.isMatchingTuningName(tuning, tuningName));
    }
    
    // @harmonicaName
    harmonica(harmonicaName) {
        return DB.harmonicas.find(harmonica => MCore.isMatchingHarmonicaName(harmonica, harmonicaName));
    }

    // @guitar
    // @guitarName
    static isMatchingGuitarName(guitar, guitarName) {
        return guitar.name === guitarName;
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

    
    // @distance
    findInterval(distance) {
        for (let i=0; i<DB.intervals.length; i++){
            if(DB.intervals[i].distance == distance){
                return DB.intervals[i];
            }
        }

        return DB.intervals[0];
    }

    guitarRootStrings(guitarName){
        let guitar = this.guitar(guitarName);
        return guitar
            .template
            .offsets
            .reduce((tones, offset, n) => {
                if(n == 0) {
                    return tones;
                }else{
                    return [...tones, this.shiftTone(tones[n - 1], offset)];
                }
            }, [this.guitarRootTone(guitar)]);
    }

    guitarRootTone(guitar){
        let tone = this.clone(DB.tones[guitar.template.offsets[0]]);
        tone.octave = guitar.octave;
        return tone;
    }

    unwindGuitarString(tone, frets){
        return Array.from(Array(frets), (x, fret) => this.shiftTone(tone, fret));
    }
}
