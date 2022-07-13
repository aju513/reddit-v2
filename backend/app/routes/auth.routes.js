const router = require('express').Router();
const {
  login,
  authJwt,
  subredditChecker,
  register,
} = require('../middleware/');

const { auth, post, subreddit } = require('../controllers');

//auth routes
router.post('/login', login.emailChecker, auth.login);
router.post('/register', register.emailChecker, auth.register);

//display routes
router.get('/user', authJwt.verifyJwt, (req, res) => {
  console.log(req.authenticated);
  res.send('login');
});
router.post('/posts', authJwt.verifyJwt, post.createPost);

router.post(
  '/subreddit',
  authJwt.verifyJwt,
  subredditChecker.redditNameRepeatedChecker,
  subreddit.createSubreddit
);

module.exports = router;
