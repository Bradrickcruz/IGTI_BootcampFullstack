import React from 'react';

export default function IncrementButton(props) {
  const handleClick = () => {
    props.onIncrement('+');
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="waves-effect waves-light btn blue darken-4"
      >
        +
      </button>
    </div>
  );
}
