import renderCards from './renderCards.js'

const searchInput = document.querySelector('#searchInput')
const dropDownFilter = document.querySelector('#dropDownFilter')

const filterCountries = () =>{
    const {countries} = Window.vLCountriesAPI
    const {name, region} = Window.vLCountriesAPI.filter
    const filteredCountries = countries.filter(country => (country.region == region || region == '') && (country.name.common.toLowerCase().includes(name.toLowerCase()) || country.name.official.toLowerCase().includes(name.toLowerCase())))
    const cardsContainer = document.querySelector('#cardsContainer')
    cardsContainer.replaceChildren()
    renderCards(filteredCountries)
}

const handleFilterChange = ()=>{
    const url = new URL(location)
    url.searchParams.set('name', searchInput.value)
    url.searchParams.set('region', dropDownFilter.value)
    window.history.pushState({}, "", url)
    Window.vLCountriesAPI.filter.name = searchInput.value
    Window.vLCountriesAPI.filter.region = dropDownFilter.value
    filterCountries()
}

const settleFilter = () =>{
    dropDownFilter.addEventListener('change', handleFilterChange)
    searchInput.addEventListener('change', handleFilterChange)
}

export default settleFilter