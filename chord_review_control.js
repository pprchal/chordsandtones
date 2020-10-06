// Pavel Prchal  2020
// -------------------- ChordReviewControl
// --------------------
class ChordReviewControl extends BaseControl{
    constructor() {
        super();
        this.ChordToneId = 1;
        this.ctx = new Context();
        this.ctx.Tuning = this.DBC.findTuningByName('equal-tempered');
    }

    printChordsReview(){
        let html = '<table class="table table-hover">' + this.printTonesHeader();

        for (let i=0; i<DB.chords.length; i++){
            html += this.printChordReviewRow(DB.chords[i]);
        }
        return html + '</table>';
    }

    printChordReviewRow(chord){
        let html = `<tr><td><b>${chord.name}<b></td>`;
        let arr = this.prepareArrByTones();

        for(let i = 0; i<arr.length; i++){
            if(i < chord.distances.length){
                arr[chord.distances[i]] = chord.distances[i];
            }
        }

        for(let j = 0; j<arr.length; j++){
            html += `<td>${arr[j]}</td>`;
        }

        return html + '</tr>';
    }

    prepareArrByTones() {
        let arr = [];
        for(let i = 0; i<DB.tones.length * 2; i++){
            arr[i] = '&nbsp;';
        }
 
        return arr;
    }

    printTonesHeader(){
        let html = '<tr><td>&nbsp;</td>';
        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
        }

        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${this.formatHtmlTone(DB.tones[i])}</th>`;
        }
        return html + '</tr>';
    }
}
