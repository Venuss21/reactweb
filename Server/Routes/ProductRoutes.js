import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const productRouter = express.Router();

// Get all product
productRouter.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await Product.find({}).sort({ _id: -1 });
        res.json(products);
    })
);

// Admin get all
productRouter.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const products = await Product.find({}).sort({ _id: -1 });
        res.json(products);
    })
);

// Get single product
productRouter.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error("Sản phẩm không tồn tại!");
        }
    })
);

// Product review
productRouter.post(
    "/:id/review",
    protect,
    asyncHandler(async (req, res) => {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );
            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Sản phẩm đã được đánh giá");
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;
            await product.save();
            res.status(201).json({ message: "Đã thêm đánh giá" });
        } else {
            res.status(404);
            throw new Error("Sản phẩm không có!");
        }
    })
);

// Delete product
productRouter.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.json({ message: "Đã xóa sản phẩm" });
        } else {
            res.status(404);
            throw new Error("Sản phẩm không có!");
        }
    })
);

// Create product
productRouter.post(
    "/",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, price, countInStock, description, category, image } =
            req.body;

        const productExists = await Product.findOne({ name });

        if (productExists) {
            res.status(400);
            throw new Error("Tên sản phẩm đã tồn tại");
        } else {
            const product = new Product({
                name,
                price,
                countInStock,
                description,
                category,
                image,
                user: req.user._id,
            });

            if (product) {
                const createProduct = await product.save();
                res.status(201).json(createProduct);
            } else {
                res.status(400);
                throw new Error("Dữ liệu sản phẩm không hợp lệ");
            }
        }
    })
);

// Update product
productRouter.put(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, price, countInStock, description, category, image } =
            req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.countInStock = countInStock || product.countInStock;
            product.description = description || product.description;
            product.category = category || product.category;
            product.image = image || product.image;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error("Sản phẩm không có");
        }
    })
);

export default productRouter;
