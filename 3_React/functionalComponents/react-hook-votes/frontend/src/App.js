import React, { useState, useEffect } from 'react';

import Loading from './Components/Loading/Loading';
import Header from './Components/Header/Header';
import Candidates from './Components/Candidates/Candidates';

export default function App() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const readBackend = async () => {
      const data = await fetch('http://localhost:8080/votes');
      const dataJSON = await data.json();
      console.log(dataJSON);
      setCandidates(dataJSON.candidates);
    };
    const backEndInterval = setInterval(readBackend, 1000);
    return () => {
      clearInterval(backEndInterval);
    };
  }, []);
  if (candidates.length) {
    return (
      <div className="container">
        <Header>Candidates</Header>
        <Candidates list={candidates} />
      </div>
    );
  }
  return <Loading text="Carregando..." />;
}
