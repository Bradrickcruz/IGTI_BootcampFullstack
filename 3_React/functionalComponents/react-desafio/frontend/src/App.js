import React, { useState } from 'react';

import Title from './Components/Title/Title';
import NumInput from './Components/NumInput/NumInput';
import CardSpace from './Components/CardSpace/CardSpace';

export default function App() {
  const [montante, setMontante] = useState(100);
  const [taxa, setTaxa] = useState(0);
  const [periodo, setPeriodo] = useState(1);

  const handleInputChange = (newValue, setNewValue) => {
    setNewValue(newValue);
  };

  return (
    <div className="container">
      <Title text="React - Juros compostos" />
      <NumInput
        label="Montante inicial"
        curValue={montante}
        minVal={100}
        maxVal={100000}
        onInputChange={(value) => {
          handleInputChange(value, setMontante);
        }}
      />
      <NumInput
        label="Taxa mensal"
        curValue={taxa}
        minVal={-12}
        maxVal={12}
        step={0.1}
        onInputChange={(value) => {
          handleInputChange(value, setTaxa);
        }}
      />
      <NumInput
        label="Periodo (meses)"
        curValue={periodo}
        maxVal={36}
        onInputChange={(value) => {
          handleInputChange(value, setPeriodo);
        }}
      />
      <CardSpace montante={montante} taxa={taxa} periodo={periodo} />
    </div>
  );
}
