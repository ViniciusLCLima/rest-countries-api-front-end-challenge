import {getCountryImg, getCountryInfosContainer, handleCountryClick} from './helpers.js'
import renderDetails from './details-page.js'


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

export const fixCardsContainerAfterWidthIfNeeded = ()=>{
    const cardsContainerComputedStyle = window.getComputedStyle(cardsContainer)
    if (cardsContainerComputedStyle.justifyContent === "space-between" && cardsContainer.childNodes.length>0){
        const CARDS_WIDTH = parseFloat(window.getComputedStyle(cardsContainer.childNodes[0]).width)
        const CARDS_CONTAINER_MIN_COLUMN_GAP = parseFloat(cardsContainerComputedStyle.columnGap)
        const CARD_PLUS_COLUMN_GAP = CARDS_CONTAINER_MIN_COLUMN_GAP + CARDS_WIDTH
        const CARDS_CONTAINER_WIDTH = parseFloat(cardsContainerComputedStyle.width)
        const NUM_OF_CARDS_IN_EACH_ROW = Math.floor(((CARDS_CONTAINER_WIDTH - CARDS_WIDTH)/(CARD_PLUS_COLUMN_GAP))) + 1
        const NUM_OF_COLUMN_GAPS_IN_EACH_ROW = NUM_OF_CARDS_IN_EACH_ROW - 1
        const ACTUAL_COLUMN_GAP = (CARDS_CONTAINER_WIDTH - (NUM_OF_CARDS_IN_EACH_ROW * CARDS_WIDTH))/ NUM_OF_COLUMN_GAPS_IN_EACH_ROW
        const REMAINDER_CARDS = cardsContainer.childNodes.length % NUM_OF_CARDS_IN_EACH_ROW
        if (REMAINDER_CARDS == 0){
            document.documentElement.style.setProperty('--cardsContainerAfterContent', "none")    
        } else{
            const LAST_ROW_MISSING_CARDS_NUM = NUM_OF_CARDS_IN_EACH_ROW - REMAINDER_CARDS
            const LAST_ROW_MISSING_COLUMNS_NUM = LAST_ROW_MISSING_CARDS_NUM - 1
            const AFTER_ELEMENT_WIDTH = LAST_ROW_MISSING_CARDS_NUM * CARDS_WIDTH + ACTUAL_COLUMN_GAP * LAST_ROW_MISSING_COLUMNS_NUM
            document.documentElement.style.setProperty('--cardsContainerAfterWidth', `${AFTER_ELEMENT_WIDTH}px`)
            document.documentElement.style.setProperty('--cardsContainerAfterContent', "''") 
        }
    }
}

export const renderCards = (app) =>{
    const countries = getFilteredCountries()
    if (cardsContainer.hasChildNodes()) cardsContainer.replaceChildren()
    countries.forEach(country=>{
        cardsContainer.appendChild(getCard(country, app))
    })
    fixCardsContainerAfterWidthIfNeeded()
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
    window.addEventListener('resize', fixCardsContainerAfterWidthIfNeeded)
    renderCards(app)
}