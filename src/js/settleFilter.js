import {renderCards} from './home-page-rendering.js'

const searchInput = document.querySelector('#searchInput')
const selectBtn = document.querySelector('#regionFilterSelect .select-btn')
const selectBtnSpan = selectBtn.childNodes[1]
const selectOptionsContainer = document.querySelector('#regionFilterSelect .select-options')
const selectOptions = document.querySelectorAll('#regionFilterSelect .select-options>*>input')
const regions = ['Europe', 'Americas', 'Africa', 'Asia', 'Oceania']


const toggleSelectOptions = () =>{
    if (selectOptionsContainer.classList.contains('open')){
        selectOptionsContainer.classList.remove('open')
    }else{
        selectOptionsContainer.classList.add('open')
        selectOptionsContainer.firstChild.firstChild.focus()
    }
}

const handleFilterChange = (renderCards, app)=>{
    const url = new URL(location)
    const regionFilter = (selectBtnSpan.textContent==='Filter by region:')? '': selectBtnSpan.textContent
    url.searchParams.set('name', searchInput.value)
    url.searchParams.set('region', regionFilter)
    window.history.pushState({}, "", url)
    Window.vLCountriesAPI.filter.name = searchInput.value
    Window.vLCountriesAPI.filter.region = regionFilter
    renderCards(app)
}

const settleFilter = (urlParams, renderCards, app) =>{
    Window.vLCountriesAPI.filter = {}
    Window.vLCountriesAPI.filter.name = urlParams.get('name')
    searchInput.value = Window.vLCountriesAPI.filter.name
    const regionParam = urlParams.get('region')
    Window.vLCountriesAPI.filter.region = (regions.includes(regionParam))? regionParam: undefined
    selectBtnSpan.textContent = (Window.vLCountriesAPI.filter.region) ? Window.vLCountriesAPI.filter.region: selectBtnSpan.textContent
    const form = document.querySelector('form')
    form.addEventListener('submit', e => {
        handleFilterChange(renderCards, app)
        e.preventDefault()
    })
    selectBtn.addEventListener('click', e => {
        e.preventDefault()
        toggleSelectOptions()   
    })
    for (const option of selectOptions){
        option.addEventListener('click', e=>{
            e.preventDefault()
            selectBtnSpan.textContent = e.target.value
            selectBtn.value = e.target.value
            selectOptionsContainer.classList.remove('open')
            handleFilterChange(renderCards, app)
        })
    }
    searchInput.addEventListener('change', e => handleFilterChange(renderCards))
}

export default settleFilter