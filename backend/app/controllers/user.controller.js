const { parseJwt } = require('../utils/parseJwt');
const db = require('../models');
const User = db.user;
const userJoinedSubreddit = (req, res) => {
  const accessToken = req.cookies.qid;
  const userId = parseJwt(accessToken).id;
  var response = [];
  User.findOne({ id: userId })
    .populate('userJoinedSubReddit')
    .then(({ userJoinedSubReddit }) => {
      userJoinedSubReddit.forEach(function (arrayItem) {
        response.push(arrayItem.name);
      });

      res.send({ joinedSubreddit: response });
    });
};
module.exports = { userJoinedSubreddit };
