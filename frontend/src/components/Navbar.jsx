import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import { alignPropType } from 'react-bootstrap/esm/types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';
import useIsLogged from '../utils/useIsLogged';
import { UserContext } from '../utils/userContext';
function Navbars() {
  axios.defaults.withCredentials = true;
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(UserContext);

  const [bool, setBool] = useState(true);

  useEffect(() => {
    if (bool) {
      checkIsLoggedIn();
    }
    console.log('isloggedin', isLoggedIn);
  }, []);
  const callLogout = () => {
    axios
      .get('http://localhost:4000/api/logout')
      .then((data) => {
        console.log(1);
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkIsLoggedIn = () => {
    axios
      .get('http://localhost:4000/api/isLoggedIn')
      .then((data) => {
        console.log(data);

        setUser(data.data);
        setIsLoggedIn(data.data.isLoggedIn);
        setBool(false);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isLoggedIn ? (
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link>
              <Link style={{ textDecoration: 'none' }} to="/ ">
                {user.username ? user.username : '...loading'}
              </Link>
            </Nav.Link>
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
