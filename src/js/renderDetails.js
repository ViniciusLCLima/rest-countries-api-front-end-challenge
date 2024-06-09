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
    document.querySelector('Form').setAttribute('hidden', 'hidden')
    const cardsContainer = document.querySelector('#cardsContainer')
    if (cardsContainer){
        cardsContainer.remove()
    }
    let countryDetailsPage = document.querySelector('#countryDetailsPage')
    if (countryDetailsPage){
        countryDetailsPage.replaceChildren()
    } else {
        countryDetailsPage = document.createElement('div')
        countryDetailsPage.id = 'countryDetailsPage'
    }
    const main = document.querySelector('main')
    const backBtn = document.createElement('a')
    backBtn.classList.add('btn')
    const backArrow = document.createElement('i')
    backArrow.classList.add('fa-solid', 'fa-arrow-left-long')
    backBtn.textContent = 'Back'
    backBtn.insertBefore(backArrow, backBtn.firstChild)
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
    countryDetailsPage.appendChild(backBtn)
    const countryDetailsDiv = document.createElement('div')
    countryDetailsPage.appendChild(countryDetailsDiv)
    const country = getCountry(countryCommonName)
    const img = getCountryImg(country)
    countryDetailsDiv.appendChild(img)
    const header = document.createElement('h2')
    header.textContent = country.name.common
    const countryInfosContainer = document.createElement('div')
    countryInfosContainer.appendChild(header)
    const nativeName = getCountryNativeName(country)
    const countryInfos = [
        {
            title:'Native Name',
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
    const countryStaticInfos = getCountryInfosContainer(countryInfos)
    countryInfosContainer.appendChild(countryStaticInfos)
    const borderCountriesDiv = document.createElement('div')
    const borderCountriesTitleSpan = document.createElement('span')
    borderCountriesTitleSpan.classList.add('infoTitle')
    borderCountriesTitleSpan.textContent = 'Border Countries:'
    borderCountriesDiv.appendChild(borderCountriesTitleSpan)
    borderCountriesDiv.classList.add('border-countries-container')
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
    countryInfosContainer.appendChild(borderCountriesDiv)
    countryDetailsDiv.appendChild(countryInfosContainer)
    main.appendChild(countryDetailsPage)
}

export default renderDetails