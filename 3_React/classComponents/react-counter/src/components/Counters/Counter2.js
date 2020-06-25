import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from '../Buttons/IncrementButton';
import DecrementButton from '../Buttons/DecrementButton';
import Value from '../Value/Value';

export default class Counter2 extends Component {
  handleClick = (clickType) => {
    console.log(clickType);
    this.props.onCount(clickType);
  };

  render() {
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleClick} />
        <Value value={this.props.countValue} />
        <IncrementButton onIncrement={this.handleClick} />
        <Value value={`(${this.props.stepsValue})`} />
      </div>
    );
  }
}
