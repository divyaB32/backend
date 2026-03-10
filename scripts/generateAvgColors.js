import mongoose from "mongoose";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

const getAverageColor = async (imagePath) => {
  const { data, info } = await sharp(imagePath)
    .resize(40, 40)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let r = 0, g = 0, b = 0;

  for (let i = 0; i < data.length; i += info.channels) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  const pixels = data.length / info.channels;

  return {
    r: Math.round(r / pixels),
    g: Math.round(g / pixels),
    b: Math.round(b / pixels)
  };
};

const run = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Mongo Connected");

  const products = await Product.find();

  for (const product of products) {
    try {
      // ✅ Skip already processed
      if (product.avgColor?.r !== null) continue;

      // ✅ Prefer tileImage
      const imgPath = product.tileImage;
      if (!imgPath) continue;

      const fullPath = path.join(UPLOADS_DIR, path.basename(imgPath));

      if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️ Missing file: ${product.name}`);
        continue;
      }

      const avgColor = await getAverageColor(fullPath);

      // ✅ Validate numbers
      if (
        isNaN(avgColor.r) ||
        isNaN(avgColor.g) ||
        isNaN(avgColor.b)
      ) {
        console.warn(`⚠️ Invalid color for ${product.name}`);
        continue;
      }

      product.avgColor = avgColor;
      await product.save();

      console.log(`🎨 Updated: ${product.name}`);
    } catch (err) {
      console.error(`❌ Failed for ${product.name}`, err.message);
    }
  }

  console.log("🎉 DONE");
  process.exit();
};

run();