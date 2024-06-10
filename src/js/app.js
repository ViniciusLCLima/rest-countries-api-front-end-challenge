import getCountries from "./getCountries.js"
import renderCards from "./renderCards.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"
import countries from "./apidata.js"
import  makeSearchInputBeFocusedOnAnyBarClick from "./utilListeners.js"
import {getCountryCommonNameFromDetailsUrl} from "./helpers.js"

if (typeof Window.vLCountriesAPI == "undefined") {
    Window.vLCountriesAPI = {}
}

export default async function app(cameFromThisSiteBackBtn){
    console.log("app executed")
    makeSearchInputBeFocusedOnAnyBarClick()
    const url = new URL(location)
    console.log(url)
    if (!Window.vLCountriesAPI.isFilterSettled){
        settleFilter(url.searchParams, renderCards)
        Window.vLCountriesAPI.isFilterSettled = true
    }

    if (!cameFromThisSiteBackBtn){
        if (Window.vLCountriesAPI.actualPage){
            Window.vLCountriesAPI.lastVisitedPages.push(Window.vLCountriesAPI.actualPage)
        } else {
            Window.vLCountriesAPI.lastVisitedPages = []
        }
    }

    Window.vLCountriesAPI.actualPage = url.pathname
    while (!Window.vLCountriesAPI.countries) {
        try{
            Window.vLCountriesAPI.countries =  await getCountries()
        } catch (err){
            console.log(err)
            console.log('Unable to get countries data, trying again...')
            Window.vLCountriesAPI.countries = countries
        }
    }

    
    let decodedUrlPathname = decodeURI(url.pathname)
    
    switch (true){
        case '/'== decodedUrlPathname:
            renderCards(app)
            break
        case /^\/countries\/[a-zA-ZÀ-ú\s\(),\-Å]+$/.test(decodedUrlPathname):
            const REQUESTED_COUNTRY_NAME = getCountryCommonNameFromDetailsUrl(decodedUrlPathname)
            renderDetails(REQUESTED_COUNTRY_NAME, app)
            break
    }
}

