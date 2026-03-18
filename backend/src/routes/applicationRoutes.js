import express from "express";
import { submitApplication, getApplications, getResume } from "../controllers/applicationController.js";
import { submitBrochureRequest, getBrochureRequests } from "../controllers/brochureController.js";
import { submitContactMessage, getContactMessages } from "../controllers/contactController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public apply route
router.post("/apply", upload.single("resume"), submitApplication);

// Brochure request route
router.post("/brochure-requests", submitBrochureRequest);

// Contact message route
router.post("/contact", submitContactMessage);

// Admin routes (for your testing)
router.get("/applications", getApplications); // List all applicants
router.get("/applications/:id/resume", getResume); // View specific resume
router.get("/brochure-requests", getBrochureRequests); // List all brochure requests
router.get("/contact-messages", getContactMessages); // List all contact messages

export default router;
