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

  res.send(req.body);
};

const login = async (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, userObj) => {
    if (err) {
      res.status(400).send('err');
    } else if (userObj) {
      bcrypt.compare(req.body.password, userObj.password).then((match) => {
        if (!match) {
          console.log('userObj.password');
          res
            .status(404)
            .send({
              error: 'Wrong Username and Password Combination!',
              errortype: 'Password',
            });
        } else {
          console.log('working');
          const accessToken = jwt.sign(
            { username: userObj.username, id: userObj._id },
            'jwtsecretplschange'
          );

          res.cookie('access-token', accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
          });
          res.send({ login: 'Login Successfull', username: userObj.username });
        }
      });
    }
  });
};

module.exports = { register, login };
