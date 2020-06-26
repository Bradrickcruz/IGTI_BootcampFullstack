import React from 'react';
import css from './counter.module.css';
import IncrementButton from '../Buttons/IncrementButton';
import DecrementButton from '../Buttons/DecrementButton';
import Value from '../Value/Value';

export default function Counter2(props) {
  const handleClick = (clickType) => {
    props.onCount(clickType);
  };

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleClick} />
      <Value value={props.countValue} />
      <IncrementButton onIncrement={handleClick} />
      <Value value={`(${props.stepsValue})`} />
    </div>
  );
}
