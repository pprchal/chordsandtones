// Pavel Prchal  2020
// -------------------- ScaleReviewControl
// --------------------
import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ScaleReviewControl extends BaseControl{
    constructor(controlId, tableId) {
        super(controlId);
        this.ScaleRows = [];
        this.TableId = tableId;
    }

    render(){
        this.setHtml(`<table id="${this.TableId}" class="table table-hover">` +
            this.printHeader() +
            DB.scales.reduce((html, scale) => html + this.renderScale(scale), '') +
        '</table>');

        $(`#${this.TableId}`).DataTable( { searching: false, paging: false, info: false } );

        let i = 0;
        this.ScaleRows.forEach(sr =>
        {
            let fn = (n) =>
            {
                this.shiftScale(sr, n);
            }

            document.getElementById(sr.M).addEventListener("click", () => fn(1));
            document.getElementById(sr.P).addEventListener("click", () => fn(-1));
            i++;
        });
    }

    renderScale(scale){
        let distances = scale.distances[0];
        let rootTone = MCore.tone('C');
        let cols = Array.from(Array(DB.tones.length), () => '&nbsp;');
        let scaleWeight = 0;
        
        let scaleRow = {
            scaleName: scale.name,
            rootTone: rootTone,
            ids: []
        };
        this.ScaleRows.push(scaleRow);


        MCore.generateScaleTableForDistance(
            rootTone, 
            distances, 
            (n, tone) => 
            { 
                cols[n] = this.createToneControl(tone, scaleRow); 
                scaleWeight += n;
            }
        );

        // add column with shift buttons
        scaleRow.M = this.getControlId('btShiftScale_m');
        scaleRow.P = this.getControlId('btShiftScale_p');

        cols = [
            this.renderScaleButton(scale), 
            this.renderShiftButton(-1, scaleRow.M) + this.renderShiftButton(1, scaleRow.P),
            ...cols, 
            scaleWeight
        ];

        return '<tr>' + 
            cols.reduce((html, td) => html + `<td>${td}</td>`, '') +
        '</tr>';
    }

    renderScaleButton(scale){
        return scale.name;
    }

    createToneControl(tone, scaleRow){
        let ctid = this.getControlId('tn');
        scaleRow.ids.push(ctid);
        return `<div id="${ctid}">${MCore.toneAsHtml(tone)}</div>`;
    }

    renderShiftButton(direction, id){
        let dir = (direction > 0) ? '&gt;' : '&lt';
        let sb = `<a id="${id}"  href="javascript:none" role="button">${dir}</a>`;
        return sb;   
    }

    shiftScale(scaleRow, dir){
        for(let x of scaleRow.ids){
            let toneCtl = document.getElementById(x);
            let tone = MCore.shiftTone(MCore.tone(toneCtl.innerText), dir);
            toneCtl.innerText = tone.name;
        }
        // for(let i=0; i<scaleRow.tones.length; i++){
        //     let tone = scaleRow.tones[i];
        //     tone.octave = 4;
        //     let shiftedTone = MCore.shiftTone(tone, dir);
        //     scaleRow.tones[i] = shiftedTone;
        //     let control = document.getElementById(scaleRow.ids[i]);
        //     tone.octave = 4;
        
        //     control.innerText = shiftedTone.name;
        // }
    }

    printHeader(){
        return '<thead><tr><td>&nbsp;</td><td>&nbsp;</td>' + 
            DB.tones.reduce((html, tone) => html + `<th>${(MCore.toneAsHtml(tone))}</th>`, '') +
            '<td>váha</td>' + 
        '</tr></thead>';
    }
}
