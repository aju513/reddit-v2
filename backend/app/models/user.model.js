const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    email: String,
    password: String,
    username: String,

    userJoinedSubReddit: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subreddit',
      },
    ],
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
 
  })
);

module.exports = User;
