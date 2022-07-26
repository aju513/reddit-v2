import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../utils/userContext';
import Popup from './PostPopup';

const CreatePost = () => {
  const [isOpen, setIsopen] = useState(false);
  const { subreddit } = useContext(UserContext);
  const toggle = () => {
    setIsopen(!isOpen);
  };

  return (
    <>
      <form>
        <input type="button" onClick={toggle} value="Create Post" />
        {isOpen && <Popup contents={subreddit} handleClose={toggle} />}
      </form>
    </>
  );
};

export default CreatePost;
