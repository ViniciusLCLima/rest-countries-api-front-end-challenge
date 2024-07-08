import getCountries from "./getCountries.js"
import {renderHome, renderCards} from "./home-page-rendering.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"
// import countries from "./apidata.js" This is for testing purposes only.
import  makeSearchInputBeFocusedOnAnyBarClick from "./utilListeners.js"
import {getCountryCommonNameFromDetailsUrl, setLoadingCircleContainerHeight} from "./helpers.js"
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
    let numTries = 0
    while (!Window.vLCountriesAPI.countries) {
        try{
            Window.vLCountriesAPI.countries =  await getCountries()
            loadingCircleContainer.classList.add("loaded-appearance")
            if (numTries == 0){
                loadingCircleContainer.remove()
            } else{
                setTimeout(() => loadingCircleContainer.remove(), 2000)
            }
        } catch (err){
            console.log(err)
            console.log('Unable to get countries data, trying again...')
//            Window.vLCountriesAPI.countries = countries This is for testing purposes only.
            if (numTries==0){
                loadingCircleContainer.removeAttribute('hidden')
                setLoadingCircleContainerHeight(loadingCircleContainer)
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

