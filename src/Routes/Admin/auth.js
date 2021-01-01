const express = require("express");
const {
  register,
  activateAccount,
  signin,
} = require("../../Controllers/admin/authController");
const router = express.Router();

router.post("/admin/register", register);
router.post("/admin/activate", activateAccount);
router.post("/admin/signin", signin);

module.exports = router;
