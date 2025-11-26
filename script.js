const countriesContainer = document.querySelector(".countries-container");
const FilterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector('.search-filter input')
const darkMode =document.querySelector('.dark-mode')
const themeIcon = document.getElementById('themeIcon')
const modeText = document.querySelector('#modeText');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');

     modeText.textContent = 'Light mode';
    themeIcon.className = 'fa-solid fa-sun';
}
let allCountriesData

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
)
  .then((res) => res.json())
  .then((data) => {
    renderData(data)
    allCountriesData = data
  })

FilterByRegion.addEventListener("change", (e) => {
  console.log(e.target.value);
  fetch(`https://restcountries.com/v3.1/region/${FilterByRegion.value}`)
    .then((res) => res.json())
    .then(renderData);
});

function renderData(data) {
  countriesContainer.innerHTML = "";
  data.forEach((countries) => {
    // console.log(countries)
    const countryCard = document.createElement("a");
    countryCard.classList.add("countries-card");
    countryCard.href = `./country.html?name=${countries.name.common}`;
    countryCard.innerHTML = ` 
        <img src="${countries.flags.svg}" alt="" />
        <div class="text-container">
            <h2 class="text-title">${countries.name.common}</h2>
            <p><b>Population: </b> ${countries.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region: </b> ${countries.region}</p>
            <p><b>Capital: </b> ${countries.capital?.[0]}</p>
        </div>`;

    countriesContainer.append(countryCard);
  });
}


searchInput.addEventListener('input',(e)=>{
  
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
   renderData(filteredCountries)
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
