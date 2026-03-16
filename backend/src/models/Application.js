import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ["full-time", "internship"], required: true },
  field: { type: String, required: true },
  resumeData: { type: Buffer, required: true }, // Binary file content
  resumeContentType: { type: String, required: true }, // e.g., 'application/pdf'
  resumeOriginalName: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

export const Application = mongoose.model("Application", applicationSchema);
