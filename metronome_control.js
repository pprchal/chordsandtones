// Pavel Prchal 2020
// -------------------- MetronomeControl
// --------------------
class MetronomeControl extends BaseControl{
    constructor(holderId, A, B, bpm, sound) {
        super();
        this.r = Raphael(holderId, 640, 480);
        this.A = A;
        this.B = B;
        this.running = false;
        this.bpm = bpm;
        this.sound = sound;
        this.beat = 0;
    }

    render() {
        this.update(this.A, this.B);
    }  

    start(){
        this.beat = 0;
        this.td = (this.bpm / 60) * 1000;
        this.debug(`[${this.A}/${this.B}] BPM(${this.bpm}): ${this.td} ms `);
        this.thread = setInterval(this.metronomeTicker, this.td, this);
    }


    stop(){
        clearInterval(this.thread);
    }
    
    toggleStartStop(){
        if(this.running){
            this.stop();
        }
        else{
            this.start();
        }
        this.running = !this.running;
        return this.running;
    }

    metronomeTicker(metronome)
    {
        let note = metronome.beat === 0 ? 'C' : 'E';
        if(metronome.beat < (metronome.A-1)) {
            metronome.beat++;
        }else{
            metronome.beat = 0;
        }

        let circle = metronome.circles[metronome.beat];
        circle.color
        // circle.animate({"fill-opacity": 1}, 50);
        // circle.animate({"fill-opacity": .4}, 50);
    // }).mouseout(function () {
    //     this.animate({"fill-opacity": .4}, 500);

    // .mouseout(function () {     this.animate({"fill-opacity": .4}, 500);   })
//        metronome.debug(metronome.beat);
//        metronome.sound.playToneWithOctave(note, '0', 'equal-tempered');
    }

    
    update(A, B){
        this.A = A;
        this.B = B;
        this.debug(`Updating metronome to: [${A}/${B}]`);

        let r = this.r;
        r.clear();
        let angle = 0;
        let circles = [];

        let aStep = 360 / this.A;
        for(let a=0; a < this.A; a++){
            var color = Raphael.getColor();
            (function (t, c) {
                let circle = r
                    .circle(320, 450, 40)
                    .attr({stroke: c, fill: c, transform: t, "fill-opacity": .3});
                circles.push(circle);

            })(`r${(angle - 90)} 320 240`, color);
            angle += aStep;
        }

        this.circles = circles;
        Raphael.getColor.reset();
        var s = r.set();
        
        // this.rafika = r.path("M320,240c-50,100,50,110,0,190").attr({fill: "none", "stroke-width": 2})
        // s.push(this.rafika);

        // s.push(r.circle(320, 450, 20).attr({fill: "none", "stroke-width": 2}));
        // s.push(r.circle(320, 240, 5).attr({fill: "none", "stroke-width": 10}));
        s.attr({stroke: Raphael.getColor()});
    }

}
