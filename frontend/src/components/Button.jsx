import React from 'react';

const Button = ({ name, buttonOnClick, label }) => {
  return (
    <div>
      <button className={name} onClick={buttonOnClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
