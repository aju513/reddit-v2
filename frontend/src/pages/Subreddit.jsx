import axios from 'axios';
import { Alert } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../utils/userContext';

const Subreddit = () => {
  axios.defaults.withCredentials = true;
  const [name, setName] = useState('');
  const { user } = useContext(UserContext);
  useEffect(() => {}, []);
  const createSubreddit = (e) => {
    console.log('yes');
    e.preventDefault();
    axios
      .post(
        'http://localhost:4000/api/subreddit',
        { name: name, username: user.username },

        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(({ data }) => {
        // <Alert variant="success">{data.subreddit.message}</Alert>;
        console.log('h');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => createSubreddit(e)}>
        <p>Name</p>
        <input type="text" onClick={(e) => handleChange(e)} />
        <input type="submit" name="create" />
      </form>
    </div>
  );
};

export default Subreddit;
