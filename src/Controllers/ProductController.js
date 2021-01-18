const { json } = require("body-parser");
const { default: slugify } = require("slugify");
const Product = require("../Models/product");

exports.addProduct = (req, res) => {
  const { name, description, productDetails, category, slug } = req.body;

  let productImg = [];
  if (req.files) {
    productImg = req.files.map((file) => {
      return { img: `${process.env.API_URL}/public/${file.filename}` };
    });
  }
  let myProductList = [];
  productDetails.map((item) => {
    myProductList.push(JSON.parse(item));
  });

  let productObj = {
    name,
    slug: slugify(slug),
    description,
    productImg,
    productDetails: myProductList,
    category,
  };
  let product = new Product(productObj);
  product.save((err, _product) => {
    if (err) return err;
    if (_product) {
      return res.json(_product);
    }
  });
};
