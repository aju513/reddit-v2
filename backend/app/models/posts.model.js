const mongoose = require('mongoose');

const Post = mongoose.model(
  'Post',
  new mongoose.Schema({
    post: { title: String, content: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subreddit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subreddit',
    },
  })
);

module.exports = Post;
