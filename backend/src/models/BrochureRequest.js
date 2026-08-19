import mongoose from "mongoose";

const brochureRequestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  requestedAt: { type: Date, default: Date.now },
});

export const BrochureRequest = mongoose.model(
  "BrochureRequest",
  brochureRequestSchema,
  "brochure_leads"
);
