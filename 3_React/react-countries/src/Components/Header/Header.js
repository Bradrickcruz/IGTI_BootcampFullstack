import React, { Component } from 'react';
import css from './Header.module.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    const { onChangeFilter } = this.props;
    const { value } = event.target;
    onChangeFilter(value);
  };

  render() {
    const { filter, countryCount, countriesPopulation } = this.props;
    return (
      <div className={css.flexRow}>
        <input
          placeholder="Filtro"
          value={filter}
          onChange={this.handleInputChange}
        />
        |
        <span className={css.info_countries}>
          Países: <strong>{countryCount}</strong>
        </span>
        |
        <div className={css.totalPopulation}>
          <span className={css.info_population}>Total de populações:</span>
          <strong>{countriesPopulation}</strong>
        </div>
      </div>
    );
  }
}
