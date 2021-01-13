const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

exports.TokenControl = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.LOGIN_JWT);
    req.user = user;
  } else {
    return res.status(500).json({ message: "Authorization required" });
  }
  next();
  //jwt.decode()
};
