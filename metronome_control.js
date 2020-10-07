// Pavel Prchal 2020
// -------------------- MetronomeControl
// --------------------
class MetronomeControl extends BaseControl{
    constructor(holderId, a, b) {
        super();
        this.r = Raphael(holderId, 640, 480);
        this.A = a;
        this.B = b;
    }

    render() {
        this.update(this.A, this.B);
    }  

    update(metroA, metroB){
        this.debug(`Updating metronome to: ${metroA}/${metroB}`);

        let r = this.r;
        // var r = Raphael("", 640, 480),
        let angle = 0;
        
        while (angle < 360) {
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
            angle += 30;
        }
        Raphael.getColor.reset();
        var s = r.set();
        s.push(r.path("M320,240c-50,100,50,110,0,190").attr({fill: "none", "stroke-width": 2}));
        s.push(r.circle(320, 450, 20).attr({fill: "none", "stroke-width": 2}));
        s.push(r.circle(320, 240, 5).attr({fill: "none", "stroke-width": 10}));
        s.attr({stroke: Raphael.getColor()});
    }

}
