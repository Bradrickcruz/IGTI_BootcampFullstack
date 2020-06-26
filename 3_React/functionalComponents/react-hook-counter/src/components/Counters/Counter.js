import React, { useState } from 'react';
import css from './counter.module.css';
import IncrementButton from '../Buttons/IncrementButton';
import DecrementButton from '../Buttons/DecrementButton';
import Value from '../Value/Value';

export default function Counter() {
  const [currentCounter, setCurrentCounter] = useState(0);
  const [steps, setSteps] = useState(0);

  const handleClick = (clickType) => {
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
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleClick} />
      <Value value={currentCounter} />
      <IncrementButton onIncrement={handleClick} />
      <Value value={`(${steps})`} />
    </div>
  );
}
