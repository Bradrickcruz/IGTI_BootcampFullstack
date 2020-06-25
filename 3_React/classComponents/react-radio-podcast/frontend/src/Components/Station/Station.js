import React, { Component } from 'react';

export default class Station extends Component {
  handleInputChange = (event) => {
    const newStation = event.target.value;
    this.props.onStationChange(newStation);
  };

  render() {
    const { value } = this.props;
    const { stationStyle, flexRow } = styles;
    return (
      <div style={{ ...stationStyle, ...flexRow }}>
        <input type="text" value={value} readOnly />
        <input
          type="range"
          value={value}
          min="88.5"
          max="108"
          step="0.1"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

const styles = {
  stationStyle: {
    border: '1px solid lightgray',
    borderRadius: '5px',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'column',
    allignItems: 'center',
    justifyContents: 'center',
  },
};
