import { v4 as uuid } from 'uuid';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import '../css/nav.css';
import { UserContext } from '../utils/userContext';
import UserDropDownWithArray from './Dropdown/UseDropDownWithArray';
import UserDropDown from './Dropdown/UserDropDown';
function Navbars() {
  axios.defaults.withCredentials = true;
  const { user, setUser, subreddit, setSubreddit } = useContext(UserContext);
  const [subr, setSubr] = useState([]);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);
  useEffect(() => {
    callSubreddit();
  }, [user]);

  const callSubreddit = () => {
    axios
      .get('http://localhost:4000/api/userSubreddits')
      .then((response) => {
        setSubr(response.data.joinedSubreddit);
        setSubreddit(response.data.joinedSubreddit);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callLogout = () => {
    axios
      .get('http://localhost:4000/api/logout')
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkIsLoggedIn = () => {
    axios
      .get('http://localhost:4000/api/isLoggedIn')
      .then((response) => {
        setUser(response.data.user);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link
          className="nav-link"
          style={{
            textDecoration: 'none',
            color: 'black',
            margin: '20px',
            fontSize: '20px',
          }}
          to="/ "
        >
          Reddit
        </Link>
        {user.isLoggedIn ? (
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <UserDropDownWithArray
                    key={uuid()}
                    main={'Home'}
                    properties={subr}
                  />
                </li>
                <UserDropDown
                  key={uuid()}
                  main={user.username}
                  properties={[
                    { link: '#', name: 'Profile' },
                    { link: '#', name: 'User Settings' },
                    { name: 'Create Community', link: '/subreddit' },
                  ]}
                />

                <li className="nav-item">
                  <button className="logout" onClick={() => callLogout()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link style={{ textDecoration: 'none' }} to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link style={{ textDecoration: 'none' }} to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbars;
