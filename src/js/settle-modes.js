class Mode{
    constructor(elementsColor, elementsColorTint, backgroundColor, textColor, inputColor, placeholderColor, nightIconFAStyleClass){
        this.cssVars = {}
        this.cssVars.elementsColor = elementsColor
        this.cssVars.elementsColorTint = elementsColorTint
        this.cssVars.backgroundColor = backgroundColor
        this.cssVars.textColor = textColor
        this.cssVars.inputColor = inputColor
        this.cssVars.placeholderColor = placeholderColor
        this.nightIconFAStyleClass = nightIconFAStyleClass
    }
}

const modeBtn = document.getElementById('modeBtn')
const nightIcon = modeBtn.firstChild
const WHITE_STR = 'hsl(0, 0%, 100%)'

const lightMode = new Mode(WHITE_STR, 'hsl(0, 0%, 96%)', 'hsl(0, 0%, 98%)', 'hsl(200, 15%, 8%)', 'hsl(0, 0%, 52%)', 'hsl(0, 0%, 75%)', 'fa-regular')
const darkMode = new Mode('hsl(209, 23%, 22%)', 'hsl(209, 23%, 28%)', 'hsl(207, 26%, 17%)', WHITE_STR, 'hsl(0, 0%, 52%)', WHITE_STR, 'fa-solid')
const modes = [lightMode, darkMode]

const handleModeBtnClick = () =>{
    Window.vLCountriesAPI.darkModeOn = !Window.vLCountriesAPI.darkModeOn
    let modeIdx
    let disabledModeNightIconFAStyleClass
    if (Window.vLCountriesAPI.darkModeOn){
        modeIdx = 1
        disabledModeNightIconFAStyleClass = modes[0].nightIconFAStyleClass
    } else {
        modeIdx = 0
        disabledModeNightIconFAStyleClass = modes[1].nightIconFAStyleClass
    }
    const mode = modes[modeIdx]
    for (const cssVar of Object.keys(mode.cssVars)){
        document.documentElement.style.setProperty(`--${cssVar}`, mode.cssVars[cssVar])
    }
    if (!nightIcon.classList.replace(disabledModeNightIconFAStyleClass, mode.nightIconFAStyleClass)) nightIcon.classList.add(mode.nightIconFAStyleClass)
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