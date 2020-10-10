// Pavel Prchal 2020
// -------------------- MetronomeControl
// --------------------
class MetronomeControl extends BaseControl{
    constructor(controlId, holderId, metroA, metroB, bpm, sound) {
        super(controlId);
        this.r = Raphael(holderId, 640, 480);
        this.A = metroA;
        this.B = metroB;
        this.running = false;
        this.bpm = bpm;
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
