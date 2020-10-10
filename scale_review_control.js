// Pavel Prchal  2020
// -------------------- ScaleReviewControl
// --------------------
class ScaleReviewControl extends BaseControl{
    constructor(controlId) {
        super();
        this.Tuning = this.DBC.findTuningByName('equal-tempered');
        this.ControlId = controlId;
        this.ScalesMap = []
    }

    render(){
        this.setHtml(`<table id="${this.ControlId}" class="table table-hover">` +
            this.printHeader() +
            DB.scales.reduce((html, scale) => html + this.renderScale(scale), "") +
        "</table>");
    }

    renderScale(scale){
        let scaleMap = {
            name: scale.name,
            tones: []
        };
        this.ScalesMap.push(scaleMap);


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

        arr = [`${(this.button('-'))}${(this.button('+'))}`, ...arr]
        return `<tr><td>${scale.name}</td>` + 
            arr.reduce((a, x) =>  a + `<td>${x}</td>`, "") +
            "</tr>";
    }

    prepareArrByTones() {
        let arr = [];
        for(let i = 0; i<DB.tones.length; i++){
            arr[i] = '&nbsp;';
        }
        return arr;
    }

    button(direction){
        return `<a id="btShiftScale_${this.ControlId}" class="btn btn-primary btn-block" href="javascript:none" onclick="shiftScale('${direction}', this); return false;" role="button">${direction}</a>`;   
    }

    printHeader(){
        let html = '<thead><tr><td>&nbsp;</td>' +
            `<td>&nbsp;</td>`;

        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${(i + 1)}</th>`;
        }
        return html + '</tr></thead>';
    }
}
