var jwt = require('jsonwebtoken');
const { parseJwt } = require('../utils/parseJwt');

const isLoggedIn = async (req, res, next) => {
  const accessToken = req.cookies.qid;
  if (accessToken === undefined) {
    res.send({ user: { isLoggedIn: false, usernmae: null } });
  } else {
    jwt.verify(accessToken, 'jwtsecretplschange', async (err, decodedToken) => {
      if (err) {
        console.log(err);

        res.send({ user: { isLoggedIn: false, usernmae: null } });
      }

      res.send({ user: { username: decodedToken.username, isLoggedIn: true } });
    });
  }
};
module.exports = { isLoggedIn };
