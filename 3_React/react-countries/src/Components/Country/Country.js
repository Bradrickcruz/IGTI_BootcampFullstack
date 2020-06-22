import React, { Component } from 'react';
import { formatNumber } from '../../Helpers/formatHelpers';
import css from './Country.module.css';

export default class Country extends Component {
  render() {
    const { country } = this.props;
    const { name, population, flag } = country;
    return (
      <div className={`${css.border} ${css.country} ${css.flex}`}>
        <img className={css.flag} src={flag} alt="bandeira" />
        <div className={css.country_info}>
          <strong className={css.title}>{name}</strong>
          <p className={css.population}>população</p>
          <strong className={css.population}>{formatNumber(population)}</strong>
        </div>
      </div>
    );
  }
}
