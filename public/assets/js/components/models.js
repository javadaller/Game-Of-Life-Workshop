import { customGrid } from "./customGrid.js";
export function modelSelect() {
    fetch('./assets/models.json')
        .then(response => response.json())
        .then((models) => {
        const modelsInput = document.getElementById('customModelsID');
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
                const customArrayTemp = [];
                localStorage.setItem('customArray', JSON.stringify(customArrayTemp));
                const modelName = modelsInput.value;
                const selectedModel = models.find(model => model.name === modelName);
                const sizeInput = document.querySelector('#customSizeID');
                const value = sizeInput.value.split('x');
                const cols = parseInt(value[0]);
                const rows = parseInt(value[1]);
                customGrid(cols, rows);
                const array = selectedModel.array;
                array.forEach(id => {
                    const cell = document.getElementById(id);
                    cell.setAttribute('alive', 'true');
                    cell.classList.add('alive');
                    const customArray = JSON.parse(localStorage.getItem('customArray'));
                    customArray.push(id);
                    localStorage.setItem('customArray', JSON.stringify(customArray));
                });
                const startStop = document.querySelector('#customStartStop');
                if (startStop.innerText == "Stop") {
                    startStop.innerText = "Start";
                    localStorage.setItem('customRunning', 'false');
                }
            });
        }
        else {
            console.error('Select element not found');
        }
    })
        .catch(error => console.error('Error fetching models:', error));
}
