import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../utils/userContext';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      Home
      <p>{user.message}</p>
    </div>
  );
};

export default Home;
