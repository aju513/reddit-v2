const router = require('express').Router();
const {
  login,
  authJwt,
  subredditChecker,
  register,
} = require('../middleware/');

const { comment, auth, post, subreddit, user } = require('../controllers');
const { isLoggedIn } = require('../middleware/isLoggedIn');

//auth routes
router.post('/login', login.emailChecker, auth.login);
router.post(
  '/register',
  register.emailChecker,
  register.usernameChecker,
  auth.register
);
router.get('/logout', auth.logout);
//display routes
router.get('/posts', post.getAllPost);
router.post('/posts', post.createPost);
router.post('/comment', comment.createComment);
router.get('/comment', comment.getComment);
router.get('/isLoggedIn', isLoggedIn);
router.post('/subreddit', subreddit.createSubreddit);
router.post('/upvote', post.upVote);
router.get('/userSubreddits', user.userJoinedSubreddit);
module.exports = router;
