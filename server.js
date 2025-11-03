import express from "express";
import http from "http";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import dotenv from "dotenv";
import { databaseConnector } from "./database/database-connector.js";
import homeRouter from "./routes/home-routes.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";
import { Server } from "socket.io";
import { socketController } from "./socket-controllers/socket-controller.js";
import chatRouter from "./routes/chat-routes.js";
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
databaseConnector();

// CORS configuration for CORS issues
app.use(
  cors({
    origin: "https://zendex-front-end.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Create HTTP server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://zendex-front-end.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

socketController(io);

app.use("/api/auth", authRouter);
app.use("/api/home", authMiddleware, homeRouter);
app.use("/api/chat", authMiddleware, chatRouter);

// Server Port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
