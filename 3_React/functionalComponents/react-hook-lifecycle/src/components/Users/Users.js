import React, { Fragment, useState, useEffect } from 'react';
import User from '../User/User';

export default function Users({ users }) {
  const [visibleTime, setVisibleTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleTime(visibleTime + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [visibleTime]);
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
