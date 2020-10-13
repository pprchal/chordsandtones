// Pavel Prchal  2020
// -------------------- ScaleReviewControl
// --------------------
class ScaleReviewControl extends BaseControl{
    constructor(controlId) {
        super(controlId);
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
            tones: [],
            ids: []
        };
        this.ScalesMap.push(scaleMap);


        let arr = this.prepareArrByTones();
        let scaleDistance = scale.distances[0];

        for(let i = 0; i<arr.length; i++){
            if(i < scaleDistance.length){
                let tone = DB.tones[scaleDistance[i]];
                arr[scaleDistance[i]] = tone.name;
                scaleMap.tones.push(tone);
            }
            else{
                this.debug('???');
            }
        }

        let n = this.ScalesMap.length-1;
        arr = [`${(this.shiftButton('-', n))}${(this.shiftButton('+', n))}`, ...arr]
        return `<tr><td>${scale.name}</td>` + 
            arr.reduce((a, x) =>  a + this.createToneControl(x, scaleMap), "") +
            "</tr>";
    }

    createToneControl(x, scaleMap){
        let ctid = this.getControlId("tn");
        scaleMap.ids.push(ctid);
        return `<td id="${ctid}">${x}</td>`;
    }

    prepareArrByTones() {
        let arr = [];
        for(let i = 0; i<DB.tones.length; i++){
            arr[i] = '&nbsp;';
        }
        return arr;
    }

    shiftButton(direction, n){
        return `<a id="btShiftScale_${this.ControlId}" class="btn btn-primary btn-block btn-small" href="javascript:none" onclick="shiftScale('${direction}', this, ${n}); return false;" role="button">${direction}</a>`;   
    }

    shiftScale(direction, n){
        let dir = direction === "+" ? 1 : -1;
        let scale = this.ScalesMap[n];

        for(let i=0; i<scale.tones.length; i++){
            scale.tones[i] = this.ChordGen.shiftTone(scale.tones[i], dir);
            document.getElementById(scale.ids[i]).innerText = scale.tones[i].name;
        }
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
