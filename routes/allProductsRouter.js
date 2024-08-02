const { Router } = require("express");
const { allProductsGet, getProducts, addProductGet, addProductPost } = require("../controllers/productController");
const { getCategories } = require("../controllers/categoryController");
const allProductsRouter = Router();

allProductsRouter.use(getProducts);
allProductsRouter.use(getCategories);

allProductsRouter.get("/", allProductsGet);
allProductsRouter.get("/createitem", addProductGet);
allProductsRouter.post("/createitem", addProductPost);

module.exports = allProductsRouter;
