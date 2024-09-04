import { createDiv, changeCSSRule } from "../helpers/functions.js";
export function advancedGrid(width, height) {
    const grid = document.querySelector('#gridAdvanced');
    grid.innerHTML = '';
    if (height > 30) {
        changeCSSRule('.cell2', 'width', '10px');
        changeCSSRule('.cell2', 'height', '10px');
    }
    else if (height == 20) {
        changeCSSRule('.cell2', 'width', '30px');
        changeCSSRule('.cell2', 'height', '30px');
    }
    else {
        changeCSSRule('.cell2', 'width', '20px');
        changeCSSRule('.cell2', 'height', '20px');
    }
    grid.style.gridTemplateColumns = 'repeat(' + width + ',1fr)';
    grid.style.gridTemplateRows = 'repeat(' + height + ',1fr)';
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            createCell(grid, i, j);
        }
    }
}
function createCell(grid, x, y) {
    const div = createDiv('div', grid, '', 'cell2', null, null);
    div.setAttribute('alive', 'false');
    div.setAttribute('life', '0');
    div.setAttribute('posX', x.toString());
    div.setAttribute('posY', y.toString());
    div.id = 'advanced,' + x.toString() + ',' + y.toString();
    div.addEventListener('click', () => {
        if (localStorage.getItem('advancedRunning') == 'false') {
            if (div.getAttribute('alive') == 'false') {
                cellActivated(div);
            }
            else {
                const life = parseFloat(div.getAttribute('life'));
                if (life <= 0.1) {
                    //kill the cell
                    div.setAttribute('alive', 'false');
                    div.setAttribute('life', '0');
                    div.classList.remove('life10', 'life9', 'life8', 'life7', 'life6', 'life5', 'life4', 'life3', 'life2', 'life1');
                    //remove the cell of the array
                    const id = div.id;
                    const advancedArray = JSON.parse(localStorage.getItem('advancedArray'));
                    const updatedArray = advancedArray.filter(item => item !== id);
                    localStorage.setItem('advancedArray', JSON.stringify(updatedArray));
                }
                else {
                    //remove some life
                    div.setAttribute('life', (life - 0.1).toString());
                    const classNumber = Math.trunc(life * 10);
                    div.classList.remove('life10', 'life9', 'life8', 'life7', 'life6', 'life5', 'life4', 'life3', 'life2', 'life1');
                    div.classList.add('life' + classNumber.toString());
                }
            }
        }
    });
}
function cellActivated(div) {
    const alive = div.getAttribute('alive');
    if (alive == 'false') {
        div.setAttribute('alive', 'true');
        div.setAttribute('life', '1');
        div.classList.add('life10');
        // add the cell in array
        const id = div.id;
        const advancedArray = JSON.parse(localStorage.getItem('advancedArray'));
        advancedArray.push(id);
        localStorage.setItem('advancedArray', JSON.stringify(advancedArray));
    }
    else {
        div.setAttribute('alive', 'false');
        div.setAttribute('life', '0');
        div.classList.remove('life10', 'life9', 'life8', 'life7', 'life6', 'life5', 'life4', 'life3', 'life2', 'life1');
        //remove the cell of the array
        const id = div.id;
        const advancedArray = JSON.parse(localStorage.getItem('advancedArray'));
        const updatedArray = advancedArray.filter(item => item !== id);
        localStorage.setItem('advancedArray', JSON.stringify(updatedArray));
    }
}
