import renderCards from './renderCards.js'

const searchInput = document.querySelector('#searchInput')
const dropDownFilter = document.querySelector('#dropDownFilter')

const filterCountries = () =>{
    const {countries} = Window._cacheVLCountriesAPI
    const {name, region} = Window._cacheVLCountriesAPI.filter
    const filteredCountries = countries.filter(country => country.region == region && (country.name.common.includes(name) || country.name.official.includes(name)))
    const cardsContainer = document.querySelector('#cardsContainer')
    cardsContainer.replaceChildren()
    renderCards(filteredCountries)
}

const handleFilterChange = ()=>{
    const url = new URL(location)
    url.searchParams.set('name', searchInput.value)
    url.searchParams.set('region', dropDownFilter.value)
    window.history.pushState({}, "", url)
    Window._cacheVLCountriesAPI.filter.name = searchInput.value
    Window._cacheVLCountriesAPI.filter.region = dropDownFilter.value
    filterCountries()
}

const settleFilter = () =>{
    dropDownFilter.addEventListener('change', handleFilterChange)
    searchInput.addEventListener('change', handleFilterChange)
}

export default settleFilter