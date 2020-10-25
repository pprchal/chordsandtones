// Pavel Prchal 2020
// -------------------- MetronomeControl
// --------------------
import {MetronomeControlBase} from "./metronome_base.mjs"

export class MetronomeControl extends MetronomeControlBase{
    constructor(controlId, holderId, metroA, metroB, bpm, sound) {
        super(controlId, metroA, metroB, bpm);
        this.r = Raphael(holderId, 640, 480);
        this.sound = sound;
    }

    render() {
        this.update(this.A, this.B);
    }  

    start(){
        this.td = (this.bpm / 60) * 1000;
        this.debug(`BPM(${this.bpm}): ${this.td} ms `);
        setInterval(this.myTimer, this.td);

    }

    myTimer()
    {
        // this.debug('tick');
        this.P_SOUND.playToneWithOctave('C', '0', 'equal-tempered');
    }

    stop(){
        window.clearInterval();
    }
    
    toggleStartStop(){
        this.running = !this.running;
        if(this.running){
            this.stop();
        }
        else{
            this.start();
        }
        return this.running;
    }

        // P_CONTAINER.METRONOME = new MetronomeControlBase("metronomeHolder", P_CONTAINER.SOUND);
        // P_CONTAINER.METRONOME.render();
        // refreshMetronome();
        // function toggleMetronome() {
        //     document.getElementById("btStartStop").innerText = P_CONTAINER.METRONOME.isRunning() ? "Start" : "Stop";
        //     if(P_CONTAINER.METRONOME.isRunning()){
        //         P_CONTAINER.METRONOME.stop();
        //     }else{
        //         refreshMetronome();
        //         P_CONTAINER.METRONOME.start();
        //     }
        // }

    refreshMetronome(){
        let a = parseInt(getSelectedValue("cbMetroA"));
        let b = parseInt(getSelectedValue("cbMetroB"));
        let s = parseInt(getSelectedValue("cbMetroS"));
        let bpm = parseInt(getSelectedValue2("tbBPM"));
        P_CONTAINER.METRONOME.update(a, b, bpm, s);
    }

    update(metroA, metroB){
        this.A = metroA;
        this.B = metroB;
        this.debug(`Updating metronome to: ${metroA}/${metroB}`);

        let r = this.r;
        r.clear();
        let angle = 0;

        let aStep = 360 / this.A;
        for(let a=0; a < this.A; a++){
            var color = Raphael.getColor();
            (function (t, c) {
                r.circle(320, 450, 20).attr({stroke: c, fill: c, transform: t, "fill-opacity": .4}).click(function () {
                    s.animate({transform: t, stroke: c}, 2000, "bounce");
                }).mouseover(function () {
                    this.animate({"fill-opacity": .75}, 500);
                }).mouseout(function () {
                    this.animate({"fill-opacity": .4}, 500);
                });
            })("r" + angle + " 320 240", color);
            angle += aStep;
        }

        Raphael.getColor.reset();
        var s = r.set();
        this.rafika = r.path("M320,240c-50,100,50,110,0,190").attr({fill: "none", "stroke-width": 2})
        s.push(this.rafika);
        s.push(r.circle(320, 450, 20).attr({fill: "none", "stroke-width": 2}));
        s.push(r.circle(320, 240, 5).attr({fill: "none", "stroke-width": 10}));
        s.attr({stroke: Raphael.getColor()});
    }

}
