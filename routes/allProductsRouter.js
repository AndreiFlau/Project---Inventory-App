const { Router } = require("express");
const { allProductsGet } = require("../controllers/productController");
const allProductsRouter = Router();

allProductsRouter.get("/", allProductsGet);

module.exports = allProductsRouter;
