import React, { Fragment, useState, useEffect } from 'react';
import Users from './components/Users/Users';
import Toggle from './components/Toggle/Toggle';

export default function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    console.log('Mounted');
    const fetchUsers = async () => {
      const data = await fetch(
        'https://randomuser.me/api/?seed=rush&nat=br&results=10'
      );
      const dataAsJSON = await data.json();
      console.log(dataAsJSON);

      setUsers(dataAsJSON.results);
    };
    fetchUsers();
  }, []);

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <Fragment>
      <Toggle
        description="Show users"
        enabled={showUsers}
        onToggle={handleShowUsers}
      />
      <hr />
      {showUsers && <Users users={users} />}
    </Fragment>
  );
}

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       users: [],
//       showUsers: false,
//     };
//     this.handleShowUsers = this.handleShowUsers.bind(this);
//   }
//   async componentDidMount() {
//     console.log('Mounted');
//     const data = await fetch(
//       'https://randomuser.me/api/?seed=rush&nat=br&results=10'
//     );
//     const dataAsJSON = await data.json();
//     console.log(dataAsJSON);

//     this.setState({
//       users: [...dataAsJSON.results],
//     });
//   }

//   componentDidUpdate() {
//     console.log('Updated');
//   }

//   componentWillUnmount() {
//     console.log('Will Unmount');
//   }

//   handleShowUsers() {
//     this.setState({
//       showUsers: !this.state.showUsers,
//     });
//   }

//   render() {
//     const { showUsers, users } = this.state;
//     return (
//       <Fragment>
//         <Toggle
//           description="Show users"
//           enabled={showUsers}
//           onToggle={this.handleShowUsers}
//         />
//         <hr />
//         {showUsers && <Users users={users} />}
//       </Fragment>
//     );
//   }
// }
