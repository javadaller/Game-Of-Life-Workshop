import { nav } from "./components/nav.js"
import { customGrid } from "./components/customGrid.js"
import { customOptions } from "./components/customGameOfLife.js"
import { advancedOptions } from "./components/advancedGameOfLife.js"
import { modelSelect } from "./components/models.js"

//INIT
localStorage.setItem('customRunning','false')
localStorage.setItem('advancedRunning','false')

const customArray: Array<Array<number>> = []
localStorage.setItem('customArray',JSON.stringify(customArray))

const advancedArray: Array<Array<number>> = []
localStorage.setItem('advancedArray',JSON.stringify(advancedArray))

//FUNCTIONS
nav()
customGrid(20,20)
customOptions()
advancedOptions()
modelSelect()