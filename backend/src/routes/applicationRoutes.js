import express from "express";
import { submitApplication, getApplications } from "../controllers/applicationController.js";
import { submitBrochureRequest, getBrochureRequests } from "../controllers/brochureController.js";
import { submitContactMessage, getContactMessages } from "../controllers/contactController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/brochure", submitBrochureRequest);

router.post("/apply", upload.single("resume"), submitApplication);

router.post("/contact", submitContactMessage);

router.get("/applications", getApplications);
router.get("/brochure-requests", getBrochureRequests);
router.get("/contact-messages", getContactMessages);

export default router;
