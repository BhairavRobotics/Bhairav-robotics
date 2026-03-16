import mongoose from "mongoose";

/**
 * @desc    Establish a connection to the MongoDB database
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in your .env file");
    }

    // Professional connection options
    const options = {
      autoIndex: true, // Build indexes (disable in high-traffic production)
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6 (fix for ECONNREFUSED)
    };

    const conn = await mongoose.connect(mongoUri, options);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Optional: Handle connection errors after initial connection
    mongoose.connection.on("error", (err) => {
      console.error(`❌ Mongoose Connection Error: ${err.message}`);
    });

  } catch (error) {
    console.error(`❌ Initial MongoDB Connection Failed: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
