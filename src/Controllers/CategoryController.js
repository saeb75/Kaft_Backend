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

exports.getCategoreis = (req, res) => {
  category
    .find({})
    .populate("parentId")
    .exec(async (err, categories) => {
      if (err) return err;
      if (categories) {
        let allCategories = getListOfCategories(categories);
        res.json({
          success: true,
          allCategories,
        });
      }
    });
};

let getListOfCategories = (categories, parentId) => {
  const categoryList = [];

  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => {
      return cat.parentId && cat.parentId._id.toString() == parentId.toString();
    });
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: getListOfCategories(categories, cate._id),
    });
  }

  return categoryList;
};
