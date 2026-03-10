import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

// single image upload
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    imagePath: `/uploads/${req.file.filename}`
  });
});

export default router;
