const { parseJwt } = require('../utils/parseJwt');

const db = require('../models');
const Post = db.post;
const User = db.user;
const Subreddit = db.subreddit;
const createPost = async (req, res) => {
  //send request name for subreddit and username that is stored in userContext.
  const accessToken = req.cookies.qid;
  const userId = parseJwt(accessToken).id;
  Subreddit.findOne({ name: req.body.name }, (err, obj) => {
    if (obj) {
      const postByUser = new Post({
        post: { title: req.body.post.title, content: req.body.post.content },
        user: {
          _id: parseJwt(accessToken).id,
        },
        subreddit: { _id: obj._id },
      });
      postByUser.save();
      User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { post: postByUser._id } },

        (err) => {
          if (err) throw err;
        }
      );
      Subreddit.findOneAndUpdate(
        { name: req.body.name },
        { $push: { post: postByUser._id } },

        (err) => {
          if (err) throw err;
        }
      );
    }
  });

  //pushed post inside the User Model

  res.send(req.body);
};
const getAllPost = (req, res) => {
  console.log(req.query);
  if (!req.query.current) {
    Post.find({}, (err, obj) => {
      res.send(obj);
    });
  } else if (req.query.current) {
    Subreddit.find({ name: req.query.current })
      .populate('post')
      .exec((err, obj) => {
        console.log(obj);
        res.send(obj[0].post);
      });
  }
};
module.exports = { createPost, getAllPost };
