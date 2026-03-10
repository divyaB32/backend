import express from "express";
import upload from "../middleware/upload.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "tileImage", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
    { name: "previewImages", maxCount: 10 }
  ]),
  createProduct
);

router.get("/", getProducts);
router.get("/:id", getProductById);

router.put(
  "/:id",
  upload.fields([
    { name: "tileImage", maxCount: 1 },
    { name: "hoverImage", maxCount: 1 },
    { name: "previewImages", maxCount: 10 }
  ]),
  updateProduct
);

router.delete("/:id", deleteProduct);

export default router;
