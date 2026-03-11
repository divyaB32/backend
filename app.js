import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// APIs
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);

// ✅ STATIC FOLDERS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/mask", express.static(path.join(__dirname, "mask")));
app.use("/rooms", express.static(path.join(__dirname, "rooms")));

// OPTIONAL if stored inside uploads
app.use("/tiles", express.static(path.join(__dirname, "uploads/tiles")));
app.use("/preview", express.static(path.join(__dirname, "uploads/preview")));
app.use("/hangover", express.static(path.join(__dirname, "uploads/hangover")));

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

export default app;