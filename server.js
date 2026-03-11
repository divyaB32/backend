import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC FILE SERVING =================

// uploads (product images)
app.use("/uploads", express.static("uploads"));

// existing frontend static folders
app.use("/hangover", express.static(path.join(process.cwd(), "../frontend/public/hangover")));
app.use("/preview", express.static(path.join(process.cwd(), "../frontend/public/preview")));
app.use("/tiles", express.static(path.join(process.cwd(), "../frontend/public/tiles")));

// ✅ NEW — Visualizer folders (IMPORTANT)
app.use("/rooms", express.static("rooms"));
app.use("/mask", express.static("mask"));

// ======================================================

// routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/match-tiles", matchRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);