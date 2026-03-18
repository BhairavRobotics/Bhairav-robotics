import { BrochureRequest } from "../models/BrochureRequest.js";

/**
 * @desc    Submit a brochure request
 * @route   POST /api/brochure-requests
 * @access  Public
 */
export const submitBrochureRequest = async (req, res, next) => {
  try {
    const { name, email, productId } = req.body;

    if (!name || !email || !productId) {
      res.status(400);
      throw new Error("Please provide name, email, and productId");
    }

    const brochureRequest = new BrochureRequest({
      name,
      email,
      productId,
      requestedAt: new Date(),
    });

    await brochureRequest.save();

    res.status(201).json({ message: "Brochure request stored successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all brochure requests (Admin view)
 * @route   GET /api/brochure-requests
 * @access  Private (Currently public for testing)
 */
export const getBrochureRequests = async (req, res, next) => {
  try {
    const requests = await BrochureRequest.find().sort({ requestedAt: -1 });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};
