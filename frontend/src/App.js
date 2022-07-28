import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Navbars from './components/Navbar';
import { useState } from 'react';
import { UserContext } from './utils/userContext';
import Home from './pages/Home';
import Subreddit from './pages/Subreddit';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [subreddit, setSubreddit] = useState([]);
  const [currentSubreddit, setCurrentSubreddit] = useState('');
  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            subreddit,
            setSubreddit,
            setCurrentSubreddit,
            currentSubreddit,
          }}
        >
          <Navbars />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/subreddit" element={<Subreddit />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
