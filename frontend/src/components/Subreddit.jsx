import axios from 'axios';
import React, { useState } from 'react';
import InputBox from './components/InputBox';

const Subreddit = () => {
  const [name, setName] = useState('');
  const createSubreddit = (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:4000/api/subreddit',
      { name: name },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };
  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => createSubreddit(e)}>
        <InputBox type="text" handleClick={(e) => handleChange(e)} />
        <InputBox type="submit" name="create" />
      </form>
    </div>
  );
};

export default Subreddit;
