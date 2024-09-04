import { sleep } from "../helpers/functions.js"
import { advancedGrid } from "./advancedGrid.js"

//* INIT
let delay = 150
let rows = 20
let cols = 20
let filterSize: number = 3
let filters: Array<number> = [1,1,1]

export async function advancedGameOfLife() {
    if (localStorage.getItem('advancedRunning') === 'true') return
    localStorage.setItem('advancedRunning', 'true')

    while (localStorage.getItem('advancedRunning') === 'true') {
        //* TEMP ARRAYS
        const tempAlivesArray = new Set<string>()
        const tempDeadsArray = new Set<string>()

        //* CURRENT ARRAY
        const advancedArray = JSON.parse(localStorage.getItem('advancedArray')) || []

        advancedArray.forEach(cellID => {
            const cell: HTMLDivElement = document.querySelector('#'+cellID)
            const life: number = parseFloat(cell.getAttribute('life'))
            const posx: number = parseInt(cell.getAttribute('posx'))
            const posy: number = parseInt(cell.getAttribute('posy'))

            //* Check around the cell
            const aliveNeighbors = getNeighbors(posx, posy, rows, cols, 'true')
            const deadNeighbors = getNeighbors(posx, posy, rows, cols, 'false')
        })

        //* ADD DELAY WITH SPEED OPTION
        await sleep(delay)
    }
}

//--------------------------------------------------------------------------------------------

function getNeighbors(x: number, y: number, rows: number, cols: number, status: string): Array<string> {
    const neighbors = []


    return neighbors
}

//--------------------------------------------------------------------------------------------

//* OPTIONS
export function advancedOptions() {
    //* SPEED
    const speedInput: HTMLInputElement = document.querySelector('#advancedSpeedID')
    const speedDisplay: HTMLSpanElement = document.querySelector('#advancedSpeedDisplay')
    speedInput.addEventListener('input', () => {
        speedDisplay.innerText = 'x' + speedInput.value
        delay = 300 - (parseInt(speedInput.value) * 25)
    })

    //* SIZE
    const sizeInput: HTMLSelectElement = document.querySelector('#advancedSizeID')
    sizeInput.addEventListener('input', () => {
        const value: Array<string> = sizeInput.value.split('x')
        cols = parseInt(value[0])
        rows = parseInt(value[1])
        advancedGrid(cols, rows)
    })

    //* FILTERS
    const filterSizeInput: HTMLInputElement = document.querySelector('#filterSizeID')
    filterSizeInput.addEventListener('input', () => {
        filterSize = parseInt(filterSizeInput.value)
    })
    
    const filterInput1: HTMLInputElement = document.querySelector('#filter1ID')
    const filterInput2: HTMLInputElement = document.querySelector('#filter2ID')
    const filterInput3: HTMLInputElement = document.querySelector('#filter3ID')
    const filterInputs: Array<HTMLInputElement> = [filterInput1,filterInput2,filterInput3]

    filterInputs.forEach(input => {
        input.addEventListener('input', () => {
            filters = [parseFloat(filterInput1.value),parseFloat(filterInput2.value),parseFloat(filterInput3.value)]
        })
    })
}