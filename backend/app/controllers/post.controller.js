const { parseJwt } = require('../utils/parseJwt');
var ObjectId = require('mongodb').ObjectID;
const db = require('../models');
const { isObjectIdOrHexString } = require('mongoose');
const { ObjectID } = require('mongodb');
const { populate } = require('../models/subreddit.model');

const Post = db.post;
const User = db.user;
const Subreddit = db.subreddit;

const createPost = async (req, res) => {
  //send request name for subreddit and username that is stored in userContext.
  const accessToken = req.cookies.qid;
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
  const accessToken = req.cookies.qid;
  const userId = parseJwt(accessToken).id;

  if (!req.query.current) {
    Post.find({})
      .populate('user')
      .populate('subreddit')
      .exec((err, obj) => {

        res.send({ post: obj, userId: userId });
      });
  } else if (req.query.current) {
    Subreddit.findOne({ name: req.query.current })
      .populate('user')
      .populate('subreddit')
      .exec((err, obj) => {
        res.send({ post: obj.post, userId: userId });
      });
  }
};
const upVote = (req, res) => {
  //some initialization
  const upVote = req.body.upvote;
  const postId = req.body.postId;
  const accessToken = req.cookies.qid;
  const userId = parseJwt(accessToken).id;

  //check if there is a post inside votes of array to see if the user exist
  Post.findOne(
    {
      _id: ObjectId(postId),
      votes: { $elemMatch: { userId: userId } },
    },

    function (err, review) {
      //if user of votes userid==null
      if (!review) {
        Post.findOne(
          {
            _id: ObjectId(postId),
          },
          (err, review) => {
            //soem incremental and decremental logic just to make sure zero doesnot appear
            if (review.voteBalance === -1 && upVote == true) {
              var updateNew = {
                $addToSet: { votes: { userId: userId, upvote: upVote } },
                $inc: { voteBalance: 2 },
              };
            } else if (review.voteBalance === 1 && upVote == false) {
              var updateNew = {
                $addToSet: { votes: { userId: userId, upvote: upVote } },
                $inc: { voteBalance: -2 },
              };
            } else if (upVote) {
              var updateNew = {
                $addToSet: { votes: { userId: userId, upvote: upVote } },
                $inc: { voteBalance: 1 },
              };
            } else {
              var updateNew = {
                $addToSet: { votes: { userId: userId, upvote: upVote } },
                $inc: { voteBalance: -1 },
              };
            }
            //updata the post with new userid and votecount
            Post.findOneAndUpdate(
              { _id: ObjectId(postId) },
              updateNew,
              { new: true },
              function (err, review) {
                if (err) {
                  console.log(err);
                  return res.status(500).send();
                }
                res
                  .status(200)
                  .send({ upvote: !!upVote, voteBalance: review.voteBalance });
              }
            );
          }
        );
        //if user exist
      } else {
        //some incremental decremental logic
        if (review.voteBalance === -1 && upVote == true) {
          var update = {
            $set: { 'votes.$.upvote': upVote },
            $inc: { voteBalance: 2 },
          };
        } else if (review.voteBalance === 1 && upVote == false) {
          var update = {
            $set: { 'votes.$.upvote': upVote },
            $inc: { voteBalance: -2 },
          };
        } else if (upVote) {
          var update = {
            $set: { 'votes.$.upvote': upVote },
            $inc: { voteBalance: 1 },
          };
        } else {
          var update = {
            $set: { 'votes.$.upvote': upVote },
            $inc: { voteBalance: -1 },
          };
        }
        //update the new value  i.e increment or decrement

        Post.findOneAndUpdate(
          {
            _id: ObjectId(postId),
            votes: { $elemMatch: { userId: userId } },
          },
          update,
          { new: true },
          function (err, obj) {
            console.log(obj);
            if (err) {
              return res.status(500).send();
            }
            res
              .status(200)
              .send({ upvote: !!upVote, voteBalance: obj.voteBalance });
          }
        );
      }
    }
  );
};

module.exports = { createPost, getAllPost, upVote };
