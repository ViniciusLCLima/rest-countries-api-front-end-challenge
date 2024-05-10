import getCountries from "./js/getCountries.js"

let countries;

getCountries().then(countriesAnswer=>{
    console.log(countriesAnswer)
})

console.log(countries)