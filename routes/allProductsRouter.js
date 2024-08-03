const { Router } = require("express");
const {
  allProductsGet,
  getProducts,
  addProductGet,
  addProductPost,
  deleteProductGet,
  deleteProductPost,
  editProductGet,
  editProductPost,
} = require("../controllers/productController");
const { getCategories } = require("../controllers/categoryController");
const allProductsRouter = Router();

allProductsRouter.use(getProducts);
allProductsRouter.use(getCategories);

allProductsRouter.get("/", allProductsGet);
allProductsRouter.get("/createitem", addProductGet);
allProductsRouter.post("/createitem", addProductPost);
allProductsRouter.get("/deleteitem/:id", deleteProductGet);
allProductsRouter.post("/deleteitem/:id", deleteProductPost);
allProductsRouter.get("/edititem/:id", editProductGet);
allProductsRouter.post("/edititem/:id", editProductPost);

module.exports = allProductsRouter;
