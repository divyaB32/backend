import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    series: { type: String, required: true },
    category: { type: String },

    tileImage: { type: String, required: true },
    hoverImage: { type: String },
    previewImages: [{ type: String }],

    // ✅ OPTIONAL – DO NOT REQUIRED
    avgColor: {
      r: { type: Number, default: null },
      g: { type: Number, default: null },
      b: { type: Number, default: null }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);