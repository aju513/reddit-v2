const { parseJwt } = require('../utils/parseJwt');

const db = require('../models');
const Post = db.post;
const User = db.user;

const createPost = async (req, res) => {
  const accessToken = req.cookies['access-token'];
  const userId = parseJwt(accessToken).id;

  const postByUser = new Post({
    post: req.body.post,
    user: {
      _id: parseJwt(accessToken).id,
    },
  });
  postByUser.save();

  //pushed post inside the User Model
  User.findOneAndUpdate(
    { _id: userId },
    { $push: { post: postByUser._id } },
    { new: true, upsert: true },
    function (err, userDocument) {
      if (err) throw err;
    }
  );

  res.send(req.body);
};

module.exports = { createPost };
