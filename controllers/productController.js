//controller that fetches data about product from database
const asyncHandler = require("express-async-handler");
const { getAllInstruments, addInstrument } = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("itemname").trim().escape().isLength({ min: 1, max: 100 }).withMessage("Name is required"),
  body("description").trim().escape().isLength({ min: 1, max: 500 }).withMessage("A description is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
];

exports.getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await getAllInstruments();
    req.products = products;
    next();
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("An error occurred while fetching products");
  }
});

exports.allProductsGet = asyncHandler(async (req, res) => {
  res.render("allproducts", { instruments: req.products });
});

exports.addProductPost = [
  validateProduct,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("./changeitems/additem", {
        errors: errors.array(),
        categories: req.categories,
      });
    }
    const { itemname, description, price, category } = req.body;
    await addInstrument(itemname, description, price, category);
    res.redirect("back");
  }),
];

exports.addProductGet = asyncHandler(async (req, res) => {
  res.render("./changeitems/additem", { categories: req.categories });
});
