import getCountries from "./getCountries.js"
import renderCards from "./renderCards.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"

export default async function app(){
    Window._cacheVLCountriesAPI = {}
    Window._cacheVLCountriesAPI.countries = await getCountries()
    Window._cacheVLCountriesAPI.filter = {}
    let url = new URL(location)
    console.log(url)
    switch (true){
        case '/'== url.pathname:
            settleFilter()
            renderCards(Window._cacheVLCountriesAPI.countries)
            break
        case /^\/countries\/[a-zA-Z]+$/.test(url.pathname):
            const regexpLastPathPart = /\b[a-zA-Z-,]+$/
            const REQUESTED_COUNTRY_NAME = url.pathname.match(regexpLastPathPart)[0]
            console.log(REQUESTED_COUNTRY_NAME)
            renderDetails(REQUESTED_COUNTRY_NAME)
            break
        default:
            console.log('HEY')
    }
}

