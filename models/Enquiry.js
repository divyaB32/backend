import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    message: String,
    tileName: String,
    tileImage: String,
    customImage: String,
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);