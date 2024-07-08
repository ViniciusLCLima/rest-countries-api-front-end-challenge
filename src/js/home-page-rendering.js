import {getCountryImg, getCountryInfosContainer, handleCountryClick} from './helpers.js'
import renderDetails from './renderDetails.js'


const cardsContainer = document.createElement('section')

const getCard = (country, app)=>{
    const card = document.createElement('a')
    card.addEventListener('click', e => {
        handleCountryClick(e)
        renderDetails(country.name.common, app)
    })
    const flag = getCountryImg(country, '265px', '160px')
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
    const filteredCountries = (name||region) ? countries.filter(country => (country.region == region || region == '' || region == undefined) && (country.name.common.toLowerCase().includes(name.toLowerCase()))): countries
    return filteredCountries;
}

export const renderCards = (app) =>{
    const countries = getFilteredCountries()
    if (cardsContainer.hasChildNodes()) cardsContainer.replaceChildren()
    countries.forEach(country=>{
        cardsContainer.appendChild(getCard(country, app))
    })
}

export const renderHome = (app) =>{
    document.querySelector('form').removeAttribute('hidden')
    const mainElem = document.querySelector('main')
    cardsContainer.id = 'cardsContainer'
    const loadingCircleContainer = document.querySelector('#loadingCircleContainer')
    if (loadingCircleContainer){
        loadingCircleContainer.addEventListener('transitionend', ()=>{
            mainElem.appendChild(cardsContainer)
        })
    } else{
        mainElem.appendChild(cardsContainer)
    }
    const countryDetailsPage = document.querySelector("#countryDetailsPage")
    if (countryDetailsPage) countryDetailsPage.remove()
    renderCards(app)
}