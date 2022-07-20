const db = require('../models');
const User = db.user;
const Subreddit = db.subreddit;

const { parseJwt } = require('../utils/parseJwt');

const createSubreddit = async (req, res) => {
  const accessToken = req.cookies.qid;
  console.log(accessToken);
  const userId = parseJwt(accessToken).id;
  console.log(userId);
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
    { $push: { userJoinedSubReddit: newSubreddit._id } },

    (err) => {
      if (err) throw err;
    }
  );

  res.send({
    subreddit: {
      creator: req.body.username,
      name: req.body.name,
      message: 'Subredit Created Successfull',
    },
  });
};

module.exports = { createSubreddit };
