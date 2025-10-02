import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
const router = express.Router();
// GET all products
router.get("/", getProducts);
// POST create product
router.post("/", createProduct);
// PUT update product
router.put("/:id", updateProduct);
// DELETE product
router.delete("/:id", deleteProduct);

export default router;