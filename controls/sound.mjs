// Pavel Prchal 2019, 2020

// -------------------- SoundControl
// --------------------
import {BaseControl} from "./control.mjs"
import {MCore} from "../core/mcore.mjs"

export class SoundControl extends BaseControl { 
    constructor(){
        this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    }
    
    playNote(frequency, duration) {
        let oscillator = this.audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency; 
        oscillator.connect(this.audioCtx.destination);
        oscillator.start();

        setTimeout(
            function() { oscillator.stop(); }, 
            duration
        );
    }

    playChord(rootNoteName, chordTypeName){
        let rootTone = MCore.tone(rootNoteName);
        let chordType = MCore.chord(chordTypeName);

        let chord = MCore.generateChordTableForTone(chordType, rootTone);
        for(let tone of chord.tones){
            this.playNote(this.getFrequency(tone, this.Tuning), 200);
        };
    }

    getFrequency(tone, tuning){
        let index = DB.tones.indexOf(tone) + (DB.tones.length * (tone.octave + 3));
        return tuning.frequencies[index];
    }
    
    // C, 3, 
    playToneWithOctave(tone, octave, tuningName, duration){
        if(duration == undefined){
            duration = 200;
        }
        let freq = MCore.toneFreq(tone, octave);
        this.playNote(freq, duration);
    }
}
