const db = require('../models/');
const Subreddit = db.subreddit;

const redditNameRepeatedChecker = (req, res, next) => {
  Subreddit.findOne({ name: req.body.name }, (err, exist) => {
    if (err) {
      res.send(err);
    }
    if (exist) {
      res.send('Subreddit already exist.Pick another name.');
    }
    next();
  });
};
module.exports = { redditNameRepeatedChecker };
