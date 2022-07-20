import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
const UserDropDownWithArray = ({ main, properties }) => {
  console.log(properties);
  return (
    <div>
      {' '}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {main}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {properties.map((object) => (
            <Dropdown.Item>{object}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropDownWithArray;
