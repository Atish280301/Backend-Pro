const express = require("express");
const productControler = require('../controller/product')
const router = express.Router();

router
    .post("/", productControler.createProduct)
    .get("/", productControler.getProducts)
    .get("/:title", productControler.getProduct)
    .put("/:title", productControler.replaceProduct)
    .patch("/:title", productControler.updateProduct)
    .delete("/:title", productControler.deleteProduct)

exports.routes = router;