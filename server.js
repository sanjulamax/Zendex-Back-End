import express from "express";
import http from "http";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import dotenv from "dotenv";
import { databaseConnector } from "./database/database-connector.js";
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
databaseConnector();

// CORS configuration for CORS issues
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Create HTTP server
const server = http.createServer(app);

app.use("/api/auth", authRouter);

// Server Port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
