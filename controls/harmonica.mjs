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

        for (let i = 0; i < this.Harmonica.template.length ; i++){
            let templateRow = this.Harmonica.template[i]
            let tones = MHarp.generateRow(this.HarpRootTone, templateRow)
            if(i === 1)
                table.appendChild(this.printHoleNumbers(this.Harmonica))
            
            table.appendChild(this.tr(tones, templateRow))
        }
        this.Self.appendChild(table)
    }        
    
    subscribeTo(eventName, messageGroup, doAction){
        document.addEventListener(eventName, (e) => 
        {
            this.debug(`harmonica.subscribeTo(${eventName}, ${e.MessageGroup}, ${doAction})`)
            if(e.MessageGroup === messageGroup) {
                if(doAction === "COLORIZE") {
                    this.colorize(e.EventData)
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
        return `${row.type}${htmlName}`
    }

    tr(tones, templateRow){
        let tr = document.createElement('tr')
        tr.append(...[
            this.td(this.formatHarmonicaRowTitle(templateRow)), 
            this.td(templateRow.type), 
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
            this.td(''),
            ...harmonica.template[0].offsets.map((_, n) => this.td(n + 1))
        ])
        return tr
    }  


    colorize(SCALE_CHANGED) {
        this.decolorAll()
        // todo: flat all tones .. for one special case...
        let tonesInScale = MCore.generateScale(SCALE_CHANGED.RootTone, SCALE_CHANGED.Scale)

        tonesInScale.forEach(tone => {
            let a = this.Self.querySelectorAll(`td[tone='${tone.name}']`)
            this.Self
                .querySelectorAll(`td[tone='${tone.name}']`)  // .querySelectorAll(`td[tone='${tone.name}'][octave='${tone.octave}']`)
                .forEach(td => this.setColor(td, true))
        })
    }

    setColor(td, on) {
        td.classList.toggle('note-on')
    }

    decolorAll() {
        this
            .Self
            .querySelectorAll("td[tone]")
            .forEach(td => this.setColor(td, false))
    }
}
