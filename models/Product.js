import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
series: { type: String, required: true, trim: true },
category: { type: String, trim: true },

tileImage: { type: String, required: true },
hoverImage: { type: String, default: "" },
previewImages: { type: [String], default: [] },

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