const express = require("express");
const {
  getUsers,
  registerUser,
  getAllEmail,
  activateUserAccount,
  signinUser,
} = require("../Controllers/authController");
const router = express.Router();

router.get("/getusers", getUsers);
router.get("/user/email", getAllEmail);
router.post("/user/register", registerUser);
router.post("/user/activate", activateUserAccount);
router.post("/user/login", signinUser);

module.exports = router;
