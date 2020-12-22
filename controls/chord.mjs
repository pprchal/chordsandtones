// Pavel Prchal 2019, 2020

import {MCore} from "../core/mcore.mjs"
import {BaseControl} from "./base_control.mjs"
import {DB} from "../core/leaflet.mjs"

export class ChordControl extends BaseControl{
    constructor(controlId, messageGroup) {
        super(controlId, messageGroup);
    }

    // @chordTypeName (maj7)
    render(chordType) {
        // handle events
        if(chordType == undefined){
            chordType = DB.chords[0]
        }
        this.clear()

        // table
        let table = document.createElement('table')
        this.Self.appendChild(table)

        // rows... [C E G]
        table.appendChild(this.thead(chordType.distances))
        this
            .chordsOfType(chordType)
            .forEach(chord => table.appendChild(this.tr(chord)))
    }  

    chordsOfType(chordType) {
        return DB.tones.map(tone => MCore.generateChordTableForTone(chordType, tone))
    }

    subscribeTo(eventName, messageGroup){
        document.addEventListener(eventName, (e) => 
        {
            if(messageGroup === messageGroup){
                this.render(e.EventData)
            }
        })

        return this
    }

    thead(distances) {
        let thead = document.createElement('thead')
        let tr = document.createElement('tr')
        thead.appendChild(tr)

        // 0               +4              +7
        // C                E               G   
        // Základní tón	    Velká tercie	Kvinta
        tr.append(...MCore.fromRelative(distances).map(distance => this.th(distance)))
        return thead
    }        

    th(distance){
        let th = document.createElement('th')
        th.innerHTML = MCore.distanceAsHtml(distance)
        return th
    }
    
    tr(chord) {
        let tr = document.createElement('tr')
        tr.append(...chord.tones.map((tone, n) => this.td(tone, n)))
        return tr;
    }

    button(tone){
        let a = document.createElement('a')
        a.className = 'button button-primary'
        a.innerHTML = MCore.toneAsHtml(tone, false)
        return a
    }

    td(tone, n){
        let td = document.createElement('td')
        if(n === 0){
            td.appendChild(this.button(tone))
        }else{
            td.innerHTML = MCore.toneAsHtml(tone)
        }
        return td
    }
}
