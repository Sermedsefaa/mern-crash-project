import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // allow to accept json data in the req.body

// API Routes
app.use("/api/products", productRoutes);

// Test endpoint
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

// Frontend production
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    // Static files
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    // SPA fallback
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Connect MongoDB
connectDB().then(() => {
    console.log("✅ MongoDB connected successfully");
}).catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("⚠️  Server will continue without database connection");
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
