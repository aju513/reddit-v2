const authJwt = require('./authJwt');
const subredditChecker = require('./subreddit');
const login = require('./login');
const register = require('./register');
const middleware = {};
middleware.authJwt = authJwt;
middleware.subredditChecker = subredditChecker;
middleware.login = login;
middleware.register = register;

module.exports = middleware;
