const express = require("express");
const {
  register,
  activateAccount,
  signin,
  deleteUser,
} = require("../../Controllers/admin/authController");
const { TokenControl } = require("../../Middelwares/AuthMiddelware");
const router = express.Router();

router.post("/admin/register", register);
router.post("/admin/activate", activateAccount);
router.post("/admin/signin", signin);
router.post("/admin/deleteuser", deleteUser);

module.exports = router;
