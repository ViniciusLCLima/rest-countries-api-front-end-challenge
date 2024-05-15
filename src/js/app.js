import getCountries from "./getCountries.js"
import renderCards from "./renderCards.js"
import settleFilter from "./settleFilter.js"
import renderDetails from "./renderDetails.js"

export default async function app(){
    Window._cacheVLCountriesAPI = {}
    Window._cacheVLCountriesAPI.countries = await getCountries()
    Window._cacheVLCountriesAPI.filter = {}
    settleFilter()
    renderCards(Window._cacheVLCountriesAPI.countries)
    renderDetails('belgium')
}

