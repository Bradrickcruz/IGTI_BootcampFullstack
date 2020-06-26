import React from 'react';

export default function Toggle(props) {
  const handleChange = () => {
    props.onToggle();
  };
  const { description, enabled } = props;
  return (
    <div className="switch">
      <label>
        {description}
        <input type="checkbox" checked={enabled} onChange={handleChange} />
        <span className="lever"></span>
      </label>
    </div>
  );
}
