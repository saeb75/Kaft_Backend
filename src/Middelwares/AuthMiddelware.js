const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

exports.TokenControl = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    try {
      let user = jwt.verify(token, process.env.LOGIN_JWT);
      req.user = user;
      res.json("find");
      next();
    } catch (error) {
      return res.json("not found token");
    }
  } else {
    res.json("not found token");
  }
};
