import renderCards from './renderCards.js'

const searchInput = document.querySelector('#searchInput')
const dropDownFilter = document.querySelector('#dropDownFilter')

const getFilteredCountries = () =>{
    const {countries} = Window.vLCountriesAPI
    const {name, region} = Window.vLCountriesAPI.filter
    const filteredCountries = (name||region) ? countries.filter(country => (country.region == region || region == '') && (country.name.common.toLowerCase().includes(name.toLowerCase()) || country.name.official.toLowerCase().includes(name.toLowerCase()))): countries
    return filteredCountries;
}

const handleFilterChange = ()=>{
    const url = new URL(location)
    url.searchParams.set('name', searchInput.value)
    url.searchParams.set('region', dropDownFilter.value)
    window.history.pushState({}, "", url)
    Window.vLCountriesAPI.filter.name = searchInput.value
    Window.vLCountriesAPI.filter.region = dropDownFilter.value
    renderCards(getFilteredCountries())
}

const settleFilter = (params) =>{
    Window.vLCountriesAPI.filter.name = params.get('name')
    Window.vLCountriesAPI.filter.region = params.get('region')
    dropDownFilter.addEventListener('change', handleFilterChange)
    searchInput.addEventListener('change', handleFilterChange)
    Window.vLCountriesAPI.filteredCountries = getFilteredCountries()
}

export default settleFilter