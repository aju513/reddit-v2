import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../css/card.css';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { FaBeer, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import axios from 'axios';

axios.defaults.withCredentials = true;
const PostBox = ({
  userId,
  title,
  content,
  id,
  voteBalance,
  upvoteState,
  username,
  subreddit,
}) => {
  //just take only the upvote from the logged in user
  const requiredValue = upvoteState.filter((i) => i.userId === userId);
  var something = requiredValue.length !== 0 ? requiredValue[0].upvote : null;
  const [vote, setVote] = useState(voteBalance);

  //if the something ==null then we can do both
  //if the something ==true then that means only downvote button works
  //if the something ==false then that means onlly upvote button works
  const [state, setState] = useState(something);

  const changeUpvote = (upvote) => {
    axios
      .post(
        'http://localhost:4000/api/upvote',
        { upvote: upvote, postId: id },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .then((response) => {
        setState(response.data.upvote);

        setVote(response.data.voteBalance);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Card sx={{ minWidth: 275, margin: '1.2rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            alignItems: 'center',
            float: 'left',
            marginTop: '0px',
            paddingRight: '1.4rem',
          }}
        >
          <IconButton
            children={<FaArrowUp />}
            color={
              state === null
                ? 'default'
                : state === true
                ? 'primary'
                : 'default'
            }
            onClick={() => {
              if (state === false || state === null) {
                console.log('yes');
                changeUpvote(true);
              }
            }}
          />

          <p style={{ marginBottom: '0px', fontSize: '1.2rem' }}>{vote}</p>
          <IconButton
            color={
              state === null
                ? 'default'
                : state === false
                ? 'warning'
                : 'default'
            }
            children={<FaArrowDown />}
            onClick={() => {
              if (state === true || state === null) {
                changeUpvote(false);
              }
            }}
          />
        </div>
        <CardContent>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            Posted by {username}
          </Typography>
          <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            Subreddit {subreddit}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PostBox;
