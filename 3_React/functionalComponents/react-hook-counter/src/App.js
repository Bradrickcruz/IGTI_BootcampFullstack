import React, { Fragment, useState } from 'react';
import Counter from './components/Counters/Counter';
import Counter2 from './components/Counters/Counter2';
import Band from './components/Band/Band';

export default function App() {
  const [currentCounter, setCurrentCounter] = useState(3);
  const [steps, setSteps] = useState(0);

  const handleCount = (clickType) => {
    setCurrentCounter(
      clickType === '+'
        ? currentCounter + 1
        : clickType === '-'
        ? currentCounter - 1
        : currentCounter
    );
    setSteps(steps + 1);
  };
  return (
    <Fragment>
      <h3>Band</h3>
      <Band />
      <h3>Counters</h3>
      <Counter />
      <Counter />
      <Counter />
      <h3>Counters2</h3>
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        stepsValue={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        stepsValue={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        stepsValue={steps}
      />
    </Fragment>
  );
}
