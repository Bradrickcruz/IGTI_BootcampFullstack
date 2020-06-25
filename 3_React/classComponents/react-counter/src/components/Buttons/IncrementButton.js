import React, { Component } from 'react';

export default class IncrementButton extends Component {
  handleClick = () => {
    this.props.onIncrement('+');
  };
  render() {
    return (
      <div>
        <button
          onClick={this.handleClick}
          className="waves-effect waves-light btn blue darken-4"
        >
          +
        </button>
      </div>
    );
  }
}
