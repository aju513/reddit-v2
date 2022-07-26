import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { UserContext } from '../utils/userContext';
import UserDropDownWithArray from './UseDropDownWithArray';
import UserDropDown from './UserDropDown';
function Navbars() {
  axios.defaults.withCredentials = true;
  const { user, setUser, subreddit, setSubreddit } = useContext(UserContext);
  const [subr, setSubr] = useState([]);
  console.log('subreddit', subreddit);
  console.log(user.username, user.isLoggedIn);
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
        console.log('go', response.data.joinedSubreddit);
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
      {user.isLoggedIn ? (
        <Nav className="ms-auto">
          {subr && (
            <Nav.Item classname=" ">
              <Nav.Link>
                <UserDropDownWithArray main={'Home'} properties={subr} />
              </Nav.Link>
            </Nav.Item>
          )}
          <Nav.Item classname="nav navbar-nav navbar-right ">
            {user.username ? (
              <UserDropDown
                main={user.username}
                properties={[
                  { link: '#', name: 'Profile' },
                  { link: '#', name: 'User Settings' },
                  { name: 'Create Community', link: '/subreddit' },
                ]}
              />
            ) : (
              '...loading'
            )}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              {/* <Link to="/"> */}
              <button onClick={() => callLogout()}>Logout</button>
              {/* </Link> */}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ) : (
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link>
              <Link style={{ textDecoration: 'none' }} to="/login">
                Login
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link style={{ textDecoration: 'none' }} to="/register">
                Register
              </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </>
  );
}

export default Navbars;
