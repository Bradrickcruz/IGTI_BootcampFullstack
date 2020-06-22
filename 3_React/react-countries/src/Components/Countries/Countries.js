import React, { Component } from 'react';
import Country from '../Country/Country';
import css from './Countries.module.css';

export default class Countries extends Component {
  render() {
    const { countries } = this.props;
    return (
      <div className={css.border}>
        <ul className={css.flexRow}>
          {countries.map((country) => {
            return (
              <li key={country.numericCode}>
                <Country country={country} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
