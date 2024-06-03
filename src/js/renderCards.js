import {getCountryImg, getCountryInfosContainer, handleCountryClick} from './helpers.js'



const getCard = (country, app)=>{
    document.querySelector('form').removeAttribute('hidden')
    const card = document.createElement('a')
    card.addEventListener('click', e => {
        handleCountryClick(e)
        app()
    })
    const flag = getCountryImg(country)
    card.appendChild(flag)
    const textContainer = document.createElement('div')
    const name = document.createElement('h2')
    name.textContent = country.name.common
    card.appendChild(name)
    const countryInfos = [{
        title: 'Population',
        val:  new Intl.NumberFormat('en-US').format(
            country.population,
          )
    },{
        title: 'Region',
        val: country.region,
    },{
        title: 'Capital',
        val: country.capital
    }]
    const infosContainer = getCountryInfosContainer(countryInfos)
    textContainer.appendChild(name)
    textContainer.appendChild(infosContainer)
    card.appendChild(textContainer)
    card.setAttribute('href', `./countries/${country.name.common}`)
    return card
}

const getFilteredCountries = () =>{
    const {countries} = Window.vLCountriesAPI
    const {name, region} = Window.vLCountriesAPI.filter
    const filteredCountries = (name||region) ? countries.filter(country => (country.region == region || region == '') && (country.name.common.toLowerCase().includes(name.toLowerCase()) || country.name.official.toLowerCase().includes(name.toLowerCase()))): countries
    return filteredCountries;
}

const renderCards = (app) =>{
    const countries = getFilteredCountries()
    let cardsContainer = document.querySelector('#cardsContainer')
    if (cardsContainer){
        if (cardsContainer.hasChildNodes()){
            cardsContainer.replaceChildren()
        }
    } else {
        cardsContainer = document.createElement('section')
        cardsContainer.id = 'cardsContainer'
    }
    const countryDetails = document.querySelector("#countryDetails")
    if (countryDetails) countryDetails.remove()
    countries.forEach(country=>{
        console.log(country.name.common)
        cardsContainer.appendChild(getCard(country, app))
    })
    
    document.querySelector('main').appendChild(cardsContainer)
}

export default renderCards