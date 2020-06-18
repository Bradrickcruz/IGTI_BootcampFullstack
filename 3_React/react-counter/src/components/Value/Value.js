import React, { Component } from 'react';
import css from '../Counters/counter.module.css';

export default class Value extends Component {
  render() {
    return (
      <div>
        <span className={css.counterValue}>{this.props.value}</span>
      </div>
    );
  }
}
