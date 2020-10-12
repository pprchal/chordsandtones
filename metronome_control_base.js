// Pavel Prchal 2020
// -------------------- MetronomeControl
// --------------------
class MetronomeControlBase extends BaseControl{
    constructor(controlId, metroA, metroB, bpm) {
        super(controlId);
        this.A = metroA;
        this.B = metroB;
        this.idxB = 0;
        this.running = false;
        this.bpm = parseInt(bpm);
        this.controlsA = [];
        this.controlsB = [];
        this.CtID = 0;
    }


    render() {
        this.setHtml(this.r());
    }  

    start(){
        let stepA = (60 / this.bpm) * 1000;
        this.tstepB = stepA / this.B;
        window.console.debug(`BPM(${this.bpm}) - ${this.tstepB}ms `);

        this.threadId = setInterval(this.beat, this.tstepB, this);
    }

    beat(th)
    {
        let t = P_METRONOME;

        let idxA = Math.floor(t.idxB / t.B);

        let ctrB = document.getElementById(t.controlsB[t.idxB]); 
        // ctrA.style["background-color"] = "red";
        ctrB.innerText = t.idxB + ' - ' + new Date().getMilliseconds();

        let ctrA = document.getElementById(t.controlsA[idxA]); 
        ctrA.innerText = (idxA + 1);

        t.idxB++;
        if(t.idxB >= (t.A*t.B)){
            t.idxB = 0;
        }




        // let ctrB = document.getElementById(t.controlsB[t.idxB]); 
        // //ctrB.style["background-color"] = "red";
        // ctrB.innerText = new Date().getSeconds();
    }

    stop(){
        window.clearInterval(this.threadId);
    }
    
    toggleStartStop(){
        this.running = !this.running;
        if(!this.running){
            this.stop();
        }
        else{
            this.start();
        }
        return this.running;
    }


    update(metroA, metroB, bpm){
        this.A = parseInt(metroA);
        this.B = parseInt(metroB);
        this.bpm = parseInt(bpm);
        this.debug(`Updating to: ${metroA}/${metroB} bpm: ${bpm}`);
        this.setHtml(this.r());
    }

    r(){
        return `<table class="metroTable">` +
        `<tr>${this.renderARow()}</tr>` +
        this.renderBRow() +
        "</table>";
    }

    renderARow(){
        let row = "<tr>";

        for(let a=0; a<this.A; a++){
            let ctId_A = this.getControlId();
            this.controlsA.push(ctId_A);
            row += `<td id="${ctId_A}" style="">${(a + 1)}</td>`;
        }

        return row + "</tr>";
    }

    renderBRow(){
        let row = "<tr>";
        for(let a=0; a<this.A; a++){
            let mini = this.renderSubB();
            row += `<td>${mini}</td>`;
        }
        return row + "</tr>";
    }

    renderSubB(){
        let html = `<table><tr>`;


        for(let b=0; b<this.B; b++){
            let ctId_B = `B_ctl_${this.getControlId()}`;
            this.controlsB.push(ctId_B);
            html += `<td id="${ctId_B}">${this.B}</td>`;
        }
        return html + "</tr></table>";
    }

    getControlId(){
        this.CtID++;
        return `mct_${this.CtID}`;
    }
}
