const jwt = require('jsonwebtoken');
const { parseJwt } = require('../utils/parseJwt');

const isLoggedIn = (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    res.send({ isLoggedIn: false });
  }

  const validateToken = jwt.verify(accessToken, 'jwtsecretplschange');
  const payload = parseJwt(accessToken);
  if (validateToken) {
    res.send({ isLoggedIn: true, payload: payload });
  } else {
    res.send({ isLoggedIn: false });
  }
};
module.exports = { isLoggedIn };
