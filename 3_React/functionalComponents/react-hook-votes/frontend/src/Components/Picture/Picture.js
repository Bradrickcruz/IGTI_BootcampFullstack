import React from 'react';

import css from './Picture.module.css';

export default function Picture({ imgSource, imgAlt }) {
  return (
    <div>
      <img
        className={css.picture}
        src={imgSource}
        alt={imgAlt}
        title={imgAlt}
      />
    </div>
  );
}
