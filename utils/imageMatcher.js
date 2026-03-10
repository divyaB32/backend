import sharp from "sharp";
import Product from "../models/Product.js";

export async function findSimilarTiles(imagePath) {
  // Extract average color from uploaded image
  const stats = await sharp(imagePath)
    .resize(50, 50)
    .stats();

  const uploaded = stats.dominant;

  const products = await Product.find();

  const scored = products
    .filter(p => p.avgColor)
    .map(p => {
      const diff =
        Math.abs(p.avgColor.r - uploaded.r) +
        Math.abs(p.avgColor.g - uploaded.g) +
        Math.abs(p.avgColor.b - uploaded.b);

      return { product: p, score: diff };
    });

  return scored
    .sort((a, b) => a.score - b.score)
    .slice(0, 8)
    .map(s => s.product);
}