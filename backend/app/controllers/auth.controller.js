const db = require('../models');
const User = db.user;

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const register = (req, res) => {

  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    username: req.body.username,
  });
  user.save();
  const accessToken = jwt.sign(
    { username: user.username, id: user._id },
    'jwtsecretplschange'
  );

  res.cookie('qid', accessToken, {
    maxAge: 60 * 60 * 24 * 30 * 1000,
  });

  res.send({
    user: {
      username: req.body.username,
      isLoggedIn: true,
      message: 'Register Successful',
    },
  });
};

const login = async (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, userObj) => {
    if (err) {
      res.status(400).send('err');
    } else if (userObj) {
      bcrypt.compare(req.body.password, userObj.password).then((match) => {
        if (!match) {
          res.status(404).send({
            error: 'Wrong Username and Password Combination!',
            errortype: 'Password',
          });
        } else {
          const accessToken = jwt.sign(
            { username: userObj.username, id: userObj._id },
            'jwtsecretplschange'
          );

          res.cookie('qid', accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
          });
          res.send({
            user: {
              username: userObj.username,
              isLoggedIn: true,
              message: 'Login Successfull',
            },
          });
        }
      });
    }
  });
};
const logout = (req, res) => {
  res.clearCookie('qid');
  res.send({
    user: { isLoggedIn: false, user: null, message: 'Logout Successful' },
  });
};
module.exports = { register, login, logout };
