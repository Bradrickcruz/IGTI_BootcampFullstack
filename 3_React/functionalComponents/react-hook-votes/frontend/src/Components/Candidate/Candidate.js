import React from 'react';

import Position from '../Position/Position';
import Picture from '../Picture/Picture';
import CandidateData from '../CandidateData/CandidateData';
import Name from '../Name/Name';
import Votes from '../Votes/Votes';
import Percentage from '../Percentage/Percentage';
import Popularity from '../Popularity/Popularity';

import css from './Candidate.module.css';
import {  formatPercentage } from '../../Helpers/formatHelpers';

export default function Candidate({ candidate, position }) {
  const { id, name, votes, percentage, popularity } = candidate;
  const imgSrc = `./img/${id}.jpg`;
  return (
    <div className={css.flexRow}>
      <Position>{position}</Position>
      <Picture imgSource={imgSrc} imgAlt={name} />
      <CandidateData>
        <Name>{name}</Name>
        <Votes value={votes}/>
        <Percentage>{formatPercentage(percentage)}</Percentage>
        <Popularity value={popularity} />
      </CandidateData>
    </div>
  );
}
