import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../utils/userContext';
import Popup from './Popup';
import '../../css/createpost.css';
const CreatePost = () => {
  const [isOpen, setIsopen] = useState(false);
  const { subreddit } = useContext(UserContext);
  const toggle = () => {
    setIsopen(!isOpen);
  };

  return (
    <>
      <button className="createpost" onClick={toggle}>
        Create Post
      </button>
      {isOpen && <Popup contents={subreddit} handleClose={toggle} />}
    </>
  );
};

export default CreatePost;
