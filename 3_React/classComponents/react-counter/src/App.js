import React, { Component, Fragment } from 'react';
import Counter from './components/Counters/Counter';
import Counter2 from './components/Counters/Counter2';
import Band from "./components/Band/Band"

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 3,
      steps: 0,
    };
  }

  handleCount = (clickType) => {
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
      <Fragment>
        <h3>Band</h3>
        <Band />
        <h3>Counters</h3>
        <Counter />
        <Counter />
        <Counter />
        <h3>Counters2</h3>
        <Counter2
          onCount={this.handleCount}
          countValue={currentCounter}
          stepsValue={steps}
        />
        <Counter2
          onCount={this.handleCount}
          countValue={currentCounter}
          stepsValue={steps}
        />
        <Counter2
          onCount={this.handleCount}
          countValue={currentCounter}
          stepsValue={steps}
        />
      </Fragment>
    );
  }
}
