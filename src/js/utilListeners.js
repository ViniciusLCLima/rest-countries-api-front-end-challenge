const makeSearchInputBeFocusedOnAnyBarClick = ()=>{
    const barDiv = document.querySelector('form>div:nth-child(2)')
    const searchInput = document.getElementById('searchInput')
    barDiv.addEventListener('click',() => {
        searchInput.focus()
    })
}

export default makeSearchInputBeFocusedOnAnyBarClick;