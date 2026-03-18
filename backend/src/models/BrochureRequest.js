import mongoose from "mongoose";

const brochureRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  productId: { type: String, required: true },
  requestedAt: { type: Date, default: Date.now },
});

export const BrochureRequest = mongoose.model("BrochureRequest", brochureRequestSchema);
