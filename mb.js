// Pavel Prchal 2020
// -------------------- MetronomeControl
// --------------------
class MetronomeControlBase extends BaseControl{
    constructor(controlId, metroA, metroB, bpm) {
        super(controlId);
        this.A = metroA;
        this.B = metroB;
        this.idxA = 0;
        this.idxB = 0;
        this.running = false;
        this.bpm = parseInt(bpm);
        this.controlsA = [];
        this.controlsB = [];
        this.CtID = 0;
    }


    render() {
        this.update(this.A, this.B, this.bpm);
        this.setHtml(this.r());
    }  

    start(){
        let beatTime = (60 / this.bpm / this.A) * 1000;
        this.tstepB = beatTime / this.B;
        window.console.debug(`BPM(${this.bpm}) - ${this.tstepB}ms `);


        let a = new Array();
        // for(let xx in this.controlsA)
        // {
        //     a.push(document.getElementById(xx));
        // }
        // let b = new Array();
        // for(let xx in this.controlsB)
        // {
        //     b.push(document.getElementById(xx));
        // }
        // this.controlsA =a;
        // this.controlsB =b;
        setInterval(this.beat, this);
    }

    beat(th)
    {
        P_METRONOME.idxB++;
        if(P_METRONOME.idxB >= P_METRONOME.B){
            P_METRONOME.idxB = 0;
            P_METRONOME.idxA++;


        }

        if(P_METRONOME.idxA === 0){
            window.console.debug(`${P_METRONOME.idxA} / ${P_METRONOME.idxB}`);
        }

        if(P_METRONOME.idxA >= P_METRONOME.A){
            P_METRONOME.idxA = 0;
        }


        for(let posB = 0; posB < P_METRONOME.controlsB.length; posB++)
        {
            let Bct = document.getElementById(P_METRONOME.controlsB[posB]);
            if(posB == P_METRONOME.idxB){
                Bct.innerText = "*";
            }
            else{
                Bct.innerText = "";
            }
        }

        // window.console.debug(`* - ${P_METRONOME.idxB}`);
        // window.console.debug(`* - ${P_METRONOME.idxB}`);
    }

    stop(){
        window.clearInterval();
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
        let ctId_A = this.getControlId();
        this.controlsA.push(ctId_A);

        for(let a=0; a<this.A; a++){
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
            let ctId_B = `B_ctl_${b}`;
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
