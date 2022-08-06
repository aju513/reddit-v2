const mongoose = require('mongoose');

const Post = mongoose.model(
  'Post',
  new mongoose.Schema(
    {
      post: { title: String, content: String },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      subreddit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subreddit',
      },
      voteBalance: {
        type: Number,
        default: 0,
      },
      votes: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          upvote: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
    { timestamps: { createdAt: 'created_at' } }
  )
);

module.exports = Post;
