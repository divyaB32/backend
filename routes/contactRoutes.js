import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

/* ---------- MULTER CONFIG ---------- */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* ---------- CUSTOMER ENQUIRY (POST) ---------- */
router.post("/", upload.single("customImage"), async (req, res) => {
  const { name, phone, message, tileName, tileImage } = req.body;
  const uploadedFile = req.file;

  if (!name || !phone || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // ✅ SAVE TO DATABASE
    const enquiry = new Enquiry({
      name,
      phone,
      message,
      tileName,
      tileImage,
      customImage: uploadedFile ? uploadedFile.path : null
    });

    await enquiry.save();

    // ✅ SEND EMAIL (UNCHANGED)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const attachments = [];

    if (uploadedFile) {
      attachments.push({
        filename: uploadedFile.originalname,
        path: uploadedFile.path
      });
    }

    if (tileImage) {
      const imagePath = path.join(process.cwd(), tileImage);
      if (fs.existsSync(imagePath)) {
        attachments.push({
          filename: path.basename(tileImage),
          path: imagePath
        });
      }
    }

    await transporter.sendMail({
      from: `"Krishna Ceramics Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Tile Enquiry",
      html: `
        <h2>New Tile Enquiry</h2>
        <p><b>Tile Selected:</b> ${tileName || "Customer Uploaded Reference"}</p>
        <hr/>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
      attachments
    });

    res.json({ message: "Enquiry submitted successfully" });

  } catch (error) {
    console.error("Enquiry error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------- ADMIN: GET ALL ENQUIRIES (NEW) ---------- */
router.get("/all", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Fetch enquiries error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;