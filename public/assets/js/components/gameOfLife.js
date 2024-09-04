import { sleep } from "../helpers/functions.js";
import { customGrid } from "./customGrid.js";
//* INIT
let delay = 150;
let rows = 20;
let cols = 20;
export async function customGameOfLife() {
    if (localStorage.getItem('customRunning') === 'true')
        return;
    localStorage.setItem('customRunning', 'true');
    while (localStorage.getItem('customRunning') === 'true') {
        //* TEMP ARRAYS
        const tempAlivesArray = new Set();
        const tempDeadsArray = new Set();
        //* CURRENT ARRAY
        const customArray = JSON.parse(localStorage.getItem('customArray')) || [];
        //* FOREACH ALIVE CELL
        customArray.forEach(cellID => {
            const [_, xStr, yStr] = cellID.split(',');
            const x = parseInt(xStr);
            const y = parseInt(yStr);
            //* Check around the cell
            const aliveNeighbors = getNeighbors(x, y, rows, cols, 'true');
            const deadNeighbors = getNeighbors(x, y, rows, cols, 'false');
            //* RULES OF LIFE
            //* Between 2 and 3 alive neighbors for survival
            if (aliveNeighbors.length === 2 || aliveNeighbors.length === 3) {
                tempAlivesArray.add(cellID);
            }
            else {
                tempDeadsArray.add(cellID);
            }
            //* Check for dead cells that can come to life
            deadNeighbors.forEach(deadCellID => {
                const [_, nxStr, nyStr] = deadCellID.split(',');
                const nx = parseInt(nxStr);
                const ny = parseInt(nyStr);
                if (getNeighbors(nx, ny, rows, cols, 'true').length === 3) {
                    tempAlivesArray.add(deadCellID);
                    tempDeadsArray.delete(deadCellID);
                }
            });
        });
        tempAlivesArray.forEach(aliveCell);
        tempDeadsArray.forEach(deadCell);
        localStorage.setItem('customArray', JSON.stringify(Array.from(tempAlivesArray)));
        //* ADD DELAY WITH SPEED OPTION
        await sleep(delay);
    }
}
function getNeighbors(x, y, rows, cols, status) {
    const neighbors = [];
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx !== 0 || dy !== 0) {
                const nx = (x + dx + rows) % rows;
                const ny = (y + dy + cols) % cols;
                const nextCell = document.getElementById(`custom,${nx},${ny}`);
                if (nextCell && nextCell.getAttribute('alive') === status) {
                    neighbors.push(`custom,${nx},${ny}`);
                }
            }
        }
    }
    return neighbors;
}
function aliveCell(cell) {
    const div = document.getElementById(cell);
    if (div) {
        div.setAttribute('alive', 'true');
        div.classList.add('alive');
    }
}
function deadCell(cell) {
    const div = document.getElementById(cell);
    if (div) {
        div.setAttribute('alive', 'false');
        div.classList.remove('alive');
    }
}
//* OPTIONS
export function customOptions() {
    //* SPEED
    const speedInput = document.querySelector('#customSpeedID');
    const speedDisplay = document.querySelector('#customSpeedDisplay');
    speedInput.addEventListener('input', () => {
        speedDisplay.innerText = 'x' + speedInput.value;
        delay = 300 - (parseInt(speedInput.value) * 25);
    });
    //* SIZE
    const sizeInput = document.querySelector('#customSizeID');
    sizeInput.addEventListener('input', () => {
        const value = sizeInput.value.split('x');
        cols = parseInt(value[0]);
        rows = parseInt(value[1]);
        customGrid(cols, rows);
    });
}
