// Pavel Prchal 2019

// -------------------- DCore
// --------------------
class DBCore {
    // @chordName
    findChordByName(chordName) {
        return DB.chords.find(chord => this.isMatchingChordName(chord, chordName));
    }

    // @scaleName
    findScaleByName(scaleName) {
        return DB.scales.find(scale => scale.name === scaleName);
    }

    // @harmonicaName
    findHarmonicaByName(harmonicaName) {
        return DB.harmonicas.find(harmonica => harmonica.name === harmonicaName);
    }

    // @chord
    // @chordName
    isMatchingChordName(chord, chordName) {
        return chord.name === chordName;
    }        

    // @toneName
    findToneByName(toneName) {
        return DB.tones.find(tone => DBCore.isMatchingToneName(tone, toneName));
    }

    // @tuningName
    findTuningByName(tuningName) {
        return DB.tunings.find(tuning => DBCore.isMatchingToneName(tuning, tuningName));
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
        for (let i=0; i<DB.intervals.length; i++){
            if(DB.intervals[i].distance == distance){
                return DB.intervals[i];
            }
        }

        return DB.intervals[0];
    }
}
