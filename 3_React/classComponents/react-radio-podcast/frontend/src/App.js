import React, { Component } from 'react';

import Title from './Components/Title/Title';
import Station from './Components/Station/Station';
import Podcast from './Components/Podcast/Podcast';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedStation: 0.0,
      selectedPodcast: null,
      podcasts: [],
    };
    this.handleStationChange.bind();
  }

  async componentDidMount() {
    const rsc = await fetch('http://localhost:3001/podcasts');
    const data = await rsc.json();

    this.setState({
      podcasts: data,
      selectedStation: 88.5,
    });
  }

  componentDidUpdate = (_, prevState) => {
    const { selectedStation, podcasts } = this.state;
    const { selectedStation: oldStation } = prevState;
    if (selectedStation !== oldStation) {
      const selectedPodcast = podcasts.find((podcast) => {
        return podcast.id === selectedStation;
      });

      this.setState({ selectedPodcast });
    }
  };

  handleStationChange = (station) => {
    this.setState({
      selectedStation: station,
    });
  };
  render() {
    const { selectedStation, selectedPodcast } = this.state;
    return (
      <div>
        <Title titleText="React Radio Podcast" />
        <Station
          value={selectedStation}
          onStationChange={this.handleStationChange}
        />
        <Podcast value={selectedPodcast} />
      </div>
    );
  }
}
