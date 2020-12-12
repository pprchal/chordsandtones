// Pavel Prchal 2020
// -------------------- MetronomeControl
// --------------------
import {BaseControl} from "./base_control.mjs"

//
export class MetronomeControlBase extends BaseControl{
    constructor(controlId, sound) {
        super(controlId);
        this.Sound = sound;
    }

    render() {
        if(this.A == undefined) {
            return;
        }

        this.setHtml(this.r());
    }  

    start(){
        this.threadId = setInterval(this.beat, this.tstepB, this);
    }

    isRunning(){
        return this.threadId != undefined;
    }

    getSelectedValue(id){
        return document.getElementById(id).selectedOptions[0].value;
    }       
    
    getSelectedValue2(id){
        return document.getElementById(id).value;
    } 
    
    setCssClass(control, cssClass, on) {
        let contains = control.classList.contains(cssClass);
    
        if (on) {
            if (!contains)
                control.classList.add(cssClass);
        }
        else {
            if (contains)
                control.classList.remove(cssClass);
        }
    }

    beat(metro)
    {
        let t = metro;
        let synco = Math.min(t.B, t.S);
        let idxA = Math.floor(t.idxB / synco);
        let x = t.idxB % synco;

        let ctrB = document.getElementById(t.controlsB[t.idxB]); 
        // setCssClass(ctrB, 'tickB', true);

        let ctrA = document.getElementById(t.controlsA[idxA]); 
        if(x === 0){
            ctrA.style["background-color"] = "red";
        }

        // idea: fire abstract events here to catch in rendereds (gl, svg,...)
        // window.console.debug(`A:${idxA}, B:${t.idxB}  =>  X:(${x})`);

        t.idxB++;
        if(t.idxB >= (t.A * t.S)){
            t.idxB = 0;
        }

        // prev B
        if(t.ctrBPrev != null){
            // setCssClass(t.ctrBPrev, 'tickB', false);
        }
        t.ctrBPrev = ctrB;

        // prev A
        if(t.ctrAPrev != null && x === 0){
            t.ctrAPrev.style["background-color"] = "";
        }
        t.ctrAPrev = ctrA;
    }

    stop(){
        window.clearInterval(this.threadId);
        this.threadId = undefined;
    }

    update(metroA, metroB, bpm, metroS){
        this.bpm = bpm;
        this.idxB = 0;

        let bigUpdate = false;
        if((this.A != metroA) || (this.B != metroB) || (this.S != metroS)) {
            // big update
            this.CtID = 0;
            this.controlsA = [];
            this.controlsB = [];
            bigUpdate = true;
        }

        this.A = metroA;
        this.B = metroB;
        this.S = metroS;
        let stepA = (60 / this.bpm) * 1000;
        this.tstepB = stepA / this.B;
        this.debug(`Updating to: ${metroA}/${metroB} bpm: ${bpm}`);
        window.console.debug(`BPM(${this.bpm}) - tick:${stepA}ms - synco-subtick:${this.tstepB}ms`);

        if(bigUpdate) {
            this.setHtml(this.r());
        }
    }

    r(){
        return `<table class="metroTable">` +
        `<tr>${this.renderARow()}</tr>` +
        `<tr>${this.renderBRow()}</tr>` +
        "</table>";
    }

    renderARow(){
        let row = "";

        for(let a=0; a<this.A; a++){
            let ctId_A = this.getControlId();
            this.controlsA.push(ctId_A);
            row += `<td id="${ctId_A}">${(a + 1)}.</td>`;
        }

        return row;
    }

    renderBRow(){
        let bRow = "";
        for(let a=0; a<this.A; a++){
            bRow += `<td>${this.renderSubB()}</td>`;
        }
        return bRow;
    }

    renderSubB(){
        if(this.S === 1){
            // default - no syncopation
            let ctId_B = `B_ctl_${this.getControlId()}`;
            this.controlsB.push(ctId_B);
            return `<div id="${ctId_B}">1/${this.B}</div>`;
        }

        // subdivide... (1/4), S(2) =>  2 * 1/8 
        let html = `<table><tr>`;
        for(let s=0; s<this.S; s++){
            let ctId_B = `B_ctl_${this.getControlId()}`;
            this.controlsB.push(ctId_B);
            let frac = `1/${(this.B * this.S)}<input type="checkbox" name="n1" value="">`;

            html += `<td id="${ctId_B}">${frac}</td>`;
        }
        return html + "</tr></table>";
    }
}
