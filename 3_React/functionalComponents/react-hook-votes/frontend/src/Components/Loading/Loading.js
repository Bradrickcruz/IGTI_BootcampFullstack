import React from 'react';

import css from './Loading.module.css';

export default function Loading({ text }) {
  return (
    <div className={css.flexRow}>
      <div className="preloader-wrapper large active">
        <div className="spinner-layer spinner-red-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: '2rem', marginLeft: '10px' }}>{text}</div>
    </div>
  );
}
