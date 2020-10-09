// Pavel Prchal  2020
// -------------------- ScaleReviewControl
// --------------------
class ScaleReviewControl extends BaseControl{
    constructor(tableId) {
        super();
        this.Tuning = this.DBC.findTuningByName('equal-tempered');
        this.TableId = tableId;
    }

    render(){
        let html = `<table id="${this.TableId}" class="table table-hover">`;
        html += this.printHeader();
        DB.scales.forEach((scale) => html += this.renderScale(scale));
        return html + "</table>";
    }

    renderScale(scale){
        let html = `<tr><td>${scale.name}</td>`;

        let arr = this.prepareArrByTones();
        let scaleDistance = scale.distances[0];

        for(let i = 0; i<arr.length; i++){
            if(i < scaleDistance.length){
                let tone = DB.tones[scaleDistance[i]];
                arr[scaleDistance[i]] = tone.name;
            }
            else{
                this.debug('???');
            }
        }

        for(let j = 0; j<arr.length; j++){
            html += `<td>${arr[j]}</td>`;
        }

        return html + '</tr>';
    }

    prepareArrByTones() {
        let arr = [];
        for(let i = 0; i<DB.tones.length; i++){
            arr[i] = '&nbsp;';
        }
        return arr;
    }

    printHeader(){
        let html = '<thead><tr><td>&nbsp;</td>';
        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${(i + 1)}</th>`;
        }
        return html + '</tr></thead>';
    }
}
