import getCountries from "./js/getCountries.js"

Window._cacheVLCountriesAPI = {}

getCountries().then(countriesAnswer=>{
    Window._cacheVLCountriesAPI.countries = countriesAnswer
})



