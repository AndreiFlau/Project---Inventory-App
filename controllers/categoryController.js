//controller that calls db with inner/outer join and returns the products based on their ids
const asyncHandler = require("express-async-handler");
const {
  getCategories,
  getInstrumentsByCategories,
  createCategory,
  deleteCategory,
  editCategory,
  getSingleCategory,
} = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.getCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await getCategories();
    req.categories = categories;
    next();
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("An error occurred while fetching categories");
  }
});

exports.categoriesGet = asyncHandler(async (req, res) => {
  res.render("categories", { categories: req.categories });
});

exports.categorieProductsGet = asyncHandler(async (req, res) => {
  const categoryName = req.params.categoryName;
  const instruments = await getInstrumentsByCategories(categoryName);
  res.render("categoryproducts", { instruments: instruments });
});

const validateCategory = [body("categoryname").isLength({ min: 1, max: 100 })];

exports.createCategoryGet = asyncHandler(async (req, res) => {
  res.render("./changecategories/addcategory");
});

exports.createCategoryPost = [
  validateCategory,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("./changecategories/addcategory", {
        errors: errors.array(),
      });
    }
    const name = req.body.categoryname;
    await createCategory(name);
    res.redirect("/categories");
  }),
];

exports.deleteCategoryGet = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  res.render("./changecategories/deletecategory", { categoryid: categoryId });
});

const validatePass = body("pass")
  .notEmpty()
  .custom((value, { req }) => {
    if (value !== process.env.SECRETPASS) {
      throw new Error("Incorrect Password");
    }
    return true;
  });

exports.deleteCategoryPost = [
  validatePass,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const categoryId = req.params.id;
    if (!errors.isEmpty()) {
      return res.status(400).render("./changecategories/deletecategory", {
        errors: errors.array(),
        categoryid: categoryId,
      });
    }
    await deleteCategory(categoryId);
    res.redirect("/categories");
  }),
];

exports.editCategoryGet = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await getSingleCategory(categoryId);
  res.render("./changecategories/editcategory", { category: category });
});

exports.editCategoryPost = [
  validateCategory,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const categoryId = req.params.id;
    const category = await getSingleCategory(categoryId);
    if (!errors.isEmpty()) {
      return res.status(400).render("./changecategories/editcategory", {
        errors: errors.array(),
        category: category,
      });
    }
    const name = req.body.categoryname;
    await editCategory(categoryId, name);
    res.redirect("/categories");
  }),
];
