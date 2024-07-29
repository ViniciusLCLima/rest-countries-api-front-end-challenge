import {settleCardsSection} from './home-page-rendering.js'
import {getEmergeAnimation} from './helpers.js'

const selectOptionsElsSelector = '#regionFilterSelect .select-options>*>input'
const searchInput = document.querySelector('#searchInput')
const selectBtn = document.querySelector('#regionFilterSelect .select-btn')
const selectBtnSpan = selectBtn.childNodes[0]
const selectOptionsContainer = document.querySelector('#regionFilterSelect .select-options')
const selectOptions = document.querySelectorAll(selectOptionsElsSelector)
const regions = ['Europe', 'Americas', 'Africa', 'Asia', 'Oceania']


const toggleSelectOptions = () =>{
    if (selectOptionsContainer.classList.contains('open')){
        selectOptionsContainer.classList.remove('open')
    }else{
        selectOptionsContainer.classList.add('open')
        selectOptionsContainer.firstChild.firstChild.focus()
    }
}

const makeFilterChangeAnimation = async ()=>{
    const cardsContainer = document.querySelector('#cardsContainer')
    const vanishAnimationTime = 300
    const emergeAnimationKeyframes = {opacity: [0,1]}
    const disappearingAnimation = cardsContainer.animate(emergeAnimationKeyframes, {
        duration: vanishAnimationTime,
        fill: 'forwards',
        direction: 'reverse'
    })
    await disappearingAnimation.finished
}

const handleFilterChange = async (app)=>{
    const url = new URL(location)
    const regionFilter = (selectBtnSpan.textContent==='Filter by region:')? '': selectBtnSpan.textContent
    url.searchParams.set('name', searchInput.value)
    url.searchParams.set('region', regionFilter)
    window.history.pushState({}, "", url)
    Window.vLCountriesAPI.filter.name = searchInput.value
    Window.vLCountriesAPI.filter.region = regionFilter
    await makeFilterChangeAnimation()
    settleCardsSection(app, true)
}

const handleRegionSelection = (e, app) =>{
    e.preventDefault()
    selectBtnSpan.textContent = e.target.value
    selectBtn.value = e.target.value
    selectOptionsContainer.classList.remove('open')
    const precedingSelecetedOptionEl = document.querySelector(selectOptionsElsSelector + '.selected')
    if (precedingSelecetedOptionEl) precedingSelecetedOptionEl.classList.remove('selected')
    e.target.classList.add('selected')
    handleFilterChange(app)
}

const settleFilter = (urlParams, app) =>{
    Window.vLCountriesAPI.filter = {}
    Window.vLCountriesAPI.filter.name = urlParams.get('name')
    searchInput.value = Window.vLCountriesAPI.filter.name
    const regionParam = urlParams.get('region')
    Window.vLCountriesAPI.filter.region = (regions.includes(regionParam))? regionParam: undefined
    if (Window.vLCountriesAPI.filter.region) {
        selectBtnSpan.textContent = regionParam
        selectBtn.value = regionParam
        const regionSelectOptionEl = document.querySelector(`${selectOptionsElsSelector}[value=${regionParam}]`)
        regionSelectOptionEl.classList.add('selected')
    }
    const form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault()
    })
    selectBtn.addEventListener('click', e => {
        e.preventDefault()
        toggleSelectOptions()   
    })
    for (const option of selectOptions){
        option.addEventListener('click', e=>{
            handleRegionSelection(e, app)
        })
    }
    searchInput.addEventListener('change', e => handleFilterChange(app))
}

export default settleFilter