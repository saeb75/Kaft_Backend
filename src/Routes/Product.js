const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const { addProduct } = require("../Controllers/ProductController");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname)) + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/product/add", upload.array("productImg"), addProduct);

module.exports = router;
