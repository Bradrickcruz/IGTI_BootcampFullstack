import React from 'react';

const STARS = {
  empty: '☆',
  full: '★',
};

export default function Popularity({ value }) {
  return (
    <div style={{ fontSize: '1.5rem', color: '#f39c12' }}>
      {STARS.full.repeat(value)}
      {STARS.empty.repeat(10 - value)}
    </div>
  );
}
