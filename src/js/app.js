import getCountries from "./getCountries.js"
import renderCards from "./renderCards.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"

export default async function app(){
    Window._cacheVLCountriesAPI = {}
    Window._cacheVLCountriesAPI.countries = await getCountries()
    Window._cacheVLCountriesAPI.filter = {}
    const url = new URL(location)
    let decodedUrlPathname = decodeURI(url.pathname)
    switch (true){
        case '/'== decodedUrlPathname:
            settleFilter()
            renderCards(Window._cacheVLCountriesAPI.countries)
            break
        case /^\/countries\/[a-zA-ZÀ-ú\s\(),\-Å]+$/.test(decodedUrlPathname):
            const regexpLastPathPart = /(?<=\/)[a-zA-ZÀ-ú\s\(),\-Å]+$/
            const REQUESTED_COUNTRY_NAME = decodedUrlPathname.match(regexpLastPathPart)[0]
            console.log(REQUESTED_COUNTRY_NAME)
            renderDetails(REQUESTED_COUNTRY_NAME)
            break
    }
}

