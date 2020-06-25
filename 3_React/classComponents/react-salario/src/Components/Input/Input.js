import React, { Component, Fragment } from 'react';

export default class Input extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };
  // formatCurrencyValue = (value) => {
  //   if (value) {
  //     return Intl.NumberFormat('pt-BR', {
  //       styles: 'currency',
  //       currency: 'BRL',
  //     }).format(value);
  //   }
  //   return 0;
  // };
  render() {
    const { label, isDisabled, value } = this.props;
    return (
      <Fragment>
        <label>
          {label}
          <input
            disabled={isDisabled}
            value={value}
            onChange={this.handleChange}
          />
        </label>
      </Fragment>
    );
  }
}
