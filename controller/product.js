const model = require('../models/index');
const fs = require('fs');
const mongoose = require('mongoose');
const Ecom = model.Ecom;
//post
exports.createProduct = async (req, res) => {
    try {
        const data = new Ecom(req.body);
        const savedProduct = await data.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ error: "Failed to create product" });
    }
};
//getall
exports.getProducts = async (req, res) => {
    try {
        const products = await Ecom.find();
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
//getone
exports.getProduct = async (req, res) => {
    try {
        const productTitle = req.params.title;
        console.log("Received title:", productTitle);
        const product = await Ecom.findOne({ title: productTitle});

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        } else {
            return res.status(201).json(product);
        }
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ error: "Failed to fetch product" });
    }
}
//put-update
exports.replaceProduct = async (req, res) => {
    try {
        const productTitle = req.params.title;
        const replacedProduct = await Ecom.findOneAndReplace(
            { title: productTitle },
            req.body,
            { new: true }
        );

        if (!replacedProduct) {
            return res.status(404).json({ error: "Product not found" });
        } else {
            return res.status(200).json(replacedProduct);
        }
    } catch (err) {
        console.error("Error replacing product:", err);
        res.status(500).json({ error: "Failed to replace product" });
    }
};
//patch-update
exports.updateProduct = async (req, res) => {
    try {
        const productTitle = req.params.title;
        const updatedProduct = await Ecom.findOneAndUpdate(
            { title: productTitle },
            { $set: req.body },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        } else {
            return res.status(200).json(updatedProduct);
        }
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ error: "Failed to update product" });
    }
}
//delete
exports.deleteProduct = async (req, res) => {
    try {
        const productTitle = req.params.title;
        const deletedProduct = await Ecom.findOneAndDelete({ title: productTitle });
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        } else {
            return res.status(200).json({ message: "Product deleted successfully" });
        }
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ error: "Failed to delete product" });
    }
};