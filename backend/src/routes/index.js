import express from "express";
import applicationRoutes from "./applicationRoutes.js";

const router = express.Router();

// Root route
router.get("/", (req, res) => {
  res.json({ message: "Bhairav Robotics API Running" });
});

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Feature routes
router.use("/", applicationRoutes);

export default router;
