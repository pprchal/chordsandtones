// Pavel Prchal 2019

// -------------------- Sound
// --------------------
class SoundControl extends BaseControl{ 
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
        let rootNote = this.Core.findToneByName(rootNoteName);
        let chordType = this.Core.findChordByName(chordTypeName);

        let chord = this.Core.generateChordTableForTone(chordType, rootNote);
        for(let tone of chord.tones){
            this.playNote(this.getFrequency(tone, this.Tuning), 200);
        };
    }

    getFrequency(tone, tuning){
        let index = DB.tones.indexOf(tone) + (DB.tones.length * (tone.octave + 3));
        return tuning.frequencies[index];
    }
    
    playToneWithOctave(toneName, toneOctave, tuningName, duration){
        let index = DB.tones.indexOf(this.Core.findToneByName(toneName)) + (DB.tones.length * toneOctave);
        let freq = this.Core.findTuningByName(tuningName).frequencies[index];
        this.playNote(freq, duration);
        return index;
    }
}
