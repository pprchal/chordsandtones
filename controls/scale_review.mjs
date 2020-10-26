// Pavel Prchal  2020
// -------------------- ScaleReviewControl
// --------------------
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ScaleReviewControl extends BaseControl{
    constructor(controlId, tableId) {
        super(controlId);
        this.ScaleRows = [];
        this.TableId = tableId;
    }

    render(){
        this.setHtml(`<table id="${this.ControlId}" class="table table-hover">` +
            this.printHeader() +
            DB.scales.reduce((html, scale) => html + this.renderScale(scale), "") +
        "</table>");
        $(`#${this.TableId}`).DataTable( { searching: false, paging: false, info: false } );
    }

    renderScale(scale){
        let scaleRow = {
            name: scale.name,
            tones: [],
            ids: []
        };
        this.ScaleRows.push(scaleRow);
        let scaleDistance = scale.distances[0];

        let arr = [];
        let j = 0;
        for(let i=0; i<DB.tones.length; i++){
            let k = scaleDistance[j];
            if(k == i){
                // render tone
                let tone = DB.tones[k];
                scaleRow.tones.push(this.Core.clone(tone));
                let toneControl = this.createToneControl(tone, scaleRow);
                arr.push(toneControl);
                if(j < scaleDistance.length){
                    j++;
                }
            }else{
                // empty space
                arr.push("&nbsp;");
            }
        }

        let n = this.ScaleRows.length-1;
        arr = [`${(this.shiftButton('&lt;', n))}&nbsp;&nbsp;${(this.shiftButton('&gt;', n))}`, ...arr]
        return "<tr>" +
            `<td>${scale.name}</td>` + 
            arr.reduce((html, x) =>  html + `<td>${x}</td>`, "") +
        "</tr>";
    }

    createToneControl(tone, scaleRow){
        let ctid = this.getControlId("tn");
        scaleRow.ids.push(ctid);
        return `<td id="${ctid}">${tone.name}</td>`;
    }

    prepareArrByTones() {
        let arr = [];
        for(let i = 0; i<DB.tones.length; i++){
            arr[i] = '&nbsp;';
        }
        return arr;
    }

    shiftButton(direction, n){
        return `<a id="btShiftScale_${this.ControlId}"  href="javascript:none" onclick="shiftScale('${direction}', this, ${n}); return false;" role="button">${direction}</a>`;   
    }

    shiftScale(direction, n){
        let dir = direction === "+" ? 1 : -1;
        let scaleRow = this.ScaleRows[n];

        for(let i=0; i<scaleRow.tones.length; i++){
            let tone = scaleRow.tones[i];
            tone.octave = 4;
            let shiftedTone = this.Core.shiftTone(tone, dir);
            scaleRow.tones[i] = shiftedTone;
            let control = document.getElementById(scaleRow.ids[i]);
            tone.octave = 4;
        
            control.innerText = shiftedTone.name;
        }
    }

    // function shiftScale(direction, sender, n){
    //     P_CONTAINER.SCALE_REVIEW.shiftScale(direction, n);
    // }

    printHeader(){
        let html = '<thead><tr><td>&nbsp;</td>' +
            `<td>&nbsp;</td>`;

        for (let i=0; i<DB.tones.length; i++){
            html += `<th>${(i + 1)}</th>`;
        }
        return html + '</tr></thead>';
    }
}
