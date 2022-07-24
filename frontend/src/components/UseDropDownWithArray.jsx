import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { UserContext } from '../utils/userContext';
const UserDropDownWithArray = ({ main, properties }) => {
  const { setCurrentSubreddit } = useContext(UserContext);
  return (
    <div>
      {' '}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {main}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {properties.map((object) => (
            <Dropdown.Item
              onClick={(e) => {
                console.log(e.target.innerHTML);
                setCurrentSubreddit(e.target.innerHTML);
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

export default UserDropDownWithArray;
