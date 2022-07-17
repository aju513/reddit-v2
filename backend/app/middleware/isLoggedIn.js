var jwt = require('jsonwebtoken');
const { parseJwt } = require('../utils/parseJwt');

const isLoggedIn = async (req, res, next) => {
  console.log(req.headers.cookie);
  console.log(req.cookies.cart);
  const accessToken = req.cookies.qid;
  console.log(accessToken);
  if (accessToken === undefined) {
    res.send({ user: { isLoggedIn: false, usernmae: null } });
  } else {
    jwt.verify(accessToken, 'jwtsecretplschange', async (err, decodedToken) => {
      if (err) {
        console.log(err);

        res.send({ user: { isLoggedIn: false, usernmae: null } });
      }
      console.log(decodedToken);

      res.send({ user: { username: decodedToken.username, isLoggedIn: true } });
    });
  }
};
module.exports = { isLoggedIn };
