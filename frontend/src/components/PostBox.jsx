import React from 'react';
import Card from 'react-bootstrap/Card';
import '../css/card.css';
const PostBox = ({ title, content }) => {
  return (
    <>
      <Card className="container">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default PostBox;
