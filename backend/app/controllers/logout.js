const logout = (req, res) => {
  res.clearCookie('access-token');
  res.send({ isLoggedIn: false });
};
module.exports = { logout };
