import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../css/card.css';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { FaBeer, FaArrowDown, FaArrowUp } from 'react-icons/fa';
const PostBox = ({ title, content, isOpen }) => {
  const [score, setScore] = useState(0);

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
            onClick={() => setScore((e) => e + 1)}
          />

          <p style={{ marginBottom: '0px', fontSize: '1.2rem' }}>{score}</p>
          <IconButton
            children={<FaArrowDown />}
            onClick={() => setScore((e) => e - 1)}
          />
        </div>
        <CardContent>
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
