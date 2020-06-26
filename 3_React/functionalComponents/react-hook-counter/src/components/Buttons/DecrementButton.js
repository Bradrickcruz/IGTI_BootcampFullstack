import React from 'react';

export default function DecrementButton(props) {
  const handleClick = () => {
    props.onDecrement('-');
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="waves-effect waves-light btn red darken-4"
      >
        -
      </button>
    </div>
  );
}
