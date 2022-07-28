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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link
          classname="nav-link"
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
          <div class="container-fluid">
            <div
              class="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <UserDropDownWithArray main={'Home'} properties={subr} />
                </li>
                <UserDropDown
                  main={user.username}
                  properties={[
                    { link: '#', name: 'Profile' },
                    { link: '#', name: 'User Settings' },
                    { name: 'Create Community', link: '/subreddit' },
                  ]}
                />

                <li class="nav-item">
                  <button className="logout" onClick={() => callLogout()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div class="container-fluid">
            <div
              class="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link style={{ textDecoration: 'none' }} to="/login">
                    Login
                  </Link>
                </li>
                <li class="nav-item">
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
