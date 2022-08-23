import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostBox from '../components/Card';

import CreatePost from '../components/Post/Post';
import { UserContext } from '../utils/userContext';
axios.defaults.withCredentials = true;
const Home = () => {
  const { currentSubreddit } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [userId, setUserid] = useState('');
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
        setData(response.data.post);
        setUserid(response.data.userId);
      })
      .catch((err) => console.log(err));
  }, [currentSubreddit]);

  return (
    <div>
      <CreatePost />

      {data.map((e) => (
        <PostBox
          key={e._id}
          title={e.post.title}
          username={e.user.username}
          content={e.post.content}
          id={e._id}
          subreddit={e.subreddit.name}
          userId={userId}
          voteBalance={e.voteBalance}
          upvoteState={e.votes ? e.votes : null}
        />
      ))}
    </div>
  );
};

export default Home;
