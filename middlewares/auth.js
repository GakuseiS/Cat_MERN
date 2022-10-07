const jwt = require("jsonwebtoken");
// const keys = require('../keys/index')

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Вы не авторизированы" });
    }
    // req.user = jwt.verify(token, keys.SESSION_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ message: "Вы не авторизированы" });
  }
};
