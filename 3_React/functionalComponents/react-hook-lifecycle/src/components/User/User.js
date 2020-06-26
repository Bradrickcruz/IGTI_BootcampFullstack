import React from 'react';
import css from './user.module.css';

export default function User(props) {
  const { name, picture } = props.userContent;
  return (
    <div className={css.flexRow}>
      <img className={css.avatar} src={picture.large} alt={name.first} />
      <p>
        {name.first} {name.last}
      </p>
    </div>
  );
}
