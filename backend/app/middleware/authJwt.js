const db = require('../models');
const jwt = require('jsonwebtoken');
const { rawListeners } = require('../models/user.model');
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
const verifyJwt = (req, res, next) => {
  const accessToken = req.cookies['access-token'];
  if (!accessToken) {
    res.status(400).send({ isLoggedIn: false });
  }

  const validateToken = jwt.verify(accessToken, 'jwtsecretplschange');
  if (validateToken) {
    res.status(400).send({ isLoggedIn: accessToken });
  } else {
    res.send({ isLoggedIn: false });
  }
};
module.exports = { verifyJwt, emailChecker, usernameChecker };
