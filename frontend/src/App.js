import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/comment.css';
import Navbars from './components/Navbar';
import { useState } from 'react';
import { UserContext } from './utils/userContext';
import Home from './pages/Home';
import Subreddit from './pages/Subreddit';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [subreddit, setSubreddit] = useState([]);
  const [backendComments, setBackendComments] = useState([]);
  const [currentSubreddit, setCurrentSubreddit] = useState('');
  const [fetchComment, setFetchComment] = useState(true);
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
            backendComments,
            setBackendComments,
            fetchComment,
            setFetchComment,
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
