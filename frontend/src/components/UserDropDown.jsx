import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
const UserDropDown = ({ main, properties }) => {
  return (
    <div>
      {' '}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {main}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {properties.map((object) => (
            <Dropdown.Item>
              <Link
                to={object.link ? object.link : '#'}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {object.name}
              </Link>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropDown;
