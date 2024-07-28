
export const getCountryCommonNameFromDetailsUrl = (countryDetailsDecodedPathName)=>{
    const regexpLastPathPart = /(?<=\/)[a-zA-ZÀ-ú\s\(),\-Å]+$/
    const REQUESTED_COUNTRY_NAME = countryDetailsDecodedPathName.match(regexpLastPathPart)[0]
    return REQUESTED_COUNTRY_NAME
}

export const getCountryImgEl = (country, width, height)=>{
    const imgEl = getImgEl(country.flags.svg, country.flags.alt)
    imgEl.setAttribute('width', width)
    imgEl.setAttribute('height', height)
    imgEl.addEventListener('error', e=>e.target.setAttribute('src', country.flags.png))
    return imgEl
}

export const getImgEl = (src, alt, elToAppendIt)=>{
    const imgEl = document.createElement('img')
    imgEl.setAttribute('src', src)
    if (alt) imgEl.setAttribute('alt', alt)
    if (elToAppendIt) elToAppendIt.appendChild(imgEl)
    return imgEl
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

export const handleCountryClick = e =>{
    e.preventDefault()
    const newUrl = new URL(e.currentTarget.href)
    window.history.replaceState({}, '', newUrl)
    Window.vLCountriesAPI.lastVisitedPages.push(Window.vLCountriesAPI.actualPage)
    Window.vLCountriesAPI.actualPage = newUrl.pathname
}

export const setLoadingCircleContainerHeight = (loadingCircleContainer)=>{
    const HEADER_HEIGHT = document.querySelector('header').offsetHeight
    loadingCircleContainer.style.height = `${loadingCircleContainer.offsetHeight - HEADER_HEIGHT}px`
}

export const getNewEl = (tag, id, classes, textContent, elToAppendIt) =>{
    const el = document.createElement(tag)
    if (id) el.id = id
    if (classes){
        for (const aClass of classes){
            el.classList.add(aClass)
        }
    }
    if (textContent) el.textContent = textContent
    if (elToAppendIt) elToAppendIt.appendChild(el)
    return el
}