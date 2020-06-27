import React from 'react';

export default function Card(props) {
  const { position, curValue, diff, percentage } = props;
  return (
    <div style={{ border: '1px solid black' }}>
      <p>{position}</p>
      <p>{curValue}</p>
      <p>{diff}</p>
      <p>{percentage}%</p>
    </div>
  );
}
