import express from "express";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const uploadRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image only admin can use
uploadRouter.post(
    "/",
    protect,
    admin,
    asyncHandler(async (req, res) => {

        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ msg: "Không có tập tin nao được tải lên." });
            }

            const file = req.files.file;
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath);
                return res.status(400).json({ msg: "Kích thước quá lớn." });
            }

            if (
                file.mimetype !== "image/jpeg" &&
                file.mimetype !== "image/png"
            ) {
                removeTmp(file.tempFilePath);
                return res
                    .status(400)
                    .json({ msg: "Định dạng tệp không chính xác." });
            }
            //console.log("test");
            //console.log(file.tempFilePath);
            const path = file.tempFilePath;
            const lastIndex = path.lastIndexOf('\\');
            const fileName = path.substring(lastIndex + 1);
            console.log(fileName);

            let data = {
                url: 'http://localhost:5000/' + fileName
            }


            if (file.tempFilePath) return res.json(data)
            // cloudinary.v2.uploader.upload(
            //     file.tempFilePath,
            //     { folder: "ShoeShop" },
            //     async (err, result) => {
            //         if (err) {
            //             throw err;
            //         }
            //         removeTmp(file.tempFilePath);
            //         res.json({
            //             public_id: result.public_id,
            //             url: result.secure_url,
            //         });
            //     }
            // );

        } catch (err) {
            return res.json(err);
        }
    })
);

// Delete image only admin can use
uploadRouter.post("/destroy", protect, admin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) {
            return res.status(400).json({ msg: "Không có hình ảnh nào được chọn" });
        }
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) {
                throw err;
            }
            res.json({ msg: "Hình ảnh đã xóa" });
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            throw err;
        }
    });
};

export default uploadRouter;
