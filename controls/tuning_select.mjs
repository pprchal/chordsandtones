// Pavel Prchal 2020
// -------------------- ScaleSelectControl
// --------------------
// import {BaseControl} from "./control.mjs"
// import {DB} from "../core/leaflet.mjs"

// export class ScaleSelectControl extends BaseControl{
//     constructor(controlId) {
//         super(controlId);
//     }

//     render(document, onRefresh) {
//         let to = document.getElementById(this.ControlId);
//         to.addEventListener("change", onRefresh);
//         this.fillScales(to, document);
//     }
    
//     fillScales(cbScales, document) {
//         for (let i = 0; i < DB.scales.length; i++) {
//             let scale = DB.scales[i];
//             let option = document.createElement("option");
//             option.text = scale.name;
//             cbScales.add(option);
//         }
//     }
// }
// fill tunings
function fillTunings(cbTunings) {
    for (let i = 0; i < DB.tunings.length; i++) {
        let tuning = DB.tunings[i];
        let option = document.createElement("option");
        option.text = tuning.name;
        cbTunings.add(option);
    }
}
// fillTunings(document.getElementById('cbTunings'));
