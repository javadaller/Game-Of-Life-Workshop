import { customGrid } from "./customGrid.js"
//import { advancedGrid } from "./advancedGrid.js"
import { customGameOfLife } from "./customGameOfLife.js"
//import { advancedGameOfLife } from "./advancedGameOfLife.js"

export function nav(): void {

    // CUSTOM / ADVANCED
    //const custom: HTMLDivElement = document.querySelector('#customNav')
    //const advanced: HTMLDivElement = document.querySelector('#advancedNav')
    //const customOptions: HTMLElement = document.querySelector('#customOptions')
    //const advancedOptions: HTMLElement = document.querySelector('#advancedOptions')
    const customDisplay: HTMLDivElement = document.querySelector('#displayCustom')
    const advancedDisplay: HTMLDivElement = document.querySelector('#displayAdvanced')

    customDisplay.style.display = 'flex'
    advancedDisplay.style.display = 'none'
    //advancedOptions.style.display = 'none'
    const grid: HTMLDivElement = document.querySelector('#gridAdvanced')!
    grid.innerHTML = ''
    clearAll()

    // custom.addEventListener('click', () => {
    //     customDisplay.style.display = 'flex'
    //     advancedDisplay.style.display = 'none'
    //     advancedOptions.style.display = 'none'
    //     customOptions.style.display = 'flex'
    //     const grid: HTMLDivElement = document.querySelector('#gridAdvanced')!
    //     grid.innerHTML = ''
    //     clearAll()
    // })

    // advanced.addEventListener('click', () => {
    //     customDisplay.style.display = 'none'
    //     advancedDisplay.style.display = 'flex'
    //     advancedOptions.style.display = 'flex'
    //     customOptions.style.display = 'none'
    //     clearAll()
    //     const grid: HTMLDivElement = document.querySelector('#gridCustom')!
    //     grid.innerHTML = ''
    // })

    // CUSTOM START / STOP
    const startStop: HTMLDivElement = document.querySelector('#customStartStop')

    startStop.addEventListener('click', () => {
        if(startStop.innerText == "Start") {
            startStop.innerText = "Stop"
            customGameOfLife()
        } else {
            startStop.innerText = "Start"
            localStorage.setItem('customRunning','false')
        }
    })

    // CUSTOM CLEAR
    const customClear: HTMLElement = document.querySelector('#customClear')
    customClear.addEventListener('click', () => {
        if(startStop.innerText == "Stop") {
            startStop.innerText = "Start"
            localStorage.setItem('customRunning','false')
        }
        clearAll()
    })

    // ADVANCED START / STOP
    // const advancedStartStop: HTMLDivElement = document.querySelector('#advancedStartStop')

    // advancedStartStop.addEventListener('click', () => {
    //     if(advancedStartStop.innerText == "Start") {
    //         advancedStartStop.innerText = "Stop"
    //         advancedGameOfLife()
    //     } else {
    //         advancedStartStop.innerText = "Start"
    //         localStorage.setItem('advancedRunning','false')
    //     }
    // })

    // ADVANCED CLEAR
    // const advancedClear: HTMLElement = document.querySelector('#advancedClear')
    // advancedClear.addEventListener('click', () => {
    //     if(advancedStartStop.innerText == "Stop") {
    //         advancedStartStop.innerText = "Start"
    //         localStorage.setItem('advancedRunning','false')
    //     }
    //     clearAll()
    // })
}

function clearAll() {
    localStorage.setItem('customRunning','false')

    const customArray: Array<Array<number>> = []
    localStorage.setItem('customArray',JSON.stringify(customArray))

    // const advancedArray: Array<Array<number>> = []
    // localStorage.setItem('advancedArray',JSON.stringify(advancedArray))

    let sizeInput: HTMLSelectElement = document.querySelector('#customSizeID')
    let value: Array<string> = sizeInput.value.split('x')
    customGrid(parseInt(value[0]),parseInt(value[1]))
    // sizeInput = document.querySelector('#advancedSizeID')
    // value = sizeInput.value.split('x')
    // advancedGrid(parseInt(value[0]),parseInt(value[1]))
}