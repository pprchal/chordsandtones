// Pavel Prchal 2019,209
// -------------------- MCore

import {DB} from "./leaflet.mjs"

export class MCore {
    static clone(src) {
        let obj = {...src};
        return obj;
    }

    static toneAsHtml(tone, showOctave){
        // D♯
        let toneName = tone.name.replace('#', '♯');
        if(showOctave == undefined || showOctave === false){
            return toneName;
        }

        return `${toneName}<sub>${tone.octave}</sub>`;
    }

    // @chordTemplate
    // @rootTone
    static generateChordTableForTone(chordTemplate, rootTone, cb) {
        let chord = MCore.clone(chordTemplate);
        chord.rootTone = MCore.clone(rootTone);
        chord.tones = Array(chord.distances.length);
        chord.distances
            .reduce((idx, distance, n) => 
                {
                    idx += distance;
                    chord.tones[n] = MCore.shiftTone(rootTone, idx);
                    if(cb != undefined){
                        cb.call(this, idx, chord.tones[n]);
                    }

                    return idx;
                }, 
                chord.distances[0]
            );  

        return chord; 
    }  

    // @rootTone
    // @scale
    static generateScaleTablesForTone(rootTone, scale) {
        return scale
            .distances
            .map((scaleDistance) => MCore.generateScaleTableForDistance(rootTone, scaleDistance));
    }      
    
    // transform [0, 2, 3] => [0, 2, 5]
    static fromRelative(relatives){
        let absolutes = Array(relatives.length);
        relatives.reduce((abs, rel, n) => absolutes[n] = abs + rel, relatives[0])
        return absolutes;
    }

    // @rootTone
    // @distances[]
    static generateScaleTableForDistance(rootTone, distances, tc){
        let tones = Array(distances.length);
        distances
            .reduce((idx, distance, n) => 
                {
                    idx += distance;
                    tones[n] = MCore.shiftTone(rootTone, idx);
                    if(tc != null){
                        tc.call(this, idx, tones[n]);
                    }
                    return idx;
                }, 
                distances[0]
            );
        return tones;

        // return distances
        //     .reduce((tones, distance, n) => 
        //         {
        //             if(n === 0) {
        //                 tones[n] = MCore.clone(rootTone)
        //             }else{
        //                 tones[n] = this.shiftTone(tones[n - 1], distance);
        //             }
        //             if(tc != null){
        //                 tc.call(this, n, tones[n]);
        //             }
        //             return tones;
        //         }, 
        //         Array(distances.length)
        //     );
    }

    static findCharChords(rootTone){
        let chordRootTone = MCore.tone(rootTone);
        let res2 = "";

        for(let i=0; i < DB.qround.length; i++){
            let qr = DB.qround[i];
            if(qr.chord === ""){
                continue;
            }

            let t = MCore.shiftTone(chordRootTone, qr.n);
            res2 += `${qr.name} - ${t.name}${qr.chord}\n`;
        }

        return res2;
    }

    // @chord
    // @distance
    static isMatchingChordDistance(chord, distance){
        return chord.distances.every((dist, n) => dist === distance[n]);
    }

    static shiftTone(rootTone, distance){
        let n = MCore.indexOfTone(rootTone) + distance;
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

        let clonedTone = MCore.clone(DB.tones[n]);
        clonedTone.octave = octave;
        return clonedTone;
    }

    static indexOfTone(tone){
        return DB.tones.findIndex((t) => MCore.isToneEqual(t, tone));
    }

    static isToneEqual(tone1, tone2) {
        return tone1.name === tone2.name;
    }  

    // =================================  FIND 
    // @chordName
    static chord(chordName) {
        return DB.chords.find(chord => MCore.isMatchingChordName(chord, chordName));
    }

    // @scaleName
    static scale(scaleName) {
        return DB.scales.find(scale => MCore.isMatchingScaleName(scale, scaleName));
    }

    // @toneName
    static tone(toneName, octave) {
        let tone = MCore.clone(DB.tones.find(tone => MCore.isMatchingToneName(tone, toneName)));
        if(octave != undefined){
            tone.octave = octave;
        }
        return tone;
    }

    static toneFreq(toneName, octave){
        let tone = MCore.tone(toneName, octave);
        let n = MCore.indexOfTone(tone);
        return DB.tunings[0].frequencies[n + (tone.octave * 12)];        
    }

    // @guitarName
    static guitar(guitarName) {
        return MCore.clone(DB.guitars.find(guitar => MCore.isMatchingGuitarName(guitar, guitarName)));
    }

    // @tuningName
    static tuning(tuningName) {
        return DB.tunings.find(tuning => MCore.isMatchingTuningName(tuning, tuningName));
    }
    
    // @harmonicaName
    static harmonica(harmonicaName, key) {
        let harp = DB.harmonicas.find(harmonica => MCore.isMatchingHarmonicaName(harmonica, harmonicaName));
        harp.octave = harp.octaves[key];
        if(harp.octave == undefined){
            console.error("TODO: harp key is not defined");
            harp.octave = 4;
        }
        return harp;
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
    static findInterval(distance) {
        for (let i=0; i<DB.intervals.length; i++){
            if(DB.intervals[i].distance == distance){
                return DB.intervals[i];
            }
        }

        return DB.intervals[0];
    }

    static guitarRootStrings(guitarName){
        // [E] ->
        // [A] ->
        // [D] ->
        // [G] ->
        // [H] ->
        // [E] ->
        let guitar = MCore.guitar(guitarName);
        return guitar
            .template
            .offsets
            .reduce((tones, offset, n) => 
                {
                    if(n === 0) {
                        tones[n] = MCore.guitarRootTone(guitar);
                    }else{
                        tones[n] = MCore.shiftTone(tones[n - 1], offset);
                    }
                    return tones;
                },
                Array(guitar.template.offsets.length)
            );
    }

    static guitarRootTone(guitar){
        let tone = MCore.clone(DB.tones[guitar.template.offsets[0]]);
        tone.octave = guitar.octave;
        return tone;
    }

    static unwindGuitarString(tone, frets){
        // [**E**] [F] [F#] [G], ...
        return Array.from(Array(frets), (x, fret) => MCore.shiftTone(tone, fret));
    }

    static generateGuitarFretboard(tuning, frets){
        let rootStrings = MCore.guitarRootStrings(tuning);
        return rootStrings.map((rootNote) => MCore.unwindGuitarString(rootNote, frets));
    }
}
