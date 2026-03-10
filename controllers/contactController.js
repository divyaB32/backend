const Enquiry = require("../models/Enquiry");

// POST: Save enquiry
exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      message,
    });

    await newEnquiry.save();

    res.status(201).json({
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error("Enquiry Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch all enquiries (Admin)
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Fetch Enquiries Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};