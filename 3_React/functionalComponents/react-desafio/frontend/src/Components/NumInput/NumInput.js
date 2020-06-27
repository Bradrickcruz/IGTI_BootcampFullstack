import React from 'react';

export default function NumInput(props) {
  const {
    curValue,
    minVal = 1,
    maxVal,
    label,
    step = 1,
    onInputChange,
  } = props;

  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <div>
      <span>{label}</span>
      <input
        type="number"
        min={minVal}
        max={maxVal}
        value={curValue}
        step={step}
        onChange={handleChange}
      />
    </div>
  );
}
