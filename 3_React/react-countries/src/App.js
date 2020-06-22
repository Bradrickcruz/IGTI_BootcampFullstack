import React, { Component } from 'react';
import './App.css';
import { formatNumber } from './Helpers/formatHelpers';

import Countries from './Components/Countries/Countries';
import Header from './Components/Header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      selectedCountries: [],
      filter: '',
      filteredPopulation: 0,
    };

    this.handleChangeFilter.bind();
  }

  componentDidMount = async () => {
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

    let filteredPopulation = this.sumPopulation(data);

    this.setState({
      allCountries: data,
      selectedCountries: Object.assign([], data),
      filteredPopulation,
    });
  };

  sumPopulation = (countries) => {
    return countries.reduce((acc, country) => {
      return acc + country.population;
    }, 0);
  };

  handleChangeFilter = (newFilter) => {
    console.log(newFilter);
    this.setState({
      filter: newFilter,
    });

    newFilter = newFilter.toLowerCase();
    let selectedCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(newFilter);
    });

    let filteredPopulation = this.sumPopulation(selectedCountries);

    this.setState({
      selectedCountries,
      filteredPopulation,
    });
  };

  render = () => {
    const { selectedCountries, filter, filteredPopulation } = this.state;
    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header
          filter={filter}
          countryCount={selectedCountries.length}
          countriesPopulation={formatNumber(filteredPopulation)}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countries countries={selectedCountries} />
      </div>
    );
  };
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
