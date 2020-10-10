// Pavel Prchal 2019

// -------------------- Sound
// --------------------
class SoundControl  extends BaseControl{ 
    constructor(controlId){
        super(controlId);
        this.ChordGen = new ChordGen();
        this.Tuning = this.ChordGen.findTuningByName('equal-tempered');
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
        let rootNote = this.ChordGen.findToneByName(rootNoteName);
        let chordType = this.ChordGen.findChordByName(chordTypeName);

        let chord = this.ChordGen.generateChordTableForTone(chordType, rootNote);
        for(let tone of chord.tones){
            this.playNote(this.getFrequency(tone, this.Tuning), 200);
        };
    }

    getFrequency(tone, tuning){
        let index = DB.tones.indexOf(tone) + (DB.tones.length * (tone.octave + 3));
        return tuning.frequencies[index];
    }
    
    playToneWithOctave(toneName, toneOctave, tuningName){
        let index = DB.tones.indexOf(this.ChordGen.findToneByName(toneName)) + (DB.tones.length * (toneOctave + 3));
        let freq = this.ChordGen.findTuningByName(tuningName).frequencies[index];
        this.playNote(freq, 300);
        return index;
    }
}
