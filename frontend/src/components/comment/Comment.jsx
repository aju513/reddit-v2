import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { UserContext } from '../../utils/userContext';
axios.defaults.withCredentials = true;
const Comment = ({
  comment,
  replies,
  postId,
  userId,
  parentId = null,
  currentUserId,
  setActiveComment,
  activeComment,
}) => {
  const { backendComments, fetchComment, setBackendComments, setFetchComment } =
    useContext(UserContext);
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === 'replying';
  const canReply = Boolean(currentUserId);

  const replyId = parentId ? parentId : comment._id;
  const addComment = (text, parentId) => {
    console.log('yes');
    axios
      .post(
        'http://localhost:4000/api/comment',
        {
          postId: postId,
          userId: userId,
          text: text,
          parentId: parentId,
        },
        { withCredentials: true }
      )
      .then(() => {
        setFetchComment(true);
      });
  };
  return (
    <div key={comment._id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content"></div>
        <div className="comment-text">{comment.text}</div>

        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment._id, type: 'replying' })
              }
            >
              Reply
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply._id}
                postId={postId}
                userId={userId}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                addComment={addComment}
                parentId={comment._id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
