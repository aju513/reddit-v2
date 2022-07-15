import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputBox from './components/InputBox';

const Post = () => {
  const [posts, setPosts] = useState('');

  const makePost = (e) => {
    e.preventDefault();
    const temp = { post: posts };

    axios
      .post('http://localhost:4000/api/posts', temp, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <p>Post</p>
      <form onSubmit={(e) => makePost(e)}>
        <InputBox type="text" handleClick={(e) => setPosts(e.target.value)} />
        <InputBox type="submit" name="click" />
        <p>{posts}</p>
      </form>
    </div>
  );
};

export default Post;
