const auth = require('./auth.controller');
const post = require('./post.controller');
const subreddit = require('./subreddit.controller');
const logout = require('./logout');
const controller = {};
controller.auth = auth;
controller.post = post;
controller.subreddit = subreddit;
controller.logout = logout.logout;

module.exports = controller;
