import React, { Component } from 'react';
import ProjetoBase from './components/ProjetoBase/ProjetoBase';

import { getTimeStamp } from './helpers/dateTimeHelper.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      clickArray: [],
    };
  }

  render() {
    return <ProjetoBase />;
  }
}
