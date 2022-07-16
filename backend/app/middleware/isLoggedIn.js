var jwt = require('jsonwebtoken');
const { parseJwt } = require('../utils/parseJwt');

const isLoggedIn = async (req, res, next) => {
  console.log(req.headers.cookie);
  console.log(req.cookies.cart);
  const accessToken = req.cookies.qid;
  console.log(accessToken);
  if (accessToken === undefined) {
    res.send({ isLoggedIn: false, username: '' });
  } else {
    jwt.verify(accessToken, 'jwtsecretplschange', async (err, decodedToken) => {
      if (err) {
        console.log(err);

        res.send({ isLoggedIn: false, usernmae: '' });
      }
      console.log(decodedToken);
      let user = decodedToken;

      res.send({ ...decodedToken, isLoggedIn: true });
    });
  }
};
module.exports = { isLoggedIn };
