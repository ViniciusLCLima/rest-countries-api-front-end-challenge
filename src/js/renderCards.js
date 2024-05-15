import {getCountryImg, getCountryInfosContainer} from './helpers.js'

const getCard = (country)=>{
    const card = document.createElement('a')
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

const renderCards = (countries) =>{
    const cardsContainer = document.querySelector('#cardsContainer')
    console.log("hi")
    countries.forEach(country=>{
        console.log(country)
        cardsContainer.appendChild(getCard(country))
    })
}

export default renderCards