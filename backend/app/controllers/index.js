const auth = require('./auth.controller');
const post = require('./post.controller');
const subreddit = require('./subreddit.controller');

const controller = {};
controller.auth = auth;
controller.post = post;
controller.subreddit = subreddit;

module.exports = controller;
