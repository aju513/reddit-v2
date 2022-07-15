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
  const { isLoggedIn, setIsLoggedIn, user, setUser, username } =
    useContext(UserContext);

  const [bool, setBool] = useState(false);
  useEffect(() => {
    checkIsLoggedIn();
    setBool(false);
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
        console.log(data.data);
        setUser(data.data.payload);
        setIsLoggedIn(data.data.isLoggedIn);
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
                {username}
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
