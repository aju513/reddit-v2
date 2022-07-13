const User = require('./user.model');
const Post = require('./posts.model');
const Subreddit = require('./subreddit.model');
const db = {};
db.user = User;
db.post = Post;
db.subreddit = Subreddit;
module.exports = db;
