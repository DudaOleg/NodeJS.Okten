module.exports = {
  loginUser: (req, res, next) => {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  }
};
