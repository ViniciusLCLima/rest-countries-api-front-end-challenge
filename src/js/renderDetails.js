import {getCountryImg, getCountryInfosContainer} from './helpers.js'
import {handleCountryClick} from './helpers.js'

const getCountryNativeName = (country) =>{
    const NATIVE_NAME_KEY = Object.keys(country.languages)[0]
    return country.name.nativeName[NATIVE_NAME_KEY].common
}

const getBorderCountry = (cca3) =>{
    return Window.vLCountriesAPI.countries.find(country => country.cca3 === cca3)
}

const getCountry = (countryCommonName)=>{
    return Window.vLCountriesAPI.countries.find(country => country.name.common.toLowerCase() === countryCommonName.toLowerCase())
}

const renderDetails = (countryCommonName, app) => {
    document.querySelector('Form').setAttribute('hidden', '')
    const cardsContainer = document.querySelector('#cardsContainer')
    if (cardsContainer){
        cardsContainer.remove()
    }
    let countryDetailsContainer = document.querySelector('#countryDetails')
    if (countryDetailsContainer){
        countryDetailsContainer.replaceChildren()
    } else {
        countryDetailsContainer = document.createElement('div')
        countryDetailsContainer.id = 'countryDetails'
    }
    const main = document.querySelector('main')
    const backBtn = document.createElement('a')
    backBtn.setAttribute('href', "#")
    backBtn.addEventListener('click', e => {
        e.preventDefault()
        const numVisitedInThisSite = Window.vLCountriesAPI.lastVisitedPages.length
        if (numVisitedInThisSite>0){
            window.history.pushState({}, "", location.origin + Window.vLCountriesAPI.lastVisitedPages[numVisitedInThisSite-1])
            app()
            return
        }
        history.back()
    })
    backBtn.textContent = 'Back'
    countryDetailsContainer.appendChild(backBtn)
    const country = getCountry(countryCommonName)
    const img = getCountryImg(country)
    countryDetailsContainer.appendChild(img)
    const header = document.createElement('h2')
    header.textContent = country.name.common
    countryDetailsContainer.appendChild(header)
    const nativeName = getCountryNativeName(country)
    const countryInfos = [
        {
            title:'Native name',
            val:nativeName
        },
        {
            title: 'Population',
            val: new Intl.NumberFormat('US').format(country.population),
        },
        {
            title: 'Region',
            val: country.region,
        },
        {
            title:'Sub Region',
            val: country.subregion
        },
        {
            title: 'Capital',
            val: country.capital
        },
        {
            title:'Top Level Domain',
            val:country.tld[0]
        },
        {
            title:'Currencies',
            val:Object.keys(country.currencies).map(key => country.currencies[key].name).join(', ')
        },
        {
            title:'Languages',
            val:Object.keys(country.languages).map(key => country.languages[key]).reverse().join(', ')
        },
    ]
    console.log(country)
    const countryInfosContainer = getCountryInfosContainer(countryInfos)
    countryDetailsContainer.appendChild(countryInfosContainer)
    const borderCountriesDiv = document.createElement('div')
    const borderCountriesTitleSpan = document.createElement('span')
    borderCountriesTitleSpan.classList.add('infoTitle')
    borderCountriesTitleSpan.textContent = 'Border Countries:'
    borderCountriesDiv.appendChild(borderCountriesTitleSpan)
    const borderCountriesBtnsDiv = document.createElement('div')
    const baseUrl = new URL(location).origin
    if (country.borders){
        for (const borderCountryCca3 of country.borders){
            const borderCountry = getBorderCountry(borderCountryCca3)
            const btn = document.createElement('a')
            btn.addEventListener('click', e=>{
                handleCountryClick(e)
                app()
            })
            btn.setAttribute('href',`${baseUrl}/countries/${borderCountry.name.common}`)
            btn.classList.add('border-country-btn', 'btn')
            btn.textContent = borderCountry.name.common
            borderCountriesBtnsDiv.appendChild(btn)
        }
        borderCountriesDiv.appendChild(borderCountriesBtnsDiv)
    } else{
        const noBorderCountriesMsg = document.createElement('span')
        noBorderCountriesMsg.classList.add('no-border-countries-msg')
        noBorderCountriesMsg.textContent = "None"
        borderCountriesDiv.appendChild(noBorderCountriesMsg)
    }
    countryDetailsContainer.appendChild(borderCountriesDiv)
    main.appendChild(countryDetailsContainer)
}

export default renderDetails