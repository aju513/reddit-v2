import Login from './pages/Login';
import Register from './pages/Register';

import {
  BrowserRouter,
  Routes,
  Route,
  UNSAFE_RouteContext,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbars from './components/Navbar';
import { useState } from 'react';
import { UserContext } from './utils/userContext';
import Home from './pages/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUserName] = useState('');
  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            username,
            setUserName,
          }}
        >
          <Navbars />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
