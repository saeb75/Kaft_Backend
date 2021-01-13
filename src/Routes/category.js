const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const {
  addCategory,
  getCategoreis,
} = require("../Controllers/CategoryController");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname)) + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/category/addcategory", upload.single("categoryImg"), addCategory);
router.get(
  "/category/getcategories",

  getCategoreis
);
module.exports = router;
