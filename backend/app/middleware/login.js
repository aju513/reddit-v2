const db = require('../models');
const jwt = require('jsonwebtoken');
const { rawListeners } = require('../models/user.model');
const emailChecker = (req, res, next) => {
  db.user.findOne({ email: req.body.email }, function (err, obj) {
    if (!obj) {
      res.status(404).send({ error: 'No User found', errorType: 'email' });
    }
  });
  next();
};

module.exports = { emailChecker };
