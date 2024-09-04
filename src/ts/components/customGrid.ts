import { createDiv, changeCSSRule } from "../helpers/functions.js"

export function customGrid(width: number, height: number):void {
    const grid: HTMLDivElement = document.querySelector('#gridCustom')!
    grid.innerHTML = ''

    if(height >30) {
        changeCSSRule('.cell','width','10px')
        changeCSSRule('.cell','height','10px')
    } else if(height == 20) {
        changeCSSRule('.cell','width','30px')
        changeCSSRule('.cell','height','30px')
    } else {
        changeCSSRule('.cell','width','20px')
        changeCSSRule('.cell','height','20px')
    }

    grid.style.gridTemplateColumns = 'repeat('+width+',1fr)'
    grid.style.gridTemplateRows = 'repeat('+height+',1fr)'

    for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
            createCell(grid,i,j)
        }
    }
}

function createCell(grid: HTMLElement,x: number,y: number): void {
    const div: HTMLElement =  createDiv('div',grid,'','cell',null,null)
    
    div.setAttribute('alive','false')
    div.setAttribute('posX',x.toString())
    div.setAttribute('posY',y.toString())
    div.id = 'custom,'+x.toString()+','+y.toString()

    div.addEventListener('click', () => {
        if(localStorage.getItem('customRunning') == 'false') {
            cellActivated(div)
        }
    })
}

function cellActivated(div): void {
    const alive: string = div.getAttribute('alive')

    if(alive == 'false') {
        div.setAttribute('alive','true')
        div.classList.add('alive')

        // add the cell in array
        const id: string = div.id
        const customArray: Array<string> = JSON.parse(localStorage.getItem('customArray'))
        customArray.push(id)
        localStorage.setItem('customArray',JSON.stringify(customArray))
    } else {
        div.setAttribute('alive','false')
        div.classList.remove('alive')

        //remove the cell of the array
        const id: string = div.id
        const customArray: Array<string> = JSON.parse(localStorage.getItem('customArray'))
        const updatedArray = customArray.filter(item => item !== id)
        localStorage.setItem('customArray', JSON.stringify(updatedArray))
    }
}