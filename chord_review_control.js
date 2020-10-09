// Pavel Prchal  2020
// -------------------- ChordReviewControl
// --------------------
class ChordReviewControl extends BaseControl{
    constructor(tableId) {
        super();
        this.ChordToneId = 1;
        this.Tuning = this.DBC.findTuningByName('equal-tempered');
        this.TableId = tableId;
    }

    render(){
        return `<table id="${this.TableId}" class="table table-hover">` +
            this.printHeader() +
            this.renderRows() +
        "</table>";
    }

    renderRows(){
        return DB.chords.reduce((html, chord) => html + this.printChordRow(chord), "");
    }


    printChordRow(chord){
        let html = `<tr><td><b>${chord.name}<b></td>`;
        let arr = this.prepareArrByTones();

        for(let i = 0; i<arr.length; i++){
            if(i < chord.distances.length){
                arr[chord.distances[i]] = this.formatChordDistance(chord.distances[i]); // DB.tones[chord.distances[i]].name;
            }
        }

        for(let j = 0; j<arr.length; j++){
            html += `<td>${arr[j]}</td>`;
        }

        return html + '</tr>';
    }

    formatChordDistance(chordDistance){
        let dist = chordDistance;
        while(dist >= DB.tones.length)
        {
            dist -= DB.tones.length;
        }

        try{
            return DB.tones[dist].name;
        }
        catch(e){
            return "---";
        }
    }

    prepareArrByTones() {
        let arr = [];
        for(let i = 0; i<DB.tones.length * 2; i++){
            arr[i] = '&nbsp;';
        }
 
        return arr;
    }

    printHeader(){
        let html = '<thead><tr><td>&nbsp;</td>';
        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
        }

        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
        }
        return html + '</tr></thead>';
    }
}
