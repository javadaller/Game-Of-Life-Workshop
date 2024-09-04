import { customGrid } from "./customGrid.js";
import { advancedGrid } from "./advancedGrid.js";
import { customGameOfLife } from "./customGameOfLife.js";
import { advancedGameOfLife } from "./advancedGameOfLife.js";
export function nav() {
    // CUSTOM / ADVANCED
    const custom = document.querySelector('#customNav');
    const advanced = document.querySelector('#advancedNav');
    const customOptions = document.querySelector('#customOptions');
    const advancedOptions = document.querySelector('#advancedOptions');
    const customDisplay = document.querySelector('#displayCustom');
    const advancedDisplay = document.querySelector('#displayAdvanced');
    customDisplay.style.display = 'flex';
    advancedDisplay.style.display = 'none';
    advancedOptions.style.display = 'none';
    const grid = document.querySelector('#gridAdvanced');
    grid.innerHTML = '';
    clearAll();
    custom.addEventListener('click', () => {
        customDisplay.style.display = 'flex';
        advancedDisplay.style.display = 'none';
        advancedOptions.style.display = 'none';
        customOptions.style.display = 'flex';
        const grid = document.querySelector('#gridAdvanced');
        grid.innerHTML = '';
        clearAll();
    });
    advanced.addEventListener('click', () => {
        customDisplay.style.display = 'none';
        advancedDisplay.style.display = 'flex';
        advancedOptions.style.display = 'flex';
        customOptions.style.display = 'none';
        clearAll();
        const grid = document.querySelector('#gridCustom');
        grid.innerHTML = '';
    });
    // CUSTOM START / STOP
    const startStop = document.querySelector('#customStartStop');
    startStop.addEventListener('click', () => {
        if (startStop.innerText == "Start") {
            startStop.innerText = "Stop";
            customGameOfLife();
        }
        else {
            startStop.innerText = "Start";
            localStorage.setItem('customRunning', 'false');
        }
    });
    // CUSTOM CLEAR
    const customClear = document.querySelector('#customClear');
    customClear.addEventListener('click', () => {
        if (startStop.innerText == "Stop") {
            startStop.innerText = "Start";
            localStorage.setItem('customRunning', 'false');
        }
        clearAll();
    });
    // ADVANCED START / STOP
    const advancedStartStop = document.querySelector('#advancedStartStop');
    advancedStartStop.addEventListener('click', () => {
        if (advancedStartStop.innerText == "Start") {
            advancedStartStop.innerText = "Stop";
            advancedGameOfLife();
        }
        else {
            advancedStartStop.innerText = "Start";
            localStorage.setItem('advancedRunning', 'false');
        }
    });
    // ADVANCED CLEAR
    const advancedClear = document.querySelector('#advancedClear');
    advancedClear.addEventListener('click', () => {
        if (advancedStartStop.innerText == "Stop") {
            advancedStartStop.innerText = "Start";
            localStorage.setItem('advancedRunning', 'false');
        }
        clearAll();
    });
}
function clearAll() {
    localStorage.setItem('customRunning', 'false');
    const customArray = [];
    localStorage.setItem('customArray', JSON.stringify(customArray));
    const advancedArray = [];
    localStorage.setItem('advancedArray', JSON.stringify(advancedArray));
    let sizeInput = document.querySelector('#customSizeID');
    let value = sizeInput.value.split('x');
    customGrid(parseInt(value[0]), parseInt(value[1]));
    sizeInput = document.querySelector('#advancedSizeID');
    value = sizeInput.value.split('x');
    advancedGrid(parseInt(value[0]), parseInt(value[1]));
}
