import getCountries from "./getCountries.js"
import renderCards from "./renderCards.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"

export default async function app(){
    Window._cacheVLCountriesAPI = {}
    Window._cacheVLCountriesAPI.countries = await getCountries()
    Window._cacheVLCountriesAPI.filter = {}
    let urlPathname = decodeURI(new URL(location).pathname)
    switch (true){
        case '/'== urlPathname:
            settleFilter()
            renderCards(Window._cacheVLCountriesAPI.countries)
            break
        case /^\/countries\/[a-zA-ZÀ-ú\s\(),\-Å]+$/.test(urlPathname):
            const regexpLastPathPart = /(?<=\/)[a-zA-ZÀ-ú\s\(),\-Å]+$/
            const REQUESTED_COUNTRY_NAME = urlPathname.match(regexpLastPathPart)[0]
            console.log(REQUESTED_COUNTRY_NAME)
            renderDetails(REQUESTED_COUNTRY_NAME)
            break
    }
}

