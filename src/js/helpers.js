export const getCountryImg = (country)=>{
    const img = document.createElement('img')
    img.setAttribute('alt', country.flags.alt)
    img.setAttribute('src', country.flags.png)
    return img
}

export const getCountryInfosContainer = (countryInfos) =>{
    const infosContainer = document.createElement('p')
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
        infosContainer.appendChild(infoDiv)
    }
    return infosContainer
}