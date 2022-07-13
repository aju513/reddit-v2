const db = require('../models');

const emailChecker = (req, res, next) => {
  db.user.findOne({ email: req.body.email }, function (err, obj) {
    if (err) {
      res.send(err);
    }
    if (obj) {
      res.send('already exist');
    } else {
      next();
    }
  });
};

const usernameChecker = (req, res, next) => {
  db.user.findOne({ password: req.body.password }, function (err, obj) {
    if (err) {
      res.send(err);
    }
    if (obj) {
      res.send('already exist');
    } else {
      next();
    }
  });
};
module.exports = { emailChecker, usernameChecker };
