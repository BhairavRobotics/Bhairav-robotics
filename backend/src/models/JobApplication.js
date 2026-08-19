import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  resumeUrl: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema,
  "job_applications"
);
