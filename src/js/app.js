import getCountries from "./getCountries.js"
import renderCards from "./renderCards.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"
import countries from "./apidata.js"

if (typeof Window.vLCountriesAPI == "undefined") {
    Window.vLCountriesAPI = {}
}

export default async function app(){
    console.log("app executed")
    const url = new URL(location)
    if (!Window.vLCountriesAPI.isFilterSettled){
        settleFilter(url.searchParams, renderCards)
        Window.vLCountriesAPI.isFilterSettled = true
    }

    if (Window.vLCountriesAPI.actualPage){
        Window.vLCountriesAPI.lastVisitedPages.push(Window.vLCountriesAPI.actualPage)
    } else {
        Window.vLCountriesAPI.lastVisitedPages = []
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
            const regexpLastPathPart = /(?<=\/)[a-zA-ZÀ-ú\s\(),\-Å]+$/
            const REQUESTED_COUNTRY_NAME = decodedUrlPathname.match(regexpLastPathPart)[0]
            console.log(REQUESTED_COUNTRY_NAME)
            renderDetails(REQUESTED_COUNTRY_NAME, app)
            break
    }
}

