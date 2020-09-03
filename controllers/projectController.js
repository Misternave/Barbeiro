const index = async (req, res) => {
  res.send({ ok: true, user: req.userId });
};

module.exports = {
  index,
};
