import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../utils/userContext';
import Popup from './Popop';

const CreatePost = () => {
  const [isOpen, setIsopen] = useState(false);
  const { subreddit } = useContext(UserContext);
  const [inputvalue, setInputValue] = useState('');
  const toggle = () => {
    setIsopen(!isOpen);
  };

  return (
    <>
      <form>
        <label>Create Post</label>
        <input
          type="text"
          placeholder="Enter text"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type="button" onClick={toggle} value="click" />
        {isOpen && (
          <Popup contents={subreddit} text={inputvalue} handleClose={toggle} />
        )}
      </form>
    </>
  );
};

export default CreatePost;
