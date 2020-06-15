import React, { useState, useEffect } from 'react';

import { getTimeStamp } from './helpers/dateTimeHelper';

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length.toString();
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getTimeStamp());

    setClickArray(newClickArray);
  };

  return (
    <div>
      <h1>
        React com <strong>Hooks</strong>
      </h1>

      <button onClick={handleClick}>Clique aqui</button>

      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
