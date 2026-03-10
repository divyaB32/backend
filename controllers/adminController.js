import Admin from "../models/Admin.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateAdminProfile = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.email = email;
    admin.password = password;
    await admin.save();

    res.json({ success: true, message: "Admin profile updated" });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};