// Pavel Prchal 2019, 2020

// -------------------- SoundControl
// --------------------
import {BaseControl} from "../core/shared.mjs"
import {DB} from "../core/leaflet.mjs"

export class SoundControl extends BaseControl{ 
    constructor(controlId){
        super(controlId);
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
        let rootTone = this.Core.tone(rootNoteName);
        let chordType = this.Core.chord(chordTypeName);

        let chord = this.Core.generateChordTableForTone(chordType, rootTone);
        for(let tone of chord.tones){
            this.playNote(this.getFrequency(tone, this.Tuning), 200);
        };
    }

    getFrequency(tone, tuning){
        let index = DB.tones.indexOf(tone) + (DB.tones.length * (tone.octave + 3));
        return tuning.frequencies[index];
    }
    
    playToneWithOctave(toneName, toneOctave, tuningName, duration){
        console.debug('play....');
        // let index = DB.tones.indexOf(this.Core.tone(toneName)) + (DB.tones.length * toneOctave);
        // let freq = this.Core.tuning(tuningName).frequencies[index];
        // this.playNote(freq, duration);
        // return index;
    }
}
