import React, { Component } from 'react';

export default class Podcast extends Component {
  render() {
    const { value } = this.props;
    if (!value) {
      return <div>Nenhum podcast nesta estação</div>;
    }

    const { img, title, description, imgAlt } = value;
    return (
      <div>
        <img src={`img/${img}`} alt={imgAlt} />
        <p>{title}</p>
        <p>{description}</p>
      </div>
    );
  }
}


