// Pavel Prchal 2019

// -------------------- DCore
// --------------------
class DBCore {
    // @chordName
    findChordByName(chordName) {
        for(let i = 0; i < DB.chords.length; i++) {
            if(this.isMatchingChordName(DB.chords[i], chordName)) {
                return DB.chords[i];
            }
        }

        return null;
    }

    // @scaleName
    findScaleByName(scaleName) {
        for(let i = 0; i < DB.scales.length; i++) {
            if(DB.scales[i].name == scaleName) {
                return DB.scales[i];
            }
        }

        return null;
    }

    // @harmonicaName
    findHarmonicaByName(harmonicaName) {
        for(let i = 0; i < DB.harmonicas.length; i++) {
            if(DB.harmonicas[i].name == harmonicaName) {
                return DB.harmonicas[i];
            }
        }

        return null;
    }

    // @chord
    // @chordName
    isMatchingChordName(chord, chordName) {
        return chord.name === chordName;
    }        

    // @toneName
    findToneByName(toneName) {
        for(let i = 0; i < DB.tones.length; i++) {
            if(DBCore.isMatchingToneName(DB.tones[i], toneName)) {
                return DB.tones[i];
            }
        }

        return null;            
    }

    // getMaxChordsToneCount() {
    //     return Math.max.apply(Math, DB.chords.map(function(ch) { return ch.distances.length; }))
    // }

    // @tuningName
    findTuningByName(tuningName) {
        for(let i = 0; i < DB.tunings.length; i++) {
            if(DBCore.isMatchingToneName(DB.tunings[i], tuningName)) {
                return DB.tunings[i];
            }
        }

        return null;            
    }

    // @tone
    // @toneName
    static isMatchingToneName(tone, toneName) {
        return tone.name == toneName;
    }     

    static isToneEqual(tone1, tone2) {
        return tone1.name == tone2.name;
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
