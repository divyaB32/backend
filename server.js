import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "*", // or set your frontend URL e.g. "https://your-frontend.vercel.app"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC FILE SERVING =================
// FIX: Use absolute paths with __dirname so deployed servers find files correctly

// Uploads (product images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Frontend public folders
app.use("/hangover", express.static(path.join(__dirname, "../frontend/public/hangover")));
app.use("/preview",  express.static(path.join(__dirname, "../frontend/public/preview")));
app.use("/tiles",    express.static(path.join(__dirname, "../frontend/public/tiles")));

// ✅ VISUALIZER folders — FIXED: absolute paths so they work after deployment
app.use("/rooms", express.static(path.join(__dirname, "rooms")));
app.use("/mask",  express.static(path.join(__dirname, "mask")));

// ======================================================

// ================= ROUTES =================
app.use("/api/products",    productRoutes);
app.use("/api/admin",       adminRoutes);
app.use("/api/contact",     contactRoutes);
app.use("/api/match-tiles", matchRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);