const logout = (req, res) => {
  res.clearCookie('qid');
  res.send({ isLoggedIn: false });
};
module.exports = { logout };
