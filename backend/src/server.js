import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dns from "node:dns";
import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// Fix for Node.js 17+ DNS resolution (ECONNREFUSED)
dns.setDefaultResultOrder("ipv4first");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Static Files (Optional: for serving uploaded files if needed)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 3. API Routes
app.use("/api", applicationRoutes);

// 4. Base Route
app.get("/", (req, res) => {
  res.json({ message: "Bhairav Robotics API is running..." });
});

// 5. Global Error Handler (Must be after routes)
app.use(errorHandler);

// 6. Start Server & Connect Database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Server initialization failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
