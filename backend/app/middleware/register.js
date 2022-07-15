const db = require('../models');

const emailChecker = (req, res, next) => {
  db.user.findOne({ email: req.body.email }, function (err, obj) {
    if (err) {
      res.send({ error: 'dfhsdhf' });
    } else if (obj) {
      res
        .status(401)
        .send({ error: 'Email already exist', errorType: 'emailregister' });
    } else {
      next();
    }
  });
};

const usernameChecker = (req, res, next) => {
  db.user.findOne({ username: req.body.username }, function (err, obj) {
    if (err) {
      res.send(err);
    } else if (obj) {
      res.status(401).send({
        error: 'Username already exist',
        errorType: 'usernameregister',
      });
    } else {
      next();
    }
  });
};
module.exports = { emailChecker, usernameChecker };
