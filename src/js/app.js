import getCountries from "./getCountries.js"
import renderCards from "./renderCards.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"

if (typeof Window.vLCountriesAPI == "undefined") {
    Window.vLCountriesAPI = {}
}
console.log("HIIIII")

export default async function app(){
    console.log("app executed")
    const url = new URL(location)
    
    if (Window.vLCountriesAPI.actualPage){
        Window.vLCountriesAPI.lastVisitedPages.push(Window.vLCountriesAPI.actualPage)
    } else {
        Window.vLCountriesAPI.lastVisitedPages = []
    }
    Window.vLCountriesAPI.actualPage = (url.pathname)
    Window.vLCountriesAPI.filter = (typeof Window.vLCountriesAPI.filter == "undefined")? {} : Window.vLCountriesAPI.filter
    Window.vLCountriesAPI.countries = (typeof Window.vLCountriesAPI.countries == "undefined") ? await getCountries() : Window.vLCountriesAPI.countries

    
    console.log(url)
    let decodedUrlPathname = decodeURI(url.pathname)
    
    switch (true){
        case '/'== decodedUrlPathname:
            settleFilter()
            renderCards(Window.vLCountriesAPI.countries,app)
            break
        case /^\/countries\/[a-zA-ZÀ-ú\s\(),\-Å]+$/.test(decodedUrlPathname):
            const regexpLastPathPart = /(?<=\/)[a-zA-ZÀ-ú\s\(),\-Å]+$/
            const REQUESTED_COUNTRY_NAME = decodedUrlPathname.match(regexpLastPathPart)[0]
            console.log(REQUESTED_COUNTRY_NAME)
            renderDetails(REQUESTED_COUNTRY_NAME, app)
            break
    }
}

