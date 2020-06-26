import React, { useState } from 'react';

export default function Band() {
  const [bandName, setBandName] = useState('Rush');
  const [bandMembers, setBandMembers] = useState([
    {
      id: 1,
      name: 'Neil Peart',
      instrument: 'Drums',
    },
    {
      id: 2,
      name: 'Alex Lifeson',
      instrument: 'Guitar',
    },
    {
      id: 3,
      name: 'Geddy Lee',
      instrument: 'Bass',
    },
  ]);

  return (
    <div>
      <h4>{bandName}</h4>
      {bandMembers.map(({ id, name, instrument }) => {
        return (
          <ul key={id}>
            <li>
              {name} - {instrument}
            </li>
          </ul>
        );
      })}
    </div>
  );
}
