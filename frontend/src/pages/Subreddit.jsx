import axios from 'axios';
import { Alert } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../utils/userContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const Subreddit = () => {
  axios.defaults.withCredentials = true;
  const [name, setName] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    if (name.length !== 0) {
      createSubreddit();
    }
  }, [name]);
  const createSubreddit = () => {
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
      .then((response) => {
        // <Alert variant="success">{data.subreddit.message}</Alert>;
        if (response.status === 200) {
          ///need to make changes make separate page for your created subreddit page
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => setName(data.subredditname))}>
        <p>Name</p>
        <input {...register('subredditname')} type="text" />
        <input type="submit" name="create" />
      </form>
    </div>
  );
};

export default Subreddit;
