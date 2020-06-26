import React, { useState, useEffect } from 'react';
import './App.css';
import { formatNumber } from './Helpers/formatHelpers';

import Countries from './Components/Countries/Countries';
import Header from './Components/Header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterStr, setFilterStr] = useState('');
  const [filteredPopulation, setFilteredPopulation] = useState(0);

  const sumPopulation = (countries) => {
    return countries.reduce((acc, country) => {
      return acc + country.population;
    }, 0);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      let countries = await fetch('https://restcountries.eu/rest/v2/all');
      let data = await countries.json();
      data = data.map(({ translations, numericCode, flag, population }) => {
        return {
          numericCode,
          name: translations.br,
          filterName: translations.br.toLowerCase(),
          population,
          flag,
        };
      });

      let newFilteredPopulation = sumPopulation(data);

      setAllCountries(data);
      setFilteredCountries(Object.assign([], data));
      setFilteredPopulation(newFilteredPopulation);
    };
    fetchCountries();
  }, []);

  const handleChangeFilter = (newFilter) => {
    setFilterStr(newFilter);

    newFilter = newFilter.toLowerCase();
    let selectedCountries = allCountries.filter((country) => {
      return country.filterName.includes(newFilter);
    });

    let newFilteredPopulation = sumPopulation(selectedCountries);

    setFilteredCountries(selectedCountries);
    setFilteredPopulation(newFilteredPopulation);
  };

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>
      <Header
        filter={filterStr}
        countryCount={filteredCountries.length}
        countriesPopulation={formatNumber(filteredPopulation)}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
