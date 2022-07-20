import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import Popup from '../components/Popop';
import { UserContext } from '../utils/userContext';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <CreatePost />
      Home
    </div>
  );
};

export default Home;
