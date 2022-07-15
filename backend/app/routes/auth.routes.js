const router = require('express').Router();
const {
  login,
  authJwt,
  subredditChecker,
  register,
} = require('../middleware/');

const { auth, post, subreddit, logout } = require('../controllers');
const { isLoggedIn } = require('../middleware/isLoggedIn');

//auth routes
router.post('/login', login.emailChecker, auth.login);
router.post(
  '/register',
  register.emailChecker,
  register.usernameChecker,
  auth.register
);
router.get('/logout', logout);
//display routes
router.get('/user', authJwt.verifyJwt, (req, res) => {
  console.log(req.authenticated);
  res.send('login');
});
router.post('/posts', authJwt.verifyJwt, post.createPost);
router.get('/isLoggedIn', isLoggedIn);
router.post(
  '/subreddit',
  authJwt.verifyJwt,
  subredditChecker.redditNameRepeatedChecker,
  subreddit.createSubreddit
);

module.exports = router;
