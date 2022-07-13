const db = require('../models');
const User = db.user;
const Subreddit = db.subreddit;

const { parseJwt } = require('../utils/parseJwt');

const createSubreddit = async (req, res) => {
  const accessToken = req.cookies['access-token'];

  const userId = parseJwt(accessToken).id;

  const newSubreddit = new Subreddit({
    name: req.body.name,
    createdUser: {
      _id: userId,
    },
    joinedUser: [
      {
        _id: userId,
      },
    ],
  });
  newSubreddit.save();

  User.findOneAndUpdate(
    { _id: userId },
    { $push: newSubreddit._id },
    { new: true, upsert: true },
    (err) => {
      if (err) throw err;
    }
  );

  res.send('subreddit created');
};

module.exports = { createSubreddit };
