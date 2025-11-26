
const title = document.querySelector('.titles')
const flagImage = document.querySelector('.image')
const nativeNames = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region =document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies= document.querySelector('.currencies')
const languages= document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const darkMode =document.querySelector('.dark-mode')



const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');

     modeText.textContent = 'Light mode';
    themeIcon.className = 'fa-solid fa-sun';
}
const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country)
    flagImage.src = country.flags.svg
    title.innerText = country.name.common
    
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText= country.region
    topLevelDomain.innerText = country.tld.join(', ')

    
    if(country.name.nativeName){
     nativeNames.innerText = Object.values(country.name.nativeName)[0].common
  }
  else{
    nativeNames.innerText= country.name.common
  }

   if(country.subregion){
     subRegion.innerText = country.subregion}

   if(country.capital){
    capital.innerText=country.capital?.[0]
   }

       if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if(country.languages){
      languages.innerText= Object.values(country.languages).join(', ')
    }


    country.borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then(res => res.json())
        .then(([countryBoarder])=>{
          
        const BordersTag =  document.createElement('a')
        BordersTag.href = `./country.html?name=${countryBoarder.name.common}`
        BordersTag.innerText = countryBoarder.name.common
        borderCountries.append(BordersTag)
        }
      )
    });
  })


darkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');

    modeText.textContent = 'Light mode';
    themeIcon.className = 'fa-solid fa-sun';

  } else {
    localStorage.setItem('theme', 'light');

    modeText.textContent = 'Dark mode';
    themeIcon.className = 'fa-regular fa-moon';
  }
});
