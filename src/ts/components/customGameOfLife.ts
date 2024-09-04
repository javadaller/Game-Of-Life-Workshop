import { sleep } from "../helpers/functions.js"
import { customGrid } from "./customGrid.js"

//* INIT
let delay = 150
let rows = 20
let cols = 20

export async function customGameOfLife() {
    if (localStorage.getItem('customRunning') === 'true') return
    localStorage.setItem('customRunning', 'true')

    while (localStorage.getItem('customRunning') === 'true') {
        
        await sleep(delay)
    }
}



//* OPTIONS
export function customOptions() {
    //* SPEED
    const speedInput: HTMLInputElement = document.querySelector('#customSpeedID')
    const speedDisplay: HTMLSpanElement = document.querySelector('#customSpeedDisplay')
    speedInput.addEventListener('input', () => {
        speedDisplay.innerText = 'x' + speedInput.value
        delay = 300 - (parseInt(speedInput.value) * 25)
    })

    //* SIZE
    const sizeInput: HTMLSelectElement = document.querySelector('#customSizeID')
    sizeInput.addEventListener('input', () => {
        const value: Array<string> = sizeInput.value.split('x')
        cols = parseInt(value[0])
        rows = parseInt(value[1])
        customGrid(cols, rows)
    })
}
