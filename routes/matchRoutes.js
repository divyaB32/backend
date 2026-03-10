import express from "express";
import multer from "multer";
import { findSimilarTiles } from "../utils/imageMatcher.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const matches = await findSimilarTiles(req.file.path);
    res.json({ matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Image matching failed" });
  }
});

export default router;