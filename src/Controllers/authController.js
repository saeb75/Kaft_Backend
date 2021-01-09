const user = require("../Models/user");

exports.getUsers = (req, res) => {
  user.find().exec((err, _user) => {
    if (err) return err;
    if (_user) {
      return res.json(_user);
    }
  });
};
