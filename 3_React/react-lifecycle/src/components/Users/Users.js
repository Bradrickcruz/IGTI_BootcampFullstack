import React, { Component, Fragment } from 'react';
import User from '../User/User';

export default class Users extends Component {
  constructor() {
    super();

    this.state = {
      visibleTime: 0,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { visibleTime } = this.state;

      this.setState({
        visibleTime: visibleTime + 1,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { visibleTime } = this.state;
    const { users } = this.props;
    return (
      <Fragment>
        <h3>Users</h3>
        <p>Componente visível a {visibleTime} segundos</p>
        <ul>
          {users.map((user) => {
            const { login } = user;
            return (
              <li key={login.uuid}>
                <User userContent={user} />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}
