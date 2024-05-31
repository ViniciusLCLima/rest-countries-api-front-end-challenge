import renderCards from './renderCards.js'

const searchInput = document.querySelector('#searchInput')
const selectBtn = document.querySelector('#regionFilterSelect .select-btn')
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

const handleFilterChange = (renderCards)=>{
    const url = new URL(location)
    url.searchParams.set('name', searchInput.value)
    url.searchParams.set('region', selectBtn.value)
    window.history.pushState({}, "", url)
    Window.vLCountriesAPI.filter.name = searchInput.value
    Window.vLCountriesAPI.filter.region = selectBtn.firstChild.textContent
    renderCards()
}

const settleFilter = (params, renderCards) =>{
    Window.vLCountriesAPI.filter = {}
    Window.vLCountriesAPI.filter.name = params.get('name')
    const regionParam = params.get('region')
    Window.vLCountriesAPI.filter.region = (regions.includes(regionParam))? regionParam: undefined
    const form = document.querySelector('form')
    form.addEventListener('submit', e => {
        handleFilterChange(renderCards)
        e.preventDefault()
    })
    selectBtn.firstChild.textContent = (Window.vLCountriesAPI.filter.region) ? Window.vLCountriesAPI.filter.region: selectBtn.firstChild.textContent
    selectBtn.addEventListener('click', e => {
        e.preventDefault()
        toggleSelectOptions()   
    })
    for (const option of selectOptions){
        option.addEventListener('click', e=>{
            e.preventDefault()
            selectBtn.firstChild.textContent = e.target.value
            selectBtn.value = e.target.value
            selectOptionsContainer.classList.remove('open')
            handleFilterChange(renderCards)
        })
    }
    searchInput.addEventListener('change', e => handleFilterChange(renderCards))
}

export default settleFilter