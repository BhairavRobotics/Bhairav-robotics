import express from "express";
import { submitApplication, getApplications, getResume } from "../controllers/applicationController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public apply route
router.post("/apply", upload.single("resume"), submitApplication);

// Admin routes (for your testing)
router.get("/applications", getApplications); // List all applicants
router.get("/applications/:id/resume", getResume); // View specific resume

export default router;
