import { BrochureRequest } from "../models/BrochureRequest.js";

/**
 * @desc    Submit a brochure download request
 * @route   POST /api/brochure
 * @access  Public
 */
export const submitBrochureRequest = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400);
      throw new Error("Please provide both name and email");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Please provide a valid email address");
    }

    const brochureRequest = new BrochureRequest({ name, email });
    await brochureRequest.save();

    res.status(201).json({ message: "Brochure request stored successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all brochure requests (Admin view)
 * @route   GET /api/brochure-requests
 * @access  Private
 */
export const getBrochureRequests = async (req, res, next) => {
  try {
    const requests = await BrochureRequest.find().sort({ requestedAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};
