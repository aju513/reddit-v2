import { useState, useEffect, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { UserContext } from '../../utils/userContext';
const axios = require('axios').default;
axios.defaults.withCredentials = true;
const Comments = ({ userId, postId }) => {
  const { backendComments, setBackendComments, setFetchComment } =
    useContext(UserContext);
  const [activeComment, setActiveComment] = useState(null);
  //only comments of specific post
  const backendCommentsById = backendComments.filter(
    (backendComment) => backendComment.post === postId
  );

  const rootCommentsById = backendCommentsById.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) =>
    backendCommentsById
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text) => {
    axios
      .post(
        'http://localhost:4000/api/comment',
        {
          postId: postId,
          userId: userId,
          text: text,
        },
        { withCredentials: true }
      )
      .then(() => {
        setFetchComment(true);
      });
  };

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm
        key={uuid()}
        submitLabel="Write"
        handleSubmit={(text) => addComment(text)}
      />
      <div className="comments-container">
        {rootCommentsById.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            postId={postId}
            userId={userId}
            replies={getReplies(rootComment._id)}
            currentUserId={userId}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
