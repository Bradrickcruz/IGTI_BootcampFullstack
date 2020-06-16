import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from '../Buttons/IncrementButton';
import DecrementButton from '../Buttons/DecrementButton';
import Value from '../Value/Value';

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  handleClick = (clickType) => {
    const { currentCounter, steps } = this.state;

    this.setState({
      currentCounter:
        clickType === '+'
          ? currentCounter + 1
          : clickType === '-'
          ? currentCounter - 1
          : currentCounter,
      steps: steps + 1,
    });
  };

  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleClick} />
        <Value value={currentCounter} />
        <IncrementButton onIncrement={this.handleClick} />
        <Value value={`(${steps})`} />
      </div>
    );
  }
}
