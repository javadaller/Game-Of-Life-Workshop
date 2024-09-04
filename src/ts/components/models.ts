import { customGrid } from "./customGrid.js"

export function modelSelect() {
    fetch('./assets/models.json')
        .then(response => response.json())
        .then((models: { name: string, array: string[] }[]) => {
            const modelsInput = document.getElementById('customModelsID') as HTMLSelectElement;

            if (modelsInput) {
                //* CREATE OPTIONS
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.name;
                    option.text = model.name;
                    modelsInput.appendChild(option);
                });

                //* ADD EVENT LISTENER
                modelsInput.addEventListener('input', () => {
                    const customArrayTemp: Array<Array<number>> = []
                    localStorage.setItem('customArray',JSON.stringify(customArrayTemp))

                    const modelName: string = modelsInput.value
                    const selectedModel = models.find(model => model.name === modelName)

                    const sizeInput: HTMLSelectElement = document.querySelector('#customSizeID')
                    const value: Array<string> = sizeInput.value.split('x') 
                    const cols = parseInt(value[0])
                    const rows = parseInt(value[1])
                    customGrid(cols, rows)

                    const array: Array<string> = selectedModel.array
                    array.forEach(id => {
                        const cell: HTMLElement = document.getElementById(id)
                        cell.setAttribute('alive','true')
                        cell.classList.add('alive')

                        const customArray: Array<string> = JSON.parse(localStorage.getItem('customArray'))
                        customArray.push(id)
                        localStorage.setItem('customArray',JSON.stringify(customArray))
                    })

                    const startStop: HTMLDivElement = document.querySelector('#customStartStop')
                    if(startStop.innerText == "Stop") {
                        startStop.innerText = "Start"
                        localStorage.setItem('customRunning','false')
                    }
        })


            } else {
                console.error('Select element not found');
            }
        })
        .catch(error => console.error('Error fetching models:', error));
}
