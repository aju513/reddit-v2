import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CreatePost from '../components/Post/Post';
import PostBox from '../components/Post/PostBox';
import { UserContext } from '../utils/userContext';
axios.defaults.withCredentials = true;
const Home = () => {
  const { currentSubreddit } = useContext(UserContext);
  const [data, setData] = useState([]);
  console.log('curr', currentSubreddit);
  useEffect(() => {
    axios
      .get(
        'http://localhost:4000/api/posts',
        { params: { current: currentSubreddit } },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, [currentSubreddit]);

  return (
    <div>
      <CreatePost />

      {data ? (
        data.map((obj) => (
          <PostBox title={obj.post.title} content={obj.post.content} />
        ))
      ) : (
        <p>There is no data</p>
      )}
    </div>
  );
};

export default Home;
