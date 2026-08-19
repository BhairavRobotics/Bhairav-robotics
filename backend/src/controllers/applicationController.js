import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "node:crypto";
import s3 from "../config/s3.js";
import { JobApplication } from "../models/JobApplication.js";

/**
 * @desc    Submit a job / internship application (resume uploaded to S3)
 * @route   POST /api/apply
 * @access  Public
 */
export const submitApplication = async (req, res, next) => {
  try {
    const { fullName, email, phone } = req.body;

    if (!fullName || !email || !phone) {
      res.status(400);
      throw new Error("Please provide fullName, email, and phone");
    }

    if (!req.file) {
      res.status(400);
      throw new Error("Resume PDF file is required");
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      throw new Error("AWS_S3_BUCKET_NAME is not defined in your .env file");
    }

    const uniqueKey = `resumes/${Date.now()}-${crypto.randomUUID()}-${req.file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ContentDisposition: `attachment; filename="${req.file.originalname}"`,
    });

    await s3.send(command);

    const resumeUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

    const application = new JobApplication({
      fullName,
      email,
      phone,
      resumeUrl,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all applications (Admin view)
 * @route   GET /api/applications
 * @access  Private
 */
export const getApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};
