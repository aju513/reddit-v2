import { v4 as uuid } from 'uuid';
import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { UserContext } from '../../utils/userContext';
const UserDropDownWithArray = ({ main, properties, setContent }) => {
  const { currentSubreddit, setCurrentSubreddit } = useContext(UserContext);
  return (
    <div key={uuid()}>
      <Dropdown key={uuid()}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {currentSubreddit ? currentSubreddit : main}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {properties.map((object) => (
            <Dropdown.Item
              key={uuid()}
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
