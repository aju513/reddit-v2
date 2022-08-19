const mongoose = require('mongoose');

const Comment = mongoose.model(
  'Comment',
  new mongoose.Schema(
    {
      parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
      text: String,
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    { timestamps: { createdAt: 'created_at' } }
  )
);

module.exports = Comment;
