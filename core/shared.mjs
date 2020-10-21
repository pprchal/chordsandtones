// Pavel Prchal 2019, 2020

export function getSelectedValue(id){
    return document.getElementById(id).selectedOptions[0].value;
}       

export function getSelectedValue2(id){
    return document.getElementById(id).value;
} 

export function setCssClass(control, cssClass, on) {
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