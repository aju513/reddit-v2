import { v4 as uuid } from 'uuid';
import React, { useContext, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { UserContext } from '../../utils/userContext';
const UseDropDownWithPopup = ({ main, properties, setContent }) => {
  const [selected, setSelected] = useState('');
  return (
    <div key={uuid()}>
      {' '}
      <Dropdown key={uuid()}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selected ? selected : main}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {properties.map((object) => (
            <Dropdown.Item
              key={uuid()}
              onClick={(e) => {
                setSelected(e.target.innerHTML);
                setContent(e.target.innerHTML);
              }}
            >
              {object}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UseDropDownWithPopup;
