const logout = (req, res) => {
  res.clearCookie('qid');
  res.send({
    user: { isLoggedIn: false, user: null, message: 'Logout Successful' },
  });
};
module.exports = { logout };
