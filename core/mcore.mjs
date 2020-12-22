// Pavel Prchal 2019,209

import {DB} from "./leaflet.mjs"

/**
 * Music core class. Provides all operations 
 * for music. Tones, chords, ...
 */
export class MCore {
    /**
     * Clone source object
     * @param src source object
     */
    static clone(src) {
        let obj = {...src};
        return obj;
    }

    /**
     * Format distance between notes(semitones)
     * @param {int} distance 
     */
    static distanceAsHtml(distance) {
        let octave = Math.trunc(distance / DB.intervals.length)
        let n = distance % DB.intervals.length 
        let name = DB.intervals[n].name

        if(octave > 0)
            return `${name}<sub>+${octave}</sub>`
        
        return name
    }  

    /**
     * Format tone as html fragment
     * @param {tone} tone - Tone from leaflet (@see mcore:MCore.tone)
     * @param {boolean} showOctave - show octave
     * @param {int} semitones - 0: C# will be rendered, -1 D##, 1: Db
     * @return {string} formatted tone i.e.: C#<sub>3</sub>
     */
    static toneAsHtml(tone, showOctave=false, semitones=0){
        // D + 2  =>   Ebb ♭ 𝄫 𝄳 𝄲
        // U+1D132	MUSICAL SYMBOL QUARTER TONE SHARP	𝄲
        // U+1D133	MUSICAL SYMBOL QUARTER TONE FLAT	𝄳
        // U+1D12B	MUSICAL SYMBOL DOUBLE FLAT	𝄫
        // &#9839; ♯        
        
        if(showOctave == undefined || showOctave === false){
            return tone.name.replace('#', '♯')
        }

        let n = 0
        if(semitones !== 0){
            do{
                tone = MCore.shiftTone(tone, semitones)
                n++
            }while(tone.name.endsWith('#'))

            if(semitones <= 0) {
                tone.name += n == 1 ? '♯' : '𝄪'
            }else {
                tone.name += n == 1 ? '♭' : '𝄫' 
            }
        }

        return `<span>${tone.name}<sub>${tone.octave}</sub></span>`;
    }

    /**
     * Generate tones for selected chord
     * @param {chord} chordTemplate - desired chord (@see mcore:MCore.chord)
     * @param {boolean} showOctave - show octave
     * @return {string} formatted tone i.e.: C#<sub>3</sub>
     */
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

    /**
     * Generate tones from scale (Cdur)
     * @param {tone} rootTone  root tone of scale (C)
     * @param {scale} scale type of scale (dur)
     * @param {int} n - for special multiple scales specifies index of template (melodic mol)
     * @returns array of tones
     */
    static generateScale(rootTone, scale, n=0) {
        return MCore.generateScalePart(rootTone, scale.distances[n])
    }      
    
    
    // @rootTone
    // @distances[]
    static generateScalePart(rootTone, distances, tc){
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
    }

    /**
     * Transform relative offsets to absolute [0, 2, 3] => [0, 2, 5]
     * @param relatives array of relative numbers 
     * @returns absolute numbers 
     */
    static fromRelative(relatives){
        let absolutes = Array(relatives.length);
        relatives.reduce((abs, rel, n) => absolutes[n] = abs + rel, relatives[0])
        return absolutes;
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

    /**
     * Shift tone by specified ammount of semitones.
     * handles octave overflow
     * @param {tone} tone 
     * @param {int} semitones can be: -1, 0, 1
     */
    static shiftTone(tone, semitones){
        let n = MCore.indexOfTone(tone) + semitones;
        let octave = tone.octave;

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
    static chord(name) {
        return DB.chords.find(chord => chord.name === name);
    }

    /**
     * Finds scale in leaflet by name
     * @param {string} name Name of scale
     * @returns scale
     */
    static scale(name) {
        return DB.scales.find(scale => scale.name === name);
    }

    // @toneName
    static tone(toneName, octave) {
        let tone = MCore.clone(DB.tones.find(tone => tone.name === toneName));
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
        return MCore.clone(DB.guitars.find(guitar => guitar.name === guitarName));
    }

    // @tuningName
    static tuning(tuningName) {
        return DB.tunings.find(tuning => tuning.name === tuningName);
    }
    
    // @harmonicaName
    static harmonica(harmonicaName, key) {
        let harp = DB.harmonicas.find(harmonica => harmonica.name === harmonicaName);
        harp.octave = harp.octaves[key];
        if(harp.octave == undefined){
            console.error("TODO: harp key is not defined");
            harp.octave = 4;
        }
        return harp;
    }
}
