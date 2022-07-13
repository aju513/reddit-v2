const mongoose = require('mongoose');

const Subreddit = mongoose.model(
  'Subreddit',
  new mongoose.Schema({
    name: String,
    createdUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    joinedUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
);

module.exports = Subreddit;
