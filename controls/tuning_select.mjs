// Pavel Prchal 2020

// fill tunings
function fillTunings(cbTunings) {
    for (let i = 0; i < DB.tunings.length; i++) {
        let tuning = DB.tunings[i];
        let option = document.createElement("option");
        option.text = tuning.name;
        cbTunings.add(option);
    }
}
