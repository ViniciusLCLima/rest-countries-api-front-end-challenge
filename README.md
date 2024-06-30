# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot

![App screenshot. Contains a header saying "Where in the world" with a button to change the mode from light to dark and, below it, country cards with country flags and information in a grid.](./App Screen Shot.jpg)

### Links

<!-- - Solution URL: [Add solution URL here](https://your-solution-url.com) -->
- Live Site URL: [https://rest-countries-api-front-end-challenge.vercel.app/](https://rest-countries-api-front-end-challenge.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript

### What I learned

I've found it challenging to implement the back button of the app because this return should occur without the page reloading, so that the API data does not have to be requested again, worsening performance.
I've implemented it by storing the pages already visited by the user in that session and, when they click the back button, instead of simply returning 1 page through the history.back method, I use the history.replaceState method, which changes the current url withouth redirecting the page and then I call the app function which executes the app which, in turn, will use the url to render the previous page.
```js
    if (numVisitedInThisSite>0){
        window.history.replaceState({}, '', location.origin + Window.vLCountriesAPI.lastVisitedPages.pop())
        app(true)
        return
    }
```

It was also a difficult task to architecture the code so that some parts of home page were only tried to be rendered when needed. In order to do that, I've divided the function "renderCards" in 2 functions: "renderCards" and "renderHome", which calls "renderCards". When the user uses the form to filter countries, only renderCards needs to be called because the form is already rendered.
```js
    Window.vLCountriesAPI.filter.name = searchInput.value
    Window.vLCountriesAPI.filter.region = regionFilter
    renderCards(app)
```  
  
On the other hand, if the user is entering the site for the first time, render home needs to be called.
```js
    switch (true){
        case '/'== decodedUrlPathname:
            renderHome(app)
            break
```

### Continued development

For the future, I'm aiming to work on front-end frameworks and libraries and CSS preprocessors.

### Useful resources

- [Quais são as práticas recomendadas para nomear classes CSS e IDs no desenvolvimento front-end?](https://www.linkedin.com/advice/0/what-best-practices-naming-css-classes-ids-front-end-ecv7e) - This helped me to get a better understading about what is expected in industry in respect to the naming and use of css ids and classes.
- [JavaScript MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - This helped me understand better some JavaScript features.

## Author

- Website - [Vinícius Leite do Carmo Lima](https://viniciuslclima.github.io/)
