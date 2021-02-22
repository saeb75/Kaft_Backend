const express = require("express");
const router = express.Router();
const {
  addFeature,
  addToDiscount,
  removeProductFromDiscount,
} = require("../Controllers/featureController");
router.post("/feature/add", addFeature);
router.post("/feature/discount/add", addToDiscount);
router.post("/feature/discount/remove", removeProductFromDiscount);
module.exports = router;
