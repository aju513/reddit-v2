const db = require('../models');
const Comment = db.comment;
const createComment = (req, res) => {
  console.log(req.body);
  const file = new Comment({
    post: req.body.postId,
    user: req.body.userId,
    parentId: req.body.parentId ? req.body.parentId : null,
    text: req.body.text,
  });
  file.save();
  res.send('ok');
};
const getComment = (req, res) => {
  Comment.find({}, (err, obj) => {
    console.log(obj);
    res.send(obj);
  });
};
module.exports = { createComment, getComment };
