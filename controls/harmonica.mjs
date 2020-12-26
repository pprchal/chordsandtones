// Pavel Prchal 2019,2020

import {MCore} from "../core/mcore.mjs"
import { MHarp } from "../core/mharp.mjs";
import {BaseControl} from "./base_control.mjs"

export class HarmonicaControl extends BaseControl {
    constructor(controlId, messageGroup) {
        super(controlId, messageGroup);
        this.HarpRootTone = MCore.tone('C', 4);
        this.Harmonica = MCore.harmonica('Richter diatonická', this.HarpRootTone.name);
    }

    render(harpRootTone) {
        if(harpRootTone != undefined){
            this.HarpRootTone = harpRootTone
            this.Harmonica = MCore.harmonica('Richter diatonická', this.HarpRootTone.name)
        }

        this.clear()
        this.debug(`harmonica.render(${this.HarpRootTone.name}, [${this.Harmonica.name}])`)
        let table = document.createElement('table')
        this.Self.appendChild(table)
       
        let rows = this.Harmonica.template.flatMap((templateRow, n) => 
        {
            let tones = MHarp.generateRow(this.HarpRootTone, templateRow)
            let tr = this.tr(tones, templateRow)

            return (n === 1) ? [tr, this.printHoleNumbers(this.Harmonica)] : tr
        })
        table.append(...rows)
    }        
    
    subscribeTo(eventName, messageGroup, doAction){
        document.addEventListener(eventName, (e) => 
        {
            this.debug(`harmonica.subscribeTo(${eventName}, ${e.MessageGroup}, ${doAction})`)
            if(e.MessageGroup === messageGroup) {
                if(doAction === "COLORIZE") {
                    this.colorizeByScale(e.EventData)
                }
                else if(doAction === undefined) {
                    // default action - i don't want to write RENDER to all commands
                    // but.. think twice to refactor
                    this.render(e.EventData)
                }
            }
        })

        return this
    }

    formatHarmonicaRowTitle(row){
        let htmlName = row.name;
        if(row.name === '1/2'){
            htmlName = '&#189;'
        }
        else if(row.name === '1'){
            htmlName = 'celý tón'
        }
        else if(row.name === '1 1/2'){
            htmlName = '<span>1 &#189;</span>'
        }
        return `${row.type} ${htmlName}`
    }

    tr(tones, templateRow){
        let tr = document.createElement('tr')
        tr.append(...[
            this.td(this.formatHarmonicaRowTitle(templateRow)), 
            ...tones.map(tone => this.tdTone(tone, templateRow))]
        )
        return tr
    }

    tdTone(tone, templateRow) {
        if(tone == undefined){
            return this.td('&nbsp;')
        }

        let td = this.td(MHarp.bendTone(tone, templateRow))
        td.setAttribute('tone', tone.name)
        td.setAttribute('octave', tone.octave)
        return td
    }

    td(html){
        let td = document.createElement('td')
        td.innerHTML = html
        return td
    }

    // @harmonica
    printHoleNumbers(harmonica) {
        let tr = document.createElement('tr')
        tr.classList.add('harpHolesRow')
        tr.append(...[
            this.td(''),
            ...harmonica.template[0].offsets.map((_, n) => this.td(n + 1))
        ])
        return tr
    }  


    colorizeByScale(SCALE_CHANGED) {
        this.decolorAll()
        // todo: flat all tones .. for one special case...
        let tonesInScale = MCore.generateScale(SCALE_CHANGED.RootTone, SCALE_CHANGED.Scale)
        tonesInScale.forEach(tone => this.colorizeByTone(tone))
    }

    colorizeByTone(tone){
        let a = this.Self.querySelectorAll(`td[tone='${tone.name}']`) // [octave='${tone.octave}']
        a.forEach(td => this.setColor(tone, td))
    }

    setColor(tone, td) {
        td.classList.add('note-on')
    }

    decolorAll() {
        this
            .Self
            .querySelectorAll('td[tone]')
            .forEach(td => td.classList.value = '')
    }
}
