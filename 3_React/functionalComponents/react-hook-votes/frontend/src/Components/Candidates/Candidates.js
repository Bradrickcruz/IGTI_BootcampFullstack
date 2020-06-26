import React from 'react';
import FlipMove from 'react-flip-move';

import Card from '../Card/Card';
import Candidate from '../Candidate/Candidate';

export default function Candidates({ list: candidates }) {
  return (
    <div>
      <FlipMove>
        {candidates.map((candidate, index) => {
          const { id } = candidate;
          return (
            <div key={id}>
              <Card>
                <Candidate candidate={candidate} position={index + 1} />
              </Card>
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}
