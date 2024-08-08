//controller that fetches data about product from database
const asyncHandler = require("express-async-handler");
const { getAllInstruments, addInstrument, deleteInstrument, editInstrument, getSingleInstrument } = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("itemname").trim().isLength({ min: 1, max: 100 }).withMessage("Name is required"),
  body("description").trim().isLength({ min: 1, max: 500 }).withMessage("A description is required"),
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

exports.addProductGet = asyncHandler(async (req, res) => {
  res.render("./changeitems/additem", { categories: req.categories });
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
    res.redirect("/allproducts");
  }),
];

exports.deleteProductGet = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  res.render("./changeitems/deleteitem", { instrumentid: productId });
});

const validatePass = body("pass")
  .notEmpty()
  .custom((value, { req }) => {
    if (value !== process.env.SECRETPASS) {
      throw new Error("Incorrect Password");
    }
    return true;
  });

exports.deleteProductPost = [
  validatePass,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const productId = req.params.id;
    if (!errors.isEmpty()) {
      return res.status(400).render("./changeitems/deleteitem", {
        errors: errors.array(),
        instrumentid: productId,
      });
    }
    await deleteInstrument(productId);
    res.redirect("/allproducts");
  }),
];

exports.editProductGet = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await getSingleInstrument(productId);
  res.render("./changeitems/edititem", { instrument: product, categories: req.categories });
});

exports.editProductPost = [
  validateProduct,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const productId = req.params.id;
    const product = await getSingleInstrument(productId);
    if (!errors.isEmpty()) {
      return res.status(400).render("./changeitems/edititem", {
        errors: errors.array(),
        instrument: product,
        categories: req.categories,
      });
    }
    const { itemname, description, price, category } = req.body;
    await editInstrument(productId, itemname, description, price, category);
    res.redirect("/allproducts");
  }),
];
