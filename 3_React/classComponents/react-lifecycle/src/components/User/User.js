import React, { Component } from 'react';
import css from './user.module.css';

export default class User extends Component {
  render() {
    const { name, picture } = this.props.userContent;
    return (
      <div className={css.flexRow}>
        <img className={css.avatar} src={picture.large} alt={name.first} />
        <p>
          {name.first} {name.last}
        </p>
      </div>
    );
  }
}
