import React from 'react';
import { useForm } from 'react-hook-form';
const InputBox = ({ ref, type, label, name, handleClick }) => {
  return (
    <div>
      <input ref={ref} type={type} value={name} onChange={handleClick} />
    </div>
  );
};

export default InputBox;
