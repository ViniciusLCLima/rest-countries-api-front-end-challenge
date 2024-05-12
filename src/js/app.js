import getCountries from "./getCountries.js"

export default async function app(){
    Window._cacheVLCountriesAPI = {}

    Window._cacheVLCountriesAPI.countries = await getCountries()

    const getCard = (country)=>{
        const card = document.createElement('div')
        const flag = document.createElement('img')
        flag.setAttribute('alt', country.flags.alt)
        flag.setAttribute('src', country.flags.png)
        card.appendChild(flag)
        const name = document.createElement('h2')
        name.textContent = country.name.official
        card.appendChild(name)
        const cardInfos = [{
            title: 'Population',
            val: country.population,
        },{
            title: 'Region',
            val: country.region,
        },{
            title: 'Capital',
            val: country.capital
        }]
        const infosContainer = document.createElement('p')
        for (const cardInfo of cardInfos){
            const infoDiv = document.createElement('div')
            const titleSpan = document.createElement('span')
            titleSpan.classList.add('infoTitle')
            titleSpan.textContent = cardInfo.title + ': '
            const valSpan = document.createElement('span')
            valSpan.classList.add('infoVal')
            valSpan.textContent = cardInfo.val
            infoDiv.appendChild(titleSpan)
            infoDiv.appendChild(valSpan)
            infosContainer.appendChild(infoDiv)
        }
        card.appendChild(infosContainer)
        return card
    }

    const renderCards = () =>{
        const cardsContainer = document.querySelector('#cardsContainer')
        Window._cacheVLCountriesAPI.countries.forEach(country=>{
            console.log(country)
            cardsContainer.appendChild(getCard(country))})
    }

    renderCards()
}