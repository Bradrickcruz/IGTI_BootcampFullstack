import React, { Component } from 'react';

export default class Title extends Component {
  render() {
    const { titleText } = this.props;
    return (
      <div>
        <h1 className="center">
          {titleText || this.props.children || 'Title'}
        </h1>
      </div>
    );
  }
}
