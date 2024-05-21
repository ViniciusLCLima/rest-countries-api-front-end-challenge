import {getCountryImg, getCountryInfosContainer, handleCountryClick} from './helpers.js'



const getCard = (country, app)=>{
    document.querySelector('form').setAttribute('hidden', false)
    const card = document.createElement('a')
    card.addEventListener('click', e => {
        handleCountryClick(e)
        app()
    })
    const flag = getCountryImg(country)
    card.appendChild(flag)
    const name = document.createElement('h2')
    name.textContent = country.name.common
    card.appendChild(name)
    const countryInfos = [{
        title: 'Population',
        val: country.population,
    },{
        title: 'Region',
        val: country.region,
    },{
        title: 'Capital',
        val: country.capital
    }]
    const infosContainer = getCountryInfosContainer(countryInfos)
    card.appendChild(infosContainer)
    card.setAttribute('href', `./countries/${country.name.common}`)
    return card
}

const renderCards = (countries, app) =>{
    const countryDetails = document.querySelector("#countryDetails")
    if (countryDetails) countryDetails.remove()
    const cardsContainer = document.createElement('section')
    cardsContainer.id = 'cardsContainer'
    countries.forEach(country=>{
        console.log(country.name.common)
        cardsContainer.appendChild(getCard(country, app))
    })
    document.querySelector('main').appendChild(cardsContainer)
}

export default renderCards