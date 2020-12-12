// Pavel Prchal  2020

import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./base_control.mjs"
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

        try{
            $(`#${this.TableId}`).DataTable( { searching: false, paging: false, info: false } );
        }
        catch{
            // ignore bootstrap
        }
        
        this.ScaleRows.forEach(sr =>
        {
            let fn = (n) => this.shiftScale(sr, n);

            document.getElementById(sr.M).addEventListener("click", () => fn(1));
            document.getElementById(sr.P).addEventListener("click", () => fn(-1));
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
            this.renderScaleShiftButton(-1, scaleRow.M) + this.renderScaleShiftButton(1, scaleRow.P),
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

    renderScaleShiftButton(direction, id){
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
    }

    printHeader(){
        return '<thead><tr><td>&nbsp;</td><td>&nbsp;</td>' + 
            DB.tones.reduce((html, tone) => html + `<th>${(MCore.toneAsHtml(tone))}</th>`, '') +
            '<td>váha</td>' + 
        '</tr></thead>';
    }
}
