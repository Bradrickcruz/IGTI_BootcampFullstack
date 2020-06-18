import React, { Component, Fragment } from 'react';
import Users from './components/Users/Users';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showUsers: false,
    };
  }
  async componentDidMount() {
    console.log('Mounted');
    const data = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );
    const dataAsJSON = await data.json();
    console.log(dataAsJSON);

    this.setState({
      users: [...dataAsJSON.results],
    });
  }

  componentDidUpdate() {
    console.log('Updated');
  }

  componentWillUnmount() {
    console.log('Will Unmount');
  }

  handleShowUsers() {
    const { showUsers } = this.state;

    this.setState({
      showUsers: !showUsers,
    });
  }

  render() {
    const { showUsers, users } = this.state;
    return (
      <Fragment>
        <div className="switch">
          <label>
            Show users
            <input type="checkbox" onChange={() => this.handleShowUsers()} />
            <span className="lever"></span>
          </label>
        </div>
        <hr />
        {showUsers && <Users users={users}/>}
      </Fragment>
    );
  }
}
