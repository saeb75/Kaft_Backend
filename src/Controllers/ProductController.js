const { default: slugify } = require("slugify");
const Product = require("../Models/product");

exports.addProduct = (req, res) => {
  const { name, description, color, productDetails, category } = req.body;

  let productObj = {
    name,
    slug: slugify(req.body.name),
    description,
    color,
    productDetails,
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
