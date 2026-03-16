import fs from "node:fs/promises";
import { Application } from "../models/Application.js";

/**
 * @desc    Submit a job application
 * @route   POST /api/apply
 * @access  Public
 */
export const submitApplication = async (req, res, next) => {
  try {
    const { fullName, email, phone, type, field } = req.body;

    if (!req.file) {
      res.status(400);
      throw new Error("Resume file is required");
    }

    const fileContent = await fs.readFile(req.file.path);

    const application = new Application({
      fullName,
      email,
      phone,
      type,
      field,
      resumeData: fileContent,
      resumeContentType: req.file.mimetype,
      resumeOriginalName: req.file.originalname,
    });

    await application.save();
    await fs.unlink(req.file.path);

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path).catch(() => {});
    next(error);
  }
};

/**
 * @desc    Get all applications (Admin view)
 * @route   GET /api/applications
 * @access  Private (Currently public for your testing)
 */
export const getApplications = async (req, res, next) => {
  try {
    // We exclude the heavy resumeData from the list for better performance
    const applications = await Application.find().select("-resumeData");
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    View/Download resume
 * @route   GET /api/applications/:id/resume
 * @access  Private (Currently public for your testing)
 */
export const getResume = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }

    // Set headers so the browser knows it's a PDF
    res.set({
      "Content-Type": application.resumeContentType,
      "Content-Disposition": `inline; filename="${application.resumeOriginalName}"`,
    });

    // Send the binary data
    res.send(application.resumeData);
  } catch (error) {
    next(error);
  }
};
