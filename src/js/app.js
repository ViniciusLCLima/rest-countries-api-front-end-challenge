import getCountries from "./getCountries.js"
import {renderHome, renderCards} from "./home-page-rendering.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"
// import countries from "./apidata.js" This is for testing purposes only.
import  makeSearchInputBeFocusedOnAnyBarClick from "./utilListeners.js"
import {getCountryCommonNameFromDetailsUrl, setLoadingCircleContainerHeight, getNewEl} from "./helpers.js"
import settleModeChanging from "./settle-modes.js"

if (!Window.vLCountriesAPI) {
    Window.vLCountriesAPI = {}
}

export default async function app(cameFromThisSiteBackBtn){
    console.log("app executed")
    settleModeChanging()
    makeSearchInputBeFocusedOnAnyBarClick()
    
    const url = new URL(location)
    if (!Window.vLCountriesAPI.isFilterSettled){
        settleFilter(url.searchParams, renderCards, app)
        Window.vLCountriesAPI.isFilterSettled = true
    }

    if (!cameFromThisSiteBackBtn){
        if (Window.vLCountriesAPI.actualPage){
            Window.vLCountriesAPI.lastVisitedPages.push(Window.vLCountriesAPI.actualPage)
        } else {
            Window.vLCountriesAPI.lastVisitedPages = []
        }
    }

    const loadingCircleContainer = document.querySelector('#loadingCircleContainer')
    Window.vLCountriesAPI.actualPage = url.pathname
    let numFails = 0
    const numFailsToShowErrorMsg = 10
    let loadingMsgEl
    if (!Window.vLCountriesAPI.countries) {
        do{
            try{
                Window.vLCountriesAPI.countries =  await getCountries()
            } catch (err){
                console.log(err)
                console.log('Unable to get countries data, trying again...')
                numFails++
    //          Window.vLCountriesAPI.countries = countries This is for testing purposes only.
                if (numFails==1){
                    loadingCircleContainer.removeAttribute('hidden')
                    setLoadingCircleContainerHeight(loadingCircleContainer)
                } else if (numFails == numFailsToShowErrorMsg){
                    const ERROR_MSG = "We're having difficulties retrieving countries data. Maybe try again later."
                    loadingMsgEl = getNewEl('p',undefined, ['loading-msg'],ERROR_MSG ,loadingCircleContainer)
                }
                numFails++
            }
        } while (!Window.vLCountriesAPI.countries)

        if (numFails == 0){
            loadingCircleContainer.remove()
        } else{
            if (numFails>=numFailsToShowErrorMsg) {
                const SUCCESS_MSG = 'Success!'
                const emerge = {
                    opacity: [0,1],
                    easing:["linear"]
                }
                const msgAnimation = loadingMsgEl.animate(emerge, {direction: 'reverse', duration: 250, fill: "forwards", iterations:1})
                msgAnimation.finished.then(()=>{
                    loadingMsgEl.textContent = SUCCESS_MSG
                    msgAnimation.reverse()
                    return msgAnimation.finished
                }).then(() => {
                    loadingCircleContainer.classList.add('loaded-appearance')
                    setTimeout(() => loadingCircleContainer.remove(), 2000)    
                })
            }else{
                setTimeout(() => loadingCircleContainer.remove(), 2000)
            }
        }
    }
    

    let decodedUrlPathname = decodeURI(url.pathname)
    
    switch (true){
        case '/'== decodedUrlPathname:
            renderHome(app)
            break
        case /^\/countries\/[a-zA-ZÀ-ú\s\(),\-Å]+$/.test(decodedUrlPathname):
            const REQUESTED_COUNTRY_NAME = getCountryCommonNameFromDetailsUrl(decodedUrlPathname)
            renderDetails(REQUESTED_COUNTRY_NAME, app)
            break
    }
}

