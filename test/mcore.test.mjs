// Pavel Prchal, 2020
import { strictEqual } from "assert"
import { MCore } from "../core/mcore.mjs"
import { DB } from "../core/leaflet.mjs"
let mcore = new MCore();

describe('Music math', () => {
    it('chord F#dur', () => {
        let Fisdur = mcore.generateChordTableForTone(mcore.chord('dur'), mcore.tone('F#'));
        strictEqual("F#", Fisdur.tones[0].name);
        strictEqual("B", Fisdur.tones[1].name);
        strictEqual("C#", Fisdur.tones[2].name);
    });

    it('C3 -> C3', () => {
        let C3 = mcore.tone("C");
        let C4 = mcore.shiftTone(C3, 12);
        strictEqual("C", C4.name);
        strictEqual(C3.octave + 1, C4.octave);
    });
    
    it('E -> H (guitar)', () => {
        let E = DB.tones[4];
        let H = mcore.shiftTone(E, 19);
        strictEqual("H", H.name);
        strictEqual(E.octave + 1, H.octave);
    });
    

    it('C <- H', () => {
        let C = mcore.tone("C");
        let H = mcore.shiftTone(C, -1);
        strictEqual("H", H.name);
        strictEqual(C.octave - 1, H.octave);
    });

    it('C <- C# (copied)', () => {
        let Cis = mcore.clone(mcore.tone("C#"));
        let C = mcore.shiftTone(Cis, -1);
        strictEqual("C", C.name);
    });

    it('generate scale', () => {
        let Cdur = mcore.generateScaleTablesForTone(
            mcore.tone("C"), 
            mcore.scale("dur"))[0]
        .reduce((tones, tone) => tones + tone.name, "");
        strictEqual("CDEFGAH", Cdur);
    });

    it('strat fretboard', () => {
        let fretboard = debugPrint("EADGHE", 22);
        strictEqual("E5 F5 F#5 G5 G#5 A5 B5 H5 C6 C#6 D6 D#6 E6 F6 F#6 G6 G#6 A6 B6 H6 C7 C#7 ", fretboard[5]);
        strictEqual("H4 C5 C#5 D5 D#5 E5 F5 F#5 G5 G#5 A5 B5 H5 C6 C#6 D6 D#6 E6 F6 F#6 G6 G#6 ", fretboard[4]);
        strictEqual("G4 G#4 A4 B4 H4 C5 C#5 D5 D#5 E5 F5 F#5 G5 G#5 A5 B5 H5 C6 C#6 D6 D#6 E6 ", fretboard[3]);
        strictEqual("D4 D#4 E4 F4 F#4 G4 G#4 A4 B4 H4 C5 C#5 D5 D#5 E5 F5 F#5 G5 G#5 A5 B5 H5 ", fretboard[2]);
        strictEqual("A3 B3 H3 C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4 A4 B4 H4 C5 C#5 D5 D#5 E5 F5 F#5 ", fretboard[1]);
        strictEqual("E3 F3 F#3 G3 G#3 A3 B3 H3 C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4 A4 B4 H4 C5 C#5 ", fretboard[0]);
    });

    it('guitar tuning EADGHE', () => {
        checkGuitarTuning("EADGHE");
    });

    it('guitar tuning DADGHE', () => {
        checkGuitarTuning("DADGHE");
    });

    function debugPrint(tuning, frets){
        let rootStrings = mcore.guitarRootStrings(tuning);
        let results = rootStrings.map((rootNote) => {
            let semitonesOnString = mcore.unwindGuitarString(rootNote, frets);    
            return semitonesOnString.reduce((s, tone) => s += `${tone.name}${tone.octave} `, '')
        });
        return results;
    }

    function checkGuitarTuning(name){
        let rootStrings = mcore.guitarRootStrings(name);
        let gts = rootStrings.reduce((s, t) => s += t.name, "");
        strictEqual(name, gts);
    }

    it('all scales', () => {
        scaleIs("C", "dur", "C3 D3 E3 F3 G3 A3 H3 ");
        scaleIs("D", "mol", "D3 E3 F3 G3 A3 B3 C4 ");
        scaleIs("E", "penta-mol", "E3 G3 A3 H3 D4 ");
        scaleIs("F#", "penta-dur", "F#3 G#3 B3 C#4 D#4 ");
        scaleIs("G", "lydic", "G3 A3 H3 C#4 D4 E4 F#4 ");
        scaleIs("G", "locrian", "G3 G#3 B3 C4 C#4 D#4 F4 ");
        scaleIs("G", "dorian", "G3 A3 B3 C4 D4 E4 F4 ");
        scaleIs("G#", "mixolydic", "G#3 B3 C4 C#4 D#4 F4 F#4 ");
        scaleIs("G#", "hexa-blues", "G#3 H3 C#4 D4 D#4 F#4 ");
    });

    function scaleIs(rootNote, scaleName, is){
        let scale = mcore.generateScaleTablesForTone(mcore.tone(rootNote), mcore.scale(scaleName))[0];
        strictEqual(is, scale.reduce((acc, t) => acc += `${t.name}${t.octave} `, ''), `Scale ${rootNote}${scaleName} is wrong`);
    }

    it('allindex of D#', () => {
        let Dis = mcore.tone("D#");
        strictEqual(3, mcore.indexOfTone(Dis));
    });
});

