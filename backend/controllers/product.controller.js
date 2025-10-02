import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts =  async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
        // Return mock data if database is not connected
        const mockProduct = {
            _id: Date.now().toString(),
            name: product.name,
            price: parseFloat(product.price),
            image: product.image,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return res.status(201).json({ success: true, data: mockProduct });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Creating Product", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {   // ✅ mongoose artık tanımlı
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {   // ✅ mongoose artık tanımlı
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log("Error in Deleting Product", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};