import React, { Component } from 'react';

export default class Toggle extends Component {
  handleChange = () => {
    this.props.onToggle();
  };

  render() {
    const { description, enabled } = this.props;
    return (
      <div className="switch">
        <label>
          {description}
          <input
            type="checkbox"
            checked={enabled}
            onChange={this.handleChange}
          />
          <span className="lever"></span>
        </label>
      </div>
    );
  }
}
