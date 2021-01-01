const { default: slugify } = require("slugify");
const category = require("../Models/category");

exports.addCategory = async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  if (req.file) {
    categoryObj.categoryImg = `${process.env.API_URL}/public/${req.file.filename}`;
  }

  const mycategory = await new category(categoryObj);
  mycategory.save((err, _category) => {
    if (err) return res.json(err);
    if (_category) {
      res.json({
        success: true,
        _category,
      });
    }
  });
};
