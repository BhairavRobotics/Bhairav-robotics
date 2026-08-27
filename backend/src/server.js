import "dotenv/config";
import express from "express";
import cors from "cors";
import dns from "node:dns";
import applicationRoutes from "./routes/applicationRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// Fix for Node.js 17+ DNS resolution (ECONNREFUSED)
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. API Routes
app.use("/api", applicationRoutes);

// 3. Base Route
app.get("/", (req, res) => {
  res.json({ message: "Bhairav Robotics API is running..." });
});

// 4. Global Error Handler (Must be after routes)
app.use(errorHandler);

// 5. Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
