import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

// ES module path fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// APIs
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/contact", contactRoutes);
// Existing uploads folder (KEEP)
app.use("/uploads", express.static("uploads"));

/* ✅ ADD THESE – FIX IMAGE NOT SHOWING ISSUE */
app.use(
  "/tiles",
  express.static(path.join(__dirname, "../frontend/public/tiles"))
);
app.use(
  "/hangover",
  express.static(path.join(__dirname, "../frontend/public/hangover"))
);
app.use(
  "/preview",
  express.static(path.join(__dirname, "../frontend/public/preview"))
);

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

export default app;
