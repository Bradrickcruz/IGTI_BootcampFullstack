import React, { Component } from 'react';

export default class Band extends Component {
  constructor() {
    super();
    this.state = {
      bandName: 'Rush',
      BandMembers: [
        {
          id: 1,
          name: 'Neil Peart',
          instrument: 'Drums',
        },
        {
          id: 2,
          name: 'Alex Lifeson',
          instrument: 'Guitar',
        },
        {
          id: 3,
          name: 'Geddy Lee',
          instrument: 'Bass',
        },
      ],
    };
  }
  render() {
    const { bandName, BandMembers } = this.state;
    return (
      <div>
        <h4>{bandName}</h4>
        {BandMembers.map(({ id, name, instrument }) => {
          return (
            <ul key={id}>
              <li>
                {name} - {instrument}
              </li>
            </ul>
          );
        })} 
      </div>
    );
  }
}
