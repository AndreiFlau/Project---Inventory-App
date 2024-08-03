const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const allProductsRouter = require("./routes/allProductsRouter");
const categoryRouter = require("./routes/categoryRouter");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set(("views", path.join(__dirname, "views")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/allproducts", allProductsRouter);
app.use("/categories", categoryRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
