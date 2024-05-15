import {getCountryImg, getCountryInfosContainer} from './helpers.js'

const getCountryNativeName = (country) =>{
    const NATIVE_NAME_KEY = Object.keys(country.languages)[0]
    return country.name.nativeName[NATIVE_NAME_KEY].common
}

const getBorderCountry = (cca3) =>{
    return Window._cacheVLCountriesAPI.countries.find(country => country.cca3 === cca3)
}

const getCountry = (countryCommonName)=>{
    return Window._cacheVLCountriesAPI.countries.find(country => country.name.common.toLowerCase() === countryCommonName.toLowerCase())
}

const renderDetails = (countryCommonName) => {
    const main = document.querySelector('main')
    main.id = 'countryDetails'
    main.replaceChildren()
    const backBtn = document.createElement('a')
    backBtn.setAttribute('href', "#")
    backBtn.addEventListener('click', history.back)
    backBtn.textContent = 'Back'
    main.appendChild(backBtn)
    const country = getCountry(countryCommonName)
    const img = getCountryImg(country)
    main.appendChild(img)
    const header = document.createElement('h2')
    header.textContent = country.name.common
    main.appendChild(header)
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
    const countryInfosContainer = getCountryInfosContainer(countryInfos)
    main.appendChild(countryInfosContainer)
    const borderCountriesDiv = document.createElement('div')
    const borderCountriesTitleSpan = document.createElement('span')
    borderCountriesTitleSpan.classList.add('infoTitle')
    borderCountriesTitleSpan.textContent = 'Border Countries:'
    borderCountriesDiv.appendChild(borderCountriesTitleSpan)
    const borderCountriesBtnsDiv = document.createElement('div')
    const baseUrl = new URL(location).origin
    for (const borderCountryCca3 of country.borders){
        const borderCountry = getBorderCountry(borderCountryCca3)
        const btn = document.createElement('a')
        btn.setAttribute('href',`${baseUrl}/countries/${borderCountry.name.common}`)
        btn.classList.add('border-country-btn', 'btn')
        btn.textContent = borderCountry.name.common
        borderCountriesBtnsDiv.appendChild(btn)
    }
    borderCountriesDiv.appendChild(borderCountriesBtnsDiv)
    main.appendChild(borderCountriesDiv)
}

export default renderDetails