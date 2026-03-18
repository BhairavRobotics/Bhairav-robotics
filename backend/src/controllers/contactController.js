import { ContactMessage } from "../models/ContactMessage.js";

/**
 * @desc    Submit a contact message
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error("Please provide name, email, subject, and message");
    }

    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    await contactMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages (Admin view)
 * @route   GET /api/contact
 * @access  Private (Currently public for testing)
 */
export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ submittedAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
