// https://restcountries.eu/rest/v2/all
// API com informações sobre os países

let divAllCountries = null;
let divFavCountries = null;

let countriesList = [];
let favoriteCountriesList = [];

let countAllCountries = 0;
let countFavCountries = 0;

let totalAllPopulation = 0;
let totalFavPopulation = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  divAllCountries = document.querySelector('#allCountries');
  divFavCountries = document.querySelector('#favCountries');

  countAllCountries = document.querySelector('#countAllCountries');
  countFavCountries = document.querySelector('#countFavCountries');

  totalAllPopulation = document.querySelector('#totalAllPopulation');
  totalFavPopulation = document.querySelector('#totalFavPopulation');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

function render() {
  function constructContentList(div, parentId) {
    div.innerHTML = '';

    let currCountriesList =
      parentId === 'allCountries'
        ? countriesList.sort((country, next) => {
            return country.name.localeCompare(next.name);
          })
        : parentId === 'favCountries'
        ? favoriteCountriesList.sort((country, next) => {
            return country.name.localeCompare(next.name);
          })
        : [];

    const ulCountriesList = document.createElement('ul');
    currCountriesList.forEach((country) => {
      const liCountry = document.createElement('li');
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('countryDiv');
      countryDiv.id = country.id;

      const addFavoriteButton = document.createElement('button');
      addFavoriteButton.textContent = parentId === 'allCountries' ? '+' : '-';
      addFavoriteButton.classList.add(
        parentId === 'allCountries' ? 'addFavoriteButton' : 'rmvFavoriteButton'
      );
      countryDiv.appendChild(addFavoriteButton);

      const imgCountryFlag = document.createElement('img');
      imgCountryFlag.classList.add('countryFlag');
      imgCountryFlag.setAttribute('src', country.flag);
      imgCountryFlag.setAttribute('alt', 'Country flag');
      countryDiv.appendChild(imgCountryFlag);

      const countryInfoDiv = document.createElement('div');
      countryInfoDiv.classList.add('countryInfo');

      const countryName = document.createElement('p');
      countryName.classList.add('countryName');
      countryName.textContent = country.name;
      countryInfoDiv.appendChild(countryName);

      const countryPopulation = document.createElement('p');
      countryPopulation.classList.add('countryPopulation');
      countryPopulation.textContent = country.population;
      countryInfoDiv.appendChild(countryPopulation);

      countryDiv.appendChild(countryInfoDiv);
      liCountry.appendChild(countryDiv);
      ulCountriesList.appendChild(liCountry);
    });
    div.appendChild(ulCountriesList);
  }

  function updateHeader(parentId) {
    let currCountriesList =
      parentId === 'allCountries'
        ? countriesList
        : parentId === 'favCountries'
        ? favoriteCountriesList
        : [];

    const countAllCountriesSpan = document.querySelector(
      `#${parentId} .headerList h2 span`
    );
    countAllCountriesSpan.textContent = currCountriesList.length;
    const totalAllPopulationSpan = document.querySelector(
      `#${parentId} .headerList p span`
    );

    let sumTotalPopulation = currCountriesList.reduce((acc, cur) => {
      return acc + cur.population;
    }, 0);
    totalAllPopulationSpan.textContent = sumTotalPopulation;
  }

  function renderCountriesList() {
    const { 1: content } = Array.from(divAllCountries.children);

    constructContentList(content, divAllCountries.id);
    updateHeader(divAllCountries.id);
  }
  function renderFavoriteCountriesList() {
    const { 1: content } = Array.from(divFavCountries.children);

    constructContentList(content, divFavCountries.id);
    updateHeader(divFavCountries.id);
  }

  function handleCountryButtons() {
    function addFavoriteCountry(event) {
      const currCountryId = event.target.parentElement.id;

      let country = countriesList.find((country) => {
        return country.id === currCountryId;
      });
      // console.log(country);
      favoriteCountriesList = [...favoriteCountriesList, country];
      countriesList = countriesList.filter((country) => {
        return country.id !== currCountryId;
      });
      render();
    }
    function rmvFavoriteCountry(event) {
      const currCountryId = event.target.parentElement.id;
      console.log('Removing from favorites');

      let country = favoriteCountriesList.find((country) => {
        return country.id === currCountryId;
      });
      // console.log(country);
      countriesList = [...countriesList, country];
      favoriteCountriesList = favoriteCountriesList.filter((country) => {
        return country.id !== currCountryId;
      });
      render();
    }

    const allCountriesButtons = divAllCountries.querySelectorAll(
      'li div button'
    );
    const favCountriesButtons = divFavCountries.querySelectorAll(
      'li div button'
    );
    // console.log(allCountriesButtons);
    // console.log(favCountriesButtons);
    allCountriesButtons.forEach((button) => {
      button.addEventListener('click', addFavoriteCountry);
    });
    favCountriesButtons.forEach((button) => {
      button.addEventListener('click', rmvFavoriteCountry);
    });
  }

  renderCountriesList();
  renderFavoriteCountriesList();
  // renderSummary();

  handleCountryButtons();
}

async function fetchCountries() {
  const fetchData = await fetch('https://restcountries.eu/rest/v2/all') //chama a API e retorna o resolve
    .catch((err) => err);
  let json = await fetchData.json();
  countriesList = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag,
    };
  });

  render();
}

function syncFetchCountries() {
  fetch('https://restcountries.eu/rest/v2/all') //chama a API
    .then((resolve) => {
      // caso de tudo certo com a chamada
      let data = resolve
        .json() // chama a conversão em JSON
        .then((res) => {
          // se der tudo certo na conversão
          countriesList = res; // atribui res para "countriesList"
        });
    })
    .catch((err) => {
      //caso ocorra algum erro
      console.log(err);
    });
}
