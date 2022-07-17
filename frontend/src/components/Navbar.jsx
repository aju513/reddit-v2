import axios from 'axios';
import { useContext, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { UserContext } from '../utils/userContext';
function Navbars() {
  axios.defaults.withCredentials = true;
  const { user, setUser } = useContext(UserContext);
  console.log(user.username, user.isLoggedIn);
  useEffect(() => {
    checkIsLoggedIn();
  }, []);
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
