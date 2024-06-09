export const getCountryImg = (country, width, height)=>{
    const img = document.createElement('img')
    const titleStr = `${country.name.official}'s flag.`
    const title = document.createElement('title')
    const desc = document.createElement('desc')
    title.textContent = titleStr
    desc.textContent = country.flags.alt
    img.setAttribute('src', country.flags.svg)
    img.setAttribute('width', width)
    img.setAttribute('height', height)
    img.setAttribute('alt', country.flags.alt)
    img.addEventListener('error', e=>this.src = country.flags.png)
    // svg.setAttribute('aria-label', `${titleStr} ${country.flags.alt}`)
    // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    // svg.setAttribute('role', 'img')
    // svg.setAttribute('width', '265px')
    // svg.setAttribute('height', '160px')
    // svg.appendChild(title)
    // svg.appendChild(desc)
    // svg.appendChild(img)
    // img.setAttribute('href', country.flags.svg)
    // img.setAttribute('width', '265px')
    // img.setAttribute('height', '160px')
    // img.setAttribute('src', country.flags.png)
    return img
}

export const getCountryInfosContainer = (countryInfos) =>{
    const infosContainer = document.createElement('p')
    let infosBlock = document.createElement('div')
    infosContainer.appendChild(infosBlock)
    for (const countryInfo of countryInfos){
        const infoDiv = document.createElement('div')
        const titleSpan = document.createElement('span')
        titleSpan.classList.add('infoTitle')
        titleSpan.textContent = countryInfo.title + ': '
        const valSpan = document.createElement('span')
        valSpan.classList.add('infoVal')
        valSpan.textContent = countryInfo.val
        infoDiv.appendChild(titleSpan)
        infoDiv.appendChild(valSpan)
        if (countryInfo.title == 'Top Level Domain'){
            infosBlock = document.createElement('div')
            infosContainer.appendChild(infosBlock)
        }
        infosBlock.appendChild(infoDiv)
    }
    return infosContainer
}

export const handleCountryClick = evt =>{
    evt.preventDefault()
    const newUrl = new URL(evt.currentTarget.href)
    window.history.pushState({}, "", newUrl)
    Window.vLCountriesAPI.lastVisitedPages.push(Window.vLCountriesAPI.actualPage)
    Window.vLCountriesAPI.actualPage = newUrl.pathName
}