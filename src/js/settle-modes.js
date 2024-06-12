class Mode{
    constructor(elementsColor, backgroundColor, textColor, inputColor, iconFirstClass){
        this.elementsColor = elementsColor
        this.backgroundColor = backgroundColor
        this.textColor = textColor
        this.inputColor = inputColor
        this.iconFirstClass = iconFirstClass
    }
}

const modeBtn = document.getElementById('modeBtn')
const nightIcon = modeBtn.firstChild

const lightMode = new Mode('hsl(0, 0%, 100%)', 'hsl(0, 0%, 98%)', 'hsl(200, 15%, 8%)', 'hsl(0, 0%, 52%)')
const darkMode = new Mode('hsl(209, 23%, 22%)', 'hsl(207, 26%, 17%)', 'hsl(0, 0%, 100%)', 'hsl(0, 0%, 52%)')
const modes = [lightMode, darkMode]

const handleModeBtnClick = () =>{
    Window.vLCountriesAPI.darkModeOn = !Window.vLCountriesAPI.darkModeOn
    const modeIdx = (Window.vLCountriesAPI.darkModeOn)? 1:0
    const mode = modes[modeIdx]
    for (const prop of Object.keys(mode)){
        document.documentElement.style.setProperty(`--${prop}`, mode[prop])
    }
    window.localStorage.setItem('darkModeOn', Window.vLCountriesAPI.darkModeOn)
    
}

const setModesBtnClickHandler = ()=>{
    modeBtn.addEventListener('click', handleModeBtnClick)
}

const settleModeChanging = () =>{
    Window.vLCountriesAPI.darkModeOn = (window.localStorage.getItem('darkModeOn') === true)? true:false
    setModesBtnClickHandler()
}

export default settleModeChanging