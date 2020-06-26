import React from 'react';
import Country from '../Country/Country';
import css from './Countries.module.css';

export default function Countries(props) {
  const { countries } = props;
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
