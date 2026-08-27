import express from "express";
import { submitApplication } from "../controllers/applicationController.js";
import { submitContactMessage } from "../controllers/contactController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/apply", upload.single("resume"), submitApplication);
router.post("/contact", submitContactMessage);

export default router;
